import ClosetGrid from "./components/closet/ClosetGrid";

function App() {
  return (
    <div className = "flex w-full min-h-screen">
      <div className="w-1/4 hidden md:block bg-white border-r border-stone-200 p-6">
        <div className="p-6 text-stone-400 font-medium">Sidebar (to be made)</div>
      </div>

      <div className="w-full md:w-3/4">
        <ClosetGrid />
      </div>
    </div>
  );
}

export default App;