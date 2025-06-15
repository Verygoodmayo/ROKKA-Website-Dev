export default function FeatureCard({ data }) {
  return (
    <div className="feature-card">
      <div className="feature-icon">
        <img src={data.icon} alt={data.title} />
      </div>
      <div className="feature-content">
        <h3>{data.title}</h3>
        <p>{data.description}</p>
      </div>
    </div>
  );
}