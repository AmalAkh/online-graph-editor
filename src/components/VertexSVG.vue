<script setup>
import { computed, ref } from 'vue';
import useEditorDataStore from './../stores/editor-data-store';
import Edge from './../abstractions/edge.js';
import DirectedEdge from './../abstractions/directed-edge.js';


const editorDataStore = useEditorDataStore();

const props = defineProps({
    element:
    {
        type:Object
    }
});

function startMovingVertex(e)
{
    if(editorDataStore.newElementName != "Edge" && editorDataStore.newElementName != "DirectedEdge")
    {
        editorDataStore.selectedElement = props.element;
        editorDataStore.draggingMode = "moving_el";
    }
}

function select(e)
{
    if(editorDataStore.selectedElement != null && (editorDataStore.newElementName == "Edge" || editorDataStore.newElementName == "DirectedEdge") && props.element.name == "Vertex" && editorDataStore.selectedElement.name == "Vertex" && editorDataStore.selectedElement?.id != props.element.id )
    {
       
        let edge;
       
        if(editorDataStore.newElementName == "Edge")
        {
            edge = new Edge(editorDataStore.selectedElement.x, editorDataStore.selectedElement.y,props.element.x,props.element.y);
        }else
        {
            edge = new DirectedEdge(editorDataStore.selectedElement.x, editorDataStore.selectedElement.y,props.element.x,props.element.y);

        }
        edge.start = editorDataStore.selectedElement.id;
        edge.end = props.element.id;
        
        editorDataStore.currentElements.unshift(edge);
        editorDataStore.selectedElement.addConnection(props.element.id, edge.id);
        props.element.addConnection(editorDataStore.selectedElement.id, edge.id);
        
    }
    //debugger;
    if(editorDataStore.selectedElement?.id == props.element.id)
    {
       
        //editorDataStore.$patch({selectedElement:null});
    }else
    {
        editorDataStore.$patch({selectedElement:props.element});
    }
    
    
    
}
function stopMovingVertex()
{
    editorDataStore.draggingMode = "";
}
function getStrokeWidth()
{
    
    return editorDataStore.selectedElement?.id == props.element.id ? 3 : 0;
}


</script>
<template>
    <text :x="props.element.x-10" ref="vertexNameText" :y="props.element.y-24" class="vertex-name">{{props.element.properties["name"].value}}</text>
    <circle @click.stop="select" @pointerup="stopMovingVertex" @pointerdown="startMovingVertex" :cx="editorDataStore.zoom * element.x" :cy="editorDataStore.zoom*element.y" stroke="red" :stroke-width="getStrokeWidth()" :r="7*editorDataStore.zoom"  :fill="props.element.properties['color'].value" />
</template>
<style lang="scss">
.vertex-name
{
    color:black;
}
</style>