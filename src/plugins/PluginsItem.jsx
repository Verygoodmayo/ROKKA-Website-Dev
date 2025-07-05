export default function PluginsItem ({data}) {
    return (
        <div className="plugin-item">
            <div className="content-wrapper">
                <h2>{data.title}</h2>
                <p>{data.description}</p>
                <a href="/plugins/plugin-name" className="btn btn-secondary">Learn More</a>
            </div>
            <img src={data.image} alt={data.title} className="plugin-image" />
        </div>
    );
}