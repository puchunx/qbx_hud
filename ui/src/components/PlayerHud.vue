<script setup lang="ts">
import { computed, ref } from "vue";
import { useNuiEvent } from "../composables/useNuiEvent";
import CircularStatus from "./utils/CircularStatus.vue";

const show = ref(false);
const nos = ref(0);
const health = ref(0);
const playerDead = ref(0);
const armor = ref(0);
const hunger = ref(0);
const thirst = ref(0);
const stress = ref(0);
const voice = ref(0);
const radio = ref(0);
const nitroActive = ref(0);
const parachute = ref(0);
const oxygen = ref(0);
const hp = ref(0);
const speed = ref(0);
const engine = ref(0);
const talking = ref(false);

const dynamicHealth = ref(false);
const dynamicArmor = ref(false);
const dynamicHunger = ref(false);
const dynamicThirst = ref(false);
const dynamicStress = ref(false);
const dynamicOxygen = ref(false);
const dynamicEngine = ref(false);
const dynamicNitro = ref(false);

const showVoice = ref(true);
const showArmed = ref(true);
const showCruise = ref(false);
const showHarness = ref(false);
const showParachute = ref(false);
const showDev = ref(false);

const healthColor = computed(() => {
  if (playerDead.value) {
    return "#ff0000";
  } else {
    return "#3FA554";
  }
});

const armorColor = computed(() => {
  if (armor.value <= 0) {
    return "#FF0000";
  } else {
    return "#326dbf";
  }
});

const hungerColor = computed(() => {
  if (hunger.value <= 30) {
    return "#ff0000";
  } else {
    return "#dd6e14";
  }
});

const engineColor = computed(() => {
  if (engine.value <= 45) {
    return "#ff0000";
  } else if (engine.value <= 75) {
    return "#dd6e14";
  } else {
    return "#3FA554";
  }
});

const thirstColor = computed(() => {
  if (thirst.value <= 30) {
    return "#ff0000";
  } else {
    return "#1a7cad";
  }
});

const nosColor = computed(() => {
  if (nitroActive.value) {
    return "#D64763";
  } else {
    return "#FFFFFF";
  }
});

const talkingColor = computed(() => {
  if (talking.value && radio.value) {
    return "#D64763";
  } else if (talking.value) {
    return "#FFFF3E";
  } else {
    return "#FFFFFF";
  }
});

useNuiEvent("hudtick", (data) => {
  show.value = data.show;

  health.value = data.health;
  armor.value = data.armor;
  hunger.value = data.hunger;
  thirst.value = data.thirst;
  stress.value = data.stress;
  voice.value = data.voice;
  talking.value = data.talking;
  radio.value = data.radio;
  engine.value = data.engine;
  nos.value = data.nos;
  oxygen.value = data.oxygen;

  dynamicHealth.value = data.dynamicHealth;
  dynamicArmor.value = data.dynamicArmor;
  dynamicHunger.value = data.dynamicHunger;
  dynamicThirst.value = data.dynamicThirst;
  dynamicStress.value = data.dynamicStress;
  dynamicOxygen.value = data.dynamicOxygen;
  dynamicEngine.value = data.dynamicEngine;
  dynamicNitro.value = data.dynamicNitro;

  playerDead.value = data.playerDead;
  nitroActive.value = data.nitroActive;

  showCruise.value = !!data.cruise;
  showHarness.value = !!data.harness;
  showArmed.value = !!data.armed;
  showParachute.value = data.parachute >= 0;
  showDev.value = !!data.dev;

  if (data.isPaused === 1) {
    show.value = false;
  }
});
</script>

