// ============================================
// DaConnect – Roadmap Module (NeetCode Style Interactive)
// ============================================

import { ROADMAP_NODES, NODE_DESCRIPTIONS, EXERCISES, NODE_PRACTICE_PROBLEMS, NODE_RECOMMENDED_COURSES } from '../data/mockData.js';
import { getState, updateState, getNodeStatus, markNodeActive, markNodeComplete, addXP, addActivity } from '../main.js';
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
  const exercisesState = getState('exercises') || {};
  const breakdown = { Easy: 0, Medium: 0, Hard: 0 };
  const allProblems = [...EXERCISES];
  Object.values(NODE_PRACTICE_PROBLEMS || {}).forEach(list => {
    allProblems.push(...list);
  });
  const counted = new Set();
  allProblems.forEach(ex => {
    if (ex && ex.id && !counted.has(ex.id) && exercisesState[ex.id]?.solved) {
      counted.add(ex.id);
      const diff = ex.difficulty || 'Easy';
      breakdown[diff] = (breakdown[diff] || 0) + 1;
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
    itemsHtml = `<span style="color:#94A3B8;font-size:12px;font-style:italic;">(Kỹ năng khởi đầu – Không có điều kiện tiên quyết)</span>`;
  } else {
    // Khi cây lộ trình quá sâu (hơn 3 kỹ năng tiên quyết phía trước),
    // chỉ lấy 2-3 kỹ năng gần nhất ngay trước nó để breadcrumb gọn gàng, không bị tràn màn hình.
    let displayPrereqs = sortedPrereqs;
    let hasHiddenEarlier = false;
    let hiddenCount = 0;

    if (sortedPrereqs.length > 3) {
      // Ưu tiên các node phụ thuộc trực tiếp (direct dependencies)
      const directDeps = (targetNode.deps || []).map(id => nodeMap[id]).filter(Boolean);
      if (directDeps.length >= 1 && directDeps.length <= 3) {
        displayPrereqs = directDeps.sort((a, b) => a.x - b.x);
      } else {
        displayPrereqs = sortedPrereqs.slice(-2);
      }
      hasHiddenEarlier = true;
      hiddenCount = sortedPrereqs.length - displayPrereqs.length;
    }

    const pillsHtml = displayPrereqs.map((pn, idx) => {
      const pStatus = getNodeStatus(pn.id);
      const isDone = pStatus === 'completed';
      const label = pn.label.replace('\n', ' ');
      return `
        <span class="path-bar-item${isDone ? ' completed' : ''}" data-node-id="${pn.id}" title="Bấm để xem nhánh của ${label}" style="cursor:pointer;">
          ${isDone ? '✓ ' : ''}${label}
        </span>
        ${idx < displayPrereqs.length - 1 ? '<span class="path-bar-sep">→</span>' : ''}
      `;
    }).join('');

    if (hasHiddenEarlier) {
      itemsHtml = `
        <span class="path-bar-item path-bar-ellipsis" title="Bao gồm ${hiddenCount} kỹ năng nền tảng phía trước (Python, SQL...)">...</span>
        <span class="path-bar-sep">→</span>
        ${pillsHtml}
      `;
    } else {
      itemsHtml = pillsHtml;
    }
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
  pathBar.querySelectorAll('.path-bar-item[data-node-id]').forEach(item => {
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
function openPopup(canvasContainer, node, clickX, clickY, nodeMap, onSelectPrereq, openSkillDrawer, navigate) {
  const existing = canvasContainer.querySelector('.node-detail-popup');
  if (existing) existing.remove();

  const desc = NODE_DESCRIPTIONS[node.id] || { title: node.label.replace('\n', ' '), desc: '' };
  // Exactly 3 exercises corresponding to this node
  let relatedExercises = EXERCISES.filter(ex => ex.nodeId === node.id);
  if (!relatedExercises.length && NODE_PRACTICE_PROBLEMS[node.id]) {
    relatedExercises = NODE_PRACTICE_PROBLEMS[node.id];
  }
  const status = getNodeStatus(node.id);
  const nodeSvg = NODE_ICONS[node.id] || ICONS.code(20);

  const { prereqNodeIds } = getPrerequisites(node.id, nodeMap);
  const prereqNodes = Array.from(prereqNodeIds)
    .map(id => nodeMap[id])
    .filter(Boolean)
    .sort((a, b) => a.y - b.y);

  const completedPrereqs = prereqNodes.filter(p => getNodeStatus(p.id) === 'completed');
  const allPrereqsMet = prereqNodes.length === 0 || completedPrereqs.length === prereqNodes.length;

  const userExercises = getState('exercises') || {};
  const exerciseItems = relatedExercises.length
    ? relatedExercises.map(ex => {
        const exState = userExercises[ex.id];
        const solved  = Boolean(exState?.solved);
        const diffColor = ex.difficulty === 'Easy' ? '#10B981' : ex.difficulty === 'Medium' ? '#F59E0B' : '#EF4444';
        const diffText = ex.difficulty === 'Easy' ? 'Dễ' : ex.difficulty === 'Medium' ? 'Trung bình' : 'Khó';
        return `
          <div class="popup-exercise-item ${solved ? 'solved' : ''}" data-action="go-exercise" data-prob-id="${ex.id}" title="Luyện tập trực tiếp bài: ${ex.title}">
            <span style="color:${solved ? '#10B981' : 'var(--color-primary)'};display:flex;flex-shrink:0;">
              ${solved ? ICONS.checkCircle(15) : ICONS.code(15)}
            </span>
            <span class="popup-ex-title" style="flex:1;font-size:12px;font-weight:${solved ? '600' : '500'};color:${solved ? '#059669' : 'var(--color-navy)'};line-height:1.35;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
              ${ex.title}
            </span>
            <span style="font-size:10px;font-weight:600;padding:1px 5px;border-radius:4px;color:${diffColor};background:${diffColor}18;flex-shrink:0;">
              ${diffText}
            </span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.4;flex-shrink:0;color:var(--color-navy);">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </div>
        `;
      }).join('')
    : `<div class="popup-exercise-item" style="color:rgba(0,0,0,0.4)">Chưa có bài tập</div>`;

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

    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
      <span style="font-size:11px;font-weight:700;color:#64748B;text-transform:uppercase;letter-spacing:.06em">
        Bài tập liên quan (${relatedExercises.length} bài)
      </span>
      <span style="font-size:10px;color:#94A3B8;">Bấm bài để luyện tập ➔</span>
    </div>
    <div class="popup-exercises" style="display:flex;flex-direction:column;gap:6px;margin-bottom:14px;">${exerciseItems}</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      ${status !== 'active' && status !== 'completed'
        ? `<button class="btn btn-secondary" style="flex:1;font-size:12px;padding:8px 10px;" data-action="start-node">Bắt đầu học</button>
           <button class="btn btn-primary" style="flex:1;font-size:12px;padding:8px 10px;" data-action="open-drawer">Bắt đầu luyện tập</button>`
        : ''}
      ${status === 'active'
        ? `<button class="btn btn-primary" style="flex:1;font-size:12px;padding:8px 10px;" data-action="open-drawer">Tiếp tục học & Bài tập &rarr;</button>`
        : ''}
      ${status === 'completed'
        ? `<button class="btn btn-secondary" style="flex:1;font-size:12px;padding:8px 10px;" data-action="open-drawer">Xem lại bài tập & Khóa học</button>`
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

  // Direct click on any of the 3 exercises in popup -> navigate directly to that exercise in Practice Lab
  popup.querySelectorAll('[data-action="go-exercise"]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const probId = item.dataset.probId;
      window._selectedExerciseId = probId;
      popup.remove();
      const navFn = navigate || window._daconnect_navigate;
      if (navFn) {
        navFn('practice?ex=' + probId);
      }
    });
  });

  popup.querySelector('[data-action="start-node"]')?.addEventListener('click', () => {
    markNodeActive(node.id);
    addActivity(`Bắt đầu học: ${desc.title}`);
    showToast(`Đã bắt đầu học ${desc.title}`, 'success');
    popup.remove();
    // Update node visual state to active
    const nodeEl = canvasContainer.querySelector(`.rnode[data-node-id="${node.id}"]`);
    if (nodeEl && !nodeEl.classList.contains('completed')) {
      nodeEl.classList.add('active');
    }
    openSkillDrawer && openSkillDrawer(node.id);
  });

  popup.querySelectorAll('[data-action="open-drawer"]').forEach(btn => {
    btn.addEventListener('click', () => {
      popup.remove();
      openSkillDrawer && openSkillDrawer(node.id);
    });
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
        <div style="display:flex;align-items:center;gap:14px;font-size:12px;color:var(--color-gray-500);">
          <span style="display:inline-flex;align-items:center;gap:5px;">
            <span style="width:8px;height:8px;border-radius:50%;background:#10B981;"></span> Đã hoàn thành
          </span>
          <span style="display:inline-flex;align-items:center;gap:5px;">
            <span style="width:8px;height:8px;border-radius:50%;background:#0EA5E9;"></span> Đang học
          </span>
          <span style="display:inline-flex;align-items:center;gap:5px;">
            <span style="width:8px;height:8px;border-radius:50%;background:#64748B;"></span> Chưa học
          </span>
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

          <!-- Floating Vertical Zoom Controls (Bottom Left - Image Spec) -->
          <div class="roadmap-zoom-toolbar" id="roadmap-zoom-toolbar">
            <button class="roadmap-zoom-btn" id="rm-zoom-in-float" title="Phóng to (Zoom In)">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
            <div class="roadmap-zoom-divider"></div>
            <button class="roadmap-zoom-btn" id="rm-zoom-out-float" title="Thu nhỏ (Zoom Out)">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
            <div class="roadmap-zoom-divider"></div>
            <button class="roadmap-zoom-btn" id="rm-zoom-fit-float" title="Căn giữa & Vừa màn hình (Fit View)">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg>
            </button>
          </div>

          <!-- NeetCode Hint Pill (Collapsible) -->
          <div class="roadmap-hint-pill" id="roadmap-hint-pill" title="Bấm để thu gọn hướng dẫn">
            <div class="roadmap-hint-btn">
              ${ICONS.lightbulb(15)}
            </div>
            <div class="roadmap-hint-content">
              <span>Rê chuột hoặc chạm vào kỹ năng bất kỳ để xem đường dẫn điều kiện tiên quyết (Prerequisite Path)</span>
            </div>
          </div>
        </div>
        <div id="rm-stats-panel-wrapper">${renderPanel()}</div>
      </div>
      <!-- NeetCode Style Skill Detail Drawer & Overlay -->
      <div class="roadmap-drawer-overlay" id="rm-drawer-overlay"></div>
      <div class="roadmap-side-drawer" id="rm-side-drawer"></div>
    </div>
  `;

  const canvasContainer = container.querySelector('#rm-canvas-container');
  const canvas          = container.querySelector('#rm-canvas');
  const svgEl           = container.querySelector('#rm-svg');
  const drawerOverlay   = container.querySelector('#rm-drawer-overlay');
  const sideDrawer      = container.querySelector('#rm-side-drawer');

  function updateStatsPanel() {
    const wrapper = container.querySelector('#rm-stats-panel-wrapper');
    if (wrapper) {
      wrapper.innerHTML = renderPanel();
    }
  }

  function closeSkillDrawer() {
    drawerOverlay?.classList.remove('open');
    sideDrawer?.classList.remove('open');
  }

  drawerOverlay?.addEventListener('click', closeSkillDrawer);

  function openSkillDrawer(nodeId) {
    const node = nodeMap[nodeId];
    if (!node) return;
    const desc = NODE_DESCRIPTIONS[nodeId] || { title: node.label.replace('\n', ' '), desc: '' };
    const courses = NODE_RECOMMENDED_COURSES[nodeId] || [];
    const problems = NODE_PRACTICE_PROBLEMS[nodeId] || [];
    const userExercises = getState('exercises') || {};

    const completedProblems = problems.filter(p => userExercises[p.id]?.solved);
    const completedCount = completedProblems.length;
    const totalCount = problems.length || 3;
    const pct = Math.round((completedCount / totalCount) * 100);
    const isMastered = completedCount >= totalCount && totalCount > 0;
    const isNodeCompleted = getNodeStatus(nodeId) === 'completed';

    const circumference = 113.1;
    const strokeDashoffset = circumference - (pct / 100) * circumference;
    const donutColor = pct === 100 ? '#10B981' : pct > 0 ? '#38BDF8' : '#334155';

    sideDrawer.innerHTML = `
      <!-- Header -->
      <div class="drawer-header">
        <button class="drawer-close-btn" id="rm-drawer-close" title="Đóng bảng chi tiết (ESC)">✕</button>
        <div class="drawer-title">${desc.title}</div>
        <div class="drawer-subtitle-progress">(${completedCount} / ${totalCount})</div>
        <div class="drawer-progress-donut">
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="3.5" />
            <circle cx="24" cy="24" r="18" fill="none" stroke="${donutColor}" stroke-width="3.5"
                    stroke-dasharray="${circumference}" stroke-dashoffset="${strokeDashoffset}"
                    stroke-linecap="round" style="transition: stroke-dashoffset 0.4s ease, stroke 0.3s ease;" />
          </svg>
        </div>
      </div>

      <!-- Scrollable Body -->
      <div class="drawer-scroll-body">
        <!-- Section 1: Prerequisites & Recommended Courses -->
        <div class="drawer-section">
          <div class="drawer-section-title">Khóa học & Điều kiện đề xuất (Prerequisites & Courses)</div>
          <div class="drawer-courses-grid">
            ${courses.map(c => {
              const isW3S = Boolean(c.url && c.url.includes('w3schools.com'));
              const isYT = Boolean(c.url && (c.url.includes('youtube.com') || c.url.includes('youtu.be')));
              
              let badgeHtml = '';
              let actionText = 'Khám phá';
              let linkClass = 'drawer-course-link-btn';

              if (isW3S) {
                badgeHtml = '<span class="drawer-badge drawer-w3s-badge">W3Schools</span>';
                actionText = 'Học trên W3Schools';
              } else if (isYT) {
                badgeHtml = `<span class="drawer-badge drawer-yt-badge">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  YouTube
                </span>`;
                actionText = 'Xem trên YouTube';
                linkClass = 'drawer-course-link-btn yt-link';
              } else {
                badgeHtml = '<span class="drawer-badge drawer-doc-badge">Bài viết</span>';
                actionText = 'Đọc bài viết';
              }

              return `
              <a href="${c.url || '#'}" target="_blank" rel="noopener noreferrer" class="drawer-course-card" data-course-id="${c.id}" title="${actionText}: ${c.title}">
                <div>
                  <div class="drawer-course-header-row">
                    <div class="drawer-course-title">${c.title}</div>
                    ${badgeHtml}
                  </div>
                  <div class="drawer-course-cat">${c.category}</div>
                </div>
                <div class="drawer-course-meta">
                  <span>⏱ ${c.duration}</span>
                  <span class="${linkClass}">
                    ${actionText}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/>
                      <line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                  </span>
                </div>
              </a>
            `;
            }).join('')}
          </div>
        </div>

        <!-- Section 2: NeetCode Practice Problems Table -->
        <div class="drawer-section">
          <div class="drawer-section-title">Bài tập thực hành (Practice Lab - ${completedCount}/${totalCount})</div>
          <div class="neetcode-table-container">
            <div class="neetcode-table-header">
              <div class="col-status">Trạng thái</div>
              <div class="col-star"></div>
              <div class="col-problem">Bài toán</div>
              <div class="col-diff">Độ khó</div>
              <div class="col-solution">Code</div>
            </div>
            ${problems.map(prob => {
              const isSolved = Boolean(userExercises[prob.id]?.solved);
              const diffText = prob.difficulty === 'Easy' ? 'Dễ' : prob.difficulty === 'Medium' ? 'Trung bình' : 'Khó';
              const diffClass = prob.difficulty === 'Easy' ? 'diff-easy' : prob.difficulty === 'Medium' ? 'diff-medium' : 'diff-hard';
              return `
                <div class="neetcode-table-row ${isSolved ? 'solved' : ''}" data-problem-id="${prob.id}">
                  <div class="col-status">
                    <button class="neetcode-checkbox ${isSolved ? 'checked' : ''}" data-action="toggle-solve" data-prob-id="${prob.id}" title="${isSolved ? 'Bấm để đánh dấu chưa hoàn thành' : 'Bấm để đánh dấu đã hoàn thành'}">
                      ${isSolved ? `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` : ''}
                    </button>
                  </div>
                  <div class="col-star" data-action="toggle-star" title="Lưu bài tập">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  </div>
                  <div class="col-problem" data-action="go-practice" data-prob-id="${prob.id}" title="Luyện tập trực tiếp tại Practice Lab">
                    <span>${prob.title}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="opacity:0.6;flex-shrink:0;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                  </div>
                  <div class="col-diff">
                    <span class="diff-badge ${diffClass}">${diffText}</span>
                  </div>
                  <div class="col-solution" data-action="go-practice" data-prob-id="${prob.id}" title="Xem giải pháp & Code">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- Footer Action -->
      <div class="drawer-footer">
        ${isNodeCompleted
          ? `
            <div class="drawer-completed-badge">
              ✓ Kỹ năng này đã hoàn thành & nhận +100 XP
            </div>
          `
          : `
            <div class="drawer-hint-lock ${isMastered ? 'ready' : ''}">
              ${isMastered
                ? `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><span>Bạn đã giải đủ 3/3 bài luyện tập! Sẵn sàng xác nhận kỹ năng.</span>`
                : `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg><span>Bạn cần hoàn thành đủ 3/3 bài luyện tập tại Practice Lab để xác nhận kỹ năng này (${completedCount}/3).</span>`}
            </div>
            <button class="drawer-btn-complete ${isMastered ? 'ready' : 'disabled'}" id="btn-master-node" ${isMastered ? '' : 'disabled'}>
              ${isMastered ? 'Xác nhận đã làm chủ kỹ năng (+100 XP)' : 'Chưa đủ điều kiện hoàn thành (Cần 3/3 bài)'}
            </button>
          `}
      </div>
    `;

    // Event Listeners for Drawer
    sideDrawer.querySelector('#rm-drawer-close')?.addEventListener('click', closeSkillDrawer);

    // Toggle solve status directly
    sideDrawer.querySelectorAll('[data-action="toggle-solve"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const probId = btn.dataset.probId;
        const currentExState = getState('exercises') || {};
        const isCurrentlySolved = Boolean(currentExState[probId]?.solved);
        const nextSolved = !isCurrentlySolved;

        currentExState[probId] = {
          ...currentExState[probId],
          solved: nextSolved,
          solvedAt: nextSolved ? new Date().toISOString() : null,
          score: nextSolved ? 100 : 0
        };
        updateState('exercises', currentExState);

        if (nextSolved) {
          addXP(25, `Giải bài tập ${probId}`);
          showToast(`Đã giải xong bài tập! +25 XP`, 'success');
        } else {
          showToast(`Đã hủy trạng thái bài tập`, 'info');
        }

        updateStatsPanel();
        openSkillDrawer(nodeId);
      });
    });

    // Star toggle
    sideDrawer.querySelectorAll('[data-action="toggle-star"]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        btn.classList.toggle('starred');
        const isStarred = btn.classList.contains('starred');
        showToast(isStarred ? 'Đã thêm vào danh sách yêu thích' : 'Đã bỏ yêu thích', 'info');
      });
    });

    // Course click - opens real external course site in new tab
    sideDrawer.querySelectorAll('.drawer-course-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const url = card.getAttribute('href');
        const title = card.querySelector('.drawer-course-title')?.textContent;
        if (url && url !== '#') {
          showToast(`Đang mở khóa học: ${title}`, 'info');
        }
      });
    });

    // Go practice
    sideDrawer.querySelectorAll('[data-action="go-practice"]').forEach(el => {
      el.addEventListener('click', () => {
        const probId = el.dataset.probId;
        window._selectedExerciseId = probId;
        closeSkillDrawer();
        const navFn = navigate || window._daconnect_navigate;
        if (navFn) {
          navFn('practice?ex=' + probId);
        }
      });
    });

    // Master node button
    const btnMaster = sideDrawer.querySelector('#btn-master-node');
    btnMaster?.addEventListener('click', () => {
      if (!isMastered) return;
      markNodeComplete(nodeId);
      addXP(100, `Làm chủ kỹ năng: ${desc.title}`);
      addActivity(`Đã hoàn thành kỹ năng: ${desc.title}`);
      showToast(`Chúc mừng! Bạn đã hoàn thành kỹ năng ${desc.title} (+100 XP)`, 'success');

      // Update node visual state in graph canvas
      const nodeEl = canvasContainer.querySelector(`.rnode[data-node-id="${nodeId}"]`);
      if (nodeEl) {
        nodeEl.className = 'rnode completed';
        const stEl = nodeEl.querySelector('.rnode-status');
        if (stEl) stEl.innerHTML = ICONS.check(10);
        const iconEl = nodeEl.querySelector('.rnode-icon');
        if (iconEl) iconEl.style.color = '#fff';
      }

      updateStatsPanel();
      openSkillDrawer(nodeId);
    });

    // Open drawer and overlay
    drawerOverlay?.classList.add('open');
    sideDrawer?.classList.add('open');
  }

  let scale = 0.85, panX = 0, panY = 0;
  let isDragging = false, lastX, lastY;
  let hasDragged = false;

  function getGraphBounds(nodes) {
    let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
    nodes.forEach(n => {
      minX = Math.min(minX, n.x - 70);
      maxX = Math.max(maxX, n.x + 70);
      minY = Math.min(minY, n.y - 40);
      maxY = Math.max(maxY, n.y + 40);
    });
    return {
      minX, maxX, minY, maxY,
      width: maxX - minX,
      height: maxY - minY,
      centerX: (minX + maxX) / 2,
      centerY: (minY + maxY) / 2
    };
  }

  function applyTransform(smooth = false) {
    canvas.style.transition = smooth ? 'transform 0.32s cubic-bezier(0.16, 1, 0.3, 1)' : 'none';
    canvas.style.transform = `translate(${panX}px, ${panY}px) scale(${scale})`;
  }

  function centerGraph(targetScale = null, smooth = false) {
    const cw = canvasContainer.clientWidth || 850;
    const ch = canvasContainer.clientHeight || 750;
    const bounds = getGraphBounds(ROADMAP_NODES);

    if (targetScale === null) {
      // Calculate fit scale so width and height comfortably fit with padding
      const padX = 90;
      const padY = 80;
      const fitScaleX = (cw - padX) / bounds.width;
      const fitScaleY = (ch - padY) / bounds.height;
      scale = Math.max(0.65, Math.min(0.92, Math.min(fitScaleX, fitScaleY)));
    } else {
      scale = targetScale;
    }

    // Horizontally center the graph bounds in the viewport
    panX = (cw / 2) - (bounds.centerX * scale);

    // Vertically center if it fits within the viewport, else align comfortably from top
    const graphRenderedHeight = bounds.height * scale;
    if (graphRenderedHeight <= ch - 60) {
      panY = (ch / 2) - (bounds.centerY * scale);
    } else {
      panY = Math.max(36, 40 - (bounds.minY * scale));
    }

    applyTransform(smooth);
  }

  canvasContainer.addEventListener('mousedown', e => {
    if (e.target.closest('.node-detail-popup') || e.target.closest('.rnode') || e.target.closest('.roadmap-path-bar') || e.target.closest('.roadmap-zoom-toolbar') || e.target.closest('.roadmap-hint-pill')) return;
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
    applyTransform(false);
  });

  document.addEventListener('mouseup', () => { isDragging = false; });

  canvasContainer.addEventListener('wheel', e => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.08 : 0.08;
    const newScale = Math.max(0.4, Math.min(2.0, scale + delta));

    const rect = canvasContainer.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    panX = mx - (mx - panX) * (newScale / scale);
    panY = my - (my - panY) * (newScale / scale);
    scale = newScale;
    applyTransform(false);
  }, { passive: false });

  // Floating zoom button handlers
  const btnZoomIn = container.querySelector('#rm-zoom-in-float');
  const btnZoomOut = container.querySelector('#rm-zoom-out-float');
  const btnZoomFit = container.querySelector('#rm-zoom-fit-float');

  btnZoomIn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const cw = canvasContainer.clientWidth || 800;
    const ch = canvasContainer.clientHeight || 600;
    const cx = cw / 2;
    const cy = ch / 2;
    const nextScale = Math.min(2.0, scale + 0.15);
    panX = cx - (cx - panX) * (nextScale / scale);
    panY = cy - (cy - panY) * (nextScale / scale);
    scale = nextScale;
    applyTransform(true);
  });

  btnZoomOut?.addEventListener('click', (e) => {
    e.stopPropagation();
    const cw = canvasContainer.clientWidth || 800;
    const ch = canvasContainer.clientHeight || 600;
    const cx = cw / 2;
    const cy = ch / 2;
    const nextScale = Math.max(0.4, scale - 0.15);
    panX = cx - (cx - panX) * (nextScale / scale);
    panY = cy - (cy - panY) * (nextScale / scale);
    scale = nextScale;
    applyTransform(true);
  });

  btnZoomFit?.addEventListener('click', (e) => {
    e.stopPropagation();
    centerGraph(null, true);
  });

  // Collapsible Hint Pill toggle
  let isHintExpanded = true;
  const hintPill = container.querySelector('#roadmap-hint-pill');

  function updateHintState() {
    if (!hintPill) return;
    if (isHintExpanded) {
      hintPill.classList.remove('collapsed');
      hintPill.title = 'Bấm để thu gọn hướng dẫn';
    } else {
      hintPill.classList.add('collapsed');
      hintPill.title = 'Bấm để xem hướng dẫn';
    }
  }

  hintPill?.addEventListener('click', (e) => {
    e.stopPropagation();
    isHintExpanded = !isHintExpanded;
    updateHintState();
  });

  // Auto center on initial render
  requestAnimationFrame(() => {
    centerGraph(null, false);
  });

  // Auto-center adjust on container resize before user drags
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => {
      if (!isDragging && !hasDragged) {
        centerGraph(null, false);
      }
    });
    ro.observe(canvasContainer);
  }

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
      clearBreadcrumbTimer();
      selectPrerequisiteNode(prereqId);
    }, (nodeId) => {
      openSkillDrawer(nodeId);
    }, navigate);
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
    if (!e.target.closest('.rnode') && !e.target.closest('.node-detail-popup') && !e.target.closest('.roadmap-path-bar') && !e.target.closest('.roadmap-zoom-toolbar') && !e.target.closest('.roadmap-hint-pill')) {
      resetSelection();
    }
  });

  // ESC key clears selection or closes drawer
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (sideDrawer?.classList.contains('open')) {
        closeSkillDrawer();
      } else {
        resetSelection();
      }
    }
  });
}
