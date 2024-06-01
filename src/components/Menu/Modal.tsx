import React from "react";

interface Props {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
}

const Modal: React.FC<Props> = ({
	open,
	onClose,
	children,
}) => {
	return (
		<div
			className={`z-50 fixed shadow-lg inset-0 flex justify-center items-center transition-colors ${
				open ? "visible bg-Yale-Blue-900/80" : "invisible"
			}`}
			onClick={onClose}
		>
			<div
				className={`bg-white bg-opacity-80 rounded-lg shadow-lg p-6 transition-all max-w-md  ${
					open
						? "scale-100 opacity-100"
						: "scale-110 opacity-0"
				}`}
				//e.stopPropagation() stops an event from spreading to other elements.
				// So, if something happens on an element, like a click, e.stopPropagation() makes sure it doesn't affect other elements nearby.
				// In this code, it's used to prevent a click from affecting other elements when you click on something specific.
				onClick={(e) => {
					e.stopPropagation();
					onClose();
				}}
			>
				<button
					className='absolute top-2 right-2 py-1 px-2  rounded-md text-Coral-700 hover:bg-gray-50 hover:text-gray-600'
					onClick={onClose}
				>
					X
				</button>
				{children}
			</div>
		</div>
	);
};

export default Modal;
