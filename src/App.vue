<script setup>
import { onMounted, reactive, ref, onUpdated } from 'vue';
import availableElements from './abstractions/available-elements';

import Vertex from './abstractions/vertex';

import useEditorDataStore from './stores/editor-data-store';

import downloadByDataURL from './utils/download-by-data-url.js';
import castElements from './utils/cast-elements.js';

const panelX = ref(10);
const panelY = ref(10)
const panel = ref(null);
const dragElement = ref(null);
const isPanelMoving = ref(false);

const currentTab = ref("file");


const editorDataStore = useEditorDataStore();

function startMovingPanel(e)
{
  
  isPanelMoving.value = true;

}
function stopMovingPanel(e)
{
  isPanelMoving.value = false;
  

}
function movePanel(e)
{
  

  if(editorDataStore.draggingMode == "edge")
  {
    let box = svgCanvas.value.getBoundingClientRect();
    editorDataStore.selectedElement.bezierPointX = (e.clientX - box.x)/editorDataStore.zoom;
    editorDataStore.selectedElement.bezierPointY = (e.clientY - box.y)/editorDataStore.zoom;
  }
  if(editorDataStore.draggingMode == "moving_el" && editorDataStore?.selectedElement?.name == "Vertex")
  {
    let box = svgCanvas.value.getBoundingClientRect();
    editorDataStore.selectedElement.x = (e.clientX - box.x)/editorDataStore.zoom;
    editorDataStore.selectedElement.y = (e.clientY - box.y)/editorDataStore.zoom;
    for(let [key,val] of editorDataStore.selectedElement.connectedVertices)
    {
      for(let edgeId of val)
      {
        
        let edge = editorDataStore.currentElements.find((item=>
        {
          return item.id == edgeId;
        }))
       
       
        if(edge.start == editorDataStore.selectedElement.id)
        {
          //debugger;
          edge.x[0] = editorDataStore.selectedElement.x;
          edge.y[0] = editorDataStore.selectedElement.y;
         // break;

        }else
        {
          //debugger;

          edge.x[1] = editorDataStore.selectedElement.x;
          edge.y[1] = editorDataStore.selectedElement.y;
         // break;

        }
      }
    }
  }
  if(isPanelMoving.value)
  {
   
    let dragElementRect = dragElement.value.getBoundingClientRect();
    let panelRect = panel.value.getBoundingClientRect();
    let diffX = (dragElementRect.x - panelRect.x);
    let diffY = (dragElementRect.y - panelRect.y);
    let resultX = e.clientX-diffX;
    let resultY = e.clientY-diffY - dragElement.value.offsetWidth;
    if(resultX >= 0 && resultX+panelRect.width <= document.documentElement.clientWidth)
    {
      panelX.value = e.clientX-diffX;
    }else if(resultX <= 0)
    {
      panelX.value = 0;
    }else
    {
      panelX.value = document.documentElement.clientWidth-panelRect.width;
    }

    if(resultY >= 0 && resultY+panelRect.height <= document.documentElement.clientHeight)
    {
      panelY.value = resultY;
    }else if(resultY <= 0)
    {
      panelY.value = 0;
    }else
    {
      panelY.value = document.documentElement.clientHeight-panelRect.width;
    }
    
    
  }
}

onMounted(()=>
{
    editorDataStore.currentEditorHeight = document.documentElement.clientHeight;
    editorDataStore.currentEditorWidth = document.documentElement.clientWidth;
})


function selectNewElement(name)
{

  editorDataStore.draggingMode = "new_element";
  editorDataStore.selectedElement = null;
  console.log(name);
  editorDataStore.newElementName = name;
}
//get absolute position without effect of zooming
const appInner = ref(null);
function getPosition(x,y)
{
  return [(x+appInner.value.scrollLeft)/editorDataStore.zoom, y];
}

const svgCanvas = ref(null);
const editorWidth = ref(400);
const editorHeight = ref(400);
function addElement(e)
{
  
  if(editorDataStore.newElementName == "Edge" || editorDataStore.newElementName == "DirectedEdge")
  {
    editorDataStore.selectedElement = null;
    
  }
  
  if(editorDataStore.draggingMode == "new_element")
  {
    //adding new element
    switch(editorDataStore.newElementName)
    {
      case "Vertex":
        let box = svgCanvas.value.getBoundingClientRect();
     
        let x = (e.clientX - box.x)/editorDataStore.zoom;
        let y = (e.clientY - box.y)/editorDataStore.zoom;
        editorDataStore.$patch({currentElements:[...editorDataStore.currentElements, new Vertex(x, y)]});
      break;
      case "Edge":
        
      break;
    }
  }else if(editorDataStore.draggingMode != "Edge")
  {
    editorDataStore.selectedElement = null;
  }else
  {
    editorDataStore.draggingMode = "";
    
  }
  
}

const canvasForSave = ref(null);

const size = ref(1);
const filename = ref("mygraph");


