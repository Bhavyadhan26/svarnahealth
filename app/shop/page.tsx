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
    tagline: 'Daily immunity support with a fresh Ayurvedic edge.',
    description:
      'Golden Immunity Shot is rooted in nature and crafted for gut, skin, hair, and total wellness.',
    ingredients: ['Gooseberry (Amla)', 'Fresh Turmeric', 'Oranges', 'Black Peppercorns', 'Curry leaves'],
    benefits: ['Better digestion', 'Healthy glowing skin', 'Stronger hair'],
    price: 'Rs. 549',
    image: '/Website_Assets/Product 1.jpeg',
    imageAlt: 'Golden Immunity Shot bottle with turmeric-inspired tones',
    cta: 'Add to Cart'
  },
  {
    name: 'Svarna Shots',
    tagline: 'Designed for modern lifestyle and hectic mornings.',
    description:
      'Svarna Shots combine nutrient-rich botanicals in one clean daily ritual. Crafted with care for people who want simple wellness without guesswork.',
    ingredients: ['Amla', 'Turmeric', 'Beetroot', 'Apple', 'Carrot', 'Black Pepper'],
    benefits: ['Boosts daily energy', 'Supports immunity', 'Easy morning ritual'],
    price: 'Rs. 599',
    image: '/Website_Assets/Product 2.jpeg',
    imageAlt: 'Svarna Shots drink with fresh ingredients',
    cta: 'Add to Cart'
  },
  {
    name: 'Green Elixir Shots',
    tagline: 'A crisp green reset for gut and immunity.',
    description:
      'Green Elixir Shots bring together two potent ingredients for a clean, focused formulation. Perfect for daily drinkers who want clarity and consistency.',
    ingredients: ['Gooseberry (Amla)', 'Curry leaves'],
    benefits: ['Supports gut comfort', 'Boosts natural defenses', 'Helps daily detox'],
    price: 'Rs. 629',
    image: '/Website_Assets/Product 3.jpeg',
    imageAlt: 'Green Elixir Shots with gooseberry and curry leaves',
    cta: 'Add to Cart'
  },
  {
    name: 'ABC Glow Shot',
    tagline: 'Fruit and botanical balance for visible everyday glow.',
    description:
      'ABC Glow Shot is crafted for skin and wellness seekers who value clean ingredients. A vibrant blend to support your busy routine with ease.',
    ingredients: ['Apple', 'Beetroot', 'Carrot', 'Gooseberry (Amla)', 'Curry leaves'],
    benefits: ['Supports glowing skin', 'Nourishes hair health', 'Daily wellness support'],
    price: 'Rs. 589',
    image: '/Website_Assets/Product 4.jpeg',
    imageAlt: 'ABC Glow Shot with apple beetroot carrot and herbs',
    cta: 'Add to Cart'
  }
];

const features = [
  {
    title: 'Clean Ingredients',
    body: 'No color, no preservatives, and no added salt or sugar.'
  },
  {
    title: 'Rooted in Nature',
    body: 'Fresh botanicals inspired by Ayurveda and crafted for daily use.'
  },
  {
    title: 'Crafted for Wellness',
    body: 'Crafted for gut, skin, hair, and overall wellness with consistent daily support.'
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
            SIP THE GOLD.
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
                <div className={`${imageColumn} group relative overflow-hidden rounded-[1.5rem] border border-text/12 bg-text/6 shadow-[0_20px_60px_rgba(0,0,0,0.24)]`}>
                  <Image
                    src={product.image}
                    alt={product.imageAlt}
                    width={900}
                    height={900}
                    className="h-[18.5rem] w-full object-contain transition duration-700 ease-out group-hover:scale-[1.05] sm:h-[22rem]"
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
                    <p className="rounded-full border border-text/12 bg-text/5 px-3 py-1 text-xs uppercase tracking-[0.22em] text-text/70">
                      500ml lasts 15 days
                    </p>
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

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
          >
            <p className="text-[0.72rem] uppercase tracking-[0.42em] text-text/45">Experience</p>
            <h3 className="mt-4 font-display text-4xl leading-tight text-text/94 sm:text-5xl">How to enjoy your drink</h3>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-text/72 sm:text-base">
              A four-step Svarna ritual designed for hectic mornings, clean habits, and long-term wellness consistency.
            </p>
            {/* <div className="mt-8 rounded-[1.6rem] border border-text/10 bg-[linear-gradient(180deg,rgb(var(--color-text)/0.05),rgb(var(--color-text)/0.02))] p-6 backdrop-blur-md sm:p-7">
              <p className="text-[0.68rem] uppercase tracking-[0.32em] text-text/45">Who needs it</p>
              <p className="mt-3 text-sm leading-7 text-text/74">
                Busy professionals, fitness lovers, entrepreneurs, skin and gut health seekers, and anyone wanting simple daily wellness.
              </p>
            </div> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="relative"
          >
            <div className="pointer-events-none absolute bottom-6 left-8 top-6 w-px bg-[linear-gradient(180deg,rgba(205,165,136,0.2),rgba(205,165,136,0.7),rgba(205,165,136,0.2))]" />
            <div className="grid gap-4 sm:gap-5">
              {[
                {
                  step: '01',
                  title: 'Shake the bottle well',
                  body: 'Natural ingredients settle. Give it a good shake before every use.'
                },
                {
                  step: '02',
                  title: 'Pour 30 ml',
                  body: 'Fill one shot glass with your daily dose for easy consistency.'
                },
                {
                  step: '03',
                  title: 'Drink on an empty stomach',
                  body: 'Best enjoyed first thing in the morning for a clean wellness start.'
                },
                {
                  step: '04',
                  title: 'Now go run the world',
                  body: 'Small daily habits. Big long term results.'
                }
              ].map((item) => (
                <article
                  key={item.step}
                  className="relative ml-5 rounded-[1.4rem] border border-text/10 bg-[linear-gradient(180deg,rgb(var(--color-text)/0.06),rgb(var(--color-text)/0.03))] px-5 py-4 backdrop-blur-md"
                >
                  <span className="absolute -left-8 top-5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-gold/35 bg-[rgb(var(--color-primary))] text-[0.62rem] font-semibold tracking-[0.08em] text-gold">
                    {item.step}
                  </span>
                  <h4 className="font-display text-2xl leading-tight text-text/92">{item.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-text/72">{item.body}</p>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
