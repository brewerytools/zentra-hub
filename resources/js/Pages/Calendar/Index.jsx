import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, useForm } from '@inertiajs/react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import { useState, useEffect } from 'react';
import ListModal from './Partials/ListModal';

export default function Index() {
    const { lists, products } = usePage().props;

    const [openModal, setOpenModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedList, setSelectedList] = useState(null);
    const [productsList, setProductsList] = useState([]);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: '',
        day_of_registration: '',
        products: [],
    });

    const events = lists.map(list => ({
        id: list.id,
        title: list.name,
        start: list.day_of_registration,
        extendedProps: { list },
    }));

    const closeModal = () => {
        reset();
        setSelectedList(null);
        setProductsList([]);
        setOpenModal(false);
    };

    const submit = (e) => {
        e.preventDefault();

        if (selectedList) {
            put(route('tasks.update', selectedList.id), {
                onSuccess: closeModal,
            });
        } else {
            post(route('tasks.store'), {
                onSuccess: closeModal,
            });
        }
    };

    const handleEventClick = (info) => {
        const list = info.event.extendedProps.list;

        const productsFromList = (list.products || []).map(p => ({
            id: p.id,
            name: p.name,
            quantity: p.pivot?.quantity || 1
        }));

        setSelectedList(list);
        setProductsList(productsFromList);
        setData({
            name: list.name,
            day_of_registration: list.day_of_registration,
            products: productsFromList,
        });
        setOpenModal(true);
    };


    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr);
        setOpenModal(true);
    };

    useEffect(() => {
        if (selectedDate) {
            setData('day_of_registration', selectedDate);
        }
    }, [selectedDate]);

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Calendário</h2>}
        >
            <Head title="Profile" />

            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 mt-9">
                <FullCalendar
                    plugins={[dayGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events}
                    dateClick={handleDateClick}
                    eventClick={handleEventClick}
                />

                <ListModal
                    show={openModal}
                    onClose={closeModal}
                    data={data}
                    setData={setData}
                    submit={submit}
                    errors={errors}
                    processing={processing}
                    products={products}
                    selectedList={selectedList}
                    productsList={productsList}
                    setProductsList={setProductsList}
                />
            </div>
        </AuthenticatedLayout>
    );
}
