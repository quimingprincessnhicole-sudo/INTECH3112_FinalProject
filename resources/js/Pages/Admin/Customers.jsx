import { Head, Link, router } from '@inertiajs/react';

export default function Customers({ customers = [] }) {
    return (
        <>
            <Head title="Customers | Candelite Admin" />

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
                        <Link href="/admin/orders">Orders</Link>
                        <Link href="/admin/customers" className="active">Customers</Link>
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
                    <div>
                        <p className="admin-eyebrow">CUSTOMER MANAGEMENT</p>
                        <h1 className="mt-2 text-3xl font-semibold">Customers</h1>
                        <p className="admin-subtitle mt-2">
                            View registered Candelite customers and their contact details.
                        </p>
                    </div>

                    <div className="mt-8 rounded-xl border border-[#E7DED3] bg-white p-5">
                        <p className="text-sm text-[#806B5D]">
                            Registered Customers
                        </p>
                        <p className="mt-2 text-3xl font-semibold">
                            {customers.length}
                        </p>
                    </div>

                    <section className="mt-8 overflow-hidden rounded-xl border border-[#E7DED3] bg-white">
                        <div className="border-b border-[#E7DED3] p-5">
                            <h2 className="text-lg font-semibold">Customer List</h2>
                        </div>

                        {customers.length === 0 ? (
                            <div className="px-6 py-16 text-center">
                                <div className="text-4xl">👥</div>
                                <h3 className="mt-4 font-semibold">
                                    No customers yet
                                </h3>
                                <p className="mt-2 text-sm text-[#806B5D]">
                                    Registered customer accounts will appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-[#F8F5F0] text-[#806B5D]">
                                        <tr>
                                            <th className="px-5 py-4">Customer</th>
                                            <th className="px-5 py-4">Email</th>
                                            <th className="px-5 py-4">Phone</th>
                                            <th className="px-5 py-4">Address</th>
                                            <th className="px-5 py-4">Registered</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-[#EEE6DD]">
                                        {customers.map((customer) => (
                                            <tr key={customer.id} className="hover:bg-[#FCFAF7]">
                                                <td className="px-5 py-4 font-medium">
                                                    {customer.name ||
                                                        `${customer.first_name || ''} ${customer.last_name || ''}`.trim() ||
                                                        'Unnamed customer'}
                                                </td>
                                                <td className="px-5 py-4">
                                                    {customer.email}
                                                </td>
                                                <td className="px-5 py-4">
                                                    {customer.phone || '—'}
                                                </td>
                                                <td className="px-5 py-4">
                                                    {customer.address || '—'}
                                                </td>
                                                <td className="whitespace-nowrap px-5 py-4">
                                                    {customer.created_at
                                                        ? new Date(customer.created_at).toLocaleDateString('en-PH')
                                                        : '—'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
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