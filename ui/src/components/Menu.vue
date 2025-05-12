<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useLocaleStore } from "../stores/locale";
import { fetchNui } from "../utils/fetchNui";
import { useLocalStorage } from "../composables/useLocalStorage";
import { useNuiEvent } from "../composables/useNuiEvent";

const locale = useLocaleStore();

const isOutMapChecked = useLocalStorage<boolean>("isOutMapChecked", true);
const isOutCompassChecked = useLocalStorage<boolean>("isOutCompassChecked", true);
const isCompassFollowChecked = useLocalStorage<boolean>("isCompassFollowChecked", true);
const isMapNotifChecked = useLocalStorage<boolean>("isMapNotifChecked", true);
const isLowFuelChecked = useLocalStorage<boolean>("isLowFuelChecked", true);
const isCinematicNotifChecked = useLocalStorage<boolean>("isCinematicNotifChecked", true);
const isDynamicHealthChecked = useLocalStorage<boolean>("isDynamicHealthChecked", false);
const isDynamicArmorChecked = useLocalStorage<boolean>("isDynamicArmorChecked", false);
const isDynamicHungerChecked = useLocalStorage<boolean>("isDynamicHungerChecked", false);
const isDynamicThirstChecked = useLocalStorage<boolean>("isDynamicThirstChecked", false);
const isDynamicStressChecked = useLocalStorage<boolean>("isDynamicStressChecked", false);
const isDynamicOxygenChecked = useLocalStorage<boolean>("isDynamicOxygenChecked", false);
const isChangeFPSChecked = useLocalStorage<string>("isChangeFPSChecked", "Optimized");
const isToggleMapShapeChecked = useLocalStorage<string>("isToggleMapShapeChecked", "Circle");
const isHideMapChecked = useLocalStorage<boolean>("isHideMapChecked", true);
const isToggleMapBordersChecked = useLocalStorage<boolean>("isToggleMapBordersChecked", true);
const isDynamicEngineChecked = useLocalStorage<boolean>("isDynamicEngineChecked", false);
const isDynamicNitroChecked = useLocalStorage<boolean>("isDynamicNitroChecked", false);
const isChangeCompassFPSChecked = useLocalStorage<string>("isChangeCompassFPSChecked", "Optimized");
const isShowCompassChecked = useLocalStorage<boolean>("isShowCompassChecked", true);
const isShowStreetsChecked = useLocalStorage<boolean>("isShowStreetsChecked", true);
const isPointerShowChecked = useLocalStorage<boolean>("isPointerShowChecked", true);
const isDegreesShowChecked = useLocalStorage<boolean>("isDegreesShowChecked", true);
const isCineamticModeChecked = useLocalStorage<boolean>("isCineamticModeChecked", false);

const splitterModel = ref(20);
const tab = ref("hud");

const intervals = Array(3);
const progress = ref([
  { loading: false, percentage: 0 },
  { loading: false, percentage: 0 },
  { loading: false, percentage: 0 },
]);

function startComputing(id: number) {
  progress.value[id].loading = true;
  progress.value[id].percentage = 0;

  intervals[id] = setInterval(() => {
    progress.value[id].percentage += Math.floor(Math.random() * 8 + 10);
    if (progress.value[id].percentage >= 100) {
      clearInterval(intervals[id]);
      progress.value[id].loading = false;
    }
  }, 700);
}

const show = ref(false);

useNuiEvent("open", () => {
  show.value = true;
});

function closeMenu() {
  show.value = false;
  fetchNui("closeMenu");
}

function resetStorage() {
  localStorage.clear();
  closeMenu();
  fetchNui("resetStorage");
}

function restartHud() {
  closeMenu();
  fetchNui("restartHud");
}

const eventLisner = (event: { data: { event: string; toggle: string } }) => {
  if (event.data.event === "isToggleMapShapeChecked") {
    isToggleMapShapeChecked.value = event.data.toggle;
  } else if (event.data.event === "isChangeFPSChecked") {
    isChangeCompassFPSChecked.value = event.data.toggle;
  }
};

onMounted(() => {
  window.addEventListener("message", eventLisner);

  document.onkeyup = (data) => {
    if (data.key == "Escape") {
      closeMenu();
    }
  };
});

onUnmounted(() => {
  window.removeEventListener("message", eventLisner);

  intervals.forEach((val) => {
    clearInterval(val);
  });
});
</script>

