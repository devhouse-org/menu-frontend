import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo-H.png";

const Navbar: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
				<nav className='bg-Yale-Blue-900 text-white p-4 px-6 flex items-center justify-between fixed z-50 w-screen'>
					<Link to='/'>
						<img
							src={logo}
							alt='Logo'
							className='h-12'
						/>
					</Link>

					<div className='relative'>
						<button
							onClick={toggleMenu}
							className='focus:outline-none'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-8 w-8'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M4 6h16M4 12h16m-7 6h7'
								/>
							</svg>
						</button>

						{isOpen && (
							<div className='absolute top-12 -right-10 mt-2 w-48 bg-white rounded-md shadow-lg font-montserrat text-Yale-Blue-900'>
								<Link
									to='/menu'
									className='block px-4 py-2 text-gray-800 hover:bg-coral-200 rounded-md'
									onClick={toggleMenu}
								>
									Menu
								</Link>
								<Link
									to='/survey'
									className='block px-4 py-2 text-gray-800 hover:bg-coral-200 rounded-md'
									onClick={toggleMenu}
								>
									Survey
								</Link>
							</div>
						)}
					</div>
				</nav>
	);
};

export default Navbar;
