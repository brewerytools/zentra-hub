import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function ModalProduct({ show, setShow, mode, product }) {
    const { data, setData, post, put, reset } = useForm({
        name: '',
        description: '',
    });

    useEffect(() => {
        if (mode === 'edit' && product) {
            setData({
                name: product.name,
                description: product.description,
            });
        } else {
            reset();
        }
    }, [mode, product]);

    const submit = (e) => {
        e.preventDefault();

        if (mode === 'edit') {
            put(route('products.update', product.id), {
                onSuccess: () => {
                    reset();
                    setShow(false);
                },
            });
        } else {
            post(route('products.store'), {
                onSuccess: () => {
                    reset();
                    setShow(false);
                },
            });
        }
    };

    const closeModal = () => {
        reset();
        setShow(false);
    };

    return (
        <Modal show={show} onClose={closeModal}>
            <form onSubmit={submit} className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                    {mode === 'edit' ? 'Editar produto' : 'Adicionar produto'}
                </h2>

                <div className="mb-4">
                    <input
                        type="text"
                        value={data.name}
                        onChange={e => setData('name', e.target.value)}
                        className="w-full border rounded-md p-2"
                        placeholder="Nome do produto"
                        required
                    />
                </div>

                <div className="mb-4">
                    <textarea
                        value={data.description}
                        onChange={e => setData('description', e.target.value)}
                        className="w-full border rounded-md p-2"
                        placeholder="Descrição"
                    />
                </div>

                <div className="flex justify-end gap-2">
                    <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-200 rounded-md"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                        {mode === 'edit' ? 'Atualizar' : 'Salvar'}
                    </button>
                </div>
            </form>
        </Modal>
    );
}
