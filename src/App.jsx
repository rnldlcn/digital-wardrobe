import { useState } from "react";
import ClosetGrid from "./components/closet/ClosetGrid";
import Header from "./components/layout/Header";
import Sidebar from "./components/layout/Sidebar";
function App() {
  const [activeCategory, setActiveCategory] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex w-full flex-1">    
      <div className="w-1/4 hidden md:block bg-white border-r border-stone-200 p-6">
        <Sidebar activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      </div>

      <div className="w-full md:w-3/4">
        <ClosetGrid activeCategory={activeCategory} />
      </div>
    </div>
    </div>
  );
}

export default App;