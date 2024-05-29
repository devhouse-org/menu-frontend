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
				<h1 className='text-lg font-bold mb-2 font-noto-kufi-arabic'>
					{titleAr}
				</h1>
			</div>

			<div className=' flex gap-5 justify-center items-center'>
				<FaFaceSmileBeam
					className={`text-6xl cursor-pointer ${
						selectedRating === 1
							? "text-green-500"
							: "text-gray-400"
					}`}
					onClick={() => handleSelect(1)}
				/>

				{/* <CiFaceSmile
					className={`text-6xl cursor-pointer ${
						selectedRating === "good"
							? "text-green-500"
							: "text-gray-400"
					}`}
					onClick={() => handleSelect("good")}
				/> */}

				{/* <CiFaceMeh
					className={`text-6xl cursor-pointer ${
						selectedRating === "medium"
							? "text-yellow-500"
							: "text-gray-400"
					}`}
					onClick={() => handleSelect("medium")}
				/> */}

				<FaFaceMeh
					className={`text-6xl cursor-pointer ${
						selectedRating === 2
							? "text-yellow-500"
							: "text-gray-400"
					}`}
					onClick={() => handleSelect(2)}
				/>

				<FaFaceFrown
					className={`text-6xl cursor-pointer ${
						selectedRating === 3
							? "text-red-500"
							: "text-gray-400"
					}`}
					onClick={() => handleSelect(3)}
				/>

				{/* <CiFaceFrown
					className={`text-6xl cursor-pointer ${
						selectedRating === "bad"
							? "text-red-500"
							: "text-gray-400"
					}`}
					onClick={() => handleSelect("bad")}
				/> */}
			</div>
		</div>
	);
};

export default RatingSelector;
