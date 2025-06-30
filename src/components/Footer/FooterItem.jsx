export default function FooterItem ({label, link, onClick}) {

    return (
        <div
            className="footer-item"
            onClick={onClick}
        >
            <a
                href={link}
            >
                {label}
            </a>
            
        </div>
    )
}