import Button from "../../components/Button";
import HeroSectionSketch from "./DataManagerSketch";
import dataManagerIcon from '../../../static/svg/Products/DataManager/Data_Manager_B.svg'
import ScrollforMore from "../../components/ScrollforMore";

export default function HeroSection() {
  return (
    <div className="hero-section section">
      <div className="hero-content">
        <div  className="hero-logo">
          <img src={dataManagerIcon} alt="Data Manager Logo" className="logo" />
          Data Manager
        </div>
        
        <div className="hero-title">
          NO CODE. <br/>
          Deep Analytics.
        </div>
        <p className="hero-description">Transform your data management into strategic advantage.  Our comprehensive platform brings together advanced prediction, intelligent segmentation, and crystal-clear visualization - all designed to amplify your organization intelligence.</p>
        <div className="hero-buttons">
          <Button label={'Book a Demo'} isPrimary={true}></Button>
          <Button label={'watch a promo'} isPrimary={true} Outline={true}></Button>
        </div>
      </div>
       <div className="hero-decoration">
        <div className="tag" id="tag-1">Complex</div>
        <div className="line"></div>
        <div className="tag" id="tag-2">Simple</div>
      </div>
      <ScrollforMore></ScrollforMore>
    </div>
  );
}