import no_code_svg from '../../static/svg/values/no_code.svg';
import manage_data_svg from '../../static/svg/values/manage_data_simply.svg';
import reasoning_service_svg from '../../static/svg/values/reasoning_as_a_service.svg';

export const values = [
    {
        title: "Monitoring",
        description: [
            "ROKKA's monitoring system revolutionizes how organizations track and understand their digital landscape. Unlike traditional monitoring tools that simply track keywords and count mentions, our system is objective-driven, understanding what success means for your specific goals and filtering the endless stream of online content accordingly.",
            "It transforms the overwhelming flood of digital information into strategic intelligence that matters to your mission, providing not just data, but insight that drives decision-making."
        ],
        image: reasoning_service_svg,
        imageName: "monitoring-isometric.svg"
    },
    {
        title: "Data Manager",
        description: [
            "The Data Manager serves as your intelligent data operation center, designed to eliminate the technical barriers that typically separate strategic thinkers from their data. It seamlessly integrates information from multiple sources - whether legacy databases, real-time feeds, or external APIs - and transforms complex analytical operations into simple, visual workflows.",
            "This isn't just about storing data; it's about creating a living, breathing analytical environment where your information becomes the foundation for predictive modeling, audience segmentation, and strategic planning."
        ],
        image: manage_data_svg,
        imageName: "data-manager-isometric.svg"
    },
    {
        title: "PILA AI",
        description: [
            "PILA AI represents a fundamental shift in how we interact with data and analysis. Rather than requiring users to learn complex query languages or analytical frameworks, PILA understands natural language questions and translates them into sophisticated analytical operations.",
            "It's built on advanced RAG technology that ensures every answer is grounded in your actual data, not generic responses. PILA doesn't just provide information - it serves as your analytical partner, understanding context, providing strategic recommendations, and transforming insights into actionable next steps."
        ],
        image: no_code_svg,
        imageName: "pila-ai-isometric.svg"
    }
];
