import BG from "../assets/BG.png";
import React from "react";

interface props {
	handleLogout: () => void;
}

const WelcomePage: React.FC<props> = ({ handleLogout }) => {
	return (
		<div
			className='relative w-screen min-h-screen flex flex-col justify-center items-center font-montserrat p-6'
			style={{
				color: "white",
				backgroundColor: "var(--color-background)",
			}}
		>
			{/* Background Pattern */}
			{/* <div
				className='absolute bg-primary w-full h-full z-0 backdrop-blur-sm'
				style={{
					backgroundImage: `url(${BG})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			></div> */}
			<div className='flex flex-col justify-center items-center w-9/12 gap-24 p-6 z-20'>
				{/* Text */}
				<h1 className='text-4xl'>
					Welcome,
					<span
						className='pl-3'
						style={{ color: "var(--color-secondary)" }}
					>
						{localStorage.getItem("restaurantName")}
					</span>
				</h1>
				{/* Logout button */}
				<button
					onClick={handleLogout}
					className='mt-4 w-full text-white font-semibold py-4 px-4 rounded-md'
					style={{
						color: "white",
						backgroundColor: "var(--color-secondary)",
					}}
				>
					Log Out
				</button>
			</div>
		</div>
	);
};

export default WelcomePage;
