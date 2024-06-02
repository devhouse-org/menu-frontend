import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Logo-H.png";
import LanguageSelector from "./LanguageSelector";
import { Menu } from "lucide-react";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	const { t, i18n } = useTranslation();

	const toggleMenu = () => {
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};

	// Handle Mouse Click outside
	const closeMenu = (event: MouseEvent) => {
		if (
			menuRef.current &&
			!menuRef.current.contains(event.target as Node)
		) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", closeMenu);
		return () => {
			document.removeEventListener("mousedown", closeMenu);
		};
	}, []);

	return (
		<nav className='bg-background text-white p-4 px-6 flex items-center justify-between fixed z-50 w-screen'>
			<Link to='/'>
				<img
					src={logo}
					alt='Logo'
					className='h-12'
				/>
			</Link>
			<div className='flex items-center gap-5'>
				<LanguageSelector />
				<div className='relative'>
					<button
						onClick={toggleMenu}
						className='focus:outline-none'
					>
						{isOpen ? (
							<IoClose className='h-8 w-8' />
						) : (
							<Menu className='h-8 w-8' />
						)}
					</button>

					{isOpen && (
						<div
							ref={menuRef}
							className={`absolute top-12 ${
								i18n.language === "ar"
									? "-right-28"
									: "-left-20"
							} mt-1 w-max bg-white rounded-md shadow-lg font-montserrat text-primary`}
						>
							<Link
								to='/'
								className='block px-4 py-2 text-gray-800 hover:bg-secondary/30 rounded-md'
								onClick={toggleMenu}
							>
								{t("Home")}
							</Link>

							<Link
								to='/menu'
								className='block px-4 py-2 text-gray-800 hover:bg-secondary/30 rounded-md'
								onClick={toggleMenu}
							>
								{t("Menu")}
							</Link>
							<Link
								to='/survey'
								className='block px-4 py-2 text-gray-800 hover:bg-secondary/30 rounded-md'
								onClick={toggleMenu}
							>
								{t("Survey")}
							</Link>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
