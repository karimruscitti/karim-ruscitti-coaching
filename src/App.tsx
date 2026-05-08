import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from 'react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/myklrjav';
const instagramUrl = 'https://instagram.com/karimruscitti';

type FaqItem = {
  question: string;
  answer: string;
};

type ProofCard = {
  stars: string;
  text: string;
  avatar: string;
  name: string;
  detail: string;
};

type ResultCard = {
  beforeLabel: string;
  beforeValue: string;
  beforeClass?: string;
  lift: string;
  afterValue: string;
  name: string;
  className: string;
  timeline: string;
};

const credentials = [
  'Competitive Powerlifter',
  'International Level Athlete',
  '98 GL Points',
  'Online Coach',
];

const problemPoints = [
  'Cookie-cutter templates that ignore your actual strength levels',
  'Wrong volume and intensity for where you are right now',
  'No structure around your available training days',
  'Zero attention to your specific goals or competition timeline',
];

const offers = [
  {
    number: '01',
    title: 'Personalized Loading',
    text: 'Every set and rep is calculated from your current squat, bench, and deadlift maxes. Real percentages. Real progression. No guesswork.',
  },
  {
    number: '02',
    title: 'Schedule-Matched Split',
    text: '3 days a week or 6, the program structures itself around the days you can actually train. Built for your life, not an ideal scenario.',
  },
  {
    number: '03',
    title: 'Goal-Driven Selection',
    text: 'Peaking for competition? Building a base? Breaking a bench plateau? Exercise selection and periodization match your specific target.',
  },
];

const processSteps = [
  {
    number: '1',
    title: 'Apply Below',
    text: 'Fill out a short form with your lifts, training schedule, and goals. Takes about 60 seconds.',
    time: '~60 sec',
  },
  {
    number: '2',
    title: 'Personal Review',
    text: 'I go through every application individually. No bots. No auto-generated nonsense.',
  },
  {
    number: '3',
    title: 'Get Your Program',
    text: 'Your fully personalized 4-week training block is sent directly to you. Ready to go.',
    time: 'Within 48hrs',
  },
];

const qualifiers = [
  'You train the squat, bench, and deadlift seriously',
  "You've been lifting for at least 6 months",
  'You want to compete, or you already do',
  "You're tired of putting in the work and seeing no progress",
  'You want structure from someone who understands the platform',
];

const competitionHistory = [
  ['Pittsburgh Collegiate Cup', '2022 & 2023', 'Pittsburgh, PA'],
  ['USAPL Collegiate Nationals', '2023 & 2024', 'Arlington, TX & Atlanta, GA'],
  ['IPF Junior Worlds', '2024', "St. Paul's Bay, Malta"],
  ['Powerlifting America Nationals', '2025', 'Atlanta, GA'],
  ['IPF University Worlds', '2025', 'Istanbul, Turkey'],
  ['Qatar Nationals (BCQ Meet VII)', '2026', 'Doha, Qatar'],
];

const proofCards: ProofCard[] = [
  {
    stars: '★ ★ ★ ★ ★',
    text: "I've been working with Karim for a couple of months and have made the best progress of my life during that time. He communicates well, and you can tell the effort he puts into programming and adjusting things to my individual needs.\n\nWhat sets him apart is how responsive he is. He's helped me even during training sessions when I needed quick advice, and that level of support makes a big difference.\n\nI'd recommend him to anyone, beginner or experienced. You'll make better progress than you ever have before.",
    avatar: 'J',
    name: 'Jose Negron',
    detail: 'Advanced powerlifter, 105kg class',
  },
  {
    stars: '★ ★ ★ ★ ★',
    text: "Karim is a top-level coach. My lifts have gone up consistently, and I've stayed injury-free the entire time.\n\nHe focuses on proper form, smart programming, and long-term progress instead of just throwing weight around. Everything has a clear purpose, and that made a big difference for me.\n\nIf you want real strength gains without risking your body, he's the one.",
    avatar: 'A',
    name: 'Abdulaziz Al Badr',
    detail: 'Intermediate powerlifter, 75kg class',
  },
  {
    stars: '★ ★ ★ ★ ★',
    text: "Before working with Karim, I didn't have much structure. I would just go into the gym and do whatever felt right, and I didn't really understand things like RPE or RIR.\n\nEven in a short time, everything became much clearer. Learning RPE and RIR was easier than I expected, and it helped me understand how hard I should be pushing without overdoing it.\n\nThe program felt very structured, which made a big difference as a beginner. Every session had a purpose, and it made it easy to stay consistent and build confidence in the gym.",
    avatar: 'J',
    name: 'Jibril Afaa',
    detail: 'Beginner powerlifter, 83kg class',
  },
  {
    stars: '★ ★ ★ ★ ★',
    text: "Before working with Karim, my bench form was inconsistent and I was guessing every session.\n\nAfter working with him, everything started to make sense. He broke down my technique from the ground up and rebuilt it the right way. The difference in my lifting is clear. I went from not understanding proper form to benching 280 pounds with confidence.\n\nIf you're serious about getting stronger and doing things properly, I highly recommend Karim.",
    avatar: 'S',
    name: 'Sami Alnabulsi',
    detail: 'Beginner powerlifter, 83kg class',
  },
];

