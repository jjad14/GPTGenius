import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import TourInfo from '@/components/TourInfo';
import { getSingleTour, generateTourImage } from '@/utils/actions';
import Image from 'next/image';

const SingleTourPage = async ({ params }) => {
	// Get the tour using the id
	const tour = await getSingleTour(params.id);

	// If the tour is not found, redirect to the tours page
	if (!tour) {
		redirect('/tours');
	}

	// Generate image of the tour
	const tourImage = await generateTourImage({
		city: tour.city,
		country: tour.country
	});
	return (
		<div>
			<Link href='/tours' className='btn btn-secondary mb-12'>
				Back to Tours
			</Link>

			{tourImage ? (
				<div>
					<Image
						src={tourImage}
						width={300}
						height={300}
						className='rounded-xl shadow-xl mb-16 h-96 w-96 object-cover'
						alt={tour.title}
						priority
					/>
				</div>
			) : null}

			<TourInfo tour={tour} />
		</div>
	);
};
export default SingleTourPage;
