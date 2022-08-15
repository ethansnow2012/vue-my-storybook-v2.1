<script lang="ts">
import {ref,reactive} from 'vue'
import { useElementHover } from '@vueuse/core'
import autoAnimate  from '@formkit/auto-animate'
import MyCompo from './MyCompo.vue';

export default {
  name: 'my-nav-item',
  props: {
    inputInitObject: null
  },
  components: { MyCompo },
  directives: {
    autoAnimate:{
      mounted: (el, binding) => {
          autoAnimate(el, binding.value || {});
      },
    }
  },
  setup(props: { inputInitObject: any; }, context: any) {
    const selRef = ref()
    const isHovered = useElementHover(selRef)
    
    return {
      selRef,
      isHovered,
    }
  }
}

</script>

<template>
  <div className="l-item" ref="selRef" v-auto-animate="{ duration: 100 }">   
    {{inputInitObject.shortName??"Comp."}}
    <div 
      className="l-item-hover" 
      v-if="isHovered"
      >
      <MyCompo  :initObj="inputInitObject" v-if="inputInitObject"></MyCompo>
    </div>
  </div>
</template>

<style scoped>
.l-item {
  width: 50px;
  height: 50px;
  background-color: grey;
  position: relative;
}
.l-item-hover{
  position: absolute;
  top:0;
  right: calc(100%);
  padding-right: 15px;
}
</style>
