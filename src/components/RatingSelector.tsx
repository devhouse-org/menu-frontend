import React, { useEffect, useState } from "react";
// import { CiFaceSmile } from "react-icons/ci";
// import { CiFaceMeh } from "react-icons/ci";
// import { CiFaceFrown } from "react-icons/ci";

import { FaFaceFrown } from "react-icons/fa6";
import { FaFaceSmileBeam } from "react-icons/fa6";
import { FaFaceMeh } from "react-icons/fa6";

interface RatingSelectorProps {
	onSelect: (rating: string) => void;
	titleEn: string;
	titleAr: string;
	rating: string | null;
}

const RatingSelector: React.FC<RatingSelectorProps> = ({
	onSelect,
	titleEn,
	titleAr,
	rating,
}) => {
	const [selectedRating, setSelectedRating] = useState<
		string | null
	>(rating);

	useEffect(() => {
		setSelectedRating(rating);
	}, [rating]);

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
				<FaFaceSmileBeam
					className={`text-6xl cursor-pointer ${
						selectedRating === "good"
							? "text-green-500"
							: "text-gray-400"
					}`}
					onClick={() => handleSelect("good")}
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
						selectedRating === "medium"
							? "text-yellow-500"
							: "text-gray-400"
					}`}
					onClick={() => handleSelect("medium")}
				/>

				<FaFaceFrown
					className={`text-6xl cursor-pointer ${
						selectedRating === "bad"
							? "text-red-500"
							: "text-gray-400"
					}`}
					onClick={() => handleSelect("bad")}
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
