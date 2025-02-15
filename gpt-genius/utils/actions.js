'use server';

import OpenAI from 'openai';
import prisma from './db';

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

export const generateTourResponse = async ({ city, country }) => {
	const query = `Find a ${city} in this ${country}.
        If ${city} in this ${country} exists, create a list of things families can do in this ${city},${country}. 
        Return at least 5 things to do and at max 10. Once you have a list, create a one-day tour. Response should be in the following JSON format: 
        {
        "tour": {
            "city": "${city}",
            "country": "${country}",
            "title": "title of the tour",
            "description": "description of the city and tour",
            "stops": ["short paragraph on the stop 1 ", "short paragraph on the stop 2","short paragraph on the stop 3"]
        }
        }
        If you can't find info on exact ${city}, or ${city} does not exist, or it's population is less than 1, or it is not located in the following ${country} return { "tour": null }, with no additional characters.`;

	try {
		// Creates a completion for the chat message
		const response = await openai.chat.completions.create({
			messages: [
				{ role: 'system', content: 'you are a tour guide' },
				{ role: 'user', content: query }
			],
			model: 'gpt-4o-mini',
			temperature: 0
		});
		// potentially returns a text with error message
		const tourData = JSON.parse(response.choices[0].message.content);

		// Check if there is a tour
		if (!tourData.tour) {
			return null;
		}

		return tourData.tour;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getExistingTour = async ({ city, country }) => {
	console.log('Getting existing tour');

	return prisma.tour.findUnique({
		where: {
			city_country: {
				city,
				country
			}
		}
	});
};

export const createNewTour = async (tour) => {
	console.log('Creating new tour');
	return prisma.tour.create({
		data: tour
	});
};
