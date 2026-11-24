// ==========================================================================
// THE GOOD BOSS - APPLICATION LOGIC & INTERACTIVE ENGINE
// Complete marketing funnel, pyramid visualizer, 20-elective picker,
// dynamic pricing calculator, coupon engine, workshop calculator & modals.
// ==========================================================================

// State Management
const appState = {
  selectedTier: 'middle',
  selectedElective: 'elect-01',
  activePlan: 'full', // 'full' ($3,000) or 'returning' ($2,000)
  appliedCoupon: 'BOSS500', // Default applied coupon for instant visual delight
  fullBasePrice: 3000,
  returningBasePrice: 2000,
  workshopSeats: 1,
  cart: [],
  activeCategoryFilter: 'All',
  searchQuery: ''
};

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initPyramid();
  renderCurriculum();
  renderElectives();
  renderMerchandise();
  applyCouponCode(true); // Apply initial code silently
  updateWorkshopPrice(1);
  setupModalElectiveOptions();
});

// ==========================================================================
// 1. NAVIGATION & SCROLL SPY
// ==========================================================================
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const navLinks = document.querySelector('.nav-links');
      if (navLinks) {
        const isDisplayed = navLinks.style.display === 'flex';
        navLinks.style.display = isDisplayed ? 'none' : 'flex';
        mobileToggle.setAttribute('aria-expanded', String(!isDisplayed));
      }
    });
  }

  document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileToggle && window.innerWidth <= 768) {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
          navLinks.style.display = 'none';
        }
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// ==========================================================================
// 2. THE 3-TIER STRUCTURAL PYRAMID
// Base: Life and Self development coaching
// Second tier: Wellness and nutrition
// Top: Leadership and Organizational development
// ==========================================================================
const PYRAMID_DATA = {
  top: {
    tierBadge: "Top Tier • Phase 3 (Weeks 9-12)",
    badgeClass: "top",
    title: "Leadership & Organizational Development",
    icon: "fa-solid fa-crown",
    iconColor: "var(--gold-400)",
    description: "The apex pinnacle. Scaling personal strength into enterprise supremacy. We transform individual leaders into architects of autonomous high-performing teams, crisis-proof turnarounds, friction-free change maxing, and exponential compounding growth.",
    features: [
      { title: "High-Performing Team Architecture", desc: "Instilling radical candor, psychological safety, and clear autonomous OKRs." },
      { title: "Corporate Turnaround Playbooks", desc: "Triage systems derived from our $35,000 corporate interventions." },
      { title: "Change Maxing & Growth Acceleration", desc: "Eliminating change fatigue and accelerating go-to-market speed." }
    ],
    ctaText: "Explore Phase 3 Capstone",
    ctaAction: () => switchPhase('phase3')
  },
  middle: {
    tierBadge: "Second Tier • Phase 2 (Weeks 5-8)",
    badgeClass: "middle",
    title: "Wellness & Nutrition",
    icon: "fa-solid fa-heart-pulse",
    iconColor: "var(--emerald-400)",
    description: "Leadership stamina is biological. Without sustained cognitive vitality, clean cellular energy, and sleep-backed recovery, leadership fails under pressure. In this tier, clients choose 1 specialized track from 20 curated master electives. Returning clients can bypass Phase 1 and start immediately here.",
    features: [
      { title: "20 Specialized Master Electives", desc: "Personalized focus across nutrition, metabolic fuel, circadian architecture, or stress mastery." },
      { title: "Returning Client Fast-Track ($2,000)", desc: "Returning clients bypass Phase 1 and dive straight into Phase 2 & 3." },
      { title: "Biometric & Telemetry Integration", desc: "Actionable tracking syncing with your Oura Ring, Apple Health & The Good Boss App." }
    ],
    ctaText: "Choose From 20 Electives",
    ctaAction: () => switchPhase('phase2')
  },
  base: {
    tierBadge: "Base Tier • Phase 1 (Weeks 1-4)",
    badgeClass: "base",
    title: "Life & Self-Development Coaching",
    icon: "fa-solid fa-anchor",
    iconColor: "var(--blue-400)",
    description: "The non-negotiable bedrock. Before you can lead an enterprise or inspire a division, you must master your own mind. Phase 1 dismantles subconscious self-sabotage, sharpens probabilistic decision-making, and establishes an unshakable executive creed.",
    features: [
      { title: "Mindset Architecture & Emotional Mastery", desc: "Cognitive reframing and real-time stress triage during boardroom crises." },
      { title: "High-Stakes Decision Frameworks", desc: "Rapid probabilistic decision models with incomplete data." },
      { title: "Time Mastery & Energy Protocol", desc: "Ruthless focus, eliminating reactive fires, and deep work sanctuary design." }
    ],
    ctaText: "View Phase 1 Foundation",
    ctaAction: () => switchPhase('phase1')
  }
};

