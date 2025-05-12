<script setup lang="ts">
defineProps<{
  show: boolean;
  status: number;
  max?: number;
  color?: string;
  colorTheme?: string;
}>();
</script>

<template>
  <transition name="fade">
    <div v-if="show || false">
      <q-circular-progress class="q-ml-xl" style="opacity: 40%" :value="100" size="50px" :color="colorTheme" :thickness="0.24" :style="color && { color }" :min="0" :max="100"></q-circular-progress>
      <q-circular-progress class="q-ml-xl" style="left: -50%" show-value :value="status" size="50px" :color="colorTheme" :thickness="0.24" :style="color && { color }" :min="0" :max="max || 100" center-color="grey-10">
        <slot />
      </q-circular-progress>
    </div>
  </transition>
</template>
