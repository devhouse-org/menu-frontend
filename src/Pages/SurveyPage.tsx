import React, { useState } from "react";
import RatingSelector from "../components/RatingSelector";
import CommentSection from "../components/CommentSection";
import {
	ToastContainer,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showErrorToast, showSuccessToast } from "../utils";

const SurveyPage: React.FC = () => {

	const [ratings, setRatings] = useState({
		quality: null,
		service: null,
		price: null,
	});
	const [comment, setComment] = useState<string>("");

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
		if (!ratings.price) {
			showErrorToast("Please, Rate the Price");
		}

		if (!ratings.quality) {
			showErrorToast("Please, Rate Quality");
		}

		if (!ratings.service) {
			showErrorToast("Please, Rate Service");
		}

		if (!comment) {
			showErrorToast("Please, Write your Comment");
		}

		if (
			ratings.quality &&
			ratings.price &&
			ratings.service &&
			comment
		) {
			showSuccessToast("Successfully Submitted");

			// Reset ratings
			setRatings({
				quality: null,
				service: null,
				price: null,
			});

			// Reset Comment
			setComment("");

			console.log("Selected ratings:", ratings);
			console.log("Comment:", comment);
		}
	};

	return (
		<div className='w-screen min-h-screen flex justify-center items-center font-montserrat text-Yale-Blue-900 pt-20'>
			<div className='flex flex-col w-9/12 p-4 py-8 gap-12'>
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

				{/* Rate Quality */}
				<div className='w-full flex flex-col gap-10 justify-center items-center'>
					{/* Food Quality */}
					<RatingSelector
						titleEn='Food Quality'
						titleAr='جودة الطعام'
						onSelect={(rating) =>
							handleRatingSelect("quality", rating)
						}
						rating={ratings.quality}
					/>
					{/* Service Quality */}
					<RatingSelector
						titleEn='Service Quality'
						titleAr='جودة الخدمة'
						onSelect={(rating) =>
							handleRatingSelect("service", rating)
						}
						rating={ratings.service}
					/>
					{/* Food Price */}
					<RatingSelector
						titleEn='Food Price'
						titleAr='سعر الوجبات'
						onSelect={(rating) =>
							handleRatingSelect("price", rating)
						}
						rating={ratings.price}
					/>
				</div>

				{/* Comment */}
				<CommentSection
					onChange={handleCommentChange}
					titleAr={"الملاحظات"}
					titleEn={"Comments"}
					comment={comment}
				/>

				{/* Submit */}
				<button
					onClick={handleSubmit}
					className='mt-4 bg-coral-600 hover:bg-secondary text-white font-semibold py-4 px-4 rounded-md'
				>
					Submit
				</button>
				<ToastContainer pauseOnFocusLoss={false} />
			</div>
		</div>
	);
};

export default SurveyPage;
