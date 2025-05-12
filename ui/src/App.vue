<script setup lang="ts">
import Baseplate from "./components/Baseplate.vue";
import Menu from "./components/Menu.vue";
import MoneyContainer from "./components/MoneyContainer.vue";
import PlayerHud from "./components/PlayerHud.vue";
import VehicleHud from "./components/VehicleHud.vue";
</script>

<template>
  <div>
    <Baseplate />
    <Menu />

    <div id="main-container" class="h-auto w-full">
      <MoneyContainer />
      <PlayerHud />
      <VehicleHud />
    </div>
  </div>
</template>

<style>
.q-ml-xl {
  margin-left: -22px !important;
  /* Change this to space radials */
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.15s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
