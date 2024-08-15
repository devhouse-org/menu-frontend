import { useEffect, useState } from "react";
import Modal from "../components/Menu/Modal";
import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getThemeColors } from "../utils";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import { NumericFormat } from 'react-number-format';

const MenuPage = () => {
	// State to track which modal is open
	const [openModalId, setOpenModalId] = useState<string | null>(null);
	const [showSideBar, setShowSideBar] = useState(true);
	const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
	const { t } = useTranslation();
	const theme = getThemeColors();

	const { data, isError, isPending } = useQuery({
		queryKey: ["menu"],
		queryFn: async () => {
			const response = await axiosInstance.get(
				`/restaurant/access/${localStorage.getItem("accessCode")}`
			);
			return response.data;
		},
	});

	// Handle opening a modal
	const handleOpenModal = (itemId: string) => {
		setOpenModalId(itemId);
	};

	// Handle closing a modal
	const handleCloseModal = () => {
		setOpenModalId(null);
	};

	// Add the effect to set sidebar state to false on mobile
	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth <= 768) {
				setShowSideBar(false);
			}
		};

		// Initial check
		handleResize();

		// Add event listener for resize
		window.addEventListener("resize", handleResize);

		// Cleanup event listener on component unmount
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error</div>;
	}

	const selectedCategory = data.categories.find(
		(category: any) => category.id === selectedCategoryId
	) || data.categories[0];

	return (
		<div
			className='relative min-h-screen min-w-screen flex font-montserrat'
			style={{
				color: theme.primary,
				backgroundColor: "white",
			}}
		>
			<div className='pt-24'>
				<div className='flex p-4 gap-2 relative'>
					{/* sidebar */}
					<div
						className={`${showSideBar ? "md:w-3/12" : "w-0"} transition-all max-h-[600px] font-semibold sticky top-28 mt-10 h-fit overflow-y-auto`}
						style={{
							color: theme.primary,
							backgroundColor: "white",
						}}
					>
						<h2 className='font-bold w-full py-5 flex justify-center items-center'>
							{t("Food Categories")}
						</h2>
						<hr
							className='w-fill h-1 border-0 rounded'
							style={{
								backgroundColor: theme.secondary,
							}}
						></hr>

						<ul className='mt-5 text-sm md:text-lg'>
							{data.categories.map((category: any) => {
								return (
									<li
										className={`p-2 pl-3 cursor-pointer transition-all ${
											category.id === selectedCategoryId
												? "rounded-xl"
												: ""
										}`}
										style={{
											backgroundColor:
												category.id === selectedCategoryId
													? theme.secondary
													: "transparent",
											color:
												category.id === selectedCategoryId
													? "white"
													: theme.primary,
										}}
										onClick={() =>
											setSelectedCategoryId(category.id)
										}
										key={category.id}
									>
										{t(category.name)}
									</li>
								);
							})}
						</ul>
					</div>

					<div
						className={`${showSideBar ? "md:w-9/12" : "w-full"}`}
					>
						<div className=''>
							<div className='flex items-center'>
								{showSideBar ? (
									<ArrowBigLeft
										size={35}
										onClick={() => {
											setShowSideBar(false);
										}}
										className='cursor-pointer hover:bg-gray-100 '
									/>
								) : (
									<ArrowBigRight
										size={35}
										onClick={() => {
											setShowSideBar(true);
										}}
										className='cursor-pointer hover:bg-gray-100 '
									/>
								)}
								<h1
									className='z-10 text-5xl font-bold text-center w-full'
									style={{ color: theme.primary }}
								>
									{t(selectedCategory.name)}
								</h1>

								{/* Items Card */}
							</div>
							<div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 z-10 py-16'>
								{selectedCategory.items.map(
									(item: any) => (
										<div
											key={item.id}
											className='border w-full rounded-lg p-3 shadow-md hover:shadow-lg flex flex-col gap-4'
											style={{
												backgroundColor: "white",
											}}
											onClick={() =>
												handleOpenModal(item.id)
											}
										>
											<div className='w-full flex justify-center items-center'>
												<img
													src={
														item.image
															? item.image
															: "https://luigispizzakenosha.com/wp-content/uploads/placeholder.png"
													}
													alt={item.name}
													className='lg:h-48 lg:w-full h-28 w-80 object-cover rounded-xl'
												/>
											</div>

											<div className='flex flex-col justify-center gap-2 w-full'>
												<h2 className='w-full text-start font-bold text-sm md:text-lg truncate'>
													{item.name}
												</h2>
												<p
													className='text-sm md:text-md font-bold flex items-end w-full'
													style={{
														color: theme.secondary,
													}}
												>
													<span
														className='pr-1'
														style={{
															color: theme.primary,
														}}
													>
														Price:
													</span>
													<span className='mx-1'>
														IQD
													</span>
													<NumericFormat
														value={item.price}
														thousandSeparator=','
													/>
												</p>
											</div>
										</div>
									)
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Modals */}
			{selectedCategory.items.map((item: any) => (
				<Modal
					key={item.id}
					open={openModalId === item.id}
					onClose={handleCloseModal}
				>
					{/* Modal content for each item */}
					<div>
						<img
							src={
								item.image
									? item.image
									: "https://luigispizzakenosha.com/wp-content/uploads/placeholder.png"
							}
							alt={item.name}
							className='w-full object-contain rounded-2xl'
						/>
						<h2 className='w-full text-center font-bold h-1/4 text-2xl py-3'>
							{item.name}
						</h2>
						<p>{item.description}</p>
						<p
							className='text-sm md:text-md font-bold flex items-end w-full'
							style={{
								color: theme.secondary,
							}}
						>
							<span
								className='pr-1'
								style={{
									color: theme.primary,
								}}
							>
								Price:
							</span>
							<span className='mx-1'>IQD</span>
							<NumericFormat
								value={item.price}
								thousandSeparator=','
							/>
						</p>
					</div>
				</Modal>
			))}
		</div>
	);
};

export default MenuPage;
