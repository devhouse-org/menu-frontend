import React from "react";
import { getThemeColors } from "../utils";
import { useSurveyStore } from "../store/surveyStore";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import DatePicker from "./DatePicker"; // Import the DatePicker component

interface CommentSectionProps {
  titleAr: string;
  titleEn: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  titleEn,
  titleAr,
}) => {
  const { i18n } = useTranslation();
  const theme = getThemeColors();

  // Access state and setter functions from the store
  const { comment, name, birthday, phone, setComment, setName, setBirthday, setPhone } = useSurveyStore();

  const handleDateChange = (year: string, month: string, day: string) => {
    // Format the date as yyyy-mm-dd
    const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    setBirthday(formattedDate);
  };

  return (
    <div className='mt-4 w-full space-y-4'>
      <div className='flex justify-between'>
        <h1 className='text-lg font-bold mb-2'>
          {i18n.language === 'en' ? titleEn : titleAr}
        </h1>
      </div>
      <div>
        <label className="font-semibold">{t("Name")}*</label>
        <input
          type="text"
          placeholder={t("your name")}
          className="block w-full mt-2 p-2 rounded border"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="font-semibold">{t("Phone Number")}*</label>
        <input
          type="tel"
          placeholder={t("your phone number")}
          className="block w-full mt-2  p-2 rounded border"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label className="font-semibold">{t("Birthday")}*</label>
        <DatePicker
          startYear={1900}
          endYear={new Date().getFullYear()}
          onDateChange={handleDateChange}
        />
      </div>
      <div>
        <label className="font-semibold">{t("Comment")}</label>
        <textarea
          placeholder={t('Enter your comment...')}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className='border mt-2 rounded-md px-3 py-2 w-full h-24 focus:outline-none'
          style={{
            borderColor: theme.secondary,
            backgroundColor: "white",
            color: "var(--color-gray-800)",
          }}
          onFocus={(e) =>
            (e.target.style.borderColor = theme.primary)
          }
          onBlur={(e) =>
            (e.target.style.borderColor = theme.secondary)
          }
        />
      </div>
    </div>
  );
};

export default CommentSection;
