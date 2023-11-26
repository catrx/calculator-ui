<script setup lang="ts">
defineProps<{
  result: string
}>()
</script>

<template>
  <div class="w-full h-40 bg-gradient-to-b from-gray-800 to-gray-700 flex items-end text-right">
    <div class="w-full py-5 px-6 text-6xl text-white font-thin">{{ result }}</div>
  </div>
</template>
