// src/Pages/WelcomePage.tsx
import React from "react";
import BG from "../assets/BG.png";


interface props {
	accessCode: string;
	handleLogout: () => void;
}

const WelcomePage: React.FC<props> = ({
	accessCode,
	handleLogout,
}) => {
	return (
        <div className='relative w-screen min-h-screen flex flex-col justify-center items-center font-montserrat text-white p-6'>
            
			{/* Background Pattern */}
			<div
				className='absolute bg-Yale-Blue-900 w-full h-full z-0 backdrop-blur-sm'
				style={{
					backgroundImage: `url(${BG})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			></div>
            <div className='flex flex-col justify-center items-center w-9/12 gap-24 p-6 z-20'>
                {/* Text */}
				<h1 className='text-4xl'>
					Welcome,
					<span className='pl-3 text-coral-600'>
						{accessCode}
					</span>
                </h1>
                {/* Logout button */}
				<button
					onClick={handleLogout}
					className='mt-4 w-full bg-coral-600 hover:bg-secondary text-white font-semibold py-4 px-4 rounded-md'
				>
					Log Out
				</button>
			</div>
		</div>
	);
};

export default WelcomePage;