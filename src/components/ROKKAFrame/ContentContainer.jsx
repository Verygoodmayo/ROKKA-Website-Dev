export default function ContentContainer ({content, contentRef}) {
    
    return (
        <div
            ref={contentRef}
            className="content-container"
        >
            {content}
        </div>
    )
}