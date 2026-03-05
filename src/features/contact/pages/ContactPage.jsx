import React from 'react'
import ContactSection from '../component/ContactSection'
import OtherWaysSection from '../component/OtherWaysSection'
import FAQSection from '../component/FAQSection'
import JoinCommunity from '../../../components/ui/JoinCommunity'

export default function ContactPage() {
  return (
    <div>
        <h2 className="heading-font site-container pt-10 text-[36px] md:text-[48px] font-medium">Contact Us</h2>
        <ContactSection/>
        <OtherWaysSection/>
        <FAQSection/>
        <JoinCommunity/>
    </div>
  )
}
