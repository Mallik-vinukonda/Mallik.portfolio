import React, { useState, useRef, useEffect, useMemo } from "react";
import { Send, Bot, Sparkles, User as UserIcon } from "lucide-react";
import { chatWithMallikAI } from "../services/geminiService";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

interface Message {
	id: string;
	role: "user" | "model";
	text: string;
}

const SUGGESTIONS = [
	"Tell me about your internship",
	"What is Legal Mitra?",
	"List your technical skills",
	"How do I contact you?",
];

// Define components outside render to prevent re-creation on every state change
const MARKDOWN_COMPONENTS: Components = {
	strong: ({ node, ...props }) => (
		<span className="font-bold text-ubuntu-purple" {...props} />
	),
	ul: ({ node, ...props }) => (
		<ul className="list-disc list-outside ml-4 space-y-1" {...props} />
	),
	ol: ({ node, ...props }) => (
		<ol className="list-decimal list-outside ml-4 space-y-1" {...props} />
	),
	li: ({ node, ...props }) => <li className="pl-1" {...props} />,
	h1: ({ node, ...props }) => (
		<h1
			className="text-lg font-bold text-ubuntu-dark mt-2 border-b border-gray-200 pb-1"
			{...props}
		/>
	),
	h2: ({ node, ...props }) => (
		<h2 className="text-base font-bold text-ubuntu-dark mt-2" {...props} />
	),
	h3: ({ node, ...props }) => (
		<h3 className="text-sm font-bold text-ubuntu-dark mt-1" {...props} />
	),
	code: ({ node, ...props }) => (
		<code
			className="bg-gray-100 px-1 py-0.5 rounded text-ubuntu-warm font-mono text-xs"
			{...props}
		/>
	),
	blockquote: ({ node, ...props }) => (
		<blockquote
			className="border-l-4 border-ubuntu-orange pl-2 italic text-gray-600 my-2"
			{...props}
		/>
	),
	a: ({ node, ...props }) => (
		<a
			className="text-blue-600 hover:underline"
			target="_blank"
			rel="noopener noreferrer"
			{...props}
		/>
	),
	p: ({ node, ...props }) => <p className="mb-1 last:mb-0" {...props} />,
};

const GeminiChatApp: React.FC = () => {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: "1",
			role: "model",
			text: "Hello! I'm **Mallik's AI Assistant**. \n\nI can answer questions about my *projects*, *experience*, and *skills*. What would you like to know?",
		},
	]);
	const [input, setInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSend = async (text: string = input) => {
		if (!text.trim() || isLoading) return;

		const userMsg: Message = {
			id: Date.now().toString(),
			role: "user",
			text: text,
		};
		setMessages((prev) => [...prev, userMsg]);
		setInput("");
		setIsLoading(true);

		// Transform state messages to API history format.
		// IMPORTANT: Filter out the initial UI-only greeting (id: '1') to prevent
		// "History must start with a user message" errors from the API.
		// Also, do not include the message currently being sent (userMsg) in the history,
		// as it is sent via the sendMessage payload.
		const apiHistory = messages
			.filter((m) => m.id !== "1")
			.map((m) => ({
				role: m.role,
				parts: [{ text: m.text }],
			}));

		const responseText = await chatWithMallikAI(text, apiHistory);

		const botMsg: Message = {
			id: (Date.now() + 1).toString(),
			role: "model",
			text: responseText,
		};
		setMessages((prev) => [...prev, botMsg]);
		setIsLoading(false);
	};

	return (
		<div className="flex flex-col h-full bg-gray-50 font-ubuntu">
			{/* Header */}
			<div className="bg-gradient-to-r from-ubuntu-dark to-ubuntu-purple p-4 flex items-center gap-4 text-white shadow-md">
				<div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-inner">
					<Bot size={28} className="text-ubuntu-orange" />
				</div>
				<div>
					<h3 className="font-bold text-lg leading-tight">AI Assistant</h3>
					<p className="text-xs text-white/70 flex items-center gap-1">
						<Sparkles size={10} /> Ask anything about me .
					</p>
				</div>
			</div>

			{/* Chat Area */}
			<div
				className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar"
				aria-live="polite"
			>
				{messages.map((msg) => (
					<div
						key={msg.id}
						className={`flex ${
							msg.role === "user" ? "justify-end" : "justify-start"
						}`}
					>
						{msg.role === "model" && (
							<div className="w-8 h-8 bg-ubuntu-orange rounded-full flex items-center justify-center text-white mr-2 mt-1 shrink-0 shadow-sm">
								<Bot size={16} />
							</div>
						)}

						<div
							className={`max-w-[85%] md:max-w-[75%] p-4 rounded-2xl text-sm shadow-sm leading-relaxed ${
								msg.role === "user"
									? "bg-ubuntu-orange text-white rounded-tr-none"
									: "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
							}`}
						>
							{msg.role === "user" ? (
								msg.text
							) : (
								<div className="markdown-content space-y-2">
									<ReactMarkdown components={MARKDOWN_COMPONENTS}>
										{msg.text}
									</ReactMarkdown>
								</div>
							)}
						</div>

						{msg.role === "user" && (
							<div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 ml-2 mt-1 shrink-0">
								<UserIcon size={16} />
							</div>
						)}
					</div>
				))}

				{isLoading && (
					<div className="flex justify-start items-center gap-2 ml-10">
						<div
							className="flex space-x-1"
							role="status"
							aria-label="AI is thinking"
						>
							<div
								className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
								style={{ animationDelay: "0ms" }}
							></div>
							<div
								className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
								style={{ animationDelay: "150ms" }}
							></div>
							<div
								className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
								style={{ animationDelay: "300ms" }}
							></div>
						</div>
						<span className="text-xs text-gray-400">Thinking...</span>
					</div>
				)}
				<div ref={bottomRef} />
			</div>

			{/* Suggestions & Input */}
			<div className="bg-white border-t border-gray-200 p-4">
				{messages.length < 3 && !isLoading && (
					<div className="flex gap-2 overflow-x-auto pb-3 custom-scrollbar mb-2">
						{SUGGESTIONS.map((s, i) => (
							<button
								key={i}
								onClick={() => handleSend(s)}
								className="whitespace-nowrap px-3 py-1.5 bg-gray-100 hover:bg-orange-50 text-gray-600 hover:text-ubuntu-orange rounded-full text-xs border border-gray-200 transition-colors"
								aria-label={`Ask: ${s}`}
							>
								{s}
							</button>
						))}
					</div>
				)}

				<div className="flex gap-3 items-center bg-gray-50 p-2 rounded-full border border-gray-300 focus-within:border-ubuntu-orange focus-within:ring-2 focus-within:ring-orange-100 transition-all">
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleSend()}
						placeholder="Ask about Mallik's projects..."
						className="flex-1 bg-transparent px-3 py-1 focus:outline-none text-sm text-gray-800"
						disabled={isLoading}
						aria-label="Chat message input"
					/>
					<button
						onClick={() => handleSend()}
						disabled={isLoading || !input.trim()}
						className="w-8 h-8 bg-ubuntu-orange text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
						aria-label="Send message"
					>
						<Send size={16} />
					</button>
				</div>
				<div className="text-center mt-2">
					<p className="text-[10px] text-gray-400">
						AI generated content can be inaccurate.
					</p>
				</div>
			</div>
		</div>
	);
};

export default GeminiChatApp;
