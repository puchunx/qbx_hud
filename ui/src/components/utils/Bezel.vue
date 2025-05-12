<script setup lang="ts">
defineProps({
  degrees: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <svg class="bezel" :viewBox="`${degrees - 90} 0 180 5`">
    <rect width="3" stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="20" x="-90" />
    <rect width="3" stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="9" x="-45" />
    <rect width="4.5" stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="20" x="0" />
    <rect width="3" stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="9" x="45" />
    <rect width="4.5" stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="20" x="90" />
    <rect width="3" stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="9" x="135" />
    <rect width="4.5" stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="20" x="180" />
    <rect width="3" stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="9" x="225" />
    <rect width="4.5" stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="20" x="270" />
    <rect width="3" stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="9" x="315" />
    <rect width="4.5" stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="20" x="360" />
    <rect width="3" stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="9" x="405" />
    <rect width="3" stroke="black" fill="white" stroke-width="0.5" stroke-opacity="0.6" height="20" x="450" />
  </svg>
</template>
