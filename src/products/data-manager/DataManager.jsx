import Footer from '../../components/Footer/Footer'
import '../../styles/pages/data_manager/data_manager.scss'
import FeaturesContainer from '../features/FeaturesContainer'
import HeroSection from './HeroSection'

const feature = {
  title: "Feature Title",
  description: "This is a brief description of the feature.",
  icon: "/images/feature-icon.png",
  byNeed: {
    political: {title: "Political Need", description: "Description of political need."},
    social: {title: "Social Need", description: "Description of social need."},
    commercial: {title: "Commercial Need", description: "Description of economic need."},
    research: {title: "Research Need", description: "Description of environmental need."},
  }
}

const pageData = [
  feature,
  feature,
  feature,
  feature,
]

export default function DataManager() {

  return (
    <>
      <HeroSection></HeroSection>
      <FeaturesContainer key={1} data={pageData}></FeaturesContainer>
      <Footer></Footer>
    </>
  )
}