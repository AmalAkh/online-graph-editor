<script setup>
import { computed, ref } from 'vue';
import useEditorDataStore from './../stores/editor-data-store';
import Edge from './../abstractions/edge.js';

const editorDataStore = useEditorDataStore();

const props = defineProps({
    element:
    {
        type:Object
    }
});


function select(e)
{
    if(editorDataStore.selectedElement != null && editorDataStore.newElementName == "Edge" && props.element.name == "Vertex" && editorDataStore.selectedElement.name == "Vertex")
    {
        let edge = new Edge(editorDataStore.selectedElement.x, editorDataStore.selectedElement.y,props.element.x,props.element.y);
        edge.start = editorDataStore.selectedElement;
        edge.end = props.element;
        editorDataStore.currentElements.unshift(edge);
        editorDataStore.selectedElement.addConnection(props.element.id, edge);
        props.element.addConnection(editorDataStore.selectedElement.id, edge);
        
    }
    if(editorDataStore.selectedElement?.id == props.element.id)
    {
        editorDataStore.$patch({selectedElement:null});
    }else
    {
        editorDataStore.$patch({selectedElement:props.element});
    }
    
    
    
}
function getStrokeWidth()
{
    
    return editorDataStore.selectedElement?.id == props.element.id ? 3 : 0;
}

</script>
<template>
    <circle @click.stop="select" :cx="element.x" :cy="element.y" stroke="red" :stroke-width="getStrokeWidth()" r="8"  fill="black" />
</template>