import React from 'react'
import Hero from '../components/Hero'
import Bestsellers from '../components/Bestsellers'
import CategorySection from '../components/CategorySection'
import NewArrivals from '../components/NewArrivals'
import Philosophy from '../components/Philosophy'
import Testimonials from '../components/Testimonials'
import JoinCommunity from '../../../components/ui/JoinCommunity'

export default function HomePage() {
  return (
    <div>
      <Hero/>
      <Bestsellers/>
      <CategorySection/>
      <NewArrivals/>
      <Philosophy/>
      <Testimonials/>
      <JoinCommunity/>
    </div>
  )
}
