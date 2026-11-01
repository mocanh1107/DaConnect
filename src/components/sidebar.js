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
    <div class="sidebar-logo">
      <div class="sidebar-logo-mark">DC</div>
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
