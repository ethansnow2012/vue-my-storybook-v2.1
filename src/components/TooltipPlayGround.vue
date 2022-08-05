<script lang="ts">
import { string } from 'prop-types'
import {ref, inject} from 'vue'
import 'floating-vue/dist/style.css'

import {
  VTooltip,
  VClosePopper,
} from 'floating-vue'
export default {
  name: 'tooltip-playground',
  props: {
    text1: string
  },
  directives: {
    tooltip: VTooltip,
    //tooltipCloser: VClosePopper
  },
  setup(props, context) {

    return {

    }
  }
}

</script>

<template>

  <div v-tooltip="'yooooooo.'" className="l-text">   
    adsfasdf
  </div>
  <div v-tooltip="{ content: `yooooooooo.`, placement: 'right'}" className="l-text">   
    adsfasdf
  </div>
</template>

<style scoped>
    .l-text{
        width: max-content;
    }
</style>
