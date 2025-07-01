import { useState } from 'react';
import Button from "../../components/Button";
import VideoOverlay from "../../components/VideoOverlay";
import monitoringIcon from '../../../static/svg/Products/Monitoring/Monitoring_Icon_B.svg'
import videoIcon from '../../../static/svg/General/VideoIcon.svg'

export default function HeroSection() {
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  // Monitoring video URL
  const vimeoUrl = "https://player.vimeo.com/video/1034502434";

  const handleWatchPromo = () => {
    setIsVideoVisible(true);
  };

  const handleCloseVideo = () => {
    setIsVideoVisible(false);
  };

  return (
    <div className="hero-section section">
      <div className="hero-content">
        <img src={monitoringIcon} alt="Monitoring Logo" className="logo" />
        <div className="hero-title">
          Monitoring
        </div>
        <p className="hero-description">Our system aligns every aspect of monitoring with your specific goals and needs. Define what matters to you, and our AI focuses exclusively on those objectives, delivering precisely what you need to know.</p>
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