<template>
  <transition>
    <div v-if="show" id="openmenu">
      <div id="menu">
        <q-splitter v-model="splitterModel" style="height: 50vh">
          <template v-slot:before>
            <q-tabs v-model="tab" active-bg-color="active-tab" inline-label indicator-color="transparent" vertical class="text-tabcolor bg-panel">
              <q-tab name="hud" icon="view_list" label="HUD" style="height: 5.5vh; padding-left: 1vh; justify-content: end"></q-tab>
            </q-tabs>
          </template>
          <template v-slot:after>
            <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up" class="bg-active-tab">
              <q-tab-panel name="hud">
                <div class="q-mb-md">
                  <div class="text-h6 q-mb-md">{{ locale.reset.reset }}<img class="brand-logo" align="right" src="/public//brand-logo.svg" /></div>
                  <div class="q-pa-md q-gutter-sm">
                    <q-btn v-on:click="resetStorage" :loading="progress[0].loading" :percentage="progress[0].percentage" text-color="textbutton" color="bgbutton" @click="startComputing(0)" style="width: 150px">
                      {{ locale.reset.reset_settings }}
                      <template v-slot:loading>
                        <q-spinner-gears class="on-left"></q-spinner-gears>
                        {{ locale.reset.resetting }}
                      </template>
                    </q-btn>
                    <div class="text-h7 q-mb-md">{{ locale.reset.reset_settings_description }}</div>
                    <q-btn v-on:click="restartHud" :loading="progress[1].loading" :percentage="progress[1].percentage" text-color="textbutton" color="bgbutton" @click="startComputing(1)" style="width: 150px">
                      {{ locale.reset.reset_hud }}
                      <template v-slot:loading>
                        <q-spinner-gears class="on-left"></q-spinner-gears>
                        {{ locale.reset.resetting }}
                      </template>
                    </q-btn>
                    <div class="text-h7 q-mb-md">{{ locale.reset.reset_hud_description }}</div>
                  </div>
                  <hr />
                  <div class="text-h6 q-mb-md">{{ locale.options.options }}</div>
                  <div class="text-h7">
                    <q-item borderless tag="label" v-ripple>
                      <q-item-section avatar>
                        <q-checkbox v-model="isOutMapChecked" v-on:click="fetchNui('showOutMap')" color="checkbox" val="1"></q-checkbox>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ locale.options.show_minimap }}</q-item-label>
                        <q-item-label class="text-h7" caption>{{ locale.options.show_minimap_description }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item borderless tag="label" v-ripple>
                      <q-item-section avatar>
                        <q-checkbox v-model="isOutCompassChecked" v-on:click="fetchNui('showOutCompass')" color="checkbox" val="2"></q-checkbox>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ locale.options.show_compass }}</q-item-label>
                        <q-item-label class="text-h7" caption>{{ locale.options.show_compass_description }}</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item borderless tag="label" v-ripple>
                      <q-item-section avatar>
                        <q-checkbox v-model="isCompassFollowChecked" v-on:click="fetchNui('showFollowCompass')" color="checkbox" val="3"></q-checkbox>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ locale.options.follow_cam }}</q-item-label>
                        <q-item-label class="text-h7" caption>{{ locale.options.follow_cam_description }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </div>
                  <hr />
                  <div class="text-h6 q-mb-md">{{ locale.notifications.notifications }}</div>
                  <div class="text-h7">
                    <q-checkbox v-on:click="fetchNui('showMapNotif')" :label="locale.notifications.map" v-model="isMapNotifChecked" color="checkbox" val="7" style="display: flex"></q-checkbox>
                    <q-checkbox v-on:click="fetchNui('showFuelAlert')" :label="locale.notifications.fuel" v-model="isLowFuelChecked" color="checkbox" val="8" style="display: flex"></q-checkbox>
                    <q-checkbox v-on:click="fetchNui('showCinematicNotif')" :label="locale.notifications.cinematic" v-model="isCinematicNotifChecked" color="checkbox" val="9" style="display: flex"></q-checkbox>
                  </div>
                </div>
                <hr />
                <div class="text-h6 q-mb-md">{{ locale.status.status }}</div>
                <div class="text-h7">
                  <q-checkbox v-on:click="fetchNui('dynamicHealth')" :label="locale.status.health" v-model="isDynamicHealthChecked" color="checkbox" val="10" style="display: flex"></q-checkbox>
                  <q-checkbox v-on:click="fetchNui('dynamicArmor')" :label="locale.status.armor" v-model="isDynamicArmorChecked" color="checkbox" val="11" style="display: flex"></q-checkbox>
                  <q-checkbox v-on:click="fetchNui('dynamicHunger')" :label="locale.status.hunger" v-model="isDynamicHungerChecked" color="checkbox" val="12" style="display: flex"></q-checkbox>
                  <q-checkbox v-on:click="fetchNui('dynamicThirst')" :label="locale.status.thirst" v-model="isDynamicThirstChecked" color="checkbox" val="13" style="display: flex"></q-checkbox>
                  <q-checkbox v-on:click="fetchNui('dynamicStress')" :label="locale.status.stress" v-model="isDynamicStressChecked" color="checkbox" val="14" style="display: flex"></q-checkbox>
                  <q-checkbox v-on:click="fetchNui('dynamicOxygen')" :label="locale.status.oxygen" v-model="isDynamicOxygenChecked" color="checkbox" val="15" style="display: flex"></q-checkbox>
                </div>
                <hr />
                <div class="text-h6 q-mb-md">{{ locale.vehicle.vehicle }}</div>
                <div class="text-h7">
                  <q-toggle
                    v-on:click="fetchNui('changeFPS')"
                    size="lg"
                    keep-color
                    icon-color="toggleicons"
                    color="checkbox"
                    :label="`${locale.vehicle.fps} ${isChangeFPSChecked == 'Optimized' ? locale.vehicle.optimized : locale.vehicle.sync}`"
                    unchecked-icon="60fps"
                    false-value="Synced"
                    true-value="Optimized"
                    checked-icon="30fps"
                    v-model="isChangeFPSChecked"
                  ></q-toggle>
                  <div class="text-h7 q-mb-md-d">{{ locale.vehicle.fps_description }}</div>
                  <q-toggle
                    v-on:click="fetchNui('ToggleMapShape')"
                    size="lg"
                    keep-color
                    icon-color="toggleicons"
                    color="checkbox"
                    :label="`${locale.vehicle.minimap} ${isToggleMapShapeChecked == 'square' ? locale.vehicle.square : locale.vehicle.circle}`"
                    unchecked-icon="radio_button_unchecked"
                    false-value="circle"
                    true-value="square"
                    checked-icon="check_box_outline_blank"
                    v-model="isToggleMapShapeChecked"
                  ></q-toggle>
                  <div class="text-h7 q-mb-md-d">{{ locale.vehicle.minimap_description }}</div>
                  <q-checkbox v-on:click="fetchNui('HideMap')" :label="locale.vehicle.hide_map" v-model="isHideMapChecked" color="checkbox" val="15" style="display: flex"></q-checkbox>
                  <q-checkbox v-on:click="fetchNui('ToggleMapBorders')" :label="locale.vehicle.toggle_border" v-model="isToggleMapBordersChecked" color="checkbox" val="16" style="display: flex"></q-checkbox>
                  <q-checkbox v-on:click="fetchNui('dynamicEngine')" :label="locale.vehicle.engine" v-model="isDynamicEngineChecked" color="checkbox" val="17" style="display: flex"></q-checkbox>
                  <q-checkbox v-on:click="fetchNui('dynamicNitro')" :label="locale.vehicle.nitro" v-model="isDynamicNitroChecked" color="checkbox" val="18" style="display: flex"></q-checkbox>
                </div>
                <hr />
                <div class="text-h6 q-mb-md">{{ locale.compass.compass }}</div>
                <div class="text-h7">
                  <q-toggle
                    v-on:click="fetchNui('changeCompassFPS')"
                    size="lg"
                    keep-color
                    icon-color="toggleicons"
                    color="checkbox"
                    :label="`${locale.compass.fps} ${isChangeCompassFPSChecked == 'Optimized' ? locale.compass.optimized : locale.compass.sync}`"
                    unchecked-icon="60fps"
                    false-value="Synced"
                    true-value="Optimized"
                    checked-icon="30fps"
                    v-model="isChangeCompassFPSChecked"
                  ></q-toggle>
                  <div class="text-h7 q-mb-md-d">{{ locale.compass.fps_description }}</div>
                  <q-item borderless tag="label" v-ripple>
                    <q-item-section avatar>
                      <q-checkbox v-on:click="fetchNui('showCompassBase')" v-model="isShowCompassChecked" color="checkbox" val="19"></q-checkbox>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ locale.compass.show_compass }}</q-item-label>
                      <q-item-label class="text-h7" caption>{{ locale.compass.show_compass_description }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item borderless tag="label" v-ripple>
                    <q-item-section avatar>
                      <q-checkbox v-on:click="fetchNui('showStreetsNames')" v-model="isShowStreetsChecked" color="checkbox" val="20"></q-checkbox>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ locale.compass.show_street }}</q-item-label>
                      <q-item-label class="text-h7" caption>{{ locale.compass.show_street_description }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item borderless tag="label" v-ripple>
                    <q-item-section avatar>
                      <q-checkbox v-on:click="fetchNui('showPointerIndex')" v-model="isPointerShowChecked" color="checkbox" val="21"></q-checkbox>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ locale.compass.show_pointer }}</q-item-label>
                      <q-item-label class="text-h7" caption>{{ locale.compass.show_pointer_description }}</q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item borderless tag="label" v-ripple>
                    <q-item-section avatar>
                      <q-checkbox v-on:click="fetchNui('showDegreesNum')" v-model="isDegreesShowChecked" color="checkbox" val="22"></q-checkbox>
                    </q-item-section>
                    <q-item-section>
                      <q-item-label>{{ locale.compass.show_degrees }}</q-item-label>
                      <q-item-label class="text-h7" caption>{{ locale.compass.show_degrees_description }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </div>
                <hr />
                <div class="text-h6 q-mb-md">{{ locale.cinematic.cinematic }}</div>
                <div class="text-h7">
                  <q-checkbox v-on:click="fetchNui('cinematicMode')" :label="locale.cinematic.enabled" v-model="isCineamticModeChecked" color="checkbox" val="23" style="display: flex"></q-checkbox>
                </div>
                <br />
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </div>
    </div>
  </transition>
</template>

<style>
div#openmenu {
  position: absolute;
  width: 50%;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: "Roboto", "Noto Sans JP", sans-serif;
}

