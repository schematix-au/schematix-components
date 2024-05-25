import useLoadData from '@/hooks/useLoadData'
import { Floorplan } from '@/types'

interface ResponseData {
  result: Floorplan[]
}

export const useFloorplanTypes = (baseUrl: string) =>
  useLoadData(() => refreshFloorplanTypes(baseUrl))

const refreshFloorplanTypes = async (baseUrl: string) => {
  try {
    const result = await fetch(`${baseUrl}api/floorplans/types/public`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data: ResponseData = await result.json()
    return data.result
  } catch (err) {
    console.error(err)
    throw err
  }
}
