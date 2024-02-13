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

</script>
<template>
    
    
    <path class="edge" stroke="black" :class="{'selected':editorDataStore.selectedElement?.id == props.element.id}"  @click.stop="select"  :d="`M ${element.x[0]*editorDataStore.zoom} ${element.y[0]*editorDataStore.zoom} Q ${element.bezierPointX*editorDataStore.zoom} ${element.bezierPointY*editorDataStore.zoom} ${element.x[1]*editorDataStore.zoom} ${element.y[1]*editorDataStore.zoom}`" :stroke-width="4*editorDataStore.zoom" fill="none" />
    <circle class="bezier-point" :class="{'active':editorDataStore.selectedElement?.id == props.element.id && editorDataStore.draggingMode == 'edge'}" @mousedown="startMovingBezierPoint" v-if="editorDataStore.selectedElement?.id == element.id"  :cx="bezierPointX" :cy="bezierPointY" stroke="gray"  r="5"  fill="white" />
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