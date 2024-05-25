<script setup lang="ts">
import SchematixCustomPage from '@/components/SchematixCustomPage.vue'
import logo from '@/assets/logo.png'
import { BtnVariant } from './types'

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
const baseUrl = import.meta.env.VITE_BASE_URL
const awsUrl = import.meta.env.VITE_AWS_URL
</script>

<template>
  <SchematixCustomPage
    :baseUrl="baseUrl"
    :awsUrl="awsUrl"
    :organisationId="1"
    :logo="logo"
    title="Site Title"
    email="dyl@yourwebspace.com.au"
    phone="0490067197"
    :darkMode="true"
    :navBarDarkMode="undefined"
    :footerDarkMode="undefined"
    :cardRounded="16"
    :cardElevation="0"
    :cardTransparent="false"
    :textFieldRounded="10"
    textFieldVariant="outlined"
    :navElevation="4"
    :navLinks="navLinks"
  />
</template>
