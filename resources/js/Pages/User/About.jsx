import { Head, Link, router } from '@inertiajs/react';

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
    const active =
        'rounded-xl bg-[#eee3d1] px-4 py-2 text-[#59483d]';
    const inactive =
        'rounded-xl px-4 py-2 text-[#59483d] transition hover:bg-[#eee3d1]';

    return (
        <header className="sticky top-0 z-30 border-b border-[#e8dfd3] bg-[#fcf8f1]/95 shadow-sm backdrop-blur">
            <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-5 px-6 py-4 lg:px-10">
                <Brand />

                <nav className="flex flex-wrap items-center justify-center gap-2 text-sm md:gap-5">
                    <Link href="/home" className={inactive}>Home</Link>
                    <Link href="/about" className={active}>About Us</Link>
                    <Link href="/products" className={inactive}>Products</Link>
                    <a href="#contact" className={inactive}>Contact Us</a>
                </nav>

                <div className="flex items-center gap-4 text-[#553b2e]">
                    <Link href="/products" aria-label="Browse products" className="text-2xl hover:opacity-60">▤</Link>
                    <Link href="/products" aria-label="Shopping cart" className="text-2xl hover:opacity-60">🛒</Link>
                    <span className="font-serif text-2xl">C</span>
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

const features = [
    {
        symbol: '♧',
        title: 'Handcrafted with Care',
        description: 'Made in small batches for better quality and attention to detail.',
    },
    {
        symbol: '♢',
        title: 'Premium Ingredients',
        description: 'We use high-quality waxes, fragrances, and essential oils.',
    },
    {
        symbol: '♡',
        title: 'Designed for Your Space',
        description: 'Beautiful scents that create a cozy and relaxing atmosphere.',
    },
    {
        symbol: '❋',
        title: 'A Kinder Tomorrow',
        description: 'Eco-conscious packaging for a more sustainable future.',
    },
];

const values = [
    {
        symbol: '✧',
        title: 'Quality',
        description: 'Thoughtfully crafted, never rushed.',
    },
    {
        symbol: '♡',
        title: 'Mindfulness',
        description: 'Encouraging you to slow down and be present.',
    },
    {
        symbol: '♧',
        title: 'Sustainability',
        description: 'Better choices for a brighter tomorrow.',
    },
];

export default function About() {
    const candleImage =
        'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1600&q=85';

    return (
        <>
            <Head title="About Us | Candelite" />

            <div className="min-h-screen bg-[#f8f3ea] text-[#49372d]">
                <Navbar />

                <main>
                    <section className="mx-auto grid max-w-[1500px] items-center gap-8 px-6 py-8 md:grid-cols-[0.9fr_1.1fr] md:px-10 lg:px-16">
                        <div className="py-3">
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#95816e]">
                                About Candelite
                            </p>

                            <h1 className="mt-2 font-serif text-4xl leading-tight md:text-5xl lg:text-6xl">
                                More Than Just Candles{' '}
                                <span className="text-[#bba38a]">✧</span>
                            </h1>

                            <p className="mt-4 leading-6 text-[#79685b]">
                                At Candelite, we believe that every candle tells a story — of comfort, calm, and little moments of happiness.
                            </p>

                            <p className="mt-3 leading-6 text-[#79685b]">
                                We create handcrafted candles using high-quality ingredients, thoughtfully designed to bring warmth and a sense of peace to your everyday life. Each scent is carefully chosen to help you slow down, breathe, and enjoy the present.
                            </p>

                            <a
                                href="#our-story"
                                className="mt-6 inline-flex items-center gap-5 rounded-xl bg-[#604333] px-8 py-3 text-sm text-white transition hover:bg-[#795844]"
                            >
                                Our Story <span className="text-lg">→</span>
                            </a>
                        </div>

                        <div className="overflow-hidden rounded-xl">
                            <img
                                src={candleImage}
                                alt="A warm candle in a peaceful, cozy setting"
                                className="h-[300px] w-full object-cover md:h-[350px] lg:h-[380px]"
                            />
                        </div>
                    </section>

                    <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-3 rounded-xl bg-[#fdf9f2] px-6 py-6 sm:grid-cols-2 md:grid-cols-4 md:px-8">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="border-[#e5d9ca] px-4 py-3 text-center sm:border-r last:border-r-0"
                            >
                                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eee3d1] text-2xl">
                                    {feature.symbol}
                                </span>
                                <h2 className="mt-3 text-sm font-medium">
                                    {feature.title}
                                </h2>
                                <p className="mx-auto mt-2 max-w-xs text-sm leading-5 text-[#79685b]">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </section>

                    <section
                        id="our-story"
                        className="mx-auto grid max-w-[1500px] items-center gap-8 px-6 py-12 md:grid-cols-[1.1fr_1fr_0.9fr] md:px-10 lg:px-16"
                    >
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#95816e]">
                                Our Values
                            </p>
                            <h2 className="mt-2 font-serif text-4xl md:text-5xl">
                                What We Stand For{' '}
                                <span className="text-[#bba38a]">✧</span>
                            </h2>
                            <p className="mt-4 text-sm leading-6 text-[#79685b]">
                                At Candelite, we are guided by a simple belief: small things can make a big difference. We stand for quality, mindfulness, and a more beautiful everyday — one candle at a time.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-4 border-y border-[#e5d9ca] py-6 md:border-y-0 md:border-x md:px-6">
                            {values.map((value) => (
                                <div key={value.title}>
                                    <span className="text-2xl">{value.symbol}</span>
                                    <h3 className="mt-2 text-xs font-semibold">{value.title}</h3>
                                    <p className="mt-2 text-xs leading-5 text-[#79685b]">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="overflow-hidden rounded-xl">
                            <img
                                src="https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=1000&q=85"
                                alt="Candle and warm natural textures"
                                className="h-[220px] w-full object-cover md:h-[250px]"
                            />
                        </div>
                    </section>

                    <section id="contact" className="border-t border-[#e8dfd3] bg-[#fdf9f2] px-6 py-8 text-center">
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#95816e]">
                            Get in touch
                        </p>
                        <h2 className="mt-2 font-serif text-3xl">
                            We would love to hear from you.
                        </h2>
                        <Link
                            href="/home#contact"
                            className="mt-4 inline-block text-sm text-[#604333] underline"
                        >
                            Contact Candelite
                        </Link>
                    </section>
                </main>
            </div>
        </>
    );
}