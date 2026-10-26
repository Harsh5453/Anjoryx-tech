import { useEffect, useRef } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Monitor, Network, Server, Database, ShieldCheck, Cloud, GitBranch, Sparkles } from 'lucide-react';

/* ------------------------------------------------------------------
   StackRoller — a real 3D drum built with CSS 3D transforms.
   Eight panels sit around a horizontal axle; each one is a layer of the
   stack ANJORYX ships (Frontend → API → Backend → Database → Security → Cloud → Workflow → AI).

   It rolls on its own, speeds up as the page scrolls, can be dragged
   (mouse) and eases back to its idle speed with inertia, and the whole
   drum leans toward the pointer. Rotation lives in motion values, so
   nothing re-renders per frame. Reduced-motion visitors get a still drum
   they can still turn by hand.
------------------------------------------------------------------- */

const LAYERS = [
  { label: 'Frontend', detail: 'React · Tailwind CSS', icon: Monitor, tint: 'bg-tint-sky' },
  { label: 'API', detail: 'REST · Spring Security', icon: Network, tint: 'bg-tint-mint' },
  { label: 'Backend', detail: 'Java · Spring Boot', icon: Server, tint: 'bg-tint-lilac' },
  { label: 'Database', detail: 'MySQL · MongoDB', icon: Database, tint: 'bg-tint-peach' },
  { label: 'Security', detail: 'JWT · Spring Security', icon: ShieldCheck, tint: 'bg-tint-sky' },
  { label: 'Cloud', detail: 'Docker · Vercel · Render', icon: Cloud, tint: 'bg-tint-mint' },
  { label: 'Workflow', detail: 'Git · GitHub', icon: GitBranch, tint: 'bg-tint-lilac' },
  { label: 'AI', detail: 'LLM integrations · Automation', icon: Sparkles, tint: 'bg-tint-peach' },
];

const N = LAYERS.length;
const STEP = 360 / N;
const FACE_W = 380;
const FACE_H = 104;
const RADIUS = Math.round(FACE_H / 2 / Math.tan(Math.PI / N)) + 10; // apothem + small gap
const FLANGE_D = RADIUS * 2 + 44;
const IDLE_SPEED = 0.014; // degrees per millisecond (~14°/s)

