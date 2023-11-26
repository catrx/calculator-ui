<script setup lang="ts">
defineProps<{
  value: string
  addValue: (value: any) => void
}>()
</script>

<template>
  <div class="w-1/4 border-r border-b border-orange-400">
    <button
      @click="addValue(value)"
      class="w-full h-16 outline-none focus:outline-none hover:bg-indigo-700 hover:bg-opacity-20 text-white text-opacity-50 text-xl font-light"
    >
      {{ value }}
    </button>
  </div>
</template>
