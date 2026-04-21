'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Product = {
  name: string;
  tagline: string;
  description: string;
  ingredients: string[];
  benefits: string[];
  price: string;
  image: string;
  imageAlt: string;
  cta: string;
};

const products: Product[] = [
  {
    name: 'Golden Immunity Shot',
    tagline: 'A bright, warming ritual for resilient mornings.',
    description:
      'Golden Immunity Shot combines the depth of turmeric with gentle sweetness and spice. It is crafted to become your first sip before the day rushes in.',
    ingredients: ['Haldi (Turmeric)', 'Black Pepper', 'Raw Honey'],
    benefits: ['Supports immunity', 'Helps nutrient absorption', 'Comforts digestion'],
    price: 'Rs. 549',
    image: '/Website_Assets/Product 1.jpeg',
    imageAlt: 'Golden Immunity Shot bottle with turmeric-inspired tones',
    cta: 'Buy Now'
  },
  {
    name: 'Amla Vital Boost',
    tagline: 'Crisp vitality with a clean citrus edge.',
    description:
      'Amla Vital Boost is designed for people who want freshness without compromise. Tangy amla and citrus create a refreshing profile that feels light yet potent.',
    ingredients: ['Amla', 'Citrus Peel', 'Lemon Zest'],
    benefits: ['Rich in vitamin C', 'Daily antioxidant support', 'Helps maintain glow'],
    price: 'Rs. 599',
    image: '/Website_Assets/Product 2.jpeg',
    imageAlt: 'Amla Vital Boost drink with fresh citrus ingredients',
    cta: 'Add to Cart'
  },
  {
    name: 'Beetroot Energy Elixir',
    tagline: 'Earthy energy that carries you through the day.',
    description:
      'Beetroot Energy Elixir is a bold blend for active schedules and focused afternoons. Its layered taste feels grounded, clean, and naturally energizing.',
    ingredients: ['Beetroot', 'Lemon', 'Pink Salt'],
    benefits: ['Supports stamina', 'Promotes circulation', 'Hydration-friendly minerals'],
    price: 'Rs. 629',
    image: '/Website_Assets/Product 3.jpeg',
    imageAlt: 'Beetroot Energy Elixir styled with beetroot and lemon',
    cta: 'Buy Now'
  },
  {
    name: 'Citrus Glow Drink',
    tagline: 'Sunlit flavor for skin and wellness rituals.',
    description:
      'Citrus Glow Drink balances sweet orange notes with turmeric warmth. It is made for people who want functional nutrition that tastes vibrant and looks premium.',
    ingredients: ['Orange', 'Turmeric', 'Lime'],
    benefits: ['Supports skin radiance', 'Refreshing daytime lift', 'Immune-forward blend'],
    price: 'Rs. 589',
    image: '/Website_Assets/Product 4.jpeg',
    imageAlt: 'Citrus Glow Drink with orange and turmeric accents',
    cta: 'Add to Cart'
  },
  {
    name: 'Detox Green Fusion',
    tagline: 'A clean botanical reset, crafted for balance.',
    description:
      'Detox Green Fusion brings herbs and greens into one smooth ritual. It is tailored for mindful evenings and slow recovery days where nourishment matters most.',
    ingredients: ['Moringa', 'Mint', 'Wheatgrass'],
    benefits: ['Gentle detox support', 'Helps gut comfort', 'Botanical mineral profile'],
    price: 'Rs. 649',
    image: '/Website_Assets/Starting frame.png',
    imageAlt: 'Detox Green Fusion inspired by fresh herbs and greens',
    cta: 'Buy Now'
  }
];

const features = [
  {
    title: '100% Natural Ingredients',
    body: 'Real botanicals, cold-processed integrity, and transparent sourcing from farm to bottle.'
  },
  {
    title: 'No Preservatives',
    body: 'No unnecessary fillers. Just clean formulations designed for modern daily routines.'
  },
  {
    title: 'Freshly Crafted',
    body: 'Produced in mindful small batches to preserve taste, nutrients, and aromatic depth.'
  },
  {
    title: 'Tradition + Science',
    body: 'Ayurvedic wisdom translated through nutritional science for measurable everyday value.'
  }
];

