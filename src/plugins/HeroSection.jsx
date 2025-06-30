import ScrollforMore from '../components/ScrollforMore';

export default function HeroSection () {
    
    return (
        <div id='plugins-hero-section' className="hero-section section">
            <div className="hero-content">
                <h1 className="header">PLUGINS</h1>
                <p>
                    Beyond our core technology, we've developed a
                    rapid deployment system that seamlessly connects
                    with your current solutions. For clients starting
                    fresh, we offer a customization process with
                    powerful add-ons to our core platform, enabling
                    precise tailoring to your specific operational needs
                    and industry requirements. 
                </p>
                <ScrollforMore />
            </div>
            
        </div>
    )
}