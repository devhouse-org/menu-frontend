import React, { useEffect, useState } from "react";
// import { CiFaceSmile } from "react-icons/ci";
// import { CiFaceMeh } from "react-icons/ci";
// import { CiFaceFrown } from "react-icons/ci";

import { FaFaceFrown } from "react-icons/fa6";
import { FaFaceSmileBeam } from "react-icons/fa6";
import { FaFaceMeh } from "react-icons/fa6";

interface RatingSelectorProps {
	onSelect: (rating: number) => void;
	titleEn: string;
	titleAr: string;
	rating: number | null;
}

const RatingSelector: React.FC<RatingSelectorProps> = ({
	onSelect,
	titleEn,
	titleAr,
	rating,
}) => {
	const [selectedRating, setSelectedRating] = useState<
		number | null
	>(rating);


	useEffect(() => {
		setSelectedRating(rating);
	}, [rating]);

	const handleSelect = (rating: number) => {
		setSelectedRating(rating);
		onSelect(rating);
	};


	return (
		<div className='w-full'>
			<div className='flex justify-between'>
				<h1 className='text-lg font-bold mb-2'>
					{titleEn}
				</h1>
				<h1 className='text-lg font-bold mb-2'>
					{titleAr}
				</h1>
			</div>

			<div className=' flex gap-5 justify-center items-center text-6xl'>
				<FaFaceSmileBeam
					className={`cursor-pointer p-1  ${
						selectedRating === 1
							? "text-green-500 border-2 border-gray-400 rounded-full"
							: "text-green-500"
					}`}
					onClick={() => handleSelect(1)}
				/>

				<FaFaceMeh
					className={`cursor-pointer p-1 ${
						selectedRating === 2
							? "text-yellow-500 border-2 border-gray-400 rounded-full"
							: "text-yellow-500"
					}`}
					onClick={() => handleSelect(2)}
				/>

				<FaFaceFrown
					className={`cursor-pointer p-1 ${
						selectedRating === 3
							? "text-red-500 border-2 border-gray-400 rounded-full"
							: "text-red-500"
					}`}
					onClick={() => handleSelect(3)}
				/>
			</div>
		</div>
	);
};

export default RatingSelector;
