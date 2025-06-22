import DiagramCard from "./DiagramCard";
import DiagramNavigation from "./DiagramNavigation";
import * as THREE from "three";

// SASS
import '../../../styles/pages/home_page/diagram_section.scss';

const cardsInfo = [
    {
        title: "Select Field",
        categories: ["Intelligence", "Commercial", "Political", "Research"],
        description: [
            "Intelligence professionals face an overwhelming data challenge - massive volumes of external open-source information combined with sensitive internal intelligence creates complex analytical bottlenecks. The scale and diversity of information sources makes it nearly impossible to maintain comprehensive situational awareness while ensuring analytical accuracy. Most intelligence organizations struggle with fragmented data systems that prevent effective correlation and pattern recognition across their complete information landscape.",
            "Modern businesses are drowning in data from both internal operations and external market forces, creating significant competitive disadvantages for those who can't effectively harness this information. The complexity of managing comprehensive business intelligence across all data sources overwhelms traditional analytical approaches and prevents organizations from achieving their full market potential. Most commercial teams lack the capability to transform their complete data ecosystem into actionable strategic advantages.",
            "Political organizations operate in an increasingly data-intensive environment where success depends on comprehensive information management, yet most campaigns struggle with fragmented data systems that prevent effective strategy development. The challenge of maintaining unified oversight across all internal campaign data while incorporating crucial external political intelligence creates strategic blind spots that can determine electoral outcomes. Traditional campaign management approaches fail to leverage the full scope of available political information.",
            "Academic and scientific researchers work with increasingly complex data environments that combine proprietary research with extensive external information, creating methodological challenges that limit research impact and validity. The difficulty of maintaining comprehensive data oversight across all research sources prevents many studies from achieving their full analytical potential and slows scientific advancement. Current research tools fail to support the integrated approach that modern scholarship demands.",
        ],
    },

    {
        title: "Select Role",
        categories: ["Voter Segment Analyst", "Field Director", "Message Testing Coordinator", "Media Monitor", "Social Sentiment Analyst", "Opposition Researcher", "Constituent Response Manager", "Campaign Volunteer Coordinator", "Ploicy Advisor"],
        description: [
            "Analyzes voter populations to identify key demographic groups and voting patterns. Creates voter segments based on demographics, voting history, and issue preferences to inform campaign targeting strategies.",
            "Manages ground-level campaign operations across geographic regions. Tracks supporter distribution, coordinates canvassing efforts, and optimizes resource allocation to maximize campaign impact.",
            "Evaluates campaign messaging effectiveness across different audiences. Tests message resonance with various demographic groups and geographic regions to optimize communication strategies.",
            "Tracks campaign coverage across news outlets and digital platforms. Analyzes media tone, coverage patterns, and messaging opportunities to inform campaign communication strategies.",
            "Monitors public opinion and voter sentiment across social media platforms. Tracks responses to campaign events, messaging, and policy positions to gauge campaign effectiveness.",
            "Analyzes competing campaigns and political opponents. Tracks opposing messaging strategies, public statements, and campaign activities to inform responsive campaign strategies.",
            "Manages communication with voters and constituents. Ensures consistent messaging based on approved policy positions and campaign platforms when responding to public inquiries.",
            "Organizes and supports campaign volunteer activities. Provides training materials, talking points, and resources to ensure volunteers can effectively represent the campaign.",
            "Provides issue expertise and policy guidance to campaign leadership. Maintains comprehensive knowledge of policy positions, supporting data, and issue briefings to inform candidate preparation."

        ],
    },

    {
        title: "Select Technology",
        categories: ["Data Manager", "Monitoring", "PILA"],
        description: [
            "Complete data operations hub that transforms complex information management into simple point-and-click processes. Combines internal databases with external sources, applies predictive modeling without coding, and creates strategic audience segments automatically. Handles everything from data integration to advanced analytics through an intuitive interface that eliminates the need for technical expertise while delivering enterprise-grade analytical capabilities.",
            "Objective-driven social listening platform that goes beyond traditional keyword tracking. Users define strategic goals in natural language, and the AI automatically adapts its monitoring approach to identify goal-relevant content across unlimited web sources. Features smart scoring that prioritizes information based on strategic relevance rather than volume, with customizable filters and continuous learning from user feedback to improve accuracy over time.",
            "Advanced RAG-powered AI assistant that functions as a strategic advisor rather than a basic chatbot. Searches through both internal system data and external web sources to provide contextually relevant answers to complex questions. Translates simple user questions into sophisticated queries automatically, offering consultation-level insights while maintaining conversational simplicity that requires no prompt engineering skills."
        ],
    },

    {
        title: "Opportunities",
        categories: ["Startup", "Enterprise", "Academia", "NGO"],
        description: [
            "Startups can leverage innovative technologies and agile methodologies to disrupt traditional markets and rapidly scale their operations. By embracing a culture of experimentation and continuous learning, startups can identify new opportunities, attract investment, and build resilient business models. Access to advanced analytics and collaborative platforms further enhances their ability to compete in dynamic environments.",
            "Enterprises benefit from robust, scalable solutions that enhance efficiency, drive growth, and maintain a competitive edge in their industries. Implementing integrated technologies allows enterprises to streamline processes, improve customer experiences, and foster innovation at scale. Strategic partnerships and a focus on sustainability also contribute to long-term enterprise success.",
            "Academic institutions can utilize advanced analytics and research tools to foster innovation, support scholarly work, and enhance educational outcomes. By collaborating with industry partners and leveraging data-driven insights, academia can address complex societal challenges and prepare students for future careers. Investment in technology infrastructure and interdisciplinary research is key to academic excellence.",
            "NGOs can harness data-driven insights and collaborative platforms to maximize their impact, improve resource allocation, and achieve their missions more effectively. By adopting transparent practices and engaging with diverse stakeholders, NGOs can build trust and drive meaningful change. Technology empowers NGOs to measure outcomes, scale initiatives, and respond swiftly to emerging needs."
        ],
    },
]

