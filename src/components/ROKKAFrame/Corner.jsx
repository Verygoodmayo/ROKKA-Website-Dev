export default function Corner () {

    return (
        <div className="corner-wrapper">
            <svg className="corner">
                <defs>
                </defs>
                <polygon className="fill" points="30 0 0 30 30 30 30 0"/>
                <line className="border" x1="30" y2="30"/>
            </svg>
        </div>
    )
}