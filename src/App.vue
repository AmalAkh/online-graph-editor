<script setup>
import { onMounted, reactive, ref } from 'vue';
import availableElements from './abstractions/available-elements';

import Vertex from './abstractions/vertex';

import useEditorDataStore from './stores/editor-data-store';

const panelX = ref(10);
const panelY = ref(10)
const panel = ref(null);
const dragElement = ref(null);
const isPanelMoving = ref(false);

const appInner = ref(null);

const editorDataStore = useEditorDataStore();


onMounted(()=>
{
    editorDataStore.currentEditorHeight = document.documentElement.clientHeight;
    editorDataStore.currentEditorWidth = document.documentElement.clientWidth;
})
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
  console.log("move_panel");

  if(editorDataStore.draggingMode == "edge")
  {
    editorDataStore.selectedElement.bezierPointX = e.clientX;
    editorDataStore.selectedElement.bezierPointY = e.clientY;
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

function selectNewElement(name)
{
  console.log("new element sleected");
  editorDataStore.draggingMode = "new_element";
  editorDataStore.selectedElement = null;
  
  editorDataStore.newElementName = name;
}
//get absolute position without effect of zooming
function getPosition(x,y)
{
  return [(x+appInner.value.scrollLeft)/editorDataStore.zoom, y];
}

const svgCanvas = ref(null);
const editorWidth = ref(400);
const editorHeight = ref(400);
function addElement(e)
{
  
  if(editorDataStore.newElementName == "edge")
  {
    //if it is edge cant add to empty space
    editorDataStore.newElementName = "";
    
  }
  
  if(editorDataStore.draggingMode == "new_element")
  {
    //adding new element
    switch(editorDataStore.newElementName)
    {
      case "Vertex":
        let box = svgCanvas.value.getBoundingClientRect();
        console.log(`${e.clientX} ${box.x}`);
        let x = (e.clientX - box.x)/editorDataStore.zoom;
        let y = (e.clientY - box.y)/editorDataStore.zoom;
        editorDataStore.$patch({currentElements:[...editorDataStore.currentElements, new Vertex(x, y)]});
      break;
      case "Edge":
        
      break;
    }
  }else if(editorDataStore.draggingMode != "edge")
  {
    editorDataStore.selectedElement = null;
  }else
  {
    editorDataStore.draggingMode = "";
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
          <a class="is-active">Elements</a>
          <a>Algorithms</a>
          
        </p>
        
        <a class="panel-block" v-for="[key, el] in availableElements" :class="{'selected':editorDataStore.newElementName == key}" @click="selectNewElement(key)">
          <span class="panel-icon">
            <font-awesome-icon :icon="el.icon" />
          </span>
          {{ el.label }}
        </a>
      
        
        <div class="panel-block buttons-block">
          <button class="button is-link is-outlined is-fullwidth">
            Save
          </button>
          
          <button class="button is-link is-outlined is-fullwidth">
            Open
          </button>
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
      <svg class="main-canvas" ref="svgCanvas" :height="editorHeight*editorDataStore.zoom" :width="editorWidth*editorDataStore.zoom" @click="addElement">

        <component v-for="element in editorDataStore.currentElements" :is="availableElements.get(element.name).component" :element="element"></component>
        
      </svg>
  </div>
</template>

<style scoped>
  
</style>
