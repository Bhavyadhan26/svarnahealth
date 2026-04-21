'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const ingredients = [
  {
    name: 'Turmeric (Haldi)',
    benefit: 'Powerful anti-inflammatory and immune booster',
    hex: '#D4AF37'
  },
  {
    name: 'Amla',
    benefit: 'Rich in Vitamin C for radiant skin and immunity',
    hex: '#7CB342'
  },
  {
    name: 'Beetroot',
    benefit: 'Enhances circulation and energizes the body',
    hex: '#C62828'
  },
  {
    name: 'Black Pepper',
    benefit: 'Enhances nutrient absorption naturally',
    hex: '#2C3E50'
  },
  {
    name: 'Orange',
    benefit: 'Citrus brightness and antioxidant protection',
    hex: '#F57C00'
  }
];

const whyChooseUs = [
  { title: '100% Natural', description: 'No synthetic ingredients, pure botanical wellness' },
  { title: 'No Preservatives', description: 'Fresh-pressed formulations without chemical additives' },
  { title: 'Science-backed', description: 'Rooted in Ayurvedic tradition and modern research' },
  { title: 'Nutrient-rich', description: 'Cold-pressed to retain maximum bioavailability' },
  { title: 'Immunity Boosting', description: 'Designed to strengthen your natural defenses' }
];

const testimonials = [
  { quote: 'Svarna Health transformed my daily ritual into pure self-care.', author: 'Arya M.' },
  { quote: 'Finally, a product that aligns with my wellness journey.', author: 'Priya K.' },
  { quote: 'The glow is real. My skin has never felt better.', author: 'Neha R.' },
  { quote: 'A luxurious wellness experience, every single day.', author: 'Aashi D.' }
];