function removeTemporaryControls()
{
  editorDataStore.selectedElement = null;
  return new Promise((resolve, reject)=>
  {
    let intervalId = setInterval(()=>
    {
      
      if(document.getElementsByClassName("bezier-point").length == 0)
      {
        resolve(0);
        clearInterval(intervalId);
      }
    }, 10);
  });
}
async function saveAsImage()
{
  
  
  //we need to wait until all temporary control will be removed (for example Bezier points controls)
  await removeTemporaryControls();
  
  
  const context = canvasForSave.value.getContext("2d");
  //clear canvas;
  context.clearRect(0,0, canvasForSave.value.width, canvasForSave.value.height);
  //get svg xml
  let svgXML = svgCanvas.value.outerHTML;
  console.log("svg xml saved");
  let blob = new Blob([svgXML], {type:"image/svg+xml"});

  //create an image to draw it on canvas
  let img = new Image();
  let temp = editorDataStore.zoom;

  //apply zoom 
  editorDataStore.zoom = size.value;
  
  //hide the svg to prevent user from seeing temporary sized up version of svg
  svgCanvas.value.style.display = "none";
  let blobUrl = URL.createObjectURL(blob);
  img.onload = function()
  {

    context.drawImage(img,0,0, editorWidth.value*size.value,editorHeight.value*size.value);
    
    downloadByDataURL(canvasForSave.value.toDataURL(), filename.value);
    //return the old value of zoom and make svg visible again
    editorDataStore.zoom = temp;
    svgCanvas.value.style.display = "block";
    URL.revokeObjectURL(blobUrl);


  }
  
  img.src = blobUrl;


  
}

function saveAsJson()
{
  let confObj = {canvasWidth:editorWidth.value, canvasHeight:editorHeight.value,elements:editorDataStore.currentElements.map((el)=>
    {
      if(el.name == "Vertex")
      {
        let newEl = Object.assign({}, el);
        
        newEl.connectedVertices = Object.fromEntries(el.connectedVertices);
        return newEl;
      }
      return el;
    })}
  let blob = new Blob([JSON.stringify(confObj)], {type:"application/json"});
  downloadByDataURL(URL.createObjectURL(blob), filename.value);
}


const requiredFields = ["canvasWidth", "canvasHeight", "elements"]

function open(e)
{
  
  if(e.target.files[0] != undefined)
  {
    let reader = new FileReader();
    reader.onload = (e)=>
    {
        let confObj = JSON.parse(reader.result);
        for(let key of requiredFields)
        {
          
          if(!confObj.hasOwnProperty(key))
          {
            alert("Error occured");
            return;
          
          }
        }
        
        

        editorHeight.value = confObj.canvasHeight;
        editorWidth.value = confObj.canvasWidth;
        editorDataStore.currentElements = castElements(confObj.elements);
    };  
    reader.readAsText(e.target.files[0]);
    

  }
  
  
}
</script>

<template>
  <div ref="appInner" class="app-inner" style="width:100%;" @mousemove.stop="movePanel" @mouseup.prevent.stop="stopMovingPanel">
    <nav ref="panel" class="panel is-info instruments-panel" :style="{top:`${panelY}px`, left:`${panelX}px`}">
      <div class="panel-heading">
          <p>
          test
          </p>
          <span ref="dragElement" class="drag-element" @dragstart="test"  @mousedown.stop="startMovingPanel" >
            <font-awesome-icon icon="grip-vertical" />
          </span>
        </div>
        
        <p class="panel-tabs">
          <a :class="{'is-active':currentTab=='file'}" @click="currentTab='file'" >File</a>
          <a :class="{'is-active':currentTab=='elements'}" @click="currentTab='elements'" >Elements</a>
          
          
        </p>
        <div class="tab elements-tab" v-show="currentTab=='elements'">
          <a class="panel-block"  :class="{'selected':editorDataStore.newElementName == ''}" @click="selectNewElement('')">
            <span class="panel-icon">
              <font-awesome-icon :icon="['fas', 'arrow-pointer']" />
            </span>
            Cursor
          </a>
          <a class="panel-block" v-for="[key, el] in availableElements" :class="{'selected':editorDataStore.newElementName == key}" @click="selectNewElement(key)">
            <span class="panel-icon">
              <font-awesome-icon :icon="el.icon" />
            </span>
            {{ el.label }}
          </a>
        </div>
        <div class="tab file-tab" v-show="currentTab=='file'">
          <p>File name</p>
          <input type="text" v-model="filename" class="input is-small"/>
          <div class="size-input">
            <p>Size</p>x
            <input type="number" ref="jsonFileInput" v-model="size" class="input is-small" min="0.5"/>
          </div>

          <button class="button is-small is-fullwidth" @click="saveAsJson">Save</button>
          <button class="button is-small is-fullwidth" @click="saveAsImage">Save as PNG</button>
          <label class="button is-small is-fullwidth" for="open_json">
            Open
            <input type="file" id="open_json" accept=".json" @change="open"  />
            

          </label>


          
        </div>
        
      
        
        
        
      </nav>
      <div class="size-panel">
        <input class="input is-small" type="number" v-model="editorWidth"/>
        x
        <input class="input is-small" type="number" v-model="editorHeight"/>

      </div>
      <div class="zoom-panel">
        <button class="button" @click.stop="editorDataStore.zoomout">-</button>
        <p>{{ editorDataStore.editorZoom }}%</p>
        <button class="button" @click.stop="editorDataStore.zoomin">+</button>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg"  class="main-canvas" ref="svgCanvas" :height="editorHeight*editorDataStore.zoom" :width="editorWidth*editorDataStore.zoom" @click="addElement">

        <component v-for="element in editorDataStore.currentElements" :is="availableElements.get(element.name).component" :element="element"></component>
        
        
      </svg>
      <canvas class="canvas-for-save" :width="editorWidth*editorDataStore.zoom" :height="editorHeight*editorDataStore.zoom" ref="canvasForSave">
      </canvas>
      
  </div>
  
</template>

<style scoped>
  
</style>
