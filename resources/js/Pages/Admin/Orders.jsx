import { Head, Link, router } from '@inertiajs/react';

const money = (amount) =>
    new Intl.NumberFormat('en-PH', {
        style: 'currency',
        currency: 'PHP',
    }).format(Number(amount || 0));

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
    const updateStatus = (order, status) => {
        if (!status) return;

        router.patch(
            `/admin/orders/${order.id}/status`,
            { status },
            { preserveScroll: true },
        );
    };

    return (
        <>
            <Head title="Manage Orders | Candelite Admin" />

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
                        <Link href="/admin">Home</Link>
                        <Link href="/admin/products">Products</Link>
                        <Link href="/admin/orders" className="active">
                            Orders
                        </Link>
                        <Link href="/admin/customers">Customers</Link>
                    </nav>

                    <div className="admin-header-actions">
                        <span className="admin-avatar">A</span>
                        <span className="admin-profile-label">
                            Administrator
                        </span>
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
                            <p className="text-sm uppercase tracking-widest text-[#95816e]">
                                Candelite Administration
                            </p>
                            <h1 className="mt-2 text-3xl font-semibold text-[#49372d]">
                                Manage Orders
                            </h1>
                            <p className="mt-2 text-sm text-[#79685b]">
                                View customer purchases and update their order
                                status.
                            </p>
                        </div>
                    </section>

                    <section className="admin-stats">
                        <div className="admin-panel">
                            <p>Total Orders</p>
                            <h2>{orders.length}</h2>
                        </div>

                        <div className="admin-panel">
                            <p>Pending Orders</p>
                            <h2>
                                {
                                    orders.filter(
                                        (order) =>
                                            String(order.status || 'Pending')
                                                .toLowerCase() === 'pending',
                                    ).length
                                }
                            </h2>
                        </div>

                        <div className="admin-panel">
                            <p>Delivered Orders</p>
                            <h2>
                                {
                                    orders.filter(
                                        (order) =>
                                            String(order.status).toLowerCase() ===
                                            'delivered',
                                    ).length
                                }
                            </h2>
                        </div>
                    </section>

                    <section className="admin-panel mt-6 overflow-hidden">
                        <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                            <div>
                                <h2 className="text-xl font-semibold text-[#49372d]">
                                    Customer Orders
                                </h2>
                                <p className="mt-1 text-sm text-[#79685b]">
                                    Review orders and manage their progress.
                                </p>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1000px] text-left text-sm">
                                <thead className="bg-[#eee3d1] text-[#604333]">
                                    <tr>
                                        <th className="px-5 py-4">Order Number</th>
                                        <th className="px-5 py-4">Customer</th>
                                        <th className="px-5 py-4">Items</th>
                                        <th className="px-5 py-4">Total</th>
                                        <th className="px-5 py-4">Date</th>
                                        <th className="px-5 py-4">Status</th>
                                        <th className="px-5 py-4">Action</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-[#eee5da]">
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="px-5 py-12 text-center text-[#79685b]"
                                            >
                                                No orders found.
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map((order) => (
                                            <tr
                                                key={order.id}
                                                className="transition hover:bg-[#fcf8f1]"
                                            >
                                                <td className="px-5 py-4 font-medium">
                                                    {order.order_number ||
                                                        `ORD-${order.id}`}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <p className="font-medium">
                                                        {order.user?.name ||
                                                            'Customer'}
                                                    </p>
                                                    <p className="mt-1 text-xs text-[#79685b]">
                                                        {order.user?.email || ''}
                                                    </p>
                                                </td>

                                                <td className="px-5 py-4">
                                                    {order.items?.length || 0} item(s)
                                                </td>

                                                <td className="px-5 py-4 font-medium">
                                                    {money(order.total_amount)}
                                                </td>

                                                <td className="px-5 py-4 text-[#79685b]">
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
                                                        : '—'}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle(order.status)}`}
                                                    >
                                                        {formatStatus(order.status)}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <select
                                                        value={[
                                                            'Approved',
                                                            'For Delivery',
                                                            'Delivered',
                                                        ].includes(order.status)
                                                            ? order.status
                                                            : ''}
                                                        onChange={(event) =>
                                                            updateStatus(
                                                                order,
                                                                event.target.value,
                                                            )
                                                        }
                                                        className="w-40 rounded-lg border border-[#ded1c2] bg-white px-3 py-2 text-sm text-[#49372d] outline-none focus:border-[#604333]"
                                                    >
                                                        <option value="" disabled>
                                                            Update status
                                                        </option>
                                                        <option value="Approved">
                                                            Approved
                                                        </option>
                                                        <option value="For Delivery">
                                                            For Delivery
                                                        </option>
                                                        <option value="Delivered">
                                                            Delivered
                                                        </option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>

                <footer className="admin-footer">
                    <p>Candelite — Glow with the Flow</p>
                </footer>
            </div>
        </>
    );
}
