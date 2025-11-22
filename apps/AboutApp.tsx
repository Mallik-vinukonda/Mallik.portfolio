import React from "react";
import { RESUME_DATA } from "../constants";
import { MapPin, Mail, Phone, Github, Linkedin } from "lucide-react";
import profileImage from "../mee.jpeg";

const AboutApp: React.FC = () => {
	return (
		<div className="p-8 max-w-4xl mx-auto font-ubuntu">
			{/* Header */}
			<div className="flex flex-col md:flex-row items-center gap-8 mb-12 border-b border-gray-300 pb-8">
				<img
					src={profileImage}
					alt="Mallik"
					className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-ubuntu-orange"
				/>
				<div className="text-center md:text-left">
					<h1 className="text-4xl font-bold text-ubuntu-dark mb-2">
						{RESUME_DATA.name}
					</h1>
					<p className="text-xl text-gray-600 font-medium">
						{RESUME_DATA.role}
					</p>
					<div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-sm text-gray-600">
						<div className="flex items-center gap-1">
							<MapPin size={16} /> {RESUME_DATA.contact.location}
						</div>
						<div className="flex items-center gap-1">
							<Mail size={16} /> {RESUME_DATA.contact.email}
						</div>
						<div className="flex items-center gap-1">
							<Phone size={16} /> {RESUME_DATA.contact.phone}
						</div>
					</div>
					<div className="flex justify-center md:justify-start gap-4 mt-4">
						<a
							href={RESUME_DATA.contact.github}
							target="_blank"
							rel="noreferrer"
							className="text-gray-700 hover:text-ubuntu-orange transition-colors"
						>
							<Github />
						</a>
						<a
							href={RESUME_DATA.contact.linkedin}
							target="_blank"
							rel="noreferrer"
							className="text-gray-700 hover:text-ubuntu-orange transition-colors"
						>
							<Linkedin />
						</a>
					</div>
				</div>
			</div>

			{/* Summary */}
			<section className="mb-8">
				<h2 className="text-2xl font-bold text-ubuntu-purple mb-4">Summary</h2>
				<p className="text-gray-700 leading-relaxed text-lg">
					{RESUME_DATA.summary}
				</p>
			</section>

			{/* Education */}
			<section className="mb-8">
				<h2 className="text-2xl font-bold text-ubuntu-purple mb-4">
					Education
				</h2>
				<div className="space-y-6">
					{RESUME_DATA.education.map((edu, index) => (
						<div
							key={index}
							className="bg-white p-5 rounded-lg shadow-sm border border-gray-200"
						>
							<div className="flex justify-between items-start mb-2">
								<h3 className="text-lg font-bold text-gray-800">
									{edu.school}
								</h3>
								<span className="text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded">
									{edu.year}
								</span>
							</div>
							<p className="text-ubuntu-orange font-medium">{edu.degree}</p>
							<p className="text-gray-600 mt-1">{edu.details}</p>
						</div>
					))}
				</div>
			</section>

			{/* Achievements */}
			<section>
				<h2 className="text-2xl font-bold text-ubuntu-purple mb-4">
					Achievements & Leadership
				</h2>
				<ul className="list-disc list-inside space-y-2 text-gray-700 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
					{RESUME_DATA.achievements.map((item, idx) => (
						<li key={idx} className="leading-relaxed">
							{item}
						</li>
					))}
				</ul>
			</section>
		</div>
	);
};

export default AboutApp;
