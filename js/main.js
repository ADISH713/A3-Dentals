// A3 DENTAL LAB - Master Application Logic
// Features: Dynamic Catalog, Multi-Filter, Search, Interactive Estimator,
// Scroll Animations, Brochure Viewer, WhatsApp Order Generator

document.addEventListener('DOMContentLoaded', () => {
  // Initialize App Modules
  initScrollEffects();
  initScrollAnimations();
  initCounters();
  initCatalog();
  initEstimator();
  initBrochureModal();
  initContactForm();
  initMobileNav();
});

/* ==========================================================================
   1. Scroll Effects & Navigation
   ========================================================================== */
function initScrollEffects() {
  const header = document.querySelector('.site-header');
  const progressBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    
    // Top reading progress bar
    if (progressBar && docHeight > 0) {
      const scrollPercent = (scrollPos / docHeight) * 100;
      progressBar.style.width = `${scrollPercent}%`;
    }

    // Header scroll background toggle
    const headerWrapper = document.getElementById('header-wrapper');
    if (header) {
      if (scrollPos > 40) {
        header.classList.add('scrolled');
        if (headerWrapper) headerWrapper.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
        if (headerWrapper) headerWrapper.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollPos > 400) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.pointerEvents = 'all';
        backToTopBtn.style.transform = 'translateY(0)';
      } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.pointerEvents = 'none';
        backToTopBtn.style.transform = 'translateY(12px)';
      }
    }

    // ScrollSpy active link detection
    let currentId = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* ==========================================================================
   2. Animated Number Counters
   ========================================================================== */
function initCounters() {
  const counterElements = document.querySelectorAll('[data-counter]');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-counter'), 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1800;
        const start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease out cubic
          const currentVal = Math.floor(start + (target - start) * (1 - Math.pow(1 - progress, 3)));
          el.textContent = `${prefix}${currentVal.toLocaleString()}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
          }
        }

        requestAnimationFrame(updateCounter);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(counter => observer.observe(counter));
}

/* ==========================================================================
   3. Interactive Catalog & Search
   ========================================================================== */
let activeCategory = 'all';
let currentSearchQuery = '';
let currentSort = 'default';
let currentViewMode = 'grid'; // 'grid' | 'table'

function initCatalog() {
  const pillsContainer = document.getElementById('category-pills');
  const searchInput = document.getElementById('catalog-search');
  const sortSelect = document.getElementById('catalog-sort');
  const viewGridBtn = document.getElementById('view-grid-btn');
  const viewTableBtn = document.getElementById('view-table-btn');

  // Render Category Filter Buttons
  if (pillsContainer && LAB_DATA.categories) {
    pillsContainer.innerHTML = LAB_DATA.categories.map(cat => {
      const count = cat.id === 'all' 
        ? LAB_DATA.products.length 
        : LAB_DATA.products.filter(p => p.category === cat.id).length;
      return `
        <button class="cat-pill-btn ${cat.id === 'all' ? 'active' : ''}" data-cat="${cat.id}">
          <i class="fa-solid ${cat.icon}"></i>
          <span>${cat.name}</span>
          <span class="text-xs px-2 py-0.5 rounded-full ${cat.id === 'all' ? 'bg-purple-200 text-purple-900' : 'bg-gray-100 text-gray-600'}">${count}</span>
        </button>
      `;
    }).join('');

    pillsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.cat-pill-btn');
      if (!btn) return;
      document.querySelectorAll('.cat-pill-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-cat');
      renderProducts();
    });
  }

  // Search Input Listener
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  // Sort Selection Listener
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  // View Mode Switcher
  if (viewGridBtn && viewTableBtn) {
    viewGridBtn.addEventListener('click', () => {
      currentViewMode = 'grid';
      viewGridBtn.classList.add('bg-purple-100', 'text-purple-700');
      viewTableBtn.classList.remove('bg-purple-100', 'text-purple-700');
      renderProducts();
    });

    viewTableBtn.addEventListener('click', () => {
      currentViewMode = 'table';
      viewTableBtn.classList.add('bg-purple-100', 'text-purple-700');
      viewGridBtn.classList.remove('bg-purple-100', 'text-purple-700');
      renderProducts();
    });
  }

  // Initial render
  renderProducts();
}

function getFilteredProducts() {
  let list = [...LAB_DATA.products];

  // Category filter
  if (activeCategory !== 'all') {
    list = list.filter(p => p.category === activeCategory);
  }

  // Search filter
  if (currentSearchQuery) {
    list = list.filter(p => 
      p.name.toLowerCase().includes(currentSearchQuery) ||
      p.description.toLowerCase().includes(currentSearchQuery) ||
      (p.tag && p.tag.toLowerCase().includes(currentSearchQuery))
    );
  }

  // Sorting
  if (currentSort === 'price-asc') {
    list.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-desc') {
    list.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'name-asc') {
    list.sort((a, b) => a.name.localeCompare(b.name));
  }

  return list;
}

function renderProducts() {
  const container = document.getElementById('products-container');
  const countDisplay = document.getElementById('catalog-results-count');
  if (!container) return;

  const items = getFilteredProducts();

  if (countDisplay) {
    countDisplay.textContent = `Showing ${items.length} of ${LAB_DATA.products.length} lab restorations`;
  }

  if (items.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-16 px-4 bg-white rounded-3xl border border-dashed border-purple-200">
        <div class="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
          <i class="fa-solid fa-tooth"></i>
        </div>
        <h3 class="text-xl font-bold text-gray-800 mb-2">No matching restorations found</h3>
        <p class="text-gray-500 max-w-md mx-auto mb-6">Try adjusting your search terms or select "All Solutions" to browse the full price list.</p>
        <button onclick="resetFilters()" class="btn-primary text-sm px-6 py-2.5">
          <i class="fa-solid fa-rotate-left"></i> Reset Filters
        </button>
      </div>
    `;
    return;
  }

  if (currentViewMode === 'table') {
    renderTableView(container, items);
  } else {
    renderGridView(container, items);
  }
}

