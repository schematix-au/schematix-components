import useLoadData from '@/hooks/useLoadData'
import { Floorplan } from '@/types'
import type { Ref } from 'vue'

interface RequestBody {
  organisationId: number
  floorplanTypeId?: number
  bedrooms?: number
  bathrooms?: number
  garages?: number
  orderBy?: { orderBy: string; direction: string }
  minSize?: number
  maxSize?: number
  minWidth?: number
  maxWidth?: number
  minLength?: number
  maxLength?: number
  masterPosRear?: boolean
}

interface ResponseData {
  result: Floorplan[]
}

interface Props {
  payload: Ref<RequestBody>
  baseUrl: string
}
export const useFloorplans = ({ payload, baseUrl }: Props) =>
  useLoadData(() => refreshFloorplans({ payload, baseUrl }))

const refreshFloorplans = async ({ payload, baseUrl }: Props) => {
  try {
    const body = {
      organisationId: payload.value.organisationId,
      floorplanTypeId: payload.value.floorplanTypeId,
      bedrooms: payload.value.bedrooms,
      bathrooms: payload.value.bathrooms,
      garages: payload.value.garages,
      orderBy: payload.value.orderBy,
      minSize: payload.value.minSize,
      maxSize: payload.value.maxSize,
      minWidth: payload.value.minWidth,
      maxWidth: payload.value.maxWidth,
      minLength: payload.value.minLength,
      maxLength: payload.value.maxLength,
      masterPosRear: payload.value.masterPosRear
    }
    const result = await fetch(`${baseUrl}api/floorplans/public`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })

    const data: ResponseData = await result.json()
    return data.result
  } catch (err) {
    console.error(err)
    throw err
  }
}
