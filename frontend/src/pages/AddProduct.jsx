import { useState } from 'react';
import '../index.css';
import '../output.css';
import { Link } from 'react-router-dom';
import Top from '../components/Top';
import Arrow from '../assets/arrow.svg';
import { productServices } from '../service/ProductService';

const AddProduct = () => {
    const [sku, setSku] = useState('');
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);


    const handleAddProduct = async (event) => {
        event.preventDefault();

        // Form validation
        if (!sku || !name || !quantity || !description || images.length === 0) {
            alert("Please fill in all fields and add at least one image.");
            return;
        }

        try {
            const response = await productServices.addProduct(sku, name, quantity, description, images);

            // Handle success
            console.log("Product added:", response);
            alert("Product has been added successfully!");
            setSku('');
            setName('');
            setQuantity('');
            setDescription('');
            setImages([]);
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Error adding product! Please try again later.");
        }
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        setImages(prevImages => [...prevImages, ...files]);
    };

    return (
        <>
            <div>
                <Top />
                <div className="container mx-auto flex justify-start">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className='text-black h-20 font-black p-4 text-4xl tracking-wide flex items-center'>
                            PRODUCTS
                        </Link>
                        <img src={Arrow} alt="Arrow" className="ml-2" />
                        <div className='text-custom-blue h-10 p-4 text-2xl flex items-center'>Add New Product</div>
                    </div>
                </div>
                <section>
                    <div className="container mx-auto flex flex-col space-y-10 mt-10 ml-20">
                        <div className="flex items-center space-x-4">
                            <label htmlFor="sku" className="text-2xl w-[100px]">SKU</label>
                            <input
                                type="text"
                                id="sku"
                                value={sku}
                                onChange={(e) => setSku(e.target.value)}
                                className="w-full max-w-[500px] bg-custom-gray text-2xl p-4 rounded border-none outline-none"
                            />
                        </div>

                        <div className="flex items-center space-x-4">
                            <label htmlFor="name" className="text-2xl w-[100px]">NAME</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full max-w-[500px] bg-custom-gray text-2xl p-4 rounded border-none outline-none"
                            />
                            <label htmlFor="quantity" className="text-2xl w-[100px] ml-5">QTY</label>
                            <input
                                type="number"
                                id="quantity"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-full max-w-[500px] bg-custom-gray text-2xl p-4 rounded border-none outline-none"
                            />
                        </div>

                        <div className="flex flex-col space-y-4">
                            <label htmlFor="description" className="text-xl font-bold satoshi">Product Description</label>
                            <div className="h-[19px] text-custom-light-gray">A small description about the product</div>
                            <textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full h-[105px] bg-custom-gray text-lg p-4 rounded border-none outline-none"
                            />
                        </div>

                        <div className="flex space-x-10 items-center">
                            <div className="text-xl">Product Images</div>
                            <label className="text-lg text-custom-blue underline cursor-pointer hover:text-custom-dark">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageUpload}
                                    className="hidden"
                                />
                                Add Image
                            </label>
                        </div>

                        <div className="flex flex-wrap mt-4">
                            {images.map((image, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(image)}
                                    alt={`Product ${index}`}
                                    className="w-16 h-16 object-cover mr-4 mb-4 rounded-sm"
                                />
                            ))}
                        </div>

                        <div className="flex justify-end items-center">
                            <button
                                className="bg-custom-blue text-white text-xl py-4 px-8 rounded-full mr-20"
                                onClick={handleAddProduct}
                            >
                                Add Product
                            </button>
                        </div>

                        <div className="border-b border-gray-300"></div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default AddProduct;
