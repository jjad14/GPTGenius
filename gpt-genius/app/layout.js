import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'GPTGenius',
	description:
		'GPTGenius: Your AI-powered language assistant. Built with OpenAI, it elevates your conversations, content creation, and beyond!'
};

export default function RootLayout({ children }) {
	return (
		<ClerkProvider>
			<html data-theme='autumn' lang='en'>
				<body className={inter.className}>{children}</body>
			</html>
		</ClerkProvider>
	);
}
