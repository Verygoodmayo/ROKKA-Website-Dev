export default function NavigationItem ({label, link}) {

    return (
        <div className="nav-item">
            <a
                href={link}
            >{label}</a>
        </div>
    )

}