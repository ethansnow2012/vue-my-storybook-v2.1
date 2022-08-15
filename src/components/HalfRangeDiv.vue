<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from "vue";
const initRangePos = '50'
const range = ref(initRangePos)
const rangeBlock1 = computed(()=>{
  // reserve this for other use case
  return 0
})
const rangeBlock2 = computed(()=>{
  return (50 + parseFloat(range.value) - parseFloat(initRangePos)) + '%'
})
</script>
<template>
  <div :className="$style.root">
    <div :className="$style['root-block1']">
    block1:
    </div>
    <div :className="$style['root-block2']">
    block2
    </div>
    <input :className="$style['root-rangeinput']" type="range" v-model="range">
    <div :className="$style['root-sp']" ></div>
  </div>
</template>

<style scoped module>
  .root{
    width: 300px;
    height: 300px;
    background-color: rgb(56, 134, 108);
    position: relative;
    overflow: hidden;
  }
  .root-rangeinput{
    position: absolute;
    top:0;
    bottom: 0;
    left: 0;
    right: 0;
    appearance: none!important;
    background-color: initial!important;
  }
  .root-block1{
    position: relative;
    left: v-bind(rangeBlock1);
    height: 100%;
    width: 100%;
  }
  .root-block2{
    position: absolute;
    top:0;
    left: v-bind(rangeBlock2);
    background-color: yellow;
    height: 100%;
    width: 100%;
  }
  .root-sp{
    top:0;
    width: 0;
    height: 100%;
    position: absolute;
    left: v-bind(rangeBlock2);
    pointer-events: none!important;
  }
  .root-sp::before{
    display: block;
    content: '';
    width: 1px;
    height: 100%;
    background: black;
  }
  .root-sp::after{
    display: block;
    content: '';
    width: 30px;
    height: 30px;
    background: black;
    position: absolute;
    top: calc(50% - 15px);
    right: -15px;
  }
</style>
