<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import * as d3 from "d3";

const selfSvg = ref(null)
const width = 300;
const height = 200;
const data = {
  normal: d3.range(0, 2000).map(d3.randomNormal()),
  logNormal: d3.range(0, 2000).map(d3.randomLogNormal()),
  bates: d3.range(0, 2000).map(d3.randomBates(4)),
  irwinHall: d3.range(0, 2000).map(d3.randomIrwinHall(4)),
  exponential: d3.range(0, 2000).map(d3.randomExponential(0.05)),
};
const numBins = 40
const histogram = computed<any>(() => {
  //return []
  const countHistogram = d3
    .histogram()
    .domain(d3.extent(data.normal)) // get min and max of this.data
    .thresholds(numBins); // we set the number of bins
  return countHistogram(data.normal) // call the function on our fresh data
    .map((bins) => ({ x: bins.x0, y: bins.length })); // we only need the number of element and the start of the bin
});

onMounted(()=>{
  const x = d3
    .scaleBand()
    .padding(0.2)
    .domain(histogram.value.map((d) => d.x))
    .rangeRound([0, width]);
  const y = d3
    .scaleLinear()
    .domain([0, d3.max(histogram.value, (d) => d.y)])
    .range([height, 0]);
  const svg = d3.select(selfSvg.value).append("g");
  svg
    .selectAll("rect")
    .data(histogram.value)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("transform", d => `translate(${x(d.x)}, ${y(d.y)})`)
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.y));
})

</script>
<template>
  <div>aD3</div>
  <svg ref="selfSvg" :width="width" :height="height"></svg>
</template>

<style scoped module></style>