function initPyramid() {
  updateInspector('middle');
}

function selectTier(tierKey) {
  appState.selectedTier = tierKey;
  
  // Update Tier styling
  document.querySelectorAll('.pyramid-tier').forEach(tier => tier.classList.remove('active'));
  if (tierKey === 'top') document.getElementById('tierTop')?.classList.add('active');
  if (tierKey === 'middle') document.getElementById('tierMiddle')?.classList.add('active');
  if (tierKey === 'base') document.getElementById('tierBase')?.classList.add('active');

  updateInspector(tierKey);
}

function previewTier(tierKey) {
  selectTier(tierKey);
}

function updateInspector(tierKey) {
  const data = PYRAMID_DATA[tierKey];
  if (!data) return;

  const badge = document.getElementById('inspectorTierBadge');
  const title = document.getElementById('inspectorTitle');
  const desc = document.getElementById('inspectorDesc');
  const icon = document.getElementById('inspectorIcon');
  const featuresContainer = document.getElementById('inspectorFeatures');
  const ctaBtn = document.getElementById('inspectorCta');

  if (badge) {
    badge.textContent = data.tierBadge;
    badge.className = `inspector-tier-badge ${data.badgeClass}`;
  }
  if (title) title.textContent = data.title;
  if (desc) desc.textContent = data.description;
  if (icon) {
    icon.innerHTML = `<i class="${data.icon}"></i>`;
    icon.style.color = data.iconColor;
  }
  if (featuresContainer) {
    featuresContainer.innerHTML = data.features.map(f => `
      <div class="inspector-feature-item">
        <i class="fa-solid fa-check-double"></i>
        <div>
          <h5>${f.title}</h5>
          <p>${f.desc}</p>
        </div>
      </div>
    `).join('');
  }
  if (ctaBtn) {
    ctaBtn.querySelector('span').textContent = data.ctaText;
    ctaBtn.onclick = (e) => {
      e.preventDefault();
      data.ctaAction();
      const target = document.getElementById('courses');
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    };
  }
}

