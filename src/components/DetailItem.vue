<script setup lang="ts">
defineProps<{
  item: {
    label: string
    value: number
    suffix: string
  }
  borderRadius: string
}>()
</script>

<template>
  <v-col cols="4" lg="6" class="pa-1">
    <div class="d-flex justify-space-between border pa-3" :style="borderRadius">
      <span v-html="item.label"></span>
      <span class="font-weight-bold"> {{ item.value }}<span v-html="item.suffix"></span> </span>
    </div>
  </v-col>
</template>
