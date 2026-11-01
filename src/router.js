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
import { renderExplore } from './modules/explore.js';
import { renderHelp } from './modules/help.js';
import { renderSidebar, updateSidebarActive } from './components/sidebar.js';
import { renderNavbar } from './components/navbar.js';

const ROUTES = {
  dashboard: renderDashboard,
  explore: renderExplore,
  roadmap: renderRoadmap,
  practice: renderPractice,
  projects: renderProjects,
  resources: renderResources,
  community: renderCommunity,
  qa: renderQA,
  challenge: renderChallenge,
  career: renderCareer,
  help: renderHelp,
};

let currentRoute = 'dashboard';

export function initRouter() {
  const raw = window.location.hash.replace(/^#\/?/, '') || 'dashboard';
  navigate(raw, false);
  window.addEventListener('hashchange', () => {
    const nextRaw = window.location.hash.replace(/^#\/?/, '') || 'dashboard';
    navigate(nextRaw, false);
  });
}

export function navigate(routeInput, updateHash = true) {
  const raw = routeInput || 'dashboard';
  const [routePart, queryPart] = raw.split('?');
  const route = ROUTES[routePart] ? routePart : 'dashboard';
  currentRoute = route;

  // Extract query parameters like ?ex=pd-2 or ?id=py-1
  if (queryPart) {
    try {
      const params = new URLSearchParams(queryPart);
      const exId = params.get('ex') || params.get('id');
      if (exId) {
        window._selectedExerciseId = exId;
      }
    } catch {
      // ignore
    }
  }

  if (updateHash) {
    window.location.hash = raw;
  }

  renderSidebar(route, navigate);
  renderNavbar(route);
  updateSidebarActive(route);

  const content = document.getElementById('content');
  if (content) {
    content.innerHTML = '';
    content.scrollTop = 0;
    ROUTES[route](content, navigate);
  }
}

export function getCurrentRoute() {
  return currentRoute;
}
