import { Link } from 'react-router-dom';

export default function MenuItem ({label, onClick, link, iconSrc}) {
    return (
        <div className="menu-item" onClick={onClick}>
            {/* {
                () => {if (iconSrc) { <img src={iconSrc} className='icon'></img>}}
            } */}
            
            {link ? <Link to={link}>{label}</Link> : label}
        </div>
    );
}