export default function Diagram() {
    return (
        <section id='diagram-container' className="section">
            <div className="diagram-header-wrapper">
                <h1 className="header">Our Technology by Need</h1>
                <p className="diagram-intro">
                    Explore the different opportunities ROKKA's technology offers across Intelligence/OSInt, Commercial, Political, and Research fields. 
                    Use the diagram below to select a field, role, and technology to see how our solutions can empower your organization. 
                    Click on each category to view tailored descriptions and discover how ROKKA can help you achieve your goals.
                </p>
            </div>
            {/* <DiagramNavigation /> */}
            <div className="diagram-cards-wrapper">
                <DiagramCard
                    key={0}
                    keyName={0}
                    title={cardsInfo[0].title}
                    categories={cardsInfo[0].categories}
                    description={cardsInfo[0].description}
                    isOpportunities={false}
                    defaultIndex={2}
                    meshType={new THREE.IcosahedronGeometry(100, 136)}
                />
                <DiagramCard
                    key={1}
                    keyName={1}
                    title={cardsInfo[1].title}
                    categories={cardsInfo[1].categories}
                    description={cardsInfo[1].description}
                    isOpportunities={false}
                    defaultIndex={1}
                    meshType={new THREE.OctahedronGeometry(100, 100, 100, 100)}
                />
                <DiagramCard
                    key={2}
                    keyName={2}
                    title={cardsInfo[2].title}
                    categories={cardsInfo[2].categories}
                    description={cardsInfo[2].description}
                    isOpportunities={false}
                    defaultIndex={0}
                    meshType={new THREE.CapsuleGeometry(50,100,100,100,100)}
                />
                <DiagramCard
                    key={3}
                    keyName={3}
                    title={cardsInfo[3].title}
                    categories={cardsInfo[3].categories}
                    description={cardsInfo[3].description}
                    isOpportunities={true}
                    defaultIndex={0}
                />
            </div>
        </section>
    );
}