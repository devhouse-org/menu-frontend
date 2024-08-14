import React from "react";
import { getThemeColors } from "../utils";
import { useSurveyStore } from "../store/surveyStore";

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
	const { comment, name, email, phone, setComment, setName, setEmail, setPhone } = useSurveyStore();

	return (
		<div className='mt-4 w-full space-y-4'>
			<div className='flex justify-between'>
				<h1 className='text-lg font-bold mb-2'>
					{titleEn}
				</h1>
				<h1 className='text-lg font-bold mb-2 font-noto-kufi-arabic'>
					{titleAr}
				</h1>
			</div>
			<div>
				<label>Name</label>
				<input 
					type="text" 
					placeholder="your name" 
					className="block w-full p-2 rounded border" 
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div>
				<label>Phone Number</label>
				<input 
					type="tel" 
					placeholder="your phone number" 
					className="block w-full p-2 rounded border" 
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>
			</div>
			<div>
				<label>Email</label>
				<input 
					type="email" 
					placeholder="your email" 
					className="block w-full p-2 rounded border" 
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div>
				<label>Comment</label>
				<textarea
					placeholder='Enter your comment...'
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
