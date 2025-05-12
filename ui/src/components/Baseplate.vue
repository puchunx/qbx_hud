<script setup lang="ts">
import { ref } from "vue";
import { useNuiEvent } from "../composables/useNuiEvent";
import Bezel from "./utils/Bezel.vue";
import Bearing from "./utils/Bearing.vue";

type Data = {
  show: boolean;
  street1: string;
  street2: string;
  showCompass?: boolean;
  showStreets?: boolean;
  showPointer?: boolean;
  showDegrees?: boolean;
};

const show = ref(true);
const showCompass = ref(true);
const showStreets = ref(true);
const showPointer = ref(true);
const showDegrees = ref(true);

const street1 = ref("");
const street2 = ref("");

const degrees = ref(0);

useNuiEvent("update", (data: { value?: number }) => {
  if (data.value !== undefined) {
    degrees.value = data.value;
  }
});

useNuiEvent("baseplate", (data: Data) => {
  show.value = data.show;

  street1.value = data.street1;
  street2.value = data.street2;

  showCompass.value = !!data.showCompass;
  showStreets.value = !!data.showStreets;
  showPointer.value = !!data.showPointer;
  showDegrees.value = !!data.showDegrees;
});
</script>

<template>
  <div id="baseplate-container" v-show="show">
    <div v-if="showStreets" class="street-container">
      <div class="street2">{{ street2 }}</div>
      <div class="street1">{{ street1 }}</div>
    </div>
    <div class="baseplate" v-show="show">
      <div v-if="showPointer" class="pointer">˅</div>
      <div v-if="showDegrees" class="degrees">{{ degrees }}</div>

      <Bezel v-if="showCompass" :degrees="degrees" />
      <Bearing v-if="showCompass" :degrees="degrees" />
    </div>
  </div>
</template>

<style scoped>
.baseplate {
  position: relative;
  margin: 0 auto;
  top: -0.8vh;
  width: 150px;
  height: auto;
}

.street-container {
  position: relative;
  top: 0.5vh;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 1.4vh;
  letter-spacing: 0.7px;
  text-decoration: none;
  font-style: normal;
  font-variant: small-caps;
  text-transform: none;
  font-weight: 800;
  text-shadow:
    0 0 1px rgba(0, 0, 0, 0.6),
    0 0 1px rgba(0, 0, 0, 0.6),
    0 0 1px rgba(0, 0, 0, 0.6),
    0 0 1px rgba(0, 0, 0, 0.6);
}

.street1 {
  position: absolute;
  margin: 0 auto;
  right: 55%;
  text-align: right !important;
  color: rgb(255, 255, 255);
}

.street2 {
  position: absolute;
  margin: 0 auto;
  left: 55%;
  text-align: left !important;
  color: rgb(255, 255, 255);
}

.pointer {
  position: absolute;
  margin: 0 auto;
  top: -2%;
  left: 0;
  right: 0;
  font-family: "Yantramanav", sans-serif;
  color: rgb(255, 255, 255);
  font-size: 2.2vh;
  text-align: center;
  text-shadow:
    0 0 1px rgba(0, 0, 0, 0.6),
    0 0 1px rgba(0, 0, 0, 0.6),
    0 0 1px rgba(0, 0, 0, 0.6),
    0 0 1px rgba(0, 0, 0, 0.6);
  z-index: 9999;
}

.degrees {
  position: absolute;
  margin: 0 auto;
  top: 80%;
  left: 0;
  right: 0;
  opacity: 0.8;
  font-family: "Yantramanav", sans-serif;
  color: rgb(255, 255, 255);
  font-size: 1.5vh;
  font-weight: 600;
  text-align: center;
  text-shadow:
    0 0 1px rgb(0 0 0 / 60%),
    0 0 1px rgb(0 0 0 / 60%),
    0 0 1px rgb(0 0 0 / 60%),
    0 0 1px rgb(0 0 0 / 60%);
}

.bezel {
  position: relative;
  width: 100%;
  height: 2vh;
  font-family: "Yantramanav", sans-serif;
  font-size: 0.35vh;
  font-weight: 700;
  text-shadow:
    0 0 1px rgba(0, 0, 0, 0.6),
    0 0 1px rgba(0, 0, 0, 0.6),
    0 0 1px rgba(0, 0, 0, 0.6),
    0 0 1px rgba(0, 0, 0, 0.6);
}

.bearing {
  position: relative;
  width: 100%;
  top: -0.5vh;
  height: 3.5vh;
  padding-left: 0.12vw;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 2.3vh;
  letter-spacing: 0.7px;
  text-decoration: none;
  font-style: normal;
  font-variant: small-caps;
  text-transform: none;
  font-weight: 600;
  text-shadow:
    0 0 1px rgba(0, 0, 0, 0.6),
    0 0 1px rgba(0, 0, 0, 0.6),
    0 0 1px rgba(0, 0, 0, 0.6),
    0 0 1px rgba(0, 0, 0, 0.6);
}
</style>
