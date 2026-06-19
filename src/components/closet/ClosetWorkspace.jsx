import {useState, useEffect} from "react";
import ClothingCard from "../closet/ClothingCard";
import wardrobeData from "../../data/MockWardrobe.json";

import {Pagination, PaginationContent, PaginationItem, PaginationLink} from "@/components/ui/pagination";

export default function ClosetWorkspace({activeCategory}) {
    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);

    //State for aesthetic filtering
    const [activeAesthetic, setActiveAesthetic] = useState("");

    //state for weather data
    const [weather, setWeather] = useState({temp: "--", condition: "Loading..."});

    //State that handles the outfit name input
    const [outfitName, setOutfitName] = useState("");

    //state that saves the outfit pieces selected by the user
    const [canvas, setCanvas] = useState({top: null, bottom: null, shoes:null});

    //state that saves the outfits created by the user in local storage as an array
    const [savedOutfits, setSavedOutfits] = useState([]);

    //State that shows how many items are shown in a page
    const itemsPerPage = 8;

    //Effect that simulates fetching weather data from an API and will be changed to fetch real data in the future.
    useEffect(() => {
        setTimeout(() => {
            setWeather({temp: "72°F", condition: "Sunny"});
        
        }, 800);
    }, []);

    //Double Filters an item before being shown in the screen
    const filteredItems = wardrobeData.filter(item => {
        const matchesCategory = !activeCategory || activeCategory === "All" || item.category === activeCategory;
        const matchesAesthetic = activeAesthetic ==="All" || item.aesthetic || activeAesthetic;
        return matchesCategory && matchesAesthetic;

    });

    //Extracts unique aesthetics from the wardrobe data to populate the aesthetic filter dropdown
    const uniqueAesthetics = ["All", ...new Set(wardrobeData.map(item => item.aesthetic).filter(Boolean))];

    //Pagination logic
    const indexxOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexxOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexxOfLastItem);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    //Handles adding an item to the outfit canvas 
    const handleAddToCanvas = (item) => {
        //checks the category of the item and adds it to the corresponding slot, if the other the slots for the bottom or shoes are occupied, this makes sure that athey are not removed if the user adds a new top, for example. This allows users to mix and match pieces without losing their previous selections.
        if (item.category === "Shirts" || item.category === "Knitwear"){
            setCanvas(prev => ({...prev, top: item}));
        } else if (item.category === "Trousers" || item.category === "Shorts"){
            setCanvas(prev => ({...prev, bottom: item}));
        } else if (item.category === "Footwear" || item.category === "Shoes"){
            setCanvas(prev => ({...prev, shoes: item}));
        }
    };

    //Handles the saving of an outfit, it checks if there is no name provided for the outfit and if there is one or more missing item in the canvas, this will throw an alert for the user to fix.
    const handleSaveOutfit = () => {
        if (!outfitName.trim()) {
            alert("Please provide a name for this outfit before saving.");
            return;
        }
        if (!canvas.top && !canvas.bottom && !canvas.shoes) {
            alert("Please add at least one item in each category before saving.");
            return;
    }

        const newOutfit = {
            id: Date.now(),
            name: outfitName,
            items: {...canvas}
        };

        //This saved the outfit in the local storage and makes sure that the previous outfits are not lost when a new one is added.
        setSavedOutfits(prev => [...prev, newOutfit]);
        //Resets the canvas inlcuding the name and the items selected.
        setOutfitName("");
        setCanvas({top: null, bottom: null, shoes:null});
    };


    return (
        //The main layout
        <div className="w-full bg-stone-50 p-6 min-h-screen grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/*Closet Inventory */}
            <div className="xl:col-span-3 flex flex-col justify-between">
                <div>
                    {/*Weather Banner */}
                    <div className = "mb-6 p-4 bg-slate-900 text-stone-100 flex justify-between items-center">
                        <div>
                            <span className="text-xs uppercase tracking-wider text-slate-400">Today's Forecast</span>
                            <span className ="text-sm font-medium">Manila, PH</span>
                        </div>
                        <div className="text-right">
                            <span className = "text-xl font-bold block">{weather.temp}</span>
                            <span className = "text-xs text-slate-300">{weather.condition}</span>
                        </div>
                    </div>

                    {/*Aesthetic Filter Row */}
                    <div className ="mb-6">
                        <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-2">Filter by Aesthetic</span>
                        <div className="flex flex-wrap gap-2">
                            {uniqueAesthetics.map(aesthetic => (
                                <button 
                                    key={aesthetic}
                                    onClick={() => {setActiveAesthetic(aesthetic); setCurrentPage(1); }}
                                    className={`px-3 py-1 text-xs border ${activeAesthetic === aesthetic ? "bg-slate-900 text-white border-slate-900" : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"}`}
                                >
                                    {aesthetic}
                                </button>
                            ))}
                        </div>
                    </div>


                    {/* Wardrobe Item Grid */}
                    <div className= "grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {currentItems.map((item) => (
                            <div key={item.id} className="relative group">
                                <ClothingCard item={item}/>
                                <button
                                    onClick={() => handleAddToCanvas(item)}
                                    className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-slate-900 text-xs px-2 py-1 opacity -0 group-hover:opacity-100 transition-opacity duration-200 border border-stone-200">
                                        +Add to Canvas
                                    </button>
                                </div>
                        ))}
                    </div>
                </div>


                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination className="mt-auto">
                        <PaginationContent>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                                <PaginationItem key={pageNumber}>
                                    <PaginationLink 
                                        href="#" 
                                        isActive={pageNumber === currentPage}
                                        onClick={(e) => { e.preventDefault(); setCurrentPage(pageNumber); }}
                                    >
                                        {pageNumber}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                        </PaginationContent>
                    </Pagination>
                )}
            </div>


            {/*Outfit Canvas */}
            <div className="bg-white border border-stone-200 p-6 flex flex-col justify-between">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-4 uppercase tracking-tight border-b pb-2">Outfit Canvas</h3>

                    {/*Outfit Name input */}
                    <div className ="mb-4">
                        <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">Outfit Name</label>
                        <input
                            type="text"
                            value={outfitName}
                            onChange={(e) => setOutfitName(e.target.value)}
                            placeholder="e.g. Casual Day outfit"
                            className="w-full text-sm border-stone-200 border p-2 focus:outline-none focus:border-slate-900 placeholder:text-stone-300:"/>
                    </div>

                    {/*Canvas Display/ Visual slots for the outfit */}
                    <div className="space-y-3 mb-6">
                        <div className ="border border-dashed border-stone-200 p-3 min-h-[70px] flex flex-col justify-center">
                            <span className ="text-[10px] uppercase text-stone-400 font-bold block mb-1">Top Slot</span>
                            {canvas.top ? <p className="text-sm font-medium text-slate-800">{canvas.top.name}</p>: <p className ="text-xs text-stone-300 italic">Empty</p>}
                        </div>
                        <div className ="border border-dashed border-stone-200 p-3 min-h-[70px] flex flex-col justify-center">
                            <span className ="text-[10px] uppercase text-stone-400 font-bold block mb-1">Bottom Slot</span>
                            {canvas.bottom ? <p className="text-sm font-medium text-slate-800">{canvas.bottom.name}</p>: <p className ="text-xs text-stone-300 italic">Empty</p>}
                        </div>
                        <div className ="border border-dashed border-stone-200 p-3 min-h-[70px] flex flex-col justify-center">
                            <span className ="text-[10px] uppercase text-stone-400 font-bold block mb-1">Footwear Slot</span>
                            {canvas.shoes ? <p className="text-sm font-medium text-slate-800">{canvas.shoes.name}</p>: <p className ="text-xs text-stone-300 italic">Empty</p>}
                        </div>

                        <button
                            onClick={handleSaveOutfit}
                            className="w-full bg-slate-900 text-white text-xs uppercase tracking-wider py-3 font-semibold hover:bg-slate-800 transition-colors"> Save Outfit
                        </button>
                </div>


                {/*Displays Saved Outfits List */}
                <div className="mt-8 border-t border-stone-100 pt-4 max-h-[250px] overflow-y auto">
                    <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">Saved Outfits ({savedOutfits.length})</h4>
                    {savedOutfits.length === 0 ? (
                        <p className="text-xs text-stone-300 italic"> No saved outfits yet.</p>
                    ) : (
                        <ul className="space-y-2">
                            {savedOutfits.map(outfit => (
                                <li key = {outfit.id} className="bg-stone-50-p-2 border border-stone-200 text-xs">
                                <span className="font-bold text-slate-900 block mb-1">{outfit.name}</span>
                                <span className="text-stone-500 block">{[outfit.items.top?.name, outfit.items.bottom?.name, outfit.items.shoes?.name].filter(Boolean).join(" + ")}</span>
                                </li>
                            ))}
                        </ul>
                    
                    )}
                </div>     
            </div>
        </div>
        </div>
    );

}
