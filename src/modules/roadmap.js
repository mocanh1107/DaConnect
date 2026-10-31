// ============================================
// DaConnect – Roadmap Module (NeetCode Style Interactive)
// ============================================

import { ROADMAP_NODES, NODE_DESCRIPTIONS, EXERCISES } from '../data/mockData.js';
import { getState, getNodeStatus, markNodeActive, markNodeComplete, addXP, addActivity } from '../main.js';
import { showToast } from '../components/toast.js';
import { ICONS } from '../components/icons.js';

// ── Constants ──────────────────────────────────
const CANVAS_W = 780;
const CANVAS_H = 1100;
const TOTAL_SKILLS = 14;

const NODE_ICONS = {
  py: ICONS.terminal(22),
  np: ICONS.cpu(22),
  pd: ICONS.database(22),
  dc: ICONS.refresh(22),
  dt: ICONS.code(22),
  sql1: ICONS.database(22),
  sql2: ICONS.database(22),
  eda: ICONS.search(22),
  stat: ICONS.barChart(22),
  viz: ICONS.trendingUp(22),
  bm: ICONS.briefcase(22),
  story: ICONS.messageSquare(22),
  proj: ICONS.projects(22),
  port: ICONS.trophy(22),
};

function buildStreakCalendar(streakDays) {
  const days = 28;
  const cells = [];
  for (let i = 0; i < days; i++) {
    const isToday = i === days - 1;
    const isActive = i >= days - streakDays;
    cells.push(
      `<div class="streak-day${isActive ? ' active' : ''}${isToday ? ' today' : ''}"></div>`
    );
  }
  return cells.join('');
}

function getCompletedCount() {
  const nodes = getState('roadmapNodes');
  return ROADMAP_NODES.filter(n => nodes[n.id] === 'completed').length;
}

function getExerciseBreakdown() {
  const exercisesState = getState('exercises');
  const breakdown = { Easy: 0, Medium: 0, Hard: 0 };
  EXERCISES.forEach(ex => {
    if (exercisesState[ex.id]?.solved) {
      breakdown[ex.difficulty] = (breakdown[ex.difficulty] || 0) + 1;
    }
  });
  return breakdown;
}

// ── Graph Traversal Helpers (NeetCode Prerequisite Logic) ───

/**
 * Recursively find all upstream prerequisite ancestor nodes and edges leading to targetId
 */
function getPrerequisites(targetId, nodeMap) {
  const prereqNodeIds = new Set();
  const prereqEdges = new Set(); // Stores strings formatted as "fromId->toId"

  function traverse(currentId) {
    const node = nodeMap[currentId];
    if (!node || !node.deps) return;

    node.deps.forEach(depId => {
      prereqEdges.add(`${depId}->${currentId}`);
      if (!prereqNodeIds.has(depId)) {
        prereqNodeIds.add(depId);
        traverse(depId);
      }
    });
  }

  traverse(targetId);
  return { prereqNodeIds, prereqEdges };
}

/**
 * Find downstream nodes that directly or indirectly depend on targetId
 */
function getUnlockedNodes(targetId, allNodes) {
  const unlockedNodeIds = new Set();
  const unlockedEdges = new Set();

  function traverse(currentId) {
    allNodes.forEach(node => {
      if ((node.deps || []).includes(currentId)) {
        unlockedEdges.add(`${currentId}->${node.id}`);
        if (!unlockedNodeIds.has(node.id)) {
          unlockedNodeIds.add(node.id);
          traverse(node.id);
        }
      }
    });
  }

  traverse(targetId);
  return { unlockedNodeIds, unlockedEdges };
}

