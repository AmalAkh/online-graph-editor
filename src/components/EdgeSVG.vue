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
    
    return editorDataStore.selectedElement?.id == props.element.id ? 'blue' : 'black';
}

</script>
<template>
    <line @click.stop="select" :x1="element.x[0]" :y1="element.y[0]" :x2="element.x[1]" :y2="element.y[1]" :style="{stroke:getStrokeColor(), strokeWidth:3}" />
</template>