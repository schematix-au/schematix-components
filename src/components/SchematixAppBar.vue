<script setup lang="ts">
import { ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { SiteSettings } from '@/types'

const props = defineProps<{
  theme: string
  logo?: string
  settings: SiteSettings
}>()

const { smAndUp } = useDisplay()

const drawer = ref(false)

const navbarTheme = computed(() => {
  const darkMode = props.settings.navBarDarkMode
  if (darkMode === undefined) return props.theme
  return darkMode ? 'customDarkTheme' : 'customLightTheme'
})
</script>

<template>
  <v-app-bar :elevation="settings.navElevation" :theme="navbarTheme" class="mx-2">
    <template v-slot:prepend v-if="logo">
      <v-img :src="logo" class="logo-size" :alt="`${settings.title} logo`" />
    </template>
    <v-app-bar-title class="font-weight-light d-flex">
      {{ settings.title || 'Site Title' }}
    </v-app-bar-title>

    <template v-slot:append>
      <v-btn
        v-if="settings.homeUrl && smAndUp"
        :href="settings.homeUrl"
        variant="plain"
        :class="settings.contactUrl ?? 'mr-2'"
      >
        Home
      </v-btn>
      <v-btn v-if="settings.contactUrl && smAndUp" :href="settings.contactUrl" variant="plain">
        Contact
      </v-btn>
      <v-app-bar-nav-icon
        v-if="(settings.homeUrl || settings.contactUrl) && !smAndUp"
        @click.stop="drawer = !drawer"
      />
    </template>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" :temporary="false" disable-resize-watcher>
    <v-list>
      <v-list-item v-if="settings.homeUrl" :href="settings.homeUrl"> Home </v-list-item>
      <v-list-item v-if="settings.contactUrl" :href="settings.contactUrl"> Contact </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
.logo-size {
  height: 40px;
  width: 40px;
}
</style>
