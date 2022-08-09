<template>
  <div 
    :class="classes" 
    :style="styles"
    ref="selfRef"
    @click="(ev)=>{
        click$At(ev)
    }"
    >
    <div className="c-root-add">
        {{initObj.textAdd}} <div className="c-root-add-symbol" v-if="expandToggle==false">{{textSymbols.add}}</div>
    </div>
    <div className="c-root-expendable" >
        <div 
            className="c-root-expendable-i" 
            v-for="inputItem in initObj.inputSchema" 
                @click="(ev)=>{
                    ev.stopPropagation()
                }"
            :key="inputItem.id"
            >
            <div v-if="inputItem.type==='text'" className="c-root-expendable-i_text" >
                <label :htmlFor="inputItem.id">{{inputItem.label}}</label>
                <input type="text" :id="inputItem.id" @change="onChange" :value="inputItem.value">
            </div>
            
            <div v-if="inputItem.type==='multiselect'" :className="`c-root-expendable-i_multiselect c-root-expendable-i_multiselect-${multiselectMap.get(inputItem).editMode?'A':'B'}`" >
                <div :style="{display:'flex'}"> 
                    <span>{{inputItem.label}}</span> 
                    <div 
                        :class="{
                            'c-root-expendable-i_multiselect-add': !multiselectMap.get(inputItem).editMode,
                            'c-root-expendable-i_multiselect-minus': multiselectMap.get(inputItem).editMode
                        }" 
                        @click="(ev)=>{onMultiselectAdd(multiselectMap.get(inputItem), ev)}"
                        >
                        <span>{{multiselectMap.get(inputItem).editMode?textSymbols.minus:textSymbols.add}}</span>
                    </div> 
                </div>
                <div className="c-root-expendable-i-selectbox-wrapper">
                    <div className="c-root-expendable-i-selectbox-inner">
                        <div className="c-root-expendable-i-selectbox" :style="{marginTop:multiselectMap.get(inputItem).top}">
                            <div v-for="tag in inputItem.selected" className="c-root-tags" :key="tag.id">
                                <div className="c-root-tags-inner">
                                    {{tag.text}}
                                </div>
                                <div className="c-root-tags-delete" :id="tag.id"  @click="(ev)=>{onTagDelete(inputItem.id, ev)}">
                                    <div className="c-root-tags-delete-inner">
                                        {{textSymbols.cross}}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div :class="{
                            'c-root-expendable-i-selectbox': true,
                            'c-root-expendable-i-selectbox-edit': true,
                            'c-root-v-collapse': !multiselectMap.get(inputItem).editMode
                        } " :style="{marginTop:'unset'}">
                            <div 
                                v-for="tag in inputItem.selectable.filter(x=> inputItem.selected.filter(y=>y.id===x.id).length==0)" 
                                className="c-root-tags"
                                :id="tag.id"
                                :key="tag.id"
                                @click="(ev)=>{onTagAdd(multiselectMap.get(inputItem), inputItem.id, ev)}"
                                >
                                <div className="c-root-tags-inner">
                                    {{tag.text}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';
import { reactive, computed, ref, watch, isReactive, toRefs  } from 'vue'; 
import type { initObjType } from '../dataTypes/MyTypes';
import { useClickOutside } from '../composables/useClickOutside'

interface InteractionState {
    editMode:boolean,
    top: string
}


export default {
  name: 'my-compo',
  props: {
    initObj:{
      type: Object as PropType<initObjType>,//Object,//
      required: true,
    },
  },

  setup(props: { initObj: initObjType; }, { emit }: any) {
    if(!isReactive(props.initObj)){
        throw 'props.initObj only accept reactive object because it directly mutate the state' 
    }
    const textSymbols = {
        add: "+",
        minus: "-",
        cross: "✖"
    }

    const expandToggle = ref(false)
    const selfRef = ref<HTMLElement|null>(null)
    const styles = computed((self) => 
            {
                return {

                } 
            }
        )
    const _multiselectMap = new WeakMap<any, InteractionState>()//
    
    const multiselectMap = computed(()=>{
        const multiselect = props.initObj.inputSchema.filter(x=>x.type==='multiselect')
    
        multiselect.forEach((el)=>{
            _multiselectMap.set(el, {
                editMode:false,
                top:'0'
            })
        })

        return reactive(_multiselectMap) // dark magic here!
    })
    
    watch(expandToggle, ()=>{
        const currentWidth = selfRef.value?getComputedStyle(selfRef.value).width:''
        if(selfRef.value != null){
            if(expandToggle.value){
                selfRef.value.style.minWidth = ''
                selfRef.value.style.maxWidth = currentWidth
                setTimeout(()=>{
                    if(selfRef.value != null)
                    selfRef.value.style.maxWidth =  '500px'
                }, 0)
            }else{
                selfRef.value.style.maxWidth = ''
                selfRef.value.style.minWidth = currentWidth

                setTimeout(()=>{
                    if(selfRef.value != null)
                    selfRef.value.style.minWidth = '0px'
                }, 0)
            }
            
        }
    })
    const onChange = (ev:Event)=>{
        const target = ev.target as HTMLInputElement 
        const currentValue = target.value
        const dueId = target.id
        let dueSchema =  props.initObj.inputSchema.filter(x=>x.id==dueId)[0]
        const restSchema = props.initObj.inputSchema.filter(x=>x.id!=dueId)
        dueSchema.value = currentValue
        
        // props.initObj = { //effect
        //     ...props.initObj, 
        //     inputSchema: [
        //         ...restSchema,
        //         dueSchema
        //     ]
        // }
        console.log('on change')
        props.initObj.inputSchema =  props.initObj.inputSchema.map(x=>x.id===dueSchema.id?dueSchema: x)
    }
    const onTagDelete = (inputId: string, ev:Event)=>{
        const target = ev.target as HTMLInputElement 
        const dueId = target.closest('.c-root-tags')?.querySelector('.c-root-tags-delete')?.id // to be deleted
        let dueSchema =  props.initObj.inputSchema.filter(x=>x.id==inputId)[0]
        const restSchema = props.initObj.inputSchema.filter(x=>x.id!=inputId)
        if(dueSchema.selected){
            dueSchema.selected = [...dueSchema.selected.filter(x=>x.id!=dueId)]
        }

        props.initObj.inputSchema =  props.initObj.inputSchema.map(x=>x.id===dueSchema.id?dueSchema: x)
    }
    const onTagAdd = (target: InteractionState, inputId:string, ev:Event) => {
        const dueId = (ev.target as HTMLInputElement).closest('.c-root-tags')?.id // to be deleted
        let dueSchema =  props.initObj.inputSchema.filter(x=>x.id==inputId)[0]
        const restSchema = props.initObj.inputSchema.filter(x=>x.id!=inputId)
        const tagToAdd = dueSchema.selectable?.filter(x=>x.id==dueId)[0]

        if(dueSchema.selected && tagToAdd){
            dueSchema.selected = [...dueSchema.selected, tagToAdd]
        }

        props.initObj.inputSchema = props.initObj.inputSchema.map(x=>x.id===dueSchema.id?dueSchema: x)
        target.editMode = false //
        target.top = "0px"
    }
    const onMultiselectAdd=(target: InteractionState, ev:Event)=>{
        if(target.editMode == false){
            const htmlTarget = (ev.target as HTMLInputElement).closest('.c-root-expendable-i_multiselect')?.querySelector('.c-root-expendable-i-selectbox')
            if(!htmlTarget) return
            const targetStyle = getComputedStyle(htmlTarget)
            const top = parseFloat(targetStyle.height, 10) + parseFloat(targetStyle.paddingTop, 10) + parseFloat(targetStyle.paddingBottom, 10) + "px"
            target.editMode = true
            target.top = `-${top}`
        }else{
            target.editMode = false
            target.top = `0px`
        }
    }

    useClickOutside(selfRef,()=>{
        expandToggle.value = false
    })
    return {
        classes: computed(() => ({
            'c-root': true,
            'c-root-expanding': expandToggle.value,
        })),
        styles,
        //initObj,
        selfRef,
        expandToggle,
        textSymbols,
        onTagDelete,
        onChange,
        onTagAdd,
        onMultiselectAdd,
        multiselectMap,
        click$At: ()=>{
            expandToggle.value = true//!expandToggle.value
        }
    }
  },
};
</script>
<style scoped>
.c-root{
    ---color1: #8AD2F0;
    ---color2: #C6E9F8;
    ---color-grey: #696969;
    ---color-grey-mild: #b7b7b7;
    ---color-grey-light: #F7F7F8;
    ---sp-1: 20px;
    ---sp-2: 15px;
    ---sp-3: 0.3em;
    
    display: flex;
    background-color: var(---color1);
    color: white;
    width: max-content;
    /* padding: 10px 13px; */
    border-radius: 10px;
    cursor: pointer;
    transition: all .8s ease;
    transition-property: max-width, min-width;
    overflow: hidden;
}

.c-root.c-root-expanding{
    cursor: unset;
    max-width: 0;
}
.c-root > * + *{
    padding-left: 10px;
}
.c-root-expendable{
    width: 0;
    height: 0;
    overflow: hidden;
    padding:0;
    background: var(---color2);;
    color: var(---color-grey);
}
.c-root-expanding .c-root-expendable{
    width: unset;
    height: unset;
    padding-right: 10px;
    padding-left: 10px;
    padding-top: var(---sp-1);
    padding-bottom: var(---sp-1);
}
.c-root-add{
    width: max-content;
    flex-shrink: 0;
    padding: var(---sp-1);
    display: flex;
}
.c-root-add-symbol{
    padding-left: var(---sp-3);
    font-weight: bolder;
    transform: scale(1.3);
    position: relative;
    top: -1px;
}
.c-root-expendable-i{
    display: flex;
    flex-direction: column;
}
.c-root-expendable-i + .c-root-expendable-i{
    margin-top: var(---sp-2);
}
.c-root-expendable-i > * + *{
    margin-top:  var(---sp-3);
}
.c-root-expendable-i input{
    outline: none;
}
.c-root-expendable-i-selectbox{
    background: white;
    border-radius: 10px;
    margin-top:var(---sp-3);
    padding: var(---sp-3);
    display: flex;
    position: relative;
    max-width: 270px;
    flex-wrap: wrap;
}
.c-root-expendable-i-selectbox:first-child{
    top: calc(var(---topOffset) * -1);
}
.c-root-tags{
    width: max-content;
    padding: var(---sp-3);
    border-radius: 8px;
    background-color: var(---color-grey-light);
    border: 1px solid var(---color1);
    display: flex;
    margin-right:var(---sp-3);
    margin-bottom:var(---sp-3);
}
.c-root-expendable-i_text input{
    margin-left:var(---sp-3);
}
    
.c-root-tags-delete{
    margin-left: 3px;
    cursor: pointer;
}
.c-root-tags-delete:hover{
    color:var(---color-grey-mild)
}
.c-root-tags-delete-inner{
    position: relative;
    top: -2px;
}
.c-root-v-collapse{
    height: 0;
    overflow: hidden;
    padding: 0;
}
.c-root-expendable-i_multiselect > *:first-child{
    margin-bottom: var(---sp-3);
}
.c-root-expendable-i_multiselect-add, .c-root-expendable-i_multiselect-minus{
    background-color: #ffffff73;
    width: 15px;
    height: 1.2em;
    display: flex;
    padding-left: 5px;
    border-radius: 4px;
    padding-top: 1px;
    margin-left: var(---sp-3);
    cursor: pointer;
}
.c-root-expendable-i_multiselect-minus span{
    transform: translate(2px);
}
.c-root-expendable-i-selectbox-inner{
    overflow: hidden;
}
.c-root-expendable-i-selectbox-edit{
    background: #fff3e4;
}
.c-root-expendable-i-selectbox-edit .c-root-tags{
    cursor: pointer;
}
</style>
