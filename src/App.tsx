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
import Layout from "./layout/Layout";


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

	// Refresh Protection
	useEffect(() => {
		// Retrieve access code from localStorage if it exists
		const savedAccessCode =
			localStorage.getItem("accessCode");
		if (savedAccessCode) {
			setAccessCode(savedAccessCode);
			setShowNav(true);
		}
	}, []);

	return (
		<Router>
			<Layout>
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
			</Layout>
		</Router>
	);
};

export default App;
