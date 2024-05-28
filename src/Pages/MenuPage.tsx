import React, { useState } from "react";
import BG from "../assets/BG.png";
import { menuItems } from "../data";
import Modal from "../components/Menu/Modal";

const MenuPage: React.FC = () => {
	// State to track which modal is open
	const [openModalId, setOpenModalId] = useState<
		number | null
	>(null);

	// Handle opening a modal
	const handleOpenModal = (itemId: number) => {
		setOpenModalId(itemId);
	};

	//Handle closing a modal
	const handleCloseModal = () => {
		setOpenModalId(null);
	};

	return (
		<div className='relative w-screen min-h-screen flex flex-col justify-center items-center font-montserrat text-Yale-Blue-900 p-6'>
			{/* Background Pattern */}
			<div
				className='absolute bg-Yale-Blue-900 w-full h-full z-0 backdrop-blur-sm'
				style={{
					backgroundImage: `url(${BG})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			></div>

			<h1 className='pt-24 text-white z-10 text-6xl font-medium'>
				Menu
			</h1>

			{/* Items Card */}
			<div className='grid md:grid-cols-3 grid-cols-2 gap-4 z-10 py-16'>
				{menuItems.map((item) => (
					<button
						key={item.id}
						className='border rounded-3xl p-4 bg-white/90 backdrop-blur-lg flex flex-col gap-4'
						onClick={() => handleOpenModal(item.id)}
					>
						<div className='w-full flex justify-center items-center'>
							<img
								src={item.image}
								alt={item.name}
								className='w-full object-contain'
							/>
						</div>

						<div className='flex flex-col justify-center gap-2'>
							<h2 className='w-full text-start font-bold text-2xl'>
								{item.name}
							</h2>
							<p className='text-coral-600 text-xl font-bold flex items-end w-full'>
								<span className='text-Yale-Blue-900 pr-1'>
									Price:
								</span>
								{item.price}
							</p>
						</div>
					</button>
				))}
			</div>

			{/* Modals */}
			{menuItems.map((item) => (
				<Modal
					key={item.id}
					open={openModalId === item.id}
					onClose={handleCloseModal}
				>
					{/* Modal content for each item */}
					<div>
						<img
							src={item.image}
							alt={item.name}
						/>
						<h2 className='w-full md:text-start text-center font-bold h-1/4 text-2xl'>
							{item.name}
						</h2>
						<p>{item.description}</p>
					</div>
				</Modal>
			))}
		</div>
	);
};

export default MenuPage;
