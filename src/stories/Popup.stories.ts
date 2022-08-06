import PopupPlayground from "../components/PopupPlayground.vue";
import type { initObjType } from "../dataTypes/MyTypes";
import type { Story } from "@storybook/vue3";
import { reactive, watchEffect, ref, watch, toRaw } from "vue";

export default {
  title: "popup",
  component: [PopupPlayground],
  argTypes: {},
};

const Template: Story<any> = (args) => ({
  components: { PopupPlayground },
  setup() {
    return { args };
  },
  template: '<PopupPlayground />',
});

export const Primary = Template.bind({});

Primary.args = {};
