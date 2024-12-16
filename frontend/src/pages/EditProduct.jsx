import React, { useEffect, useState } from 'react';
import '../index.css';
import '../output.css';
import { Link, useLocation } from 'react-router-dom';
import Top from '../components/Top';
import Arrow from '../assets/arrow.svg';
import { productServices } from '../service/ProductService';


const EditProduct = () => {
    const { state } = useLocation();

    if (!state) {
        return <div>No product found.</div>;
    }

    const { product } = state;

    const [sku, setSku] = useState(product.sku);
    const [name, setName] = useState(product.name);
    const [quantity, setQuantity] = useState(product.quantity);
    const [description, setDescription] = useState(product.description || '');
    const [images, setImages] = useState(product.images || []);
    const [newImages, setNewImages] = useState([]);

    const handleUpdateProduct = async () => {
        try {
            const updatedProduct = await productServices.updateProduct(
                product._id,
                sku,
                name,
                quantity,
                description,
                newImages
            );
            console.log("Product updated:", updatedProduct);
            alert("Product has been updated successfully!");
        } catch (error) {
            console.error("Failed to update product:", error);
        }
    };

    useEffect(() => {
        setSku(product.sku);
        setName(product.name);
        setQuantity(product.quantity);
        setDescription(product.description || '');
        setImages(product.images || []);
    }, [product]);

    const handleImageChange = (event) => {
        const files = event.target.files;
        const fileArray = Array.from(files);
        setNewImages(fileArray);
    };

    const handleSave = () => {
        console.log('Product saved:', { sku, name, quantity, description, images });
        handleUpdateProduct();
    };

    return (
        <>
            <div>
                <Top />
                <div className="container mx-auto flex justify-start">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-black h-20 font-black p-4 text-4xl tracking-wide flex items-center">
                            PRODUCTS
                        </Link>
                        <img src={Arrow} alt="Arrow" className="ml-2" />
                        <div className="text-custom-blue h-10 p-4 text-2xl flex items-center">Edit Product</div>
                    </div>
                </div>
                <section>
                    <div className="container mx-auto flex flex-col space-y-10 mt-10 ml-20">
                        <div className="flex items-center space-x-4">
                            <div className="text-2xl w-[100px]">SKU</div>
                            <input
                                type="text"
                                className="w-full max-w-[500px] bg-custom-gray text-2xl p-4 rounded border-none outline-none"
                                value={sku}
                                onChange={(e) => setSku(e.target.value)}
                                placeholder="#CA34"
                            />
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-2xl w-[100px]">NAME</div>
                            <input
                                type="text"
                                className="w-full max-w-[500px] bg-custom-gray text-2xl p-4 rounded border-none outline-none"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Product-name"
                            />
                            <div className="text-2xl w-[100px] ml-5">QTY</div>
                            <input
                                type="number"
                                className="w-full max-w-[500px] bg-custom-gray text-2xl p-4 rounded border-none outline-none"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                placeholder="25"
                            />
                        </div>
                        <div className="flex flex-col space-y-4">
                            <div className="text-xl font-bold satoshi">Product Description</div>
                            <div className="h-[19px] text-custom-light-gray">A small description about the product</div>
                            <textarea
                                className="w-full h-[105px] bg-custom-gray text-lg p-4 rounded border-none outline-none"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                            />
                        </div>
                        <div className="flex items-center space-x-10">
                            <div className="text-xl">Product Images</div>
                            <div className="flex space-x-4">
                                {images.length > 0 ? (
                                    images.map((image, index) => (
                                        <img
                                            key={index}
                                            // src={URL.createObjectURL(image)}
                                            src={`${image.url}`}
                                            alt={`Product Image ${index + 1}`}
                                            className="w-32 h-32 object-cover rounded"
                                        />
                                    ))
                                ) : (
                                    <p>No images uploaded.</p>
                                )}
                            </div>
                            <div className="text-lg text-custom-blue underline cursor-pointer hover:text-custom-dark">
                                <label htmlFor="imageUpload">Edit Images</label>
                            </div>
                            <input
                                id="imageUpload"
                                type="file"
                                multiple
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="text-[15px] text-custom-light-gray">
                                JPEG, PNG, SVG or GIF (Maximum file size 50MB)
                            </div>
                        </div>
                        <div className="flex justify-end items-center">
                            <button
                                className="bg-custom-blue text-white text-xl py-4 px-8 rounded-full mr-20"
                                onClick={handleSave}
                            >
                                Save Changes
                            </button>
                        </div>

                        <div className="border-b border-gray-300"></div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default EditProduct;
