import React, { useState } from "react";
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

	return (
		<Router>
			<Navbar />
			<Routes>
				<Route
					path='/'
					element={
						<HomePage
							accessCode={accessCode}
							handleAccessCodeChange={
								handleAccessCodeChange
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
		</Router>
	);
};

export default App;
