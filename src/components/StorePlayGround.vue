<script lang="ts">
import { useCounter } from "../stores/myPiniaStore";
import PiniaStoreInnerUser from './PiniaStoreInnerUser.vue'

export default {
  name: 'store-playground',
  components:{PiniaStoreInnerUser},
  setup(props, context) {
    const counter = useCounter()
    //console.log('StorePlayGround', counter)
    return {
        counter
    }
  }
}

</script>

<template>
  <div>
    <div >   
        store-playground
    </div>
    <div>
      <span>Pinia Counter inner State: </span>{{counter.n}}
    </div>
    <div>
      <span>Pinia Counter Getter: </span>{{counter.double}}
    </div>
    <div>
      <button @click="()=>{counter.increment(3)}">increment by 3</button>
    </div>
  </div>
  
  <PiniaStoreInnerUser></PiniaStoreInnerUser>
  <PiniaStoreInnerUser color="red"></PiniaStoreInnerUser>
</template>

<style scoped>
    
</style>