const resultCards: ResultCard[] = [
  {
    beforeLabel: 'Deadlift',
    beforeValue: '200kg x 3 @10',
    beforeClass: '90kg BW',
    lift: 'Deadlift',
    afterValue: '200kg x 5 @10',
    name: 'Joonas Sytela',
    className: '83kg class',
    timeline: 'Achieved within the first 3 months of coaching',
  },
  {
    beforeLabel: 'Bench',
    beforeValue: '170kg x 1 @10',
    lift: 'Bench',
    afterValue: '180kg x 1 @7',
    name: 'Jose Negron',
    className: '105kg class',
    timeline: 'Hit within the first 4 months of coaching',
  },
  {
    beforeLabel: 'Bench',
    beforeValue: '260lbs x 1 @10',
    lift: 'Bench',
    afterValue: '275lbs x 1 @9',
    name: 'Sami Alnabulsi',
    className: '83kg class',
    timeline: 'Achieved within the first 5 months of coaching',
  },
];

const faqs: FaqItem[] = [
  {
    question: 'How does the first month free work?',
    answer: "The first month is free for a limited number of lifters, so you can experience how my coaching works before committing long-term. You'll receive a full 4-week block built around your goals, schedule, and current training. After that, if you want to continue with full coaching, we can talk through the next steps.",
  },
  {
    question: 'How personalized is the program really?',
    answer: 'Very. I review every single application myself. Your percentages are based on your actual maxes, the training days match your schedule, and exercise selection targets your specific goals and weak points.',
  },
  {
    question: 'When will I receive my program?',
    answer: "Within 48 hours of submitting your application. I review each one individually, so it takes a bit of time, but that's exactly why the programming quality is high.",
  },
  {
    question: "I'm a beginner. Is this for me?",
    answer: "If you've been training the squat, bench, and deadlift for at least 6 months, yes. The coaching can scale to your level. If you're completely new to lifting, I'd recommend building a base first.",
  },
  {
    question: 'Will you coach me through the program?',
    answer: 'Yes. The first 4-week block is a full coaching experience so you can see exactly how I work. Programming, adjustments, and support are all included. If you want to continue after that, we move into ongoing coaching.',
  },
  {
    question: 'What format does the program come in?',
    answer: "You'll receive your program in a structured Google Sheet. It will include your exercises, sets, reps, and loading guidance. Depending on the lift and situation, loading may be prescribed through RPE, percentages, or direct load.",
  },
  {
    question: 'Do I need to understand RPE?',
    answer: 'Yes, at least at a basic level. Since the program may use RPE to manage effort and adjust training day to day, you should understand what RPE means and be willing to follow it honestly.',
  },
];

const experienceOptions = [
  ['Beginner', '< 1 year'],
  ['Intermediate', '1-3 years'],
  ['Advanced', '3-5 years'],
  ['Competitive', '5+ years'],
];

const preferredDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const goalOptions = [
  'Increase Total',
  'Competition Prep',
  'Break Plateau',
  'Build Base Strength',
  'Improve Technique',
  'First Meet Prep',
  'Hypertrophy Block',
];

function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const top = target.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: 'smooth' });
}

function useRevealOnScroll() {
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    );

    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
    return () => revealObserver.disconnect();
  }, []);
}

function useMobileCta() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const heroSection = document.querySelector('.hero');
      const applySection = document.getElementById('apply');
      if (!heroSection || !applySection) return;

      const heroBottom = heroSection.getBoundingClientRect().bottom;
      const applyTop = applySection.getBoundingClientRect().top;
      setIsVisible(heroBottom < -100 && applyTop > window.innerHeight * 0.5);
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    };

    update();
    window.addEventListener('scroll', onScroll);
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, []);

  return isVisible;
}

function SectionTag({ children }: { children: ReactNode }) {
  return <div className="section-tag">{children}</div>;
}

