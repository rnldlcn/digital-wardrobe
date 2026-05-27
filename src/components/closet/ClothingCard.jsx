export default function ClothingCard({item}){
    const imageSrc = item.image !=="" ? item.imageUrl: `https://placehold.co/400x400/eeeeee/31343c?text=${item.name.replace(/ /g, '+')}`;

    return(
        <div className="flex flex-col bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all">
            <div className = "h-56 bg-stone-100 w-full">
                <img 
                    src={imageSrc}
                    alt={item.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className= "p-4 flex flex-col gap-2 flex-grow">
                <div className = "flex justify-between items-start">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">{item.category}</span>
                    <span className="text-xs text-stone-400">{item.yearAcquired}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">{item.name}</h3>

                <div className="mt-2 flex flex=wrap gap-1">
                    {item.aesthetic.map((vibe, index) => (
                        <span key={index} className="text-[10px] bg-stone-100 text-stone-600 px-2 py-1 rounded-md font medium">{vibe}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}