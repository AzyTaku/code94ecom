import React from 'react'
import '../index.css'
import '../output.css'
import { Link } from 'react-router-dom';
import Top from '../components/Top'
import ProductsTable from '../components/ProductsTable'
import Search from '../components/Search';

const MainPage = () => {
    return (
        <>
            <div >
                <Top />

                <div className="container mx-auto flex justify-start">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className='text-black h-20 font-black p-4 text-4xl tracking-wide'>
                            PRODUCTS
                        </Link>
                    </div>
                </div>
                <Search />

                <section className="container mx-auto p-4">
                    <ProductsTable />
                </section>
            </div>
        </>
    )
}

export default MainPage