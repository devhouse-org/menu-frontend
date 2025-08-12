import React from "react";
import logo from "../assets/GM-Logo.jpg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../axiosInstance";
import { showErrorToast } from "../utils";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
			console.log("d", data.data);
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

	console.log("id", localStorage.getItem("RestaurantID"));

	// Handle Code Submit
	const handleSubmit = () => {
		if (accessCode) {
			mutation.mutate({ accessCode: accessCode });
		} else showErrorToast("Please Enter Your Access Code");
	};

	return (
		<div className='flex justify-center items-center p-4 min-h-screen bg-background text-foreground font-montserrat'>
			<Card className='w-full max-w-md'>
				<CardHeader className='space-y-4'>
					<div className='flex justify-center'>
						<img src={logo} alt='Logo' className='object-contain h-16 md:h-20' />
					</div>
					<CardTitle className='text-xl text-center text-primary'>
						Enter your Access Code
					</CardTitle>
				</CardHeader>
				<CardContent>
					<form
						className='space-y-4'
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit();
						}}
					>
						<div className='space-y-2'>
							<Input
								id='accessCode'
								type='text'
								value={accessCode}
								onChange={handleAccessCodeChange}
								autoFocus
								autoComplete='one-time-code'
								disabled={mutation.isPending}
								placeholder='Enter your access code'
								className='w-full focus-visible:ring-primary'
							/>
						</div>
						<Button type='submit' size='sm' disabled={mutation.isPending} className='w-full'>
							{mutation.isPending ? 'Submitting...' : 'Submit'}
						</Button>
					</form>
					<ToastContainer />
				</CardContent>
			</Card>
		</div>
	);
};

export default HomePage;
