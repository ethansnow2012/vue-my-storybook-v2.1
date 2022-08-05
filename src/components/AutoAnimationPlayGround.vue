<script lang="ts">
import {ref, reactive} from 'vue'
import autoAnimate  from '@formkit/auto-animate'

const data1 = [{id:'sdfasdfag-AAAAAA'}, {id:'sdfasdfag-BBBBBB'}, {id:'sdfasdfag-CCCCCC'}]
export default {
  name: 'AutoAnimationPlayGround',
  props: {

  },
  directives: {
    autoAnimate:{
        mounted: (el, binding) => {
            autoAnimate(el, binding.value || {});
        },
    }
  },
  setup(props, context) {
    const blockDataRepresent = reactive({data: data1})
    const blockDataRepresent2 = ref(data1)
    return {
      blockDataRepresent,
      blockDataRepresent2,
      reandomToggle:()=>{
        const shuffle  = (array:any[]):any[] => {
          return array.sort(() => Math.random() - 0.5);
        }
        const newData = [...data1]
        const random = Math.floor(Math.random() * newData.length);
        if(Math.random()>0.5){
            newData.splice(random, 1)[0];
        }
        blockDataRepresent.data = shuffle(newData)
      },
      reandomToggle2:()=>{
        const shuffle  = (array:any[]):any[] => {
          return array.sort(() => Math.random() - 0.5);
        }
        const newData = [...data1]
        const random = Math.floor(Math.random() * newData.length);
        if(Math.random()>0.5){
            newData.splice(random, 1)[0];
        }
        blockDataRepresent2.value = shuffle(newData)
      }
    }
  }
}

</script>

<template>
  <div>
    <div>Test Case 1:</div>
    <div className="l-block-wrapper" v-auto-animate="{ duration: 500 }">
        <div v-for="block in blockDataRepresent.data" className="l-block" :key="block.id">
            {{block.id}}
        </div>
    </div>
    
    <div className="l-block-control">
        <button className="l-button" @click="reandomToggle">Random Toggle</button>
    </div>
  </div>
  <div>
    <div>Test Case 2:</div>
    <div className="l-block-wrapper" v-auto-animate="{ duration: 500 }" >
        <div v-for="block in blockDataRepresent2" className="l-block" :key="block.id">
            {{block.id}}
        </div>
    </div>
    
    <div className="l-block-control">
        <button className="l-button" @click="reandomToggle2">Random Toggle</button>
    </div>
  </div>
</template>

<style scoped>
    .l-block{
        width: 10em;
        height: 10em;
        background: grey;
        margin: 5px;
    }
</style>
