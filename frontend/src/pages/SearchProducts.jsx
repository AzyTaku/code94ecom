import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import '../output.css';
import Top from '../components/Top';
import SearchResults from '../components/SearchResults';
import Search from '../components/Search';

const SearchProducts = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <>
            <div>
                <Top />
                <div className="container mx-auto flex justify-start">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-black h-20 font-black p-4 text-4xl tracking-wide flex items-center">
                            PRODUCTS
                        </Link>
                    </div>
                </div>
                <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
                <section className="container mx-auto p-4">
                    <div className="h-12 text-gray-500 text-12px satoshi">
                        {`Results Found for '${searchQuery}'`}
                    </div>
                    <SearchResults searchQuery={searchQuery} />
                </section>
            </div>
        </>
    );
};

export default SearchProducts;
