<script setup lang="ts">
import { ref } from "vue";
import { useNuiEvent } from "../composables/useNuiEvent";

const cash = ref(0);
const bank = ref(0);
const amount = ref(0);
const plus = ref(false);
const minus = ref(false);
const showCash = ref(false);
const showBank = ref(false);
const showUpdate = ref(false);

useNuiEvent("showconstant", (data) => {
  showCash.value = true;
  showBank.value = true;
  cash.value = data.cash;
  bank.value = data.bank;
});

useNuiEvent("updatemoney", (data) => {
  showUpdate.value = true;
  amount.value = data.amount;
  bank.value = data.bank;
  cash.value = data.cash;
  minus.value = data.minus;
  plus.value = data.plus;

  if (data.type === "cash") {
    showCash.value = true;
    minus.value = !!data.minus;
    plus.value = !!data.plus;
    setTimeout(() => (showUpdate.value = false), 1000);
    setTimeout(() => (showCash.value = false), 2000);
  }

  if (data.type === "bank") {
    showBank.value = true;
    minus.value = !!data.minus;
    plus.value = !!data.plus;
    setTimeout(() => (showUpdate.value = false), 1000);
    setTimeout(() => (showBank.value = false), 2000);
  }
});

useNuiEvent("show", (data) => {
  if (data.type === "cash" && !showCash.value) {
    showCash.value = true;
    cash.value = data.cash;
    setTimeout(() => (showCash.value = false), 3500);
  } else if (data.type === "bank" && !showBank.value) {
    showBank.value = true;
    bank.value = data.bank;
    setTimeout(() => (showBank.value = false), 3500);
  }
});
</script>

<template>
  <div id="money-container">
    <div id="money-cash">
      <transition name="slide-fade">
        <p v-if="showCash">
          <span id="sign">$&nbsp;</span><span id="money">{{ cash }}</span>
        </p>
      </transition>
    </div>
    <div id="money-bank">
      <transition name="slide-fade">
        <p v-if="showBank">
          <span id="sign">$&nbsp;</span><span id="bank">{{ bank }}</span>
        </p>
      </transition>
    </div>
    <div id="money-change" v-if="showUpdate">
      <p v-if="plus" id="money">
        <span id="plus">+&nbsp;</span><span id="money">{{ amount }}</span>
      </p>
      <p v-else-if="minus" id="minus">
        <span id="minus">-&nbsp;</span><span id="money">{{ amount }}</span>
      </p>
    </div>
  </div>
</template>

<style>
#money-container {
  position: absolute;
  right: 2vw;
  top: 5vh;
  font-weight: 400;
  font-size: 40px;
}

#sign,
#bank {
  font-family: "Pricedown Bl", sans-serif;
  text-align: right;
  color: #00ac31;
  text-shadow:
    -1px -1px 0 rgba(0, 0, 0, 0.7),
    1px -1px 0 rgba(0, 0, 0, 0.7),
    -1px 1px 0 rgba(0, 0, 0, 0.7),
    1px 1px 0 rgba(0, 0, 0, 0.7);
}

#plus {
  font-size: 50px;
  font-family: "Pricedown Bl", sans-serif;
  text-align: right;
  color: #00ac31;
  text-shadow:
    -1px -1px 0 rgba(0, 0, 0, 0.7),
    1px -1px 0 rgba(0, 0, 0, 0.7),
    -1px 1px 0 rgba(0, 0, 0, 0.7),
    1px 1px 0 rgba(0, 0, 0, 0.7);
}

#minus {
  font-size: 50px;
  font-family: "Pricedown Bl", sans-serif;
  text-align: right;
  color: #ac0000;
  text-shadow:
    -1px -1px 0 rgba(0, 0, 0, 0.7),
    1px -1px 0 rgba(0, 0, 0, 0.7),
    -1px 1px 0 rgba(0, 0, 0, 0.7),
    1px 1px 0 rgba(0, 0, 0, 0.7);
}

#money {
  font-family: "Pricedown Bl", sans-serif;
  text-align: right;
  color: #ffffff;
  text-shadow:
    -1px -1px 0 rgba(0, 0, 0, 0.7),
    1px -1px 0 rgba(0, 0, 0, 0.7),
    -1px 1px 0 rgba(0, 0, 0, 0.7),
    1px 1px 0 rgba(0, 0, 0, 0.7);
}
</style>
