<script setup lang="ts">
import { computed } from 'vue'
import { SiteSettings } from '@/types'

const props = defineProps<{
  theme: string
  settings: SiteSettings
  logo?: string
  phone?: { number: string; link: string }
}>()

const footerTheme = computed(() => {
  const darkMode = props.settings.footerDarkMode
  if (darkMode === undefined) return props.theme
  return darkMode ? 'customDarkTheme' : 'customLightTheme'
})
</script>

<template>
  <v-footer :theme="footerTheme" class="py-10">
    <v-row justify="center" no-gutters>
      <v-btn
        v-if="settings.homeUrl"
        variant="text"
        class="mx-1"
        rounded="lg"
        :href="settings.homeUrl"
      >
        Home
      </v-btn>
      <v-btn
        v-if="settings.contactUrl"
        variant="text"
        class="mx-1"
        rounded="lg"
        :href="settings.contactUrl"
      >
        Contact
      </v-btn>
      <v-col cols="12" class="d-flex justify-center align-center mt-5" v-if="settings.email">
        <v-btn
          variant="text"
          prepend-icon="mdi-email"
          class="text-none"
          :href="`mailto:${settings.email}`"
        >
          {{ settings.email }}
        </v-btn>
      </v-col>
      <v-col cols="12" class="d-flex justify-center align-center mt-5" v-if="phone">
        <v-btn
          variant="text"
          prepend-icon="mdi-phone"
          class="text-none"
          :href="`tel: ${phone.link}`"
        >
          {{ phone.number }}
        </v-btn>
      </v-col>
      <v-col cols="12" class="d-flex justify-center my-5">
        <v-img
          v-if="logo"
          :src="logo"
          :alt="`${settings.title} logo`"
          max-height="60"
          max-width="60"
          class="pr-0"
        />
      </v-col>
      <v-col class="text-center" cols="12"> © 2024 Schematix. All rights reserved. </v-col>
    </v-row>
  </v-footer>
</template>
