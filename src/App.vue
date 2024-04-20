<script setup lang="ts">
import SchematixCustomPage from '@/components/SchematixCustomPage.vue'
import logo from '@/assets/logo.png'
const navLinks: {
  text: string
  link: string
  color?: string
  variant?: BtnVariant
}[] = [
  { text: 'Home', link: '/', color: 'primary', variant: 'tonal' },
  { text: 'About', link: '/about', variant: 'tonal' },
  { text: 'Contact', link: '/contact', variant: 'tonal' }
]
</script>

<template>
  <SchematixCustomPage
    :userId="1"
    :logo="logo"
    title="Site Title"
    email="dyl@yourwebspace.com.au"
    phone="0490067197"
    :darkMode="true"
    :navBarDarkMode="undefined"
    :footerDarkMode="undefined"
    cardRounded="lg"
    :cardElevation="0"
    :cardTransparent="false"
    textFieldRounded="lg"
    textFieldVariant="outlined"
    :navElevation="4"
    :navLinks="navLinks"
  />
</template>
