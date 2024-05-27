import React, { useState } from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
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
			<MainContent
				accessCode={accessCode}
				handleAccessCodeChange={handleAccessCodeChange}
			/>
		</Router>
	);
};

const MainContent: React.FC<{
	accessCode: string;
	handleAccessCodeChange: (
		event: React.ChangeEvent<HTMLInputElement>
	) => void;
}> = ({ accessCode, handleAccessCodeChange }) => {
	const location = useLocation();

	return (
		<>
			{location.pathname !== "/" && 
				<Navbar accessCode={accessCode} />
			}

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
		</>
	);
};

export default App;
