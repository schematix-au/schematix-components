<script setup lang="ts">
import { ref, computed } from 'vue'

import FloorplanDialog from './FloorplanDialog.vue'
import ImgCarousel from './ImgCarousel.vue'

import { Floorplan } from '@/types'
import { useDisplay, useTheme } from 'vuetify'

const { xs } = useDisplay()
const { current } = useTheme()
const dark = current.value.dark
const props = defineProps<{
  awsUrl: string
  item: Floorplan
  rounded: number
  elevation: number
  transparent: boolean
  handleDownload?: (id: number) => void
  handleDelete?: (id: number) => void
  deleteLoading?: boolean
}>()
const dialog = ref(false)

const imgKeys = props.item.imgKeys.map((key) => `${props.awsUrl}${key}`)
const borderRadius = computed(() => `border-radius: ${props.rounded}px`)
</script>
<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-card
        v-bind="props"
        :style="borderRadius"
        ripple
        @click="() => (dialog = !dialog)"
        :color="transparent ? 'transparent' : ''"
        flat
        :class="dark ?? 'text-grey-lighten-2'"
        :elevation="elevation"
      >
        <ImgCarousel :keys="imgKeys" :borderRadius="borderRadius" :hover="isHovering" />
        <v-card-title class="font-weight-light">{{ item.name }} test</v-card-title>
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
      </v-card>
    </template>
  </v-hover>

  <v-dialog v-model="dialog" :fullscreen="xs" max-width="2500">
    <FloorplanDialog
      :awsUrl="awsUrl"
      :item="item"
      :close="() => (dialog = false)"
      :borderRadius="borderRadius"
      :handleDownload="handleDownload"
      :handleDelete="handleDelete"
      :deleteLoading="deleteLoading"
    />
  </v-dialog>
</template>
