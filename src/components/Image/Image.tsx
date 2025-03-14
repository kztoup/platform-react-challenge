import React, { JSX } from 'react'

import { ImageProps } from '.'

const Image = ({ url, width = '300', height = '300', cursor = 'default', onClick }: ImageProps): JSX.Element => (
  <img
    style={{ objectFit: 'cover', cursor }}
    srcSet={url}
    src={url}
    loading='lazy'
    width={width}
    height={height}
    onClick={onClick}
  />
)

export default Image
