export type DbVals = {
  id: number
  createdAt: string
  updatedAt: string
}

export type TextFieldVariant =
  | 'filled'
  | 'outlined'
  | 'plain'
  | 'solo'
  | 'solo-filled'
  | 'solo-inverted'
  | 'underlined'
export type BtnVariant = 'text' | 'outlined' | 'flat' | 'elevated' | 'tonal' | 'plain'
export type NavDensity = 'comfortable' | 'compact' | 'default' | 'prominent'

export type NewFloorplan = {
  name: string
  size: number
  width: number
  length: number
  area: number
  garageArea: number
  porchArea: number
  alfrescoArea: number
  groundFloorArea: number
  firstFloorArea: number
  bathrooms: number
  bedrooms: number
  garages: number
  imgKeys: string[]
  salesKeys: string[]
  fileKeys: string[]
  premium: boolean
  masterPosRear: boolean
  floorplanTypeId: number
}
export type Floorplan = NewFloorplan & { floorplanType: FloorplanType } & DbVals

export type NewFloorplanType = {
  name: string
}
export type FloorplanType = NewFloorplanType & DbVals

export type NewOrganisation = {
  slug: string
  siteSettings: SiteSettings
}
export type Organisation = NewOrganisation & DbVals

export type SiteSettings = {
  title: string
  logo?: string
  homeUrl?: string
  contactUrl?: string
  email?: string
  phone?: string
  darkMode: boolean
  expandedDefault: boolean
  navBarDarkMode?: boolean
  navElevation: number
  cardRounded: number
  cardElevation: number
  cardTransparent: boolean
  textFieldRounded: number
  textFieldVariant?: TextFieldVariant
  filterElevation: number
  footerDarkMode?: boolean
}
