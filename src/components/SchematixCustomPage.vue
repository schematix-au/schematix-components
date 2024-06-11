<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useDisplay } from 'vuetify'
import FloorplanFilters from './FloorplanFilters.vue'
import FloorplanCard from './FloorplanCard.vue'
import { TextFieldVariant, NavDensity } from '@/types'
import { useFloorplans } from '../hooks/useFloorplans'
import { useFloorplanTypes } from '../hooks/useFloorplanTypes'
import { parsePhoneNumberFromString } from 'libphonenumber-js'

interface Props {
  baseUrl: string
  awsUrl: string
  organisationId: number
  title: string
  homeUrl?: string
  contactUrl?: string
  email?: string
  phone?: string
  darkMode: boolean
  navBarDarkMode?: boolean
  footerDarkMode?: boolean
  logo?: string
  openDefault?: number
  cardRounded: number
  cardElevation: number
  cardTransparent: boolean
  textFieldRounded: number
  textFieldVariant?: TextFieldVariant
  navElevation: number
  navDensity?: NavDensity
  filterElevation?: number
}

const props = withDefaults(defineProps<Props>(), {
  navDensity: 'default'
})

interface OrderBy {
  id: number
  name: string
  orderBy: string
  direction: string
}

const floorplanTypeId = ref<number>()
const bedrooms = ref<number>()
const bathrooms = ref<number>()
const garages = ref<number>()
const orderBy = ref<OrderBy>()

const minSize = ref<number>()
const maxSize = ref<number>()
const minWidth = ref<number>()
const maxWidth = ref<number>()
const minLength = ref<number>()
const maxLength = ref<number>()

const masterPosRear = ref<boolean>()
const front = ref(false)
const back = ref(false)

const floorplanProps = ref({
  organisationId: props.organisationId,
  floorplanTypeId: floorplanTypeId.value,
  bedrooms: bedrooms.value,
  bathrooms: bathrooms.value,
  garages: garages.value,
  orderBy: orderBy.value
    ? { orderBy: orderBy.value.orderBy, direction: orderBy.value.direction }
    : undefined,
  minSize: minSize.value,
  maxSize: maxSize.value,
  minWidth: minWidth.value,
  maxWidth: maxWidth.value,
  minLength: minLength.value,
  maxLength: maxLength.value,
  masterPosRear: masterPosRear.value
})

watch(
  [
    floorplanTypeId,
    bedrooms,
    bathrooms,
    garages,
    orderBy,
    minSize,
    maxSize,
    minWidth,
    maxWidth,
    minLength,
    maxLength,
    masterPosRear
  ],
  () => {
    floorplanProps.value = {
      organisationId: props.organisationId,
      floorplanTypeId: floorplanTypeId.value || undefined,
      bedrooms: bedrooms.value || undefined,
      bathrooms: bathrooms.value || undefined,
      garages: garages.value || undefined,
      orderBy: orderBy.value
        ? { orderBy: orderBy.value.orderBy, direction: orderBy.value.direction }
        : undefined,
      minSize: minSize.value || undefined,
      maxSize: maxSize.value || undefined,
      minWidth: minWidth.value || undefined,
      maxWidth: maxWidth.value || undefined,
      minLength: minLength.value || undefined,
      maxLength: maxLength.value || undefined,
      masterPosRear: masterPosRear.value
    }
  }
)

const { smAndUp } = useDisplay()

const drawer = ref(false)

const [floorplans] = useFloorplans({ payload: floorplanProps, baseUrl: props.baseUrl })
const [floorplanTypes] = useFloorplanTypes(props.baseUrl)

const theme = computed(() => (props.darkMode ? 'customDarkTheme' : 'customLightTheme'))
const navbarTheme = computed(() => {
  if (props.navBarDarkMode === undefined) return theme.value
  return props.navBarDarkMode ? 'customDarkTheme' : 'customLightTheme'
})
const footerTheme = computed(() => {
  if (props.footerDarkMode === undefined) return theme.value
  return props.footerDarkMode ? 'customDarkTheme' : 'customLightTheme'
})

const onClickFront = () => {
  if (!front.value) masterPosRear.value = false
  else masterPosRear.value = undefined
  back.value = false
}
const onClickBack = () => {
  if (!back.value) masterPosRear.value = true
  else masterPosRear.value = undefined
  front.value = false
}

const href = (url: string) => (location.href = url)

const phoneNumber = computed(() => {
  if (!props.phone) return undefined
  const val = parsePhoneNumberFromString(props.phone, 'AU')
  if (!val) return undefined
  return { number: val.number, formatted: val.formatNational() }
})
</script>

