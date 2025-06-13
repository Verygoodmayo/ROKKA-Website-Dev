import ContentContainer from "./ContentContainer";
import FrameSide from "./FrameSide";

export default function ROKKAFrame ({content}) {

    return (
        <div className="ROKKA-frame">
            <FrameSide></FrameSide>
            <ContentContainer content={content}></ContentContainer>
            <FrameSide></FrameSide>
        </div>
    )
}