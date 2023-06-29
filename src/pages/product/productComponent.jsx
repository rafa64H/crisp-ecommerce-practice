import React, { useEffect } from 'react'

const ProductComponent = () => {

    const params = new URLSearchParams(window.location.search)
    let id = params.get('productId')

  return (
    <div>{id}</div>
  )
}

export default ProductComponent