// ==========================================================================
// 3. CURRICULUM RENDERING (PHASE 1, 2, 3)
// ==========================================================================
function renderCurriculum() {
  // Render Phase 1
  const phase1Grid = document.getElementById('phase1Grid');
  if (phase1Grid && COURSE_DATA.phases.phase1) {
    phase1Grid.innerHTML = COURSE_DATA.phases.phase1.courses.map(course => `
      <div class="week-card">
        <div class="week-card-top">
          <span class="week-badge">${course.week}</span>
          <span class="week-code">${course.code}</span>
        </div>
        <h4 class="week-title">${course.title}</h4>
        <p class="week-focus">${course.focus}</p>
        <div class="week-deliverables-title">Tangible Deliverables</div>
        <div class="week-deliverables-list">
          ${course.deliverables.map(d => `
            <div class="deliverable-item">
              <i class="fa-solid fa-circle-check"></i>
              <span>${d}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // Render Phase 3
  const phase3Grid = document.getElementById('phase3Grid');
  if (phase3Grid && COURSE_DATA.phases.phase3) {
    phase3Grid.innerHTML = COURSE_DATA.phases.phase3.courses.map(course => `
      <div class="week-card">
        <div class="week-card-top">
          <span class="week-badge">${course.week}</span>
          <span class="week-code">${course.code}</span>
        </div>
        <h4 class="week-title">${course.title}</h4>
        <p class="week-focus">${course.focus}</p>
        <div class="week-deliverables-title">Enterprise Capstone Deliverables</div>
        <div class="week-deliverables-list">
          ${course.deliverables.map(d => `
            <div class="deliverable-item">
              <i class="fa-solid fa-crown" style="color: var(--gold-400);"></i>
              <span>${d}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }
}

function switchPhase(phaseId) {
  // Toggle tab buttons
  document.querySelectorAll('.phase-tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.phase-panel').forEach(panel => panel.classList.remove('active'));

  if (phaseId === 'phase1') {
    document.getElementById('tabPhase1')?.classList.add('active');
    document.getElementById('panelPhase1')?.classList.add('active');
  } else if (phaseId === 'phase2') {
    document.getElementById('tabPhase2')?.classList.add('active');
    document.getElementById('panelPhase2')?.classList.add('active');
  } else if (phaseId === 'phase3') {
    document.getElementById('tabPhase3')?.classList.add('active');
    document.getElementById('panelPhase3')?.classList.add('active');
  }
}

// ==========================================================================
// 4. PHASE 2 - 20 ELECTIVE COURSES ENGINE
// Client Requirement: "The phase 2 courses will draw on 20 potential courses, 
// that can be chosen from. They only get to chose 1. For return clients, they can start with phase 2."
// ==========================================================================
function renderElectives() {
  const grid = document.getElementById('electivesGrid');
  if (!grid) return;

  const filtered = COURSE_DATA.electives.filter(elective => {
    const matchesCategory = appState.activeCategoryFilter === 'All' || elective.category === appState.activeCategoryFilter;
    const query = appState.searchQuery.toLowerCase();
    const matchesSearch = !query || 
      elective.title.toLowerCase().includes(query) ||
      elective.description.toLowerCase().includes(query) ||
      elective.code.toLowerCase().includes(query) ||
      elective.category.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-dim);">
        <i class="fa-solid fa-magnifying-glass" style="font-size: 2rem; margin-bottom: 12px; color: var(--gold-400);"></i>
        <h4>No Electives Match Your Search</h4>
        <p>Try searching for "Nutrition", "Sleep", "Stress", "Habits", or reset the filter.</p>
        <button class="btn btn-secondary btn-sm" onclick="filterElectives('All')" style="margin-top: 10px;">Reset Filters</button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(elective => {
    const isSelected = elective.id === appState.selectedElective;
    return `
      <div class="elective-card ${isSelected ? 'is-selected' : ''}" id="card-${elective.id}">
        <div class="elective-top">
          <div class="elective-badge-row">
            <span class="elective-cat-tag"><i class="fa-solid ${elective.icon}"></i> ${elective.category}</span>
            <span class="elective-code">${elective.code}</span>
          </div>
          <h4 class="elective-title">${elective.title}</h4>
          <p class="elective-desc">${elective.description}</p>
        </div>

        <div class="elective-bottom">
          <div class="elective-instructor">
            <i class="fa-solid fa-user-doctor"></i> ${elective.instructor}
          </div>
          <button class="elective-btn-choose" onclick="selectElective('${elective.id}')">
            ${isSelected ? '<i class="fa-solid fa-check"></i> Selected Specialization' : '<i class="fa-solid fa-plus"></i> Select As Your Phase 2'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function filterElectives(category) {
  appState.activeCategoryFilter = category;
  document.querySelectorAll('.category-pill').forEach(pill => {
    if (pill.textContent.includes(category) || (category === 'All' && pill.textContent.includes('All'))) {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });
  renderElectives();
}

function handleElectiveSearch(query) {
  appState.searchQuery = query;
  renderElectives();
}

function selectElective(electiveId) {
  appState.selectedElective = electiveId;
  const electiveObj = COURSE_DATA.electives.find(e => e.id === electiveId);
  
  if (electiveObj) {
    // Update banner display
    const titleEl = document.getElementById('selectedElectiveDisplayTitle');
    if (titleEl) {
      titleEl.textContent = `${electiveObj.code}: ${electiveObj.title}`;
    }

    // Update modal select dropdown if exists
    const modalSelect = document.getElementById('modalElectiveSelect');
    if (modalSelect) modalSelect.value = electiveId;

    // Update modal summary text
    const summaryElective = document.getElementById('modalSummaryElective');
    if (summaryElective) {
      summaryElective.textContent = `${electiveObj.code}: ${electiveObj.title}`;
    }

    showToast(`Phase 2 Specialization Chosen: ${electiveObj.title}`, 'success');
  }

  renderElectives();
}

function setupModalElectiveOptions() {
  const select = document.getElementById('modalElectiveSelect');
  if (select && COURSE_DATA.electives) {
    select.innerHTML = COURSE_DATA.electives.map(e => `
      <option value="${e.id}" ${e.id === appState.selectedElective ? 'selected' : ''}>
        ${e.code}: ${e.title} (${e.category})
      </option>
    `).join('');
  }
}

function syncSelectedElectiveFromModal(electiveId) {
  selectElective(electiveId);
}

// ==========================================================================
// 5. PRICING & WORKING COUPON ENGINE
// Pricing is $3,000 for 12 week course. $2,000 for returning 8 week clients.
// There will be a coupon code.
// ==========================================================================
function applyCouponCode(silent = false) {
  const input = document.getElementById('couponInput');
  const code = (input ? input.value : appState.appliedCoupon || '').trim().toUpperCase();
  const statusMsg = document.getElementById('couponStatusMsg');

  if (!code) {
    if (statusMsg) {
      statusMsg.className = 'coupon-status-msg error';
      statusMsg.textContent = 'Please enter a valid coupon code.';
    }
    return;
  }

  const coupon = COURSE_DATA.coupons[code];

  if (!coupon) {
    if (statusMsg) {
      statusMsg.className = 'coupon-status-msg error';
      statusMsg.textContent = `Coupon code "${code}" is invalid or expired. Try BOSS500 or VIP20.`;
    }
    if (!silent) showToast(`Invalid coupon code: "${code}"`, 'error');
    return;
  }

  appState.appliedCoupon = code;

  // Calculate Discounts
  let fullDiscount = 0;
  let returningDiscount = 0;

  if (coupon.type === 'fixed') {
    fullDiscount = coupon.amount;
    returningDiscount = Math.min(coupon.amount, 500); // Fair deduction
  } else if (coupon.type === 'percent') {
    fullDiscount = appState.fullBasePrice * coupon.amount;
    returningDiscount = appState.returningBasePrice * coupon.amount;
  }

  const fullNet = Math.max(0, appState.fullBasePrice - fullDiscount);
  const returningNet = Math.max(0, appState.returningBasePrice - returningDiscount);

  // Update UI Elements
  const fullPriceDisplay = document.getElementById('fullPriceDisplay');
  const fullOriginalStrike = document.getElementById('fullOriginalStrike');
  const retPriceDisplay = document.getElementById('retPriceDisplay');
  const retOriginalStrike = document.getElementById('retOriginalStrike');

  if (fullPriceDisplay && fullOriginalStrike) {
    fullPriceDisplay.textContent = `$${fullNet.toLocaleString()}`;
    fullOriginalStrike.textContent = `$${appState.fullBasePrice.toLocaleString()}`;
    fullOriginalStrike.style.display = fullDiscount > 0 ? 'inline' : 'none';
  }

  if (retPriceDisplay && retOriginalStrike) {
    retPriceDisplay.textContent = `$${returningNet.toLocaleString()}`;
    retOriginalStrike.textContent = `$${appState.returningBasePrice.toLocaleString()}`;
    retOriginalStrike.style.display = returningDiscount > 0 ? 'inline' : 'none';
  }

  if (statusMsg) {
    statusMsg.className = 'coupon-status-msg success';
    statusMsg.innerHTML = `<i class="fa-solid fa-circle-check"></i> Coupon <strong>${code}</strong> applied: ${coupon.description}!`;
  }

  // Update Modal calculations
  updateModalSummary(fullNet, returningNet, coupon, fullDiscount, returningDiscount);

  if (!silent) {
    showToast(`Coupon applied! ${coupon.description}`, 'success');
  }
}

function pasteCoupon(code) {
  const input = document.getElementById('couponInput');
  if (input) {
    input.value = code;
    applyCouponCode();
  }
}

function setPlanAndScroll(planType) {
  appState.activePlan = planType;
  const target = document.getElementById('pricing');
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }

  // Highlight the selected pricing card
  const fullCard = document.getElementById('pricingCardFull');
  const retCard = document.getElementById('pricingCardReturning');

  if (planType === 'returning') {
    retCard?.classList.add('featured');
    fullCard?.classList.remove('featured');
    showToast('Switched to Returning Client Track ($2,000)', 'info');
  } else {
    fullCard?.classList.add('featured');
    retCard?.classList.remove('featured');
  }
}

function updateModalSummary(fullNet, returningNet, coupon, fullDiscount, returningDiscount) {
  const isReturning = appState.activePlan === 'returning';
  const finalPrice = isReturning ? returningNet : fullNet;
  const discountAmt = isReturning ? returningDiscount : fullDiscount;

  const planTitle = document.getElementById('modalSummaryPlanName');
  const finalTotal = document.getElementById('modalSummaryFinalTotal');
  const couponCode = document.getElementById('modalSummaryCouponCode');
  const couponDiscount = document.getElementById('modalSummaryCouponDiscount');
  const couponRow = document.getElementById('modalSummaryCouponRow');

  if (planTitle) {
    planTitle.textContent = isReturning ? 'Returning Client (8-Week Track, $2,000)' : 'Full 12-Week Apex Course ($3,000)';
  }
  if (finalTotal) {
    finalTotal.textContent = `$${finalPrice.toLocaleString()}`;
  }
  if (couponCode) couponCode.textContent = appState.appliedCoupon || 'NONE';
  if (couponDiscount) couponDiscount.textContent = `-$${discountAmt.toLocaleString()}`;
  if (couponRow) couponRow.style.display = discountAmt > 0 ? 'flex' : 'none';
}

// ==========================================================================
// 6. 3-DAY WORKSHOP SEAT & GROUP DISCOUNT CALCULATOR
// Workshops are $1,250 for 3 days. Group discounts available.
// ==========================================================================
function updateWorkshopPrice(seats) {
  seats = parseInt(seats, 10);
  if (isNaN(seats) || seats < 1) seats = 1;
  if (seats > 30) seats = 30;

  appState.workshopSeats = seats;

  const seatInput = document.getElementById('seatInput');
  const seatCountLabel = document.getElementById('seatCountLabel');
  if (seatInput) seatInput.value = seats;
  if (seatCountLabel) seatCountLabel.textContent = `${seats} ${seats === 1 ? 'Attendee' : 'Attendees'}`;

  // Discount matrix:
  // 1: 0% ($1250)
  // 2: 10% ($1125/seat)
  // 3-4: 15% ($1062.50/seat)
  // 5+: 25% ($937.50/seat)
  let discountPercent = 0;
  let activeTierId = 'tier1Badge';

  if (seats === 2) {
    discountPercent = 0.10;
    activeTierId = 'tier2Badge';
  } else if (seats >= 3 && seats <= 4) {
    discountPercent = 0.15;
    activeTierId = 'tier3Badge';
  } else if (seats >= 5) {
    discountPercent = 0.25;
    activeTierId = 'tier4Badge';
  }

  // Update discount badges
  ['tier1Badge', 'tier2Badge', 'tier3Badge', 'tier4Badge'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
  document.getElementById(activeTierId)?.classList.add('active');

  const baseRate = 1250;
  const gross = baseRate * seats;
  const savings = gross * discountPercent;
  const net = gross - savings;
  const perSeat = net / seats;

  // Update labels
  const summarySeatQty = document.getElementById('summarySeatQty');
  const summaryGrossPrice = document.getElementById('summaryGrossPrice');
  const summaryDiscountPercent = document.getElementById('summaryDiscountPercent');
  const summaryDiscountSavings = document.getElementById('summaryDiscountSavings');
  const summaryPerSeat = document.getElementById('summaryPerSeat');
  const summaryNetTotal = document.getElementById('summaryNetTotal');

  if (summarySeatQty) summarySeatQty.textContent = seats;
  if (summaryGrossPrice) summaryGrossPrice.textContent = `$${gross.toLocaleString()}`;
  if (summaryDiscountPercent) summaryDiscountPercent.textContent = `${(discountPercent * 100)}%`;
  if (summaryDiscountSavings) summaryDiscountSavings.textContent = `-$${savings.toLocaleString()}`;
  if (summaryPerSeat) summaryPerSeat.textContent = `$${perSeat.toLocaleString()} / seat`;
  if (summaryNetTotal) summaryNetTotal.textContent = `$${net.toLocaleString()}`;

  // Sync to workshop modal
  const modalSeats = document.getElementById('workshopModalSeats');
  const modalDiscount = document.getElementById('workshopModalDiscount');
  const modalTotal = document.getElementById('workshopModalTotal');

  if (modalSeats) modalSeats.textContent = `${seats} ${seats === 1 ? 'Seat' : 'Seats'}`;
  if (modalDiscount) modalDiscount.textContent = `${(discountPercent * 100)}% OFF (Save $${savings.toLocaleString()})`;
  if (modalTotal) modalTotal.textContent = `$${net.toLocaleString()}`;
}

function adjustSeats(delta) {
  const current = appState.workshopSeats || 1;
  updateWorkshopPrice(current + delta);
}

// ==========================================================================
// 7. MERCHANDISE STORE
// ==========================================================================
function renderMerchandise() {
  const grid = document.getElementById('merchGrid');
  if (!grid || !COURSE_DATA.appAndMerch.merch) return;

  const icons = {
    'merch-01': 'fa-solid fa-vest-patches',
    'merch-02': 'fa-solid fa-book-bookmark',
    'merch-03': 'fa-solid fa-mug-hot',
    'merch-04': 'fa-solid fa-shirt'
  };

  grid.innerHTML = COURSE_DATA.appAndMerch.merch.map(item => `
    <div class="merch-card">
      <span class="merch-badge">${item.badge}</span>
      <div class="merch-img-box">
        <i class="${icons[item.id] || 'fa-solid fa-box-open'}"></i>
      </div>
      <div>
        <h4 class="merch-title">${item.title}</h4>
        <p class="merch-desc">${item.desc}</p>
      </div>
      <div class="merch-bottom">
        <span class="merch-price">${item.price}</span>
        <button class="btn-add-merch" onclick="addToCart('${item.id}')" title="Add to Merch Bag">
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  `).join('');
}

function addToCart(itemId) {
  const item = COURSE_DATA.appAndMerch.merch.find(m => m.id === itemId);
  if (!item) return;

  appState.cart.push(item);
  updateCartBadge();
  showToast(`Added to Bag: ${item.title}`, 'success');
}

function updateCartBadge() {
  const badge = document.getElementById('cartCount');
  if (badge) badge.textContent = appState.cart.length;
}

function openMerchBagModal() {
  const container = document.getElementById('cartItemsContainer');
  const totalPriceEl = document.getElementById('cartTotalPrice');

  if (appState.cart.length === 0) {
    if (container) {
      container.innerHTML = `
        <div style="text-align: center; padding: 30px; color: var(--text-dim);">
          <i class="fa-solid fa-bag-shopping" style="font-size: 2.5rem; margin-bottom: 12px; color: var(--gold-400);"></i>
          <p>Your executive merch bag is currently empty.</p>
          <a href="#ecosystem" class="btn btn-secondary btn-sm" onclick="closeModal('merchBagModal')">Browse Collection</a>
        </div>
      `;
    }
    if (totalPriceEl) totalPriceEl.textContent = '$0';
  } else {
    let total = 0;
    if (container) {
      container.innerHTML = appState.cart.map((item, idx) => {
        const numPrice = parseInt(item.price.replace('$', ''), 10) || 0;
        total += numPrice;
        return `
          <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-card); padding: 12px; border-radius: 6px; border: 1px solid var(--border-subtle);">
            <div>
              <strong style="color: var(--text-main); font-size: 0.9rem;">${item.title}</strong>
              <div style="font-size: 0.75rem; color: var(--text-muted);">${item.badge} Edition</div>
            </div>
            <div style="display: flex; align-items: center; gap: 14px;">
              <span style="color: var(--gold-300); font-weight: 700;">${item.price}</span>
              <button onclick="removeFromCart(${idx})" style="background: none; border: none; color: #f87171; cursor: pointer;"><i class="fa-solid fa-trash-can"></i></button>
            </div>
          </div>
        `;
      }).join('');
    }
    if (totalPriceEl) totalPriceEl.textContent = `$${total.toLocaleString()}`;
  }

  openModal('merchBagModal');
}

function removeFromCart(index) {
  appState.cart.splice(index, 1);
  updateCartBadge();
  openMerchBagModal();
}

function handleMerchCheckout() {
  if (appState.cart.length === 0) {
    showToast('Your bag is empty.', 'error');
    return;
  }
  closeModal('merchBagModal');
  appState.cart = [];
  updateCartBadge();
  showToast('Merchandise order placed! Confirmation sent to your email.', 'success');
}

// ==========================================================================
// 8. SIMULATED VIDEO PLAYER
// ==========================================================================
let isSimPlaying = false;
function toggleSimulatedPlay() {
  const icon = document.getElementById('simPlayIcon');
  const status = document.getElementById('simPlayStatus');

  isSimPlaying = !isSimPlaying;

  if (isSimPlaying) {
    if (icon) icon.className = 'fa-solid fa-pause';
    if (status) status.innerHTML = '<span style="color: var(--emerald-400);"><i class="fa-solid fa-circle-play"></i> Streaming Briefing:</span> "The Good Boss: Phase 1 Mindset & Phase 2 Elective Selection" (1080p 60fps)';
  } else {
    if (icon) icon.className = 'fa-solid fa-play';
    if (status) status.textContent = 'Briefing paused. Click play to resume.';
  }
}

// ==========================================================================
// 9. MODALS SYSTEM
// ==========================================================================
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// Close on backdrop click
document.querySelectorAll('.modal-overlay').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal(modal.id);
    }
  });
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach(modal => {
      closeModal(modal.id);
    });
  }
});

function openVideoModal() {
  openModal('videoModal');
}

function openEnrollmentModal(planType) {
  if (planType) {
    appState.activePlan = planType;
  }
  const returningSelect = document.getElementById('modalReturningSelect');
  if (returningSelect) {
    returningSelect.value = appState.activePlan === 'returning' ? 'yes' : 'no';
  }

  applyCouponCode(true);
  openModal('enrollmentModal');
}

function toggleModalReturningPlan(val) {
  appState.activePlan = val === 'yes' ? 'returning' : 'full';
  applyCouponCode(true);
}

function openCorporateModal() {
  openModal('corporateModal');
}

function openWorkshopBookingModal() {
  openModal('workshopModal');
}

function openAppDownloadModal(platform) {
  openModal('appModal');
}

// Form Handlers
function handleEnrollmentSubmit(e) {
  e.preventDefault();
  closeModal('enrollmentModal');
  showToast('Enrollment Application Received! Welcome to The Good Boss.', 'success');
}

function handleCorporateSubmit(e) {
  e.preventDefault();
  closeModal('corporateModal');
  showToast('Boardroom Consultation Request submitted. Our intervention lead will contact you within 4 hours.', 'success');
}

function handleWorkshopSubmit(e) {
  e.preventDefault();
  closeModal('workshopModal');
  showToast('Workshop Seats Reserved! Official confirmation packet dispatched.', 'success');
}

// FAQ Accordion
function toggleFaq(buttonEl) {
  const item = buttonEl.parentElement;
  const isActive = item.classList.contains('active');
  
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
  
  if (!isActive) {
    item.classList.add('active');
  }
}

// ==========================================================================
// 10. TOAST NOTIFICATION SYSTEM
// ==========================================================================
function showToast(message, type = 'info') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  let iconClass = 'fa-solid fa-bell';
  if (type === 'success') iconClass = 'fa-solid fa-circle-check';
  if (type === 'error') iconClass = 'fa-solid fa-triangle-exclamation';

  toast.innerHTML = `
    <i class="${iconClass}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}
