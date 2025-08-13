// SurveyPage.tsx
import React, { useState } from "react";
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
import RatingSelector from "../components/RatingSelector";

type RatingsT = {
  questionId: string;
  score: number;
};

const SurveyPage: React.FC = () => {
  const [ratings, setRatings] = useState<RatingsT[]>([]);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isExploding, setIsExploding] = useState<boolean>(false);
  const theme = getThemeColors();
  const [selectedDate, setSelectedDate] = useState<{
    year: string;
    month: string;
    day: string;
  }>({
    year: "",
    month: "",
    day: "",
  });

  const handleDateChange = (year: string, month: string, day: string) => {
    setSelectedDate({ year, month, day });
  };

  const {
    comment,
    name,
    birthday,
    phone,
    setComment,
    setName,
    setBirthday,
    setPhone,
  } = useSurveyStore();

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
      const existingRatingIndex = prevRatings.findIndex(
        (r) => r.questionId === questionId
      );
      if (existingRatingIndex !== -1) {
        return prevRatings.map((r) =>
          r.questionId === questionId ? { ...r, score } : r
        );
      } else {
        return [...prevRatings, { questionId, score }];
      }
    });
  };

  const handleSubmit = () => {
    let isValid = true;

    if (!name || !phone || !birthday || ratings.length < data?.length) {
      showErrorToast(
        t("Please fill in the required fields and answer all questions!")
      );
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
      className="flex justify-center items-center pt-20 w-screen min-h-screen font-montserrat"
      style={{ color: theme.primary }}
    >
      <div className="flex flex-col gap-12 p-4 py-8 w-9/12">
        {/* Header */}
        <div className="flex flex-col gap-2 justify-center items-center w-full text-2xl text-center">
          <h1 className="pt-3 font-bold">
            {t("We hope your meal was as delightful as you hoped!")}
          </h1>
        </div>

        {/* Rate Quality */}
        <div className="flex flex-col gap-10 justify-center items-center w-full">
          {/* Food Quality */}
          {data.map((q: any) => (
            <div key={q.id} className="flex flex-col items-center">
              {i18n.language === "en" ? (
                <h3 className="text-xl font-semibold">{t(q.enTitle)}</h3>
              ) : (
                <h3 className="text-xl font-semibold">{t(q.title)}</h3>
              )}

              <RatingSelector
                rating={ratings.find((r) => r.questionId === q.id)?.score || 0}
                onRatingSelect={(score) => handleRatingSelect(q.id, score)}
              />
            </div>
          ))}
        </div>

        {/* Comment */}
        <CommentSection titleAr={"الملاحظات"} titleEn={"Comments"} />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="px-4 py-4 mt-4 font-semibold rounded-md bg-secondary"
          style={{
            backgroundColor: theme.primary,
            color: "white",
          }}
        >
          {t("Submit")}
        </button>

        <div className="flex justify-center items-center w-full">
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
