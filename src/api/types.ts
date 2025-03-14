export interface IBreedListParams {
  limit: string
  page?: number
}

export interface IBreedDetailsParams {
  breedId: string
}

export interface IAddFavouriteParams {
  imageId: string
}

export interface IRemoveFavouriteParams {
  favouriteId: null | number
}

export interface IImageListParams {
  limit: string
  breedId?: string
}

export interface IImageDetailsParams {
  imageId: string
}

export interface IWeightData {
  imperial: string
  metric: string
}

export interface IBreedListData {
  weight: IWeightData
  id: string
  name: string
  cfa_url: string
  vetstreet_url: string
  vcahospitals_url: string
  temperament: string
  origin: string
  country_codes: string
  country_code: string
  description: string
  life_span: string
  indoor: number
  lap: number
  alt_names: string
  adaptability: number
  affection_level: number
  child_friendly: number
  dog_friendly: number
  energy_level: number
  grooming: number
  health_issues: number
  intelligence: number
  shedding_level: number
  social_needs: number
  stranger_friendly: number
  vocalisation: number
  experimental: number
  hairless: number
  natural: number
  rare: number
  rex: number
  suppressed_tail: number
  short_legs: number
  wikipedia_url: string
  hypoallergenic: number
  reference_image_id: string
  image: IImageData
}

export interface IImageData {
  id: string
  width: string
  height: string
  url: string
  breeds?: IBreedListData[]
}

export interface IBreedDetailsData {
  height: number
  id: string
  url: string
  width: number
  breeds: IBreedListData[]
}

export interface IFavouriteListData {
  image_id: string
  sub_id: string
  user_id: string
  created_at: string
  id: number
  image: {
    id: string
    url: string
  }
}

export interface IAddFavouriteData {
  id: number
  message: string
}

export interface IRemoveFavouriteData {
  message: string
}

export interface IImageListData {
  height: number
  id: string
  url: string
  width: number
  breeds: IBreedListData[]
}
