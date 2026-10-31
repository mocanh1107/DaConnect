// ============================================
// DaConnect Router
// ============================================

import { renderDashboard } from './modules/dashboard.js';
import { renderCommunity } from './modules/community.js';
import { renderQA } from './modules/qa.js';
import { renderPractice } from './modules/practice.js';
import { renderRoadmap } from './modules/roadmap.js';
import { renderChallenge } from './modules/challenge.js';
import { renderProjects } from './modules/projects.js';
import { renderCareer } from './modules/career.js';
import { renderResources } from './modules/resources.js';
import { renderSidebar, updateSidebarActive } from './components/sidebar.js';
import { renderNavbar } from './components/navbar.js';

const ROUTES = {
  dashboard: renderDashboard,
  community: renderCommunity,
  qa: renderQA,
  practice: renderPractice,
  roadmap: renderRoadmap,
  challenge: renderChallenge,
  projects: renderProjects,
  career: renderCareer,
  resources: renderResources,
};

let currentRoute = 'dashboard';

export function initRouter() {
  const hash = window.location.hash.replace('#', '') || 'dashboard';
  navigate(hash);
  window.addEventListener('hashchange', () => {
    const route = window.location.hash.replace('#', '') || 'dashboard';
    navigate(route, false);
  });
}

export function navigate(route, updateHash = true) {
  if (!ROUTES[route]) route = 'dashboard';
  currentRoute = route;
  if (updateHash) window.location.hash = route;
  renderSidebar(route, navigate);
  renderNavbar(route);
  updateSidebarActive(route);
  const content = document.getElementById('content');
  content.innerHTML = '';
  content.scrollTop = 0;
  ROUTES[route](content, navigate);
}

export function getCurrentRoute() {
  return currentRoute;
}

