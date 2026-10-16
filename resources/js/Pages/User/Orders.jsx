
import { Head, Link, router } from '@inertiajs/react';

const money = (amount) =>
    new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
    }).format(Number(amount || 0));

function Brand({ footer = false }) {
    return (
        <Link
            href="/home"
            className={`flex items-center gap-3 ${footer ? 'justify-center' : ''}`}
        >
            <span className="flex h-[43px] w-[43px] shrink-0 items-center justify-center rounded-full bg-[#eee2d2] text-[26px] leading-none text-[#4a342a]">
                ✧
            </span>

            <span className="block">
                <span className="block font-serif text-[25px] font-medium leading-none tracking-[-0.7px] text-[#4a342a]">
                    Candelite
                </span>
                <span className="mt-[3px] block text-[9px] tracking-[2px] text-[#9a806c]">
                    GLOW WITH THE FLOW
                </span>
            </span>
        </Link>
    );
}

function Navbar() {
    const navClass =
        'rounded-xl px-4 py-2 transition hover:bg-[#eee3d1]';

    return (
        <header className="sticky top-0 z-30 border-b border-[#e8dfd3] bg-[#fcf8f1]/95 shadow-sm backdrop-blur">
            <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-5 px-6 py-4 lg:px-10">
                <Brand />

                <nav className="flex flex-wrap items-center justify-center gap-2 text-sm text-[#59483d] md:gap-3">
                    <Link href="/home" className={navClass}>
                        Home
                    </Link>

                    <a href="/home#about" className={navClass}>
                        About Us
                    </a>

                    <Link href="/products" className={navClass}>
                        Products
                    </Link>

                    <Link
                        href="/my-orders"
                        className={`${navClass} bg-[#eee3d1]`}
                    >
                        My Orders
                    </Link>

                    <a href="/home#contact" className={navClass}>
                        Contact Us
                    </a>
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

const statusStyle = (status) => {
    switch (String(status || 'Pending').toLowerCase()) {
        case 'approved':
            return 'bg-green-100 text-green-700';
        case 'for delivery':
            return 'bg-amber-100 text-amber-700';
        case 'delivered':
            return 'bg-blue-100 text-blue-700';
        case 'cancelled':
            return 'bg-red-100 text-red-700';
        default:
            return 'bg-gray-100 text-gray-700';
    }
};

const formatStatus = (status) =>
    String(status || 'Pending')
        .toLowerCase()
        .replace(/\b\w/g, (letter) => letter.toUpperCase());

export default function Orders({ orders = [] }) {
    return (
        <>
            <Head title="My Orders | Candelite" />

            <div className="min-h-screen bg-[#f8f3ea] text-[#49372d]">
                <Navbar />

                <main className="mx-auto max-w-[1400px] px-6 py-10 md:px-10 md:py-14">
                    <div className="mb-8">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#95816e]">
                            Your Candelite Purchases
                        </p>

                        <h1 className="font-serif text-4xl md:text-5xl">
                            My Orders{' '}
                            <span className="text-[#bba38a]">✧</span>
                        </h1>

                        <p className="mt-3 text-sm leading-6 text-[#79685b]">
                            Track your purchases and check the latest status
                            of your orders.
                        </p>
                    </div>

                    <section className="mb-7 grid gap-4 sm:grid-cols-3">
                        <div className="rounded-xl border border-[#e8dfd3] bg-[#fffdf9] p-5 shadow-sm">
                            <p className="text-sm text-[#79685b]">
                                Total Orders
                            </p>
                            <p className="mt-2 text-3xl font-semibold text-[#4a342a]">
                                {orders.length}
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#e8dfd3] bg-[#fffdf9] p-5 shadow-sm">
                            <p className="text-sm text-[#79685b]">
                                Pending Orders
                            </p>
                            <p className="mt-2 text-3xl font-semibold text-[#4a342a]">
                                {
                                    orders.filter(
                                        (order) =>
                                            String(order.status || 'Pending')
                                                .toLowerCase() === 'pending',
                                    ).length
                                }
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#e8dfd3] bg-[#fffdf9] p-5 shadow-sm">
                            <p className="text-sm text-[#79685b]">
                                Delivered Orders
                            </p>
                            <p className="mt-2 text-3xl font-semibold text-[#4a342a]">
                                {
                                    orders.filter(
                                        (order) =>
                                            String(order.status || '')
                                                .toLowerCase() === 'delivered',
                                    ).length
                                }
                            </p>
                        </div>
                    </section>

                    <section className="overflow-hidden rounded-xl border border-[#e8dfd3] bg-[#fffdf9] shadow-sm">
                        <div className="border-b border-[#e9dfd3] px-5 py-5 md:px-7">
                            <h2 className="font-serif text-2xl text-[#4a342a]">
                                Order History
                            </h2>
                            <p className="mt-1 text-sm text-[#79685b]">
                                Your purchases and their current status.
                            </p>
                        </div>

                        {orders.length === 0 ? (
                            <div className="px-6 py-16 text-center">
                                <span className="text-5xl text-[#bba38a]">
                                    ✧
                                </span>

                                <h3 className="mt-4 font-serif text-2xl">
                                    No Orders Yet
                                </h3>

                                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#79685b]">
                                    Your purchases will appear here once you
                                    place your first order.
                                </p>

                                <Link
                                    href="/products"
                                    className="mt-6 inline-flex items-center gap-3 rounded-xl bg-[#604333] px-7 py-3 text-sm text-white transition hover:bg-[#795844]"
                                >
                                    Shop Now <span>→</span>
                                </Link>
                            </div>
                        ) : (
                            <div className="divide-y divide-[#e9dfd3]">
                                {orders.map((order) => (
                                    <article
                                        key={order.id}
                                        className="p-5 transition hover:bg-[#fcf8f1] md:p-7"
                                    >
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.2em] text-[#95816e]">
                                                    Order Number
                                                </p>

                                                <h3 className="mt-2 text-lg font-semibold text-[#4a342a]">
                                                    {order.order_number ||
                                                        `ORD-${order.id}`}
                                                </h3>

                                                <p className="mt-1 text-sm text-[#79685b]">
                                                    {order.created_at
                                                        ? new Date(
                                                              order.created_at,
                                                          ).toLocaleDateString(
                                                              'en-PH',
                                                              {
                                                                  year: 'numeric',
                                                                  month: 'short',
                                                                  day: 'numeric',
                                                              },
                                                          )
                                                        : 'Date unavailable'}
                                                </p>
                                            </div>

                                            <span
                                                className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle(order.status)}`}
                                            >
                                                {formatStatus(order.status)}
                                            </span>
                                        </div>

                                        <div className="mt-6">
                                            <h4 className="text-sm font-semibold text-[#4a342a]">
                                                Order Items
                                            </h4>

                                            {order.items?.length > 0 ? (
                                                <div className="mt-3 space-y-4">
                                                    {order.items.map((item) => (
                                                        <div
                                                            key={item.id}
                                                            className="flex items-start justify-between gap-4"
                                                        >
                                                            <div>
                                                                <p className="text-sm font-medium text-[#4a342a]">
                                                                    {item.product?.name ||
                                                                        item.product_name ||
                                                                        item.name ||
                                                                        'Product'}
                                                                </p>

                                                                <p className="mt-1 text-xs text-[#79685b]">
                                                                    Quantity:{' '}
                                                                    {item.quantity || 1}
                                                                </p>
                                                            </div>

                                                            <p className="whitespace-nowrap text-sm font-medium text-[#604333]">
                                                                {money(
                                                                    item.subtotal ??
                                                                        Number(item.price || 0) *
                                                                            Number(item.quantity || 1),
                                                                )}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="mt-2 text-sm text-[#79685b]">
                                                    Order item details unavailable.
                                                </p>
                                            )}
                                        </div>

                                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#e9dfd3] pt-4">
                                            <p className="text-sm text-[#79685b]">
                                                Total Amount
                                            </p>

                                            <p className="text-xl font-semibold text-[#604333]">
                                                {money(order.total_amount)}
                                            </p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </section>

                    <div className="mt-8 flex justify-center">
                        <Link
                            href="/products"
                            className="inline-flex items-center gap-3 rounded-xl border border-[#604333] px-7 py-3 text-sm text-[#604333] transition hover:bg-[#604333] hover:text-white"
                        >
                            Continue Shopping <span>→</span>
                        </Link>
                    </div>
                </main>

                <footer className="mt-8 border-t border-[#e8dfd3] bg-[#fcf8f1] px-6 py-8">
                    <div className="mx-auto flex max-w-[1300px] flex-wrap items-center justify-between gap-5">
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
