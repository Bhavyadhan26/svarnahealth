'use client';

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type HTMLMotionProps } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { frameSources, philosophyCards, stageCopy } from '@/lib/frame-sources';

const ingredientTokens = ['Amla', 'Turmeric', 'Saffron', 'Herbs'];
const homeHeroPhrase = 'SIP THE GOLD';

type FrameCanvasProps = {
  scrollProgress: ReturnType<typeof useScroll>['scrollYProgress'];
};

function useFrameSources() {
  return useMemo(() => frameSources, []);
}

function ScrollIndicator({ progress }: { progress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const width = useTransform(progress, [0, 1], ['0%', '100%']);

  return (
    <div className="mt-12 flex flex-col items-center gap-4 text-center">
      <span className="text-[0.7rem] uppercase tracking-[0.45em] text-text/35">Scroll to Begin Ritual</span>
      <div className="h-px w-44 overflow-hidden bg-text/10">
        <motion.div className="h-full bg-gradient-to-r from-transparent via-gold to-transparent" style={{ width }} />
      </div>
    </div>
  );
}

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

function ScrollFrameDisplay({ scrollProgress }: FrameCanvasProps) {
  const allFrames = useFrameSources();
  const sourceList = useMemo(() => {
    if (typeof navigator === 'undefined') {
      return allFrames;
    }

    const nav = navigator as Navigator & { deviceMemory?: number };
    const memory = nav.deviceMemory ?? 4;
    const cores = nav.hardwareConcurrency ?? 4;

    let step = 1;
    if (cores <= 8 || memory <= 8) {
      step = 2;
    }
    if (cores <= 4 || memory <= 4) {
      step = 3;
    }
    if (cores <= 2 || memory <= 2) {
      step = 4;
    }

    const reduced = allFrames.filter((_, index) => index % step === 0);
    const lastFrame = allFrames[allFrames.length - 1];

    if (reduced[reduced.length - 1] !== lastFrame) {
      reduced.push(lastFrame);
    }

    return reduced;
  }, [allFrames]);
  const frameRef = useRef(0);
  const lastRenderedFrameRef = useRef(-1);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const preloadedRef = useRef<Set<number>>(new Set());
  const prefersReducedMotion = useReducedMotion();
  const [visibleFrameIndex, setVisibleFrameIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const preloadAround = useCallback((center: number) => {
    const start = Math.max(0, center - 4);
    const end = Math.min(sourceList.length - 1, center + 12);

    for (let index = start; index <= end; index += 1) {
      if (preloadedRef.current.has(index)) {
        continue;
      }

      preloadedRef.current.add(index);
      const image = new Image();
      image.decoding = 'async';
      image.src = sourceList[index];
    }
  }, [sourceList]);

  useEffect(() => {
    const firstImage = new Image();
    firstImage.decoding = 'async';
    firstImage.onload = () => setIsReady(true);
    firstImage.src = sourceList[0];

    preloadAround(0);

    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [preloadAround, sourceList]);

  useMotionValueEvent(scrollProgress, 'change', (latest) => {
    const maxFrame = sourceList.length - 1;
    targetFrameRef.current = latest * maxFrame;

    if (rafRef.current !== null) {
      return;
    }

    const animateToTarget = () => {
      const smoothing = prefersReducedMotion ? 0.26 : 0.18;
      frameRef.current += (targetFrameRef.current - frameRef.current) * smoothing;

      const nextFrame = Math.max(0, Math.min(maxFrame, Math.round(frameRef.current)));
      if (nextFrame !== lastRenderedFrameRef.current) {
        lastRenderedFrameRef.current = nextFrame;
        setVisibleFrameIndex(nextFrame);
        preloadAround(nextFrame);
      }

      if (Math.abs(targetFrameRef.current - frameRef.current) > 0.08) {
        rafRef.current = window.requestAnimationFrame(animateToTarget);
      } else {
        rafRef.current = null;
      }
    };

    rafRef.current = window.requestAnimationFrame(animateToTarget);
  });

  return (
    <div className="relative h-full w-full overflow-hidden bg-primary">
      <div className="mx-auto flex h-full w-full items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
        <div className="relative flex h-full w-full max-w-[46rem] items-center justify-center">
          {isReady && sourceList[visibleFrameIndex] && (
            <img
              src={sourceList[visibleFrameIndex]}
              alt={`Frame ${visibleFrameIndex + 1}`}
              className="max-h-full max-w-full object-contain object-center"
              style={{ opacity: visibleFrameIndex > 0 ? 1 : 0.8 }}
            />
          )}
          {!isReady && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-text/55 text-sm">Loading frames...</p>
            </div>
          )}
        </div>
      </div>
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

        <div className="order-1 relative min-h-[44dvh] min-h-[44svh] sm:min-h-[48dvh] sm:min-h-[48svh] lg:order-2 lg:min-h-0">
          <ScrollFrameDisplay scrollProgress={scrollProgress} />
        </div>
      </div>
    </div>
  );
}

function FrameCanvas({ scrollProgress }: FrameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const sourceList = useFrameSources();
  const prefersReducedMotion = useReducedMotion();
  const [isReady, setIsReady] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const [viewportScale, setViewportScale] = useState(1);
  const [frameLoadProgress, setFrameLoadProgress] = useState(0);
  const [visibleFrameIndex, setVisibleFrameIndex] = useState(0);

  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const rect = wrapper.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.floor(rect.width * dpr));
    const height = Math.max(1, Math.floor(rect.height * dpr));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }

    const progress = targetFrameRef.current / Math.max(1, sourceList.length - 1);
    const easedFrame = Math.max(0, Math.min(sourceList.length - 1, Math.round(frameRef.current)));

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(canvas.width, canvas.height) * 0.34;
    const glowStrength = Math.min(1, progress * 1.35 + viewportScale * 0.12);

    const aura = ctx.createRadialGradient(centerX, centerY, radius * 0.2, centerX, centerY, radius * 1.35);
    aura.addColorStop(0, `rgba(205, 165, 136, ${0.16 + glowStrength * 0.2})`);
    aura.addColorStop(0.45, `rgba(111, 78, 58, ${0.08 + progress * 0.08})`);
    aura.addColorStop(1, 'rgba(154, 107, 77, 0)');
    ctx.fillStyle = aura;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const particleCount = 24;
    for (let index = 0; index < particleCount; index += 1) {
      const ratio = (index + 1) / particleCount;
      const angle = ratio * Math.PI * 2 + progress * Math.PI * 1.5;
      const orbit = radius * (0.45 + ratio * 0.45);
      const x = centerX + Math.cos(angle) * orbit * 0.55;
      const y = centerY + Math.sin(angle * 1.2) * orbit * 0.28;
      const size = Math.max(1.2, radius * (0.006 + ratio * 0.01));
      ctx.beginPath();
      ctx.fillStyle = `rgba(205,165,136,${0.08 + ratio * 0.22})`;
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    const shimmer = ctx.createLinearGradient(0, centerY - radius, canvas.width, centerY + radius);
    shimmer.addColorStop(0, 'rgba(255,255,255,0)');
    shimmer.addColorStop(0.5, `rgba(205,165,136,${0.1 + progress * 0.16})`);
    shimmer.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = shimmer;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [sourceList.length, viewportScale]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    if (!canvas.getContext('2d')) {
      return;
    }

    let cancelled = false;

    const loadImage = (src: string) =>
      new Promise<HTMLImageElement | null>((resolve) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = () => resolve(null);
        image.src = src;
      });

    const loadImages = async () => {
      let successfulLoads = 0;

      for (let index = 0; index < sourceList.length; index += 1) {
        const image = await loadImage(sourceList[index]);

        if (cancelled) {
          return;
        }

        if (image) {
          successfulLoads += 1;
        }

        setFrameLoadProgress((index + 1) / sourceList.length);
      }

      if (!cancelled) {
        setIsReady(successfulLoads > 0);
        setLoadFailed(successfulLoads === 0);
      }
    };

    void loadImages();

    const resize = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) {
        return;
      }

      const rect = wrapper.getBoundingClientRect();
      setViewportScale(Math.min(1.15, Math.max(0.7, rect.width / 1440)));
      canvas.width = Math.max(1, Math.floor(rect.width * Math.min(window.devicePixelRatio || 1, 2)));
      canvas.height = Math.max(1, Math.floor(rect.height * Math.min(window.devicePixelRatio || 1, 2)));
      renderFrame();
    };

    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      const progress = scrollProgress.get();
      const maxFrame = sourceList.length - 1;
      targetFrameRef.current = progress * maxFrame;
      frameRef.current += (targetFrameRef.current - frameRef.current) * (prefersReducedMotion ? 0.18 : 0.08);
      setVisibleFrameIndex(Math.max(0, Math.min(maxFrame, Math.round(frameRef.current))));

      renderFrame();
      rafRef.current = window.requestAnimationFrame(animate);
    };

    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      cancelled = true;
      window.removeEventListener('resize', resize);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [prefersReducedMotion, renderFrame, scrollProgress, sourceList]);

  useMotionValueEvent(scrollProgress, 'change', (latest) => {
    targetFrameRef.current = latest * (sourceList.length - 1);
  });

  const status = Math.round(frameLoadProgress * 100);

  return (
    <div ref={wrapperRef} className="relative h-[100dvh] min-h-[100svh] overflow-hidden rounded-[2rem] border border-text/8 bg-surface shadow-[0_0_0_1px_rgb(var(--color-text)/0.04),0_40px_120px_rgba(111,78,58,0.45)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_28%,rgba(205,165,136,0.22),transparent_24%),radial-gradient(circle_at_50%_55%,rgba(111,78,58,0.14),transparent_30%),linear-gradient(180deg,rgba(247,239,233,0.96),rgba(237,225,215,0.92))]" />

      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
        <div className="relative z-20 flex h-full w-full max-w-5xl items-center justify-center overflow-hidden rounded-[2rem] border border-secondary/20 bg-[linear-gradient(180deg,rgba(247,239,233,0.98),rgba(247,239,233,0.82))] p-3 shadow-[0_30px_120px_rgba(111,78,58,0.24)] backdrop-blur-sm">
          <img
            src={sourceList[visibleFrameIndex]}
            alt="Svarna Health frame sequence"
            className="h-full w-full rounded-[1.5rem] object-contain object-center bg-[#f7efe9]"
            decoding="async"
            loading="eager"
          />
          <div className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-secondary/15" />
          <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-secondary/15 bg-surface/82 px-3 py-1 text-[0.65rem] uppercase tracking-[0.32em] text-secondary/75 backdrop-blur-md">
            Frame {String(visibleFrameIndex + 1).padStart(3, '0')} / {String(sourceList.length).padStart(3, '0')}
          </div>
          <div className="pointer-events-none absolute right-4 top-4 max-w-[16rem] rounded-[1rem] border border-gold/25 bg-surface/86 px-4 py-3 text-left shadow-[0_10px_30px_rgb(var(--color-secondary)/0.22)] backdrop-blur-md">
            <p className="text-[0.62rem] uppercase tracking-[0.34em] text-gold">Live render</p>
            <p className="mt-1 text-sm text-secondary/75">{isReady ? 'Frame sequence is active' : loadFailed ? 'Frame sequence failed to load' : 'Loading frames'}</p>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-10 h-full w-full mix-blend-screen opacity-90" aria-hidden="true" />

      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(205,165,136,0.06),transparent_35%),linear-gradient(180deg,rgba(154,107,77,0.02),rgba(111,78,58,0.08))]" />

      <div className="absolute left-6 top-6 z-30 flex flex-col gap-2 text-[0.66rem] uppercase tracking-[0.38em] text-secondary/45 sm:left-8 sm:top-8">
        <span>Scroll Narrative</span>
        <span className="text-gold">{isReady ? 'Sequence ready' : loadFailed ? 'Sequence load failed' : `Preloading ${status}%`}</span>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-30 grid gap-4 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <motion.div
          className="max-w-2xl"
          style={{
            y: useTransform(scrollProgress, [0, 1], [0, -56]),
            opacity: useTransform(scrollProgress, [0, 0.1, 0.92, 1], [0, 1, 1, 0])
          }}
        >
          <p className="mb-3 text-[0.7rem] uppercase tracking-[0.42em] text-secondary/45">{stageCopy[0].label} to {stageCopy[4].label}</p>
          <h2 className="font-display text-4xl leading-none text-secondary/90 sm:text-5xl lg:text-7xl">The Journey of Inner Glow</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-secondary/70 sm:text-base">
            From raw botanicals to a golden elixir, the ritual evolves through purity, extraction, and luminous nourishment.
          </p>
        </motion.div>

        <div className="grid gap-3 text-sm text-secondary/65 sm:max-w-sm lg:justify-self-end">
          <div className="rounded-[1.5rem] border border-secondary/15 bg-surface/78 p-4 backdrop-blur-xl">
            <p className="text-[0.66rem] uppercase tracking-[0.34em] text-secondary/55">Stage cue</p>
            <p className="mt-2 text-base text-secondary/85">{stageCopy[Math.min(4, Math.max(0, Math.round(targetFrameRef.current / 60)))]?.title}</p>
            <p className="mt-2 leading-6 text-secondary/65">
              {stageCopy[Math.min(4, Math.max(0, Math.round(targetFrameRef.current / 60)))]?.body}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhilosophySection() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-12 lg:py-32">
      <div className="mb-14 max-w-2xl">
        <p className="text-[0.72rem] uppercase tracking-[0.42em] text-text/35">Product philosophy</p>
        <h3 className="mt-4 font-display text-4xl leading-tight text-text/90 sm:text-5xl">Luxury wellness built as a ritual, not a routine.</h3>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {philosophyCards.map((card, index) => (
          <motion.article
            key={card.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
            transition={{ duration: 0.7, delay: index * 0.08 }}
            className="group relative overflow-hidden rounded-[1.8rem] border border-text/10 bg-[linear-gradient(180deg,rgb(var(--color-text)/0.04),rgb(var(--color-text)/0.02))] p-7 backdrop-blur-xl"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(205,165,136,0.18),transparent_55%)]" />
            <div className="relative">
              <p className="mb-5 text-[0.65rem] uppercase tracking-[0.34em] text-gold/70">0{index + 1}</p>
              <h4 className="font-display text-3xl text-text/90">{card.title}</h4>
              <p className="mt-4 max-w-md text-sm leading-7 text-text/58">{card.body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export function JourneyExperience() {
  const journeyContainerRef = useRef<HTMLDivElement | null>(null);
  const joinedResetTimerRef = useRef<number | null>(null);
  const { scrollYProgress: pageProgress } = useScroll();
  const [heroDisplayText, setHeroDisplayText] = useState('');
  const [heroDeleting, setHeroDeleting] = useState(false);
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
    let delay = heroDeleting ? 45 : 85;
    if (!heroDeleting && heroDisplayText === homeHeroPhrase) {
      delay = 1300;
    }
    if (heroDeleting && heroDisplayText.length === 0) {
      delay = 320;
    }

    const timer = window.setTimeout(() => {
      if (!heroDeleting) {
        if (heroDisplayText === homeHeroPhrase) {
          setHeroDeleting(true);
          return;
        }
        setHeroDisplayText(homeHeroPhrase.slice(0, heroDisplayText.length + 1));
        return;
      }

      if (heroDisplayText.length === 0) {
        setHeroDeleting(false);
        return;
      }

      setHeroDisplayText(homeHeroPhrase.slice(0, heroDisplayText.length - 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [heroDeleting, heroDisplayText]);

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
      <section id="home" className="relative flex h-[100dvh] min-h-[100svh] w-full items-center justify-center overflow-hidden scroll-mt-28">
        <div className="flex h-full w-full items-center justify-center px-6 sm:px-10 lg:px-12">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 w-full max-w-4xl text-center">
            <p className="mb-8 text-sm uppercase tracking-[0.3em] text-gold/80 sm:mb-10 sm:text-base">Svarna</p>
            <h1
              className="text-balance font-display text-5xl leading-tight text-text/95 sm:text-6xl md:text-7xl lg:text-8xl"
              aria-label="SIP THE GOLD"
            >
              <span className="inline whitespace-normal break-words">
                <span>{heroDisplayText}</span>
                <span aria-hidden="true" className="about-type-cursor" />
              </span>
            </h1>
            <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-text/70 sm:mt-10 sm:text-base md:text-lg md:leading-8">
              Small daily habits. Big long term results.
            </p>
            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:mt-14 sm:flex-row">
              <PremiumButton>Start Your Ritual</PremiumButton>
              <span className="rounded-full border border-text/10 bg-text/5 px-5 py-3 text-xs text-text/60 backdrop-blur-sm sm:text-sm">
                Beauty from within, reimagined.
              </span>
            </div>

            <div className="mt-16 sm:mt-20">
              <ScrollIndicator progress={pageProgress} />
            </div>
          </motion.div>
        </div>
      </section>

      <section
        ref={journeyContainerRef}
        className="min-h-[300dvh] min-h-[300svh] w-full pb-20 scroll-mt-28"
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
          <div className="relative h-[14.5rem] sm:h-[17rem] lg:h-[20rem] overflow-hidden rounded-[1.6rem] border border-text/10 bg-secondary/35">
            <img
              src="/Website_Assets/Starting frame.png"
              alt="Svarna Health brand story artwork"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.06),rgba(5,5,5,0.55))]" />
            <div className="absolute left-5 top-5 rounded-full border border-text/10 bg-void/65 px-3 py-1 text-[0.62rem] uppercase tracking-[0.34em] text-text/75 backdrop-blur-md">
              Our Story
            </div>
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
        <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[0.72rem] uppercase tracking-[0.42em] text-text/35">Shop the ritual</p>
            <h3 className="mt-4 font-display text-4xl leading-tight text-text/92 sm:text-5xl">Fresh wellness shots to your doorstep, crafted with care.</h3>
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
              <div className="overflow-hidden rounded-[1.4rem] border border-text/8 bg-surface/90">
                <img
                  src={product.src}
                  alt={product.title}
                  className="h-72 w-full object-cover object-center transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="px-2 pb-2 pt-4">
                <p className="text-[0.65rem] uppercase tracking-[0.34em] text-gold/65">Collection</p>
                <h4 className="mt-2 font-display text-2xl text-text/92">{product.title}</h4>
              </div>
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