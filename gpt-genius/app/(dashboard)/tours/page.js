import React from 'react';
import ToursPage from '@/components/ToursPage';
import {
	dehydrate,
	HydrationBoundary,
	QueryClient
} from '@tanstack/react-query';
import { getAllTours } from '@/utils/actions';

const AllToursPage = async () => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ['tours'],
		queryFn: () => getAllTours()
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<ToursPage />
		</HydrationBoundary>
	);
};

export default AllToursPage;
