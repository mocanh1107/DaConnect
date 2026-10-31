// ============================================
// DaConnect Sidebar Component
// ============================================

import { getState } from '../main.js';
import { ICONS } from './icons.js';

const NAV_ITEMS = [
  { section: 'TỔNG QUAN' },
  { id: 'dashboard', icon: ICONS.dashboard(18), label: 'Trang chủ', route: 'dashboard' },
  { section: 'HỌC TẬP' },
  { id: 'roadmap', icon: ICONS.roadmap(18), label: 'Roadmap', route: 'roadmap' },
  { id: 'practice', icon: ICONS.practice(18), label: 'Practice Lab', route: 'practice' },
  { id: 'projects', icon: ICONS.projects(18), label: 'Project Lab', route: 'projects' },
  { id: 'resources', icon: ICONS.book(18), label: 'Tài nguyên', route: 'resources' },
  { section: 'CỘNG ĐỒNG & TIN TỨC' },
  { id: 'community', icon: ICONS.community(18), label: 'Data & AI News', route: 'community' },
  { id: 'qa', icon: ICONS.qa(18), label: 'Data Q&A', route: 'qa', badge: '6' },
  { section: 'THỬ THÁCH & NGHỀ NGHIỆP' },
  { id: 'challenge', icon: ICONS.challenge(18), label: 'Challenge Arena', route: 'challenge' },
  { id: 'career', icon: ICONS.career(18), label: 'Career Hub', route: 'career' },
];

let collapsed = false;

export function renderSidebar(currentRoute, onNavigate) {
  const el = document.getElementById('sidebar');
  const user = getState('user');

  el.innerHTML = `
    <div class="sidebar-logo">
      <div class="sidebar-logo-mark">DC</div>
      <div class="sidebar-logo-text">
        <span class="sidebar-logo-name">DaConnect</span>
        <span class="sidebar-logo-tagline">Data Career Community</span>
      </div>
    </div>
    <nav class="sidebar-nav">
      ${NAV_ITEMS.map(item => {
        if (item.section) {
          return `<div class="sidebar-section-label">${item.section}</div>`;
        }
        const active = currentRoute === item.route ? 'active' : '';
        const badge = item.badge ? `<span class="sidebar-item-badge">${item.badge}</span>` : '';
        return `
          <button class="sidebar-item ${active}" data-route="${item.route}" aria-label="${item.label}">
            <span class="sidebar-item-icon">${item.icon}</span>
            <span class="sidebar-item-text">${item.label}</span>
            ${badge}
          </button>
        `;
      }).join('')}
    </nav>
    <div class="sidebar-footer">
      <div class="sidebar-user">
        <div class="avatar avatar-md">${user?.initials || 'MK'}</div>
        <div class="sidebar-user-info">
          <div class="sidebar-user-name">${user?.name || 'Minh Khoa'}</div>
          <div class="sidebar-user-rep" style="display:flex;align-items:center;gap:4px;">
            ${ICONS.star(13)} ${(user?.xp || 3850).toLocaleString()} XP
          </div>
        </div>
      </div>
    </div>
  `;

  // Event delegation for nav items
  el.querySelectorAll('.sidebar-item[data-route]').forEach(btn => {
    btn.addEventListener('click', () => {
      onNavigate(btn.dataset.route);
    });
  });
}

export function updateSidebarActive(route) {
  document.querySelectorAll('.sidebar-item[data-route]').forEach(btn => {
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
    overlay.addEventListener('click', closeMobileSidebar);
    document.body.appendChild(overlay);
  } else {
    overlay.classList.add('active');
  }
}

export function closeMobileSidebar() {
  document.getElementById('sidebar').classList.remove('mobile-open');
  document.querySelector('.sidebar-overlay')?.classList.remove('active');
}