function ApplyButton({ children }: { children: string }) {
  return (
    <button type="button" className="btn-apply" onClick={() => scrollToSection('apply')}>
      {children}
      <span className="btn-apply-arrow">→</span>
    </button>
  );
}

function Header() {
  // Mobile nav state: desktop keeps the existing `.header-nav` styling unchanged.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileItemRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { label: 'Coaching', target: 'offer' },
    { label: 'Coach', target: 'coach' },
    { label: 'FAQ', target: 'faq' },
    { label: 'Apply For Coaching', target: 'apply', isCta: true },
  ];

  function handleNavClick(target: string) {
    setIsMenuOpen(false);
    scrollToSection(target);
  }

  // Accessibility: focus the first mobile item when opened, and close on Escape.
  useEffect(() => {
    if (!isMenuOpen) return;

    firstMobileItemRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="header">
      <button
        type="button"
        className="header-logo"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <div className="header-logo-mark" />
        <p>KARIM RUSCITTI</p>
      </button>

      {/* Desktop nav: existing CSS classes remain in control at 1024px and up. */}
      <nav className="header-nav max-[1023px]:hidden" aria-label="Primary navigation">
        {navItems.map((item) => (
          <button
            type="button"
            onClick={() => scrollToSection(item.target)}
            className={item.isCta ? 'header-cta' : undefined}
            key={item.label}
          >
            {item.label}
          </button>
        ))}
      </nav>

      {/* Mobile/tablet hamburger: Tailwind-only responsive extension, hidden at 1024px and up. */}
      <button
        type="button"
        ref={menuButtonRef}
        className="hidden max-[1023px]:inline-flex h-10 w-10 items-center justify-center rounded border border-[#2a2a35] bg-[#121217] text-[#eeeef0] transition-colors hover:border-[#35354a] focus:outline-none focus:ring-2 focus:ring-[#e11d28] focus:ring-offset-2 focus:ring-offset-[#07070a]"
        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
        <span className="flex h-5 w-5 flex-col justify-center gap-1.5" aria-hidden="true">
          <span className={`h-0.5 w-5 rounded bg-current transition-transform ${isMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-5 rounded bg-current transition-opacity ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`h-0.5 w-5 rounded bg-current transition-transform ${isMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </span>
      </button>

      {/* Mobile/tablet dropdown: vertical menu, closes after selection. */}
      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        className={`${isMenuOpen ? 'max-[1023px]:block' : 'hidden'} min-[1024px]:hidden fixed left-0 right-0 top-[calc(64px+env(safe-area-inset-top))] border-b border-[#2a2a35] bg-[#07070a]/95 px-4 py-4 shadow-2xl backdrop-blur-xl`}
      >
        <div className="mx-auto flex w-full max-w-sm flex-col gap-2">
          {navItems.map((item, index) => (
            <button
              type="button"
              ref={index === 0 ? firstMobileItemRef : undefined}
              className={`${item.isCta ? 'bg-[#e11d28] text-white shadow-[0_0_24px_rgba(225,29,40,0.25)]' : 'bg-[#121217] text-[#eeeef0]'} w-full rounded border border-[#2a2a35] px-4 py-3 text-left font-body text-xs font-bold uppercase tracking-[0.16em] transition-colors hover:border-[#35354a] focus:outline-none focus:ring-2 focus:ring-[#e11d28] focus:ring-offset-2 focus:ring-offset-[#07070a]`}
              onClick={() => handleNavClick(item.target)}
              key={item.label}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-bg-image" />
      </div>
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />

      <div className="hero-content">
        <div className="hero-text">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            Accepting applications
          </div>
          <h1>
            ONLINE COACHING.<br />
            <span className="hero-thin">BUILT</span> <span className="hero-em">PROPERLY</span>.
          </h1>
          <p className="hero-subhead">Finally start seeing progress from your training.</p>
          <p className="hero-desc">
            I&apos;ll coach you block by block with programming, adjustments, check-ins, form reviews,
            diet guidance, and direct support built around your progress.
          </p>
          <div className="hero-actions">
            <ApplyButton>Apply For Coaching</ApplyButton>
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="hero-social-link">@karimruscitti</a>
          </div>
          <p className="hero-fineprint">First month free for a limited number of lifters.</p>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">700<span>kg</span></div>
              <div className="hero-stat-label">Competition Total</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">477<span>.83</span></div>
              <div className="hero-stat-label">DOTS Score</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">83<span>kg</span></div>
              <div className="hero-stat-label">Weight Class</div>
            </div>
          </div>
        </div>

        <div className="hero-portrait">
          <img src="/assets/images/karim-hero.jpg" alt="Karim Ruscitti at a powerlifting competition" />
        </div>
      </div>

      <div className="scroll-cue">
        <div className="scroll-cue-text">Scroll</div>
        <div className="scroll-cue-line" />
      </div>
    </section>
  );
}

function CredibilityBar() {
  return (
    <div className="cred-bar">
      <div className="cred-bar-inner">
        {credentials.map((item) => (
          <div className="cred-item" key={item}>
            <div className="cred-item-icon" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProblemSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const posterImage = '/assets/images/thumbnail.png';

  function togglePlay() {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.muted = false;
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  }

  return (
    <section className="problem">
      <div className="problem-grid">
        <div className="problem-text reveal">
          <SectionTag>The Problem</SectionTag>
          <h2 className="section-title">Generic Programs<br />Aren&apos;t Built For You</h2>
          <p className="section-subtitle" style={{ marginTop: 16 }}>
            They don&apos;t know your numbers. They don&apos;t account for your weak points.
            They don&apos;t fit your schedule. That&apos;s why you plateau.
          </p>
          <ul className="problem-points">
            {problemPoints.map((point) => (
              <li className="problem-point" key={point}>
                <div className="problem-point-icon">x</div>
                {point}
              </li>
            ))}
          </ul>
        </div>
        <div className="problem-visual reveal reveal-delay-2">
          <div className="problem-visual-tag">@karimruscitti</div>
          <video
            ref={videoRef}
            src="/assets/Coaching_Website_Video.mp4"
            poster={posterImage}
            loop
            playsInline
            className="problem-visual-video"
            onClick={togglePlay}
          />
          {!isPlaying && (
            <button
              type="button"
              className="problem-visual-play-button"
              onClick={togglePlay}
              aria-label="Play video"
            >
              <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
                <path d="M20 11L0 22V0L20 11Z" fill="white" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function OfferSection() {
  return (
    <section className="offer" id="offer">
      <div className="offer-header reveal">
        <SectionTag>What You Get</SectionTag>
        <h2 className="section-title">Your Program.<br />Your Numbers. Your Rules.</h2>
        <p className="section-subtitle">Built around your lifts, your schedule, and how you actually recover.</p>
      </div>
      <div className="offer-grid">
        {offers.map((offer, index) => (
          <div className={`offer-card reveal reveal-delay-${index + 1}`} key={offer.title}>
            <div className="offer-card-number">{offer.number}</div>
            <h3>{offer.title}</h3>
            <p>{offer.text}</p>
          </div>
        ))}
      </div>
      <div className="offer-cta reveal">
        <ApplyButton>Get Your Custom Program</ApplyButton>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="process">
      <div className="process-header reveal">
        <SectionTag>How It Works</SectionTag>
        <h2 className="section-title">Three Steps.<br />Your Program In 48 Hours.</h2>
      </div>
      <div className="process-steps">
        {processSteps.map((step, index) => (
          <div className={`process-step reveal reveal-delay-${index + 1}`} key={step.number}>
            <div className="process-step-num">{step.number}</div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
            {step.time && <span className="process-step-time">{step.time}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}

function QualifierSection() {
  return (
    <section className="qualifier">
      <div className="qualifier-inner">
        <div className="reveal">
          <SectionTag>Who This Is For</SectionTag>
          <h2 className="section-title">This Is For You If</h2>
          <ul className="qualifier-list">
            {qualifiers.map((item) => (
              <li className="qualifier-item" key={item}>
                <span className="qualifier-check">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="qualifier-right reveal reveal-delay-2">
          <div className="qualifier-right-quote">&quot;</div>
          <p>Before working with Karim, I had no real structure. I had tried multiple programs, but none of them gave me real results because they weren&apos;t built for me.</p>
          <p>Since starting with him in January, I&apos;ve made more progress in a few months than I did in years. The biggest difference is that I actually understand how to train now. I&apos;m not just pushing hard every session. I know how to manage effort and follow RPE properly.</p>
          <p>He also helped bring back my enjoyment of training. The program is built around your schedule, goals, and recovery, which made it easy to stay consistent. Every session has a clear purpose, and that&apos;s what finally helped me start progressing properly.</p>
          <div className="qualifier-right-author">Joonas Sytela</div>
          <div className="qualifier-right-role">Intermediate powerlifter, 83kg class</div>
        </div>
      </div>
    </section>
  );
}

function CoachSection() {
  return (
    <section className="coach" id="coach">
      <div className="coach-inner">
        <div className="coach-image reveal">
          <img src="/assets/images/karim-coach.jpg" alt="Karim Ruscitti competing at SBD powerlifting competition" />
        </div>
        <div className="coach-info reveal reveal-delay-2">
          <SectionTag>Your Coach</SectionTag>
          <div className="coach-name">Karim Ruscitti</div>
          <a href={instagramUrl} target="_blank" rel="noreferrer" className="coach-handle">@karimruscitti</a>
          <div className="coach-bio">
            <p>I&apos;ve been training powerlifting since March 2020 and coaching since April 2025. What I teach comes from years in the sport, running different programs, making mistakes, and learning what actually works in practice.</p>
            <p>I stay up to date with research and programming methods, but I care just as much about what works under the bar.</p>
            <p>Every athlete is different, and I coach with that in mind. Programming is not just sets and reps. It is the person executing it. What works for one lifter will not always work for another, so I adjust not just for physiology and biomechanics, but for personality and mindset as well.</p>
            <p>My goal is to help lifters progress without repeating the same mistakes I made early on.</p>
          </div>
          <div className="comp-history">
            <div className="comp-history-label">Competition History</div>
            <ul className="comp-list">
              {competitionHistory.map(([name, years, place]) => (
                <li className="comp-item" key={name}>
                  <div className="comp-name">{name}</div>
                  <div className="comp-meta">
                    {years} <span className="comp-meta-dot">•</span> {place}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofSection() {
  return (
    <section className="proof">
      <div className="proof-header reveal">
        <SectionTag>Results</SectionTag>
        <h2 className="section-title">What Athletes Are Saying</h2>
        <p className="section-subtitle">From beginners learning proper technique to experienced lifters hitting PRs.</p>
      </div>
      <div className="proof-grid">
        {proofCards.map((card, index) => (
          <div className={`proof-card reveal reveal-delay-${index + 1}`} key={card.name}>
            <div className="proof-card-stars" aria-label="Five star review">{card.stars}</div>
            <p className="proof-card-text">&quot;{card.text}&quot;</p>
            <div className="proof-card-author">
              <div className="proof-card-avatar">{card.avatar}</div>
              <div>
                <div className="proof-card-name">{card.name}</div>
                <div className="proof-card-detail">{card.detail}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="proof-results">
        {resultCards.map((card, index) => (
          <div className={`proof-result-card reveal ${index ? `reveal-delay-${index}` : ''}`} key={card.name}>
            <div className="result-stat-before">BEFORE</div>
            <div className="result-stat-lift-label">{card.beforeLabel}</div>
            <div className="result-stat-numbers">{card.beforeValue}</div>
            {card.beforeClass && <div className="result-stat-class" style={{ marginTop: 4 }}>{card.beforeClass}</div>}
            <div className="result-stat-arrow">↓ PROGRESS ↓</div>
            <div className="result-stat-after">AFTER</div>
            <div className="result-stat-lift-label">{card.lift}</div>
            <div className="result-stat-numbers is-after">{card.afterValue}</div>
            <div className="result-stat-spacer" />
            <div className="result-stat-divider" />
            <div className="result-stat-name">{card.name}</div>
            <div className="result-stat-class">{card.className}</div>
            <div className="result-stat-timeline">{card.timeline}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="faq" id="faq">
      <div className="faq-inner">
        <div className="faq-header reveal">
          <SectionTag>FAQ</SectionTag>
          <h2 className="section-title">Common Questions</h2>
        </div>
        {faqs.map((faq, index) => (
          <div
            // Keep `visible` in React state so FAQ clicks do not remove the scroll-reveal class.
            className={`faq-item reveal visible ${openFaq === index ? 'open' : ''}`}
            key={faq.question}
          >
            <button
              className="faq-question"
              type="button"
              aria-expanded={openFaq === index}
              aria-controls={`faq-answer-${index}`}
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            >
              {faq.question}
              <span className="faq-icon">+</span>
            </button>
            <div className="faq-answer" id={`faq-answer-${index}`}>
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ApplicationForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(1);
  const [unit, setUnit] = useState<'kg' | 'lbs'>('kg');
  const [experience, setExperience] = useState('');
  const [daysPerWeek, setDaysPerWeek] = useState(0);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [goals, setGoals] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [invalidFields, setInvalidFields] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [shakeStep, setShakeStep] = useState(0);

  const prefDaysHelper = useMemo(() => {
    if (daysPerWeek === 0) return 'First, choose how many days per week you can train above.';
    if (selectedDays.length === daysPerWeek) return `Great, ${daysPerWeek} day${daysPerWeek === 1 ? '' : 's'} selected.`;
    return `Please select exactly ${daysPerWeek} day${daysPerWeek === 1 ? '' : 's'}. (${selectedDays.length}/${daysPerWeek} selected)`;
  }, [daysPerWeek, selectedDays.length]);

  function triggerShake(activeStep: number) {
    setShakeStep(activeStep);
    window.setTimeout(() => setShakeStep(0), 500);
  }

  function getInputValue(id: string) {
    const input = document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | null;
    return input?.value.trim() ?? '';
  }

  function markInvalid(fields: string[]) {
    setInvalidFields(fields);
    window.setTimeout(() => setInvalidFields([]), 2000);
  }

  function validateStep(activeStep: number) {
    if (activeStep === 1) {
      const missing = ['f-name', 'f-email'].filter((id) => !getInputValue(id));
      if (missing.length) {
        markInvalid(missing);
        return false;
      }
    }

    if (activeStep === 2) {
      const missing = ['f-squat', 'f-bench', 'f-dead'].filter((id) => !getInputValue(id));
      if (missing.length) {
        markInvalid(missing);
        return false;
      }
    }

    if (activeStep === 3 && (daysPerWeek === 0 || selectedDays.length !== daysPerWeek)) return false;

    return true;
  }

  function goStep(nextStep: number) {
    if (nextStep > step && !validateStep(step)) {
      triggerShake(step);
      return;
    }

    setStep(nextStep);
    if (window.innerWidth < 768) {
      document.querySelector('.form-card')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function selectTrainingDays(dayCount: number) {
    setDaysPerWeek(dayCount);
    setSelectedDays((current) => current.slice(0, dayCount));
  }

  function togglePreferredDay(day: string) {
    setSelectedDays((current) => {
      if (current.includes(day)) return current.filter((selectedDay) => selectedDay !== day);
      if (daysPerWeek === 0 || current.length >= daysPerWeek) return current;
      return [...current, day];
    });
  }

  function toggleGoal(goal: string) {
    setGoals((current) => (
      current.includes(goal)
        ? current.filter((selectedGoal) => selectedGoal !== goal)
        : [...current, goal]
    ));
  }

  async function submitApp(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const name = getInputValue('f-name');
    const email = getInputValue('f-email');
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !email || !emailIsValid) {
      setStep(1);
      markInvalid(['f-name', 'f-email'].filter((id) => !getInputValue(id)));
      return;
    }

    if (!formRef.current) return;

    setIsSubmitting(true);
    const formData = new FormData(formRef.current);
    formData.set('_replyto', email);
    formData.set('unit', unit);
    formData.set('experience', experience);
    formData.set('days_per_week', daysPerWeek ? String(daysPerWeek) : '');
    formData.set('preferred_days', selectedDays.join(', '));
    formData.set('goals', goals.join(', '));

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setIsSuccess(true);
        return;
      }

      let message = 'Your application could not be sent. Please try again, or message me on Instagram if the problem continues.';
      try {
        const data = await response.json() as { errors?: { message?: string }[] };
        if (data.errors?.length) {
          message = data.errors.map((item) => item.message).filter(Boolean).join(' ') || message;
        }
      } catch {
        // Keep the default fallback message.
      }
      setError(message);
    } catch {
      setError('Could not reach the server. Check your connection and try again, or message me on Instagram.');
    } finally {
      setIsSubmitting(false);
    }
  }

  const helperIsError = step === 3 && daysPerWeek > 0 && selectedDays.length !== daysPerWeek;

  return (
    <section className="apply-section" id="apply">
      <div className="apply-glow" />
      <div className="apply-header reveal">
        <SectionTag>Apply Now</SectionTag>
        <h2 className="section-title">Get Your Program</h2>
        <p className="section-subtitle">60 SECONDS. A PROGRAM BUILT AROUND YOU.</p>
      </div>

      <div className="form-wrapper reveal">
        <div className="form-card">
          <form id="apply-form" ref={formRef} noValidate onSubmit={submitApp}>
            {!isSuccess && (
              <div className="form-progress">
                {[1, 2, 3, 4].map((dotStep) => (
                  <div
                    className={`form-prog-dot ${dotStep === step ? 'active' : ''} ${dotStep < step ? 'done' : ''}`}
                    key={dotStep}
                  />
                ))}
              </div>
            )}

            <div className={`form-step ${step === 1 && !isSuccess ? 'active' : ''}`} data-step="1">
              <div className="form-step-header">
                <div className="form-step-count">Step 1 of 4</div>
                <div className="form-step-title">Your Details</div>
                <div className="form-step-desc">The basics so I can send your program.</div>
              </div>
              <div className="field">
                <label className="field-label" htmlFor="f-name">Full Name <span className="field-required">*</span></label>
                <input className={`field-input ${invalidFields.includes('f-name') ? 'is-invalid' : ''}`} type="text" id="f-name" name="full_name" placeholder="Your full name" required />
              </div>
              <div className="field">
                <label className="field-label" htmlFor="f-email">Email <span className="field-required">*</span></label>
                <input className={`field-input ${invalidFields.includes('f-email') ? 'is-invalid' : ''}`} type="email" id="f-email" name="email" placeholder="you@email.com" required />
              </div>
              <div className="field">
                <label className="field-label" htmlFor="f-ig">Instagram</label>
                <input className="field-input" type="text" id="f-ig" name="instagram" placeholder="@yourhandle" />
              </div>
              <div className="form-nav">
                <button type="button" className={`btn-form-next ${shakeStep === 1 ? 'is-shaking' : ''}`} onClick={() => goStep(2)}>Continue →</button>
              </div>
            </div>

            <div className={`form-step ${step === 2 && !isSuccess ? 'active' : ''}`} data-step="2">
              <div className="form-step-header">
                <div className="form-step-count">Step 2 of 4</div>
                <div className="form-step-title">Your Numbers</div>
                <div className="form-step-desc">Your recent best lifts. These drive your program.</div>
              </div>
              <div className="unit-toggle">
                <button type="button" className={`unit-toggle-btn ${unit === 'kg' ? 'active' : ''}`} onClick={() => setUnit('kg')}>KG</button>
                <button type="button" className={`unit-toggle-btn ${unit === 'lbs' ? 'active' : ''}`} onClick={() => setUnit('lbs')}>LBS</button>
              </div>
              {[
                ['f-squat', 'squat', 'Best Squat', 'e.g. 180'],
                ['f-bench', 'bench', 'Best Bench', 'e.g. 120'],
                ['f-dead', 'deadlift', 'Best Deadlift', 'e.g. 220'],
                ['f-bw', 'bodyweight', 'Bodyweight', 'e.g. 83'],
              ].map(([id, name, label, placeholder], index) => (
                <div className="field" key={id}>
                  <label className="field-label" htmlFor={id}>{label} {index < 3 && <span className="field-required">*</span>}</label>
                  <div className="field-lift-wrap">
                    <input className={`field-input ${invalidFields.includes(id) ? 'is-invalid' : ''}`} type="number" id={id} name={name} placeholder={placeholder} />
                    <span className="field-lift-unit unit-label">{unit.toUpperCase()}</span>
                  </div>
                </div>
              ))}
              <div className="form-nav">
                <button type="button" className="btn-form-back" onClick={() => goStep(1)}>← Back</button>
                <button type="button" className={`btn-form-next ${shakeStep === 2 ? 'is-shaking' : ''}`} onClick={() => goStep(3)}>Continue →</button>
              </div>
            </div>

            <div className={`form-step ${step === 3 && !isSuccess ? 'active' : ''}`} data-step="3">
              <div className="form-step-header">
                <div className="form-step-count">Step 3 of 4</div>
                <div className="form-step-title">Your Training</div>
                <div className="form-step-desc">So I can match the program to your life.</div>
              </div>
              <div className="field">
                <label className="field-label">Experience Level</label>
                <div className="select-grid">
                  {experienceOptions.map(([title, sub]) => (
                    <button type="button" className={`select-option ${experience === title ? 'selected' : ''}`} onClick={() => setExperience(title)} key={title}>
                      <div className="select-option-title">{title}</div>
                      <div className="select-option-sub">{sub}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="field">
                <label className="field-label">Days per week you can train</label>
                <div className="days-row">
                  {[2, 3, 4, 5, 6].map((dayCount) => (
                    <button type="button" className={`day-opt ${daysPerWeek === dayCount ? 'selected' : ''}`} onClick={() => selectTrainingDays(dayCount)} key={dayCount}>
                      {dayCount}
                    </button>
                  ))}
                </div>
              </div>
              <div className="field" id="pref-days-field">
                <label className="field-label">Which days do you prefer to train?</label>
                <div className="pref-days" id="pref-days">
                  {preferredDays.map((day) => (
                    <button
                      type="button"
                      className={`pref-day ${selectedDays.includes(day) ? 'selected' : ''}`}
                      data-day={day}
                      onClick={() => togglePreferredDay(day)}
                      key={day}
                    >
                      {day}
                    </button>
                  ))}
                </div>
                <div className={`field-helper ${helperIsError ? 'error' : ''}`} id="pref-days-helper">{prefDaysHelper}</div>
              </div>
              <div className="form-nav">
                <button type="button" className="btn-form-back" onClick={() => goStep(2)}>← Back</button>
                <button type="button" className={`btn-form-next ${shakeStep === 3 ? 'is-shaking' : ''}`} onClick={() => goStep(4)}>Continue →</button>
              </div>
            </div>

            <div className={`form-step ${step === 4 && !isSuccess ? 'active' : ''}`} data-step="4">
              <div className="form-step-header">
                <div className="form-step-count">Step 4 of 4</div>
                <div className="form-step-title">Your Goals</div>
                <div className="form-step-desc">What are you working toward? Select all that apply.</div>
              </div>
              <div className="field">
                <div className="goal-chips">
                  {goalOptions.map((goal) => (
                    <button type="button" className={`goal-chip ${goals.includes(goal) ? 'selected' : ''}`} onClick={() => toggleGoal(goal)} key={goal}>
                      {goal}
                    </button>
                  ))}
                </div>
              </div>
              <div className="field">
                <label className="field-label" htmlFor="f-notes">Anything else I should know?</label>
                <textarea className="field-input field-textarea" id="f-notes" name="notes" placeholder="Injuries, weak points, competition dates, preferences..." />
              </div>
              <div className="form-nav">
                <button type="button" className="btn-form-back" onClick={() => goStep(3)}>← Back</button>
                <button type="submit" className="btn-form-next" id="btn-submit-app" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Submit Application →'}
                </button>
              </div>
            </div>

            <div className={`form-success ${isSuccess ? 'active' : ''}`} id="form-success">
              <div className="success-check">✓</div>
              <h3>Application Received</h3>
              <p>I&apos;ll personally review your application and send your custom 4-week program within 48 hours. Keep an eye on your inbox.</p>
              <a href={instagramUrl} target="_blank" rel="noreferrer" className="follow-link">Follow @karimruscitti for updates →</a>
            </div>

            <div className={`form-error ${error ? 'active' : ''}`} id="form-error" role="alert" aria-live="polite">
              <div className="form-error-title">Something went wrong</div>
              <p className="form-error-text" id="form-error-text">{error}</p>
              <div className="form-error-actions">
                <button type="button" className="btn-form-back" onClick={() => setError('')}>Try again</button>
                <a href={instagramUrl} target="_blank" rel="noreferrer" className="follow-link">Message @karimruscitti →</a>
              </div>
            </div>

            <input type="hidden" name="unit" value={unit} />
            <input type="hidden" name="experience" value={experience} />
            <input type="hidden" name="days_per_week" value={daysPerWeek || ''} />
            <input type="hidden" name="preferred_days" value={selectedDays.join(', ')} />
            <input type="hidden" name="goals" value={goals.join(', ')} />
            <input type="hidden" name="_subject" value="New coaching application" />
            <input type="hidden" name="_replyto" value="" readOnly />
            <div style={{ position: 'absolute', left: -9999, top: -9999 }} aria-hidden="true">
              <label>Leave this empty: <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" /></label>
            </div>
          </form>
        </div>
        <div className="form-trust">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
          </svg>
          Your information is kept private and never shared
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="final-cta">
      <div className="reveal">
        <SectionTag>Don&apos;t Overthink It</SectionTag>
        <h2 className="section-title">60 Seconds Now.<br />4 Weeks of Real Programming.</h2>
        <p className="section-subtitle">
          You&apos;ve read this far. You know your current program isn&apos;t doing the job.
          Let someone who competes build your next training block.
        </p>
        <ApplyButton>Apply For Your Free Program</ApplyButton>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2026 Karim Ruscitti | @karimruscitti | All rights reserved</p>
    </footer>
  );
}

function MobileCta({ isVisible }: { isVisible: boolean }) {
  return (
    <div className={`mobile-cta-bar ${isVisible ? 'visible' : ''}`} id="mobileCta">
      <button type="button" onClick={() => scrollToSection('apply')}>Apply Free | 60 Seconds</button>
    </div>
  );
}

export default function App() {
  useRevealOnScroll();
  const mobileCtaVisible = useMobileCta();

  return (
    // Prevent small-screen horizontal overflow without changing desktop layout.
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <Hero />
      <CredibilityBar />
      <ProblemSection />
      <OfferSection />
      <ProcessSection />
      <QualifierSection />
      <CoachSection />
      <ProofSection />
      <FaqSection />
      <ApplicationForm />
      <FinalCta />
      <Footer />
      <MobileCta isVisible={mobileCtaVisible} />
    </div>
  );
}
