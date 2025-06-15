import FeatureCard from "./FeatureCard";

export default function FeaturesContainer({data}) {
  return (
    <div className="features-container">
      {/* <div className="header">
        <h1>Title</h1>
        <p>Explore the amazing features of our product.</p>
      </div>
      <div className="features-list">
        Add feature items here */}
        <FeatureCard data={data[0]}></FeatureCard>
        <FeatureCard data={data[1]}></FeatureCard>
        <FeatureCard data={data[2]}></FeatureCard>
        <FeatureCard data={data[3]}></FeatureCard>
      {/* </div> */}
    </div>
  );
}