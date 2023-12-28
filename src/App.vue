<template>
  <main class="m-8">
    <SearchForm @search="handleSearch" />
    <DataTable :items="filteredData" @update="handleUpdateQty" @filter="handleSort" />
  </main>
</template>

<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import { computed, onMounted, toRaw, ref } from 'vue'
import DataTable from './components/DataTable.vue'
import SearchForm from './components/SearchForm.vue'
import mockArray from './utils/mock'
import { useTableStore } from '@/stores/table'

const tableStore = useTableStore()

onMounted(() => {
  tableStore.items = mockArray
})

const searchWord = ref('')
const sortFilter = ref('')
const sortDirection = ref('')

const filteredData = computed(() => {
  if (searchWord.value) {
    return sortedData.value.filter(
      (item) =>
        item.id.toLowerCase().includes(searchWord.value.toLowerCase()) ||
        item.product.toLowerCase().includes(searchWord.value.toLowerCase()) ||
        item.category.toLowerCase().includes(searchWord.value.toLowerCase())
    )
  }

  return sortedData.value
})

const sortedData = computed(() => {
  const itemsArr = toRaw(tableStore.itemsValue)

  if (sortFilter.value && sortDirection.value) {
    return sortDirection.value === 'asc'
      ? itemsArr.toSorted(compareAsc)
      : itemsArr.toSorted(compareDesc)
  }
  return itemsArr
})

function compareAsc(a, b) {
  const prodA = a[sortFilter.value]
  const prodB = b[sortFilter.value]

  if (prodA < prodB) return -1
  if (prodA > prodB) return 1
  return 0
}

function compareDesc(a, b) {
  const prodA = a[sortFilter.value]
  const prodB = b[sortFilter.value]

  if (prodA < prodB) return 1
  if (prodA > prodB) return -1
  return 0
}

const handleSearch = (value) => {
  searchWord.value = value
}

const handleSort = (value) => {
  sortFilter.value = value.sortFilter
  sortDirection.value = value.sortDirection
}

const handleUpdateQty = (value) => {
  const { qty, id } = value
  const itemsArr = toRaw(tableStore.itemsValue)

  const index = itemsArr.findIndex((item) => item.id === id)

  const item = itemsArr[index]

  const newItem = {
    ...item,
    qty
  }

  const newItems = itemsArr.slice(0)
  newItems[index] = newItem
  tableStore.items = newItems
}
</script>
