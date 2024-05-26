import React, { useState } from "react";
import { CiFaceSmile } from "react-icons/ci";
import { CiFaceMeh } from "react-icons/ci";
import { CiFaceFrown } from "react-icons/ci";

interface RatingSelectorProps {
	onSelect: (rating: string) => void;
	titleEn: string;
	titleAr: string;
}

const RatingSelector: React.FC<RatingSelectorProps> = ({
	onSelect,
	titleEn,
	titleAr,
}) => {
	const [selectedRating, setSelectedRating] = useState<
		string | null
	>(null);

	const handleSelect = (rating: string) => {
		setSelectedRating(rating);
		onSelect(rating);
	};

	return (
		<div className='w-full'>
			<div className='flex justify-between'>
				<h1 className='text-lg font-bold mb-2'>
					{titleEn}
				</h1>
				<h1 className='text-lg font-bold mb-2 font-noto-kufi-arabic'>
					{titleAr}
				</h1>
			</div>

			<div className=' flex gap-5 justify-center items-center'>
				<CiFaceSmile
					className={`text-6xl cursor-pointer ${
						selectedRating === "good"
							? "text-green-500"
							: "text-gray-400"
					}`}
					onClick={() => handleSelect("good")}
				/>
				{/* 
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
				</button> */}

				<CiFaceMeh
					className={`text-6xl cursor-pointer ${
						selectedRating === "medium"
							? "text-yellow-500"
							: "text-gray-400"
					}`}
					onClick={() => handleSelect("medium")}
				/>
				{/* <button
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
				</button> */}

				<CiFaceFrown
					className={`text-6xl cursor-pointer ${
						selectedRating === "bad"
							? "text-red-500"
							: "text-gray-400"
					}`}
					onClick={() => handleSelect("bad")}
				/>
				{/* <button
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
				</button> */}
			</div>
		</div>
	);
};

export default RatingSelector;
