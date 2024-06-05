<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  active: boolean
  src: string
  height?: string
  maxHeight?: string
  clickable?: boolean
  borderRadius?: string
}>()

const dialog = ref(false)

const click = () => {
  if (props.clickable) dialog.value = true
}
</script>

<template>
  <div>
    <v-img
      v-if="active"
      :src="src"
      :aspect-ratio="16 / 11"
      :height="height ? height : undefined"
      :max-height="maxHeight ? maxHeight : undefined"
      cover
      @click="click"
      :style="borderRadius"
    ></v-img>
    <v-dialog v-model="dialog" fullscreen v-if="clickable">
      <v-card class="position-relative">
        <v-btn
          icon
          variant="flat"
          class="ma-2"
          @click="() => (dialog = false)"
          style="position: absolute; top: 0; right: 0; z-index: 1"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-img :src="src"></v-img>
      </v-card>
    </v-dialog>
  </div>
</template>
