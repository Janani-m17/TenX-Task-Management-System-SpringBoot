import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import TenxPage from "./Pages/TenxPage";
import ProfilePage from "./components/ProfilePage";
import TasksPage from "./components/MyTasksPage";
import NoPage from "./components/NoPage";
import TaskManagement from "./components/Categorize";
import ProtectedRoute from "./ProtectedRoute";


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

				<Route element={<ProtectedRoute />}>
				<Route
					path='/tenxpage'
					element={<TenxPage />}></Route>
				<Route
					path='/profile'
					element={<ProfilePage />}></Route>
				<Route
					path='/tasks'
					element={<TasksPage />}></Route>
				<Route
					path='/categorize'
					element={<TaskManagement />}></Route>
				</Route>
				
				<Route
					path='*'
					element={<NoPage />}></Route>
      </Routes>
		</BrowserRouter>
	);
};

export default App;