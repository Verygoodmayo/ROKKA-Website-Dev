import ContentContainer from "./ContentContainer";
import FrameSide from "./FrameSide";

export default function ROKKAFrame ({content, contentRef}) {

    return (
        <div className="ROKKA-frame">
            <FrameSide></FrameSide>
            <ContentContainer contentRef={contentRef} content={content}></ContentContainer>
            <FrameSide></FrameSide>
        </div>
    )
}