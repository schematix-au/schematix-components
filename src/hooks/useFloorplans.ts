// import useLoadData from '@/hooks/useLoadData'
// import { getFloorplans } from '@/services/api/floorplans'
// import { useFloorplansStore } from '@/stores/floorplans'
// const floorplansStore = useFloorplansStore()

// export const useFloorplans = () => useLoadData(refreshFloorplans)

// const refreshFloorplans = async () => {
//   try {
//     const payload = {
//       organisationId: floorplansStore.organisationId || undefined,
//       floorplanTypeId: floorplansStore.floorplanTypeId || undefined,
//       bedrooms: floorplansStore.bedrooms || undefined,
//       bathrooms: floorplansStore.bathrooms || undefined,
//       garages: floorplansStore.garages || undefined,
//       masterPosRear: floorplansStore.masterPosRear,
//       minSize: floorplansStore.minSize || undefined,
//       maxSize: floorplansStore.maxSize || undefined,
//       minWidth: floorplansStore.minWidth || undefined,
//       maxWidth: floorplansStore.maxWidth || undefined,
//       minLength: floorplansStore.minLength || undefined,
//       maxLength: floorplansStore.maxLength || undefined,
//       orderBy: floorplansStore.orderBy || undefined
//     }
//     const result = await getFloorplans(payload)
//     return result.data.result
//   } catch (err) {
//     console.error(err)
//     throw err
//   }
// }

import useLoadData from '@/hooks/useLoadData'
import type { Ref } from 'vue'
// import { getFloorplans } from '@/services/api/floorplans'
// import { useFloorplansStore } from '@/stores/floorplans'
// const floorplansStore = useFloorplansStore()

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

export const useFloorplans = (payload: Ref<RequestBody>) =>
  useLoadData(() => refreshFloorplans(payload))

const refreshFloorplans = async (payload: Ref<RequestBody>) => {
  try {
    console.log(payload.value)
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
    const result = await fetch(`${import.meta.env.VITE_BASE_URL}api/floorplans/public`, {
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
