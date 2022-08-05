<script lang="ts">
import { useCounter } from "../stores/myPiniaStore";

export default {
  name: 'store-playground',
  setup(props, context) {
    const counter = useCounter()
    //console.log('StorePlayGround', counter)
    return {
        //counter
    }
  }
}

</script>

<template>

  <div >   
        store-playground
  </div>
  <div>
    
  </div>
</template>

<style scoped>
    
</style>
