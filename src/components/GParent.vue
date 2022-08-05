<script lang="ts">
import {ref, provide} from 'vue'
import GChildren from '../components/GChildren.vue';
export default {
  name: 'aaaa',
  props: {

  },
  components: {
    GChildren
  },
  setup(props, context) {
    const text1 =  ref('this should be changed from childen without emit events to parent')
    provide('text1', text1)
    return {
      text1,
      handleCustomChange: ()=>{
        console.log(`emit: slot QQ (Don't work here. Maybe use ref as a trigger? Or just don't couple it here.)`)
      }
    }
  }
}

</script>

<template>
  <div >   
    <div>"GParent"</div>
    <div>
        <slot @someevent="handleCustomChange()"/>
    </div>
    <div>
        --------
    </div>
    <div>
        <GChildren :text1="text1" ></GChildren>
    </div>
  </div>
</template>

<style scoped>

</style>
