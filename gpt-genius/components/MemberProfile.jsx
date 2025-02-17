import React from 'react';
import { UserButton, currentUser, auth } from '@clerk/nextjs';
import { fetchOrGenerateTokens } from '@/utils/actions';

const MemberProfile = async () => {
	const user = await currentUser(); // currently authenticated user
	const { userId } = auth(); // authentication context

	await fetchOrGenerateTokens(userId);

	return (
		<div className='px-4 flex items-center gap-2'>
			<UserButton afterSignOutUrl='/' />
			<p>{user.emailAddresses[0].emailAddress}</p>
		</div>
	);
};

export default MemberProfile;
