'use client';

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type HTMLMotionProps } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { philosophyCards, stageCopy } from '@/lib/frame-sources';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

const ingredientTokens = ['Amla', 'Turmeric', 'Saffron', 'Herbs'];
const homeHeroPhrase = 'SIP THE GOLD';

type FrameCanvasProps = {
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
};





function PremiumButton({
  children,
  className,
  type,
  ...props
}: { children: React.ReactNode } & HTMLMotionProps<'button'>) {
  return (
    <motion.button
      suppressHydrationWarning
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      type={type ?? 'button'}
      className={`group inline-flex items-center justify-center rounded-full border border-text/12 bg-text/6 px-6 py-3 text-sm font-semibold tracking-[0.22em] text-text/90 backdrop-blur-md transition-colors hover:border-gold/30 hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-70 ${className ?? ''}`}
      {...props}
    >
      <span className="mr-3 h-2 w-2 rounded-full bg-gold shadow-[0_0_24px_rgba(205,165,136,0.9)] transition-transform group-hover:scale-125 group-disabled:scale-100" />
      {children}
    </motion.button>
  );
}

function StoryBeat({
  progress,
  stage,
  index
}: {
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  stage: (typeof stageCopy)[number];
  index: number;
}) {
  const opacity = useTransform(progress, [index / 4, (index + 0.16) / 4, 1], [0.35, 1, 1]);
  const x = useTransform(progress, [index / 4, (index + 0.25) / 4, 1], [0, 0, index % 2 === 0 ? 10 : -10]);

  return (
    <motion.div style={{ opacity, x }} className="flex items-start gap-3 rounded-[1.25rem] border border-secondary/18 bg-[linear-gradient(180deg,rgb(var(--color-surface)/0.92),rgb(var(--color-surface)/0.78))] px-4 py-3">
      <span className="mt-1 h-2.5 w-2.5 rounded-full bg-gold shadow-[0_0_18px_rgba(205,165,136,0.8)]" />
      <div>
        <p className="text-[0.62rem] uppercase tracking-[0.3em] text-secondary/70">{stage.label}</p>
        <p className="text-sm font-semibold text-secondary/90">{stage.title}</p>
      </div>
    </motion.div>
  );
}

function IngredientChip({
  progress,
  label,
  index
}: {
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  label: string;
  index: number;
}) {
  const x = useTransform(progress, [0, 1], [0, index % 2 === 0 ? 36 : -36]);
  const y = useTransform(progress, [0, 1], [0, index % 2 === 0 ? -18 : 20]);
  const rotate = useTransform(progress, [0, 1], [index % 2 === 0 ? -8 : 8, index % 2 === 0 ? 8 : -8]);
  const opacity = useTransform(progress, [0, 0.15, 0.85, 1], [0.2, 1, 1, 0.65]);

  return (
    <motion.div
      className="absolute rounded-full border border-secondary/18 bg-surface/92 px-3 py-2 text-sm font-semibold text-secondary/82 shadow-[0_12px_30px_rgb(var(--color-secondary)/0.2)]"
      style={{
        left: `${18 + index * 18}%`,
        top: `${18 + (index % 2) * 28}%`,
        x,
        y,
        rotate,
        opacity
      }}
    >
      {label}
    </motion.div>
  );
}

function RailMarker({
  progress,
  label,
  index,
  width
}: {
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  label: string;
  index: number;
  width: number;
}) {
  const opacity = useTransform(progress, [(width - 0.16), width, 1], [0.35, 1, 1]);
  const y = useTransform(progress, [0, width, 1], [8, 0, -4]);

  return (
    <motion.div style={{ opacity, y }} className="rounded-full border border-secondary/18 bg-surface/78 px-2 py-2 text-center text-[0.65rem] uppercase tracking-[0.25em] text-secondary/55">
      {label}
    </motion.div>
  );
}

