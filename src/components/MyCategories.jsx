import React from "react";
import "../styles/tenxpage.css";

function MyCategories() {
	const categories = [
		{
			icon: "💼",
			label: "Work",
			members: [
				{ src: "/api/placeholder/30/30", alt: "Member 1" },
				{ src: "/api/placeholder/30/30", alt: "Member 2" },
			],
		},
		{
			icon: "👨‍👩‍👧‍👦",
			label: "Family",
			members: [
				{ src: "/api/placeholder/30/30", alt: "Family Member 1" },
				{ src: "/api/placeholder/30/30", alt: "Family Member 2" },
				{ src: "/api/placeholder/30/30", alt: "Family Member 3" },
			],
		},
		{
			icon: "💻",
			label: "Freelance work 01",
			members: [
				{ src: "/api/placeholder/30/30", alt: "Freelance Member 1" },
				{ src: "/api/placeholder/30/30", alt: "Freelance Member 2" },
			],
		},
		{
			icon: "📅",
			label: "Conference planning",
			members: [{ src: "/api/placeholder/30/30", alt: "Conference Member" }],
		},
	];

	return (
		<div className='my-categories white-bg'>
			<div className='section-header'>
				<h3>My categories</h3>
				<span>...</span>
			</div>
			<div className='categories-list'>
				{categories.map((category, index) => (
					<div
						key={index}
						className='category-item'>
						<div className='category-info'>
							<span className='category-icon'>{category.icon}</span>
							<span className='category-label'>{category.label}</span>
						</div>
						<div className='category-members'>
							{category.members.map((member, memIndex) => (
								<img
									key={memIndex}
									src={member.src}
									alt={member.alt}
									className='member-avatar'
								/>
							))}
						</div>
					</div>
				))}
				<div className='add-category'>
					<span>+ Add more</span>
				</div>
			</div>
		</div>
	);
}

export default MyCategories;