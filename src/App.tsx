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

const App: React.FC = () => {
	const [accessCode, setAccessCode] = useState<string>("");

	const handleAccessCodeChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setAccessCode(event.target.value);
	};

const handleAccessCodeSubmit = (code: string) => {
	setAccessCode(code);
	localStorage.setItem("accessCode", code);
};
	
	useEffect(() => {
		// Retrieve access code from localStorage if it exists
		const savedAccessCode =
			localStorage.getItem("accessCode");
		if (savedAccessCode) {
			setAccessCode(savedAccessCode);
		}
	}, []);


	return (
		<Router>
			<MainContent
				accessCode={accessCode}
				handleAccessCodeChange={handleAccessCodeChange}
				handleAccessCodeSubmit={handleAccessCodeSubmit}
			/>
		</Router>
	);
};

const MainContent: React.FC<{
	accessCode: string;
	handleAccessCodeChange: (
		event: React.ChangeEvent<HTMLInputElement>
	) => void;
	handleAccessCodeSubmit: (code: string) => void;
}> = ({
	accessCode,
	handleAccessCodeChange,
	handleAccessCodeSubmit,
}) => {

	return (
		<>
			{localStorage.getItem("accessCode") && (
				<Navbar/>
			)}

			<Routes>
				<Route
					path='/'
					element={
						<HomePage
							accessCode={accessCode}
							handleAccessCodeChange={
								handleAccessCodeChange
							}
							handleAccessCodeSubmit={
								handleAccessCodeSubmit
							}
						/>
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
		</>
	);
};

export default App;
