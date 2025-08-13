import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bg from "../assets/BG.png";
import logo from "../assets/GM-Logo.jpg";
import axiosInstance from "../axiosInstance";
import { showErrorToast } from "../utils";

interface props {
	accessCode: string;
	handleAccessCodeChange: (
		event: React.ChangeEvent<HTMLInputElement>
	) => void;
	setShowNav: (showNav: boolean) => void;
}

const HomePage: React.FC<props> = ({
	accessCode,
	handleAccessCodeChange,
	setShowNav,
}) => {
	const navigate = useNavigate();

	const mutation = useMutation({
		mutationFn: (data: { accessCode: string }) => {
			return axiosInstance.post("/restaurant/auth", data);
		},
		onSuccess(data: any) {
			localStorage.setItem("RestaurantID", data.data.id);
			localStorage.setItem(
				"accessCode",
				data.data.accessCode
			);
			localStorage.setItem(
				"theme",
				JSON.stringify(data.data.theme)
			);

			localStorage.setItem(
				"restaurantName",
				data.data.name
			);

			localStorage.setItem("logo", data.data.image);

			setShowNav(true);
			navigate("/menu");
		},
		onError() {
			localStorage.removeItem("accessCode");
			showErrorToast("Unauthorized code");
			setShowNav(false);
		},
	});


	// Handle Code Submit
	const handleSubmit = () => {
		if (accessCode) {
			mutation.mutate({ accessCode: accessCode });
		} else showErrorToast("Please Enter Your Access Code");
	};

	return (
		<div className='relative min-h-screen font-montserrat'>
			{/* Background image + overlay */}
			<div className='absolute inset-0 -z-10'>
				<img src={bg} alt='' className='object-cover w-full h-full' />
			</div>

			{/* Centered access panel */}
			<div className='flex relative z-10 justify-center items-center p-4 min-h-screen'>
				<div className='w-full max-w-sm'>
					{/* Logo and heading */}
					<div className='flex flex-col items-center mb-5 text-center'>
						<img
							src={localStorage.getItem("logo") || logo}
							alt='Logo'
							className='object-cover w-14 h-14 bg-white rounded-full ring-2 shadow-md ring-primary/70'
						/>
						<h1 className='mt-4 text-2xl font-semibold tracking-wide'>
							{localStorage.getItem("restaurantName") || "Welcome"}
						</h1>
						<p className='mt-1 text-sm'>Enter your access code to continue</p>
					</div>

					{/* Frosted glass form */}
					<div className='p-5 rounded-2xl border shadow-2xl backdrop-blur-xl border-white/10 bg-white/10'>
						<form
							className='space-y-3'
							onSubmit={(e) => {
								e.preventDefault();
								handleSubmit();
							}}
						>
							<Input
								id='accessCode'
								type='text'
								value={accessCode}
								onChange={handleAccessCodeChange}
								autoFocus
								autoComplete='one-time-code'
								disabled={mutation.isPending}
								placeholder='Enter your access code'
								className='w-full h-10 rounded-md bg-white/90 text-foreground placeholder:text-muted-foreground focus-visible:ring-primary'
							/>
							<Button type='submit' size='sm' disabled={mutation.isPending} className='w-full'>
								{mutation.isPending ? "Submitting..." : "Continue"}
							</Button>
						</form>
						<ToastContainer />
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
