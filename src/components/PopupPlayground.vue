<script lang="ts">
import Popup from './Popup.vue'
import {ref} from 'vue'
export default {
  name: 'popup-playground',
  components:{Popup},
  setup(props, context) {
    const popupToggle = ref(false)
    return {
        popupToggle
    }
  }
}

</script>

<template>
  <div>
    Popup: 
    <button @click="()=>{popupToggle = true}">Open</button>
    <div >   
        store-playground
    </div>
    <Popup :popupToggle="popupToggle" :popupToggleHandler="(value:boolean)=>{popupToggle=value}"></Popup>
  </div>
  
</template>

<style scoped>
    
</style>
