import {CircleLoader} from "react-spinners";

export const Loader = ({
	size = 100,
	speed = 100,
	thickness = 100,
	color = "#FF63B8",
}) => {
	return (
		<>
			<CircleLoader
				size={size}
				color={color}
				thickness={thickness}
				speed={speed}
			/>
		</>
	);
};
