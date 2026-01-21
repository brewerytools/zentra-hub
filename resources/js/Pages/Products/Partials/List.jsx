import { usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import ModalProduct from './ModalProduct';

export default function List() {
    const { products } = usePage().props;
    const [openModal, setOpenModal] = useState(false);
    const [mode, setModeModal] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleDeleteProduct = (product) => {
        if (confirm(`Deseja mesmo excluir o produto "${product.name}"?`)) {
            router.delete(route('products.destroy', product.id));
        }
    };


    return (
        <>
            {products.map(product => (
                <div
                    key={product.id}
                    className="p-4 mb-3 bg-white shadow rounded-md"
                >
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.description}</p>

                    <div className='flex gap-2 items-center '>

                        <div className="mb-4">
                            <button
                                onClick={() => {
                                    setSelectedProduct(product)
                                    setOpenModal(true)
                                    setModeModal("edit")
                                }}
                                className="p-2 text-sm mt-5 bg-yellow-500 text-white rounded-md"
                            >
                                Editar
                            </button>
                        </div>
                        <div className="mb-4">
                            <button
                                onClick={() => handleDeleteProduct(product)}
                                className="p-2 text-sm mt-5 bg-red-500 text-white rounded-md"
                            >
                                Excluir
                            </button>

                        </div>
                    </div>


                </div>
            ))}
            <ModalProduct show={openModal} setShow={setOpenModal} mode={mode} product={selectedProduct} />
        </>
    )
}