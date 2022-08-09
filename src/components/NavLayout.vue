<script lang="ts">
import {ref} from 'vue'


export default {
  name: 'my-nav-layout',
  setup() {
    return {
    }
  }
}

</script>

<template>
  <div className="l-layout">   
    <slot/>
  </div>
</template>

<style scoped>
.l-layout {
  position: relative;
  width: 100%;
  height: 700px;
  padding-right: 150px;
  box-sizing: border-box;
}
.l-layout > *{
  margin-left: auto;
}
</style>
