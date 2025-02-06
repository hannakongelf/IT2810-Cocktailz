interface SearchToggleProps {
	isToggled: boolean;
	onToggle: () => void;
}

/**
 *  A toggle switch component that lets users enable or disable searching for ingredients
 * @returns SearchToggle component.
 */

const SearchToggle: React.FC<SearchToggleProps> = ({ isToggled, onToggle }) => {
	return (
		<section className="flex flex-row space-x-2 m-2 w-64 md:w-[500px] lg:w-[800px]">
			<label className="relative inline-flex items-center cursor-pointer focus-within:outline focus-within:outline-[1px] focus-within:outline-dark-purple focus-within:rounded-md focus-within:outline-offset-2">
				<input
					type="checkbox"
					checked={isToggled}
					onChange={onToggle}
					onKeyDown={(e) => {
						// Toggle with keyboard interaction
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							onToggle();
						}
					}}
					className="sr-only peer"
					aria-checked={isToggled}
				/>
				<div
					className="w-9 h-5 bg-gray peer-checked:bg-dark-purple rounded-full transition-all duration-300 ease-in-out 
                 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-4 after:h-4 after:bg-white after:rounded-full after:transition-transform after:duration-300 after:ease-in-out peer-checked:after:translate-x-4"
				></div>
				<span className="ml-3 text-sm font-medium text-black ">
					Search for Ingredient
				</span>
			</label>
		</section>
	);
};

export default SearchToggle;
