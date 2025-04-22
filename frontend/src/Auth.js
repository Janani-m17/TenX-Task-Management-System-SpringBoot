export const parseJwt = token => {
	try {
		const base64Url = token.split(".")[1];
		const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		return JSON.parse(atob(base64));
	} catch (error) {
		return error;
	}
};

export const checkTokenExpiration = () => {
	const token = localStorage.getItem("token");

	if (token) {
		const tokenData = parseJwt(token);
		const currentTime = Math.floor(Date.now() / 1000);

		if (tokenData?.exp < currentTime) {
			localStorage.removeItem("token");
			window.location.href = "/login"; // Redirect to login
		}
	}
};
