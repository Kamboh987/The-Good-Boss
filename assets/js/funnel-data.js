// The Good Boss - Structured Data Repository

const COURSE_DATA = {
  phases: {
    phase1: {
      id: "phase1",
      number: "01",
      name: "Phase 1: Foundation Architecture",
      tier: "Base Tier: Life & Self-Development Coaching",
      duration: "Weeks 1 - 4 (1 Course / Week)",
      type: "Fixed Curriculum",
      isElective: false,
      description: "Before you can command an enterprise or inspire a team, you must conquer your inner operating system. Phase 1 sets the bedrock of unshakeable mental clarity, emotional discipline, and high-stakes personal governance.",
      courses: [
        {
          week: "Week 01",
          code: "FND-101",
          title: "Mindset Architecture & Emotional Mastery",
          focus: "Cognitive reframing, emotional regulation under pressure, and eliminating executive blind spots.",
          deliverables: ["Personal Cognitive Audit", "Emotional Regulation Playbook", "Real-time Stress Triage Matrix"]
        },
        {
          week: "Week 02",
          code: "FND-102",
          title: "High-Stakes Decision Making & Strategic Clarity",
          focus: "Frameworks for rapid probabilistic decisions with incomplete data; mental models of elite operators.",
          deliverables: ["Bespoke Decision Tree Template", "Cognitive Bias Diagnostic", "Second-Order Thinking Protocol"]
        },
        {
          week: "Week 03",
          code: "FND-103",
          title: "Time Mastery & The Energy Protocol",
          focus: "Moving from reactive firefighting to ruthless priority execution. Architecting deep work sanctuaries.",
          deliverables: ["Executive Time-Audit Sheet", "Energy Zone Scheduling Plan", "Interruption Elimination System"]
        },
        {
          week: "Week 04",
          code: "FND-104",
          title: "The Core Identity of High-Impact Leadership",
          focus: "Defining personal ethics, non-negotiables, personal vision statement, and psychological stamina.",
          deliverables: ["Personal Leadership Creed", "Inner Anchor Assessment", "Phase 1 Graduation Roadmap"]
        }
      ]
    },

    phase2: {
      id: "phase2",
      number: "02",
      name: "Phase 2: Bio-Performance & Strategic Specialization",
      tier: "Second Tier: Wellness & Nutrition",
      duration: "Weeks 5 - 8 (1 Course / Week)",
      type: "Bespoke Elective Track (Choose 1 from 20 Specializations)",
      isElective: true,
      note: "Clients select 1 specialized elective from 20 curated master tracks. Returning clients can bypass Phase 1 and start immediately here!",
      description: "Leadership stamina is biological. Without sustained cognitive vitality, clean cellular energy, and sleep-backed recovery, leadership fails. In this phase, tailor your growth from 20 specialized tracks.",
      // 20 Elective courses listed below
    },

    phase3: {
      id: "phase3",
      number: "03",
      name: "Phase 3: Organizational Mastery & Apex Execution",
      tier: "Top Tier: Leadership & Organizational Development",
      duration: "Weeks 9 - 12 (1 Course / Week)",
      type: "Fixed Curriculum",
      isElective: false,
      description: "The pinnacle of The Good Boss framework. Scale your vision into an unstoppable organization, architect high-velocity culture, steer through crises, and engineer compounding growth.",
      courses: [
        {
          week: "Week 09",
          code: "APX-301",
          title: "Visionary Influence & Cultural Transformation",
          focus: "Transmitting vision across cross-functional teams, instilling psychological safety, and driving radical ownership.",
          deliverables: ["Cultural Architecture Manifesto", "Town-Hall Alignment Framework", "Feedback Loop Blueprint"]
        },
        {
          week: "Week 10",
          code: "APX-302",
          title: "High-Performing Team Architecture & Accountability",
          focus: "Hiring A-players, designing clear OKR scorecards, and terminating toxic underperformance gracefully.",
          deliverables: ["Executive OKR Matrix", "Autonomous Pod Org Chart", "Radical Candor Review System"]
        },
        {
          week: "Week 11",
          code: "APX-303",
          title: "Crisis Leadership & Turnaround Tactics",
          focus: "Triage protocols during market shifts, team fractures, public scrutiny, and high-velocity pivots.",
          deliverables: ["Crisis War-Room SOP", "Internal Morale Recovery Playbook", "Stakeholder Communication Matrix"]
        },
        {
          week: "Week 12",
          code: "APX-304",
          title: "Exponential Growth Acceleration & Legacy Capstone",
          focus: "Systematizing growth loops, delegating like a CEO, long-term capital allocation, and legacy building.",
          deliverables: ["The Good Boss 3-Year Enterprise Map", "CEO Dashboard Blueprint", "Final Capstone Certification"]
        }
      ]
    }
  },

  // 20 Electives for Phase 2
  electives: [
    {
      id: "elect-01",
      code: "ELT-01",
      category: "Nutrition & Metabolic Health",
      title: "Bio-Individual Nutrition for Executive Stamina",
      description: "Eliminate afternoon brain fog and erratic insulin spikes with an executive-tailored macronutrient fueling strategy.",
      highlights: ["Custom Glycemic Index Mapping", "No-Crash Afternoon Lunch Protocols", "Travel & Airport Nutrition Survival Kit"],
      instructor: "Dr. Elena Vance, PhD & Chef Julian Moss",
      icon: "fa-apple-whole"
    },
    {
      id: "elect-02",
      code: "ELT-02",
      category: "Nutrition & Metabolic Health",
      title: "Gut-Brain Axis & Cognitive Longevity",
      description: "Harness the microbiome to supercharge neurotransmitter synthesis, mental endurance, and digestive resilience.",
      highlights: ["Microbiome Diagnostic Protocols", "Prebiotic & Fermented Fuel Strategies", "Inflammation Reduction Guidelines"],
      instructor: "Marcus Sterling, MSc Functional Medicine",
      icon: "fa-dna"
    },
    {
      id: "elect-03",
      code: "ELT-03",
      category: "Nutrition & Metabolic Health",
      title: "Intermittent Fasting & Cellular Autophagy for Leaders",
      description: "Master intermittent fasting protocols that maximize mental sharpness during intense morning negotiations without burnout.",
      highlights: ["16/8 & Circadian Fasting Windows", "Electrolyte Balancing Chemistry", "Fasting Protocol for 14-Hour Workdays"],
      instructor: "Dr. Rachel Kim, Metabolic Health Lead",
      icon: "fa-hourglass-half"
    },
    {
      id: "elect-04",
      code: "ELT-04",
      category: "Nutrition & Metabolic Health",
      title: "Micronutrient Blueprint for Adrenal & Stress Support",
      description: "Rebuild depleted mineral reserves, manage cortisol synthesis, and protect thyroid function during peak corporate quarters.",
      highlights: ["Targeted Adaptogen Protocols", "Magnesium & B-Complex Bioavailability", "Quarterly Bloodwork Interpretation"],
      instructor: "Dr. Arthur Pendelton, Endocrine Specialist",
      icon: "fa-pills"
    },
    {
      id: "elect-05",
      code: "ELT-05",
      category: "Nutrition & Metabolic Health",
      title: "Clean Plant & Protein Fueling for Physical Vitality",
      description: "Optimized clean protein synthesis, muscle retention, and amino acid profiling for active and traveling leaders.",
      highlights: ["Plant vs. Animal Protein Bioavailability", "Lean Mass Retention Guide", "Rapid Meal-Prep Frameworks"],
      instructor: "Siddharth Rao, Sports Nutritionist",
      icon: "fa-seedling"
    },
    {
      id: "elect-06",
      code: "ELT-06",
      category: "Sleep & Circadian Optimization",
      title: "Sleep Architecture & Circadian Rhythm Optimization",
      description: "Engineer restorative REM and Deep Sleep cycles even with irregular schedules, red-eye flights, and late dinners.",
      highlights: ["Light Spectrum Control & Melatonin Timing", "Bedroom Thermal Optimization", "Jet-Lag Triage Playbook"],
      instructor: "Dr. Chloe Mercier, Sleep Neuroscientist",
      icon: "fa-moon"
    },
    {
      id: "elect-07",
      code: "ELT-07",
      category: "Sleep & Circadian Optimization",
      title: "Breathwork & Autonomic Nervous System Regulation",
      description: "Master physiological sighs, box breathing, and HRV training to shift from sympathetic panic to parasympathetic calm in 90 seconds.",
      highlights: ["Physiological Sigh Mechanics", "Heart Rate Variability (HRV) Biofeedback", "Pre-Boardroom Calming Protocols"],
      instructor: "Kaelen Drake, Breathwork Master",
      icon: "fa-wind"
    },
    {
      id: "elect-08",
      code: "ELT-08",
      category: "Sleep & Circadian Optimization",
      title: "Micro-Movement & Postural Ergonomics for Desk Leaders",
      description: "Combat the physiological damage of prolonged sitting, tech neck, and spinal compression with micro-habits.",
      highlights: ["5-Minute Desk Mobility Circuits", "Spine Decompression Tactics", "Dynamic Standing Desk Ergonomics"],
      instructor: "Sarah Jenkins, Physical Therapist",
      icon: "fa-person-walking"
    },
    {
      id: "elect-09",
      code: "ELT-09",
      category: "Sleep & Circadian Optimization",
      title: "Biomarkers, Wearables & Executive Telemetry",
      description: "Extract actionable intelligence from Oura Ring, Whoop, Apple Watch, and CGMs to prevent hidden health crashes.",
      highlights: ["HRV & Recovery Score Dashboards", "Continuous Glucose Monitor Insights", "Early Warning Signs of Overtraining"],
      instructor: "Devon Cross, Biohacking Technologist",
      icon: "fa-chart-line"
    },
    {
      id: "elect-10",
      code: "ELT-10",
      category: "Sleep & Circadian Optimization",
      title: "Functional Strength & Longevity for Busy Executives",
      description: "Minimalist 25-minute strength training programming engineered for maximum bone density, posture, and lean power.",
      highlights: ["Compound Lift Minimalist Splits", "Hotel Room Resistance Band SOPs", "Joint Integrity Protocols"],
      instructor: "Coach Alex Romero, Strength Specialist",
      icon: "fa-dumbbell"
    },
    {
      id: "elect-11",
      code: "ELT-11",
      category: "Mental Health & Stress Mastery",
      title: "Cortisol Mastery & Complete Burnout Reversal",
      description: "A clinical roadmap to identifying early stage adrenal exhaustion and systematically detoxing toxic systemic overload.",
      highlights: ["Burnout Severity Self-Audit", "Cortisol Awakening Response Tuning", "Boundary Enforcement Scripts"],
      instructor: "Dr. Maya Patel, Psychiatrist & Executive Coach",
      icon: "fa-heart-pulse"
    },
    {
      id: "elect-12",
      code: "ELT-12",
      category: "Mental Health & Stress Mastery",
      title: "Neuro-Focus & Deep Work in Chaotic Environments",
      description: "Rebuild fractured attention spans, conquer chronic multi-tasking, and unlock prolonged states of deep cognitive flow.",
      highlights: ["Flow State Trigger Architecture", "Context-Switching Minimization", "Sensory Gating Techniques"],
      instructor: "Prof. Kenneth Wright, Cognitive Psychologist",
      icon: "fa-brain"
    },
    {
      id: "elect-13",
      code: "ELT-13",
      category: "Mental Health & Stress Mastery",
      title: "Somatic Stress Release & Emotional De-Armoring",
      description: "Physical techniques to discharge stored corporate stress, tension headaches, and gastrointestinal clenching.",
      highlights: ["TRE (Tension Releasing Exercises)", "Vagus Nerve Stimulation", "Body Scan Rapid Recovery"],
      instructor: "Tara Lin, Somatic Experiencing Practitioner",
      icon: "fa-hand-holding-heart"
    },
    {
      id: "elect-14",
      code: "ELT-14",
      category: "Mental Health & Stress Mastery",
      title: "Dopamine Architecture & The Digital Detox Protocol",
      description: "Break the cycle of compulsive notification checking, slack addiction, and dopamine exhaustion to restore patience.",
      highlights: ["Digital Sabbatical Schedules", "Low-Dopamine Morning Routines", "Attention Restoration Therapy"],
      instructor: "Liam Gallagher, Behavioral Neuroscientist",
      icon: "fa-mobile-screen-button"
    },
    {
      id: "elect-15",
      code: "ELT-15",
      category: "Mental Health & Stress Mastery",
      title: "Conquering Executive Anxiety & High-Functioning Panic",
      description: "Turn imposter syndrome, catastrophizing, and insomnia panic into laser-targeted focus and poise.",
      highlights: ["Cognitive Distortion Decoders", "The 'Worst Case' Exposure Matrix", "Stoic Pre-Mortem Exercises"],
      instructor: "Dr. Naomi Campbell, Executive Psychotherapist",
      icon: "fa-shield-halved"
    },
    {
      id: "elect-16",
      code: "ELT-16",
      category: "Peak Habit & Execution Systems",
      title: "High-Performance Habit Stacking & Micro-Routines",
      description: "Automate 80% of daily health and productivity decisions so willpower remains fully charged for boardroom choices.",
      highlights: ["Habit Stacking Blueprints", "Cue-Routine-Reward Optimization", "Frictionless Implementation Kits"],
      instructor: "Coach James Vance, Behavioral Architect",
      icon: "fa-layer-group"
    },
    {
      id: "elect-17",
      code: "ELT-17",
      category: "Peak Habit & Execution Systems",
      title: "Peak Performance Under Extreme Crisis & Pressure",
      description: "Tactical stress inoculation derived from special operations and elite athletics adapted for corporate emergencies.",
      highlights: ["Combat Breathing under Fire", "Tunnel Vision Prevention", "High-Stress Communication Cadence"],
      instructor: "Commander (Ret.) Ryan Scott, High-Stakes Coach",
      icon: "fa-bullseye"
    },
    {
      id: "elect-18",
      code: "ELT-18",
      category: "Peak Habit & Execution Systems",
      title: "Emotional Intelligence in Hostile Boardroom Negotiations",
      description: "Read micro-expressions, regulate personal defensive reflexes, and negotiate win-win outcomes with hostile partners.",
      highlights: ["Micro-Expression Recognition", "Emotional De-escalation Scripts", "Tactical Empathy Frameworks"],
      instructor: "Sophia Sterling, International Negotiator",
      icon: "fa-comments"
    },
    {
      id: "elect-19",
      code: "ELT-19",
      category: "Peak Habit & Execution Systems",
      title: "The Antifragile Executive: Thriving on Chaos",
      description: "Adopt Nassim Taleb's antifragility framework to ensure shocks and stressors strengthen rather than weaken your stamina.",
      highlights: ["Barbell Strategy for Personal Health", "Redundancy Design in Workflows", "Embracing Productive Discomfort"],
      instructor: "Dr. Victor Morales, Complexity Theorist",
      icon: "fa-mountain"
    },
    {
      id: "elect-20",
      code: "ELT-20",
      category: "Peak Habit & Execution Systems",
      title: "Sustainable High-Output Living: Career, Health & Family",
      description: "Eliminate the false dichotomy between building an enterprise empire and maintaining vibrant health and family intimacy.",
      highlights: ["Boundary Architecture with Spouses & Kids", "Presence Transitions (Office to Home)", "The Guilt-Free Executive Blueprint"],
      instructor: "Claire & David Foster, Dual-Executive Mentors",
      icon: "fa-people-roof"
    }
  ],

  // Corporate Training & Interventions ($35,000)
  corporate: {
    price: 35000,
    priceFormatted: "$35,000",
    billing: "Per Bespoke Engagement",
    subtitle: "End-to-End Enterprise Transformation for Boardrooms, Founders, & Leadership Teams",
    pillars: [
      {
        id: "leadership-dev",
        title: "Leadership Development",
        tag: "Executive Bench & C-Suite Cohesion",
        description: "Transform mid-level managers into autonomous strategic leaders. We instill radical accountability, deep strategic vision, and cross-functional empathy across your entire executive roster.",
        deliverables: [
          "360-Degree Executive Benchmarking",
          "Executive Presence & Influence Labs",
          "Succession Pipeline & Delegation SOPs",
          "Bi-Weekly 1-on-1 C-Suite Advisory"
        ],
        icon: "fa-users-gear"
      },
      {
        id: "turnarounds",
        title: "Corporate Turnarounds",
        tag: "Rapid Operational & Cultural Triage",
        description: "When growth stalls, margins compress, or team morale crashes, our turnaround team steps into the trenches. We diagnose root pathologies, stem bleeding, and restart momentum within 90 days.",
        deliverables: [
          "Rapid 14-Day Diagnostic & Cash-Flow Triage",
          "Toxic Culture & Bottleneck Eradication",
          "Restructuring Operational Roadmaps",
          "Turnaround War-Room Command Structure"
        ],
        icon: "fa-arrows-rotate"
      },
      {
        id: "change-maxing",
        title: "Change Maxing",
        tag: "High-Velocity Change Management",
        description: "Eliminate organizational inertia and change fatigue. We transform organizational resistance into eager adoption when introducing AI tools, mergers, new business models, or leadership shifts.",
        deliverables: [
          "Friction-Mapping & Resistance Audits",
          "High-Velocity Transformation Sprints",
          "Culture Adoption Incentives & Metrics",
          "Enterprise Change-Leader Champions Program"
        ],
        icon: "fa-bolt-lightning"
      },
      {
        id: "growth-accel",
        title: "Growth Acceleration",
        tag: "Go-to-Market & Scale Engineering",
        description: "Break through revenue plateaus. We align sales, marketing, product, and leadership into an unstoppable revenue engine optimized for exponential scaling and dominant market positioning.",
        deliverables: [
          "GTM Strategy Optimization & Pricing Revamp",
          "Sales Leadership Incentive Architecture",
          "Operational Scalability Stress Testing",
          "Metric Dashboards for Boardroom Accountability"
        ],
        icon: "fa-chart-line-up"
      }
    ]
  },

  // 3-Day Intensive Workshop
  workshop: {
    price: 1250,
    priceFormatted: "$1,250",
    duration: "3 Full Days",
    tagline: "Immersive, High-Impact In-Person & Hybrid Leadership Crucible",
    discounts: [
      { tier: "Solo Attendee", seats: "1 Seat", discount: "0%", perSeat: 1250 },
      { tier: "Partner Duo", seats: "2 Seats", discount: "10% OFF", perSeat: 1125 },
      { tier: "Executive Trio+", seats: "3-4 Seats", discount: "15% OFF", perSeat: 1062.5 },
      { tier: "Full Team (5+)", seats: "5+ Seats", discount: "25% OFF", perSeat: 937.5 }
    ],
    days: [
      {
        day: "Day 01",
        title: "Deconstruction & Self-Governance",
        focus: "Personal operating systems, ruthless ego audit, cognitive resilience, and the biological foundation of leadership stamina.",
        sessions: [
          "08:30 AM - The Radical Audit: Diagnosing Bottlenecks in the Mirror",
          "11:00 AM - Bio-Foundations: Nutrition, Sleep & Cortisol Diagnostics",
          "02:00 PM - High-Stakes Decision Frameworks Under Extreme Uncertainty",
          "05:00 PM - Evening Decompression & Somatic Reset"
        ]
      },
      {
        day: "Day 02",
        title: "Team Dynamics & Strategic Influence",
        focus: "Moving from command-and-control to high-trust autonomous execution. Radical candor, hiring top 1%, and cultural engineering.",
        sessions: [
          "09:00 AM - The Architecture of Psychological Safety & High Standards",
          "11:30 AM - Difficult Conversations: Firing, Demoting & Conflict Resolution",
          "02:30 PM - Live Boardroom Simulation: Navigating Hostile Stakeholders",
          "06:00 PM - Exclusive Executive Dinner & Peer Mastermind"
        ]
      },
      {
        day: "Day 03",
        title: "Turnarounds, Change Maxing & Growth Engine",
        focus: "Synthesizing individual strength into organizational firepower. Crisis playbook construction and your personal 12-month blueprint.",
        sessions: [
          "09:00 AM - The Turnaround Playbook: Stabilizing Failing Divisions",
          "11:30 AM - Change Maxing: Driving 10x Adoption Without Burnout",
          "02:00 PM - Designing Your 12-Month Good Boss Execution Roadmap",
          "04:30 PM - Capstone Crucible, Peer Pledge & Graduation"
        ]
      }
    ]
  },

  // Coupons
  coupons: {
    "BOSS500": { type: "fixed", amount: 500, description: "$500 Instant Welcome Scholarship" },
    "EARLYBIRD": { type: "fixed", amount: 350, description: "$350 Early Enrollee Rebate" },
    "VIP20": { type: "percent", amount: 0.20, description: "20% Exclusive Alumni/Partner Discount" },
    "LEADER10": { type: "percent", amount: 0.10, description: "10% Executive Leadership Rebate" }
  },

  // Merchandise & App
  appAndMerch: {
    app: {
      name: "The Good Boss App",
      platform: "iOS & Android",
      rating: "4.9 ★ (2,800+ reviews)",
      features: [
        { title: "Daily Habit & Nutrition Tracker", desc: "Syncs with Apple Health & Oura to optimize your daily cognitive fuel." },
        { title: "On-the-Go Audio Lessons", desc: "Stream all 12 weekly courses in offline high-definition audio." },
        { title: "Executive Accountability Circles", desc: "Private encrypted channels with your coach and curated cohorts." },
        { title: "Emergency Crisis SOS Mode", desc: "Quick 2-minute breathwork, triage checklists & emergency mental resets." }
      ]
    },
    merch: [
      {
        id: "merch-01",
        title: "The Good Boss Executive Heavyweight Hoodie",
        price: "$110",
        badge: "Bestseller",
        desc: "500 GSM luxury organic french terry cotton with subtle embroidered crest. Designed for boardroom focus and travel ease."
      },
      {
        id: "merch-02",
        title: "The Sovereign Leather Daily Focus Journal",
        price: "$65",
        badge: "Essential",
        desc: "Full-grain vegetable-tanned Italian leather with custom The Good Boss quarterly OKR and evening reflection layout."
      },
      {
        id: "merch-03",
        title: "Matte Black Ceramic-Lined Smart Flask",
        price: "$48",
        badge: "Popular",
        desc: "Double-wall vacuum insulation with pure ceramic lining. Keeps coffee or cold adaptogens at optimal temp for 18 hours."
      },
      {
        id: "merch-04",
        title: "The Good Boss Heavyweight Performance Polo",
        price: "$85",
        badge: "New Release",
        desc: "Moisture-wicking, anti-odor modal blend with structured collar for effortless transition from workouts to meetings."
      }
    ]
  }
};
