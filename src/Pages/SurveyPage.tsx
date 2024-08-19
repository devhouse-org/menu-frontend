import React, { useState } from "react";
import RatingSelector from "../components/RatingSelector";
import CommentSection from "../components/CommentSection";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { showErrorToast, showSuccessToast } from "../utils";
import ConfettiExplosion from "react-confetti-explosion";
import axiosInstance from "../axiosInstance";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getThemeColors } from "../utils";
import { useSurveyStore } from "../store/surveyStore";
import { useTranslation } from "react-i18next";

type RatingsT = {
	questionId: string;
	score: number;
};

const SurveyPage: React.FC = () => {
	const [ratings, setRatings] = useState<RatingsT[]>([]);
	const navigate = useNavigate();
	const {t} = useTranslation()
	const [isExploding, setIsExploding] = useState<boolean>(false);
	const theme = getThemeColors();

	// Access the Zustand store values
	const { comment, name, birthday, phone, setComment, setName, setBirthday, setPhone } = useSurveyStore();

	const { data, isError, isPending } = useQuery({
		queryKey: ["Survey"],
		queryFn: async () => {
			const response = await axiosInstance.get(
				`/question/restaurant/${localStorage.getItem("RestaurantID")}`
			);
			return response.data;
		},
	});

	const mutation = useMutation({
		mutationFn: (reviewData: {
			comment: string;
			name: string;
			birthday: string;
			phone: string;
			resturantId: string;
			ratings: RatingsT[];
		}) => {
			return axiosInstance.post("/customer-review", reviewData);
		},
		onSuccess() {
			showSuccessToast(t("Successfully Submitted"));
		},
		onError(error: any) {
			showErrorToast(t("Submission failed"));
			console.error(
				t("Submission error:"),
				error.response ? error.response.data : error.message
			);
		},
	});

	if (isPending) {
		return <div>{t("Loading...")}</div>;
	}

	if (isError) {
		return <div>{t("Error")}</div>;
	}

	const handleRatingSelect = (questionId: string, score: number) => {
		setRatings((prevRatings) => {
			return [...prevRatings, { questionId, score }];
		});
	};

	const handleSubmit = () => {
		let isValid = true;

		if (!name || !phone || !birthday) {
			showErrorToast(t("Please fill in the required fields."));
			isValid = false;
		}

		const restaurantId = localStorage.getItem("RestaurantID");
		if (!restaurantId) {
			return; // TODO: handle missing restaurant ID, perhaps log out
		}

		if (isValid) {
			mutation.mutate({
				comment: comment,
				name: name,
				birthday: birthday,
				phone: phone,
				resturantId: restaurantId,
				ratings: ratings,
			});

			// Reset ratings and Zustand store values
			setRatings([]);
			setComment("");
			setName("");
			setBirthday("");
			setPhone("");
			setIsExploding(true);

			// Reset confetti explosion after a delay
			setTimeout(() => {
				setIsExploding(false);
				navigate("/thankyou");
			}, 2500);
		}
	};

	return (
		<div
			className="w-screen min-h-screen flex justify-center items-center font-montserrat pt-20"
			style={{ color: theme.primary }}
		>
			<div className="flex flex-col w-9/12 p-4 py-8 gap-12">
				{/* Header */}
				<div className="w-full flex flex-col justify-center items-center text-2xl text-center gap-2">
					<h1 className="pt-3 font-bold">
						{t("We hope your meal was as delightful as you hoped!")}
					</h1>
				</div>

				{/* Rate Quality */}
				<div className="w-full flex flex-col gap-10 justify-center items-center">
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
				<CommentSection titleAr={"الملاحظات"} titleEn={"Comments"} />

				{/* Submit */}
				<button
					onClick={handleSubmit}
					className="mt-4 bg-secondary font-semibold py-4 px-4 rounded-md"
					style={{
						backgroundColor: theme.secondary,
						color: "white",
					}}
				>
					{t("Submit")}
				</button>

				<div className="w-full flex justify-center items-center">
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
