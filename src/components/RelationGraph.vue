<script setup lang="ts">
import { ref, computed, onMounted, watchEffect, toRef } from "vue";
import type { NodeA, initObjType, NavLayoutRootData } from '../dataTypes/MyTypes'
import * as d3 from "d3";
const width = 600;
const height = 600;

const getInitObjToNodeA = (initObjTypes:initObjType[]) :NodeA => {
    return {
       name: 'root',
       children: initObjTypes.map((x):NodeA =>{ return { name:x.textAdd} })
    }
}

const props = defineProps<{data:navLayoutRootData}>()
const selfSvg = ref(null)
//const data = ref(props.data.data)

const root = ref<d3.HierarchyNode<unknown>|null> (null)
const links = ref<d3.SimulationLinkDatum<d3.SimulationNodeDatum>[]| d3.HierarchyLink<unknown> |null> (null)
const nodes = ref<d3.HierarchyNode<unknown>[]|null> (null)
const linkForceFn = ref<d3.ForceLink<d3.SimulationNodeDatum, d3.SimulationLinkDatum<d3.SimulationNodeDatum>>|null> (null)
const chargeForceFn = ref<d3.ForceManyBody<d3.SimulationNodeDatum>|null> (null)
const xForceFn = ref<d3.ForceX<d3.SimulationNodeDatum>|null> (null)
const yForceFn = ref<d3.ForceY<d3.SimulationNodeDatum>|null> (null)

const mountedFlag = ref(false)
const tickNum = ref(1)
const initTrigger = ref(1)
let simulation = null

watchEffect(()=>{
  if(mountedFlag.value && props.data){
    console.log('effect 1-2', props)
    initTrigger.value += 1
    root.value = d3.hierarchy(getInitObjToNodeA(props.data.navRightTopButtons.inputInitObject));
    links.value = root.value.links() as d3.SimulationLinkDatum<d3.SimulationNodeDatum>[];
    nodes.value = root.value.descendants() as d3.HierarchyNode<unknown>[]
    
    linkForceFn.value = d3.forceLink(links.value).id(d => d.id).distance(0).strength(1)
    chargeForceFn.value = d3.forceManyBody().strength(-50)
    xForceFn.value = d3.forceX() 
    yForceFn.value = d3.forceY()
  }else{
    console.log('effect 1-1')
  }
})
watchEffect(()=>{
  if(!links.value) return
  if(mountedFlag.value){
    console.log('effect 2-2')
    simulation = d3.forceSimulation(nodes.value as d3.SimulationNodeDatum[])
    .force("link", linkForceFn.value)
    .force("charge", chargeForceFn.value)
    .force("x", xForceFn.value)
    .force("y", yForceFn.value)
    .stop()
    .tick(tickNum.value);
  
  const svg = d3.select(selfSvg.value)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .select("g");

  const link = svg.select("g#line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
    .selectAll("line")
    .data(links.value as unknown[]) // unknown: don't want to mess with this
    .join("line");

  const node = svg.select("g#node")
      .attr("fill", "#fff")
      .attr("stroke", "#000")
      .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(nodes.value as unknown[]) // unknown: don't want to mess with this
    .join("circle")
      .attr("fill", d => d.data.color? d.data.color: (d.children ? null : "#000") )
      .attr("stroke", d => d.children ? null : "#fff")
      .attr("r", 3.5);
  link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);

  node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
  
  }else{
    console.log('effect 2-1')
  }
})

onMounted(()=>{
  mountedFlag.value = true
})
</script>
<template>
    <div  :className="$style['svg-holder']">
        <svg ref="selfSvg" >
            <g>
                <g id="line"></g>
                <g id="node"></g>
            </g>
        </svg>
    </div>
</template>

<style scoped module>
.svg-holder{
  width: 600px;
  height:600px
}
</style>
