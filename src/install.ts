import { VCard, VCardText, VCardTitle } from 'vuetify/components/VCard'
import { VImg } from 'vuetify/components/VImg'
import { VIcon } from 'vuetify/components/VIcon'
import { VDialog } from 'vuetify/components/VDialog'
import { VBtn } from 'vuetify/components/VBtn'
import { VApp } from 'vuetify/components/VApp'
import { VAppBar, VAppBarNavIcon, VAppBarTitle } from 'vuetify/components/VAppBar'
import { VThemeProvider } from 'vuetify/components/VThemeProvider'
import { VNavigationDrawer } from 'vuetify/components/VNavigationDrawer'
import { VList, VListItem } from 'vuetify/components/VList'
import { VCol, VContainer, VRow } from 'vuetify/components/VGrid'
import { VMain } from 'vuetify/components/VMain'
import { VCarousel, VCarouselItem } from 'vuetify/components/VCarousel'
import {
  VExpansionPanel,
  VExpansionPanelText,
  VExpansionPanels
} from 'vuetify/components/VExpansionPanel'
import { VSelect } from 'vuetify/components/VSelect'
import { VTextField } from 'vuetify/components/VTextField'
import { VCheckbox } from 'vuetify/components/VCheckbox'
import { VFooter } from 'vuetify/components/VFooter'
import { VDivider } from 'vuetify/components/VDivider'

// There seems to be a bug in Vue where the imported `App` type from 'vue'
// in this lib is not of an assignable type to the `app` that is passed
// into this function when installing the plugin.
// Hence we are typing the arg as `any` for now.
const install = (app: any) => {
  app.component('v-card', VCard)
  app.component('v-img', VImg)
  app.component('v-card-title', VCardTitle)
  app.component('v-card-text', VCardText)
  app.component('v-icon', VIcon)
  app.component('v-dialog', VDialog)
  app.component('v-btn', VBtn)
  app.component('v-app', VApp)
  app.component('v-app-bar', VAppBar)
  app.component('v-app-bar-title', VAppBarTitle)
  app.component('v-theme-provider', VThemeProvider)
  app.component('v-app-var-title', VAppBarTitle)
  app.component('v-app-bar-nav-icon', VAppBarNavIcon)
  app.component('v-navigation-drawer', VNavigationDrawer)
  app.component('v-list', VList)
  app.component('v-list-item', VListItem)
  app.component('v-container', VContainer)
  app.component('v-row', VRow)
  app.component('v-col', VCol)
  app.component('v-main', VMain)
  app.component('v-carousel', VCarousel)
  app.component('v-carousel-item', VCarouselItem)
  app.component('v-expansion-panels', VExpansionPanels)
  app.component('v-expansion-panel', VExpansionPanel)
  app.component('v-select', VSelect)
  app.component('v-expansion-panel-text', VExpansionPanelText)
  app.component('v-text-field', VTextField)
  app.component('v-checkbox', VCheckbox)
  app.component('v-footer', VFooter)
  app.component('v-divider', VDivider)
}

export default install
