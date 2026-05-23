export default function ClothingCard({itemName, category, imageUrl}){
    return(
        <div className="flex flex-col bg-white border border-gray-200 rounded-xl shadow-sm overfllow-hidden hover:shadow-md transition-shadow">
            <div className ="h-48 bg-stone-100 w-full">
                <img
                  src={imageUrl}
                  alt={itemName}
                  className="w-full h-full object-cover"
                />
            </div>

            <div className="p-4 flex flex-col gap-2">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {category}
                </span>
                <h3 className="text-lg font-semibold text-gray-900">
                    {itemName}
                    </h3>

                    <button className="mt-2 w-full  bg-slate-900 text-white py-2 rounded-lg font-medium hover:bg-slate-800 transition-colors"> Add to Outfit

                    </button>
                </div>
        </div>

        
    );
}