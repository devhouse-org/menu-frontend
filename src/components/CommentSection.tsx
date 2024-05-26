import React, { useState } from "react";

interface CommentSectionProps {
	onChange: (comment: string) => void;
	titleAr: string;
    titleEn: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({
    onChange,
    titleEn,
    titleAr
}) => {
	const [comment, setComment] = useState("");

	const handleInputChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const newComment = event.target.value;
		setComment(newComment);
		onChange(newComment);
	};



	return (
		<div className='mt-4 w-full'>
			<div className='flex justify-between'>
				<h1 className='text-lg font-bold mb-2'>
					{titleEn}
				</h1>
				<h1 className='text-lg font-bold mb-2 font-noto-kufi-arabic'>
					{titleAr}
				</h1>
			</div>

			<textarea
				placeholder='Enter your comment...'
				value={comment}
				onChange={handleInputChange}
				className='border border-coral-300 rounded-md px-3 py-2 w-full h-24 focus:outline-none focus:border-Yale-Blue-900'
			/>
		</div>
	);
};

export default CommentSection;
