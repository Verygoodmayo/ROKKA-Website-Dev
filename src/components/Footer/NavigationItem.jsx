export default function NavigationItem ({label, link, iconSrc}) {

    return (
        <div className="nav-item">
            <a
                href={link}
            >{label}</a>
        </div>
    )

}