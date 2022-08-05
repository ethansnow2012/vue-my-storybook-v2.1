
import AutoAnimationPlayGround from '../components/AutoAnimationPlayGround.vue';
import TooltipPlayGround from '../components/TooltipPlayGround.vue';
import StorePlayGround from '../components/StorePlayGround.vue';
import { createPinia } from 'pinia'
import type { Story } from '@storybook/vue3'

export default {
  title: 'Library Test',
  component: [AutoAnimationPlayGround, TooltipPlayGround, StorePlayGround],
  argTypes: {
  },
};

const Template: Story  = (args ) => ({
  components: { AutoAnimationPlayGround},
  setup() {
    console.log('story 1')
    return { args }
  },
  template: `
  <NavLayout>
    <AutoAnimationPlayGround/>
  </NavLayout>
    `,
})

const Template2: Story  = (args ) => ({
  components: { TooltipPlayGround },
  setup() {
    console.log('story 1')
    return { args }
  },
  template: `
  <TooltipPlayGround>
  </TooltipPlayGround>
    `,
})

const Template3: Story  = (args, {app} ) => {
  // console.log('Template3')
  // const pinia = createPinia()
  // app.use(pinia)
  return {
  components: { StorePlayGround },
  setup() {
    console.log('story 1')
    return { args }
  },
  template: `
  <StorePlayGround>
  </StorePlayGround>
    `
  }
}


export const AutoAnimation = Template.bind({});
AutoAnimation.args = {}


export const Tooltip = Template2.bind({});
Tooltip.args = {}

export const Store = Template3.bind({});
Store.args = {}


