
import '../styles/Button/Button.scss'

export default function Button({label, isPrimary, Outline, imgSrc, onClick}) {

    function handleClick() {
        if (onClick) {
            onClick();
        } else {
            console.log('click');
        }
    }
    
    function checkStyles() {
        let classString = 'button'
        isPrimary ? classString += ' primary-button' : classString += ' secondary-button'
        Outline ? classString += ' outline' : classString += ''
        return classString
        
    }

    return (
        <button
            onClick={handleClick}
            className={
                checkStyles()
            }
        >
            <span>
                {label}
            </span>
        
            <img
                className="button-icon"
                alt=""
                src={imgSrc}
            />
        </button>
    );
}