import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import TenxPage from "./Pages/TenxPage";
import ProfilePage from "./components/ProfilePage";

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={<Home />}></Route>
				<Route
					path='/signup'
					element={<SignUp />}></Route>
				<Route
					path='/login'
					element={<Login />}></Route>
				<Route
					path='/tenxpage'
					element={<TenxPage />}></Route>
				<Route
					path='/profile'
					element={<ProfilePage />}></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default App;
