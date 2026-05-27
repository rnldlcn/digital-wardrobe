# 🧥 Digital Wardrobe & Outfit Curator (Personal Project)

A web application designed to digitize, categorize, and curate personal clothing collections. 

## 🚀 Tech Stack

* **Framework:** React (Functional Components & Hooks)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS (v4.0)
* **Data Management:** Local JSON Array (Mocking database schema)

## ✨ Current Features

* **Responsive Grid Architecture:** Fluid layout that adapts from mobile to widescreen using Tailwind CSS Grid/Flexbox.
* **Complex Data Schema:** Clothing items are structured with both absolute parameters (e.g., `category`, `fit`) and flexible array attributes (e.g., `aesthetic`, `dressCode`).
* **Dynamic Rendering:** Automated UI generation mapping over local JSON arrays.
* **Image Handling:** Dynamic rendering of assets routed through Vite's public directory with automated fallback placeholders.

## 📂 Project Structure

The repository enforces strict separation of concerns between layout, domain-specific components, and data layers:

```text
src/
├── components/         
│   ├── layout/         # Structural shells (Header, Sidebar)
│   ├── closet/         # Wardrobe-specific UI (Grid, Cards)
│   └── outfit/         # [Pending] Mixing canvas logic
├── data/               
│   └── mockWardrobe.json # Mock API data layer
├── App.jsx             # Main application assembler
└── main.jsx            # React entry point
