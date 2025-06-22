import { Link } from "react-router-dom";
import NavigationItem from "./NavigationItem";

export default function FooterNavigationSection () {

    return (
        <div className="footer-navigation-section">

            <div id="products-section" className="navigation-section">
                <p className="section-header">Products</p>
                <div className="wrapper">
                    <div id="core-tech-section">
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
                        <div className="wrapper">
                            <NavigationItem label='Call Center'></NavigationItem>
                            <NavigationItem label='Election Day'></NavigationItem>
                            <NavigationItem label='Ecosystem Analyzer'></NavigationItem>
                        </div>

                        <div className="wrapper">
                            <NavigationItem label='API'></NavigationItem>
                            <NavigationItem label='Parliment Regulation Dashboard'></NavigationItem>
                            <NavigationItem label='Hate Speech Detector'></NavigationItem>
                        </div>
                    </div>
                </div>
            </div>

            <div id="by-need-section" className="navigation-section">
                <p className="section-header">By Need</p>
                <NavigationItem label='Intelligence'></NavigationItem>
                <NavigationItem label='Political'></NavigationItem>
                <NavigationItem label='Commercial'></NavigationItem>
                <NavigationItem label='Research'></NavigationItem>
            </div>

        </div>
    )

}