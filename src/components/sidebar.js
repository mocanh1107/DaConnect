// High-performance embedded logo (zero-network dependency, fail-proof on Vercel & local)
const DACONNECT_LOGO_DATA = 'data:image/png;base64,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';

// ============================================
// DaConnect Sidebar Component
// ============================================

import { getState } from '../main.js';
import { ICONS } from './icons.js';

let collapsed = false;

export function renderSidebar(currentRoute, onNavigate) {
  const el = document.getElementById('sidebar');
  if (!el) return;
  const user = getState('user');

  const isExploreActive = currentRoute === 'explore';
  const isHelpActive = currentRoute === 'help';

  el.innerHTML = `
    <div class="sidebar-logo" data-route="dashboard" role="button" tabindex="0" title="DaConnect - Trang chủ">
      <div class="sidebar-logo-mark">
        <img src="${DACONNECT_LOGO_DATA}" alt="DaConnect Logo" class="sidebar-logo-img" />
      </div>
      <div class="sidebar-logo-text">
        <span class="sidebar-logo-name">DaConnect</span>
        <span class="sidebar-logo-tagline">Data Career Community</span>
      </div>
    </div>

    <nav class="sidebar-nav">
      <!-- NHÓM: TỔNG QUAN -->
      <div class="sidebar-section-label">TỔNG QUAN</div>
      <button class="sidebar-item ${currentRoute === 'dashboard' ? 'active' : ''}" data-route="dashboard" aria-label="Trang chủ">
        <span class="sidebar-item-icon">${ICONS.dashboard(18)}</span>
        <span class="sidebar-item-text">Trang chủ</span>
      </button>

      <!-- Explore Data: Card nổi bật cho người mới bắt đầu -->
      <button class="sidebar-explore-card ${isExploreActive ? 'active' : ''}" data-route="explore" aria-label="Khám phá Data">
        <div class="sidebar-explore-header">
          <div style="display:flex;align-items:center;gap:8px;">
            <span class="sidebar-explore-icon">${ICONS.compass(18)}</span>
            <span class="sidebar-explore-title">Khám phá Data</span>
          </div>
          <span class="sidebar-explore-badge">Người mới</span>
        </div>
        <div class="sidebar-explore-desc">Dành cho người mới bắt đầu</div>
      </button>

      <!-- NHÓM: HỌC TẬP -->
      <div class="sidebar-section-label">HỌC TẬP</div>
      <button class="sidebar-item ${currentRoute === 'roadmap' ? 'active' : ''}" data-route="roadmap" aria-label="Roadmap">
        <span class="sidebar-item-icon">${ICONS.roadmap(18)}</span>
        <span class="sidebar-item-text">Roadmap</span>
      </button>
      <button class="sidebar-item ${currentRoute === 'practice' ? 'active' : ''}" data-route="practice" aria-label="Practice Lab">
        <span class="sidebar-item-icon">${ICONS.practice(18)}</span>
        <span class="sidebar-item-text">Practice Lab</span>
      </button>
      <button class="sidebar-item ${currentRoute === 'projects' ? 'active' : ''}" data-route="projects" aria-label="Project Lab">
        <span class="sidebar-item-icon">${ICONS.projects(18)}</span>
        <span class="sidebar-item-text">Project Lab</span>
      </button>
      <button class="sidebar-item ${currentRoute === 'resources' ? 'active' : ''}" data-route="resources" aria-label="Tài nguyên">
        <span class="sidebar-item-icon">${ICONS.book(18)}</span>
        <span class="sidebar-item-text">Tài nguyên</span>
      </button>

      <!-- NHÓM: CỘNG ĐỒNG & TIN TỨC -->
      <div class="sidebar-section-label">CỘNG ĐỒNG & TIN TỨC</div>
      <button class="sidebar-item ${currentRoute === 'community' ? 'active' : ''}" data-route="community" aria-label="Data & AI News">
        <span class="sidebar-item-icon">${ICONS.community(18)}</span>
        <span class="sidebar-item-text">Data & AI News</span>
      </button>
      <button class="sidebar-item ${currentRoute === 'qa' ? 'active' : ''}" data-route="qa" aria-label="Data Q&A">
        <span class="sidebar-item-icon">${ICONS.qa(18)}</span>
        <span class="sidebar-item-text">Data Q&A</span>
        <span class="sidebar-item-badge">6</span>
      </button>

      <!-- NHÓM: THỬ THÁCH & NGHỀ NGHIỆP -->
      <div class="sidebar-section-label">THỬ THÁCH & NGHỀ NGHIỆP</div>
      <button class="sidebar-item ${currentRoute === 'challenge' ? 'active' : ''}" data-route="challenge" aria-label="Challenge Arena">
        <span class="sidebar-item-icon">${ICONS.challenge(18)}</span>
        <span class="sidebar-item-text">Challenge Arena</span>
      </button>
      <button class="sidebar-item ${currentRoute === 'career' ? 'active' : ''}" data-route="career" aria-label="Career Hub">
        <span class="sidebar-item-icon">${ICONS.career(18)}</span>
        <span class="sidebar-item-text">Career Hub</span>
      </button>

      <!-- NHÓM: HƯỚNG DẪN / HELP (Cuối menu, ngay trên User footer) -->
      <div class="sidebar-help-divider"></div>
      <button class="sidebar-item sidebar-help-item ${isHelpActive ? 'active' : ''}" data-route="help" aria-label="Help & Hướng dẫn">
        <span class="sidebar-item-icon">${ICONS.help(18)}</span>
        <span class="sidebar-item-text">Help & Hướng dẫn</span>
      </button>
    </nav>

    <div class="sidebar-footer">
      <div class="sidebar-user">
        <div class="avatar avatar-md">${user?.initials || 'MK'}</div>
        <div class="sidebar-user-info">
          <div class="sidebar-user-name">${user?.name || 'Nguyễn Minh Khoa'}</div>
          <div class="sidebar-user-rep" style="display:flex;align-items:center;gap:4px;">
            ${ICONS.star(13)} ${(user?.xp || 4375).toLocaleString()} XP
          </div>
        </div>
      </div>
    </div>
  `;

  // Event delegation for all nav items
  el.querySelectorAll('.sidebar-item[data-route], .sidebar-explore-card[data-route]').forEach(btn => {
    btn.addEventListener('click', () => {
      onNavigate(btn.dataset.route);
    });
  });

  const logoEl = el.querySelector('.sidebar-logo');
  if (logoEl) {
    logoEl.addEventListener('click', () => {
      onNavigate('dashboard');
    });
  }
}

export function updateSidebarActive(route) {
  document.querySelectorAll('.sidebar-item[data-route], .sidebar-explore-card[data-route]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.route === route);
  });
}

export function toggleSidebar() {
  collapsed = !collapsed;
  const sidebar = document.getElementById('sidebar');
  const wrapper = document.getElementById('main-wrapper');
  sidebar.classList.toggle('collapsed', collapsed);
  wrapper.classList.toggle('sidebar-collapsed', collapsed);
}

export function openMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.add('mobile-open');
  let overlay = document.querySelector('.sidebar-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay active';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', closeMobileSidebar);
  } else {
    overlay.classList.add('active');
  }
}

export function closeMobileSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.remove('mobile-open');
  const overlay = document.querySelector('.sidebar-overlay');
  if (overlay) overlay.classList.remove('active');
}
