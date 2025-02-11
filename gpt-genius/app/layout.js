import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'GPTGenius',
	description:
		'GPTGenius: Your AI-powered language assistant. Built with OpenAI, it elevates your conversations, content creation, and beyond!'
};

export default function RootLayout({ children }) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={inter.className}>
					<Providers>{children}</Providers>
				</body>
			</html>
		</ClerkProvider>
	);
}
