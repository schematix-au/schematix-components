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
  premium: boolean
  masterPosRear: boolean
  floorplanTypeId: number
}
export type Floorplan = NewFloorplan & DbVals

export type NewFloorplanType = {
  name: string
}
export type FloorplanType = NewFloorplanType & DbVals

export type NewUser = {
  email: string
  username?: string
  password: string
  admin?: boolean
  domain?: string
}
export type User = NewUser & DbVals
