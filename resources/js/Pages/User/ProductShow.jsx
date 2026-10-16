
import { Head, Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';

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

const imageUrl = (image) => {
    if (!image) return null;
    if (/^https?:\/\//i.test(image)) return image;
    return `/storage/${image.replace(/^\/+/, '')}`;
};

const money = (amount) =>
    new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
        minimumFractionDigits: 2,
    }).format(Number(amount || 0));

export default function ProductShow({ product }) {
    const [quantity, setQuantity] = useState(1);
    const [detailsOpen, setDetailsOpen] = useState(true);
    const [adding, setAdding] = useState(false);
    const { props } = usePage();
    const flash = props.flash || {};

    if (!product) {
        return (
            <>
                <Head title="Product | Candelite" />
                <div className="min-h-screen bg-[#f8f3ea] text-[#49372d]">
                    <Navbar />
                    <main className="mx-auto max-w-5xl px-6 py-16 text-center">
                        <h1 className="font-serif text-3xl">
                            Product information is unavailable.
                        </h1>
                        <Link
                            href="/products"
                            className="mt-6 inline-block rounded-xl bg-[#604333] px-7 py-3 text-white"
                        >
                            Back to Products
                        </Link>
                    </main>
                </div>
            </>
        );
    }

    const photo = imageUrl(product.image);
    const stock = Number(product.stock || 0);
    const unavailable = stock < 1;

    const addToCart = () => {
        if (adding || unavailable || quantity > stock) return;

        setAdding(true);

        router.post(
            `/cart/${product.id}`,
            { quantity },
            {
                preserveScroll: true,
                onFinish: () => setAdding(false),
            }
        );
    };

    return (
        <>
            <Head title={`${product.name} | Candelite`} />

            <div className="min-h-screen bg-[#f8f3ea] text-[#49372d]">
                <Navbar />

                <main className="mx-auto max-w-[1300px] px-6 py-10 md:px-10 md:py-14">
                    <Link
                        href="/products"
                        className="mb-8 inline-flex items-center gap-2 text-sm text-[#79685b] hover:text-[#604333]"
                    >
                        ← Back to Products
                    </Link>

                    {flash.success && (
                        <div className="mb-6 rounded-xl border border-[#c9dbc3] bg-[#eff6eb] px-5 py-4 text-sm text-[#42623b]">
                            {flash.success}
                        </div>
                    )}

                    {flash.error && (
                        <div className="mb-6 rounded-xl border border-[#e8c9c0] bg-[#fff0eb] px-5 py-4 text-sm text-[#8b4537]">
                            {flash.error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-14">
                        <div className="overflow-hidden rounded-xl border border-[#e9dfd3] bg-[#fffdf9] p-3 shadow-sm">
                            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-[#eee3d1]">
                                {photo ? (
                                    <img
                                        src={photo}
                                        alt={product.name}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="font-serif text-3xl text-[#8a7461]">
                                        Candelite ✧
                                    </span>
                                )}
                            </div>
                        </div>

                        <section className="pt-2">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#95816e]">
                                Candelite Collection
                            </p>

                            <h1 className="font-serif text-4xl leading-tight text-[#4b352b] md:text-5xl">
                                {product.name}
                            </h1>

                            <p className="mt-5 text-2xl font-semibold text-[#604333]">
                                {money(product.price)}
                            </p>

                            <p className={`mt-4 text-sm ${unavailable ? 'text-red-700' : 'text-[#79685b]'}`}>
                                {unavailable ? 'Currently out of stock' : `${stock} available`}
                            </p>

                            {product.description && (
                                <p className="mt-6 leading-7 text-[#79685b]">
                                    {product.description}
                                </p>
                            )}

                            <div className="mt-8 border-y border-[#e5d9ca] py-6">
                                <p className="mb-3 text-sm font-medium">
                                    Quantity
                                </p>

                                <div className="flex items-center gap-5">
                                    <div className="flex items-center rounded-lg border border-[#ded1c2] bg-[#fffdf9]">
                                        <button
                                            type="button"
                                            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                                            disabled={quantity <= 1}
                                            className="px-4 py-3 transition hover:bg-[#eee3d1] disabled:opacity-40"
                                            aria-label="Decrease quantity"
                                        >
                                            −
                                        </button>

                                        <span className="min-w-12 text-center">
                                            {quantity}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => setQuantity((current) => Math.min(stock, current + 1))}
                                            disabled={unavailable || quantity >= stock}
                                            className="px-4 py-3 transition hover:bg-[#eee3d1] disabled:opacity-40"
                                            aria-label="Increase quantity"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <span className="text-sm text-[#79685b]">
                                        {unavailable ? 'Unavailable' : `${stock} in stock`}
                                    </span>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={addToCart}
                                disabled={adding || unavailable}
                                className="mt-6 w-full rounded-xl bg-[#604333] px-6 py-4 text-sm font-medium text-white transition hover:bg-[#795844] disabled:cursor-not-allowed disabled:bg-[#b8a79a]"
                            >
                                {adding
                                    ? 'Adding to Cart...'
                                    : unavailable
                                      ? 'Out of Stock'
                                      : 'Add to Cart'}
                            </button>

                            <Link
                                href="/cart"
                                className="mt-3 block w-full rounded-xl border border-[#604333] px-6 py-4 text-center text-sm text-[#604333] transition hover:bg-[#eee3d1]"
                            >
                                View Shopping Cart
                            </Link>

                            <div className="mt-8 border-t border-[#e5d9ca]">
                                <button
                                    type="button"
                                    onClick={() => setDetailsOpen(!detailsOpen)}
                                    className="flex w-full items-center justify-between py-5 text-left font-medium"
                                >
                                    Product Details
                                    <span className="text-xl">
                                        {detailsOpen ? '−' : '+'}
                                    </span>
                                </button>

                                {detailsOpen && (
                                    <div className="pb-6 text-sm leading-7 text-[#79685b]">
                                        <p>
                                            Bring warmth and comfort into your space
                                            with {product.name}. A thoughtful choice
                                            for everyday relaxation or gifting.
                                        </p>
                                        <p className="mt-3">
                                            Product: {product.name}
                                        </p>
                                        <p>
                                            Availability: {unavailable ? 'Out of stock' : 'In stock'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
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
