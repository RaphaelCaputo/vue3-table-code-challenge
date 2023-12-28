<template>
  <form class="flex items-center w-full py-4">
    <div class="flex items-center border border-black rounded">
      <input
        type="text"
        placeholder="Product search"
        class="px-4 py-2"
        @input="$emit('search', $event.target.value)"
      />
      <div class="p-2 bg-white border-l border-black">
        <SearchIcon />
      </div>
    </div>
  </form>
</template>

<script setup>
import SearchIcon from './SearchIcon.vue'

defineEmits(['search'])
</script>
