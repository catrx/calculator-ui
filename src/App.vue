<script setup lang="ts">
import CalculatorComponent from '@/components/Calculator/CalculatorComponent.vue'
</script>

<template>
  <header>
    <div class="text-gray-400 text-sm m-2 font-thin">
      JetCalculator by Antonin Catrix
    </div>
  </header>
  <main>
    <div class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
      <CalculatorComponent></CalculatorComponent>
    </div>
  </main>
</template>
