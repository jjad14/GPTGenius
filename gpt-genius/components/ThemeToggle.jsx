'use client';

import React from 'react';
import { useState } from 'react';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';

const themes = {
	autumn: 'autumn',
	business: 'business'
};

const ThemeToggle = () => {
	const [theme, setTheme] = useState(themes.autumn);

	const toggleTheme = () => {
		// toggle between autumn and business theme (light/dark mode)
		const newTheme =
			theme === themes.autumn ? themes.business : themes.autumn;

		// Set the theme by adding a data-theme attribute to <html> for CSS to detect
		document.documentElement.setAttribute('data-theme', newTheme);
		setTheme(newTheme);
	};

	return (
		<button onClick={toggleTheme} className='btn btn-primary btn-sm'>
			{theme === 'autumn' ? (
				<BsMoonFill className='h-4 w-4 ' title='Dark Mode' />
			) : (
				<BsSunFill className='h-4 w-4' title='Light Mode' />
			)}
		</button>
	);
};

export default ThemeToggle;
