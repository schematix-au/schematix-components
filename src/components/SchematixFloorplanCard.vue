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
        <div class="pa-3">
          <div class="d-flex justify-space-between align-center mb-2">
            <span class="text-h5 font-weight-light">{{ item.name }}</span>
            <span class="text-h6 font-weight-light">{{ item.floorplanType.name }}</span>
          </div>

          <div class="d-flex align-center justify-space-between text-body-2">
            <div class="d-flex align-center">
              <div class="pr-3 d-flex align-center">
                <v-icon class="pr-2" icon="mdi-bed-queen-outline" size="20" />
                {{ item.bedrooms }}
              </div>
              <div class="pr-3 d-flex align-center">
                <v-icon class="pr-2" icon="mdi-shower" size="20" />
                {{ item.bathrooms }}
              </div>
              <div class="pr-3 d-flex align-center">
                <v-icon class="pr-2" icon="mdi-car-outline" size="20" />
                {{ item.garages }}
              </div>
              <div class="pr-3 d-flex align-center">
                <v-icon class="pr-2" icon="mdi-sofa-single-outline" size="20" />
                {{ item.livingRooms }}
              </div>
            </div>
            <div class="d-flex align-center">
              <v-icon class="pr-2" icon="mdi-arrow-expand-horizontal" size="20" />
              {{ item.area }}m<sup>2</sup>
            </div>
          </div>
        </div>
      </v-card>
    </template>
  </v-hover>
</template>
