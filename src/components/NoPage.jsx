import React from "react";
import notFound from "../assets/pagenotfound.svg";

const NoPage = () => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}>
			<img
				src={notFound}
				alt='Page not found'
				style={{ width: "50%", maxWidth: "400px" }}
			/>
		</div>
	);
};

export default NoPage;