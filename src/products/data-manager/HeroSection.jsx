import Button from "../../components/Button";
import HeroSectionSketch from "./DataManagerSketch";
import dataManagerIcon from '../../../static/svg/products/Data_Management_B.svg'

export default function HeroSection() {
  return (
    <div className="hero-section section">
      <div className="hero-content">
        <img src={dataManagerIcon} alt="Data Manager Logo" className="logo" />
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
    </div>
  );
}