// ── SVG Edge Drawing with Marker Defs ──────────
function drawEdges(svgEl, nodes) {
  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.id] = n; });

  const defs = `
    <defs>
      <marker id="arrow-default" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0 L0,6 L6,3 z" fill="#2D4070" />
      </marker>
      <marker id="arrow-prereq" markerWidth="7" markerHeight="7" refX="5.5" refY="3.5" orient="auto" markerUnits="strokeWidth">
        <path d="M0,0.5 L0,6.5 L6.5,3.5 z" fill="#38BDF8" />
      </marker>
    </defs>
  `;

  const edges = [];
  nodes.forEach(node => {
    (node.deps || []).forEach(depId => {
      const from = nodeMap[depId];
      if (!from) return;
      const fromStatus = getNodeStatus(depId);
      const toStatus   = getNodeStatus(node.id);

      const x1 = from.x;
      const y1 = from.y;
      const x2 = node.x;
      const y2 = node.y;

      const midY = (y1 + y2) / 2;
      const d = `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;

      let cls = 'edge-path';
      if (fromStatus === 'completed' && toStatus === 'completed') cls += ' completed';
      else if (fromStatus === 'completed' || toStatus === 'active') cls += ' active';

      edges.push(`<path class="${cls}" d="${d}" data-from="${depId}" data-to="${node.id}" id="edge-${depId}-${node.id}" />`);
    });
  });

  svgEl.innerHTML = defs + edges.join('');
}

// ── Path Highlighting & Bar Updating ───────────

function updatePathBar(targetNode, prereqNodeIds, canvasContainer, nodeMap, isLocked, onClearCallback, onSelectPrereq) {
  let pathBar = canvasContainer.querySelector('#roadmap-path-bar');
  const hintPill = canvasContainer.querySelector('#roadmap-hint-pill');
  if (hintPill) hintPill.style.opacity = '0.25';

  if (!pathBar) {
    pathBar = document.createElement('div');
    pathBar.id = 'roadmap-path-bar';
    pathBar.className = 'roadmap-path-bar';
    canvasContainer.appendChild(pathBar);
  }

  pathBar.style.display = 'flex';

  const sortedPrereqs = Array.from(prereqNodeIds)
    .map(id => nodeMap[id])
    .filter(Boolean)
    .sort((a, b) => a.y - b.y);

  const targetTitle = (NODE_DESCRIPTIONS[targetNode.id]?.title || targetNode.label.replace('\n', ' '));

  let itemsHtml = '';
  if (sortedPrereqs.length === 0) {
    itemsHtml = `<span style="color:#94A3B8;font-size:12px;font-style:italic;">(Kỹ năng nền tảng khởi đầu – Không có điều kiện tiên quyết)</span>`;
  } else {
    itemsHtml = sortedPrereqs.map((pn, idx) => {
      const pStatus = getNodeStatus(pn.id);
      const isDone = pStatus === 'completed';
      const label = pn.label.replace('\n', ' ');
      return `
        <span class="path-bar-item${isDone ? ' completed' : ''}" data-node-id="${pn.id}" title="Bấm để xem nhánh của ${label}" style="cursor:pointer;">
          ${isDone ? '✓ ' : ''}${label}
        </span>
        ${idx < sortedPrereqs.length - 1 ? '<span class="path-bar-sep">→</span>' : ''}
      `;
    }).join('');
  }

  pathBar.innerHTML = `
    <span class="path-bar-label">Lộ trình tiên quyết:</span>
    <div class="path-bar-items">${itemsHtml}</div>
    <span class="path-bar-sep" style="margin:0 4px;">&rarr;</span>
    <span class="path-bar-target">${ICONS.target(14)} ${targetTitle}</span>
    ${isLocked ? `<button class="path-bar-close" id="rm-clear-btn" title="Bỏ chọn (Esc)">✕</button>` : ''}
  `;

  if (isLocked) {
    pathBar.querySelector('#rm-clear-btn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      onClearCallback && onClearCallback();
    });
  }

  // Allow clicking on any prerequisite pill in the breadcrumb
  pathBar.querySelectorAll('.path-bar-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const nId = item.dataset.nodeId;
      if (nId && onSelectPrereq) {
        onSelectPrereq(nId);
      }
    });
  });
}

function highlightPath(targetNodeId, canvasContainer, nodeMap, isLocked = false, onClearCallback, onSelectPrereq) {
  const targetNode = nodeMap[targetNodeId];
  if (!targetNode) return;

  const { prereqNodeIds, prereqEdges } = getPrerequisites(targetNodeId, nodeMap);
  const { unlockedNodeIds, unlockedEdges } = getUnlockedNodes(targetNodeId, ROADMAP_NODES);

  // Update edges
  const allEdges = canvasContainer.querySelectorAll('.edge-path');
  allEdges.forEach(edge => {
    const from = edge.getAttribute('data-from');
    const to = edge.getAttribute('data-to');
    const edgeKey = `${from}->${to}`;

    edge.classList.remove('highlight-prereq', 'highlight-unlocked', 'dimmed');

    if (prereqEdges.has(edgeKey)) {
      edge.classList.add('highlight-prereq');
      edge.setAttribute('marker-end', 'url(#arrow-prereq)');
    } else if (unlockedEdges.has(edgeKey)) {
      edge.classList.add('highlight-unlocked');
      edge.removeAttribute('marker-end');
    } else {
      edge.classList.add('dimmed');
      edge.removeAttribute('marker-end');
    }
  });

  // Update nodes
  const allNodeEls = canvasContainer.querySelectorAll('.rnode');
  allNodeEls.forEach(el => {
    const nid = el.dataset.nodeId;
    el.classList.remove('selected-node', 'prereq-node', 'unlocked-node', 'dimmed-node');

    if (nid === targetNodeId) {
      el.classList.add('selected-node');
    } else if (prereqNodeIds.has(nid)) {
      el.classList.add('prereq-node');
    } else if (unlockedNodeIds.has(nid)) {
      el.classList.add('unlocked-node');
    } else {
      el.classList.add('dimmed-node');
    }
  });

  // Update or show Path Bar
  updatePathBar(targetNode, prereqNodeIds, canvasContainer, nodeMap, isLocked, onClearCallback, onSelectPrereq);
}

function clearHighlight(canvasContainer) {
  const allEdges = canvasContainer.querySelectorAll('.edge-path');
  allEdges.forEach(edge => {
    edge.classList.remove('highlight-prereq', 'highlight-unlocked', 'dimmed');
    edge.removeAttribute('marker-end');
  });

  const allNodeEls = canvasContainer.querySelectorAll('.rnode');
  allNodeEls.forEach(el => {
    el.classList.remove('selected-node', 'prereq-node', 'unlocked-node', 'dimmed-node');
  });

  const pathBar = canvasContainer.querySelector('#roadmap-path-bar');
  if (pathBar) pathBar.style.display = 'none';

  const hintPill = canvasContainer.querySelector('#roadmap-hint-pill');
  if (hintPill) hintPill.style.opacity = '1';
}

// ── Node Detail Popup ──────────────────────────
function openPopup(canvasContainer, node, clickX, clickY, nodeMap, onSelectPrereq) {
  const existing = canvasContainer.querySelector('.node-detail-popup');
  if (existing) existing.remove();

  const desc = NODE_DESCRIPTIONS[node.id] || { title: node.label.replace('\n', ' '), desc: '' };
  const relatedExercises = EXERCISES.filter(ex => ex.skill === node.skill);
  const status = getNodeStatus(node.id);
  const nodeSvg = NODE_ICONS[node.id] || ICONS.code(20);

  const { prereqNodeIds } = getPrerequisites(node.id, nodeMap);
  const prereqNodes = Array.from(prereqNodeIds)
    .map(id => nodeMap[id])
    .filter(Boolean)
    .sort((a, b) => a.y - b.y);

  const completedPrereqs = prereqNodes.filter(p => getNodeStatus(p.id) === 'completed');
  const allPrereqsMet = prereqNodes.length === 0 || completedPrereqs.length === prereqNodes.length;

  const exerciseItems = relatedExercises.length
    ? relatedExercises.map(ex => {
        const exState = getState('exercises')[ex.id];
        const solved  = exState?.solved;
        return `<div class="popup-exercise-item" style="display:flex;align-items:center;gap:6px;">
          ${solved ? `<span style="color:var(--color-success);display:flex;">${ICONS.checkCircle(14)}</span>` : `<span style="color:var(--color-primary);display:flex;">${ICONS.code(14)}</span>`}
          <span>${ex.title}</span>
        </div>`;
      }).join('')
    : `<div class="popup-exercise-item" style="color:rgba(0,0,0,0.4)">Chưa có bài tập</div>`;

  const canPractice = node.skill && relatedExercises.length > 0;

  const popup = document.createElement('div');
  popup.className = 'node-detail-popup';
  popup.style.cssText = `left:${clickX + 16}px; top:${Math.max(8, clickY - 60)}px;`;

  popup.innerHTML = `
    <button class="popup-close" title="Đóng">✕</button>
    <div class="popup-title" style="display:flex;align-items:center;gap:8px;">
      <span style="color:var(--color-primary);display:flex;">${nodeSvg}</span>
      <span>${desc.title}</span>
    </div>
    <div class="popup-desc">${desc.desc}</div>

    <!-- Prerequisite status block -->
    ${prereqNodes.length ? `
      <div style="margin-bottom:12px;padding:9px 11px;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <span style="font-size:11px;font-weight:700;color:var(--color-navy);text-transform:uppercase;letter-spacing:0.04em;display:inline-flex;align-items:center;gap:4px;">
            ${ICONS.zap(12)} Kỹ năng tiên quyết
          </span>
          <span style="font-size:11px;font-weight:600;color:${allPrereqsMet ? 'var(--color-success)' : '#D97706'};">
            ${completedPrereqs.length}/${prereqNodes.length} hoàn thành
          </span>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:4px;">
          ${prereqNodes.map(p => {
            const isDone = getNodeStatus(p.id) === 'completed';
            return `<span class="popup-prereq-tag" data-node-id="${p.id}" style="cursor:pointer;font-size:11px;padding:2px 7px;border-radius:4px;background:${isDone ? 'rgba(18,183,106,0.12)' : 'rgba(0,0,0,0.05)'};color:${isDone ? '#059669' : '#64748B'};border:1px solid ${isDone ? 'rgba(52,211,153,0.3)' : 'rgba(0,0,0,0.08)'};display:inline-flex;align-items:center;gap:3px;font-weight:500;">
              ${isDone ? '✓' : '○'} ${p.label.replace('\n', ' ')}
            </span>`;
          }).join('')}
        </div>
      </div>
    ` : ''}

    ${relatedExercises.length ? `<div style="font-size:11px;font-weight:600;color:#888;margin-bottom:6px;text-transform:uppercase;letter-spacing:.06em">Bài tập liên quan</div>` : ''}
    <div class="popup-exercises">${exerciseItems}</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      ${status !== 'active' && status !== 'completed'
        ? `<button class="btn btn-secondary" style="flex:1;font-size:12px;padding:7px 8px;" data-action="start-node">Bắt đầu học</button>`
        : ''}
      ${status === 'active'
        ? `<button class="btn btn-secondary" style="flex:1;font-size:12px;padding:7px 8px;background:#1a2744;color:#888;" data-action="mark-complete">Đánh dấu hoàn thành</button>`
        : ''}
      ${canPractice
        ? `<button class="btn btn-primary" style="flex:1;font-size:12px;padding:7px 8px;" data-action="practice">Bắt đầu luyện tập</button>`
        : ''}
    </div>
  `;

  canvasContainer.appendChild(popup);

  const rect = popup.getBoundingClientRect();
  const containerRect = canvasContainer.getBoundingClientRect();
  if (rect.right > containerRect.right - 8) {
    popup.style.left = `${clickX - 16 - 280}px`;
  }
  if (rect.bottom > containerRect.bottom - 8) {
    popup.style.top = `${Math.max(8, containerRect.height - rect.height - 8)}px`;
  }

  popup.querySelector('.popup-close')?.addEventListener('click', () => popup.remove());

  // Click on a prerequisite tag inside popup to trace that skill
  popup.querySelectorAll('.popup-prereq-tag').forEach(tag => {
    tag.addEventListener('click', (e) => {
      e.stopPropagation();
      const nId = tag.dataset.nodeId;
      if (nId && onSelectPrereq) {
        onSelectPrereq(nId);
      }
    });
  });

  popup.querySelector('[data-action="start-node"]')?.addEventListener('click', () => {
    markNodeActive(node.id);
    addActivity(`Bắt đầu học: ${desc.title}`);
    showToast(`Đã bắt đầu học ${desc.title}`, 'success');
    popup.remove();
  });

  popup.querySelector('[data-action="mark-complete"]')?.addEventListener('click', () => {
    markNodeComplete(node.id);
    addXP(50, `Hoàn thành node ${desc.title}`);
    showToast(`Hoàn thành ${desc.title}! +50 XP`, 'success');
    popup.remove();
  });

  popup.querySelector('[data-action="practice"]')?.addEventListener?.('click', () => {
    popup.remove();
    window._daconnect_navigate && window._daconnect_navigate('practice');
  });
}

// ── Right Stats Panel ──────────────────────────
function renderPanel() {
  const user      = getState('user');
  const completed = getCompletedCount();
  const pct       = Math.round((completed / TOTAL_SKILLS) * 100);
  const breakdown = getExerciseBreakdown();
  const streak    = user.streak || 7;

  return `
    <div class="roadmap-panel">
      <!-- Progress -->
      <div class="panel-section">
        <div class="panel-section-title">Tiến độ tổng quan</div>
        <div class="panel-progress-label">${pct}%</div>
        <div class="panel-progress-sub">${completed}/${TOTAL_SKILLS} kỹ năng hoàn thành</div>
        <div style="margin-top:10px;height:6px;background:rgba(255,255,255,0.08);border-radius:99px;overflow:hidden;">
          <div style="height:100%;width:${pct}%;background:var(--color-primary);border-radius:99px;transition:width .5s ease;"></div>
        </div>
      </div>

      <!-- Exercise Breakdown -->
      <div class="panel-section">
        <div class="panel-section-title">Bài tập đã giải</div>
        <div class="panel-stat">
          <span class="panel-stat-label" style="display:flex;align-items:center;gap:6px;">
            ${ICONS.checkCircle(13)} Dễ (Easy)
          </span>
          <span class="panel-stat-value green">${breakdown.Easy || 0}</span>
        </div>
        <div class="panel-stat">
          <span class="panel-stat-label" style="display:flex;align-items:center;gap:6px;">
            ${ICONS.clock(13)} Trung bình
          </span>
          <span class="panel-stat-value yellow">${breakdown.Medium || 0}</span>
        </div>
        <div class="panel-stat">
          <span class="panel-stat-label" style="display:flex;align-items:center;gap:6px;">
            ${ICONS.shield(13)} Khó (Hard)
          </span>
          <span class="panel-stat-value red">${breakdown.Hard || 0}</span>
        </div>
      </div>

      <!-- Streak Calendar -->
      <div class="panel-section">
        <div class="panel-section-title" style="display:flex;align-items:center;gap:6px;">
          ${ICONS.calendar(13)} Chuỗi học tập (28 ngày)
        </div>
        <div class="streak-calendar">${buildStreakCalendar(streak)}</div>
      </div>

      <!-- Stats -->
      <div class="panel-section">
        <div class="panel-section-title">Thống kê</div>
        <div class="panel-stat">
          <span class="panel-stat-label" style="display:flex;align-items:center;gap:6px;">
            ${ICONS.star(13)} Tổng XP
          </span>
          <span class="panel-stat-value">${(user.xp || 0).toLocaleString()}</span>
        </div>
        <div class="panel-stat">
          <span class="panel-stat-label" style="display:flex;align-items:center;gap:6px;">
            ${ICONS.flame(13)} Chuỗi hiện tại
          </span>
          <span class="panel-stat-value">${streak} ngày</span>
        </div>
        <div class="panel-stat">
          <span class="panel-stat-label" style="display:flex;align-items:center;gap:6px;">
            ${ICONS.award(13)} Hạng
          </span>
          <span class="panel-stat-value">${user.rank || 'Bronze'}</span>
        </div>
      </div>
    </div>
  `;
}

// ── Main Render ────────────────────────────────
export function renderRoadmap(container, navigate) {
  window._daconnect_navigate = navigate;

  const nodeMap = {};
  ROADMAP_NODES.forEach(n => { nodeMap[n.id] = n; });

  let lockedNodeId = null;

  container.innerHTML = `
    <div class="roadmap-page">
      <div class="roadmap-toolbar">
        <div class="roadmap-toolbar-title" style="display:flex;align-items:center;gap:8px;">
          ${ICONS.roadmap(20)} Data Analyst Roadmap
        </div>
        <div class="roadmap-controls">
          <button class="roadmap-control-btn" id="rm-zoom-in" title="Phóng to">${ICONS.zoomIn(16)}</button>
          <button class="roadmap-control-btn" id="rm-zoom-out" title="Thu nhỏ">${ICONS.zoomOut(16)}</button>
          <button class="roadmap-control-btn" id="rm-zoom-fit" title="Vừa màn hình">${ICONS.maximize(16)}</button>
        </div>
      </div>
      <div class="roadmap-body">
        <div class="roadmap-canvas-container" id="rm-canvas-container">
          <div class="roadmap-canvas" id="rm-canvas">
            <svg class="roadmap-svg" id="rm-svg"
                 width="${CANVAS_W}" height="${CANVAS_H}"
                 viewBox="0 0 ${CANVAS_W} ${CANVAS_H}"></svg>
            <!-- nodes injected here -->
          </div>
          <!-- NeetCode Hint Pill -->
          <div class="roadmap-hint-pill" id="roadmap-hint-pill">
            <span style="display:inline-flex;align-items:center;gap:6px;">${ICONS.lightbulb(14)} Rê chuột hoặc chạm vào kỹ năng bất kỳ để xem đường dẫn điều kiện tiên quyết (Prerequisite Path)</span>
          </div>
        </div>
        ${renderPanel()}
      </div>
    </div>
  `;

  const canvasContainer = container.querySelector('#rm-canvas-container');
  const canvas          = container.querySelector('#rm-canvas');
  const svgEl           = container.querySelector('#rm-svg');

  let scale = 0.9, panX = 40, panY = 20;
  let isDragging = false, lastX, lastY;
  let hasDragged = false;

  function applyTransform() {
    canvas.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
  }
  applyTransform();

  canvasContainer.addEventListener('mousedown', e => {
    if (e.target.closest('.node-detail-popup') || e.target.closest('.rnode') || e.target.closest('.roadmap-path-bar')) return;
    isDragging = true;
    hasDragged = false;
    lastX = e.clientX;
    lastY = e.clientY;
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) hasDragged = true;
    panX += dx;
    panY += dy;
    lastX = e.clientX;
    lastY = e.clientY;
    applyTransform();
  });

  document.addEventListener('mouseup', () => { isDragging = false; });

  canvasContainer.addEventListener('wheel', e => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.08 : 0.08;
    const newScale = Math.max(0.3, Math.min(2.0, scale + delta));

    const rect = canvasContainer.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    panX = mx - (mx - panX) * (newScale / scale);
    panY = my - (my - panY) * (newScale / scale);
    scale = newScale;
    applyTransform();
  }, { passive: false });

  container.querySelector('#rm-zoom-in').addEventListener('click', () => {
    scale = Math.min(2.0, scale + 0.12);
    applyTransform();
  });
  container.querySelector('#rm-zoom-out').addEventListener('click', () => {
    scale = Math.max(0.3, scale - 0.12);
    applyTransform();
  });
  container.querySelector('#rm-zoom-fit').addEventListener('click', () => {
    const cw = canvasContainer.clientWidth;
    const ch = canvasContainer.clientHeight;
    scale = Math.min(cw / CANVAS_W, ch / CANVAS_H) * 0.95;
    panX  = (cw - CANVAS_W * scale) / 2;
    panY  = (ch - CANVAS_H * scale) / 2;
    applyTransform();
  });

  // Draw initial SVG edges with arrows
  drawEdges(svgEl, ROADMAP_NODES);

  function resetSelection() {
    lockedNodeId = null;
    clearHighlight(canvasContainer);
    canvasContainer.querySelectorAll('.node-detail-popup').forEach(p => p.remove());
  }

  function selectNode(targetId, clickX = null, clickY = null) {
    const targetNode = nodeMap[targetId];
    if (!targetNode) return;
    lockedNodeId = targetId;

    highlightPath(targetId, canvasContainer, nodeMap, true, resetSelection, (prereqId) => {
      selectNode(prereqId);
    });

    // Calculate node position in container viewport if click coordinates not provided
    if (clickX === null || clickY === null) {
      clickX = panX + targetNode.x * scale;
      clickY = panY + targetNode.y * scale;
    }

    openPopup(canvasContainer, targetNode, clickX, clickY, nodeMap, (prereqId) => {
      selectNode(prereqId);
    });
  }

  ROADMAP_NODES.forEach(node => {
    const status = getNodeStatus(node.id);
    const div = document.createElement('div');
    div.className = `rnode${status !== 'todo' ? ' ' + status : ''}`;
    div.style.cssText = `left:${node.x}px; top:${node.y}px;`;
    div.dataset.nodeId = node.id;

    const statusIcon = status === 'completed' ? ICONS.check(10) : status === 'active' ? '◎' : '○';
    const labelHtml  = node.label.replace('\n', '<br>');
    const nodeSvg    = NODE_ICONS[node.id] || ICONS.code(20);

    div.innerHTML = `
      <div class="rnode-inner">
        <div class="rnode-status">${statusIcon}</div>
        <div class="rnode-icon" style="display:flex;justify-content:center;color:${status === 'completed' ? '#fff' : 'var(--color-primary-light)'}">
          ${nodeSvg}
        </div>
        <div class="rnode-label">${labelHtml}</div>
      </div>
    `;

    // Live hover preview (NeetCode effect)
    div.addEventListener('mouseenter', () => {
      if (!lockedNodeId) {
        highlightPath(node.id, canvasContainer, nodeMap, false, resetSelection, (prereqId) => {
          selectNode(prereqId);
        });
      }
    });

    div.addEventListener('mouseleave', () => {
      if (!lockedNodeId) {
        clearHighlight(canvasContainer);
      }
    });

    // Lock path & open details on click
    div.addEventListener('click', e => {
      if (hasDragged) return;
      e.stopPropagation();
      const containerRect = canvasContainer.getBoundingClientRect();
      const clickX = e.clientX - containerRect.left;
      const clickY = e.clientY - containerRect.top;
      selectNode(node.id, clickX, clickY);
    });

    canvas.appendChild(div);
  });

  // Click on empty canvas deselects
  canvasContainer.addEventListener('click', e => {
    if (!e.target.closest('.rnode') && !e.target.closest('.node-detail-popup') && !e.target.closest('.roadmap-path-bar')) {
      resetSelection();
    }
  });

  // ESC key clears selection
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      resetSelection();
    }
  });
}
