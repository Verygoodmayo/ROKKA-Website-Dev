import calendarIcon from '../../static/svg/UI/CalendarIcon.svg'
import calendarIconWhite from '../../static/svg/UI/CalendarIcon_W.svg'

export default function Button({label, isPrimary, Outline, imgSrc, onClick}) {

    function handleClick() {
        // Special handling for "Let's Talk" buttons
        if (label === "Let's Talk") {
            const subject = "Hi There. Let's Talk, this is my email.";
            const mailto = `mailto:info@rokka.ai?subject=${encodeURIComponent(subject)}`;
            window.location.href = mailto;
        } 
        // Special handling for "Book a Demo" buttons
        else if (label === "Book a Demo") {
            const subject = "Im intereset in a Demo, Let's Talk";
            const mailto = `mailto:info@rokka.ai?subject=${encodeURIComponent(subject)}`;
            window.location.href = mailto;
        } 
        else if (onClick) {
            onClick();
        }
    }
    
    function checkStyles() {
        let classString = 'button'
        isPrimary ? classString += ' primary-button' : classString += ' secondary-button'
        Outline ? classString += ' outline' : classString += ''
        return classString
        
    }

    // Determine which icon to use for "Let's Talk" and "Book a Demo" buttons
    function getIconSrc() {
        if (label === "Let's Talk") {
            // Use white calendar icon for secondary buttons (isPrimary=false)
            return isPrimary === false ? calendarIconWhite : calendarIcon;
        } else if (label === "Book a Demo") {
            // Always use white calendar icon for "Book a Demo" buttons
            return calendarIconWhite;
        }
        return imgSrc;
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
                src={getIconSrc()}
            />
        </button>
    );
}
