import { Project, Experience, Education } from "./types";

export const RESUME_DATA = {
	name: "Vinukonda Jayachandra Mallik",
	role: "Software Development Engineer | Backend | Full-Stack",
	contact: {
		email: "mallikvinukonda1704@gmail.com",
		phone: "+91 7416366978",
		github: "https://github.com/Mallik-vinukonda/",
		linkedin: "https://linkedin.com/in/mallik-vinukonda",
		location: "Visakhapatnam, Andhra Pradesh, India",
	},
	summary:
		"Computer science student with hands-on experience in AI and full-stack development. Built 6+ deployed projects on GitHub, solved 250+ coding problems (LeetCode rating 1627, 3 CodeChef), and strong in DSA and problem-solving.",
	skills: {
		languages: [
			"Java (DSA)",
			"Python",
			"JavaScript",
			"TypeScript",
			"SQL",
			"C",
			"C++",
		],
		frontend: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
		backend: [
			"Node.js",
			"Express.js",
			"FastAPI",
			"PostgreSQL",
			"MongoDB",
			"Supabase",
		],
		tools: [
			"Git",
			"GitHub Actions (CI/CD)",
			"Docker",
			"AWS (Basics)",
			"Postman",
			"LangChain",
			"LangFlow",
			"VS Code",
		],
		core: ["DSA", "OOP", "OS", "DBMS", "Computer Networks"],
	},
	education: [
		{
			degree: "B.Tech in Computer Science and Engineering",
			school: "Gayatri Vidya Parishad College of Engineering",
			year: "2023 – 2026",
		},
		{
			degree: "Diploma in Computer Engineering",
			school: "Andhra Polytechnic, Kakinada",
			year: "2020 – 2023",
			details: "",
		},
	] as Education[],
	experience: [
		{
			role: "Software Development Engineer Intern – AI Engineering Team",
			company: "Apariva Systems LLP",
			period: "May 2025 – July 2025",
			location: "Hyderabad, India (Hybrid)",
			points: [
				"Engineered backend services using FastAPI and Python, reducing request latency by 30%.",
				"Improved UI responsiveness by creating reusable React components and refining state handling.",
				"Integrated document-processing APIs to automate ingestion and minimize manual overhead.",
				"Optimized system performance by adding Redis caching, cutting repeated computations by 40%.",
				"Collaborated in a 4-member Agile team using Git, GitHub Actions, and Postman for testing and CI/CD.",
			],
		},
	] as Experience[],
	projects: [
		{
			title: "Legal Mitra – Constitution-Aware RAG Chatbot",
			tech: ["Gemini LLM", "Python", "Streamlit", "ChromaDB"],
			description: [
				"Built a RAG chatbot using Gemini LLM with 93% accuracy on Indian constitutional queries.",
				"Reduced legal search time by 75% through context-aware citations.",
				"Designed and deployed a vector database architecture using Chroma with a Streamlit interface for multi-document analysis.",
			],
			link: "https://github.com/Mallik-vinukonda/",
		},
		{
			title: "Collaborative Real-Time Document Editor",
			tech: ["React", "Next.js", "Liveblocks", "Node.js", "PostgreSQL"],
			description: [
				"Developed a real-time multi-user editor using CRDT-based synchronization via Liveblocks.",
				"Enabled cursor presence, selection highlights, and user activity indicators for better collaboration.",
				"Structured backend APIs for document storage, version snapshots, and access permissions.",
				"Leveraged WebSockets to ensure low-latency synchronization and conflict-free merges.",
			],
			link: "https://github.com/Mallik-vinukonda/",
		},
		{
			title: "AI-Powered Mock Interview Platform",
			tech: ["FastAPI", "React", "Gemini", "Web Speech API", "PostgreSQL"],
			description: [
				"Built an AI interviewer capable of generating dynamic DSA, system design, and behavioral questions.",
				"Integrated Gemini for scoring, evaluation, and generating detailed performance feedback.",
				"Implemented natural voice interaction using speech-to-text and text-to-speech pipelines.",
				"Designed APIs for session logging, analytics, and interview progression.",
			],
			link: "https://github.com/Mallik-vinukonda/",
		},
		{
			title: "MathVision – AI Equation & Vision Solver",
			tech: ["Gemini Vision", "FastAPI", "Canvas API"],
			description: [
				"Developed an AI system to process hand-drawn mathematical equations with 88% recognition accuracy.",
				"Created a vision pipeline for Gemini LLM to solve equations, integrals, and derivatives in real time.",
				"Built a FastAPI backend with a canvas-based response interface.",
			],
			link: "https://github.com/Mallik-vinukonda/",
		},
		{
			title: "CrowdPulse – Issue Reporting & Reward System",
			tech: ["React", "Node.js", "Express", "MongoDB"],
			description: [
				"Developed a full-stack platform where users report local issues and earn redeemable credits.",
				"Implemented secure authentication, issue tracking, and reward-based resource unlocks.",
				"Used MongoDB aggregation for reward logic, Express REST APIs, and a responsive React UI.",
			],
			link: "https://github.com/Mallik-vinukonda/",
		},
	] as Project[],
	achievements: [
		"Ranked 72nd in ECET State-level exam (Top 0.15% among 50,000+ candidates).",
		"Finalist (Top 8) at Hack Web3 Conf – Goa (1100+ participants).",
		"President (2025–2026), Youth for Seva NGO: Led 12+ education programs impacting 500+ students.",
		"Organized 'Save the Birds' initiative, installing 100+ water containers across Visakhapatnam.",
		"Mentored 28 students in logical reasoning and aptitude; 6 secured NMMS scholarships.",
	],
};

// Helper to format data as a string for the AI system instruction
export const RESUME_STRING = `
Name: ${RESUME_DATA.name}
Role: ${RESUME_DATA.role}
Contact: ${RESUME_DATA.contact.email}, ${RESUME_DATA.contact.phone}, ${
	RESUME_DATA.contact.location
}
Summary: ${RESUME_DATA.summary}

Skills:
${Object.entries(RESUME_DATA.skills)
	.map(([k, v]) => `${k}: ${v.join(", ")}`)
	.join("\n")}

Experience:
${RESUME_DATA.experience
	.map((e) => `${e.role} at ${e.company} (${e.period})\n${e.points.join("\n")}`)
	.join("\n\n")}

Projects:
${RESUME_DATA.projects
	.map((p) => `${p.title} (${p.tech.join(", ")})\n${p.description.join("\n")}`)
	.join("\n\n")}

Achievements:
${RESUME_DATA.achievements.join("\n")}
`;
