import { Head, Link, router } from '@inertiajs/react';

const imageUrl = (image) => {
    if (!image) return null;
    if (/^https?:\/\//i.test(image)) return image;
    return `/storage/${image.replace(/^\/?storage\//, '')}`;
};

function Brand() {
    return (
        <Link href="/home" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eee3d1] font-serif text-3xl text-[#553b2e]">
                ✧
            </span>
            <span>
                <span className="block font-serif text-3xl leading-none tracking-tight text-[#4b352b]">
                    Candelite
                </span>
                <span className="mt-1 block text-[10px] tracking-[0.3em] text-[#7c6a5b]">
                    GLOW WITH THE FLOW
                </span>
            </span>
        </Link>
    );
}

function Navbar() {
    return (
        <header className="sticky top-0 z-30 border-b border-[#e8dfd3] bg-[#fcf8f1]/95 shadow-sm backdrop-blur">
            <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-5 px-6 py-4 lg:px-10">
                <Brand />

                <nav className="flex flex-wrap items-center justify-center gap-2 text-sm text-[#59483d] md:gap-5">
                    <Link
                        href="/home"
                        className="rounded-xl px-4 py-2 transition hover:bg-[#eee3d1]"
                    >
                        Home
                    </Link>

                    <Link
                        href="/home#about"
                        className="rounded-xl px-4 py-2 transition hover:bg-[#eee3d1]"
                    >
                        About Us
                    </Link>

                    <Link
                        href="/products"
                        className="rounded-xl bg-[#eee3d1] px-4 py-2"
                    >
                        Products
                    </Link>

                    <Link
                        href="/home#contact"
                        className="rounded-xl px-4 py-2 transition hover:bg-[#eee3d1]"
                    >
                        Contact Us
                    </Link>
                </nav>

                <div className="flex items-center gap-4 text-[#553b2e]">

                    <Link
                        href="/cart"
                        aria-label="Shopping cart"
                        className="text-2xl transition hover:opacity-60"
                    >
                        🛒
                    </Link>

                    <button
                        type="button"
                        onClick={() => router.post('/logout')}
                        className="rounded-lg bg-[#604333] px-5 py-3 text-sm text-white transition hover:bg-[#795844]"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </header>
    );
}

export default function Products({ products = [] }) {
    return (
        <>
            <Head title="Products | Candelite" />

            <div className="min-h-screen bg-[#f8f3ea] text-[#49372d]">
                <Navbar />

                <main className="mx-auto max-w-[1400px] px-6 py-12 md:px-10 md:py-14">
                    <div className="mb-8">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#95816e]">
                            Find your favorite scent
                        </p>

                        <h1 className="font-serif text-4xl md:text-5xl">
                            Our Candle Collection{' '}
                            <span className="text-[#bba38a]">✧</span>
                        </h1>

                        <p className="mt-4 max-w-2xl leading-7 text-[#79685b]">
                            Discover candles thoughtfully selected to bring warmth,
                            comfort, and a little magic into your everyday moments.
                        </p>
                    </div>

                    {products.length === 0 ? (
                        <section className="rounded-xl border border-[#e9dfd3] bg-[#fffdf9] px-6 py-16 text-center">
                            <h2 className="font-serif text-2xl">
                                No candles available yet.
                            </h2>
                            <p className="mt-3 text-sm text-[#79685b]">
                                Please check back soon for our collection.
                            </p>
                            <Link
                                href="/home"
                                className="mt-6 inline-flex rounded-xl bg-[#604333] px-7 py-3 text-sm text-white transition hover:bg-[#795844]"
                            >
                                Back to Home
                            </Link>
                        </section>
                    ) : (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {products.map((product) => {
                                const photo = imageUrl(product.image);

                                return (
                                    <article
                                        key={product.id}
                                        className="group overflow-hidden rounded-xl border border-[#e9dfd3] bg-[#fffdf9] p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                    >
                                        <Link
                                            href={`/products/${product.slug}`}
                                            className="block"
                                        >
                                            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[#eee3d1]">
                                                {photo ? (
                                                    <img
                                                        src={photo}
                                                        alt={product.name}
                                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center font-serif text-xl text-[#8a7461]">
                                                        Candelite ✧
                                                    </div>
                                                )}
                                            </div>

                                            <div className="px-1 pt-4">
                                                <h2 className="font-medium text-[#4d3b30] group-hover:underline">
                                                    {product.name}
                                                </h2>

                                                <p className="mt-2 font-semibold text-[#4d3b30]">
                                                    ₱{Number(product.price).toLocaleString(
                                                        'en-PH',
                                                        {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        }
                                                    )}
                                                </p>

                                                <p className="mt-1 text-xs text-[#79685b]">
                                                    {product.stock > 0
                                                        ? `${product.stock} available`
                                                        : 'Out of stock'}
                                                </p>
                                            </div>
                                        </Link>

                                        <Link
                                            href={`/products/${product.slug}`}
                                            className="mt-4 block rounded-lg bg-[#eee3d1] px-3 py-3 text-center text-sm text-[#533c2f] transition hover:bg-[#e5d4bd]"
                                        >
                                            View Candle →
                                        </Link>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </main>

                <footer className="mt-10 border-t border-[#e8dfd3] bg-[#fcf8f1] px-6 py-7">
                    <div className="mx-auto flex max-w-[1300px] flex-wrap items-center justify-between gap-4">
                        <Brand />
                        <p className="text-sm text-[#79685b]">
                            Glow with the flow.
                        </p>
                        <p className="text-xs text-[#8a7461]">
                            © {new Date().getFullYear()} Candelite
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}