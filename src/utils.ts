import {
	toast,
	Slide,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Error Toast
export const showErrorToast = (message: string) => {
	toast.error(message, {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
		transition: Slide,
	});
};

// Success Toast
export const showSuccessToast = (message: string) => {
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Slide,
    });
};

// Theme
export const getThemeColors = (): {
	primary: string;
	secondary: string;
	background: string;
} => {
	const themeString = localStorage.getItem("theme");
	const theme = themeString
		? JSON.parse(themeString)
		: null;
	return {
		primary: (theme && theme.primary) || "#103B6B",
		secondary: (theme && theme.secondary) || "#FF5815",
		background: theme && theme.bg|| "white",
	};
};
