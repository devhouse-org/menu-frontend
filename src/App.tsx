import RatingSelector from "./assets/components/RatingSelector";
import Select from "./assets/components/Select";
import logo from "./assets/logo.jpg";
import React from "react";

const App: React.FC = () => {
	const options = [
		{ value: "rest1", label: "Rest1" },
		{ value: "rest2", label: "Rest2" },
		{ value: "rest3", label: "Rest3" },
		{ value: "rest4", label: "Rest4" },
	];

	const handleSelect = (selectedOption: any) => {
		console.log("Selected option:", selectedOption);
	};

	 const handleRatingSelect = (rating: string) => {
			console.log("Selected rating:", rating);
		};

	return (
		<>
			<div className='w-screen flex flex-col items-center p-4'>
				<div className='w-full flex justify-center'>
					<img
						src={logo}
						alt='Logo'
						className='w-28'
					/>
				</div>

				<h1 className='pt-3'>
					We hope your meal was as delightful as you hoped!
				</h1>
				<h1 className='text-red-400'>
					نأمل أن تكون وجبتك كانت ممتعة كما تمنيت
				</h1>

				<div>
					<div className='flex justify-between'>
						<h1>Choose the outlet</h1>
						<h1> اختصر المطعم</h1>
					</div>
					<Select
						options={options}
						onSelect={handleSelect}
					/>
				</div>

				<div>
					<div className='w-screen flex justify-between'>
						<h1>Food Quality</h1>
						<h1>جودة الطعام</h1>
					</div>

					<div>
						<RatingSelector onSelect={handleRatingSelect} />
					</div>

					<div className='w-screen flex justify-between'>
						<h1>Service Quality</h1>
						<h1>جودة الخدمة</h1>
					</div>

					<div>
						<RatingSelector onSelect={handleRatingSelect} />
					</div>

					<div className='w-screen flex justify-between'>
						<h1>Food Price</h1>
						<h1>سعر الوجبات</h1>
					</div>

					<div>
						<RatingSelector onSelect={handleRatingSelect} />
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
