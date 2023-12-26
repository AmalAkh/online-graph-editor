<script setup>
import { computed, ref } from 'vue';
import useEditorDataStore from './../stores/editor-data-store';

const editorDataStore = useEditorDataStore();

const props = defineProps({
    element:
    {
        type:Object
    }
});


function select(e)
{
    
    editorDataStore.$patch({selectedElement:props.element});
    
}
function getStrokeColor()
{
    
    return editorDataStore.selectedElement?.id == props.element.id ? '#99ccff' : 'black';
}
function startMovingBezierPoint(e)
{
    editorDataStore.draggingMode = "edge";
    editorDataStore.selectedElement.bezierPointX = e.clientX;
    editorDataStore.selectedElement.bezierPointY = e.clientY;
}

</script>
<template>
    
    
    <path class="edge" :class="{'selected':editorDataStore.selectedElement?.id == props.element.id}"  @click.stop="select"  :d="`M ${element.x[0]} ${element.y[0]} Q ${element.bezierPointX} ${element.bezierPointY} ${element.x[1]} ${element.y[1]}`" stroke-width="5" fill="none" />
    <circle class="bezier-point" :class="{'active':editorDataStore.selectedElement?.id == props.element.id && editorDataStore.draggingMode == 'edge'}" @mousedown="startMovingBezierPoint" v-show="editorDataStore.selectedElement?.id == element.id"  :cx="element.bezierPointX" :cy="element.bezierPointY" stroke="gray"  r="7"  fill="white" />
</template>
<style lang="scss" scoped>
.bezier-point
{
    fill:white;
    &.active
    {
      fill:  gray;
    }
}
.edge
{
    stroke: black;
    &.selected
    {
        stroke: #99ccff;
    }
}
</style>