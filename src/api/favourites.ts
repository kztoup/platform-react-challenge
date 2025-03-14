import axios from 'axios'

import { API_BASE_URL, ENDPOINTS, SUB_ID } from 'constants/api'
import {
  IAddFavouriteParams,
  IRemoveFavouriteParams,
  IFavouriteListData,
  IAddFavouriteData,
  IRemoveFavouriteData,
} from './types'

const fetchFavouriteList = (): Promise<IFavouriteListData[]> =>
  axios.get(`${API_BASE_URL}/${ENDPOINTS.FAVOURITES}`).then(({ data }) => data)

const addFavourite = ({ imageId }: IAddFavouriteParams): Promise<IAddFavouriteData> => {
  const data = {
    image_id: imageId,
    sub_id: SUB_ID,
  }
  return axios.post(`${API_BASE_URL}/${ENDPOINTS.FAVOURITES}`, data).then(({ data }) => data)
}

const removeFavourite = ({ favouriteId }: IRemoveFavouriteParams): Promise<IRemoveFavouriteData> =>
  axios.delete(`${API_BASE_URL}/${ENDPOINTS.FAVOURITES}/${favouriteId}`).then(({ data }) => data)

export { fetchFavouriteList, addFavourite, removeFavourite }
