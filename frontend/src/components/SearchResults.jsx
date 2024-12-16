import React from 'react';
import { useSelector } from 'react-redux';
import Arrow from '../assets/arrow.svg';

const SearchResults = ({ searchQuery }) => {
    const products = useSelector((state) => state.products.items);

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <tbody>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product, index) => (
                                <tr key={index}>
                                    <td className="px-4 py-2">
                                        <div className="flex flex-col border-b-2 border-custom-light-gray mt-4 p-2">
                                            <div className="font-semibold text-custom-blue">{product.sku}</div>
                                            <div className="text-lg">{product.name}</div>
                                            <div className="text-sm text-gray-500">{product.description}</div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2 flex items-center justify-between">
                                        <button className="focus:outline-none">
                                            <img src={Arrow} className="text-xl text-blue-500" alt="Arrow" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="px-4 py-2 text-center border border-gray-300">
                                    No results found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SearchResults;
