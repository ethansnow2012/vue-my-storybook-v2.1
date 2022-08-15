import NavLayout from '../components/NavLayout.vue';
import NavItem from '../components/NavItem.vue';
import MyNav from '../components/Nav.vue';
import RelationGraph from '../components/RelationGraph.vue';
import type { Story } from '@storybook/vue3'
import fetchCall from '../dataService/FetchCall'
import { reactive, watchEffect, ref, watch, toRaw } from 'vue';
import type {NavLayoutRootData} from '../dataTypes/MyTypes'


export default {
  title: 'Example/layout',
  component: [MyNav, NavLayout, NavItem, RelationGraph],
  argTypes: {
  },
};

const Template: Story  = (args ) => ({
  components: { MyNav, NavLayout, NavItem, RelationGraph },
  setup() {
    // This reactive object do self organize. this can be extracted to be a composable.
    const rootData = reactive<{data:NavLayoutRootData|null, loopingState:'waiting'|'fine'}>({data:null, loopingState: 'fine'})
    fetchCall.navLayout().then((data)=>{
      rootData.data = data
    })
    watch(rootData, ()=>{
      
      let isIdentical = true
      if(!rootData.data) return
      console.log('recalc')
      
      const _rootData = JSON.parse(JSON.stringify(toRaw(rootData.data)));

      const newNavLayoutRootData = _rootData;
      const selectable = newNavLayoutRootData?.navRightTopButtons?.inputInitObject.map((x,ii)=>{
        return {id:x.id, text: x.textAdd}
      })
      newNavLayoutRootData?.navRightTopButtons?.inputInitObject.forEach((el)=>{
        el.inputSchema.forEach((el2)=>{
          if(el2.hook && el2.type=='text' && el2.hook.action ==='meta'){
            if(el[el2.hook.payload]!==el2.value){
              isIdentical = false
              console.log('not isIdentical 1')
              el[el2.hook.payload]=el2.value
            }
          }
          if(el2.type=='multiselect'){
            const _selectable = selectable.filter((ss)=>{ return ss.id!=el.id})
            if(JSON.stringify(el2.selectable)!=JSON.stringify(_selectable)){
              isIdentical = false
              console.log('not isIdentical 2')
              el2.selectable = _selectable
            }
            
          }
        })
      })
      
      if(!isIdentical){
        console.log('not Identical')
        rootData.data = newNavLayoutRootData
      }else{
        console.log('identical')
      }
      
    })
    return { args, rootData }
  },
  template: `
  <NavLayout >
    <div>
      <RelationGraph :data="rootData.data"></RelationGraph>
    </div>
    <MyNav v-bind="args" :rootData="rootData"/>
  </NavLayout>
    `,
})


export const Primary = Template.bind({});
Primary.args = {}


