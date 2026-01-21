import { useState } from 'react';

export default function ListProducts({ products, onAddProduct, onClose }) {
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(1);

    const handleAdd = () => {
        if (!selectedProduct) return;
        const product = products.find(p => p.id === parseInt(selectedProduct));
        if (!product) return;

        onAddProduct({ ...product, quantity });
        setSelectedProduct('');
        setQuantity(1);
        onClose();
    };


    return (
        <div className="p-4 border rounded-md bg-gray-50 mt-4">
            <h3 className="font-semibold mb-2">Adicionar Produto</h3>

            <div className="flex gap-2">
                <select
                    value={selectedProduct}
                    onChange={e => setSelectedProduct(e.target.value)}
                    className="flex-1 border rounded-md p-2"
                >
                    <option value="">Selecione um produto</option>
                    {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                </select>

                <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={e => setQuantity(parseInt(e.target.value))}
                    className="w-20 border rounded-md p-2"
                />

                <button
                    type="button"
                    onClick={handleAdd}
                    className="bg-blue-500 text-white px-4 rounded-md"
                >
                    Adicionar
                </button>
            </div>
        </div>
    );
}
