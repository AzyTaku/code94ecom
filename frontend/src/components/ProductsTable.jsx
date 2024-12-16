import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from "../store/productsSlice";
import Delete from '../assets/delete-icon.svg';
import star from '../assets/star.svg';
import starFill from '../assets/starred.svg'
import Edit from '../assets/edit-icon.svg';
import { API_URL } from "../store/index";
import Alert from "../assets/alert.svg"
import { toggleFavorite } from '../store/favoritesSlice';
import { productServices } from '../service/ProductService';

// Delete Modal
const DeletePop = ({ onCancel, onConfirm }) => {
    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <button
                    onClick={onCancel}
                    className="flex justify-end items-end text-2xl text-black"
                >
                    &times;
                </button>
                <div className="flex justify-center"><img src={Alert} alt="alert icon" /></div>
                <h2 className="text-2xl font-semibold mb-4 flex justify-center">Are you sure?</h2>
                <p className="text-lg mb-6">You will not be able to undo this action if you proceed!</p>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={onCancel}
                        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 border-2 border-custom-blue">
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="bg-custom-blue text-white px-4 py-2 rounded">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProductsTable = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
    const fetchStatus = useSelector((state) => state.products.fetchStatus);
    const favorites = useSelector((state) => state.favorites.favorites);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (fetchStatus === "idle") {
            dispatch(fetchProducts());
        }
    }, [fetchStatus, dispatch]);

    const handleFavorite = (productId) => {
        dispatch(toggleFavorite(productId));
    };

    useEffect(() => {
        console.log("Updated Favorites:", favorites);
    }, [favorites]);

    // Handle delete action
    const handleDelete = (productId) => {
        console.log("Delete clicked for product with id:", productId);
        setSelectedProductId(productId);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await productServices.deleteProduct(selectedProductId);
            dispatch(fetchProducts());

            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to delete product:", error);
            alert(`Failed to delete product: ${error.message}`);
        }
    }

    const handleCancelDelete = () => {
        setIsModalOpen(false);
    };

    const handleEdit = (product) => {
        console.log("Edit clicked for product with id:", product._id);
        navigate(`/EditProduct/${product._id}`, { state: { product } });
    };

    if (fetchStatus === "loading") {
        return <div>Loading products...</div>;
    }

    if (fetchStatus === "failed") {
        return <div>Failed to load products.</div>;
    }

    return (
        <div className="overflow-x-auto mt-10">
            <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
                <thead>
                    <tr className="text-custom-blue text-left">
                        <th className="px-4 py-2 border-b">SKU</th>
                        <th className="px-4 py-2 border-b">IMAGE</th>
                        <th className="px-4 py-2 border-b">PRODUCT NAME</th>
                        <th className="px-4 py-2 border-b">QUANTITY</th>
                        <th className="px-4 py-2 border-b"></th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <tr className="border-b" key={product._id}>
                                <td className="px-4 py-2">{product.sku}</td>
                                <td className="px-4 py-2">
                                    {
                                        // console.log("API URL : ", API_URL)
                                    }
                                    <img src={`${API_URL}${product.images[0]?.url}`} alt={product.name} className="w-16 h-16 object-contain rounded-sm" />
                                </td>
                                <td className="px-4 py-2">{product.name}</td>
                                <td className="px-4 py-2">{product.quantity}</td>
                                <td className="px-4 py-2 flex space-x-2">
                                    <button
                                        className="focus:outline-none"
                                        onClick={() => handleDelete(product._id)}
                                    >
                                        <img src={Delete} alt="Delete" />
                                    </button>
                                    <button
                                        className="focus:outline-none"
                                        onClick={() => handleEdit(product)}
                                    >
                                        <img src={Edit} alt="Edit" />
                                    </button>
                                    <button
                                        className="focus:outline-none"
                                        onClick={() => handleFavorite(product._id)}
                                    >
                                        <img
                                            src={favorites.includes(product._id) ? starFill : star}
                                            alt="Star"
                                        />
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="px-4 py-2 text-center">No products available.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {isModalOpen && (
                <DeletePop
                    onCancel={handleCancelDelete}
                    onConfirm={handleConfirmDelete}
                />
            )}
        </div>
    );
};

export default ProductsTable;
