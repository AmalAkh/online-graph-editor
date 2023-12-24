<script setup>
import { computed, ref } from 'vue';

defineProps({
    element:
    {
        type:Object
    }
});

const selected = ref(false);
function select(e)
{
    selected.value = !selected.value;
}
const strokeWidth = computed(() =>
 {
    return selected.value ? 3 : 0;
 })

</script>
<template>
    <circle @click.stop="select" :cx="element.x" :cy="element.y" stroke="red" :stroke-width="strokeWidth" r="8"  fill="black" />
</template>