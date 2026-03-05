import React from 'react';
import StorySection from '../component/StorySection';
import JourneySection from '../component/JourneySection';
import PhilosophySection from '../component/PhilosophySection';
import IngredientsSection from '../component/IngredientsSection';
import JoinCommunity from '../../../components/ui/JoinCommunity';


export default function AboutPage() {
  return (
    <main className="overflow-x-hidden">
      <div className="">
        
        <StorySection />
        
        <JourneySection />
        
        <PhilosophySection />
        <IngredientsSection/>
        <JoinCommunity/>
        
      </div>
    </main>
  );
}