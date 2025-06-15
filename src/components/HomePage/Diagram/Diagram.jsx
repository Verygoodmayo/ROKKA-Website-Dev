import DiagramCard from "./DiagramCard";
import DiagramNavigation from "./DiagramNavigation";
import * as THREE from "three";

const cardsInfo = [
    {
        title: "Select Field",
        categories: ["Intelligence", "Commercial", "Political", "Research"],
        description: [
            "The OSInt (Open Source Intelligence) domain is revolutionizing the intelligence landscape by providing actionable insights derived from publicly available data. This empowers organizations to refine their strategic initiatives and improve decision-making processes.",
            "ROKKA's Business Intelligence (BI) technology can transform the commercial sector by delivering data-driven insights that enhance marketing strategies and optimize sales performance.",
            "ROKKA's Business Intelligence (BI) technology can revolutionize the political landscape by providing data-driven insights for campaign strategies.",
            "The field of research is continuously evolving, driven by innovative methodologies and interdisciplinary collaboration. Researchers are exploring new frontiers in various domains, from artificial intelligence to environmental science, aiming to address complex global challenges. This dynamic environment fosters the development of cutting-edge technologies and promotes the sharing of knowledge, ultimately enhancing the impact of scientific discoveries on society.",
        ],
    },

    {
        title: "Select Role",
        categories: ["Voter Segment Analyst", "Field Director", "Message Testing Coordinator"],
        description: [
            "As a Voter Segment Analyst, you will analyze voter data to identify key demographics and trends, enabling targeted campaign strategies and effective resource allocation. You will collaborate with data scientists to interpret complex datasets and provide actionable recommendations for campaign teams. Your insights will help optimize outreach efforts and maximize voter engagement.",
            "As a Field Director, you will oversee the execution of campaign operations on the ground, coordinating teams and ensuring that field activities align with overall campaign objectives. You will manage logistics, supervise staff, and adapt strategies in real time to respond to evolving circumstances. Your leadership will be crucial in driving successful field initiatives and achieving campaign goals.",
            "As a Message Testing Coordinator, you will design and implement tests to evaluate the effectiveness of campaign messages, ensuring that communications resonate with target audiences. You will analyze feedback, adjust messaging strategies, and work closely with communication teams to refine outreach. Your role will help ensure that every message delivered is impactful and data-driven."
        ],
    },

    {
        title: "Select Technology",
        categories: ["Data Manager", "Monitoring", "PILA"],
        description: [
            "Data Manager is a robust platform for organizing, storing, and analyzing large datasets, providing actionable insights and supporting data-driven decision-making. It offers advanced tools for data visualization, integration, and security, making it an essential asset for organizations seeking to leverage their information assets effectively. With Data Manager, teams can streamline workflows and enhance collaboration across departments.",
            "Monitoring technology enables real-time tracking of key metrics and activities, allowing organizations to respond quickly to emerging trends and potential issues. It provides customizable dashboards, automated alerts, and comprehensive reporting features to ensure that stakeholders are always informed. Monitoring solutions empower organizations to maintain operational excellence and proactively address challenges.",
            "PILA (Predictive Intelligence & Learning Analytics) leverages advanced algorithms to forecast outcomes and optimize strategies based on historical and real-time data. It integrates machine learning models, intuitive interfaces, and actionable recommendations to drive continuous improvement. PILA supports organizations in making smarter decisions, adapting to change, and achieving long-term success."
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
                <h2 className="diagram-header">Our Technology by Need</h2>
                <p className="diagram-intro">
                    Explore the different opportunities ROKKA's technology offers across Intelligence/OSInt, Commercial, Political, and Research fields. 
                    Use the diagram below to select a field, role, and technology to see how our solutions can empower your organization. 
                    Click on each category to view tailored descriptions and discover how ROKKA can help you achieve your goals.
                </p>
            </div>
            <DiagramNavigation />
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
                    meshType={new THREE.RingGeometry(50, 100, 400, 400, 0, Math.PI * 2)}
                />
                <DiagramCard
                    key={2}
                    keyName={2}
                    title={cardsInfo[2].title}
                    categories={cardsInfo[2].categories}
                    description={cardsInfo[2].description}
                    isOpportunities={false}
                    defaultIndex={0}
                    meshType={new THREE.CapsuleGeometry(50,100,300,300,300)}
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