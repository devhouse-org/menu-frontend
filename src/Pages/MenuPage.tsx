import { useState } from "react";
// import BG from "../assets/BG.png";
import Modal from "../components/Menu/Modal";
import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { getThemeColors } from "../utils";

const MenuPage = () => {
	// State to track which modal is open
	const [openModalId, setOpenModalId] = useState<
		string | null
	>(null);
	const [cat, setCat] = useState(0);
	const { t } = useTranslation();
	const theme = getThemeColors();

	const { data, isError, isPending } = useQuery({
		queryKey: ["menu"],
		queryFn: async () => {
			const response = await axiosInstance.get(
				`/restaurant/access/${localStorage.getItem(
					"accessCode"
				)}`
			);
			return response.data;
		},
	});

	// console.log(
	// 	"theme",
	// 	JSON.parse(localStorage.getItem("theme"))
	// );

	// Handle opening a modal
	const handleOpenModal = (itemId: string) => {
		setOpenModalId(itemId);
	};

	// Handle closing a modal
	const handleCloseModal = () => {
		setOpenModalId(null);
	};

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error</div>;
	}

	return (
		<div
			className='relative min-h-screen flex font-montserrat'
			style={{
				color: theme.primary,
				backgroundColor: theme.background,
			}}
		>
			<div className='pt-24 flex flex-col items-center'>
				<div className='flex p-4 gap-2 relative'>
					{/* sidebar */}
					<div
						className='w-3/12 font-semibold sticky top-28 mt-10 h-fit overflow-y-auto'
						style={{
							color: "white",
							backgroundColor: theme.background,
						}}
					>
						<h2 className='font-bold w-full py-5 flex justify-center items-center'>
							{t("Food Categories")}
						</h2>
						<hr
							className='w-fill h-1 border-0 rounded '
							style={{
								backgroundColor: theme.secondary,
							}}
						></hr>

						<ul className='mt-5 text-sm md:text-lg'>
							{data.categories.map(
								(item: any, index: number) => {
									return (
										<li
											className={`p-2 pl-3 cursor-pointer transition-all ${
												index === cat ? "rounded-xl" : ""
											}`}
											style={{
												backgroundColor:
													index === cat
														? theme.secondary
														: "transparent",
												color: "white",
											}}
											onClick={() => setCat(index)}
											key={item.name}
										>
											{t(item.name)}
										</li>
									);
								}
							)}
						</ul>
					</div>

					<div className={`w-9/12 flex flex-col h-full`}>
						<h1
							className='z-10 text-4xl font-medium text text-center'
							style={{ color: "white" }}
						>
							{t(data?.categories[cat]?.name)}
						</h1>

						{/* Items Card */}
						<div className='grid md:grid-cols-3 grid-cols-2 gap-4 z-10 py-16'>
							{data?.categories[cat]?.items.map(
								(item: any) => (
									<div
										key={item.name}
										className='border w-full rounded-lg p-3 hover:shadow-lg flex flex-col gap-4'
										style={{
											backgroundColor: "white",
										}}
										onClick={() =>
											handleOpenModal(item.name)
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
												className='w-full xl:h-80 h-32 object-cover rounded-xl'
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
												$ {item.price}
											</p>
										</div>
									</div>
								)
							)}
						</div>
					</div>
				</div>
			</div>

			{/* Modals */}
			{data?.categories[cat]?.items.map((item: any) => (
				<Modal
					key={item.name}
					open={openModalId === item.name}
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
							$ {item.price}
						</p>
					</div>
				</Modal>
			))}
		</div>
	);
};

export default MenuPage;
