<script setup lang="ts">
import { computed } from 'vue'

import ImgCarousel from './ImgCarousel.vue'

import { Floorplan } from '@/types'
import { useTheme } from 'vuetify'

const { current } = useTheme()
const dark = current.value.dark
const props = defineProps<{
  awsUrl: string
  item: Floorplan
  slug?: string
  cardRounded: number
  cardElevation: number
  cardTransparent: boolean
  handleDownload?: (id: number) => void
  handleDelete?: (id: number) => void
  deleteLoading?: boolean
  demo?: boolean
  setDemoItem?: (item: Floorplan) => void
}>()

const to = !props.demo ? `/${props.slug || 'floorplans'}/${props.item.name}` : undefined

const imgKeys = props.item.imgKeys.map((key) => `${props.awsUrl}${key}`)
const borderRadius = computed(() => `border-radius: ${props.cardRounded}px`)

const click = () => {
  if (props.demo && props.setDemoItem) {
    props.setDemoItem(props.item)
  }
}
</script>
<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <v-card
        v-bind="props"
        :style="borderRadius"
        ripple
        :to="to"
        @click="click"
        :color="cardTransparent ? 'transparent' : ''"
        flat
        :class="dark ?? 'text-grey-lighten-2'"
        :elevation="cardElevation"
      >
        <ImgCarousel :keys="imgKeys" :borderRadius="borderRadius" :hover="isHovering" />
        <v-card-title class="font-weight-light d-flex justify-space-between align-center">
          <span>{{ item.name }}</span>
          <span>{{ item.floorplanType.name }}</span>
        </v-card-title>
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
</template>
