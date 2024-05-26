import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BG from "../assets/BG.png";
import logo from "../assets/logo.png";

const HomePage: React.FC = () => {
	const [accessCode, setAccessCode] = useState<string>("");
	const navigate = useNavigate();

	const handleAccessCodeChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setAccessCode(event.target.value);
	};

	const handleSubmit = () => {
		if (accessCode) {
			navigate("/menu");
		}
	};

	return (
		<div className='relative w-screen min-h-screen flex justify-center items-center font-montserrat text-Yale-Blue-900'>
			{/* Background Pattern */}
			<div
				className='absolute bg-Yale-Blue-900 w-full h-full z-0 backdrop-blur-sm'
				style={{
					backgroundImage: `url(${BG})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			></div>
			<div className='flex flex-col justify-center items-center w-9/12 gap-24 z-10 h-screen p-6 md:p-24'>
				<div className='h-1/2 flex justify-center items-center '>
					<img
						src={logo}
						alt='Logo'
						className='lg:h-full object-cover'
					/>
				</div>

				<div className='h-1/2 w-full flex flex-col gap-5'>
					<div className='w-full flex justify-center'>
						<h1 className='text-white text-2xl'>
							Enter Access Code
						</h1>
					</div>

					<input
						type='text'
						value={accessCode}
						onChange={handleAccessCodeChange}
						className='border p-4 rounded w-full'
						placeholder='Enter your access code'
					/>
					<button
						onClick={handleSubmit}
						className='mt-4 w-full bg-coral-600 hover:bg-secondary text-white font-semibold py-4 px-4 rounded-md'
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
