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
		// Import the domain mapping function
		const getAccessCodeFromDomain = async () => {
			const { getAccessCodeFromDomain: getDomainCode } = await import(
				"./utils/restaurantMapping"
			);
			return getDomainCode();
		};

		// Check if user is already authenticated
		const savedAccessCode = localStorage.getItem("accessCode");

		if (savedAccessCode) {
			// User already authenticated
			setAccessCode(savedAccessCode);
			setShowNav(true);
		} else {
			// Try to detect domain and auto-authenticate
			getAccessCodeFromDomain().then((domainCode) => {
				if (domainCode) {
					// Found matching domain, set access code for auto-submit
					setAccessCode(domainCode);
				}
			});
		}
	}, []);

	return (
		<Router>
			{showNav && <Navbar />}
			<Routes>
				<Route
					path='/'
					element={
						localStorage.getItem("accessCode") ? (
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
