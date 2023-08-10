<template>
  <div class="text-center">
    <button class="mb-10" @click="handleChartReset">Reset</button>
    <div class="w-[400px] flex justify-center">
      <BarChart :key="customData" :data="customData" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { BarChart } from "@components/chart";

const getRandomNumber = () => Math.floor(Math.random() * 101);

const customData = reactive([getRandomNumber(), getRandomNumber()]);

function handleChartReset() {
  customData[0] = getRandomNumber();
  customData[1] = getRandomNumber();
}
</script>

<style lang="scss"></style>
