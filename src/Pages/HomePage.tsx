import React from "react";
import { useNavigate } from "react-router-dom";
import BG from "../assets/BG.png";
import logo from "../assets/logo.png";
import {
	ToastContainer,
	toast,
	Slide,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface props {
	accessCode: string;
	handleAccessCodeChange: (
		event: React.ChangeEvent<HTMLInputElement>
	) => void;
	handleAccessCodeSubmit: (code: string) => void;
}

const HomePage: React.FC<props> = ({
	accessCode,
	handleAccessCodeChange,
	handleAccessCodeSubmit,
}) => {
	const navigate = useNavigate();

	// Handle Code Submit
	const handleSubmit = () => {
		if (accessCode) {
			handleAccessCodeSubmit(accessCode);
			navigate("/menu");
		} else
			toast.error("Please Enter Your Access Code", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
				transition: Slide,
			});
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
				{/* Logo */}
				<div className='h-1/2 flex justify-center items-center '>
					<img
						src={logo}
						alt='Logo'
						className='lg:h-full object-contain'
					/>
				</div>

				{/* Input */}
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
					<ToastContainer />
				</div>
			</div>
		</div>
	);
};

export default HomePage;
