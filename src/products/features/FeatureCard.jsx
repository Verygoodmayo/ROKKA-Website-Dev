import ByNeedSection from "./ByNeedSection";

export default function FeatureCard({ data, index, isMobile }) {
  
  function checkByNeed(byNeed) {
    if (byNeed) {
      return <ByNeedSection data={data}></ByNeedSection>
    }
  }

  return (
    <div className="feature-card">
      <div className="feature-card-header">
          {isMobile && (
            <span className="feature-index">{index + 1}.</span>
          )}
          <h2 className="feature-title">{data.title}</h2>
          <p className="feature-description">{data.description}</p>
      </div>
      {checkByNeed(data.byNeed)}
    </div>
  )
}