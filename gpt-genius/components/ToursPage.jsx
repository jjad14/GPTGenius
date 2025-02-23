'use client';

import React from 'react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllTours } from '@/utils/actions';
import ToursList from './ToursList';

const ToursPage = () => {
	const [searchValue, setSearchValue] = useState('');
	const { data, isPending } = useQuery({
		queryKey: ['tours', searchValue],
		queryFn: () => getAllTours(searchValue)
	});

	return (
		<>
			<form className='max-w-lg mb-12'>
				<div className='join w-full'>
					<input
						type='text'
						placeholder='Search for tour(s)'
						className='input input-bordered join-item w-full'
						name='search'
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						required
					/>
					<button
						className='btn btn-primary join-item'
						type='button'
						disabled={isPending}
						onClick={() => setSearchValue('')}>
						{isPending ? 'Loading...' : 'Clear'}
					</button>
				</div>
			</form>
			{isPending ? (
				<span className=' loading'></span>
			) : (
				<ToursList data={data} />
			)}
		</>
	);
};
export default ToursPage;
