
import GParent from '../components/GParent.vue';
import GChildren from '../components/GChildren.vue';
import type { Story } from '@storybook/vue3'
import {ref} from 'vue'

import {  } from "../stories/Library.stories";
export default {
  title: 'My dirty playGround',
  component: [GParent, GChildren],
  argTypes: {
  },
};

const Template: Story  = (args ) => ({
  components: { GParent, GChildren },
  setup() {
    const textFromRoot = ref({str: 'textFromRoot'})
    return { args, textFromRoot, handleCustomChange:(payload)=>{ console.log('ssssss',payload)} }
  },
  template: `
    <div>
      <GParent  >
        <GChildren :text1="textFromRoot" @someevent="(a,payload)=>{handleCustomChange(payload)}"/>
      </GParent>
    </div>
    `,
})


export const Primary = Template.bind({});
Primary.args = {}


