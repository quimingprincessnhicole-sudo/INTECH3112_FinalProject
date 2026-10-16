
import { Head, Link, router } from '@inertiajs/react';

const imageUrl = (image) => {
    if (!image) return null;

    if (image.startsWith('http://') || image.startsWith('https://')) {
        return image;
    }

    return `/storage/${image.replace(/^\/?storage\//, '')}`;
};

const heroImage =
    'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1800&q=85';

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
                    <Link
                        href="/home"
                        className={`${navClass} bg-[#eee3d1]`}
                    >
                        Home
                    </Link>

                    <a href="#about" className={navClass}>
                        About Us
                    </a>

                    <Link href="/products" className={navClass}>
                        Products
                    </Link>

                    <Link href="/my-orders" className={navClass}>
                        My Orders
                    </Link>

                    <a href="#contact" className={navClass}>
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

export default function Home({ featuredProducts = [] }) {
    return (
        <>
            <Head title="Home | Candelite" />

            <div className="min-h-screen bg-[#f8f3ea] text-[#49372d]">
                <Navbar />

                <main>
                    <section className="relative min-h-[360px] overflow-hidden bg-[#eee3d1] md:min-h-[410px]">
                        <img
                            src={heroImage}
                            alt="A warm, softly lit candle"
                            className="absolute inset-0 h-full w-full object-cover"
                        />

                        <div className="absolute inset-0 bg-gradient-to-r from-[#f7f0e5] via-[#f7f0e5]/90 to-transparent" />

                        <div className="relative mx-auto flex min-h-[360px] max-w-[1500px] items-center px-7 py-14 md:min-h-[410px] md:px-16">
                            <div className="max-w-xl">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#8a7461]">
                                    Handcrafted candles for every mood
                                </p>

                                <h1 className="font-serif text-5xl leading-tight md:text-6xl lg:text-7xl">
                                    Light Up Your Space{' '}
                                    <span className="text-[#bba38a]">✧</span>
                                </h1>

                                <p className="mt-5 max-w-lg text-base leading-7 text-[#756354] md:text-lg">
                                    Discover our collection of handcrafted
                                    candles, made with love and designed to
                                    bring warmth, comfort, and calm to your
                                    everyday moments.
                                </p>

                                <Link
                                    href="/products"
                                    className="mt-7 inline-flex items-center gap-5 rounded-xl bg-[#604333] px-8 py-3.5 text-sm text-white transition hover:bg-[#795844]"
                                >
                                    Shop Now <span className="text-lg">→</span>
                                </Link>
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto max-w-[1400px] px-6 py-12 md:px-10 md:py-14">
                        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
                            <div>
                                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#95816e]">
                                    Our bestsellers
                                </p>

                                <h2 className="font-serif text-4xl md:text-5xl">
                                    Featured Candles{' '}
                                    <span className="text-[#bba38a]">✧</span>
                                </h2>
                            </div>

                            <Link
                                href="/products"
                                className="pb-2 text-sm text-[#604333] hover:underline"
                            >
                                View All <span className="ml-2">→</span>
                            </Link>
                        </div>

                        {featuredProducts.length === 0 ? (
                            <div className="rounded-xl border border-[#e8dfd3] bg-white/60 px-6 py-14 text-center">
                                <h3 className="font-serif text-2xl">
                                    Your next favorite scent awaits.
                                </h3>

                                <p className="mt-3 text-sm text-[#79685b]">
                                    Available candles will appear here when
                                    the admin adds products.
                                </p>

                                <Link
                                    href="/products"
                                    className="mt-5 inline-block text-sm underline"
                                >
                                    Explore the shop
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                {featuredProducts.slice(0, 4).map((product) => {
                                    const photo = imageUrl(product.image);

                                    return (
                                        <Link
                                            key={product.id}
                                            href={`/products/${product.slug}`}
                                            className="group rounded-xl border border-[#e9dfd3] bg-[#fffdf9] p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
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

                                            <div className="px-1 pb-1 pt-3">
                                                <h3 className="font-medium text-[#4d3b30] group-hover:underline">
                                                    {product.name}
                                                </h3>

                                                <p className="mt-1 font-semibold text-[#4d3b30]">
                                                    ₱
                                                    {Number(
                                                        product.price,
                                                    ).toLocaleString('en-PH', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })}
                                                </p>

                                                <div className="mt-3 rounded-md bg-[#eee3d1] px-3 py-2 text-center text-sm text-[#533c2f] transition group-hover:bg-[#e5d4bd]">
                                                    View Candle{' '}
                                                    <span className="ml-2">→</span>
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                    <section
                        id="about"
                        className="border-y border-[#e9dfd3] bg-[#fdf9f2] px-6 py-14 md:px-10 md:py-16"
                    >
                        <div className="mx-auto grid max-w-[1300px] items-center gap-8 md:grid-cols-2">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#95816e]">
                                    About Candelite
                                </p>

                                <h2 className="mt-3 font-serif text-4xl md:text-5xl">
                                    More Than Just Candles{' '}
                                    <span className="text-[#bba38a]">✧</span>
                                </h2>

                                <p className="mt-5 leading-7 text-[#79685b]">
                                    At Candelite, we believe every candle brings
                                    a little comfort, calm, and happiness. Our
                                    collection is thoughtfully chosen to make
                                    your everyday moments feel warmer.
                                </p>

                                <Link
                                    href="/products"
                                    className="mt-6 inline-flex items-center gap-4 rounded-xl bg-[#604333] px-7 py-3 text-sm text-white hover:bg-[#795844]"
                                >
                                    Explore Our Collection <span>→</span>
                                </Link>
                            </div>

                            <div className="overflow-hidden rounded-xl">
                                <img
                                    src={heroImage}
                                    alt="Candelite candle in a cozy space"
                                    className="h-[280px] w-full object-cover md:h-[320px]"
                                />
                            </div>
                        </div>

                        <div className="mx-auto mt-12 grid max-w-[1300px] grid-cols-2 gap-4 border-t border-[#e5d9ca] pt-8 text-center md:grid-cols-4">
                            {[
                                ['✧', 'Handcrafted with Care'],
                                ['♢', 'Premium Ingredients'],
                                ['♡', 'Designed for Your Space'],
                                ['❋', 'A Kinder Tomorrow'],
                            ].map(([symbol, title]) => (
                                <div key={title} className="px-3 py-3">
                                    <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#eee3d1] text-2xl">
                                        {symbol}
                                    </span>

                                    <h3 className="mt-3 text-sm font-medium">
                                        {title}
                                    </h3>

                                    <p className="mx-auto mt-2 max-w-xs text-xs leading-5 text-[#79685b]">
                                        Thoughtfully selected scents to bring
                                        warmth, calm, and comfort into your
                                        space.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section
                        id="contact"
                        className="mx-auto grid max-w-[1300px] gap-8 px-6 py-14 md:grid-cols-2 md:px-10"
                    >
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#95816e]">
                                Get in touch
                            </p>

                            <h2 className="mt-3 font-serif text-4xl md:text-5xl">
                                Contact Us{' '}
                                <span className="text-[#bba38a]">✧</span>
                            </h2>

                            <p className="mt-5 max-w-md leading-7 text-[#79685b]">
                                Have a question, concern, or special request?
                                We would love to hear from you.
                            </p>

                            <div className="mt-6 space-y-4 text-sm text-[#604d40]">
                                <p>
                                    ⌖ &nbsp; CLSU Compound, Science City of
                                    Muñoz, Nueva Ecija
                                </p>
                                <p>✉ &nbsp; support@candelite.ph</p>
                            </div>
                        </div>

                        <form
                            onSubmit={(event) => {
                                event.preventDefault();
                                window.alert(
                                    'Thank you for reaching out to Candelite!',
                                );
                            }}
                            className="space-y-4 rounded-xl border border-[#e9dfd3] bg-[#fffdf9] p-5 shadow-sm md:p-7"
                        >
                            <label className="block text-sm">
                                Full Name
                                <input
                                    required
                                    type="text"
                                    placeholder="Enter your full name"
                                    className="mt-1 w-full rounded-lg border border-[#ded1c2] bg-transparent px-3 py-2.5 outline-none focus:border-[#604333]"
                                />
                            </label>

                            <label className="block text-sm">
                                Email Address
                                <input
                                    required
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="mt-1 w-full rounded-lg border border-[#ded1c2] bg-transparent px-3 py-2.5 outline-none focus:border-[#604333]"
                                />
                            </label>

                            <label className="block text-sm">
                                Subject
                                <select
                                    required
                                    defaultValue=""
                                    className="mt-1 w-full rounded-lg border border-[#ded1c2] bg-transparent px-3 py-2.5 outline-none focus:border-[#604333]"
                                >
                                    <option value="" disabled>
                                        Select a subject
                                    </option>
                                    <option>Product inquiry</option>
                                    <option>Order concern</option>
                                    <option>Feedback</option>
                                    <option>Other</option>
                                </select>
                            </label>

                            <label className="block text-sm">
                                Message
                                <textarea
                                    required
                                    rows="4"
                                    placeholder="Type your message here..."
                                    className="mt-1 w-full resize-y rounded-lg border border-[#ded1c2] bg-transparent px-3 py-2.5 outline-none focus:border-[#604333]"
                                />
                            </label>

                            <button
                                type="submit"
                                className="w-full rounded-lg bg-[#604333] px-5 py-3 text-sm text-white transition hover:bg-[#795844]"
                            >
                                Send Message →
                            </button>
                        </form>
                    </section>
                </main>

                <footer className="border-t border-[#e8dfd3] bg-[#fcf8f1] px-6 py-8">
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
