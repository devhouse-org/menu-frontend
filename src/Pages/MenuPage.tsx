import React, { useState } from "react";
import BG from "../assets/BG.png";
import { menuItems } from "../data";
import Modal from "../components/Menu/Modal";

const MenuPage: React.FC = () => {
	// State to track which modal is open
	const [openModalId, setOpenModalId] = useState<
		string | null
	>(null);
	const [cat, setCat] = useState(0)

	// Handle opening a modal
	const handleOpenModal = (itemId: string) => {
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

			<h1 className='pt-24 text-white z-10 text-4xl font-medium'>
				{menuItems[cat].category}
			</h1>
			<div className="flex gap-3">
				{/* side bar */}
				<div className="w-3/12  z-10 bg-white rounded-lg">
					<h2 className="p-3  font-bold ">Food Categories</h2>
					<ul className="mt-5">
						{
							menuItems.map((item, index) => {
								return <li className={`p-2  cursor-pointer ${index === cat ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`} onClick={() => setCat(index)} key={item.category}>{item.category}</li>
							})
						}
					</ul>
				</div>
				{/* Items Card */}
				<div className='w-9/12 grid md:grid-cols-3 grid-cols-2 gap-4 z-10 py-16'>
					{menuItems[cat].foods.map((item) => (
						<button
							key={item.name}
							className='border rounded-3xl p-4 bg-white/90 backdrop-blur-lg flex flex-col gap-4'
						onClick={() => handleOpenModal(item.name)}
						>
							<div className='w-full flex justify-center items-center'>
								<img
									src={item.image}
									alt={item.name}
									className='w-full object-contain'
								/>
							</div>

							<div className='flex flex-col justify-center gap-2'>
								<h2 className='w-full text-start font-bold text-lg'>
									{item.name}
								</h2>
								<p className='text-coral-600 text-md font-bold flex items-end w-full'>
									<span className='text-Yale-Blue-900 pr-1'>
										Price:
									</span>
									{item.price}
								</p>
							</div>
						</button>
					))}
				</div>

			</div>


			{/* Modals */}


			{menuItems[cat].foods.map((item) => (
				<Modal
					key={item.name}
					open={openModalId === item.name}
					onClose={handleCloseModal}
				>
					{/* Modal content for each item */}
					<div className="flex flex-col gap-2" >
						<img
							src={item.image}
							alt={item.name}
						/>
						<h2 className='w-full text-center font-bold h-1/4 text-2xl'>
							{item.name}
						</h2>
						<p>{item.description}</p>
						<p className='text-coral-600 text-xl font-bold flex items-end w-full'>
							<span className='text-Yale-Blue-900 pr-1'>
								Price:
							</span>
							{item.price}
						</p>
					</div>
				</Modal>
			))}
		</div>
	);
};

export default MenuPage;
