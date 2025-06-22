import ByNeedSection from "./ByNeedSection";

export default function FeatureCard({ data }) {
  // console.log("FeatureCard data:", data);
  // checkByNeed = (byNeed) => {
  //   if (data.byNeed && data.byNeed.length > 0) {
  //     return <ByNeedSection data={data}></ByNeedSection>
  //   }
  
  return (
    <div className="feature-card">
      <div className="feature-card-header">
          <h2 className="feature-title">{data.title}</h2>
          <p className="feature-description">{data.description}</p>
      </div>
      {/* {checkByNeed(data.byNeed)} */}
    </div>
  )
}