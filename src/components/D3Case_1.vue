<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from "vue";
import * as d3 from "d3";
const width = 300;
const height = 200;

const selfSvg = ref(null)

type NodeA = {
  "name": string,
  "children"?: NodeA[],
  "value"?: number
}

const dataInit : NodeA = {
  "name": "flare",
  "children": [
    {
      "name": "analytics",
      "children": [
        {
          "name": "cluster",
          "children": [
            {
              "name": "AgglomerativeCluster",
              "value": 3938
            },
            {
              "name": "CommunityStructure",
              "value": 3812
            },
            {
              "name": "HierarchicalCluster",
              "value": 6714
            },
            {
              "name": "MergeEdge",
              "value": 743
            }
          ]
        }
      ]
    },
    {
      "name": "animate",
      "children": [
        {
          "name": "Easing",
          "value": 17010
        },
        {
          "name": "FunctionSequence",
          "value": 5842
        },
        {
          "name": "interpolate",
          "children": [
            {
              "name": "ArrayInterpolator",
              "value": 1983
            },
            {
              "name": "RectangleInterpolator",
              "value": 2042
            }
          ]
        },
        {
          "name": "ISchedulable",
          "value": 1041
        },
        {
          "name": "Tween",
          "value": 6006
        }
      ]
    },
    {
      "name": "data",
      "children": [
        {
          "name": "converters",
          "children": [
            {
              "name": "Converters",
              "value": 721
            },
            {
              "name": "DelimitedTextConverter",
              "value": 4294
            }
          ]
        },
        {
          "name": "DataField",
          "value": 1759
        },
      ]
    },
    {
      "name": "display",
      "children": [
        {
          "name": "DirtySprite",
          "value": 8833
        },
        {
          "name": "LineSprite",
          "value": 1732
        },
        {
          "name": "RectSprite",
          "value": 3623
        },
        {
          "name": "TextSprite",
          "value": 10066
        }
      ]
    },
    {
      "name": "flex",
      "children": [
        {
          "name": "FlareVis",
          "value": 4116
        }
      ]
    },
    {
      "name": "query",
      "children": [
        {
          "name": "AggregateExpression",
          "value": 1616
        },
        {
          "name": "methods",
          "children": [
            {
              "name": "add",
              "value": 593
            },
            {
              "name": "_",
              "value": 264
            }
          ]
        },
        {
          "name": "Minimum",
          "value": 843
        }
      ]
    },
    {
      "name": "scale",
      "children": [
        {
          "name": "IScaleMap",
          "value": 2105
        },
        {
          "name": "TimeScale",
          "value": 5833
        }
      ]
    }
  ]
}
const data = ref(dataInit)



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
  if(mountedFlag.value){
    console.log('effect 1-2')
    initTrigger.value += 1
    root.value = d3.hierarchy(data.value);
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
      .attr("fill", d => d.children ? null : "#000")
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
const restart = ()=>{
  tickNum.value = 1
  initTrigger.value +=1
}
const input = (ev)=>{
  const newInt = parseInt(ev.target.value)
  tickNum.value = newInt
  initTrigger.value +=1
}
</script>
<template>
  
  <div>D3 Case 1:</div>
  <div  :className="$style['svg-holder']">
    <svg ref="selfSvg" >
      <g>
        <g id="line"></g>
        <g id="node"></g>
      </g>
    </svg>
  </div>
  <div>
    <div><span>tickNum: {{tickNum}}</span></div>
    <button @click="()=>{tickNum += 1}">+</button>
    <button @click="()=>{tickNum -= 1}">-</button>
    <button @click="()=>{ restart() }">restart</button>  
    <div><span>tickNum(with restart): </span><span><input type="range" @change="(ev)=>{input(ev)}"></span></div>
  </div>
</template>

<style scoped module>
.svg-holder{
  width: 300px;
  height: 200px
}
</style>
