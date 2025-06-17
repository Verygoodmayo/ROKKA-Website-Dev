export default function NavigationItem ({label, iconSrc}) {

    return (
        <div className="nav-item">
            {iconSrc && <img src={iconSrc} alt={label + '-icon'} className="nav-icon" />}
            <span className="nav-label">{label}</span>
        </div>
    )

}