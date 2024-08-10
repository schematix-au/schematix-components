<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { FloorplanType, TextFieldVariant } from '@/types'

const floorplanTypeId = defineModel('floorplanTypeId', { type: Number, default: undefined })
const bedrooms = defineModel('bedrooms', { type: Number, default: undefined })
const bathrooms = defineModel('bathrooms', { type: Number, default: undefined })
const garages = defineModel('garages', { type: Number, default: undefined })
const livingRooms = defineModel('livingRooms', { type: Number, default: undefined })
const orderBy = defineModel('orderBy', { type: Object, default: undefined })
const minSize = defineModel('minSize', { type: Number, default: undefined })
const maxSize = defineModel('maxSize', { type: Number, default: undefined })
const minWidth = defineModel('minWidth', { type: Number, default: undefined })
const maxWidth = defineModel('maxWidth', { type: Number, default: undefined })
const minLength = defineModel('minLength', { type: Number, default: undefined })
const maxLength = defineModel('maxLength', { type: Number, default: undefined })
// const front = defineModel('front', { type: Boolean, default: undefined })
// const back = defineModel('back', { type: Boolean, default: undefined })

const props = defineProps<{
  floorplanTypes: FloorplanType[]
  onClickFront: () => void
  onClickBack: () => void
  openDefault?: number
  textFieldRounded: number
  textFieldVariant?: TextFieldVariant
  filterElevation: number
  cardRounded: number
}>()

const open = ref(props.openDefault)

watch(
  () => props.openDefault,
  () => (open.value = props.openDefault)
)

const borderRadius = computed(() => `${props.textFieldRounded}px`)
const variant = computed(() => props.textFieldVariant || undefined)

const orderByOptions = [
  { label: 'Size (lower to higher)', orderBy: 'area', direction: 'asc' },
  { label: 'Size (higher to lower)', orderBy: 'area', direction: 'desc' }
]
</script>

<template>
  <v-expansion-panels class="mb-5" v-model="open">
    <v-expansion-panel
      title="Filters"
      :elevation="filterElevation"
      :style="`border-radius: ${cardRounded}px`"
    >
      <v-expansion-panel-text>
        <v-container class="px-0">
          <v-row>
            <v-col cols="12" sm="4" md="3" lg="2" class="py-0">
              <v-select
                v-model="floorplanTypeId"
                label="Floorplan Types"
                :items="floorplanTypes"
                item-title="name"
                item-value="id"
                clearable
                :variant="variant"
              ></v-select>
            </v-col>
            <v-col cols="6" sm="4" md="3" lg="2" class="py-0">
              <v-select
                v-model="bedrooms"
                label="Bedrooms"
                prepend-inner-icon="mdi-bed-queen-outline"
                :items="[1, 2, 3, 4, 5, 6]"
                clearable
                :variant="variant"
              ></v-select>
            </v-col>
            <v-col cols="6" sm="4" md="3" lg="2" class="py-0">
              <v-select
                v-model="bathrooms"
                label="Bathrooms"
                prepend-inner-icon="mdi-shower"
                :items="[1, 2, 3, 4, 5, 6]"
                clearable
                :variant="variant"
              ></v-select>
            </v-col>
            <v-col cols="6" sm="4" md="3" lg="2" class="py-0">
              <v-select
                v-model="garages"
                label="Garages"
                prepend-inner-icon="mdi-car-outline"
                :items="[1, 2, 3, 4, 5, 6]"
                clearable
                :variant="variant"
              ></v-select>
            </v-col>

            <v-col cols="6" sm="4" md="3" lg="2" class="py-0">
              <v-select
                v-model="livingRooms"
                label="Living Rooms"
                prepend-inner-icon="mdi-sofa-single-outline"
                :items="[1, 2, 3, 4, 5, 6]"
                clearable
                :variant="variant"
              ></v-select>
            </v-col>

            <v-col cols="6" sm="4" md="3" lg="2" class="py-0">
              <v-select
                v-model="orderBy"
                :items="orderByOptions"
                item-title="label"
                return-object
                label="Sort by"
                :variant="variant"
                clearable
              ></v-select>
            </v-col>
          </v-row>

          <v-divider class="mt-5 mb-8"></v-divider>

          <v-row>
            <v-col cols="12" sm="4" class="py-0">
              <div class="d-flex flex-column">
                <div class="pb-2">{{ 'House size(m\u00B2)' }}</div>
                <div class="d-flex flex-row">
                  <v-text-field
                    label="Min"
                    v-model.number="minSize"
                    class="pr-3"
                    :variant="variant"
                  ></v-text-field>
                  <v-text-field
                    label="Max"
                    v-model.number="maxSize"
                    class="pl-3"
                    :variant="variant"
                  ></v-text-field>
                </div>
              </div>
            </v-col>
            <v-col cols="12" sm="4" class="py-0">
              <div class="d-flex flex-column">
                <div class="pb-2">{{ 'House width(m)' }}</div>
                <div class="d-flex flex-row">
                  <v-text-field
                    label="Min"
                    v-model.number="minWidth"
                    class="pr-3"
                    :variant="variant"
                  ></v-text-field>
                  <v-text-field
                    label="Max"
                    v-model.number="maxWidth"
                    class="pl-3"
                    :variant="variant"
                  ></v-text-field>
                </div>
              </div>
            </v-col>
            <v-col cols="12" sm="4" class="py-0">
              <div class="d-flex flex-column">
                <div class="pb-2">{{ 'House length(m)' }}</div>
                <div class="d-flex flex-row">
                  <v-text-field
                    label="Min"
                    v-model.number="minLength"
                    class="pr-3"
                    :variant="variant"
                  ></v-text-field>
                  <v-text-field
                    label="Max"
                    v-model.number="maxLength"
                    class="pl-3"
                    :variant="variant"
                  ></v-text-field>
                </div>
              </div>
            </v-col>
            <!-- <v-col cols="12" sm="4" md="3" xl="2" class="py-0 d-none">
              <div class="d-flex flex-column">
                <div class="pb-2">Master Suite Location</div>
                <div class="d-flex flex-row">
                  <v-checkbox label="Front" v-model="front" @click="onClickFront"></v-checkbox>
                  <v-checkbox label="Back" v-model="back" @click="onClickBack"></v-checkbox>
                </div>
              </div>
            </v-col> -->
          </v-row>
        </v-container>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style scoped>
.v-text-field ::v-deep(.v-field) {
  border-radius: v-bind(borderRadius) !important;
}
</style>
