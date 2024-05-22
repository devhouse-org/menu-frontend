import React, { useState } from "react";
import RatingSelector from "./assets/components/RatingSelector";
import CommentSection from "./assets/components/CommentSection";
import Select from "./assets/components/Select";
import logo from "./assets/logo.jpg";

const App: React.FC = () => {
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
		<>
			<div className='w-screen flex justify-center items-center'>
				<div className='flex flex-col  w-9/12 p-4 gap-12'>
					{/* Logo */}
					<div className='w-full flex justify-center'>
						<img
							src={logo}
							alt='Logo'
							className='w-28'
						/>
					</div>

					{/* Header */}
					<div className='w-full flex flex-col justify-center items-center'>
						<h1 className='pt-3'>
							We hope your meal was as delightful as you
							hoped!
						</h1>
						<h1 className='text-red-400'>
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
					<div className='w-full flex flex-col gap-10 justify-center items-center '>
						<RatingSelector
							titleEn='Food Quality'
							titleAr='جودة الطعام'
							onSelect={(rating) =>
								handleRatingSelect("quality", rating)
							}
						/>

						<RatingSelector
							onSelect={(rating) =>
								handleRatingSelect("service", rating)
							}
							titleEn='Service Quality'
							titleAr='جودة الخدمة'
						/>

						<RatingSelector
							onSelect={(rating) =>
								handleRatingSelect("price", rating)
							}
							titleEn='Food Price'
							titleAr='سعر الوجبات'
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
						className='mt-4 bg-red-600 hover:bg-red-500 text-white font-semibold py-4 px-4 rounded-md'
					>
						Submit
					</button>
				</div>
			</div>
		</>
	);
};

export default App;
