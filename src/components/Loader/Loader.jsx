export default function Loader() {
  return (
    <div className="loader-overlay">
        <span className="loader-text">Loading...</span>
        <div className="progress-bar-wrapper">
            <div className="progress-bar"></div>
        </div>
    </div>
  );
}