export default function ByNeedSection({ data }) {
  return (
    <div className="by-need-section">
      <h3 className="by-need-title">By Need</h3>
      <div className="by-need-wrapper">
        {Object.entries(data.byNeed).map(([key, value]) => (
          <div className="by-need-item" key={key}>
            <h4 className="by-need-item-title">{value.title}</h4>
            <p className="by-need-item-description">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}