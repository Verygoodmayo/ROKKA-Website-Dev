import { Link } from "react-router-dom";
import NavigationItem from "./NavigationItem";

export default function FooterNavigationSection () {

    return (
        <div className="footer-navigation-section">

            <div id="products-section" className="navigation-section">
                <div className="wrapper">
                    <div id="core-tech-section">
                        <p className="section-header">Core Technology</p>
                        <Link to="/products/data-manager">
                            <NavigationItem label='Data Manager'></NavigationItem>
                        </Link>
                        <Link to="/products/monitoring">
                            <NavigationItem label='Monitoring'></NavigationItem>
                        </Link>
                        <Link to="/products/PILA">
                            <NavigationItem label='PILA'></NavigationItem>
                        </Link>
                    </div>
                    <div id="plugins-section">
                        <p className="section-header">Plugins & Additional Products</p>
                        <div className="h-wrapper">
                            <div className="wrapper">
                                <Link to="/plugins#ai-driven-call-center">
                                    <NavigationItem label='Call Center'></NavigationItem>
                                </Link>
                                <Link to="/plugins#distribution-pad">
                                    <NavigationItem label='Distribution Pad'></NavigationItem>
                                </Link>
                                <Link to="/plugins#ecosystem-analyzer">
                                    <NavigationItem label='Ecosystem Analyzer'></NavigationItem>
                                </Link>
                            </div>

                            <div className="wrapper">
                                <Link to="/plugins#api">
                                    <NavigationItem label='API'></NavigationItem>
                                </Link>
                                <Link to="/plugins#mobile-command">
                                    <NavigationItem label='Mobile Command'></NavigationItem>
                                </Link>
                                <Link to="/plugins#hate-speech-detector">
                                    <NavigationItem label='Hate Speech Detector'></NavigationItem>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}