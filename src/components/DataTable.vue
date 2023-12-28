<template>
  <table class="w-full text-sm text-left text-gray-950 min-w-[1100px]">
    <thead class="bg-gray-100 border-b">
      <tr>
        <th class="px-4 py-3">Item code</th>
        <th class="px-4 py-3">
          <div class="flex cursor-pointer" @click="handleSortFilter('product')">
            Product
            <div class="flex flex-col justify-center text-xs">
              <div class="h-4 pl-2 text-gray-300">
                <Component v-if="sortFilter === 'product'" :is="sortFilterIcon" />
                <FilterIcon v-else />
              </div>
            </div>
          </div>
        </th>
        <th class="px-4 py-3">
          <div class="flex cursor-pointer" @click="handleSortFilter('package')">
            Package
            <div class="flex flex-col justify-center text-xs">
              <div class="h-4 pl-2 text-gray-300">
                <Component v-if="sortFilter === 'package'" :is="sortFilterIcon" />
                <FilterIcon v-else />
              </div>
            </div>
          </div>
        </th>
        <th class="px-4 py-3">
          <div class="flex cursor-pointer" @click="handleSortFilter('units')">
            Available units
            <div class="flex flex-col justify-center text-xs">
              <div class="h-4 pl-2 text-gray-300">
                <Component v-if="sortFilter === 'units'" :is="sortFilterIcon" />
                <FilterIcon v-else />
              </div>
            </div>
          </div>
        </th>
        <th class="px-4 py-3">Category</th>
        <th class="px-4 py-3">
          <div class="flex cursor-pointer" @click="handleSortFilter('updated')">
            Last updated
            <div class="flex flex-col justify-center text-xs">
              <div class="h-4 pl-2 text-gray-300">
                <Component v-if="sortFilter === 'updated'" :is="sortFilterIcon" />
                <FilterIcon v-else />
              </div>
            </div>
          </div>
        </th>
        <th class="px-4 py-3">Edit available quantity</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id" class="border-b">
        <td class="px-4 py-3">{{ item.id }}</td>
        <td class="px-4 py-3">{{ item.product }}</td>
        <td class="px-4 py-3">{{ item.package }} {{ item.metric }}</td>
        <td class="px-4 py-3">{{ formatNumber(item.units) }}</td>
        <td class="px-4 py-3">{{ item.category }}</td>
        <td class="px-4 py-3">{{ formatDate(item.updated) }}</td>
        <td class="px-4 py-3">
          <div class="flex items-center border border-black rounded">
            <label for="qty" class="px-4 py-2 bg-gray-100 border-r border-black">Qty</label>
            <input
              class="w-full p-2"
              name="qty"
              type="text"
              :value="item.qty"
              @input="$emit('update', { qty: $event.target.value, id: item.id })"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { computed, ref } from 'vue'
import FilterIcon from './FilterIcon.vue'
import FilterIconAsc from './FilterIconAsc.vue'
import FilterIconDesc from './FilterIconDesc.vue'

defineProps({
  items: {
    type: Array,
    required: true
  }
})
const emit = defineEmits(['update', 'filter'])

const sortFilter = ref('')
const sortDirection = ref('')
const sortCount = ref(0)

const sortFilterIcon = computed(() => {
  if (sortDirection.value === 'desc') return FilterIconDesc
  if (sortDirection.value === 'asc') return FilterIconAsc
  return FilterIcon
})

const handleSortFilter = (value) => {
  if (sortFilter.value === value) {
    sortDirection.value = 'desc'
    sortCount.value++

    if (sortCount.value >= 2) {
      sortFilter.value = ''
      sortDirection.value = ''
      sortCount.value = 0
    }
    return emit('filter', {
      sortFilter: sortFilter.value,
      sortDirection: sortDirection.value
    })
  }

  sortFilter.value = value
  sortDirection.value = 'asc'
  sortCount.value = 0
  emit('filter', { sortFilter: sortFilter.value, sortDirection: sortDirection.value })
}

const formatDate = (ISOdate) => {
  const date = ISOdate.split('T')[0]
  const hours = ISOdate.split('T')[1].substr(0, 8)
  return `${date} ${hours}`
}

const formatNumber = (number) => {
  return number.toLocaleString('en')
}
</script>
<style scoped>
th {
  @apply relative;
}
th:not(:first-child):before {
  content: '|';
  @apply absolute h-full top-0 left-0 flex justify-center items-center text-gray-200;
}
svg {
  @apply w-full h-full;
}
</style>
