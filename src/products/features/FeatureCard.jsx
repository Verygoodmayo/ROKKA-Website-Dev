import ByNeedSection from "./ByNeedSection";

export default function FeatureCard({ data }) {
  // console.log("FeatureCard data:", data);
  return (
    <div className="feature-card">
      <div className="feature-card-header">
          <h2 className="feature-title">{data.title}</h2>
          <p className="feature-description">{data.description}</p>
      </div>
      <ByNeedSection data={data}></ByNeedSection>
    </div>
  );
}