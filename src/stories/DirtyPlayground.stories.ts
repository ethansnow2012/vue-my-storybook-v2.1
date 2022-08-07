
// import GParent from '../components/GParent.vue';
// import GChildren from '../components/GChildren.vue';
import DragableDivBgPlayGround from '../components/DragableDivBgPlayGround.vue';
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

//export const Case1 = Template.bind({});
//Case1.args = {}

export const DragableDivBg = Template2.bind({});
DragableDivBg.args = {}


