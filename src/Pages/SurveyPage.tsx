import React, { useState } from "react";
import RatingSelector from "../components/RatingSelector";
import CommentSection from "../components/CommentSection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showErrorToast, showSuccessToast } from "../utils";
import ConfettiExplosion from "react-confetti-explosion";
import axiosInstance from "../axiosInstance";
import {
	useQuery,
	useMutation,
} from "@tanstack/react-query";

type RatingsT = {
	questionId: string;
	score: number;
};

const SurveyPage: React.FC = () => {
	const [ratings, setRatings] = useState<RatingsT[]>([]);
	const [comment, setComment] = useState<string>("");
	const [isExploding, setIsExploding] =
		useState<boolean>(false);

	const { data, isError, isPending } = useQuery({
		queryKey: ["Survey"],
		queryFn: async () => {
			const response = await axiosInstance.get(
				`/question/restaurant/${localStorage.getItem(
					"RestaurantID"
				)}`
			);
			return response.data;
		},
	});

	const mutation = useMutation({
		mutationFn: async  (data: {
			comment: string;
			restaurantId: string;
			ratings: RatingsT[];
		}) => {
			return await axiosInstance.post(
				"/customer-review",
				data
			);
		},
		onSuccess(data: any) {
			console.log("post", data.data);
			showSuccessToast("Successfully Submitted");
		},
		onError(error: any) {
			showErrorToast("Submission failed");
			console.error(
				"Submission error:",
				error.response ? error.response.data : error.message
			);
		},
	});

	console.log("Rest data is:", data);
		console.log("id Rest", localStorage.getItem("RestaurantID"));


	if (isPending) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error</div>;
	}

	const handleRatingSelect = (
		questionId: string,
		score: number
	) => {
		setRatings((prevRatings) => {
			return [...prevRatings, { questionId, score }];
		});
	};

	const handleCommentChange = (commentText: string) => {
		setComment(commentText);
	};

	const handleSubmit = () => {
		let isValid = true;

		if (!comment) {
			showErrorToast("Please, Write your Comment");
			isValid = false;
		}

		if (isValid) {
			mutation.mutate({
				comment: comment,
				restaurantId: localStorage.getItem("RestaurantID")!,
				ratings: ratings,

				// 			comment: "w",
				// 			restaurantId: localStorage.getItem("RestaurantID")!,
				// 			ratings:[{
				//   score: 1,
				//   questionId: "question456"
				// }]
			});

			// Reset ratings
			setRatings([]);

			// Reset Comment
			setComment("");
			setIsExploding(true);

			console.log("Selected ratings:", ratings);
			console.log("Comment:", comment);

			// Reset confetti explosion after a delay
			setTimeout(() => {
				setIsExploding(false);
			}, 4000);
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
					{data.map((q: any) => {
						return (
							<RatingSelector
								titleEn={q.enTitle}
								titleAr={q.title}
								onSelect={(rating) =>
									handleRatingSelect(q.id, rating)
								}
								rating={
									ratings.find((r) => r.questionId === q.id)
										?.score || 0
								}
								key={q.id}
							/>
						);
					})}
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

				<div className='w-full flex justify-center items-center'>
					{isExploding && (
						<ConfettiExplosion
							force={0.8}
							duration={3000}
							particleCount={250}
							width={1600}
						/>
					)}
				</div>
				<ToastContainer pauseOnFocusLoss={false} />
			</div>
		</div>
	);
};

export default SurveyPage;
