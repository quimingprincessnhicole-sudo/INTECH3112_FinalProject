import { useEffect, useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';

export default function Products({ products = [] }) {
    const [showForm, setShowForm] = useState(false);
    const [showArchived, setShowArchived] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        clearErrors,
    } = useForm({
        name: '',
        description: '',
        price: '',
        stock: '',
        image: null,
        is_archived: false,
    });

    useEffect(() => {
        return () => {
            if (imagePreview?.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const visibleProducts = products.filter(
        (product) => Boolean(product.is_archived) === showArchived
    );

    const inputClass =
        'w-full rounded-lg border border-[#dfd1c2] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#79563d] focus:ring-1 focus:ring-[#79563d]';

    const closeForm = () => {
        setShowForm(false);
        setEditingProduct(null);
        setImagePreview(null);
        reset();
        clearErrors();
    };

    const openAddForm = () => {
        reset();
        clearErrors();
        setEditingProduct(null);
        setImagePreview(null);
        setShowForm(true);
    };

    const openEditForm = (product) => {
        reset();
        clearErrors();
        setEditingProduct(product);

        setData({
            name: product.name || '',
            description: product.description || '',
            price: product.price ?? '',
            stock: product.stock ?? '',
            image: null,
            is_archived: Boolean(product.is_archived),
        });

        setImagePreview(
            product.image
                ? `/storage/${product.image.replace(/^\/?storage\//, '')}`
                : null
        );

        setShowForm(true);
    };

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const allowedTypes = ['image/jpeg', 'image/png'];

        if (!allowedTypes.includes(file.type)) {
            setData('image', null);
            event.target.value = '';
            alert('Please upload a JPG, JPEG, or PNG image.');
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setData('image', null);
            event.target.value = '';
            alert('Image must not exceed 5 MB.');
            return;
        }

        setData('image', file);
        setImagePreview(URL.createObjectURL(file));
    };

    const submitForm = (event) => {
        event.preventDefault();

        if (editingProduct) {
            router.post(
                `/admin/products/${editingProduct.id}`,
                {
                    ...data,
                    _method: 'put',
                },
                {
                    forceFormData: true,
                    onSuccess: () => closeForm(),
                }
            );
        } else {
            post('/admin/products', {
                forceFormData: true,
                onSuccess: () => closeForm(),
            });
        }
    };

    const archiveProduct = (product) => {
        if (confirm(`Make "${product.name}" unavailable?`)) {
            router.patch(`/admin/products/${product.id}/archive`);
        }
    };

    const restoreProduct = (product) => {
        if (confirm(`Make "${product.name}" available again?`)) {
            router.patch(`/admin/products/${product.id}/restore`);
        }
    };

    const deleteProduct = (product) => {
        if (
            confirm(
                `Permanently delete "${product.name}"? This action cannot be undone.`
            )
        ) {
            router.delete(`/admin/products/${product.id}`);
        }
    };

    const buttonBase =
        'rounded-lg border px-3 py-2 text-xs font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1';

    return (
        <>
            <Head title="Products | Candelite Admin" />

            <div className="admin-page min-h-screen">
                {/* ADMIN HEADER */}
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
                        <Link href="/admin/products" className="active">
                            Products
                        </Link>
                        <Link href="/admin/orders">Orders</Link>
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
                    {/* PAGE HEADING */}
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <p className="admin-eyebrow">
                                CANDELITE ADMINISTRATION
                            </p>
                            <h1 className="mt-2 text-3xl font-semibold">
                                Products
                            </h1>
                            <p className="admin-subtitle mt-1">
                                Manage your candle collection and inventory.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={openAddForm}
                            className="rounded-lg bg-[#4a342a] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#634737]"
                        >
                            + Add Product
                        </button>
                    </div>

                    {/* PRODUCT FILTER */}
                    <div className="mt-8 flex flex-col justify-between gap-4 rounded-xl border border-[#e8ddd1] bg-white p-5 sm:flex-row sm:items-center">
                        <div>
                            <p className="text-sm text-[#8b7768]">
                                {showArchived
                                    ? 'Unavailable Products'
                                    : 'Available Products'}
                            </p>
                            <p className="mt-1 text-2xl font-semibold text-[#4a342a]">
                                {visibleProducts.length}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowArchived(!showArchived)}
                            className="rounded-lg border border-[#dfd1c2] px-4 py-2.5 text-sm font-medium text-[#604333] transition hover:bg-[#f8f5f0]"
                        >
                            {showArchived
                                ? 'View Available Products'
                                : 'View Unavailable Products'}
                        </button>
                    </div>

                    {/* PRODUCTS TABLE */}
                    <div className="mt-6 overflow-hidden rounded-xl border border-[#e8ddd1] bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1000px] text-left text-sm">
                                <thead className="bg-[#f1e9df] text-[#634737]">
                                    <tr>
                                        <th className="px-5 py-4 font-semibold">
                                            Image
                                        </th>
                                        <th className="px-5 py-4 font-semibold">
                                            Product
                                        </th>
                                        <th className="px-5 py-4 font-semibold">
                                            Price
                                        </th>
                                        <th className="px-5 py-4 font-semibold">
                                            Stock
                                        </th>
                                        <th className="px-5 py-4 font-semibold">
                                            Status
                                        </th>
                                        <th className="px-5 py-4 font-semibold">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-[#eee5dc]">
                                    {visibleProducts.map((product) => (
                                        <tr
                                            key={product.id}
                                            className="transition hover:bg-[#fcfaf7]"
                                        >
                                            <td className="px-5 py-4">
                                                {product.image ? (
                                                    <img
                                                        src={`/storage/${product.image.replace(/^\/?storage\//, '')}`}
                                                        alt={product.name}
                                                        className="h-16 w-16 rounded-lg border border-[#eee5dc] object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#f1e9df] text-xs text-[#9b795e]">
                                                        No image
                                                    </div>
                                                )}
                                            </td>

                                            <td className="max-w-xs px-5 py-4">
                                                <p className="font-semibold text-[#4a342a]">
                                                    {product.name}
                                                </p>
                                                <p className="mt-1 line-clamp-2 text-xs text-[#9b897a]">
                                                    {product.description ||
                                                        'No description'}
                                                </p>
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4 font-medium text-[#4a342a]">
                                                ₱
                                                {Number(
                                                    product.price || 0
                                                ).toFixed(2)}
                                            </td>

                                            <td className="px-5 py-4">
                                                {product.stock}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
                                                        product.is_archived
                                                            ? 'bg-gray-100 text-gray-600'
                                                            : 'bg-green-50 text-green-700'
                                                    }`}
                                                >
                                                    {product.is_archived
                                                        ? 'Unavailable'
                                                        : 'Available'}
                                                </span>
                                            </td>

                                            {/* ACTION BUTTONS */}
                                            <td className="px-5 py-4">
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            openEditForm(product)
                                                        }
                                                        className={`${buttonBase} border-[#79563d] bg-white text-[#79563d] hover:bg-[#79563d] hover:text-white focus:ring-[#79563d]`}
                                                    >
                                                        Edit
                                                    </button>

                                                    {product.is_archived ? (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                restoreProduct(
                                                                    product
                                                                )
                                                            }
                                                            className={`${buttonBase} border-green-700 bg-white text-green-700 hover:bg-green-700 hover:text-white focus:ring-green-700`}
                                                        >
                                                            Make Available
                                                        </button>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                archiveProduct(
                                                                    product
                                                                )
                                                            }
                                                            className={`${buttonBase} border-orange-600 bg-white text-orange-700 hover:bg-orange-600 hover:text-white focus:ring-orange-600`}
                                                        >
                                                            Make Unavailable
                                                        </button>
                                                    )}

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteProduct(product)
                                                        }
                                                        className={`${buttonBase} border-red-600 bg-white text-red-700 hover:bg-red-600 hover:text-white focus:ring-red-600`}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                    {visibleProducts.length === 0 && (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="px-5 py-12 text-center"
                                            >
                                                <div className="text-3xl text-[#9b795e]">
                                                    ✧
                                                </div>
                                                <p className="mt-3 font-medium text-[#604333]">
                                                    No{' '}
                                                    {showArchived
                                                        ? 'unavailable'
                                                        : 'available'}{' '}
                                                    products yet.
                                                </p>
                                                <p className="mt-1 text-sm text-[#9b897a]">
                                                    {showArchived
                                                        ? 'Products marked unavailable will appear here.'
                                                        : 'Add a product to showcase your candle collection.'}
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <footer className="admin-footer">
                        <span>✧ Candelite</span>
                        <span>Made with warmth &amp; light.</span>
                    </footer>
                </main>
            </div>

            {/* ADD / EDIT PRODUCT MODAL */}
            {showForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/40 p-4">
                    <div className="my-8 w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-[#9b795e]">
                                    Candelite Inventory
                                </p>
                                <h2 className="mt-1 text-xl font-semibold text-[#4a342a]">
                                    {editingProduct
                                        ? 'Edit Product'
                                        : 'Add New Product'}
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={closeForm}
                                className="rounded-full px-3 py-1 text-2xl text-[#8b7768] transition hover:bg-[#f1e9df]"
                                aria-label="Close form"
                            >
                                ×
                            </button>
                        </div>

                        <form
                            onSubmit={submitForm}
                            className="mt-6 space-y-4"
                        >
                            <div>
                                <label className="mb-1 block text-sm font-medium text-[#604333]">
                                    Product Name *
                                </label>
                                <input
                                    className={inputClass}
                                    value={data.name}
                                    onChange={(e) =>
                                        setData('name', e.target.value)
                                    }
                                    required
                                />
                                {errors.name && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.name}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-[#604333]">
                                    Description
                                </label>
                                <textarea
                                    className={inputClass}
                                    rows="3"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                />
                                {errors.description && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.description}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-[#604333]">
                                        Price (₱) *
                                    </label>
                                    <input
                                        className={inputClass}
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        value={data.price}
                                        onChange={(e) =>
                                            setData('price', e.target.value)
                                        }
                                        required
                                    />
                                    {errors.price && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.price}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-[#604333]">
                                        Stock *
                                    </label>
                                    <input
                                        className={inputClass}
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={data.stock}
                                        onChange={(e) =>
                                            setData('stock', e.target.value)
                                        }
                                        required
                                    />
                                    {errors.stock && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.stock}
                                        </p>
                                    )}
                                    {errors.stock && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.stock}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-[#604333]">
                                    Product Image (JPG, JPEG, PNG)
                                </label>
                                <input
                                    className={`${inputClass} file:mr-3 file:rounded-md file:border-0 file:bg-[#f1e9df] file:px-3 file:py-2 file:text-sm file:text-[#4a342a]`}
                                    type="file"
                                    accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                                    onChange={handleImageChange}
                                />
                                <p className="mt-1 text-xs text-[#9b897a]">
                                    Optional. Maximum file size: 5 MB.
                                    {editingProduct &&
                                        ' Leave empty to keep the current image.'}
                                </p>

                                {errors.image && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.image}
                                    </p>
                                )}

                                {imagePreview && (
                                    <div className="mt-3">
                                        <p className="mb-2 text-xs font-medium text-[#79563d]">
                                            Image Preview
                                        </p>
                                        <img
                                            src={imagePreview}
                                            alt="Product preview"
                                            className="h-36 w-36 rounded-xl border border-[#e8ddd1] object-cover"
                                        />
                                    </div>
                                )}
                            </div>

                            {editingProduct && (
                                <label className="flex items-center gap-2 text-sm text-[#604333]">
                                    <input
                                        type="checkbox"
                                        checked={Boolean(data.is_archived)}
                                        onChange={(e) =>
                                            setData(
                                                'is_archived',
                                                e.target.checked
                                            )
                                        }
                                    />
                                    Mark product as unavailable
                                </label>
                            )}

                            <div className="flex justify-end gap-3 border-t border-[#eee5dc] pt-4">
                                <button
                                    type="button"
                                    onClick={closeForm}
                                    className="rounded-lg border border-[#dfd1c2] px-4 py-2.5 text-sm font-medium text-[#604333] transition hover:bg-[#f8f5f0]"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-[#4a342a] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#634737] disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing
                                        ? 'Saving...'
                                        : editingProduct
                                          ? 'Save Changes'
                                          : 'Add Product'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}