import React from 'react';
import '../index.css';
import '../output.css';
import { Link } from 'react-router-dom';
import Star from '../assets/star.svg';
import search from '../assets/search.svg';

const Search = ({ searchQuery, setSearchQuery }) => {
    return (
        <section>
            <div className="container mx-auto flex justify-start items-center p-4">
                <div className="w-full max-w-[600px] flex items-center border rounded-full bg-custom-gray ">
                    <input
                        type="text"
                        className="bg-transparent flex-1 border-0 outline-none p-4 text-[14px]"
                        placeholder="Search for products"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="w-[80px] h-[50px] bg-custom-blue p-4 rounded-full cursor-pointer border-0 flex items-center justify-center text-white">
                        <Link to="/Search">
                            <img src={search} className="w-4 h-4 mr-2" alt="Search" />
                            Search
                        </Link>
                    </button>
                </div>
                <div className="flex items-center ml-auto space-x-4">
                    <button className="px-4 py-3 bg-custom-blue text-white border-2 rounded">
                        <Link to="/AddProduct">New Product</Link>
                    </button>
                    <button className="py-4 w-12 h-12 flex items-center justify-center text-black rounded border-2 border-custom-blue">
                        <Link to="/Favorites">
                            <img src={Star} alt="Favorites" />
                        </Link>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Search;
