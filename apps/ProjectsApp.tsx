import React from "react";
import { RESUME_DATA } from "../constants";
import { FolderGit2, ExternalLink, Code2 } from "lucide-react";

const ProjectsApp: React.FC = () => {
	return (
		<div className="p-6 bg-gray-100 min-h-full font-ubuntu">
			<h2 className="text-3xl font-bold text-ubuntu-dark mb-8 text-center">
				GitHub Projects
			</h2>

			<div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
				<p className="text-sm text-yellow-800">
					<span className="font-semibold">Note:</span> The code for all projects
					is fully functional. However, some live demos may be temporarily
					unavailable due to expired free hosting periods or API key
					limitations. Sorry for any inconvenience!
				</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{RESUME_DATA.projects.map((project, index) => (
					<div
						key={index}
						className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col border border-gray-200"
					>
						<div className="bg-ubuntu-dark p-4 border-b border-gray-200 flex justify-between items-center">
							<div className="flex items-center gap-2 text-white">
								<FolderGit2 size={20} className="text-ubuntu-orange" />
								<h3 className="font-bold text-lg">{project.title}</h3>
							</div>
						</div>

						<div className="p-6 flex-1 flex flex-col">
							<div className="flex flex-wrap gap-2 mb-4">
								{project.tech.map((tech, tIdx) => (
									<span
										key={tIdx}
										className="px-2 py-1 bg-orange-100 text-ubuntu-orange text-xs font-bold rounded-full"
									>
										{tech}
									</span>
								))}
							</div>

							<ul className="space-y-2 mb-6 flex-1">
								{project.description.map((desc, dIdx) => (
									<li
										key={dIdx}
										className="text-gray-600 text-sm flex items-start gap-2"
									>
										<span className="mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full shrink-0" />
										{desc}
									</li>
								))}
							</ul>

							<div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
								<button className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition-colors text-sm">
									<Code2 size={16} /> Code
								</button>
								<button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 rounded hover:bg-gray-50 transition-colors text-sm">
									<ExternalLink size={16} /> Live Demo
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ProjectsApp;
