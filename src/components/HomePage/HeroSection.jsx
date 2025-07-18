import { ScrollforMore } from "../UI";

export default function HeroSection() {
    return (
        <>
            <section
                id="hero-section"
                className="section"
            >
                <div className="header center-text">
                    Data Is Everywhere. <br/> Let it come to you.
                </div>

                <p id="intro-paragraph">
                    Build and grow by transforming data into achievable objectives without any code. We offer a suite of tools, core products and our various plugins. Our solution can fit any need and adapt to a specific industry need.
                </p>

                <ScrollforMore></ScrollforMore>
            </section>
            
            {/* Animation scroll spacer - extends the scroll distance for the park model animation */}
            <div 
                id="park-model-animation-spacer"
                className="park-model-animation-spacer"
            />
        </>
    )
}