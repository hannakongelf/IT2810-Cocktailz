export const getButtonColors = (page: string) => {
	let buttonColorLiked = 'text-black';
	let buttonColorUnLiked = 'text-white';

	// Set button colors based on the page
	switch (page) {
		case 'cocktailPage':
			buttonColorLiked = 'fill-blue-text';
			buttonColorUnLiked = 'fill-white stroke-blue-text';
			break;
		case 'searchPage':
			buttonColorLiked = 'fill-dark-purple stroke-black';
			buttonColorUnLiked = 'fill-white stroke-dark-purple';
			break;
		case 'favoritesPage':
			buttonColorLiked = 'fill-brown';
			buttonColorUnLiked = 'fill-white stroke-brown';
			break;
		default:
			buttonColorLiked = 'fill-dark-pink';
			buttonColorUnLiked = 'fill-white stroke-dark-pink';
	}

	return {
		buttonColorLiked,
		buttonColorUnLiked,
	};
};
