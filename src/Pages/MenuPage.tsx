import React from "react";
import BG from "../assets/BG.png";
import Dish1 from "../assets/Food/1.png";
import Dish2 from "../assets/Food/2.png";
import Dish3 from "../assets/Food/3.png";
import Dish4 from "../assets/Food/4.png";

// Menu Items
const menuItems = [
	{
		id: 1,
		name: "Item 1",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin convallis metus at luctus suscipit. Aenean facilisis dolor sit amet posuere rutrum. Praesent eu euismod turpis, ut commodo sem. Aliquam fringilla euismod varius. Proin rhoncus, lacus eget blandit mattis, odio ipsum ultrices arcu, et laoreet massa odio sit amet metus. ",
		price: "$10",
		image: Dish1,
	},
	{
		id: 2,
		name: "Item 2",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin convallis metus at luctus suscipit. Aenean facilisis dolor sit amet posuere rutrum. Praesent eu euismod turpis, ut commodo sem. Aliquam fringilla euismod varius. Proin rhoncus, lacus eget blandit mattis, odio ipsum ultrices arcu, et laoreet massa odio sit amet metus. ",
		price: "$15",
		image: Dish2,
	},
	{
		id: 3,
		name: "Item 3",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin convallis metus at luctus suscipit. Aenean facilisis dolor sit amet posuere rutrum. Praesent eu euismod turpis, ut commodo sem. Aliquam fringilla euismod varius. Proin rhoncus, lacus eget blandit mattis, odio ipsum ultrices arcu, et laoreet massa odio sit amet metus. ",
		price: "$15",
		image: Dish3,
	},
	{
		id: 4,
		name: "Item 3",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin convallis metus at luctus suscipit. Aenean facilisis dolor sit amet posuere rutrum. Praesent eu euismod turpis, ut commodo sem. Aliquam fringilla euismod varius. Proin rhoncus, lacus eget blandit mattis, odio ipsum ultrices arcu, et laoreet massa odio sit amet metus. ",
		price: "$15",
		image: Dish4,
	},
	{
		id: 1,
		name: "Item 1",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin convallis metus at luctus suscipit. Aenean facilisis dolor sit amet posuere rutrum. Praesent eu euismod turpis, ut commodo sem. Aliquam fringilla euismod varius. Proin rhoncus, lacus eget blandit mattis, odio ipsum ultrices arcu, et laoreet massa odio sit amet metus. ",
		price: "$10",
		image: Dish1,
	},
	{
		id: 2,
		name: "Item 2",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin convallis metus at luctus suscipit. Aenean facilisis dolor sit amet posuere rutrum. Praesent eu euismod turpis, ut commodo sem. Aliquam fringilla euismod varius. Proin rhoncus, lacus eget blandit mattis, odio ipsum ultrices arcu, et laoreet massa odio sit amet metus. ",
		price: "$15",
		image: Dish2,
	},
	{
		id: 3,
		name: "Item 3",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin convallis metus at luctus suscipit. Aenean facilisis dolor sit amet posuere rutrum. Praesent eu euismod turpis, ut commodo sem. Aliquam fringilla euismod varius. Proin rhoncus, lacus eget blandit mattis, odio ipsum ultrices arcu, et laoreet massa odio sit amet metus. ",
		price: "$15",
		image: Dish3,
	},
	{
		id: 4,
		name: "Item 3",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin convallis metus at luctus suscipit. Aenean facilisis dolor sit amet posuere rutrum. Praesent eu euismod turpis, ut commodo sem. Aliquam fringilla euismod varius. Proin rhoncus, lacus eget blandit mattis, odio ipsum ultrices arcu, et laoreet massa odio sit amet metus. ",
		price: "$15",
		image: Dish4,
	},
];

const MenuPage: React.FC = () => {
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
			<div className='flex flex-col gap-4 w-full z-10 py-16'>
				{menuItems.map((item) => (
					<div
						key={item.id}
						className='border rounded-3xl p-4 bg-white flex gap-4 md:flex-row flex-col'
					>
						<div className='md:w-1/4 w-full flex justify-center items-center '>
							<img
								src={item.image}
								alt={item.name}
								className='w-full h-44 object-contain'
							/>
						</div>

						<div className='md:w-3/4 flex flex-col justify-center items-start'>
							<h2 className='w-full md:text-start text-center font-bold h-1/4 text-2xl pb-5'>
								{item.name}
							</h2>
							<p className='h-2/4 text-clip overflow-hidden'>
								{item.description}
							</p>
							<p className='text-coral-600 text-xl font-bold h-1/4 flex items-end w-full pt-5'>
								<span className='text-Yale-Blue-900 pr-1'>
									Price:
								</span>
								{item.price}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MenuPage;
