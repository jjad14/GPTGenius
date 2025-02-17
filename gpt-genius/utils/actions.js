'use server';

import OpenAI from 'openai';
import prisma from './db';
import { revalidatePath } from 'next/cache';

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY
});

export const generateChatResponse = async (chatMessages) => {
	try {
		const response = await openai.chat.completions.create({
			messages: [
				{ role: 'system', content: 'You are a helpful assistant.' },
				...chatMessages
			],
			model: 'gpt-4o-mini',
			temperature: 0,
			max_tokens: 100
		});

		return {
			message: response.choices[0].message,
			tokens: response.usage.total_tokens
		};
	} catch (error) {
		return null;
	}
};

export const generateTourResponse = async ({ city, country }) => {
	// Prompt to generate tour
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

		return { tour: tourData.tour, tokens: response.usage.total_tokens };
	} catch (error) {
		console.log(error);
		return null;
	}
};

export const getExistingTour = async ({ city, country }) => {
	// Find tour using city and country
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
	// Create new tour in database
	return prisma.tour.create({
		data: tour
	});
};

export const getAllTours = async (searchTerm) => {
	// if no search term, return all in ascending order
	if (!searchTerm) {
		const tours = await prisma.tour.findMany({
			orderBy: {
				city: 'asc'
			}
		});

		return tours;
	}

	// if search term, search by city or country and return results in ascending order
	const tours = await prisma.tour.findMany({
		where: {
			OR: [
				{
					city: {
						contains: searchTerm
					}
				},
				{
					country: {
						contains: searchTerm
					}
				}
			]
		},
		orderBy: {
			city: 'asc'
		}
	});
	return tours;
};

export const getSingleTour = async (id) => {
	return prisma.tour.findUnique({
		where: {
			id
		}
	});
};

export const generateTourImage = async ({ city, country }) => {
	try {
		const tourImage = await openai.images.generate({
			prompt: `a panoramic view of ${city} ${country}`,
			n: 1,
			size: '512x512',
			model: 'dall-e-2',
			quality: 'standard'
		});
		return tourImage?.data[0]?.url;
	} catch (error) {
		console.log('There was an error generating the image: ', error);
		return null;
	}
};

export const fetchUserTokensById = async (clerkId) => {
	const result = await prisma.token.findUnique({
		where: {
			clerkId
		}
	});

	return result?.tokens;
};

export const generateUserTokensForId = async (clerkId) => {
	const result = await prisma.token.create({
		data: {
			clerkId
		}
	});
	return result?.tokens;
};

export const fetchOrGenerateTokens = async (clerkId) => {
	const result = await fetchUserTokensById(clerkId);
	if (result) {
		return result.tokens;
	}
	return (await generateUserTokensForId(clerkId)).tokens;
};

export const subtractTokens = async (clerkId, tokens) => {
	const result = await prisma.token.update({
		where: {
			clerkId
		},
		data: {
			tokens: {
				decrement: tokens
			}
		}
	});
	revalidatePath('/profile');
	// Return the new token value
	return result.tokens;
};

export const toProperCase = (str) => {
	return str
		.split(' ')
		.map(
			(word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		)
		.join(' ');
};
