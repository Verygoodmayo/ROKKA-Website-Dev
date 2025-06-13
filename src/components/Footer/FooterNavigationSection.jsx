import NavigationItem from "./NavigationItem";

export default function FooterNavigationSection () {

    return (
        <div className="footer-navigation-section">

            <div id="products-section" className="navigation-section">
                <p className="header">Products</p>
                <div className="wrapper">
                    <div id="core-tech-section">
                        <NavigationItem label='Data Manager'></NavigationItem>
                        <NavigationItem label='Monitoring'></NavigationItem>
                        <NavigationItem label='PILA'></NavigationItem>
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
                <p className="header">By Need</p>
                <NavigationItem label='Intelligence'></NavigationItem>
                <NavigationItem label='Political'></NavigationItem>
                <NavigationItem label='Commercial'></NavigationItem>
                <NavigationItem label='Research'></NavigationItem>
            </div>

        </div>
    )

}