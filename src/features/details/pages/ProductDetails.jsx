import React from 'react'
import ProductDetailsView from '../component/ProductDetailsView'
import Bestsellers from '../../../features/home/components/Bestsellers'
import JoinCommunity from '../../../components/ui/JoinCommunity'



export default function ProductDetails() {
  return (
    <div>
        <ProductDetailsView/>
        <Bestsellers/>
        <JoinCommunity/>
    </div>
  )
}
