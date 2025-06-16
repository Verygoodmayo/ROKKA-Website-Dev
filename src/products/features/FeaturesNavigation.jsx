import FeaturesNavigationItem from "./FeatureNavigationItem";

export default function FeaturesNavigation({ data, globalIndex, setGlobalIndex }) {
  return (
    <div className="features-navigation seeker-section">
      {data.map((feature, index) => (
        <FeaturesNavigationItem
          key={index}
          title={feature.title}
          index={index}
          globalIndex={globalIndex}
          setGlobalIndex={setGlobalIndex}
        />
      ))}
    </div>
  );
}