export default function AboutPage() {
  return (
    <main className="grain bg-void text-white">
      {/* Hero Section */}
      <section className="relative flex min-h-[80dvh] w-full items-center justify-center overflow-hidden pt-24">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,rgba(205,165,136,0.3),transparent_50%)]" />
        
        <div className="relative z-10 flex w-full max-w-6xl flex-col items-center justify-center px-6 py-16 text-center sm:px-10 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <p className="mb-6 text-sm uppercase tracking-[0.3em] text-gold/80">Our Story</p>
            <h1 className="font-display text-5xl leading-tight text-text/95 sm:text-6xl md:text-7xl lg:text-8xl">
              Redefining Wellness, One Ritual at a Time
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-text/70 sm:text-base md:text-lg">
              Svarna Health blends the wisdom of ancient Ayurveda with modern convenience to create premium functional nutrition that fits seamlessly into your everyday ritual.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="#explore"
                className="group inline-flex items-center justify-center rounded-full border border-text/12 bg-text/6 px-6 py-3 text-sm font-semibold tracking-[0.22em] text-text/90 backdrop-blur-md transition-colors hover:border-gold/30 hover:bg-gold/10"
              >
                <span className="mr-3 h-2 w-2 rounded-full bg-gold shadow-[0_0_24px_rgba(205,165,136,0.9)] transition-transform group-hover:scale-125" />
                Explore Products
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Story Section */}
      <section className="relative w-full bg-[linear-gradient(180deg,rgba(var(--color-primary)/0.06),rgba(var(--color-secondary)/0.08))]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12 lg:py-28">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            {/* Left: Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative min-h-[28rem] overflow-hidden rounded-[2rem] border border-text/10"
            >
              <img
                src="/Website_Assets/Starting frame.png"
                alt="Svarna Health ingredients and ritual"
                className="h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.08),rgba(5,5,5,0.32))]" />
            </motion.div>

            {/* Right: Text */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center"
            >
              <div>
                <p className="text-[0.72rem] uppercase tracking-[0.42em] text-text/35">Our Journey</p>
                <h2 className="mt-4 font-display text-4xl leading-tight text-text/92 sm:text-5xl">
                  Why Svarna Health Exists
                </h2>
              </div>

              <div className="mt-6 space-y-5">
                <div>
                  <h3 className="font-semibold text-text/90">Who We Are</h3>
                  <p className="mt-2 text-sm leading-7 text-text/70">
                    Founded by Miss Prachi Dhanuka, a lawyer turned wellness visionary, Svarna Health brings legal rigor and ethical standards to luxury functional nutrition. We believe in complete transparency and scientific integrity.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-text/90">The Problem We Solve</h3>
                  <p className="mt-2 text-sm leading-7 text-text/70">
                    Modern lifestyles strip us of time, energy, and vitality. Quick fixes flood the market with synthetic promises. Svarna Health reimagines wellness as a daily ritual—not a burden—using nature's most potent ingredients backed by both tradition and science.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-text/90">Our Commitment</h3>
                  <p className="mt-2 text-sm leading-7 text-text/70">
                    Every bottle embodies purity, efficacy, and luxury. We source the finest ingredients, craft with cold-press precision, and deliver wellness that looks as good as it feels.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="relative w-full px-6 py-20 sm:px-10 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-center"
          >
            <p className="text-[0.72rem] uppercase tracking-[0.42em] text-text/35">Our Direction</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-text/92 sm:text-5xl">
              Mission & Vision
            </h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {[
              {
                label: 'Mission',
                title: 'Make Immunity Simple',
                body: 'Transform immunity-building from complicated wellness jargon into an elegant, accessible daily ritual that anyone can embrace.'
              },
              {
                label: 'Vision',
                title: 'Tradition Meets Tomorrow',
                body: 'Blend centuries of Ayurvedic wisdom with cutting-edge science to create premium functional nutrition for the modern conscious consumer.'
              }
            ].map((card, index) => (
              <motion.article
                key={card.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="rounded-[2rem] border border-text/10 bg-[linear-gradient(180deg,rgb(var(--color-text)/0.05),rgb(var(--color-text)/0.02))] p-8 backdrop-blur-xl lg:p-10"
              >
                <p className="text-[0.65rem] uppercase tracking-[0.34em] text-gold/70">{card.label}</p>
                <h3 className="mt-4 font-display text-3xl text-text/90">{card.title}</h3>
                <p className="mt-4 max-w-md text-sm leading-7 text-text/68">{card.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredient Highlight Section */}
      <section id="explore" className="relative w-full bg-[linear-gradient(180deg,rgba(var(--color-secondary)/0.08),rgba(var(--color-primary)/0.06))] px-6 py-20 sm:px-10 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p className="text-[0.72rem] uppercase tracking-[0.42em] text-text/35">Our Formula</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-text/92 sm:text-5xl">
              Powerhouse Ingredients
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-text/68">
              Each ingredient is carefully selected for its nutrient density and traditional wellness benefits.
            </p>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {ingredients.map((ingredient, index) => (
              <motion.div
                key={ingredient.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group rounded-[1.8rem] border border-text/10 bg-[linear-gradient(180deg,rgb(var(--color-text)/0.04),rgb(var(--color-text)/0.02))] p-6 backdrop-blur-xl transition hover:border-text/20"
              >
                <div
                  className="mx-auto mb-4 h-16 w-16 rounded-full opacity-80 transition group-hover:opacity-100"
                  style={{ backgroundColor: ingredient.hex }}
                />
                <h4 className="font-semibold text-text/92">{ingredient.name}</h4>
                <p className="mt-2 text-[0.8rem] leading-5 text-text/65">{ingredient.benefit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative w-full px-6 py-20 sm:px-10 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p className="text-[0.72rem] uppercase tracking-[0.42em] text-text/35">Why Trust Us</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-text/92 sm:text-5xl">
              Our Commitment to Excellence
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {whyChooseUs.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="rounded-[1.6rem] border border-text/10 bg-[linear-gradient(180deg,rgb(var(--color-text)/0.05),rgb(var(--color-text)/0.02))] p-6 backdrop-blur-xl"
              >
                <div className="mb-4 h-12 w-12 rounded-full bg-gradient-to-br from-gold/30 to-accent/20" />
                <h4 className="font-display text-xl text-text/92">{feature.title}</h4>
                <p className="mt-2 text-sm leading-6 text-text/68">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience / Lifestyle Section */}
      <section className="relative w-full bg-[linear-gradient(180deg,rgba(var(--color-primary)/0.06),rgba(var(--color-secondary)/0.08))] px-6 py-20 sm:px-10 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p className="text-[0.72rem] uppercase tracking-[0.42em] text-text/35">The Ritual</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-text/92 sm:text-5xl">
              Daily Wellness Rituals
            </h2>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                title: 'Morning Activation',
                body: 'Start your day with clarity and energy. A ritualistic sip of Svarna Health awakens your immunity and sets intention for the day ahead.',
                icon: '🌅'
              },
              {
                title: 'Midday Momentum',
                body: 'Combat the afternoon slump with natural nourishment. Keep vitality high and focus sharp through your most productive hours.',
                icon: '⚡'
              },
              {
                title: 'Evening Serenity',
                body: 'Wind down with a calming ritual. Svarna Health supports your body\'s natural restoration and prepares you for restorative sleep.',
                icon: '🌙'
              }
            ].map((lifestyle, index) => (
              <motion.div
                key={lifestyle.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="rounded-[2rem] border border-text/10 bg-[linear-gradient(180deg,rgb(var(--color-text)/0.04),rgb(var(--color-text)/0.02))] p-8 backdrop-blur-xl"
              >
                <div className="text-4xl">{lifestyle.icon}</div>
                <h3 className="mt-4 font-display text-2xl text-text/92">{lifestyle.title}</h3>
                <p className="mt-3 text-sm leading-6 text-text/70">{lifestyle.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative w-full px-6 py-20 sm:px-10 lg:px-12 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p className="text-[0.72rem] uppercase tracking-[0.42em] text-text/35">Loved by Many</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-text/92 sm:text-5xl">
              What Our Community Says
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, rotate: -2 }}
                whileInView={{ opacity: 1, rotate: index % 2 === 0 ? -1 : 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="rounded-[1.8rem] border border-text/10 bg-[linear-gradient(180deg,rgb(var(--color-text)/0.05),rgb(var(--color-text)/0.02))] p-6 backdrop-blur-xl"
              >
                <p className="text-2xl text-gold/70">"</p>
                <p className="mt-2 text-sm leading-6 text-text/80">{testimonial.quote}</p>
                <p className="mt-4 text-[0.8rem] font-semibold uppercase tracking-[0.32em] text-text/55">
                  — {testimonial.author}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative w-full bg-[linear-gradient(180deg,rgb(var(--color-primary)/0.08),rgb(var(--color-secondary)/0.12))] px-6 py-16 sm:px-10 lg:px-12 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-4xl leading-tight text-text/92 sm:text-5xl">
              Ready to Start Your Ritual?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-text/70 sm:text-base">
              Join thousands who've transformed their wellness journey with Svarna Health.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="#contact"
                className="group inline-flex items-center justify-center rounded-full border border-text/12 bg-text/6 px-6 py-3 text-sm font-semibold tracking-[0.22em] text-text/90 backdrop-blur-md transition-colors hover:border-gold/30 hover:bg-gold/10"
              >
                <span className="mr-3 h-2 w-2 rounded-full bg-gold shadow-[0_0_24px_rgba(205,165,136,0.9)]" />
                Shop Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
