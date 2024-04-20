<script setup lang="ts">
import { ref } from 'vue'
import FloorplanDialog from './FloorplanDialog.vue'

import { useDisplay, useTheme } from 'vuetify'

const { xs } = useDisplay()
const { current } = useTheme()
const dark = current.value.dark
const props = defineProps<{
  item: Floorplan
  rounded: string
  elevation: number
  transparent: boolean
}>()
const dialog = ref(false)

const displayUrl = `${import.meta.env.VITE_AWS_URL}${props.item.displayImage}`
</script>
<template>
  <v-card
    :rounded="rounded"
    ripple
    @click="() => {}"
    :color="transparent ? 'transparent' : ''"
    flat
    :class="dark ?? 'text-grey-lighten-2'"
    :elevation="elevation"
  >
    <v-img
      :src="displayUrl"
      :class="rounded === 'rounded' ? 'rounded' : `rounded-${rounded}`"
      height="250"
      cover
    ></v-img>
    <v-card-title class="font-weight-light">{{ item.name }}</v-card-title>
    <v-card-text class="d-flex align-center font-weight-light">
      <div class="pr-3 d-flex align-center">
        <v-icon class="pr-2" icon="mdi-bed-queen-outline"></v-icon>
        {{ item.bedrooms }}
      </div>
      <div class="pr-3 d-flex align-center">
        <v-icon class="pr-2" icon="mdi-shower"></v-icon>
        {{ item.bathrooms }}
      </div>
      <div class="pr-3 d-flex align-center">
        <v-icon class="pr-2" icon="mdi-car-outline"></v-icon>
        {{ item.garages }}
      </div>
      <div class="d-flex align-center">
        <v-icon class="pr-2" icon="mdi-arrow-expand-horizontal"></v-icon>
        {{ item.size }}
      </div>
    </v-card-text>

    <v-dialog v-model="dialog" max-width="700" :fullscreen="xs" activator="parent">
      <FloorplanDialog :item="item" :close="() => (dialog = false)" />
    </v-dialog>
  </v-card>
</template>