.brand-logo {
  width: 25%;
}
/* when using an svg all you need to change is the width and it will resize it */

/* Menu tab & panel styles */
.text-tabcolor {
  color: rgb(255, 255, 255) !important;
}

.bg-active-tab {
  background: rgb(23 23 23) !important;
}

.bg-panel {
  background: rgb(30 30 30) !important;
}

.q-tab-panels {
  border-top-right-radius: 12px !important;
  border-bottom-right-radius: 12px !important;
}

/* change all 12px for a different border radius (rounds edges of the menu) */
.q-splitter__panel.q-splitter__before {
  border-top-left-radius: 12px !important;
  border-bottom-left-radius: 12px !important;
}

/* change all 12px for a different border radius (rounds edges of the menu) */
.q-tabs--vertical.q-tabs--not-scrollable .q-tabs__content {
  border-top-left-radius: 12px !important;
  border-bottom-left-radius: 12px !important;
}

/* change all 12px for a different border radius (rounds edges of the menu) */

/* Menu text styles */
.text-h6 {
  color: rgb(255, 255, 255) !important;
}

.text-h7 {
  color: rgba(255, 255, 255, 0.8) !important;
}

/* Menu buttons & checkboxes & toggle switch icons styles */
.text-textbutton {
  color: rgb(0, 0, 0) !important;
}

