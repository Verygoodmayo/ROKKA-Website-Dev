export default function FeaturesImage({ data }) {
  return (
    <div className="features-image seeker-section">
      <img src={data.image} alt={`${data.title} image`} className="feature-image" />
    </div>
  );
}
// This component displays the image, title, description, and needs of a feature.