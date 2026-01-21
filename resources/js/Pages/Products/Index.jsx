import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import List from './Partials/List';
import ModalProduct from './Partials/ModalProduct';

export default function Index() {
    const [openModal, setOpenModal] = useState(false);
    const [mode, setModeModal] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Produtos
                </h2>
            }
        >
            <Head title="Products" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-9 overflow-auto h-[600px]">

                <div className="mb-4">
                    <button
                        onClick={() => {
                            setSelectedProduct(null);
                            setOpenModal(true)
                            setModeModal("add")
                        }}
                        className="p-3 bg-blue-500 text-white rounded-md"
                    >
                        Adicionar produto
                    </button>
                </div>

                <List />
            </div>

            <ModalProduct show={openModal} setShow={setOpenModal} mode={mode} product={selectedProduct} />

        </AuthenticatedLayout>
    );
}
