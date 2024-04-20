declare type DbVals = {
  id: number
  createdAt: string
  updatedAt: string
}

type TextFieldVariant =
  | 'filled'
  | 'outlined'
  | 'plain'
  | 'solo'
  | 'solo-filled'
  | 'solo-inverted'
  | 'underlined'
type BtnVariant = 'text' | 'outlined' | 'flat' | 'elevated' | 'tonal' | 'plain'
type NavDesity = 'comfortable' | 'compact' | 'default' | 'prominent'

declare type NewFloorplan = {
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
  displayImage: string
  informalImage: string
  siteImage: string
  techImage: string
  premium: boolean
  masterPosRear: boolean
  floorplanTypeId: number
}
declare type Floorplan = NewFloorplan & DbVals

declare type NewFloorplanType = {
  name: string
}
declare type FloorplanType = NewFloorplanType & DbVals

declare type NewUser = {
  email: string
  username?: string
  password: string
  admin?: boolean
  domain?: string
}
declare type User = NewUser & DbVals

// declare type UserInstance = User & {
//   subscription?: Subscription
// }
