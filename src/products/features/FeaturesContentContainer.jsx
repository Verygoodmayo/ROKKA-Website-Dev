export default function FeaturesContentContainer ({ data }) {

  return (
    <div className="features-content-container seeker-section">
        {data.map((feature, index) => (
            <div key={index} className="feature-content">
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
            </div>
        ))}
    </div>
  );
}