<script setup lang="ts">
import { useDisplay } from 'vuetify'
const { xs } = useDisplay()
const props = defineProps<{
  item: Floorplan
  close: () => void
}>()
const displayImage = `${import.meta.env.VITE_AWS_URL}${props.item.imgKeys[0]}`
const keys = props.item.imgKeys.slice(1).map((key) => `${import.meta.env.VITE_AWS_URL}${key}`)
</script>

<template>
  <v-card :rounded="!xs ? 'lg' : ''">
    <v-img
      :src="displayImage"
      :class="!xs ? 'rounded-lg' : ''"
      :height="xs ? '200' : '360'"
      cover
    ></v-img>
    <v-card-title class="text-h5 pt-5 d-flex justify-space-between align-center font-weight-light">
      {{ item.name }}
      <v-btn icon flat size="small" @click="close" v-if="xs">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text class="d-flex align-center pb-10 justify-space-around">
      <div class="pr-3 d-flex align-center font-weight-light" :class="xs ? 'text-h6' : 'text-h5'">
        <v-icon class="pr-2 mr-2" icon="mdi-bed-queen-outline" :size="xs ? '30' : '40'"></v-icon>
        {{ item.bedrooms }}
      </div>
      <div class="pr-3 d-flex align-center font-weight-light" :class="xs ? 'text-h6' : 'text-h5'">
        <v-icon class="pr-2 mr-2" icon="mdi-shower" :size="xs ? '30' : '40'"></v-icon>
        {{ item.bathrooms }}
      </div>
      <div class="pr-3 d-flex align-center font-weight-light" :class="xs ? 'text-h6' : 'text-h5'">
        <v-icon class="pr-2 mr-2" icon="mdi-car-outline" :size="xs ? '30' : '40'"></v-icon>
        {{ item.garages }}
      </div>
      <div class="d-flex align-center font-weight-light" :class="xs ? 'text-h6' : 'text-h5'">
        <v-icon
          class="pr-2 mr-2"
          icon="mdi-arrow-expand-horizontal"
          :size="xs ? '30' : '40'"
        ></v-icon>
        {{ item.size }}
      </div>
    </v-card-text>
    <v-divider class="mx-5"></v-divider>
    <v-card-text>
      <v-carousel :height="xs ? '250' : '400'" hide-delimiter-background show-arrows="hover">
        <v-carousel-item v-for="key in keys" :key="key" :src="key"></v-carousel-item>
      </v-carousel>
    </v-card-text>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" class="d-flex justify-space-between bottom-border">
            <span>Home Area m<sup>2</sup></span>
            <span class="font-weight-bold">{{ item.area }}m<sup>2</sup></span>
          </v-col>
          <v-col cols="12" sm="6" class="d-flex justify-space-between bottom-border">
            <span>Home Area Sqs</span>
            <span class="font-weight-bold">{{ (item.area * 0.1076391041671).toFixed(2) }}sqs</span>
          </v-col>
          <v-col cols="12" sm="6" class="d-flex justify-space-between bottom-border">
            <span>Garage</span>
            <span class="font-weight-bold">{{ item.garageArea }}m<sup>2</sup></span>
          </v-col>
          <v-col cols="12" sm="6" class="d-flex justify-space-between bottom-border">
            <span>Porch</span>
            <span class="font-weight-bold">{{ item.porchArea }}m<sup>2</sup></span>
          </v-col>
          <v-col cols="12" sm="6" class="d-flex justify-space-between bottom-border">
            <span>Alfresco</span>
            <span class="font-weight-bold">{{ item.alfrescoArea }}m<sup>2</sup></span>
          </v-col>
          <v-col cols="12" sm="6" class="d-flex justify-space-between bottom-border">
            <span>Ground Floor</span>
            <span class="font-weight-bold">{{ item.groundFloorArea }}m<sup>2</sup></span>
          </v-col>
          <v-col cols="12" sm="6" class="d-flex justify-space-between bottom-border">
            <span>First Floor</span>
            <span class="font-weight-bold">{{ item.firstFloorArea }}m<sup>2</sup></span>
          </v-col>
          <v-col cols="12" sm="6" class="d-flex justify-space-between bottom-border">
            <span>Length</span>
            <span class="font-weight-bold">{{ item.length }}m</span>
          </v-col>
          <v-col cols="12" sm="6" class="d-flex justify-space-between bottom-border">
            <span>Width</span>
            <span class="font-weight-bold">{{ item.width }}m</span>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.bottom-border {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
