import React from 'react'
import { useSelector } from 'react-redux'
import '../index.css'
import '../output.css'
import { Link } from 'react-router-dom'
import Top from '../components/Top'
import FavoritesTable from '../components/FavoritesTable'
import Search from '../components/Search';

const Favorites = () => {
    const favorites = useSelector((state) => state.favorites.favorites); // Get favorite product IDs
    const allProducts = useSelector((state) => state.products.items); // Get all products from state

    const favoriteProducts = allProducts.filter((product) => favorites.includes(product._id));

    return (
        <>
            <div>
                <Top />

                <div className="container mx-auto flex justify-start">
                    <div className="flex items-center space-x-4">
                        <div className='text-black h-20 font-black p-4 text-4xl '>
                            FAVORITE PRODUCTS
                        </div>
                    </div>
                </div>

                <Search />

                <section className="container mx-auto p-4">
                    {favoriteProducts.length > 0 ? (
                        <FavoritesTable products={favoriteProducts} />
                    ) : (
                        <div>No favorite products available.</div>
                    )}
                </section>
            </div>
        </>
    )
}

export default Favorites;
