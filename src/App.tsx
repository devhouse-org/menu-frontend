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

const App: React.FC = () => {
	const [accessCode, setAccessCode] = useState<string>("");
	const [showNav, setShowNav] = useState<boolean>(false);
	const [data,setData] = useState<any>(null)
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
			{showNav && <Navbar />}
			<Routes>
				<Route
					path='/'
					element={
						localStorage.getItem("accessCode") ? (
							<WelcomePage
								handleLogout={handleLogout}
							/>
						) : (
							<HomePage
								setData={setData}
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
					path='/survey'
					element={<SurveyPage />}
				/>
			</Routes>
		</Router>
	);
};

export default App;
