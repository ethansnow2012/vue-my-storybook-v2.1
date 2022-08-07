<script setup lang="ts">
import { ref } from 'vue'
import { useDraggable } from '@vueuse/core'

const el = ref<HTMLElement | null>(null)
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 0, y: 0 },
})

</script>

<template>
  <div :className="$style.root" :style="style" style="position: absolute" ref="el" >
    fffff
  </div>
</template>

<style scoped module>
    .root{
        background: #83fbff;
        width: 300px;
        height: 300px;
    }
</style>
