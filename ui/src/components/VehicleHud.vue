<script setup lang="ts">
import { computed, ref } from "vue";
import { useNuiEvent } from "../composables/useNuiEvent";

const show = ref<boolean>(false);

const speed = ref<number>(0);
const fuel = ref<number>(0);
const altitude = ref<number>(0);
const seatbelt = ref<boolean>(false);

const showSquareB = ref(false);
const showCircleB = ref(false);

const showAltitude = ref(true);
const showSeatbelt = ref(true);

const showSquare = ref(false);
const showCircle = ref(false);

useNuiEvent("car", (data) => {
  show.value = data.show;

  speed.value = data.speed;
  fuel.value = data.fuel * 0.71;
  altitude.value = data.altitude;
  seatbelt.value = data.seatbelt;

  showSeatbelt.value = !!data.showSeatbelt;
  showAltitude.value = !!data.showAltitude;

  showSquareB.value = !!data.showSquareB;
  showCircleB.value = !!data.showCircleB;

  if (data.isPaused === 1) {
    show.value = false;
  }
});

const seatbeltColor = computed(() => {
  if (seatbelt.value) {
    return "transparent";
  } else {
    return "#FF5100";
  }
});

const fuelColor = computed(() => {
  if (fuel.value <= 20) {
    return "#ff0000";
  } else if (fuel.value <= 30) {
    return "#dd6e14";
  } else {
    return "#ffffff";
  }
});
</script>

<template>
  <div id="veh-container">
    <div v-show="show">
      <div class="responsive" id="speedometer">
        <q-circular-progress class="q-ml-xl rotate-[-150deg] opacity-60" :value="66" size="70px" :thickness="0.21" color="white" :min="0" :max="100"> </q-circular-progress>
        <q-circular-progress class="q-ml-xl -left-1/2 rotate-[-150deg]" show-value :value="speed" size="70px" :thickness="0.21" color="white" :min="0" :max="600">
          <div class="speed">{{ speed }}</div>
        </q-circular-progress>
      </div>
      <div class="responsive" id="fuelgauge">
        <q-circular-progress class="q-ml-xl rotate-[-125deg] opacity-60" :value="69" size="36px" :thickness="0.21" color="white" :min="0" :max="100"></q-circular-progress>
        <q-circular-progress class="q-ml-xl -left-1/2 rotate-[-125deg]" show-value :value="fuel" size="36px" :thickness="0.21" :style="{ color: fuelColor }">
          <q-icon name="fas fa-gas-pump" class="rotate-[125deg]" size="14px" color="white" />
        </q-circular-progress>
      </div>
      <div class="responsive" id="altitudegauge" v-if="showAltitude">
        <q-circular-progress class="q-ml-xl rotate-[-135deg] opacity-60" :value="75" size="70px" :thickness="0.21" color="white" :min="0" :max="100"></q-circular-progress>
        <q-circular-progress class="q-ml-xl -left-1/2 rotate-[-135deg]" show-value :value="altitude" size="70px" :thickness="0.21" color="white" :min="0" :max="750">
          <div class="altitude">{{ altitude }}</div>
        </q-circular-progress>
      </div>
      <transition name="fade">
        <div class="responsive" id="seatbelt" v-if="showSeatbelt">
          <q-circular-progress class="q-ml-xl rotate-[-125deg] opacity-60" size="70px" :thickness="0.21" color="white" :min="0" :max="100"></q-circular-progress>
          <q-circular-progress class="q-ml-xl left-[-40%] rotate-[-125deg]" show-value size="70px" :thickness="0.21" color="white" :min="0" :max="750">
            <q-icon name="fas fa-user-slash" style="transform: rotate(125deg)" :value="seatbelt" size="21px" :style="{ color: seatbeltColor }" />
          </q-circular-progress>
        </div>
      </transition>

      <div class="mapborder">
        <div class="square" v-if="showSquare"></div>
      </div>
      <div class="mapborder">
        <div class="circle" v-if="showCircle"></div>
      </div>
    </div>
  </div>
</template>

<style>
.speed:after {
  content: "MPH";
  /* If using KPH change this content from MPH */
  display: block;
  padding-top: 3px;
  padding-left: 2px;
  padding-right: 2px;
  padding-bottom: 8px;
  font-weight: 900;
}

.altitude:after {
  content: "ALT";
  display: block;
  padding-top: 10px;
  padding-left: 2px;
  padding-right: 2px;
  font-weight: 900;
}

.speed {
  transform: rotate(150deg);
  font-size: 2.4vh;
  position: fixed;
  color: #fff;
  text-align: center;
  font-weight: 600;
  text-shadow:
    -1px -1px 0 rgba(0, 0, 0, 0.7),
    1px -1px 0 rgba(0, 0, 0, 0.7),
    -1px 1px 0 rgba(0, 0, 0, 0.7),
    1px 1px 0 rgba(0, 0, 0, 0.7);
}

.altitude {
  transform: rotate(135deg);
  font-size: 2.4vh;
  position: fixed;
  color: #fff;
  text-align: center;
  font-weight: 600;
  text-shadow:
    -1px -1px 0 rgba(0, 0, 0, 0.7),
    1px -1px 0 rgba(0, 0, 0, 0.7),
    -1px 1px 0 rgba(0, 0, 0, 0.7),
    1px 1px 0 rgba(0, 0, 0, 0.7);
}

.mapborder {
  bottom: 7.9%;
  left: 1.3%;
  width: 0%;
  text-align: center;
}

.square {
  bottom: 6.3%;
  width: 29vh;
  height: 18.5vh;
  border: 4px solid #bababa;
  position: absolute;
  display: inline-block;
}

.circle {
  bottom: 6.9%;
  width: 27vh;
  height: 22.9vh;
  border: 4px solid #bababa;
  position: absolute;
  display: inline-block;
  border-radius: 50%;
}
</style>
