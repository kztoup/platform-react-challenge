import axios from 'axios'

import { API_BASE_URL, ENDPOINTS } from 'constants/api'
import { IImageListParams, IImageDetailsParams, IImageListData, IImageData } from './types'

const fetchImageList = ({ limit, breedId }: IImageListParams): Promise<IImageListData[]> => {
  const url = new URL(`${API_BASE_URL}/${ENDPOINTS.IMAGES}/search`)
  url.searchParams.set('limit', limit)
  if (breedId) {
    url.searchParams.set('breed_ids', breedId)
  }

  return axios.get(url.href).then(({ data }) => data)
}
const fetchImageDetails = ({ imageId }: IImageDetailsParams): Promise<IImageData> =>
  axios.get(`${API_BASE_URL}/${ENDPOINTS.IMAGES}/${imageId}`).then(({ data }) => data)

export { fetchImageList, fetchImageDetails }
