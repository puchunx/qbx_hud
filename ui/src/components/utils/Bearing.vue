<script setup lang="ts">
defineProps({
  degrees: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <svg class="bearing" :viewBox="`${degrees - 90} 0 180 1.5`">
    <text x="0" y="1.5" dominant-baseline="middle" text-anchor="middle" fill="yellow">N</text>
    <text x="360" y="1.5" dominant-baseline="middle" text-anchor="middle" fill="yellow">N</text>
    <text style="font-size: 1.4vh !important; font-weight: 800 !important" x="315" y="-11" dominant-baseline="middle" text-anchor="middle" fill="white">NW</text>
    <text style="font-size: 1.4vh !important; font-weight: 800 !important" x="-45" y="-11" dominant-baseline="middle" text-anchor="middle" fill="white">NW</text>
    <text style="font-size: 1.4vh !important; font-weight: 800 !important" x="45" y="-11" dominant-baseline="middle" text-anchor="middle" fill="white">NE</text>
    <text style="font-size: 1.4vh !important; font-weight: 800 !important" x="405" y="-11" dominant-baseline="middle" text-anchor="middle" fill="white">NE</text>
    <text x="90" y="1.5" dominant-baseline="middle" text-anchor="middle" fill="white">E</text>
    <text style="font-size: 1.4vh !important; font-weight: 800 !important" x="135" y="-11" dominant-baseline="middle" text-anchor="middle" fill="white">SE</text>
    <text x="180" y="1.5" dominant-baseline="middle" text-anchor="middle" fill="white">S</text>
    <text style="font-size: 1.4vh !important; font-weight: 800 !important" x="225" y="-11" dominant-baseline="middle" text-anchor="middle" fill="white">SW</text>
    <text x="270" y="1.5" dominant-baseline="middle" text-anchor="middle" fill="white">W</text>
  </svg>
</template>
