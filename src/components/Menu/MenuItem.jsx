import { Link } from 'react-router-dom';

export default function MenuItem ({label, onClick, link}) {
    return (
        <div className="menu-item" onClick={onClick}>
            {link ? <Link to={link}>{label}</Link> : label}
        </div>
    );
}