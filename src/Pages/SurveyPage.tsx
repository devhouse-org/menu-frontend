import React, { useState } from "react";
import RatingSelector from "../components/RatingSelector";
import CommentSection from "../components/CommentSection";
import Select from "../components/Select";
// import logo from "../assets/logo.png";

const SurveyPage: React.FC = () => {
	const options = [
		{ value: "rest1", label: "Rest1" },
		{ value: "rest2", label: "Rest2" },
		{ value: "rest3", label: "Rest3" },
		{ value: "rest4", label: "Rest4" },
	];

	const [selectedOutlet, setSelectedOutlet] =
		useState<any>(null);
	const [ratings, setRatings] = useState({
		quality: null,
		service: null,
		price: null,
	});
	const [comment, setComment] = useState<string>("");

	const handleSelect = (selectedOption: any) => {
		setSelectedOutlet(selectedOption);
	};

	const handleRatingSelect = (
		ratingType: string,
		rating: string
	) => {
		setRatings((prevRatings) => ({
			...prevRatings,
			[ratingType]: rating,
		}));
	};

	const handleCommentChange = (commentText: string) => {
		setComment(commentText);
	};

	const handleSubmit = () => {
		console.log("Selected outlet:", selectedOutlet);
		console.log("Selected ratings:", ratings);
		console.log("Comment:", comment);
	};

	return (
		<div className='w-screen min-h-screen flex justify-center items-center font-montserrat text-Yale-Blue-900 pt-20'>
			<div className='flex flex-col w-9/12 p-4 py-8 gap-12'>
				{/* Logo */}
				{/* <div className='w-full flex justify-center'>
					<img
						src={logo}
						alt='Logo'
						className='w-28'
					/>
				</div> */}

				{/* Header */}
				<div className='w-full flex flex-col justify-center items-center text-2xl text-center gap-2'>
					<h1 className='pt-3 font-bold'>
						We hope your meal was as delightful as you
						hoped!
					</h1>
					<h1 className='text-coral-600 font-noto-kufi-arabic'>
						نأمل أن تكون وجبتك كانت ممتعة كما تمنيت
					</h1>
				</div>

				{/* Choose Outlet */}
				<div className='w-full'>
					<Select
						options={options}
						onSelect={handleSelect}
						titleEn='Choose the outlet'
						titleAr='اختر المطعم'
					/>
				</div>

				{/* Choose Quality */}
				<div className='w-full flex flex-col gap-10 justify-center items-center'>
					<RatingSelector
						titleEn='Food Quality'
						titleAr='جودة الطعام'
						onSelect={(rating) =>
							handleRatingSelect("quality", rating)
						}
					/>
					<RatingSelector
						titleEn='Service Quality'
						titleAr='جودة الخدمة'
						onSelect={(rating) =>
							handleRatingSelect("service", rating)
						}
					/>
					<RatingSelector
						titleEn='Food Price'
						titleAr='سعر الوجبات'
						onSelect={(rating) =>
							handleRatingSelect("price", rating)
						}
					/>
				</div>

				{/* Comment */}
				<CommentSection
					onChange={handleCommentChange}
					titleAr={"الملاحظات"}
					titleEn={"Comments"}
				/>

				{/* Submit */}
				<button
					onClick={handleSubmit}
					className='mt-4 bg-coral-600 hover:bg-secondary text-white font-semibold py-4 px-4 rounded-md'
				>
					Submit
				</button>
			</div>
		</div>
	);
};

export default SurveyPage;
