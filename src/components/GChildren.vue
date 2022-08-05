<script lang="ts">
import { string } from 'prop-types'
import {ref, inject} from 'vue'
export default {
  name: 'bbbb',
  props: {
    text1: string
  },
  emits: ['someevent'],
  setup(props, context) {
    const text1_inject = props.text1? null: inject('text1')
    return {
      click1: ()=>{
        console.log('someEvent', props, text1_inject, context)
        if(text1_inject){
          text1_inject.value = 'parent state changed via provide/inject'
        }else{
          context.emit('someevent', {test: 'emit data'})
        }
      }
    }
  }
}

</script>

<template>
  <div >   
    "GChildren"
    {{text1_inject??text1}}
    <div>
      <button @click="click1">AA</button>
    </div>
  </div>
</template>

<style scoped>

</style>
