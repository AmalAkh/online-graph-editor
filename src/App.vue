<script setup>
import { ref } from 'vue';

const panelX = ref(100);
const panelY = ref(100)
const panel = ref(null);
const dragElement = ref(null);
const isPanelMoving = ref(false);

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
    
    let diffX = (dragElement.value.getBoundingClientRect().x - panel.value.getBoundingClientRect().x);
    let diffY = (dragElement.value.getBoundingClientRect().y-panel.value.getBoundingClientRect().y);
   
    panelX.value = e.clientX-diffX;
    panelY.value = e.clientY-diffY - dragElement.value.offsetWidth;
    
  }
}
</script>

<template>
  <div @mousemove="movePanel" @mouseup="stopMovingPanel">
    <nav ref="panel" class="panel is-info instruments-panel" :style="{top:`${panelY}px`, left:`${panelX}px`}">
      <div class="panel-heading">
          <p>
          Repositories
          </p>
          <span ref="dragElement" class="drag-element" @dragstart="test" @mousemove="movePanel" @mousedown="startMovingPanel" >
            <font-awesome-icon icon="grip-vertical" />
          </span>
        </div>
        
        <p class="panel-tabs">
          <a class="is-active">Elements</a>
          <a>Algorithms</a>
          
        </p>
        
        <a class="panel-block">
          <span class="panel-icon">
            <font-awesome-icon icon="circle" />
          </span>
          Vertice
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
      <svg></svg>
  </div>
</template>

<style scoped>

</style>
