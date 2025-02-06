import React, { useEffect, useState } from 'react';

/**
 * ScrollBar component to display where the user is on the page.
 * @returns ScrollBar component.
 */

const ScrollBar: React.FC = () => {
	const [scrollProgress, setScrollProgress] = useState(0);

	// Handle scroll events
	const handleScroll = () => {
		const scrollTop = window.scrollY;
		const docHeight =
			document.documentElement.scrollHeight - window.innerHeight;
		const progress = (scrollTop / docHeight) * 100;
		setScrollProgress(progress);
	};

	// Add scroll event listener
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return (
		<>
			<main className="fixed top-0 left-0 h-full w-2 flex items-center z-50">
				{/* Border around the scrollbar */}
				<section className="relative h-full w-1 border border-dark-pink bg-dark-pink mx-auto">
					{/* Moving scroll circle */}
					<article
						className="absolute left-0 w-2 h-6 border border-w-1 border-dark-pink bg-white rounded-full transform -translate-x-1/2 left-1/2"
						style={{ top: `${scrollProgress}%` }}
					></article>
				</section>
			</main>
		</>
	);
};

export default ScrollBar;
