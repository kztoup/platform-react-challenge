import axios from 'axios'

import { API_BASE_URL, ENDPOINTS } from 'constants/api'
import { IBreedListParams, IBreedDetailsParams, IBreedListData, IBreedDetailsData } from './types'

const fetchBreedList = ({ limit, page }: IBreedListParams): Promise<IBreedListData[]> =>
  axios.get(`${API_BASE_URL}/${ENDPOINTS.BREEDS}?limit=${limit}&page=${page}`).then(({ data }) => data)

const fetchBreedDetails = ({ breedId }: IBreedDetailsParams): Promise<IBreedDetailsData> =>
  axios.get(`${API_BASE_URL}/${ENDPOINTS.BREEDS}/${breedId}`).then(({ data }) => data)

export { fetchBreedList, fetchBreedDetails }