function resetFilters() {
  activeCategory = 'all';
  currentSearchQuery = '';
  const searchInput = document.getElementById('catalog-search');
  if (searchInput) searchInput.value = '';
  document.querySelectorAll('.cat-pill-btn').forEach(b => {
    b.classList.remove('active');
    if (b.getAttribute('data-cat') === 'all') b.classList.add('active');
  });
  renderProducts();
}

function renderGridView(container, items) {
  container.className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";
  container.innerHTML = items.map((prod, idx) => {
    const isAdded = cartItems.some(i => i.id === prod.id);
    const badgeHtml = prod.badge 
      ? `<span class="bg-purple-600 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-sm">${prod.badge}</span>`
      : '';
    const tagHtml = prod.tag
      ? `<span class="badge-purple">${prod.tag}</span>`
      : '';

    return `
      <div class="product-card product-card-enter" style="animation-delay: ${(idx % 6) * 45}ms;">
        <div>
          <div class="flex items-start justify-between gap-2 mb-3">
            <div class="flex flex-wrap gap-1.5 items-center">
              ${tagHtml}
              ${badgeHtml}
            </div>
            <span class="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100 flex items-center gap-1 shrink-0">
              <i class="fa-solid fa-stopwatch text-purple-500"></i> ${prod.turnaround}
            </span>
          </div>

          <h3 class="text-lg font-bold text-gray-900 mb-2 leading-tight">${prod.name}</h3>
          <p class="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">${prod.description}</p>

          <div class="space-y-1.5 mb-5 pb-4 border-b border-gray-100">
            ${prod.highlights.slice(0, 3).map(h => `
              <div class="flex items-center gap-2 text-xs text-gray-600">
                <i class="fa-solid fa-circle-check text-purple-600 text-[10px]"></i>
                <span>${h}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="pt-2">
          <div class="flex items-baseline justify-between mb-4">
            <div>
              <span class="text-[11px] uppercase tracking-wider font-semibold text-gray-400">Lab Fee</span>
              <div class="price-tag">₹${prod.price.toLocaleString('en-IN')}</div>
            </div>
            <button onclick="quickWhatsAppInquiry('${prod.name}', ${prod.price})" 
              title="Quick WhatsApp inquiry for this item"
              class="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center border border-emerald-200">
              <i class="fa-brands fa-whatsapp text-lg"></i>
            </button>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <button onclick="addToEstimator('${prod.id}')" 
              class="w-full py-2.5 px-3 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5 ${
                isAdded 
                  ? 'bg-purple-100 text-purple-800 border border-purple-300' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm'
              }">
              <i class="fa-solid ${isAdded ? 'fa-check' : 'fa-plus'}"></i>
              <span>${isAdded ? 'Added (+1)' : 'Add to Rx'}</span>
            </button>

            <button onclick="openProductDetail('${prod.id}')" 
              class="w-full py-2.5 px-3 rounded-xl font-semibold text-xs bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 transition-all flex items-center justify-center gap-1">
              <i class="fa-solid fa-circle-info text-gray-400"></i> Specs
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderTableView(container, items) {
  container.className = "w-full overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-sm";
  container.innerHTML = `
    <table class="w-full text-left text-sm text-gray-600 border-collapse">
      <thead class="bg-purple-50 text-purple-900 font-bold text-xs uppercase tracking-wider border-b border-purple-100">
        <tr>
          <th class="py-4 px-6">Restoration / Appliance</th>
          <th class="py-4 px-4">Category</th>
          <th class="py-4 px-4">Turnaround</th>
          <th class="py-4 px-4">Key Specifications</th>
          <th class="py-4 px-4 text-right">Price (₹)</th>
          <th class="py-4 px-6 text-center">Action</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        ${items.map(p => `
          <tr class="hover:bg-purple-50/50 transition-colors">
            <td class="py-4 px-6">
              <div class="font-bold text-gray-900">${p.name}</div>
              <div class="text-xs text-gray-500">${p.tag || ''}</div>
            </td>
            <td class="py-4 px-4">
              <span class="inline-block text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 uppercase tracking-wider">
                ${p.category}
              </span>
            </td>
            <td class="py-4 px-4">
              <span class="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                ⚡ ${p.turnaround}
              </span>
            </td>
            <td class="py-4 px-4 text-xs text-gray-500 max-w-xs">
              ${p.highlights.slice(0, 2).join(' • ')}
            </td>
            <td class="py-4 px-4 text-right font-bold text-purple-800 text-base">
              ₹${p.price.toLocaleString('en-IN')}
            </td>
            <td class="py-4 px-6 text-center">
              <button onclick="addToEstimator('${p.id}')" 
                class="px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs font-semibold transition-all">
                + Add
              </button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

/* ==========================================================================
   4. Interactive Order Estimator & Rx Slip Generator
   ========================================================================== */
let cartItems = [];

function initEstimator() {
  updateCartBadge();
  
  const floatingBar = document.getElementById('cart-floating-trigger');
  if (floatingBar) {
    floatingBar.addEventListener('click', openEstimatorModal);
  }
}

function addToEstimator(productId) {
  const product = LAB_DATA.products.find(p => p.id === productId);
  if (!product) return;

  const existing = cartItems.find(i => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cartItems.push({
      id: product.id,
      name: product.name,
      price: product.price,
      turnaround: product.turnaround,
      qty: 1
    });
  }

  updateCartBadge();
  showToast(`Added "${product.name}" to Prescription Estimate`);
  renderProducts(); // update added state buttons
}

function updateQuantity(productId, delta) {
  const item = cartItems.find(i => i.id === productId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    cartItems = cartItems.filter(i => i.id !== productId);
  }

  updateCartBadge();
  renderEstimatorModalItems();
  renderProducts();
}

function removeCartItem(productId) {
  cartItems = cartItems.filter(i => i.id !== productId);
  updateCartBadge();
  renderEstimatorModalItems();
  renderProducts();
  showToast('Item removed from estimate');
}

function clearCart() {
  cartItems = [];
  updateCartBadge();
  renderEstimatorModalItems();
  renderProducts();
  showToast('Estimate cleared');
}

function updateCartBadge() {
  const totalCount = cartItems.reduce((acc, cur) => acc + cur.qty, 0);
  const badgeEl = document.getElementById('floating-cart-count');
  const triggerEl = document.getElementById('cart-floating-trigger');

  if (badgeEl) {
    badgeEl.textContent = totalCount;
  }

  if (triggerEl) {
    if (totalCount > 0) {
      triggerEl.style.display = 'flex';
    } else {
      triggerEl.style.display = 'none';
    }
  }
}

function openEstimatorModal() {
  const modal = document.getElementById('estimator-modal');
  if (!modal) return;
  renderEstimatorModalItems();
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeEstimatorModal() {
  const modal = document.getElementById('estimator-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function renderEstimatorModalItems() {
  const container = document.getElementById('estimator-items-list');
  const subtotalEl = document.getElementById('estimator-subtotal');
  const totalItemsCount = document.getElementById('estimator-total-units');
  if (!container) return;

  if (cartItems.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 px-4">
        <div class="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
          <i class="fa-solid fa-receipt"></i>
        </div>
        <h4 class="font-bold text-gray-800 text-lg mb-1">Your Rx Estimate is Empty</h4>
        <p class="text-xs text-gray-500 max-w-xs mx-auto mb-5">Click "+ Add to Rx" on any restoration in our price catalog to calculate batch cost.</p>
        <button onclick="closeEstimatorModal()" class="btn-primary text-xs px-5 py-2">
          Explore Price Catalog
        </button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '₹0';
    if (totalItemsCount) totalItemsCount.textContent = '0 Units';
    return;
  }

  const subtotal = cartItems.reduce((acc, cur) => acc + (cur.price * cur.qty), 0);
  const totalUnits = cartItems.reduce((acc, cur) => acc + cur.qty, 0);

  container.innerHTML = cartItems.map(item => `
    <div class="flex items-center justify-between p-3.5 bg-gray-50 rounded-xl border border-gray-200">
      <div class="flex-1 pr-3">
        <h5 class="font-bold text-sm text-gray-900">${item.name}</h5>
        <div class="flex items-center gap-3 text-xs text-gray-500 mt-1">
          <span>₹${item.price.toLocaleString('en-IN')} / unit</span>
          <span>•</span>
          <span class="text-purple-700 font-medium">⚡ ${item.turnaround}</span>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex items-center bg-white rounded-lg border border-gray-300 overflow-hidden">
          <button onclick="updateQuantity('${item.id}', -1)" class="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition">
            <i class="fa-solid fa-minus text-[10px]"></i>
          </button>
          <span class="w-8 text-center text-xs font-bold text-gray-800">${item.qty}</span>
          <button onclick="updateQuantity('${item.id}', 1)" class="w-7 h-7 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition">
            <i class="fa-solid fa-plus text-[10px]"></i>
          </button>
        </div>

        <div class="text-right w-20">
          <div class="font-bold text-sm text-purple-900">₹${(item.price * item.qty).toLocaleString('en-IN')}</div>
        </div>

        <button onclick="removeCartItem('${item.id}')" class="text-gray-400 hover:text-red-500 transition p-1">
          <i class="fa-solid fa-trash-can text-sm"></i>
        </button>
      </div>
    </div>
  `).join('');

  if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toLocaleString('en-IN')}`;
  if (totalItemsCount) totalItemsCount.textContent = `${totalUnits} Unit${totalUnits > 1 ? 's' : ''}`;
}

function sendCartViaWhatsApp() {
  if (cartItems.length === 0) {
    showToast('Please add items to your estimate first');
    return;
  }

  const doctorName = document.getElementById('est-doctor-name')?.value.trim() || 'Doctor';
  const clinicName = document.getElementById('est-clinic-name')?.value.trim() || 'Dental Clinic';
  const notes = document.getElementById('est-notes')?.value.trim() || 'Standard Delivery';

  const subtotal = cartItems.reduce((acc, cur) => acc + (cur.price * cur.qty), 0);
  const totalUnits = cartItems.reduce((acc, cur) => acc + cur.qty, 0);

  let message = `*🦷 LAB ORDER INQUIRY - A3 DENTAL LAB*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*Doctor:* ${doctorName}\n`;
  message += `*Clinic:* ${clinicName}\n`;
  message += `*Date:* ${new Date().toLocaleDateString('en-GB')}\n\n`;
  message += `*📋 PRESCRIPTION ITEMS (${totalUnits} Units):*\n`;

  cartItems.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    message += `   Qty: ${item.qty} | Rate: ₹${item.price} | Total: ₹${item.price * item.qty}\n`;
  });

  message += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `*ESTIMATED TOTAL:* ₹${subtotal.toLocaleString('en-IN')}\n`;
  message += `*Delivery Requirement:* 48-Hour Standard\n`;
  if (notes && notes !== 'Standard Delivery') {
    message += `*Doctor Notes / Shade:* ${notes}\n`;
  }
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `Please confirm pickup / digital STL receipt and timeline. Thank you!`;

  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/918089507733?text=${encoded}`, '_blank');
}

function printEstimateSlip() {
  if (cartItems.length === 0) {
    showToast('Add items to print slip');
    return;
  }
  window.print();
}

function quickWhatsAppInquiry(productName, price) {
  const msg = encodeURIComponent(`Hello A3 Dental Lab, I am inquiring about *${productName}* (Listed at ₹${price}). Please share turnaround details and pickup availability.`);
  window.open(`https://wa.me/918089507733?text=${msg}`, '_blank');
}

/* ==========================================================================
   5. Product Detail Modal
   ========================================================================== */
function openProductDetail(productId) {
  const prod = LAB_DATA.products.find(p => p.id === productId);
  if (!prod) return;

  const modal = document.getElementById('product-detail-modal');
  const body = document.getElementById('product-detail-content');
  if (!modal || !body) return;

  body.innerHTML = `
    <div class="p-6 md:p-8">
      <div class="flex items-start justify-between mb-4">
        <div class="flex items-center gap-2">
          <span class="badge-purple">${prod.category.toUpperCase()}</span>
          ${prod.tag ? `<span class="bg-gray-100 text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full">${prod.tag}</span>` : ''}
          ${prod.badge ? `<span class="bg-purple-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">${prod.badge}</span>` : ''}
        </div>
        <button onclick="closeProductDetail()" class="text-gray-400 hover:text-gray-700 p-1.5">
          <i class="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>

      <h2 class="text-2xl font-extrabold text-gray-900 mb-2">${prod.name}</h2>
      <p class="text-sm text-gray-600 mb-6 leading-relaxed">${prod.description}</p>

      <div class="grid grid-cols-2 gap-4 p-4 bg-purple-50 rounded-2xl mb-6 border border-purple-100">
        <div>
          <span class="text-xs uppercase font-bold text-gray-500">Official Lab Price</span>
          <div class="text-3xl font-extrabold text-purple-900 mt-1">₹${prod.price.toLocaleString('en-IN')}</div>
        </div>
        <div>
          <span class="text-xs uppercase font-bold text-gray-500">Guaranteed Dispatch</span>
          <div class="text-lg font-bold text-purple-800 mt-1 flex items-center gap-2">
            <i class="fa-solid fa-bolt-lightning text-amber-500"></i> ${prod.turnaround}
          </div>
        </div>
      </div>

      <div class="mb-6">
        <h4 class="text-xs uppercase font-bold tracking-wider text-gray-500 mb-3">Key Features & Technical Merits</h4>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          ${prod.highlights.map(h => `
            <div class="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-xl text-xs font-medium text-gray-700 border border-gray-100">
              <i class="fa-solid fa-check text-purple-600"></i>
              <span>${h}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-6 text-xs text-amber-900 flex items-start gap-3">
        <i class="fa-solid fa-shield-halved text-amber-600 text-base mt-0.5"></i>
        <div>
          <strong>A3 Quality & Fit Guarantee:</strong> Fits strictly verified on master working cast. Guaranteed under our 7-day reporting warranty window.
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button onclick="addToEstimator('${prod.id}'); closeProductDetail();" class="flex-1 btn-primary py-3">
          <i class="fa-solid fa-cart-plus"></i> Add to Prescription Estimate
        </button>
        <button onclick="quickWhatsAppInquiry('${prod.name}', ${prod.price})" class="btn-whatsapp py-3 px-6">
          <i class="fa-brands fa-whatsapp text-lg"></i> Inquire
        </button>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProductDetail() {
  const modal = document.getElementById('product-detail-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   6. Authentic Brochure Viewer Modal
   ========================================================================== */
function initBrochureModal() {
  const openBtns = document.querySelectorAll('.open-brochure-modal');
  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openBrochureViewer();
    });
  });
}

function openBrochureViewer(tab = 'cover') {
  const modal = document.getElementById('brochure-modal');
  if (!modal) return;
  switchBrochureTab(tab);
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeBrochureViewer() {
  const modal = document.getElementById('brochure-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function switchBrochureTab(tabName) {
  const imgEl = document.getElementById('brochure-modal-img');
  const tabCoverBtn = document.getElementById('tab-brochure-cover');
  const tabPriceBtn = document.getElementById('tab-brochure-pricing');
  if (!imgEl) return;

  if (tabName === 'cover') {
    imgEl.src = 'assets/brochure_cover.jpg';
    imgEl.alt = 'A3 Dental Lab Official Brochure Front Cover';
    if (tabCoverBtn) {
      tabCoverBtn.className = "px-4 py-2 rounded-full font-bold text-xs bg-purple-600 text-white shadow-sm";
    }
    if (tabPriceBtn) {
      tabPriceBtn.className = "px-4 py-2 rounded-full font-semibold text-xs bg-gray-100 text-gray-700 hover:bg-gray-200";
    }
  } else {
    imgEl.src = 'assets/brochure_pricing.jpg';
    imgEl.alt = 'A3 Dental Lab Official Master Price List';
    if (tabPriceBtn) {
      tabPriceBtn.className = "px-4 py-2 rounded-full font-bold text-xs bg-purple-600 text-white shadow-sm";
    }
    if (tabCoverBtn) {
      tabCoverBtn.className = "px-4 py-2 rounded-full font-semibold text-xs bg-gray-100 text-gray-700 hover:bg-gray-200";
    }
  }
}



/* ==========================================================================
   8. Contact & Case Submission Form
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('case-inquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('[name="doctor_name"]').value.trim();
    const clinic = form.querySelector('[name="clinic_name"]').value.trim();
    const phone = form.querySelector('[name="phone"]').value.trim();
    const workType = form.querySelector('[name="work_type"]').value;
    const units = form.querySelector('[name="units"]').value;
    const notes = form.querySelector('[name="notes"]').value.trim();

    if (!name || !phone) {
      showToast('Please enter your name and contact phone number');
      return;
    }

    // Trigger celebratory confetti
    if (typeof confetti !== 'undefined') {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    }

    // Prompt doctor to send directly to WhatsApp for 10x faster response
    let msg = `*🦷 NEW CASE SUBMISSION / INQUIRY*\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*Doctor Name:* Dr. ${name}\n`;
    if (clinic) msg += `*Clinic:* ${clinic}\n`;
    msg += `*Phone / WhatsApp:* ${phone}\n`;
    msg += `*Restoration Type:* ${workType}\n`;
    msg += `*Number of Units:* ${units}\n`;
    if (notes) msg += `*Instructions / Shade:* ${notes}\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Please reply with pickup arrangement / digital file confirmation.`;

    const encoded = encodeURIComponent(msg);
    showToast('Inquiry generated! Opening WhatsApp direct chat...');

    setTimeout(() => {
      window.open(`https://wa.me/918089507733?text=${encoded}`, '_blank');
      form.reset();
    }, 800);
  });
}

/* ==========================================================================
   9. Mobile Offcanvas Navigation
   ========================================================================== */
function initMobileNav() {
  const openBtn = document.getElementById('mobile-nav-toggle');
  const closeBtn = document.getElementById('mobile-nav-close');
  const drawer = document.getElementById('mobile-nav-drawer');
  const backdrop = document.getElementById('mobile-nav-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    if (drawer) drawer.classList.add('open');
    if (backdrop) backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (drawer) drawer.classList.remove('open');
    if (backdrop) backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   10. Toast Notification System
   ========================================================================== */
function showToast(message, duration = 3200) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid fa-circle-check text-purple-400"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}


/* ==========================================================================
   Smooth Hardware-Accelerated Scroll Animations Engine
   ========================================================================== */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale');
  if (!elements.length) return;

  // Immediate check: elements already visible or near top on load reveal with zero delay
  const winHeight = window.innerHeight;
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < winHeight - 15) {
      el.classList.add('revealed');
    }
  });

  // Early-trigger IntersectionObserver: triggers seamlessly as element approaches viewport
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -20px 0px',
      threshold: 0.05
    });

    elements.forEach(el => {
      if (!el.classList.contains('revealed')) {
        observer.observe(el);
      }
    });
  } else {
    // Fallback for older browsers
    elements.forEach(el => el.classList.add('revealed'));
  }
}
