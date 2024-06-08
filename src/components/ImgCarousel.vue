<script setup lang="ts">
import { ref } from 'vue'
import CarourselItem from './CarouselItem.vue'

const props = defineProps<{
  keys: string[]
  height?: string
  maxHeight?: string
  clickable?: boolean
  borderRadius?: string
  hover?: boolean
}>()

const active = ref(0)

const carouselClick = (direction: 'left' | 'right') => {
  if (direction === 'left') {
    active.value = active.value === 0 ? props.keys.length - 1 : active.value - 1
  } else {
    active.value = active.value === props.keys.length - 1 ? 0 : active.value + 1
  }
}

const touch = window.matchMedia('(pointer: coarse)').matches
</script>

<template>
  <v-hover>
    <template v-slot:default="{ isHovering, props }">
      <div v-bind="props" class="position-relative">
        <v-slide-x-transition v-if="keys.length > 1">
          <v-btn
            v-if="isHovering || hover || touch"
            icon="mdi-chevron-left"
            size="small"
            variant="tonal"
            color="black"
            @click.stop="() => carouselClick('left')"
            style="position: absolute; bottom: 10px; z-index: 1; left: 10px"
          ></v-btn>
        </v-slide-x-transition>

        <v-slide-x-reverse-transition v-if="keys.length > 1">
          <v-btn
            v-if="isHovering || hover || touch"
            icon="mdi-chevron-right"
            size="small"
            variant="tonal"
            color="black"
            @click.stop="() => carouselClick('right')"
            style="position: absolute; bottom: 10px; z-index: 1; right: 10px"
          ></v-btn>
        </v-slide-x-reverse-transition>

        <div>
          <CarourselItem
            v-for="(key, i) in keys"
            :key="i"
            :active="active === i"
            :src="key"
            :height="height ? height : undefined"
            :max-height="maxHeight ? maxHeight : undefined"
            :clickable="clickable"
            :borderRadius="borderRadius"
          />
        </div>
      </div>
    </template>
  </v-hover>
</template>
