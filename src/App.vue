<script setup lang="ts">
import SchematixCustomPage from '@/components/SchematixCustomPage.vue'
import logo from '@/assets/logo.png'

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
    homeUrl="https://schematix.com.au"
    contactUrl="https://schematix.com.au/contact"
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
  />
</template>
