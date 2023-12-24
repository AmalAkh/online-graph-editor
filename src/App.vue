<script setup>
import { onMounted, reactive, ref } from 'vue';
import availableElements from './abstractions/available-elements';
import Vertice from './abstractions/vertice';

import useEditorDataStore from './stores/editor-data-store';

const panelX = ref(10);
const panelY = ref(10)
const panel = ref(null);
const dragElement = ref(null);
const isPanelMoving = ref(false);

const editorDataStore = useEditorDataStore();

const currentElements = reactive([]);
onMounted(()=>
{
  
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
    }
    if(resultY >= 0 && resultY+panelRect.height <= document.documentElement.clientHeight)
    {
      panelY.value = resultY;
    }
    
    
  }
}
const newElementName = ref("Vertice");
const editingMode = ref("");
function addElement(e)
{
  currentElements.push(new Vertice(e.clientX, e.clientY));
}
</script>

<template>
  <div style="width:100%;" @mousemove="movePanel" @mouseup="stopMovingPanel" @click="addElement">
    <nav ref="panel" class="panel is-info instruments-panel" :style="{top:`${panelY}px`, left:`${panelX}px`}">
      <div class="panel-heading">
          <p>
          {{ editorDataStore.selectedElement?.id }}
          </p>
          <span ref="dragElement" class="drag-element" @dragstart="test" @mousemove="movePanel" @mousedown="startMovingPanel" >
            <font-awesome-icon icon="grip-vertical" />
          </span>
        </div>
        
        <p class="panel-tabs">
          <a class="is-active">Elements</a>
          <a>Algorithms</a>
          
        </p>
        
        <a class="panel-block" v-for="[key, el] in availableElements" :class="{'selected':newElementName == key}" @click="newElementName=key">
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
      <svg>
        <component v-for="element in currentElements" :is="availableElements.get(element.name).component" :element="element"></component>
       
      </svg>
  </div>
</template>

<style scoped>

</style>