function OrangeModel({ scrollProgress }: { scrollProgress: any }) {
  const { scene } = useGLTF('/Website_Assets/orange/source/ORANGES.glb');
  const group = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (group.current) {
      const progress = scrollProgress.get();
      group.current.rotation.y = progress * Math.PI * 4;
      group.current.rotation.x = Math.sin(progress * Math.PI) * 0.2;
    }
  });

  return (
    <group ref={group}>
      <primitive object={scene} scale={2.5} position={[0, -1, 0]} />
    </group>
  );
}

useGLTF.preload('/Website_Assets/orange/source/ORANGES.glb');

function OrangeModelDisplay({ scrollProgress }: FrameCanvasProps) {
  return (
    <div className="relative h-full w-full bg-primary overflow-hidden">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <directionalLight position={[-5, 5, -5]} intensity={1} />
        <Environment preset="studio" />
        <OrangeModel scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}

function StoryNarrative({ scrollProgress }: FrameCanvasProps) {
  const progress = useTransform(scrollProgress, [0, 1], [0, 1]);

  return (
    <div className="pointer-events-none absolute inset-0 z-40 h-full w-full bg-primary">
      <div className="grid h-full w-full grid-rows-[0.6fr_0.4fr] gap-0 bg-primary lg:grid-cols-[0.42fr_0.58fr] lg:grid-rows-1">
        <div className="pointer-events-auto relative order-2 overflow-hidden bg-primary p-5 sm:p-7 lg:order-1 lg:flex lg:items-center lg:justify-center">
          {stageCopy.map((stage, index) => {
            const stageStart = index / stageCopy.length;
            const stageEnd = (index + 1) / stageCopy.length;
            const opacity = useTransform(progress, [stageStart - 0.08, stageStart + 0.08, stageEnd - 0.08, stageEnd + 0.08], [0, 1, 1, 0]);
            const y = useTransform(progress, [stageStart, stageEnd], [40, -40]);

            return (
              <motion.div
                key={stage.label}
                style={{ opacity, y }}
                className="absolute inset-0 flex items-center px-5 sm:px-7 lg:px-9"
              >
                <div className="max-w-xl text-left">
                  <p className="text-[0.62rem] uppercase tracking-[0.38em] text-text/65">{stage.label}</p>
                  <h3 className="mt-3 font-display text-3xl leading-tight text-text/95 sm:text-4xl">
                    {stage.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-text/80 sm:text-base">
                    {stage.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="order-1 relative min-h-[44dvh] min-h-[44svh] sm:min-h-[48dvh] sm:min-h-[48svh] lg:order-2 lg:min-h-0 pointer-events-auto">
          <OrangeModelDisplay scrollProgress={scrollProgress} />
        </div>
      </div>
    </div>
  );
}

function PhilosophySection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-10 sm:px-10 sm:pb-28 sm:pt-12 lg:px-12 lg:pb-32 lg:pt-14">
      <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            <article className="relative aspect-square min-h-0 w-full overflow-hidden rounded-[1.45rem] border border-text/10 bg-surface/20">
              <img
                src="/Website_Assets/Product 4.jpeg"
                alt="ABC Glow Shot"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.38))]" />
            </article>

            <article className="relative flex aspect-square min-h-0 w-full flex-col justify-center gap-3 rounded-[1.45rem] border border-text/10 bg-[rgb(var(--color-secondary)/0.85)] p-3 sm:p-5">
              <p className="text-2xl text-gold/90">⚡</p>
              <h4 className="font-display text-[clamp(1.15rem,4vw,2.35rem)] leading-tight text-text/92">Rooted In Nature</h4>
              <p className="text-[clamp(0.68rem,1.65vw,1rem)] leading-[1.35] tracking-[0.06em] text-text/76">ANCIENT WISDOM. MODERN CARE.</p>
            </article>

            <article className="relative flex aspect-square min-h-0 w-full flex-col justify-center gap-3 rounded-[1.45rem] border border-text/10 bg-[rgb(var(--color-surface)/0.96)] p-3 text-secondary sm:p-5">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-xl">🌱</div>
              <h4 className="font-display text-[clamp(1.15rem,4vw,2.35rem)] leading-tight text-secondary/90">Clean Ingredients</h4>
              <p className="text-[clamp(0.68rem,1.65vw,1rem)] leading-[1.35] tracking-[0.06em] text-secondary/72">NO COLOUR. NO PRESERVATIVES.</p>
            </article>

            <article className="relative aspect-square min-h-0 w-full overflow-hidden rounded-[1.45rem] border border-text/10 bg-surface/20">
              <img
                src="/Website_Assets/Product 1.jpeg"
                alt="Golden Immunity Shot"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.42))]" />
            </article>
          </div>

          <div className="pointer-events-none absolute -bottom-5 left-1/2 hidden w-[11.5rem] -translate-x-1/2 rounded-full border border-gold/30 bg-[linear-gradient(180deg,rgb(var(--color-secondary)/0.82),rgb(var(--color-primary)/0.82))] px-4 py-2.5 shadow-[0_20px_40px_rgba(0,0,0,0.25)] md:block">
            <p className="text-center text-[0.7rem] uppercase tracking-[0.26em] text-white">Sip the Gold</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          transition={{ duration: 0.72, delay: 0.06 }}
        >
          <div className="inline-flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.42em] text-gold/78">
            <span className="h-px w-12 bg-gold/65" />
            Our Philosophy
          </div>

          <h3 className="mt-6 font-display text-5xl leading-[0.98] text-text/92 sm:text-6xl">
            Luxury wellness,
            <span className="mt-2 block italic text-gold/92">simplified.</span>
          </h3>

          <p className="mt-7 max-w-2xl text-lg leading-9 text-text/72">
            Svarna Health unites premium Ayurvedic ingredients, refined formulation, and a modern wellness aesthetic into a calm, elevated experience.
          </p>

          <p className="mt-6 max-w-2xl text-lg leading-9 text-text/72">
            Luxury wellness built as a ritual, not a routine. Fresh wellness shots made with ingredient integrity at the core.
          </p>

          <div className="mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <a
              href="/shop"
              className="inline-flex items-center justify-center rounded-full border border-text/14 bg-secondary/72 px-8 py-3 text-lg font-semibold text-text/92 transition hover:bg-secondary/86"
            >
              Shop the ritual
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function JourneyExperience() {
  const journeyContainerRef = useRef<HTMLDivElement | null>(null);
  const joinedResetTimerRef = useRef<number | null>(null);
  const { scrollYProgress: pageProgress } = useScroll();
  const [contactEmail, setContactEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [joined, setJoined] = useState(false);
  const { scrollYProgress } = useScroll({
    target: journeyContainerRef,
    offset: ['start start', 'end end']
  });

  const heroY = useTransform(pageProgress, [0, 0.15], [0, -40]);
  const heroOpacity = useTransform(pageProgress, [0, 0.08, 0.18], [1, 1, 0]);



  useEffect(() => {
    return () => {
      if (joinedResetTimerRef.current !== null) {
        window.clearTimeout(joinedResetTimerRef.current);
      }
    };
  }, []);

  const isValidEmail = useCallback((value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }, []);

  const handleJoinList = useCallback(() => {
    if (!isValidEmail(contactEmail)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
    setContactEmail('');
    setJoined(true);

    if (joinedResetTimerRef.current !== null) {
      window.clearTimeout(joinedResetTimerRef.current);
    }

    joinedResetTimerRef.current = window.setTimeout(() => {
      setJoined(false);
      joinedResetTimerRef.current = null;
    }, 5000);
  }, [contactEmail, isValidEmail]);

  return (
    <main className="grain bg-void text-white">
      <section id="home" className="relative flex h-[100vh] min-h-[100vh] max-h-[100vh] w-full items-center justify-center overflow-hidden scroll-mt-28">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        >
          <source src="https://res.cloudinary.com/dxcsktcxk/video/upload/q_auto,f_auto/v1784882321/HERO_SECTION_VIDEO_jm5dki.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-0 bg-black/40" />
        <div className="relative z-10 flex h-full w-full items-center justify-center px-6 pt-[68px] sm:px-10 lg:px-12">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full max-w-4xl text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
              className="mb-2 text-sm uppercase tracking-[0.3em] text-white sm:mb-5 sm:text-base"
            >
              Svarna
            </motion.p>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
              className="font-display text-[clamp(2.2rem,12vw,4.75rem)] leading-[1.05] text-text/95 sm:text-6xl md:text-7xl lg:text-8xl"
              aria-label="SIP THE GOLD"
            >
              <span className="inline-block whitespace-nowrap">
                <span>{homeHeroPhrase}</span>
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
              className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-text/70 sm:mt-6 sm:text-base md:text-lg md:leading-8"
            >
              Small daily habits. Big long term results.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.7, ease: 'easeOut' }}
              className="mt-6 flex flex-col items-center justify-center sm:mt-8"
            >
              <motion.button
                suppressHydrationWarning
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  journeyContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="inline-flex items-center justify-center rounded-full border border-white bg-transparent px-8 py-3.5 text-sm font-semibold tracking-[0.22em] text-white transition-colors hover:bg-white/10"
              >
                Start Your Ritual
              </motion.button>
            </motion.div>


          </motion.div>
        </div>
      </section>

      <section
        id="journey"
        ref={journeyContainerRef}
        className="min-h-[300dvh] min-h-[300svh] w-full pb-8 scroll-mt-28 sm:pb-10"
        style={{ position: 'relative' }}
      >
        <div className="sticky top-0 flex h-[100dvh] min-h-[100svh] items-center">
          <StoryNarrative scrollProgress={scrollYProgress} />
        </div>
      </section>

      <section id="about" className="scroll-mt-28">
        <PhilosophySection />
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-6 pt-4 sm:px-10 lg:px-12 lg:pb-10 lg:pt-6">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative h-[14.5rem] sm:h-[17rem] lg:h-[20rem]">
            <img
              src="/Website_Assets/white logo.svg"
              alt="Svarna Health brand story artwork"
              className="h-full w-full object-contain object-center"
            />
          </div>

          <div className="flex flex-col justify-center p-3 sm:p-4 lg:p-6">
            <p className="text-[0.72rem] uppercase tracking-[0.42em] text-text/35">About the brand</p>
            <h3 className="mt-4 max-w-2xl font-display text-4xl leading-tight text-text/92 sm:text-5xl">
              Crafted as a daily ritual of nourishment, clarity, and inner glow.
            </h3>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-text/68 sm:text-base">
              Svarna Health unites premium Ayurvedic ingredients, refined formulation, and a modern wellness aesthetic into a calm, elevated experience.
            </p>
          </div>
        </div>
      </section>

      <section id="shop" className="scroll-mt-28 relative mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12 lg:py-28">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <div className="max-w-3xl">
            <p className="text-[0.72rem] uppercase tracking-[0.42em] text-gold/75">Trending</p>
            <h3 className="mt-4 font-display text-4xl leading-tight text-text/92 sm:text-5xl">
              Signature <span className="italic text-gold/90">Bestsellers</span>
            </h3>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-text/66 sm:text-base">
              Fresh wellness shots to your doorstep, crafted with care.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {[
            { src: '/Website_Assets/Product 1.jpeg', title: 'Golden Immunity Shot' },
            { src: '/Website_Assets/Product 2.jpeg', title: 'Svarna Shots' },
            { src: '/Website_Assets/Product 3.jpeg', title: 'Green Elixir Shots' },
            { src: '/Website_Assets/Product 4.jpeg', title: 'ABC Glow Shot' }
          ].map((product) => (
            <article
              key={product.title}
              className="group overflow-hidden rounded-[1.8rem] border border-text/10 bg-[linear-gradient(180deg,rgb(var(--color-text)/0.05),rgb(var(--color-text)/0.02))] p-3 backdrop-blur-xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] border border-text/8 bg-surface/90">
                <img
                  src={product.src}
                  alt={product.title}
                  className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="px-2 pb-2 pt-4">
                <h4 className="font-display text-2xl text-text/92">{product.title}</h4>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="w-full px-6 py-12 sm:px-10 sm:py-14 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-6xl gap-10 rounded-[1.8rem] border border-gold/18 bg-[linear-gradient(180deg,rgb(var(--color-secondary)/0.9),rgb(var(--color-primary)/0.9))] px-6 py-10 text-center shadow-[0_24px_70px_rgba(0,0,0,0.28)] md:grid-cols-3 md:gap-6 md:px-8">
          {[
            {
              stat: '13+',
              title: 'Whole Ingredients',
              body: 'Carefully selected fruits, vegetables, nuts, and seeds used in their most natural, minimally processed form.'
            },
            {
              stat: '0%',
              title: 'Added Sugar & Preservatives',
              body: 'Absolutely no refined sugar, no oil, no artificial additives, and no preservatives, just real food.'
            },
            {
              stat: '100%',
              title: 'Plant-Based Nutrition',
              body: 'Every product is built on whole, plant-based ingredients designed to support gut health, immunity, and daily wellness.'
            }
          ].map((item) => (
            <article key={item.title} className="mx-auto max-w-[19rem]">
              <p className="font-display text-5xl leading-none text-white/95 sm:text-6xl">{item.stat}</p>
              <h4 className="mt-4 text-[1.65rem] font-semibold leading-tight text-white/95">{item.title}</h4>
              <p className="mt-3 text-base leading-8 text-white/76">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="scroll-mt-28 relative mx-auto max-w-6xl px-6 pb-24 pt-10 sm:px-10 lg:px-12 lg:pb-32">
        <div className="rounded-[2rem] border border-text/10 bg-[radial-gradient(circle_at_top,rgba(205,165,136,0.16),transparent_30%),linear-gradient(180deg,rgb(var(--color-text)/0.05),rgb(var(--color-text)/0.02))] p-8 shadow-aura sm:p-12">
          <p className="text-[0.68rem] uppercase tracking-[0.42em] text-text/35">Contact & subscribe</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <h3 className="font-display text-4xl leading-tight text-text/92 sm:text-5xl">Start Your Ritual</h3>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-text/60 sm:text-base">
                Join a considered wellness experience built around consistency, beauty, and functional nourishment.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href="mailto:svarnahealth@gmail.com"
                  className="rounded-full border border-text/10 bg-text/5 px-5 py-3 text-sm font-semibold text-text/82 transition hover:border-gold/30 hover:bg-gold/10"
                >
                  svarnahealth@gmail.com
                </a>
                <a
                  href="tel:+918961256620"
                  className="rounded-full border border-text/10 bg-text/5 px-5 py-3 text-sm font-semibold text-text/82 transition hover:border-gold/30 hover:bg-gold/10"
                >
                  Call us
                </a>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:justify-self-end">
              <input
                suppressHydrationWarning
                aria-label="Email address"
                type="email"
                placeholder="Email address"
                value={contactEmail}
                onChange={(event) => {
                  const nextEmail = event.target.value;
                  setContactEmail(nextEmail);
                  if (emailError) {
                    setEmailError(!isValidEmail(nextEmail));
                  }
                }}
                className={`min-w-0 rounded-full border bg-secondary/50 px-5 py-3 text-sm text-text/90 outline-none transition placeholder:text-text/30 focus:border-gold/50 ${emailError ? 'border-red-400/70' : 'border-text/10'}`}
              />
              <PremiumButton onClick={handleJoinList} aria-live="polite">
                <span className="relative inline-flex min-w-[8.8rem] justify-center overflow-hidden">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={joined ? 'joined' : 'join'}
                      initial={{ opacity: 0, y: 8, filter: 'blur(2px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -8, filter: 'blur(1px)' }}
                      transition={{ duration: 0.28, ease: 'easeOut' }}
                    >
                      {joined ? 'Joined😉' : 'Join the List'}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </PremiumButton>
            </div>
            {emailError && (
              <p className="lg:col-start-2 lg:justify-self-end px-3 text-xs text-red-300">Please enter a valid email address.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}