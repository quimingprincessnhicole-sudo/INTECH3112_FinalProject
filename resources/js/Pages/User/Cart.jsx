
import { Head, Link, router, usePage } from '@inertiajs/react';

const money = (amount) =>
    new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
    }).format(Number(amount || 0));

const imageUrl = (image) => {
    if (!image) return null;
    if (/^https?:\/\//i.test(image)) return image;
    return `/storage/${image.replace(/^\/+/, '')}`;
};

function Brand() {
    return (
        <Link href="/home" className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eee3d1] font-serif text-3xl text-[#553b2e]">
                ✧
            </span>
            <span className="block">
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

function Navbar({ itemCount }) {
    return (
        <header className="sticky top-0 z-30 border-b border-[#e8dfd3] bg-[#fcf8f1]/95 shadow-sm backdrop-blur">
            <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-5 px-6 py-4 lg:px-10">
                <Brand />

                <nav className="flex flex-wrap items-center justify-center gap-2 text-sm text-[#59483d] md:gap-5">
                    <Link href="/home" className="rounded-xl px-4 py-2 transition hover:bg-[#eee3d1]">
                        Home
                    </Link>
                    <Link href="/home#about" className="rounded-xl px-4 py-2 transition hover:bg-[#eee3d1]">
                        About Us
                    </Link>
                    <Link href="/products" className="rounded-xl px-4 py-2 transition hover:bg-[#eee3d1]">
                        Products
                    </Link>
                    <Link href="/home#contact" className="rounded-xl px-4 py-2 transition hover:bg-[#eee3d1]">
                        Contact Us
                    </Link>
                </nav>

                <div className="flex items-center gap-4 text-[#553b2e]">

                    <Link href="/cart" aria-label="Shopping cart" className="relative text-2xl transition hover:opacity-60">
                        🛒
                        {itemCount > 0 && (
                            <span className="absolute -right-3 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#604333] px-1 text-[10px] text-white">
                                {itemCount}
                            </span>
                        )}
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

export default function Cart({ items = [] }) {
    const { flash = {}, errors = {} } = usePage().props;

    const itemCount = items.reduce(
        (total, item) => total + Number(item.quantity || 0),
        0
    );

    const subtotal = items.reduce(
        (total, item) =>
            total + Number(item.price || 0) * Number(item.quantity || 0),
        0
    );

    const updateQuantity = (item, quantity) => {
        if (quantity < 1 || quantity > item.stock) return;

        router.patch(
            `/cart/${item.id}`,
            { quantity },
            { preserveScroll: true }
        );
    };

    const removeItem = (item) => {
        router.delete(`/cart/${item.id}`, {
            preserveScroll: true,
        });
    };

    const checkout = () => {
        router.post('/checkout', {}, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Shopping Cart | Candelite" />

            <div className="min-h-screen bg-[#f8f3ea] text-[#49372d]">
                <Navbar itemCount={itemCount} />

                <main className="mx-auto max-w-[1300px] px-6 py-10 md:px-10 md:py-14">
                    {flash.success && (
                        <div
                            role="status"
                            className="mb-8 flex items-start gap-3 rounded-xl border border-[#c9d9bd] bg-[#edf4e8] p-5 text-[#3f5c36] shadow-sm"
                        >
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d8e7cd] text-xl font-bold">
                                ✓
                            </span>
                            <div>
                                <p className="font-semibold">
                                    Order placed successfully!
                                </p>
                                <p className="mt-1 text-sm leading-6">
                                    {flash.success}
                                </p>
                                <Link
                                    href="/products"
                                    className="mt-2 inline-block text-sm font-semibold underline underline-offset-4 hover:text-[#604333]"
                                >
                                    Continue shopping →
                                </Link>
                            </div>
                        </div>
                    )}

                    {(flash.error || errors.checkout) && (
                        <div
                            role="alert"
                            className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
                        >
                            {flash.error || errors.checkout}
                        </div>
                    )}

                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#95816e]">
                        Your Candelite collection
                    </p>

                    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                        <h1 className="font-serif text-4xl md:text-5xl">
                            Shopping Cart <span className="text-[#bba38a]">✧</span>
                        </h1>
                        <p className="text-sm text-[#79685b]">
                            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
                        </p>
                    </div>

                    {items.length === 0 ? (
                        <section className="rounded-xl border border-[#e9dfd3] bg-[#fffdf9] px-6 py-16 text-center shadow-sm">
                            <span className="text-5xl">🕯</span>
                            <h2 className="mt-4 font-serif text-3xl">
                                Your cart is waiting for a little warmth.
                            </h2>
                            <p className="mt-3 text-[#79685b]">
                                Find a candle that makes your space feel like home.
                            </p>
                            <Link
                                href="/products"
                                className="mt-7 inline-flex rounded-xl bg-[#604333] px-7 py-3 text-sm text-white transition hover:bg-[#795844]"
                            >
                                Continue Shopping →
                            </Link>
                        </section>
                    ) : (
                        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_350px]">
                            <section className="space-y-4">
                                {items.map((item) => {
                                    const photo = imageUrl(item.image);

                                    return (
                                        <article
                                            key={item.id}
                                            className="flex flex-col gap-5 rounded-xl border border-[#e9dfd3] bg-[#fffdf9] p-5 shadow-sm sm:flex-row"
                                        >
                                            <div className="flex h-40 w-full items-center justify-center overflow-hidden rounded-lg bg-[#eee3d1] sm:w-40 sm:shrink-0">
                                                {photo ? (
                                                    <img
                                                        src={photo}
                                                        alt={item.name}
                                                        className="h-full w-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="font-serif text-[#8a7461]">
                                                        Candelite ✧
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex flex-1 flex-col justify-between gap-4">
                                                <div>
                                                    <h2 className="font-serif text-2xl text-[#4b352b]">
                                                        {item.name}
                                                    </h2>
                                                    <p className="mt-2 font-medium">
                                                        {money(item.price)}
                                                    </p>
                                                    <p className="mt-1 text-xs text-[#79685b]">
                                                        {item.stock} available
                                                    </p>
                                                </div>

                                                <div className="flex flex-wrap items-center justify-between gap-4">
                                                    <div className="flex items-center rounded-lg border border-[#ded1c2]">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateQuantity(item, Number(item.quantity) - 1)
                                                            }
                                                            disabled={item.quantity <= 1}
                                                            className="px-4 py-2 transition hover:bg-[#eee3d1] disabled:opacity-40"
                                                            aria-label={`Decrease ${item.name} quantity`}
                                                        >
                                                            −
                                                        </button>

                                                        <span className="min-w-10 text-center text-sm">
                                                            {item.quantity}
                                                        </span>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                updateQuantity(item, Number(item.quantity) + 1)
                                                            }
                                                            disabled={item.quantity >= item.stock}
                                                            className="px-4 py-2 transition hover:bg-[#eee3d1] disabled:opacity-40"
                                                            aria-label={`Increase ${item.name} quantity`}
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    <p className="font-semibold text-[#4b352b]">
                                                        {money(Number(item.price) * Number(item.quantity))}
                                                    </p>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item)}
                                                    className="self-start text-sm text-[#9a6555] underline underline-offset-4 hover:text-[#604333]"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </article>
                                    );
                                })}
                            </section>

                            <aside className="rounded-xl border border-[#e9dfd3] bg-[#fffdf9] p-6 shadow-sm lg:sticky lg:top-28">
                                <h2 className="font-serif text-2xl">
                                    Order Summary
                                </h2>

                                <div className="mb-4 mt-6 flex justify-between text-sm">
                                    <span>Items ({itemCount})</span>
                                    <span>{money(subtotal)}</span>
                                </div>

                                <div className="mb-5 flex justify-between border-t border-[#e5d9ca] pt-5 font-semibold">
                                    <span>Subtotal</span>
                                    <span>{money(subtotal)}</span>
                                </div>

                                <p className="mb-6 text-xs leading-5 text-[#79685b]">
                                    Shipping fees will be calculated during checkout.
                                </p>

                                <button
                                    type="button"
                                    onClick={checkout}
                                    disabled={itemCount === 0}
                                    className="w-full rounded-xl bg-[#604333] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#795844] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Proceed to Checkout →
                                </button>

                                <Link
                                    href="/products"
                                    className="mt-4 block text-center text-sm text-[#604333] underline underline-offset-4 hover:text-[#795844]"
                                >
                                    Continue Shopping
                                </Link>
                            </aside>
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
