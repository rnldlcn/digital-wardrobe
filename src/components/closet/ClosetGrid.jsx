import ClothingCard from "./ClothingCard";
import wardrobeData from "../../data/MockWardrobe.json";
import { useState } from "react";
import {Pagination, PaginationContent, PaginationItem, PaginationLink} from "@/components/ui/pagination";

export default function ClosetGrid({ activeCategory }){
    //Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    //Category Filtering
    const filteredItems = (!activeCategory || activeCategory === "All")
        ? wardrobeData
        : wardrobeData.filter(item => item.category === activeCategory);

    //Calculation for items per page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    //Calculation of total pages for pagination
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    return(
        <div className="w-full bg-stone-50 p-6 min-h-screen">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900"> My Wardrobe</h2>
                <p className="text-stone-500 text-sm">Showing {filteredItems.length} items</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                {currentItems.map((item) => (
                    <ClothingCard key={item.id} item = {item} />
                ))}
            </div>

           

            {totalPages > 1 && (
                //Pagionation component that only shows if it contains more than 1 page
                <Pagination>
                    <PaginationContent>
                        {Array.from({length:totalPages }, (_, i) => i + 1).map((pageNumber) => (
                            <PaginationItem key ={pageNumber}>
                                <PaginationLink
                                    href="#"
                                    isActive={pageNumber === currentPage}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage(pageNumber);
                                    }}
                                >
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}