<template>
  <v-theme-provider :theme="theme" with-background>
    <v-app>
      <v-app-bar :elevation="navElevation" :density="navDensity" :theme="navbarTheme">
        <template v-slot:prepend v-if="logo">
          <v-img v-if="logo" :src="logo" alt="Schematix logo" style="height: 40px; width: 40px" />
        </template>
        <v-app-bar-title class="font-weight-light d-flex">{{ title }}</v-app-bar-title>

        <template v-slot:append>
          <v-btn
            v-if="homeUrl && smAndUp"
            @click="() => href(homeUrl as string)"
            variant="plain"
            :class="contactUrl ?? 'mr-2'"
          >
            Home
          </v-btn>
          <v-btn
            v-if="contactUrl && smAndUp"
            @click="() => href(contactUrl as string)"
            variant="plain"
          >
            Contact
          </v-btn>
          <v-app-bar-nav-icon
            v-if="(homeUrl || contactUrl) && !smAndUp"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>
        </template>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" :temporary="false" disable-resize-watcher>
        <v-list>
          <v-list-item v-if="homeUrl" @click="() => href(homeUrl as string)">Home</v-list-item>
          <v-list-item v-if="contactUrl" @click="() => href(contactUrl as string)">
            Contact
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main style="min-height: 75vh">
        <v-container>
          <FloorplanFilters
            v-if="floorplanTypes.type === 'SUCCESS'"
            :floorplanTypes="floorplanTypes.data"
            :onClickFront="onClickFront"
            :onClickBack="onClickBack"
            v-model:floorplanTypeId="floorplanTypeId"
            v-model:bedrooms="bedrooms"
            v-model:bathrooms="bathrooms"
            v-model:garages="garages"
            v-model:orderBy="orderBy"
            v-model:minSize="minSize"
            v-model:maxSize="maxSize"
            v-model:minWidth="minWidth"
            v-model:maxWidth="maxWidth"
            v-model:minLength="minLength"
            v-model:maxLength="maxLength"
            v-model:front="front"
            v-model:back="back"
            :openDefault="openDefault"
            :textFieldVariant="textFieldVariant"
            :textFieldRounded="textFieldRounded"
            :cardRounded="cardRounded"
            :elevation="filterElevation"
          />
          <div v-if="floorplans.type === 'LOADING'" class="d-flex justify-center">Loading...</div>
          <v-row v-else-if="floorplans.type === 'SUCCESS'">
            <v-col cols="12" sm="6" lg="4" xxl="3" v-for="item in floorplans.data" :key="item.id">
              <FloorplanCard
                :awsUrl="awsUrl"
                :item="item"
                :rounded="cardRounded"
                :elevation="cardElevation"
                :transparent="cardTransparent"
              />
            </v-col>
          </v-row>
          <div v-else-if="floorplans.type === 'ERROR'">{{ floorplans.error.message }}</div>
        </v-container>
      </v-main>
      <v-footer :theme="footerTheme" class="py-10">
        <v-row justify="center" no-gutters>
          <v-btn
            v-if="homeUrl"
            variant="text"
            class="mx-1"
            rounded="lg"
            @click="() => href(homeUrl as string)"
          >
            Home
          </v-btn>
          <v-btn
            v-if="contactUrl"
            variant="text"
            class="mx-1"
            rounded="lg"
            @click="() => href(contactUrl as string)"
          >
            Contact
          </v-btn>
          <v-col cols="12" class="d-flex justify-center align-center mt-5" v-if="email">
            <v-btn
              variant="text"
              prepend-icon="mdi-email"
              class="text-none"
              :href="`mailto:${email}`"
            >
              {{ email }}
            </v-btn>
          </v-col>
          <v-col cols="12" class="d-flex justify-center align-center mt-5" v-if="phoneNumber">
            <v-btn
              variant="text"
              prepend-icon="mdi-phone"
              class="text-none"
              :href="`tel: ${phoneNumber.number}`"
            >
              {{ phoneNumber.formatted }}
            </v-btn>
          </v-col>
          <v-col cols="12" class="d-flex justify-center my-5">
            <v-img
              v-if="logo"
              :src="logo"
              :alt="`${title} logo`"
              max-height="60"
              max-width="60"
              class="pr-0"
            />
          </v-col>
          <v-col class="text-center" cols="12"> © 2024 Schematix. All rights reserved. </v-col>
        </v-row>
      </v-footer>
    </v-app>
  </v-theme-provider>
</template>