export default function ShopPage() {
  return (
    <main className="grain bg-void text-white">
      <section className="relative overflow-hidden px-6 pb-16 pt-28 sm:px-10 lg:px-12 lg:pb-24 lg:pt-36">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[8%] top-20 h-40 w-40 rounded-full bg-[rgb(var(--color-accent)/0.22)] blur-3xl" />
          <div className="absolute right-[10%] top-28 h-48 w-48 rounded-full bg-[rgb(var(--color-secondary)/0.24)] blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-[rgb(var(--color-text)/0.08)] blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mx-auto max-w-4xl text-center"
        >
          <p className="text-[0.72rem] uppercase tracking-[0.42em] text-text/45">Shop Wellness</p>
          <h1 className="mt-5 font-display text-5xl leading-tight text-text/94 sm:text-6xl lg:text-7xl">Our Drinks</h1>
          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-text/72 sm:text-base">
            Each Svarna Health blend is crafted as a daily wellness chapter, where ingredients, flavor, and function move together in one premium ritual.
          </p>
          <div className="mt-9">
            <Link
              href="#range"
              className="inline-flex items-center gap-3 rounded-full border border-text/14 bg-text/8 px-6 py-3 text-sm font-semibold tracking-[0.22em] text-text/90 transition hover:border-text/30 hover:bg-text/14"
            >
              <span className="h-2 w-2 rounded-full bg-[rgb(var(--color-accent))] shadow-[0_0_20px_rgb(var(--color-accent)/0.9)]" />
              Explore Range
            </Link>
          </div>
        </motion.div>
      </section>

      <section id="range" className="relative mx-auto max-w-7xl space-y-14 px-6 pb-14 sm:px-10 lg:space-y-16 lg:px-12 lg:pb-20">
        {products.map((product, index) => {
          const imageColumn = index % 2 === 0 ? 'lg:order-1' : 'lg:order-2';
          const contentColumn = index % 2 === 0 ? 'lg:order-2' : 'lg:order-1';

          return (
            <motion.article
              key={product.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65 }}
              className="rounded-[2rem] border border-text/10 bg-[linear-gradient(180deg,rgb(var(--color-text)/0.05),rgb(var(--color-text)/0.02))] px-5 py-6 backdrop-blur-xl sm:px-7 sm:py-7 lg:px-10 lg:py-10"
            >
              <div className="grid gap-7 lg:grid-cols-2 lg:items-center lg:gap-10">
                <div className={`${imageColumn} group relative overflow-hidden rounded-[1.5rem] border border-text/12 shadow-[0_20px_60px_rgba(0,0,0,0.24)]`}>
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    width={900}
                    height={900}
                    className="h-[18.5rem] w-full object-cover transition duration-700 ease-out group-hover:scale-[1.05] sm:h-[22rem]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.25))]" />
                </div>

                <div className={`${contentColumn}`}>
                  <p className="text-[0.68rem] uppercase tracking-[0.34em] text-text/45">Signature Blend {index + 1}</p>
                  <h2 className="mt-3 font-display text-3xl leading-tight text-text/94 sm:text-4xl">{product.name}</h2>
                  <p className="mt-3 text-sm font-semibold tracking-[0.03em] text-[rgb(var(--color-accent))]">{product.tagline}</p>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-text/74 sm:text-base">{product.description}</p>

                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <div>
                      <p className="text-[0.68rem] uppercase tracking-[0.28em] text-text/48">Ingredients</p>
                      <ul className="mt-3 space-y-2 text-sm text-text/80">
                        {product.ingredients.map((ingredient) => (
                          <li key={ingredient} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--color-accent))]" />
                            {ingredient}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[0.68rem] uppercase tracking-[0.28em] text-text/48">Benefits</p>
                      <ul className="mt-3 space-y-2 text-sm text-text/80">
                        {product.benefits.map((benefit) => (
                          <li key={benefit} className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--color-secondary))]" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <p className="font-display text-2xl text-text/94">{product.price}</p>
                    <Link
                      href="/#contact"
                      className="inline-flex items-center rounded-full border border-text/14 bg-text/8 px-5 py-2.5 text-sm font-semibold tracking-[0.15em] text-text/90 transition hover:border-[rgb(var(--color-accent)/0.55)] hover:bg-[rgb(var(--color-accent)/0.14)]"
                    >
                      {product.cta}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </section>

      <section className="relative bg-[linear-gradient(180deg,rgba(var(--color-primary)/0.08),rgba(var(--color-secondary)/0.14))] px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-10 text-center"
          >
            <p className="text-[0.72rem] uppercase tracking-[0.42em] text-text/45">Why Our Drinks</p>
            <h3 className="mt-4 font-display text-4xl text-text/94 sm:text-5xl">Crafted With Purpose</h3>
          </motion.div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.article
                key={feature.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="rounded-[1.5rem] border border-text/10 bg-[rgb(var(--color-text)/0.04)] p-6 backdrop-blur-md"
              >
                <h4 className="font-display text-2xl text-text/92">{feature.title}</h4>
                <p className="mt-3 text-sm leading-6 text-text/72">{feature.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative px-6 py-16 sm:px-10 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <p className="text-[0.72rem] uppercase tracking-[0.42em] text-text/45">Experience</p>
            <h3 className="mt-4 font-display text-4xl leading-tight text-text/94 sm:text-5xl">Make wellness a daily habit</h3>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-text/72 sm:text-base">
              Whether it starts with a calm morning reset or follows your fitness routine, Svarna Health fits naturally into your day. Every drink is designed to feel intentional, not transactional.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-text/12 bg-text/6 px-4 py-2 text-xs uppercase tracking-[0.24em] text-text/75">Morning Routine</span>
              <span className="rounded-full border border-text/12 bg-text/6 px-4 py-2 text-xs uppercase tracking-[0.24em] text-text/75">Fitness Lifestyle</span>
              <span className="rounded-full border border-text/12 bg-text/6 px-4 py-2 text-xs uppercase tracking-[0.24em] text-text/75">Evening Recovery</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="grid gap-5 sm:grid-cols-2"
          >
            <div className="group overflow-hidden rounded-[1.5rem] border border-text/10 shadow-[0_15px_50px_rgba(0,0,0,0.22)]">
              <Image
                src="/Website_Assets/Product 2.jpeg"
                alt="Morning wellness moment with Svarna Health"
                width={900}
                height={900}
                className="h-64 w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <div className="group overflow-hidden rounded-[1.5rem] border border-text/10 shadow-[0_15px_50px_rgba(0,0,0,0.22)]">
              <Image
                src="/Website_Assets/Product 3.jpeg"
                alt="Active lifestyle visual with Svarna Health"
                width={900}
                height={900}
                className="h-64 w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
