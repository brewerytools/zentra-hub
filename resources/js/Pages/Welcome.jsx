import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">

                        <main className="flex min-h-[70vh] flex-col items-center justify-center text-center gap-8">

                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold text-black dark:text-white">
                                    Bem-vindo 👋
                                </h1>
                                <p className="text-sm text-black/60 dark:text-white/60">
                                    Tentando controlar a bagunça?
                                </p>
                            </div>

                            <ul className="space-y-3 text-left">
                                <li className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-[#FF2D20]" />
                                    Organize a bagunça
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-[#FF2D20]" />
                                    Lista de mercados, finais de ano e tudo de bom
                                </li>
                            </ul>

                            <div className="mt-10 flex gap-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md bg-[#FF2D20] px-6 py-2 text-white transition hover:opacity-90"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="rounded-md px-6 py-2 ring-1 ring-black/20 transition hover:bg-black/5 dark:ring-white/30 dark:hover:bg-white/10"
                                        >
                                            Acessar
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-md bg-[#FF2D20] px-6 py-2 text-white transition hover:opacity-90"
                                        >
                                            Registrar
                                        </Link>
                                    </>
                                )}
                            </div>

                        </main>

                    </div>
                </div>
            </div>
        </>
    );
}
