<script setup lang="ts">
import { ref } from 'vue'
import DragableDivBg from './DragableDivBg.vue';

//defineProps<{ msg: string }>()

</script>

<template>
    <div>
        DragableDivBgPlayGround
    </div>
    <div :class="$style.root" > 
        <DragableDivBg></DragableDivBg>
    </div>
</template>

<style scoped module>
/* module="aaaa" */
    .root{
        background: grey;
        width: 500px;
        height: 500px;
        display: grid;
        place-content: center;
        position: relative;
        overflow: hidden;
    }
</style>
