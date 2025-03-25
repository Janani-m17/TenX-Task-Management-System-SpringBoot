import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";



const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='/'
					element={<Home />}></Route>
				<Route
					path='/login'
					element={<Login />}></Route>
				<Route
					path='/signup'
					element={<SignUp />}></Route>
      </Routes>
		</BrowserRouter>
	);
};

export default App;