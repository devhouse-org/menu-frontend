import React from "react";
import { getThemeColors } from "../utils";
import { useSurveyStore } from "../store/surveyStore";
import { t } from "i18next";

interface CommentSectionProps {
	titleAr: string;
	titleEn: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({
	titleEn,
	titleAr,
}) => {

	const theme = getThemeColors();

	// Access state and setter functions from the store
	const { comment, name, birthday, phone, setComment, setName, setBirthday, setPhone } = useSurveyStore();

	return (
		<div className='mt-4 w-full space-y-4'>
			<div className='flex justify-between'>
				<h1 className='text-lg font-bold mb-2'>
					{titleEn}
				</h1>
				<h1 className='text-lg font-bold mb-2'>
					{titleAr}
				</h1>
			</div>
			<div>
				<label className="font-semibold">{t("Name")}*</label>
				<input 
					type="text" 
					placeholder={t("your name")} 
					className="block w-full p-2 rounded border" 
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div>
				<label className="font-semibold">{t("Phone Number")}*</label>
				<input 
					type="tel" 
					placeholder={t("your phone number")} 
					className="block w-full p-2 rounded border" 
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>
			</div>
			<div>
				<label className="font-semibold">{t("Birthday")}*</label>
				<input 
					type="date" 
					placeholder={t("your birthday")}
					className="block w-full p-2 rounded border" 
					value={birthday}
					onChange={(e) => setBirthday(e.target.value)}
				/>
			</div>
			<div>
				<label className="font-semibold">{t("Comment")}</label>
				<textarea
					placeholder={t('Enter your comment...')}
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					className='border rounded-md px-3 py-2 w-full h-24 focus:outline-none'
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
