import React from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import '../index.css';
import '../output.css';

const Header = () => {
    return (
        <header>
            <div className="container mx-auto flex justify-between mt-20 mr-20 ml-20">
                <div className="text-black text-2xl font-bold">
                </div>
                <Link to="/">
                    <div className="flex items-center p-8">
                        <div className="text-black admin">
                            ADMIN
                        </div>
                        <ChevronDownIcon className="w-10 h-10 text-black" />
                        <div className="bg-custom-blue w-12 h-12 rounded-full">
                        </div>
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default Header;
