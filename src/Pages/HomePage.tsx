import React from "react";
import BG from "../assets/BG.png";
import logo from "../assets/logo.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../axiosInstance";
import { showErrorToast } from "../utils";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface props {
	accessCode: string;
	setData: any;
	handleAccessCodeChange: (
		event: React.ChangeEvent<HTMLInputElement>
	) => void;
	setShowNav: (showNav: boolean) => void;
}

const HomePage: React.FC<props> = ({
	accessCode,
	handleAccessCodeChange,
	setData,
	setShowNav,
}) => {
	const navigate = useNavigate();
	const mutation = useMutation({
		mutationFn: (data: { accessCode: string }) => {
			return axiosInstance.post("/restaurant/auth", data);
		},
		onSuccess(data: any) {
			console.log("d", data.data);
			setData(data.data);
			localStorage.setItem("RestaurantID", data.data.id);
			localStorage.setItem(
				"accessCode",
				data.data.accessCode
			);
			setShowNav(true);
			navigate("/menu");
		},
		onError() {
			localStorage.removeItem("accessCode");
			showErrorToast("Unauthorized code");
			setShowNav(false);
		},
	});

	console.log("id", localStorage.getItem("RestaurantID"));

	// Handle Code Submit
	const handleSubmit = () => {
		if (accessCode) {
			mutation.mutate({ accessCode: accessCode });
		} else showErrorToast("Please Enter Your Access Code");
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
						disabled={mutation.isPending}
						onClick={handleSubmit}
						className={`mt-4 w-full bg-coral-600 hover:bg-secondary text-white font-semibold py-4 px-4 rounded-md ${
							mutation.isPending
								? "animate-pulse cursor-not-allowed bg-slate-500"
								: ""
						}`}
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
