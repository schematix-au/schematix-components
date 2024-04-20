import useLoadData from '@/hooks/useLoadData'
// import { getFloorplanTypes } from '@/services/api/floorplanTypes'

// export const useFloorplanTypes = () => useLoadData(refreshFloorplanTypes)

// const refreshFloorplanTypes = async () => {
//   try {
//     const result = await getFloorplanTypes()
//     return result.data.result
//   } catch (err) {
//     console.error(err)
//     throw err
//   }
// }

interface ResponseData {
  result: Floorplan[]
}

export const useFloorplanTypes = () => useLoadData(() => refreshFloorplanTypes())

const refreshFloorplanTypes = async () => {
  try {
    const result = await fetch(`${import.meta.env.VITE_BASE_URL}api/floorplans/types/public`, {
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