.bg-bgbutton {
  background: rgba(241, 229, 66, 0.651) !important;
}

.q-checkbox__inner {
  color: rgb(255 255 255 / 70%) !important;
}

.text-checkbox {
  color: rgba(241, 229, 66, 0.651) !important;
}

.q-checkbox__svg {
  color: rgb(0, 0, 0) !important;
}

.q-checkbox__inner--truthy .q-checkbox__bg {
  box-shadow: 0px 0px 3px 3px rgb(220 20 60 / 15%) !important;
}

/* if you want the checkboxes to have a glow/shadow */
.text-toggleicons {
  color: rgb(0, 0, 0) !important;
}

/* Menu misc */
hr {
  opacity: 0.1 !important;
}

/* horizontal line that seperates sections */
.q-mb-md {
  margin-bottom: 0px !important;
}

/* removes extra top padding */
.q-mb-md-d {
  padding-left: 10px !important;
  padding-bottom: 10px !important;
}

/* keeps q-items aligned */
.q-item {
  padding: 8px 0px !important;
}

/* keeps q-items aligned */
.q-item__section--avatar {
  min-width: 40px !important;
}

/* keeps q-items aligned */
.q-item__section--side {
  padding-right: 0px !important;
}

/* keeps q-items aligned */
.q-splitter--vertical > .q-splitter__separator {
  width: 0px !important;
}

/* keeps navigation tab panel seamless */
div#q-loading-bar {
  display: none !important;
}

/* makes sure there's no ajax load from quasar */
::-webkit-scrollbar {
  display: none !important;
}

/* makes sure there's no ugly scrollbar on menu*/
</style>
