import React from "react";
import wardrobeData from "../../data/MockWardrobe.json";

export default function Sidebar({ activeCategory, onCategoryChange }) {
  // Extract all categories from your item array
  const allCategories = Array.isArray(wardrobeData) 
    ? wardrobeData.map(item => item.category) 
    : [];
    
  // Filter out duplicates so you get a clean string list: ["Trousers", "Shirts"]
  const categoriesList = ["All",...new Set(allCategories)].filter(Boolean);

  return (
    <div className="layout-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">Categories</h2>
        <ul className="category-list">
          {categoriesList.map((categoryName) => (
            <li key={categoryName}>
              <button
                className={`category-btn ${activeCategory === categoryName ? "active" : ""}`}
                onClick={() => onCategoryChange(categoryName)}
                style={{ cursor: 'pointer' }}
              >
                <span className="hover:bg-stone-950 hover:text-white text-1xl">{categoryName}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
