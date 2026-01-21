import { useState } from 'react';
import Modal from '@/Components/Modal';
import ListProducts from './ListProducts';

export default function ListModal({
    show,
    onClose,
    data,
    setData,
    submit,
    errors,
    processing,
    products,
    selectedList,
    productsList,
    setProductsList,
}) {
    const [showProductForm, setShowProductForm] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editName, setEditName] = useState('');
    const [editQuantity, setEditQuantity] = useState('');

    const startEdit = (product, index) => {
        setEditIndex(index);
        setEditName(product.name);
        setEditQuantity(product.quantity);
    };

    const saveEdit = () => {
        const updatedList = productsList.map((p, index) =>
            index === editIndex
                ? { ...p, name: editName, quantity: editQuantity }
                : p
        );

        setProductsList(updatedList);
        setData('products', updatedList);

        setEditIndex(null);
    };

    const deleteProduct = (index) => {
        const updatedList = productsList.filter((_, i) => i !== index);
        setProductsList(updatedList);
        setData('products', updatedList);
    };

    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={submit} className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    {selectedList ? 'Editar Lista' : 'Criar Lista'}
                </h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Nome da lista
                    </label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="Ex: Minha lista"
                    />
                    {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                </div>

                <div className="mb-4">
                    <p className="mt-5 font-medium">Produtos</p>

                    <button
                        type="button"
                        onClick={() => setShowProductForm(true)}
                        className="p-2 text-sm mt-2 bg-blue-500 text-white rounded-md"
                    >
                        Adicionar produto
                    </button>

                    {showProductForm && (
                        <ListProducts
                            products={products}
                            onAddProduct={(product) => {
                                const productWithName = {
                                    id: product.id,
                                    name: product.name,
                                    quantity: product.quantity,
                                };

                                const updatedList = [...data.products, productWithName];
                                setData('products', updatedList);
                                setProductsList(updatedList);
                                setShowProductForm(false);
                            }}
                            onClose={() => setShowProductForm(false)}
                        />
                    )}

                    {productsList.map((p, index) => (
                        <li key={index} className="flex items-center gap-3 mb-2 mt-5">
                            {editIndex === index ? (
                                <>
                                    <input
                                        type="text"
                                        value={editName}
                                        onChange={(e) => setEditName(e.target.value)}
                                        className="border px-2 py-1 rounded w-40"
                                    />

                                    <input
                                        type="number"
                                        value={editQuantity}
                                        onChange={(e) => setEditQuantity(e.target.value)}
                                        className="border px-2 py-1 rounded w-24"
                                    />

                                    <button
                                        type="button"
                                        onClick={saveEdit}
                                        className="bg-green-500 text-white px-2 py-1 rounded"
                                    >
                                        Salvar
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span className="w-100">
                                        {p.name} - {p.quantity}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => startEdit(p, index)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                    >
                                        Editar
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => deleteProduct(index)}
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                    >
                                        Excluir
                                    </button>
                                </>
                            )}
                        </li>
                    ))}

                </div>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded-md"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        disabled={processing}
                        className="px-4 py-2 bg-[#FF2D20] text-white rounded-md"
                    >
                        Salvar
                    </button>
                </div>
            </form>
        </Modal>
    );
}
