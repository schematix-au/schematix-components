<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { Floorplan } from '@/types'

import ImgCarousel from './ImgCarousel.vue'

const { xs, sm, md, lgAndUp } = useDisplay()
const props = defineProps<{
  awsUrl: string
  item: Floorplan
  rounded: number
  back: () => void
  handleDownload?: (id: number) => void
  handleDelete?: (id: number) => void
  deleteLoading?: boolean
}>()

const deleteDialog = ref(false)

const imgKeys = props.item.imgKeys.map((key) => `${props.awsUrl}${key}`)
const salesKeys = props.item.salesKeys.map((key) => `${props.awsUrl}${key}`)

const rooms = [
  { icon: 'mdi-bed-queen-outline', value: props.item.bedrooms },
  { icon: 'mdi-shower', value: props.item.bathrooms },
  { icon: 'mdi-car-outline', value: props.item.garages },
  { icon: 'mdi-arrow-expand-horizontal', value: props.item.size }
]

const details = [
  { label: 'Area m<sup>2</sup>', value: props.item.area, suffix: 'm<sup>2</sup>' },
  { label: 'Area Sqs', value: (props.item.area * 0.1076391041671).toFixed(2), suffix: 'sqs' },
  { label: 'Length', value: props.item.length, suffix: 'm' },
  { label: 'Width', value: props.item.width, suffix: 'm' },
  { label: 'Ground Floor', value: props.item.groundFloorArea, suffix: 'm<sup>2</sup>' },
  { label: 'First Floor', value: props.item.firstFloorArea, suffix: 'm<sup>2</sup>' },
  { label: 'Garage', value: props.item.garageArea, suffix: 'm<sup>2</sup>' },
  { label: 'Porch', value: props.item.porchArea, suffix: 'm<sup>2</sup>' },
  { label: 'Alfresco', value: props.item.alfrescoArea, suffix: 'm<sup>2</sup>' }
]

const imageClasses = computed(() => {
  const classes = []
  if (xs.value) classes.push('pb-1')
  if (sm.value) classes.push('pr-2')
  if (md.value) classes.push('pr-0')
  if (lgAndUp.value) classes.push('pb-1')
  return classes
})
const salesClasses = computed(() => {
  const classes = []
  if (xs.value || sm.value || md.value) classes.push('pt-1')
  if (lgAndUp.value) classes.push('pl-1')
  return classes
})

const borderRadius = computed(() => `border-radius: ${props.rounded}px`)
</script>

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="d-flex justify-space-between">
        <div class="d-flex align-center">
          <v-btn
            icon="mdi-chevron-left"
            variant="text"
            size="small"
            @click="back"
            class="mr-3"
          ></v-btn>
          <span class="text-h5">{{ item.name }} ({{ item.floorplanType.name }})</span>
        </div>

        <div class="d-flex align-center">
          <v-btn
            v-if="handleDelete"
            @click="() => (deleteDialog = !deleteDialog)"
            icon="mdi-delete"
            color="red"
            variant="text"
            class="mr-2"
          ></v-btn>
          <v-btn
            v-if="xs && handleDownload"
            @click="handleDownload(item.id)"
            icon="mdi-download"
            color="primary"
            size="small"
          ></v-btn>
          <v-btn
            v-else-if="handleDownload"
            @click="handleDownload(item.id)"
            prepend-icon="mdi-download"
            variant="text"
          >
            Download
          </v-btn>
        </div>
      </v-col>
      <v-col cols="12" lg="4">
        <v-container fluid class="pa-0">
          <v-row>
            <v-col cols="12" sm="6" md="4" lg="12" :class="imageClasses">
              <ImgCarousel
                :keys="imgKeys"
                :height="md ? '250' : undefined"
                clickable
                :borderRadius="borderRadius"
              />
            </v-col>
            <v-col sm="6" md="8" lg="12" :class="sm ? 'pl-2' : ''">
              <div class="fill-height border d-flex d-sm-none pa-4" :style="borderRadius">
                <div
                  class="d-flex align-center justify-center font-weight-light flex-grow-1"
                  :class="xs ? 'text-h6' : 'text-h5'"
                  v-for="(room, i) in rooms"
                  :key="i"
                >
                  <v-icon class="pr-2" :icon="room.icon" :size="30"></v-icon>
                  {{ room.value }}
                </div>
              </div>
              <v-container
                class="fill-height border d-none d-sm-flex d-md-none"
                :style="borderRadius"
              >
                <v-row :class="sm && 'fill-height'">
                  <v-col
                    cols="3"
                    sm="6"
                    class="d-flex align-center justify-center"
                    v-for="(room, i) in rooms"
                    :key="i"
                  >
                    <div
                      class="d-flex align-center font-weight-light"
                      :class="xs ? 'text-h6' : 'text-h5'"
                    >
                      <v-icon class="pr-2" :icon="room.icon" :size="40"></v-icon>
                      {{ room.value }}
                    </div>
                  </v-col>
                </v-row>
              </v-container>
              <div class="fill-height border px-4 d-none d-md-block" :style="borderRadius">
                <v-container class="d-flex align-center justify-space-between px-0">
                  <div
                    class="d-flex align-center font-weight-light"
                    :class="xs ? 'text-h6' : 'text-h5'"
                    v-for="(room, i) in rooms"
                    :key="i"
                  >
                    <v-icon class="pr-2" :icon="room.icon" :size="30"></v-icon>
                    {{ room.value }}
                  </div>
                </v-container>
                <v-container fluid class="px-0">
                  <v-row>
                    <v-col
                      md="4"
                      lg="6"
                      class="d-flex justify-space-between"
                      :class="(md && i > 5) || i === details.length - 1 ? 'border-b-0' : 'border-b'"
                      v-for="(detail, i) in details"
                      :key="i"
                    >
                      <span v-html="detail.label"></span>
                      <span class="font-weight-bold">
                        {{ detail.value }}
                        <span v-html="detail.suffix"></span>
                      </span>
                    </v-col>
                  </v-row>
                </v-container>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="12" class="pt-1 d-none d-sm-flex d-md-none">
        <v-container fluid class="pa-0 border pa-4" :style="borderRadius">
          <v-row>
            <v-col
              cols="4"
              class="d-flex justify-space-between"
              :class="i > 5 ? 'border-b-0' : 'border-b'"
              v-for="(detail, i) in details"
              :key="i"
            >
              <span v-html="detail.label"></span>
              <span class="font-weight-bold">
                {{ detail.value }}
                <span v-html="detail.suffix"></span>
              </span>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="12" lg="8" :class="salesClasses">
        <ImgCarousel :keys="salesKeys" clickable :borderRadius="borderRadius" />
      </v-col>
      <v-col cols="12" class="pt-2 d-flex d-sm-none">
        <v-container fluid class="border" :style="borderRadius">
          <v-row>
            <v-col
              cols="12"
              class="d-flex justify-space-between"
              :class="i === details.length - 1 ? 'border-b-0' : 'border-b'"
              v-for="(detail, i) in details"
              :key="i"
            >
              <span v-html="detail.label"></span>
              <span class="font-weight-bold">
                {{ detail.value }}
                <span v-html="detail.suffix"></span>
              </span>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-if="handleDelete" v-model="deleteDialog" max-width="500">
    <v-card>
      <v-card-title>Delete {{ item.name }}</v-card-title>
      <v-card-text>Are you sure you want to delete floorplan {{ item.name }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="() => (deleteDialog = false)">Cancel</v-btn>
        <v-btn @click="handleDelete(item.id)" variant="flat" color="red" :loading="deleteLoading">
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
