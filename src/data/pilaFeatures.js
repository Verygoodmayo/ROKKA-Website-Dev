import PILA_feature1_svg from '../../static/svg/Features/PILA/RAG.svg'
import PILA_feature2_svg from '../../static/svg/Features/PILA/Action_Items.svg'
import PILA_feature3_svg from '../../static/svg/Features/PILA/Mobile.svg'
import PILA_feature4_svg from '../../static/svg/Features/PILA/Agents.svg'

export const pilaFeatures = [
  {
    title: "RAG",
    description: "Our system uses RAG - Retrieval Augmented Generation - which means it first retrieves precise information from your data, then generates clear answers based on that real information. Unlike standard chatbots that make up responses, PILA finds actual data and turns it into meaningful insights. Think of it as a smart librarian for your data - it knows exactly where to look, what to pull, and how to use it.",
    image: PILA_feature1_svg,
    imageClass: "image-portrait", // Custom image sizing
    byNeed: {
      political: {title: "Political Need", description: "Instead of fabricating data, RAG retrieves information from the campaign's uploaded voter databases, polling results, demographic files, and policy documents. When strategists ask about voter sentiment in specific districts, the system searches their actual uploaded campaign data and survey results."},
      social: {title: "Intelligence Need", description: "Instead of guessing, RAG searches through the analyst's own uploaded intelligence reports, threat databases, surveillance data, and source documents to provide fact-based answers. If an analyst uploads classified reports and asks about a specific threat actor, the system retrieves exact information from those uploaded documents rather than hallucinating details."},
      commercial: {title: "Commercial Need", description: "Rather than making assumptions, RAG searches through the company's uploaded sales data, market research files, customer databases, and financial reports to generate insights. When executives ask about market trends, the system pulls real data from their uploaded Excel files and business documents, not invented statistics."},
      research: {title: "Research Need", description: "Rather than creating fake sources, RAG searches through the researcher's uploaded datasets, research papers, experiment results, and reference materials. When researchers ask analytical questions, the system retrieves answers from their actual uploaded data files and research documents, ensuring all insights are grounded in their real work."},
    }
  },
  {
    title: "Action Items",
    description: "PILA doesn't just analyze data - it transforms insights into actionable steps. The system  identifies key points requiring attention and turning your insights into practical action plans. Every analysis becomes a strategic roadmap, eliminating the gap between understanding and execution.",
    image: PILA_feature2_svg,
    imageClass: "image-landscape", // Custom image sizing
    byNeed: {
      political: {title: "Political Need", description: "Translates voter data and polling insights into concrete campaign strategies. Beyond showing demographic trends, the system identifies which voter segments require focused outreach, which messaging strategies need adjustment, and which resource allocations will maximize electoral impact. It transforms political analysis into executable campaign tactics."},
      intelleigence: {title: "Intelligence Need", description: "Transforms threat assessments and intelligence findings into structured operational responses. Instead of leaving analysts with raw intelligence data, the system identifies which threats require immediate attention, what resources need reallocation, and which security protocols need updating. It bridges the gap between intelligence analysis and operational security decisions."},
      commercial: {title: "Commercial Need", description: "Converts business insights and market analysis into strategic business actions. Rather than just presenting data trends, the system identifies which market opportunities require immediate investment, which customer segments need targeted attention, and which operational changes will drive revenue growth. It eliminates the disconnect between business intelligence and execution."},
      research: {title: "Research Need", description: "Converts research findings and data analysis into structured research roadmaps. Rather than stopping at analytical results, the system identifies which hypotheses need further testing, which methodologies require refinement, and which findings warrant deeper investigation. It bridges the gap between data analysis and research advancement."},
    }
  },
  {
    title: "PILA Mobile App",
    description: "Stay connected to your data insights anywhere, anytime. PILA's mobile app keeps you in constant conversation with your data - whether you're in a meeting, commuting, or working remotely.  Simply speak or type your questions, and PILA responds with precise insights.",
    image: PILA_feature3_svg,
    imageClass: "image-square", // Custom image sizing
    byNeed: {
      political: {title: "Political Need", description: "Political queries set off a network of AI agents operating behind the scenes - some processing voter databases while others analyzing demographic shifts, some tracking polling patterns while others evaluating messaging effectiveness. This coordinated background activity produces comprehensive political insights from simple strategic questions."},
      social: {title: "Intelligence Need", description: "Intelligence queries activate a web of specialized AI agents working invisibly - some scanning threat databases while others cross-reference indicators, some validating source credibility while others building threat timelines. This orchestrated behind-the-scenes collaboration ensures no intelligence angle is missed, delivering comprehensive threat assessments from what appears to be a simple question."},
      commercial: {title: "Commercial Need", description: "Business questions trigger multiple AI agents working simultaneously in the background - some analyzing financial patterns while others processing market dynamics, some evaluating customer behavior while others tracking competitive landscapes. This invisible analytical network ensures comprehensive business intelligence emerges from straightforward queries."},
      research: {title: "Research Need", description: "Research questions activate specialized AI agents working unseen - some preprocessing datasets while others running statistical computations, some validating methodologies while others cross-referencing academic sources. This behind-the-scenes AI orchestra ensures rigorous, comprehensive research outputs from seemingly straightforward academic queries."},
    }
  },
  {
    title: "Agents",
    description: "At PILA's core lies a multi-agent architecture - the foundation of its unique capabilities. Each agent brings unique capabilities - from data cleaning to statistical analysis  - creating a powerful analytical team at your disposal. These agents collaborate seamlessly to break down complex queries into specialized tasks, ensuring thorough and accurate analysis across all dimensions of your data.",
    image: PILA_feature4_svg,
    imageClass: "image-landscape", // Custom image sizing
    byNeed: {
      political: {title: "Political Need", description: "Political queries set off a network of AI agents operating behind the scenes - some processing voter databases while others analyzing demographic shifts, some tracking polling patterns while others evaluating messaging effectiveness. This coordinated background activity produces comprehensive political insights from simple strategic questions."},
      social: {title: "Intelligence Need", description: "Intelligence queries activate a web of specialized AI agents working invisibly - some scanning threat databases while others cross-reference indicators, some validating source credibility while others building threat timelines. This orchestrated behind-the-scenes collaboration ensures no intelligence angle is missed, delivering comprehensive threat assessments from what appears to be a simple question."},
      commercial: {title: "Commercial Need", description: "Business questions trigger multiple AI agents working simultaneously in the background - some analyzing financial patterns while others processing market dynamics, some evaluating customer behavior while others tracking competitive landscapes. This invisible analytical network ensures comprehensive business intelligence emerges from straightforward queries."},
      research: {title: "Research Need", description: "Research questions activate specialized AI agents working unseen - some preprocessing datasets while others running statistical computations, some validating methodologies while others cross-referencing academic sources. This behind-the-scenes AI orchestra ensures rigorous, comprehensive research outputs from seemingly straightforward academic queries."},
    }
  }
];
