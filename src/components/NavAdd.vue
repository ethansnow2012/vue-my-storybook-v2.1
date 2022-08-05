<script lang="ts">
import { object } from 'prop-types';
import type { PropType } from 'vue';
import { ref } from 'vue'
import { NavLayoutRootData } from '../dataTypes/MyTypes';
import FetchCall from '../dataService/FetchCall'

export default {
  name: 'my-nav-add',
  props: {
    navLayoutRootData: {
      type: Object as PropType<NavLayoutRootData>
    }
  },
  setup(props) {
    return {
      click: async () => {
        const data = await FetchCall.getNewInitObjType()
        console.log('NavLayoutRootData', props, data)
        //props.navLayoutRootData.navRightTopButtons =
        
        props.navLayoutRootData.navRightTopButtons.inputInitObject.push(data)
      }
    }
  }
}

</script>

<template>
  <div className="l-add" @click="()=>{click()}">
    +
  </div>
</template>

<style scoped>
.l-add {
  color: white;
  background-color: grey;
  width: 50px;
  height: 50px;
  display: grid;
  place-content: center;
  border-radius: 50%;
  font-size: 40px;
  font-weight: bold;
  cursor: pointer;
}
</style>
