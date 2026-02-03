import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
} from "react-router-dom";
import HomePage from "./Pages/HomePage";
import MenuPage from "./Pages/MenuPage";
import SurveyPage from "./Pages/SurveyPage";
import Navbar from "./components/Navbar";
import WelcomePage from "./Pages/WelcomePage";
import ThankYouPage from "./Pages/thanks";


const App: React.FC = () => {
	const [accessCode, setAccessCode] = useState<string>("");
	const [showNav, setShowNav] = useState<boolean>(false);
	const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

	// Access Code Change
	const handleAccessCodeChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setAccessCode(event.target.value);
	};

	// Logout
	const handleLogout = () => {
		setAccessCode("");
		localStorage.removeItem("accessCode");
		localStorage.removeItem("RestaurantID");
		localStorage.removeItem("restaurantName");
		localStorage.removeItem("theme");
		localStorage.removeItem("logo");

		setShowNav(false);
	};

	// Refresh Protection + Auto Domain Detection
	useEffect(() => {
		const authenticateWithCode = async (code: string) => {
			try {
				setIsAuthenticating(true);
				const axiosInstance = (await import("./axiosInstance")).default;
				const response = await axiosInstance.post("/restaurant/auth", {
					accessCode: code,
				});

				// Store restaurant data
				localStorage.setItem("RestaurantID", response.data.id);
				localStorage.setItem("accessCode", response.data.accessCode);
				localStorage.setItem("theme", JSON.stringify(response.data.theme));
				localStorage.setItem("restaurantName", response.data.name);
				localStorage.setItem("logo", response.data.image);

				setAccessCode(code);
				setShowNav(true);
				setIsAuthenticating(false);

				// Redirect to menu
				window.location.href = "/menu";
			} catch (error) {
				console.error("Authentication failed:", error);
				setIsAuthenticating(false);
				localStorage.removeItem("accessCode");
			}
		};

		const initAuth = async () => {
			// Check if user is already authenticated
			const savedAccessCode = localStorage.getItem("accessCode");

			if (savedAccessCode) {
				// User already authenticated
				setAccessCode(savedAccessCode);
				setShowNav(true);
			} else {
				// Try to detect domain and auto-authenticate
				const { getAccessCodeFromDomain } = await import(
					"./utils/restaurantMapping"
				);
				const domainCode = getAccessCodeFromDomain();

				if (domainCode) {
					// Found matching domain, authenticate directly
					await authenticateWithCode(domainCode);
				}
			}
		};

		initAuth();
	}, []);

	return (
		<Router>
			{showNav && <Navbar />}
			<Routes>
				<Route
					path='/'
					element={
						isAuthenticating ? (
							// Show loading screen during authentication
							<div className='w-screen h-screen flex items-center justify-center bg-white'>
								<div className='text-center'>
									<div className='animate-spin rounded-full h-16 w-16 border-b-2 border-[#c01638] mx-auto mb-4'></div>
									<p className='text-[#c01638] text-xl'>Loading...</p>
								</div>
							</div>
						) : localStorage.getItem("accessCode") ? (
							<WelcomePage handleLogout={handleLogout} />
						) : (
							<HomePage
								accessCode={accessCode}
								handleAccessCodeChange={
									handleAccessCodeChange
								}
								setShowNav={setShowNav}
							/>
						)
					}
				/>

				<Route
					path='/menu'
					element={<MenuPage />}
				/>
				<Route
					path='/thankyou'
					element={<ThankYouPage />}
				/>
				<Route
					path='/survey'
					element={<SurveyPage />}
				/>
			</Routes>
		</Router>
	);
};

export default App;
