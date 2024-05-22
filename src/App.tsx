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
	interface Option {
		value: string;
		label: string;
	}

	const handleSelect = (selectedOption: Option) => {
		console.log("Selected option:", selectedOption);
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
					<div className="flex justify-between">
						<h1>Choose the outlet</h1>
						<h1> اختصر المطعم</h1>
					</div>
					<Select
						options={options}
						onSelect={handleSelect}
					/>
				</div>
			</div>
		</>
	);
};

export default App;
