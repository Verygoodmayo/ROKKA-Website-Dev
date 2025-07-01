import { useState } from 'react';
import Button from "../../components/Button";
import VideoOverlay from "../../components/VideoOverlay";
import HeroSectionSketch from "./PILASketchContainer";
import PILAIcon from '../../../static/svg/Products/PILA/PILA_Icon_B.svg';
import videoIcon from '../../../static/svg/General/VideoIcon.svg';

export default function HeroSection() {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  // PILA AI video URL
  const vimeoUrl = "https://player.vimeo.com/video/1027714898";

  const handleWatchPromo = () => {
    setIsVideoVisible(true);
  };

  const handleCloseVideo = () => {
    setIsVideoVisible(false);
  };

  return (
    <div className="hero-section section">
      <div className="hero-content">
        <img src={PILAIcon} alt="PILA Logo" className="logo" />
        <div className="hero-title">
          PILA AI. <br/>
          Personal Strategic Advisor
        </div>
        <p className="hero-description">our groundbreaking innovation that's changing how you interact with data. The power to get precise insights from your data through simple conversation.  Don't be fooled by standard chatbots. This is real data analysis in conversational form.</p>
        <div className="hero-buttons">
          <Button label={'Book a Demo'} isPrimary={true}></Button>
          <Button 
            label={'watch a promo'} 
            isPrimary={true} 
            Outline={true}
            imgSrc={videoIcon}
            onClick={handleWatchPromo}
          />
        </div>
      </div>
      
      <VideoOverlay 
        isVisible={isVideoVisible}
        onClose={handleCloseVideo}
        vimeoUrl={vimeoUrl}
      />
    </div>
  );
}