import Dish1 from "./assets/Food/1.png";
import Dish2 from "./assets/Food/2.png";
import Dish3 from "./assets/Food/3.png";
import Dish4 from "./assets/Food/4.png";

export const menuItems = [
	{
	  category: "Appetizers",
	  foods: [
		{ name: "Mozzarella Sticks", description: "Fried cheese sticks served with marinara sauce.", price: 8.99 , image:Dish1},
		{ name: "Chicken Wings", description: "Crispy chicken wings served with your choice of sauce.", price: 9.99, image:Dish2 },
		{ name: "Spinach Dip", description: "Creamy spinach and artichoke dip served with tortilla chips.", price: 7.99, image:Dish3 },
		{ name: "Bruschetta", description: "Toasted bread topped with fresh tomatoes, basil, and garlic.", price: 6.99, image:Dish4 }
		// Add more appetizers here...
	  ]
	},
	{
	  category: "Salads",
	  foods: [
		{ name: "Caesar Salad", description: "Romaine lettuce, croutons, and Parmesan cheese tossed in Caesar dressing.", price: 10.99 ,image:Dish1},
		{ name: "Greek Salad", description: "Mixed greens, tomatoes, cucumbers, olives, feta cheese, and Greek dressing.", price: 11.99,image:Dish2 },
		{ name: "Cobb Salad", description: "Mixed greens, grilled chicken, avocado, bacon, eggs, and blue cheese dressing.", price: 12.99, image:Dish3 },
		{ name: "Caprese Salad", description: "Fresh mozzarella, tomatoes, basil, olive oil, and balsamic glaze.", price: 9.99 ,image:Dish4}
		// Add more salads here...
	  ]
	},
	{
	  category: "Main Courses",
	  foods: [
		{ name: "Grilled Salmon", description: "Fresh grilled salmon fillet served with seasonal vegetables and rice.", price: 18.99,image:Dish1 },
		{ name: "Filet Mignon", description: "8 oz. USDA Prime beef tenderloin served with mashed potatoes and asparagus.", price: 24.99,image:Dish2 },
		{ name: "Pasta Primavera", description: "Spaghetti tossed with mixed vegetables in a light tomato sauce.", price: 14.99, image:Dish3 },
		{ name: "Chicken Parmesan", description: "Breaded chicken breast topped with marinara sauce and melted mozzarella cheese, served with spaghetti.", price: 16.99,image:Dish4 }
		// Add more main courses here...
	  ]
	},
	{
	  category: "Desserts",
	  foods: [
		{ name: "New York Cheesecake", description: "Creamy cheesecake served with raspberry sauce.", price: 7.99, image:Dish1},
		{ name: "Chocolate Lava Cake", description: "Warm chocolate cake with a gooey chocolate center, served with vanilla ice cream.", price: 8.99,image:Dish2 },
		{ name: "Tiramisu", description: "Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cheese.", price: 9.99, image:Dish3 },
		{ name: "Apple Pie", description: "Homemade apple pie served with a scoop of vanilla ice cream.", price: 6.99,image:Dish4 }
		// Add more desserts here...
	  ]
	}
	// Add more categories with their foods here...
  ];



