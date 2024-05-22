import React, { useState } from "react";

interface RatingSelectorProps {
	onSelect: (rating: string) => void;
}

const RatingSelector: React.FC<RatingSelectorProps> = ({
	onSelect,
}) => {
	const [selectedRating, setSelectedRating] = useState<
		string | null
	>(null);

	const handleSelect = (rating: string) => {
		setSelectedRating(rating);
		onSelect(rating);
	};

	return (
		<div>
			<button
				className={`outline-none mr-2 ${
					selectedRating === "good"
						? "text-green-500"
						: "text-gray-400"
				}`}
				onClick={() => handleSelect("good")}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-6 w-6'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M5 13l4 4L19 7'
					/>
				</svg>
			</button>
			<button
				className={`outline-none mr-2 ${
					selectedRating === "medium"
						? "text-yellow-500"
						: "text-gray-400"
				}`}
				onClick={() => handleSelect("medium")}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-6 w-6'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M12 6v6m0 0v6m0-6h6m-6 0H6'
					/>
				</svg>
			</button>
			<button
				className={`outline-none mr-2 ${
					selectedRating === "bad"
						? "text-red-500"
						: "text-gray-400"
				}`}
				onClick={() => handleSelect("bad")}
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-6 w-6'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M6 18L18 6M6 6l12 12'
					/>
				</svg>
			</button>
		</div>
	);
};

export default RatingSelector;
