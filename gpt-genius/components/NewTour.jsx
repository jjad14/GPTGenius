'use client';
import React from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import TourInfo from '@/components/TourInfo';
import {
	generateTourResponse,
	getExistingTour,
	createNewTour,
	toProperCase
} from '@/utils/actions';

const NewTour = () => {
	const queryClient = useQueryClient();
	const {
		mutate: createTour,
		isPending,
		data: tour
	} = useMutation({
		mutationFn: async (destination) => {
			// Check if tour already exists
			const existingTour = await getExistingTour(destination);

			console.log(existingTour);

			if (existingTour) return existingTour;

			const newTour = await generateTourResponse(destination);
			if (newTour) {
				// Create new tour
				await createNewTour(newTour);

				// Invalidate cache
				queryClient.invalidateQueries({ queryKey: ['tours'] });

				return newTour;
			}
			toast.error('Invalid Input. No matching city was found...');
			return null;
		}
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const destination = Object.fromEntries(formData.entries());
		// const destination = Object.fromEntries(
		// 	Array.from(formData.entries()).map(([key, value]) => [
		// 		key,
		// 		typeof value === 'string' ? toProperCase(value) : value
		// 	])
		// );

		createTour(destination);
	};

	if (isPending) {
		return <span className='loading loading-lg'></span>;
	}

	return (
		<>
			<form onSubmit={handleSubmit} className='max-w-2xl'>
				<h2 className=' mb-4'>Choose Your Ideal Getaway</h2>
				<div className='join w-full'>
					<input
						type='text'
						className='input input-bordered join-item w-full'
						placeholder='City'
						name='city'
						required
					/>
					<input
						type='text'
						className='input input-bordered join-item w-full'
						placeholder='Country'
						name='country'
						required
					/>
					<button
						className='btn btn-primary join-item'
						type='submit'
						disabled={isPending}>
						{isPending ? 'Please Wait...' : 'Generate Tour'}
					</button>
				</div>
			</form>
			<div className='mt-16'>
				<div className='mt-16'>{tour && <TourInfo tour={tour} />}</div>
			</div>
		</>
	);
};
export default NewTour;
