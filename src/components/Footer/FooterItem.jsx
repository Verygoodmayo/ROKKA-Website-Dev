export default function FooterItem ({label, link}) {

    return (
        <div
            className="footer-item"
        >
            <a
                href={link}
            >
                {label}
            </a>
            
        </div>
    )
}