

export default function DiagramCard ({ keyName, title, categories, description }) {
    return (
        <div 
            key={keyName}
            className="diagram-card">
            <div className="title">{title}</div>
            <div className="categories">
                {categories.map((category, index) => (
                    <span key={index} className="category">{category}</span>
                ))}
            </div>
            <div className="description">
                {description.map((desc, index) => (
                    <p key={index}>{desc}</p>
                ))}
            </div>
          
        </div>
    );
}