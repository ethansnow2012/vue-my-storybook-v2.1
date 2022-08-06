<script lang="ts">
import { useCounter } from "../stores/myPiniaStore";

export default {
  name: 'store-playground',
  props:{
    color: {type: String}
  },
  setup(props, context) {
    const counter = useCounter()
    return {
        counter,
        color: props.color??'aliceblue'
    }
  }
}

</script>

<template>
    <div class="l-self">
        <div >   
            store-playground
        </div>
        <div>
            <span>Pinia Counter inner State: </span>{{counter.n}}
        </div>
        <div>
            <span>Pinia Counter Getter: </span>{{counter.double}}
        </div>
    </div>
  
</template>

<style scoped>
    .l-self{
        margin-top: 15px;
        margin-left: 40px;
        background-color: v-bind(color);
    }
</style>