<template>
  <div id="ui-container">
    <div id="playerHud" v-show="show">
      <CircularStatus :show="showVoice" :status="voice" :color="talkingColor" :max="5">
        <q-icon style="top: -0.5px; left: 0px" :name="radio ? 'fas fa-headset' : 'fas fa-microphone'" size="19.5px" color="white" />
      </CircularStatus>
      <CircularStatus :show="!dynamicHealth || health < 100" :status="playerDead ? 100 : health" :color="healthColor">
        <q-icon style="top: -0.5px; left: -0.4px" name="fas fa-heart" size="19.5px" color="white" />
      </CircularStatus>
      <CircularStatus :show="!dynamicArmor || armor > 0" :status="armor" :color="armorColor">
        <q-icon name="fas fa-shield-alt" size="19.5px" color="white" />
      </CircularStatus>
      <CircularStatus :show="!dynamicHunger || hunger < 100" :status="hunger" :color="hungerColor">
        <q-icon style="top: -1px; left: -0.5px" name="fas fa-hamburger" size="19.5px" color="white" />
      </CircularStatus>
      <CircularStatus :show="!dynamicThirst || thirst < 100" :status="thirst" :color="thirstColor">
        <q-icon style="top: -0.5px; left: -0.5px" name="fas fa-tint" size="19.5px" color="white" />
      </CircularStatus>
      <CircularStatus :show="!dynamicStress || stress > 0" :status="stress" colorTheme="stress">
        <q-icon style="top: -0.5px; left: -0.5px" name="fas fa-brain" size="19.5px" color="white" />
      </CircularStatus>
      <CircularStatus :show="!dynamicOxygen || oxygen < 100" :status="oxygen" colorTheme="oxygen">
        <q-icon style="top: -2px; left: -0.1px" name="fas fa-lungs" size="19.5px" color="white" />
      </CircularStatus>
      <CircularStatus :show="showArmed" :status="100" colorTheme="armed">
        <q-icon name="fas fa-stream" size="19.5px" color="white" />
      </CircularStatus>
      <CircularStatus :show="showParachute" :status="parachute" colorTheme="parachute">
        <q-icon name="fas fa-parachute-box" size="23px" color="white" />
      </CircularStatus>
      <CircularStatus :show="(!dynamicEngine || engine < 95) && engine >= 0" :status="engine" :color="engineColor">
        <q-icon style="top: -1px" name="fas fa-oil-can" size="19.5px" :style="{ color: engineColor }" />
      </CircularStatus>
      <CircularStatus :show="showHarness" :status="hp" colorTheme="harness">
        <q-icon name="fas fa-user-slash" size="19.5px" color="white" />
      </CircularStatus>
      <CircularStatus :show="showCruise" :status="speed" colorTheme="cruise">
        <q-icon style="top: -1.5px" name="fas fa-tachometer-alt-fast" size="19.5px" color="white" />
      </CircularStatus>
      <CircularStatus :show="(dynamicNitro && nos > 0) || nos >= 0" :status="nos" colorTheme="nos">
        <q-icon name="fas fa-meteor" size="19.5px" :style="{ color: nosColor }" />
      </CircularStatus>
      <CircularStatus :show="showDev" :status="100" colorTheme="dev">
        <q-icon name="fas fa-terminal" size="19.5px" color="white" />
      </CircularStatus>
    </div>
  </div>
</template>

<style>
#playerHud {
  position: absolute;
  display: flex;
  left: 3vh;
  bottom: 0.2vw;
}

.text-health {
  color: rgb(33, 171, 97) !important;
}

.text-stress {
  color: rgb(255, 0, 0) !important;
}

.text-nos {
  color: rgb(255, 72, 133) !important;
}

.text-cruise {
  color: rgb(255, 72, 133) !important;
}

.text-armed {
  color: rgb(255, 72, 133) !important;
}

.text-harness {
  color: rgb(182, 72, 255) !important;
}

.text-oxygen {
  color: rgb(138, 168, 189) !important;
}

.text-parachute {
  color: rgb(0, 0, 0) !important;
}

.text-dev {
  color: rgb(0, 0, 0) !important;
}

.text-gauge {
  color: rgb(255, 255, 255) !important;
}
</style>
