<script setup>
import { computed, ref } from 'vue';
import useEditorDataStore from './../stores/editor-data-store';

import angleBetween2Vectors from '../utils/angle-between-2-vectors.js';

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
    //editorDataStore.selectedElement.bezierPointX = e.clientX;
    //editorDataStore.selectedElement.bezierPointY = e.clientY;
}
const bezierPointX = computed(()=>
{
    return props.element.bezierPointX*editorDataStore.zoom;
})
const bezierPointY = computed(()=>
{
    return props.element.bezierPointY*editorDataStore.zoom;
})
const triangleCoords = computed(()=>
{
   
    return `${props.element.x[1]+2}, ${props.element.y[1]}, ${props.element.x[1]-22}, ${props.element.y[1]+6}, ${props.element.x[1]-22}, ${props.element.y[1]-6}`
})
const triangleRotationAngle = computed(()=>
{
    
    let angle = angleBetween2Vectors(bezierPointX.value,bezierPointY.value, props.element.x[1], props.element.y[1]);
    if(props.element.y[1] < bezierPointY.value)
    {
        angle*=-1;
    }
    return angle;
})
</script>
<template>
    
    
    <path class="edge" stroke="black" :class="{'selected':editorDataStore.selectedElement?.id == props.element.id}"  @click.stop="select"  :d="`M ${element.x[0]*editorDataStore.zoom} ${element.y[0]*editorDataStore.zoom} Q ${element.bezierPointX*editorDataStore.zoom} ${element.bezierPointY*editorDataStore.zoom} ${element.x[1]*editorDataStore.zoom} ${element.y[1]*editorDataStore.zoom}`" :stroke-width="4*editorDataStore.zoom" fill="none" />
    <polygon  :class="{'selected':editorDataStore.selectedElement?.id == props.element.id}" :points="triangleCoords" fill="black" :transform="`rotate(${triangleRotationAngle},${props.element.x[1]},${props.element.y[1]})`" />
    <circle class="bezier-point" :class="{'active':editorDataStore.selectedElement?.id == props.element.id && editorDataStore.draggingMode == 'edge'}" @mousedown="startMovingBezierPoint" v-show="editorDataStore.selectedElement?.id == element.id"  :cx="bezierPointX" :cy="bezierPointY" stroke="gray"  r="7"  fill="white" />
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
polygon.selected
{
    fill:#99ccff;
}
.selected
{
    stroke: #99ccff;
    
}

</style>