function Face({ layer, index, rotation }) {
  const Icon = layer.icon;
  const base = index * STEP;
  // Darken panels as they roll away from the viewer to sell the curvature.
  const shade = useTransform(rotation, (r) => {
    const rad = ((base + r) * Math.PI) / 180;
    return Math.min(0.3, (1 - Math.cos(rad)) * 0.22);
  });

  return (
    <div
      className="backface-hidden absolute left-1/2 top-1/2"
      style={{
        width: FACE_W,
        height: FACE_H,
        marginLeft: -FACE_W / 2,
        marginTop: -FACE_H / 2,
        transform: `rotateX(${base}deg) translateZ(${RADIUS}px)`,
      }}
    >
      <div
        className={`relative flex h-full w-full items-center gap-4 overflow-hidden rounded-2xl border border-white/70 px-5 shadow-card dark:border-white/10 ${layer.tint}`}
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface text-accent shadow-card">
          <Icon size={22} strokeWidth={2} />
        </span>
        <span className="min-w-0">
          <span className="block font-display text-lg font-semibold leading-tight text-text">
            {layer.label}
          </span>
          <span className="mt-0.5 block truncate text-sm text-textMuted">{layer.detail}</span>
        </span>
        <span
          className="absolute right-4 top-4 h-2 w-2 rounded-full bg-coral"
          aria-hidden="true"
        />
        {/* glossy highlight */}
        <span
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent dark:from-white/10"
          aria-hidden="true"
        />
        {/* rolling shade */}
        <motion.span
          className="pointer-events-none absolute inset-0 bg-[#2A4A7F]"
          style={{ opacity: shade }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

function Flange({ side }) {
  const x = side * (FACE_W / 2 + 10);
  return (
    <>
      {/* wheel */}
      <div
        className="absolute left-1/2 top-1/2 rounded-full border border-white/70 shadow-card dark:border-white/10"
        style={{
          width: FLANGE_D,
          height: FLANGE_D,
          marginLeft: -FLANGE_D / 2,
          marginTop: -FLANGE_D / 2,
          transform: `translateX(${x}px) rotateY(90deg)`,
          background:
            'repeating-conic-gradient(from 0deg, rgb(var(--accent) / 0.22) 0deg 3deg, transparent 3deg 30deg), radial-gradient(circle at 50% 50%, rgb(var(--surface)) 0 22%, rgb(var(--tint-sky)) 23% 70%, rgb(var(--accent) / 0.45) 100%)',
        }}
        aria-hidden="true"
      />
      {/* axle stub */}
      <div
        className="absolute left-1/2 top-1/2 h-7 rounded-full"
        style={{
          width: 54,
          marginLeft: -27,
          marginTop: -14,
          transform: `translateX(${side * (FACE_W / 2 + 36)}px)`,
          background:
            'linear-gradient(180deg, rgb(var(--surface)) 0%, rgb(var(--accent-alt)) 45%, rgb(var(--accent)) 100%)',
          boxShadow: '0 6px 14px -6px rgb(var(--accent) / 0.6)',
        }}
        aria-hidden="true"
      />
    </>
  );
}

function Chip({ children, className, depth, mx, my }) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div style={{ x, y }} className={`absolute ${className}`} aria-hidden="true">
      <div className="animate-float rounded-full border border-border/80 bg-surface px-4 py-2 text-xs font-semibold text-text shadow-card">
        {children}
      </div>
    </motion.div>
  );
}

export default function StackRoller() {
  const reduce = useReducedMotion();
  const stageRef = useRef(null);

  const rotation = useMotionValue(-18); // drum angle (deg)
  const velocity = useRef(IDLE_SPEED); // deg / ms
  const dragging = useRef(false);
  const lastY = useRef(0);
  const lastT = useRef(0);

  // Reduced-motion visitors get a still drum from the first frame.
  useEffect(() => {
    if (reduce) velocity.current = 0;
  }, [reduce]);

  // Page scroll nudges the drum, so it feels attached to the page.
  const { scrollY } = useScroll();
  const scrollRoll = useTransform(scrollY, (v) => (reduce ? 0 : v * 0.16));
  const total = useTransform([rotation, scrollRoll], ([r, s]) => r + s);

  // Pointer-driven lean (parallax)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 90, damping: 18 });
  const smy = useSpring(my, { stiffness: 90, damping: 18 });
  const leanY = useTransform(smx, (v) => -13 + v * 12);
  const leanZ = useTransform(smx, (v) => -2 + v * 2);
  const leanX = useTransform(smy, (v) => v * -6);

  useAnimationFrame((_, delta) => {
    if (dragging.current) return;
    const target = reduce ? 0 : IDLE_SPEED;
    // ease back to idle speed — this is the "inertia" after a drag
    velocity.current += (target - velocity.current) * Math.min(1, delta * 0.0035);
    rotation.set(rotation.get() + velocity.current * delta);
  });

  function onPointerMove(e) {
    const rect = stageRef.current?.getBoundingClientRect();
    if (rect) {
      mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 2);
      my.set(((e.clientY - rect.top) / rect.height - 0.5) * 2);
    }
    if (dragging.current) {
      const now = performance.now();
      const dy = e.clientY - lastY.current;
      const dt = Math.max(1, now - lastT.current);
      const deg = -dy * 0.5; // dragging up rolls the front face up
      rotation.set(rotation.get() + deg);
      velocity.current = Math.max(-0.5, Math.min(0.5, deg / dt));
      lastY.current = e.clientY;
      lastT.current = now;
    }
  }

  function onPointerDown(e) {
    if (e.pointerType === 'touch') return; // touch keeps native page scrolling
    dragging.current = true;
    lastY.current = e.clientY;
    lastT.current = performance.now();
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }

  function endDrag(e) {
    dragging.current = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  }

  function onPointerLeave() {
    mx.set(0);
    my.set(0);
  }

  const description = `Interactive 3D roller showing the layers of the stack: ${LAYERS.map((l) => l.label).join(', ')}.`;

  return (
    <div
      ref={stageRef}
      role="img"
      aria-label={description}
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onPointerLeave={onPointerLeave}
      className="relative mx-auto flex h-[340px] w-full max-w-[620px] cursor-grab select-none items-center justify-center active:cursor-grabbing sm:h-[500px]"
      style={{ touchAction: 'pan-y' }}
    >
      {/* soft pastel glow + floor shadow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-accentAlt/30 via-accent/20 to-coral/25 blur-3xl animate-drift"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-6 left-1/2 h-8 w-[300px] -translate-x-1/2 rounded-[50%] bg-[#0F1F3D]/20 blur-xl"
        aria-hidden="true"
      />

      <Chip className="left-2 top-6" depth={14} mx={smx} my={smy}>REST APIs</Chip>
      <Chip className="right-2 top-3" depth={-18} mx={smx} my={smy}>JWT auth</Chip>
      <Chip className="bottom-6 right-6" depth={-12} mx={smx} my={smy}>Docker-ready</Chip>

      {/* scale the fixed-size 3D scene down on small screens */}
      <div className="roller-stage origin-center scale-[0.6] min-[420px]:scale-[0.68] sm:scale-100" style={{ width: FACE_W + 120, height: FLANGE_D }}>
        <motion.div
          className="preserve-3d relative h-full w-full"
          style={{ rotateY: leanY, rotateZ: leanZ, rotateX: leanX }}
        >
          <motion.div className="preserve-3d absolute inset-0" style={{ rotateX: total }}>
            <Flange side={-1} />
            <Flange side={1} />
            {LAYERS.map((layer, i) => (
              <Face key={layer.label} layer={layer} index={i} rotation={total} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
