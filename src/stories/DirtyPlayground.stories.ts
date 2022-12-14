
// import GParent from '../components/GParent.vue';
// import GChildren from '../components/GChildren.vue';
import DragableDivBgPlayGround from '../components/DragableDivBgPlayGround.vue';
import D3Playground_ from "../components/D3Playground.vue"
import HalfRangeDiv_ from "../components/HalfRangeDiv.vue"
import type { Story } from '@storybook/vue3'
import {ref} from 'vue'

export default {
  title: 'My dirty playGround',
  component: [],
  argTypes: {
  },
};

const Template: Story  = (args ) => ({
  components: {  },//GParent, GChildren
  setup() {
    const textFromRoot = ref({str: 'textFromRoot'})
    return { args, textFromRoot, handleCustomChange:(payload)=>{ 
      console.log('ssssss',payload)
      textFromRoot.value = payload.test
    } }
  },
  template: `
    <div>
      not using this any more.
    </div>
    `,
})
const Template2: Story  = (args ) => ({
  components: { DragableDivBgPlayGround },
  setup() {
    
    return {  }
  },
  template: `
    <div>
      <DragableDivBgPlayGround></DragableDivBgPlayGround>
    </div>
    `,
})
const Template3: Story  = (args ) => ({
  components: { D3Playground_ },
  setup() {
    
    return {  }
  },
  template: `
    <div>
      <D3Playground_></D3Playground_>
    </div>
    `,
})
const Template4: Story  = (args ) => ({
  components: { HalfRangeDiv_ },
  setup() {
    
    return {  }
  },
  template: `
    <div>
      <HalfRangeDiv_></HalfRangeDiv_>
    </div>
    `,
})

//export const Case1 = Template.bind({});
//Case1.args = {}

export const D3Playground = Template3.bind({});
D3Playground.args = {}

export const HalfRangeDiv = Template4.bind({});

