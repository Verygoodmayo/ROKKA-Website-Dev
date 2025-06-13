import DiagramCard from "./DiagramCard";
import DiagramNavigation from "./DiagramNavigation";

const cardsInfo = [
    {
        title: "Select Field",
        categories: ["Intelligence", "Commercial", "Political", "Research"],
        description: ["Description of the intelligence field", "Description of the intelligence field", "Description of the intelligence field", "Description of the intelligence field",],
    },

    {
        title: "Select Role",
        categories: ["Intelligence", "Commercial", "Political", "Research"],
        description: ["Description of the intelligence field", "Description of the intelligence field", "Description of the intelligence field", "Description of the intelligence field",],
    },

    {
        title: "Select Technology",
        categories: ["Intelligence", "Commercial", "Political", "Research"],
        description: ["Description of the intelligence field", "Description of the intelligence field", "Description of the intelligence field", "Description of the intelligence field",],
    },

    {
        title: "Opportunities",
        categories: ["Intelligence", "Commercial", "Political", "Research"],
        description: ["Description of the intelligence field", "Description of the intelligence field", "Description of the intelligence field", "Description of the intelligence field",],
    },
]

export default function Diagram() {

    return (
        <section
            id='diagram-container'
            className="section"
        >
            <DiagramNavigation></DiagramNavigation>
            <div  className="diagram-cards-wrapper">
                {
                    cardsInfo.map((card, index) => (
                        <DiagramCard
                            key={index}
                            title={card.title}
                            categories={card.categories}
                            description={card.description}
                        />
                    ))
                }
            </div>
            
        </section>
    )
}