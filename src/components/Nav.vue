<template>
  <div className="nav-wrapper">
    <NavAdd :navLayoutRootData="rootData.data"></NavAdd>
    <NavItem v-for="inputInitObject in rootData.data?.navRightTopButtons.inputInitObject" :inputInitObject="inputInitObject"></NavItem>
  </div>
  
</template>

<script lang="ts">

import { reactive, computed, watchEffect } from 'vue';
import type { PropType } from 'vue';
import NavItem from './NavItem.vue';
import NavAdd from './NavAdd.vue';
import type { NavLayoutRootData } from '../dataTypes/MyTypes';
//import NavItem from '../c'

export default {
  name: 'my-nav',
  components:{NavItem, NavAdd},
  props:{
    rootData: {type: Object as PropType<{data:NavLayoutRootData|null}>}
  },
  setup(props: { rootData: {data:NavLayoutRootData|null} }, { emit }: any) {
    watchEffect(()=>{ console.log('yo 2222', props.rootData?.data)})
    return {
      
    }
  },
};
</script>
<style scoped>
.nav-wrapper{
    position: absolute;
    top:0;
    right: 0;
    width: max-content;
    margin-left: auto;
    display: flex;
}
.nav-wrapper {
    flex-direction: column;
    gap: 10px;
}
</style>
