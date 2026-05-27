import ClothingCard from "./ClothingCard";
import wardrobeData from "../../data/MockWardrobe.json";

export default function ClosetGrid(){
    return(
        <div className="w-full bg-stone-50 p-6 min-h-screen">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900"> My Wardrobe</h2>
                <p className="text-stone-500 text-sm">Showing {wardrobeData.length} items</p>
            </div>

            <div className="grid grid-cols-1 md:gried-cols-3 lg:grid-cols-4 gap-6">
                {wardrobeData.map((item) => (
                    <ClothingCard key={item.id} item = {item} />
                ))}
            </div>
        </div>
    )
}