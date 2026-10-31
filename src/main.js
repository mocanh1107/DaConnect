// ============================================
// DaConnect Main Entry Point
// ============================================

import { initRouter } from './router.js';
import { CURRENT_USER } from './data/mockData.js';

// ── Local Storage State Management ──────────────
const LS_KEY = 'daconnect_state';

const defaultState = {
  user: CURRENT_USER,
  skills: {
    filtering: false,
    missing_values: false,
    groupby: false,
    merge: false,
    statistics: false,
    outliers: false,
  },
  exercises: {},       // exerciseId -> { solved, attempts }
  roadmapNodes: {},    // nodeId -> 'todo' | 'active' | 'completed'
  challenges: {},      // challengeId -> { participated, score }
  projects: {},        // projectId -> { submitted, score }
  jobs: {},            // jobId -> { applied, challengeSubmitted, challengeScore }
  questions: {},       // questionId -> { userVoted }
  answers: {},         // answerId -> { userVoted }
  activities: [
    { text: 'Hoàn thành bài tập "Lọc dữ liệu với điều kiện phức hợp"', time: '2 giờ trước' },
    { text: 'Trả lời câu hỏi về Missing Values trong Q&A', time: '5 giờ trước' },
    { text: 'Tham gia Daily Challenge "Dữ liệu bán hàng bị nhiễu"', time: 'Hôm qua' },
    { text: 'Đọc bài phân tích "Hệ thống gợi ý phim của Netflix"', time: '2 ngày trước' },
  ],
};

function loadState() {
  try {
    const stored = localStorage.getItem(LS_KEY);
    if (!stored) return defaultState;
    const parsed = JSON.parse(stored);
    // Deep merge to add new fields
    return {
      ...defaultState,
      ...parsed,
      user: { ...defaultState.user, ...parsed.user },
      skills: { ...defaultState.skills, ...parsed.skills },
    };
  } catch {
    return defaultState;
  }
}

let appState = loadState();

export function getState(key) {
  return key ? appState[key] : appState;
}

export function setState(key, value) {
  appState[key] = value;
  saveState();
}

export function updateState(key, updater) {
  const current = appState[key];
  appState[key] = typeof updater === 'function' ? updater(current) : { ...current, ...updater };
  saveState();
}

export function saveState() {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(appState));
  } catch (e) {
    console.warn('Could not save state:', e);
  }
}

// ── XP / Reputation helpers ─────────────────────
export function addXP(amount, reason) {
  updateState('user', u => ({
    ...u,
    xp: (u.xp || 0) + amount,
  }));
  addActivity(`Nhận ${amount} XP – ${reason}`);
}

export function addActivity(text) {
  updateState('activities', arr => [
    { text, time: 'Vừa xong', icon: '⭐' },
    ...(arr || []).slice(0, 9),
  ]);
}

export function markSkill(skillId) {
  updateState('skills', s => ({ ...s, [skillId]: true }));
}

export function solveExercise(exerciseId, skillId) {
  updateState('exercises', ex => ({
    ...ex,
    [exerciseId]: { solved: true, solvedAt: new Date().toISOString() },
  }));
  if (skillId) markSkill(skillId);
  addActivity(`Hoàn thành bài tập #${exerciseId}`);
}

export function markNodeActive(nodeId) {
  updateState('roadmapNodes', nodes => {
    if (!nodes[nodeId]) return { ...nodes, [nodeId]: 'active' };
    return nodes;
  });
}

export function markNodeComplete(nodeId) {
  updateState('roadmapNodes', nodes => ({ ...nodes, [nodeId]: 'completed' }));
}

export function getNodeStatus(nodeId) {
  const nodes = getState('roadmapNodes');
  return nodes[nodeId] || 'todo';
}

// ── Init ─────────────────────────────────────────
function init() {
  initRouter();
}

init();

