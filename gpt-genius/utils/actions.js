'use server';

import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

export const generateChatResponse = async (chatMessages) => {
	try {
		const response = await openai.chat.completions.create({
			messages: [
				{ role: 'system', content: 'You are a helpful assistant.' }, // Were we set what the model should be
				...chatMessages
			],
			model: 'gpt-4o-mini',
			temperature: 0
		});

		console.log(response.choices[0].message);
		console.log(response);

		return response.choices[0].message;
	} catch (error) {
		return null;
	}
};
