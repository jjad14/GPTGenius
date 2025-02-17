'use client';

import React from 'react';
import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import {
	generateChatResponse,
	fetchUserTokensById,
	subtractTokens
} from '@/utils/actions';

const Chat = () => {
	const { userId } = useAuth();
	const [text, setText] = useState('');
	const [messages, setMessages] = useState([]);

	const { mutate: createMessage, isPending } = useMutation({
		mutationFn: async (query) => {
			const currentTokens = await fetchUserTokensById(userId);

			// Check if user has enough tokens
			if (currentTokens < 100) {
				toast.error('Token balance is too low....');
				return;
			}

			const response = await generateChatResponse([...messages, query]);

			if (!response) {
				toast.error('Something went wrong...');
				return;
			}
			setMessages((prev) => [...prev, response.message]);

			// Update token balance
			const newTokens = await subtractTokens(userId, response.tokens);
			toast.success(`${newTokens} tokens are remaining...`);
		}
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		// Create query object
		const query = { role: 'user', content: text };

		// Send query
		createMessage(query);

		// Add query to messages
		setMessages((prev) => [...prev, query]);

		// Reset text
		setText('');
	};

	return (
		<div className='min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]'>
			<div>
				{messages.map(({ role, content }, index) => {
					const avatar = role == 'user' ? '👤' : '🤖';
					const bgColour =
						role == 'user' ? 'bg-base-200' : 'bg-base-100';
					return (
						<div
							key={index}
							className={`${bgColour} flex py-6 -mx-8 px-8
                                   text-xl leading-loose border-b border-base-300`}>
							<span className='mr-4 '>{avatar}</span>
							<p className='max-w-3xl'>{content}</p>
						</div>
					);
				})}

				{isPending && <span className='loading'></span>}
			</div>
			<form onSubmit={handleSubmit} className='max-w-screen pt-12'>
				<div className='join w-full'>
					<input
						type='text'
						placeholder='Message GeniusGPT'
						className='input input-bordered join-item w-full'
						value={text}
						required
						onChange={(e) => setText(e.target.value)}
					/>
					<button
						className='btn btn-primary join-item'
						type='submit'
						disabled={isPending}>
						{isPending ? 'Please Wait...' : 'Ask a question'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default Chat;
