import { checkTokenExpiration } from "../Auth";
import "../styles/tenxpage.css";
import React, { useState, useEffect } from "react";

const MyCategories = () => {
	const [categories, setCategories] = useState([]);

	// Default categories list
	const defaultCategories = [
		"Work",
		"Personal",
		"Health",
		"Fitness",
		"Learning",
		"Others",
	];

	// Fetch category stats from backend
	const fetchCategories = async () => {
		try {
			const token = localStorage.getItem("token");
			checkTokenExpiration();
			const response = await fetch(
				"http://localhost:8080/tasks/category-stats",
				{
					headers: { Authorization: token },
				}
			);

			if (!response.ok) {
				throw new Error("Failed to fetch category stats");
			}

			const data = await response.json();

			// Convert response to an array and ensure all default categories exist
			const formattedCategories = defaultCategories.map(category => ({
				name: category,
				total: data[category]?.total || 0,
				completed: data[category]?.completed || 0,
			}));

			setCategories(formattedCategories);
		} catch (error) {
			console.error("Error fetching categories:", error);
			// If error, set all categories with zero count
			setCategories(
				defaultCategories.map(name => ({ name, total: 0, completed: 0 }))
			);
		}
	};

	// Fetch categories when component mounts
	useEffect(() => {
		fetchCategories();
	}, []);

	return (
		<div className='task-tracker-container white-bg'>
			<div className='section-header'>
				<h3>Categories</h3>
			</div>

			{categories.length === 0 ? (
				<p>No categories found</p>
			) : (
				categories.map(category => (
					<div
						key={category.name}
						className='category'>
						<div className='category-details'>
							<div className='category-name'>{category.name}</div>
							<div className='category-stats'>
								<div className='total-text'>Total: {category.total}</div>
								<div className='completed-text'>
									Completed: {category.completed}
								</div>
								<div className='progress-text'>
									In Progress: {category.total - category.completed}
								</div>
							</div>
						</div>
					</div>
				))
			)}
		</div>
	);
};

export default MyCategories;
