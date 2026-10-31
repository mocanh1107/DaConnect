// ============================================
// DaConnect Navbar Component
// ============================================

import { getState } from '../main.js';
import { toggleSidebar, openMobileSidebar } from './sidebar.js';
import { ICONS } from './icons.js';

const PAGE_TITLES = {
  dashboard: { label: 'Trang chủ', icon: ICONS.dashboard(16) },
  roadmap: { label: 'Roadmap', icon: ICONS.roadmap(16) },
  practice: { label: 'Practice Lab', icon: ICONS.practice(16) },
  projects: { label: 'Project Lab', icon: ICONS.projects(16) },
  resources: { label: 'Tài nguyên học tập', icon: ICONS.book(16) },
  community: { label: 'Data & AI News', icon: ICONS.community(16) },
  qa: { label: 'Data Q&A', icon: ICONS.qa(16) },
  challenge: { label: 'Challenge Arena', icon: ICONS.challenge(16) },
  career: { label: 'Career Hub', icon: ICONS.career(16) },
};

export function renderNavbar(currentRoute) {
  const el = document.getElementById('navbar');
  const page = PAGE_TITLES[currentRoute] || { label: currentRoute, icon: ICONS.dashboard(16) };
  const user = getState('user');
  const xp = user?.xp || 3850;
  const streak = user?.streak || 7;

  el.innerHTML = `
    <button class="navbar-toggle desktop-toggle" id="sidebar-toggle" title="Toggle sidebar">
      ${ICONS.menu(20)}
    </button>
    <button class="navbar-toggle mobile-toggle" id="mobile-menu-btn" title="Menu" style="display:none">
      ${ICONS.menu(20)}
    </button>
    <div class="navbar-breadcrumb">
      <span style="display:flex;align-items:center;">${page.icon}</span>
      <span>/</span>
      <span class="current">${page.label}</span>
    </div>
    <div class="navbar-actions">
      <div class="navbar-streak" title="Streak hiện tại">
        <span style="display:flex;align-items:center;">${ICONS.flame(16)}</span>
        <span>${streak} ngày</span>
      </div>
      <div class="navbar-score" title="Tổng XP của bạn">
        <span style="display:flex;align-items:center;">${ICONS.star(15)}</span>
        <span>${xp.toLocaleString()} XP</span>
      </div>
      <div class="avatar avatar-md" style="cursor:pointer" title="${user?.name}">
        ${user?.initials || 'MK'}
      </div>
    </div>
  `;

  // Toggle sidebar on desktop
  el.querySelector('#sidebar-toggle')?.addEventListener('click', toggleSidebar);
  // Mobile hamburger
  const mobileBtn = el.querySelector('#mobile-menu-btn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', openMobileSidebar);
  }

  // Show mobile btn on small screens
  const updateMobileBtn = () => {
    if (window.innerWidth <= 768) {
      el.querySelector('.desktop-toggle')?.setAttribute('style', 'display:none');
      el.querySelector('.mobile-toggle')?.removeAttribute('style');
    } else {
      el.querySelector('.desktop-toggle')?.removeAttribute('style');
      el.querySelector('.mobile-toggle')?.setAttribute('style', 'display:none');
    }
  };
  updateMobileBtn();
  window.addEventListener('resize', updateMobileBtn);
}
