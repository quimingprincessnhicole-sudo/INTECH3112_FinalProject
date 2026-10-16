import { Head, Link, router } from '@inertiajs/react';

export default function Home({
    stats = {},
    recentProducts = [],
    recentOrders = [],
}) {
    const cards = [
        { label: 'Total Products', value: stats.totalProducts ?? 0, icon: '✧' },
        { label: 'Pending Orders', value: stats.pendingOrders ?? 0, icon: '◷' },
        { label: 'Total Customers', value: stats.totalCustomers ?? 0, icon: '♧' },
    ];

    const money = (value) =>
        Number(value ?? 0).toLocaleString('en-PH', {
            style: 'currency',
            currency: 'PHP',
        });

    const imageUrl = (image) => {
        if (!image) return null;
        if (image.startsWith('http://') || image.startsWith('https://')) return image;
        return `/storage/${image.replace(/^\/?storage\//, '')}`;
    };

    return (
        <>
            <Head title="Admin Dashboard | Candelite" />

            <div className="admin-page">
                <header className="admin-header">
                    <Link href="/admin" className="admin-brand">
                        <span className="admin-brand-icon">✧</span>
                        <span>
                            <strong>Candelite</strong>
                            <small>GLOW WITH THE FLOW</small>
                        </span>
                    </Link>

                    <nav className="admin-nav">
                        <Link href="/admin" className="active">Home</Link>
                        <Link href="/admin/products">Products</Link>
                        <Link href="/admin/orders">Orders</Link>
                        <Link href="/admin/customers">Customers</Link>
                    </nav>

                    <div className="admin-header-actions">
                        <span className="admin-avatar">A</span>
                        <span className="admin-profile-label">Administrator</span>
                        <button
                            type="button"
                            className="admin-logout-button"
                            onClick={() => router.post('/logout')}
                        >
                            Log Out
                        </button>
                    </div>
                </header>

                <main className="admin-main">
                    <section className="admin-welcome">
                        <div>
                            <p className="admin-eyebrow">YOUR CANDLE STORE AT A GLANCE</p>
                            <h1>Welcome back, Admin <span>✧</span></h1>
                            <p className="admin-subtitle">
                                Here's what's happening with your store today.
                            </p>
                        </div>

                        <div className="admin-date">
                            <span>✧</span>
                            <div>
                                <small>TODAY'S DATE</small>
                                <strong>
                                    {new Date().toLocaleDateString('en-US', {
                                        month: 'long',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </strong>
                            </div>
                        </div>
                    </section>

                    <section className="admin-stats">
                        {cards.map((stat) => (
                            <article className="admin-stat-card" key={stat.label}>
                                <div className="admin-stat-top">
                                    <span>{stat.label}</span>
                                    <span className="admin-stat-icon">{stat.icon}</span>
                                </div>
                                <strong className="admin-stat-value">{stat.value}</strong>
                                <p>Live database information</p>
                            </article>
                        ))}
                    </section>

                    <section className="admin-content-grid">
                        <article className="admin-panel">
                            <div className="admin-panel-heading">
                                <div>
                                    <p className="admin-eyebrow">KEEP EVERYTHING IN CHECK</p>
                                    <h2>Recent Orders</h2>
                                </div>
                                <Link href="/admin/orders" className="admin-text-link">
                                    View all →
                                </Link>
                            </div>

                            {recentOrders.length ? (
                                <div className="space-y-3">
                                    {recentOrders.map((order) => (
                                        <div key={order.id} className="flex items-center justify-between gap-3 border-b py-3">
                                            <div>
                                                <strong>{order.order_number || `Order #${order.id}`}</strong>
                                                <p className="text-sm">
                                                    {order.user?.name || 'Customer'}
                                                </p>
                                                <small>{order.status}</small>
                                            </div>
                                            <strong>{money(order.total_amount)}</strong>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="admin-empty">
                                    <span>♧</span>
                                    <h3>Your orders will appear here</h3>
                                    <p>New customer orders will be displayed in this section.</p>
                                </div>
                            )}
                        </article>

                        <article className="admin-panel">
                            <div className="admin-panel-heading">
                                <div>
                                    <p className="admin-eyebrow">YOUR SIGNATURE COLLECTION</p>
                                    <h2>Recent Products</h2>
                                </div>
                                <Link href="/admin/products" className="admin-text-link">
                                    View all →
                                </Link>
                            </div>

                            {recentProducts.length ? (
                                <div className="space-y-3">
                                    {recentProducts.map((product) => (
                                        <div key={product.id} className="flex items-center gap-3 border-b py-3">
                                            {imageUrl(product.image) ? (
                                                <img
                                                    src={imageUrl(product.image)}
                                                    alt={product.name}
                                                    className="h-16 w-16 rounded object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-16 w-16 items-center justify-center rounded bg-[#eee6db]">
                                                    ✧
                                                </div>
                                            )}

                                            <div className="min-w-0 flex-1">
                                                <strong className="block truncate">{product.name}</strong>
                                                <p className="text-sm">{money(product.price)}</p>
                                                <small>Stock: {product.stock}</small>
                                            </div>
                                        </div>
                                    ))}
                                    <Link href="/admin/products" className="admin-primary-button inline-block">
                                        Manage Products
                                    </Link>
                                </div>
                            ) : (
                                <div className="admin-empty">
                                    <span>✧</span>
                                    <h3>Your candles will appear here</h3>
                                    <p>Add products to showcase your candle collection.</p>
                                    <Link href="/admin/products" className="admin-primary-button">
                                        Manage Products
                                    </Link>
                                </div>
                            )}
                        </article>
                    </section>

                    <footer className="admin-footer">
                        <span>✧ Candelite</span>
                        <span>Made with warmth &amp; light.</span>
                    </footer>
                </main>
            </div>
        </>
    );
}
