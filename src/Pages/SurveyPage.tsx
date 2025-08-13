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
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { AlertCircle, Loader2 } from "lucide-react";

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
      console.error(
        t("Submission error:"),
        error.response ? error.response.data : error.message
      );
    },
  });

  if (isPending) {
    return (
      <div className="w-screen min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>{t("Loading...")}</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-screen min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-md w-full">
          <CardHeader className="flex flex-row items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <CardTitle className="text-base">{t("Error")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{t("Something went wrong while loading the survey.")}</p>
          </CardContent>
        </Card>
      </div>
    );
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
      className="w-screen min-h-screen flex justify-center items-start font-montserrat pt-24 pb-10"
      style={{ color: theme.primary }}
    >
      <div className="w-full max-w-3xl lg:max-w-4xl px-4 flex flex-col gap-8">
        {/* Header */}
        <Card className="shadow-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold tracking-tight">
              {t("We hope your meal was as delightful as you hoped!")}
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Questions */}
        <div className="flex flex-col gap-4">
          {data.map((q: any) => (
            <Card key={q.id} className="shadow-sm">
              <CardHeader className="items-center">
                <CardTitle className="text-lg font-semibold text-center">
                  {i18n.language === "en" ? t(q.enTitle) : t(q.title)}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <RatingSelector
                  rating={ratings.find((r) => r.questionId === q.id)?.score || 0}
                  onRatingSelect={(score) => handleRatingSelect(q.id, score)}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comment */}
        <Card className="shadow-sm">
          <CardContent className="pt-6">
            <CommentSection titleAr={"الملاحظات"} titleEn={"Comments"} />
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex justify-center">
          <Button
            onClick={handleSubmit}
            aria-label={t("Submit")}
            className="mt-2 px-8 py-6 text-base font-semibold"
            style={{ backgroundColor: theme.primary, color: "white" }}
          >
            {t("Submit")}
          </Button>
        </div>

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
