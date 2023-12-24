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
function getStrokeWidth()
{
    
    return editorDataStore.selectedElement?.id == props.element.id ? 3 : 0;
}

</script>
<template>
    <circle @click.stop="select" :cx="element.x" :cy="element.y" stroke="red" :stroke-width="getStrokeWidth()" r="8"  fill="black" />
</template>