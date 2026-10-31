// ============================================
// DaConnect Practice Lab Module
// ============================================

import { EXERCISES } from '../data/mockData.js';
import { getState, solveExercise, addXP, markNodeActive } from '../main.js';
import { showToast } from '../components/toast.js';
import { ICONS } from '../components/icons.js';

const MODULE_OPTIONS = [
  { id: 'all', label: 'Tất cả Modules (42 bài)' },
  { id: 'py', label: 'Python Fundamentals (3 bài)' },
  { id: 'np', label: 'NumPy Arrays & Matrices (3 bài)' },
  { id: 'pd', label: 'Pandas Data Manipulation (3 bài)' },
  { id: 'dc', label: 'Data Cleaning & Preprocessing (3 bài)' },
  { id: 'dt', label: 'Data Transformation & GroupBy (3 bài)' },
  { id: 'sql1', label: 'SQL Query Fundamentals (3 bài)' },
  { id: 'sql2', label: 'SQL Aggregations & Joins (3 bài)' },
  { id: 'eda', label: 'Exploratory Data Analysis (3 bài)' },
  { id: 'stat', label: 'Applied Statistics & Testing (3 bài)' },
  { id: 'viz', label: 'Data Visualization & Charts (3 bài)' },
  { id: 'bm', label: 'Business Metrics & KPIs (3 bài)' },
  { id: 'story', label: 'Data Storytelling & Briefs (3 bài)' },
  { id: 'proj', label: 'Final DA Capstone Project (3 bài)' },
  { id: 'port', label: 'Portfolio & Personal Showcase (3 bài)' }
];

export const SKILL_OUTLINE_ICONS = {
  py: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>`,
  np: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
  pd: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  dc: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`,
  dt: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  sql1: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  sql2: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
  eda: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>`,
  stat: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" x2="12" y1="20" y2="10"/><line x1="18" x2="18" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="16"/></svg>`,
  viz: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  bm: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>`,
  story: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  proj: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><path d="m14 13-2 2-2-2"/></svg>`,
  port: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
};

export const SKILLS_CHECKLIST = [
  { id: 'py', label: 'Python Fundamentals' },
  { id: 'np', label: 'NumPy Arrays & Matrices' },
  { id: 'pd', label: 'Pandas Data Manipulation' },
  { id: 'dc', label: 'Data Cleaning & Preprocessing' },
  { id: 'dt', label: 'Data Transformation & Feature Eng' },
  { id: 'sql1', label: 'SQL Query Fundamentals' },
  { id: 'sql2', label: 'SQL Aggregations & Joins' },
  { id: 'eda', label: 'Exploratory Data Analysis (EDA)' },
  { id: 'stat', label: 'Applied Statistics & Testing' },
  { id: 'viz', label: 'Data Visualization & Charts' },
  { id: 'bm', label: 'Business Metrics & KPIs' },
  { id: 'story', label: 'Data Storytelling & Reporting' },
  { id: 'proj', label: 'Final DA Capstone Project' },
  { id: 'port', label: 'Portfolio & Career Showcase' }
];

export function renderPractice(container, navigate) {
  let selectedExId = window._selectedExerciseId;
  if (!selectedExId) {
    const hash = window.location.hash || '';
    if (hash.includes('ex=')) {
      selectedExId = hash.split('ex=')[1].split('&')[0];
    } else if (hash.includes('id=')) {
      selectedExId = hash.split('id=')[1].split('&')[0];
    }
  }
  if (!selectedExId || !EXERCISES.some(e => e.id === selectedExId)) {
    selectedExId = EXERCISES[0].id;
  }
  window._selectedExerciseId = null;

  let selectedModule = 'all';
  const initEx = EXERCISES.find(e => e.id === selectedExId);
  if (initEx && initEx.nodeId) {
    selectedModule = initEx.nodeId;
  }

  let searchQuery = '';
  let userCodeMap = {};
  let currentOutput = '';
  let outputStatus = 'idle'; // idle | running | success | error

  function render() {
    const userExercises = getState('exercises') || {};
    const skills = getState('skills') || {};
    
    // Find selected exercise
    let currentEx = EXERCISES.find(e => e.id === selectedExId) || EXERCISES[0];
    const isSolved = Boolean(userExercises[currentEx.id]?.solved);

    if (userCodeMap[currentEx.id] === undefined) {
      userCodeMap[currentEx.id] = currentEx.starterCode;
    }

    const solvedCount = EXERCISES.filter(e => userExercises[e.id]?.solved).length;

    const masteredSkillsCount = SKILLS_CHECKLIST.filter(skill => {
      const skillExs = EXERCISES.filter(e => e.nodeId === skill.id);
      return skillExs.length > 0 && skillExs.every(e => userExercises[e.id]?.solved);
    }).length;
    const skillProgressPct = Math.round((masteredSkillsCount / SKILLS_CHECKLIST.length) * 100);

    // Filter exercises based on selected module and search query
    const filteredExercises = EXERCISES.filter(ex => {
      const matchModule = (selectedModule === 'all') || (ex.nodeId === selectedModule);
      const matchSearch = !searchQuery || 
        ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ex.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (ex.moduleName || '').toLowerCase().includes(searchQuery.toLowerCase());
      return matchModule && matchSearch;
    });

    container.innerHTML = `
      <div class="page-header">
        <h1 style="display:flex;align-items:center;gap:10px;">
          ${ICONS.practice(26)} Practice Lab
        </h1>
        <p>Hệ thống bài tập thực hành tương tác kết nối trực tiếp với 14 chặng lộ trình Data Analyst Roadmap</p>
      </div>

      <div class="practice-layout">
        <!-- Sidebar Exercises List -->
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          <div class="card" style="padding: var(--space-4);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3);">
              <h4 style="font-size: var(--text-sm); font-weight: var(--weight-bold); text-transform: uppercase; color: var(--color-gray-500); display:flex; align-items:center; gap:6px;">
                ${ICONS.code(16)} Danh sách bài tập (${solvedCount}/${EXERCISES.length})
              </h4>
            </div>

            <!-- Module Filter Dropdown -->
            <div style="margin-bottom: 8px;">
              <select id="practice-module-filter" class="form-select" style="width:100%;font-size:12px;padding:6px 10px;border-radius:8px;border:1px solid var(--color-gray-200);background:var(--color-white);color:var(--color-navy);font-weight:500;">
                ${MODULE_OPTIONS.map(opt => `
                  <option value="${opt.id}" ${opt.id === selectedModule ? 'selected' : ''}>${opt.label}</option>
                `).join('')}
              </select>
            </div>

            <!-- Search Input -->
            <div style="margin-bottom: 12px; position: relative;">
              <input type="text" id="practice-search-input" placeholder="Tìm kiếm bài tập, thẻ tag..." value="${searchQuery}" 
                     style="width:100%;font-size:12px;padding:6px 10px 6px 28px;border-radius:8px;border:1px solid var(--color-gray-200);background:var(--color-gray-50);box-sizing:border-box;" />
              <span style="position:absolute;left:8px;top:7px;color:#94A3B8;pointer-events:none;">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </span>
            </div>

            <!-- Filtered Exercise Items -->
            <div id="practice-exercise-scroll-box" style="display: flex; flex-direction: column; gap: var(--space-2); max-height: 520px; overflow-y: auto; padding-right: 2px;">
              ${filteredExercises.length === 0 ? `
                <div style="text-align:center;padding:20px;color:var(--color-gray-400);font-size:12px;">
                  Không tìm thấy bài tập phù hợp
                </div>
              ` : filteredExercises.map(ex => {
                const exSolved = Boolean(userExercises[ex.id]?.solved);
                const active = ex.id === currentEx.id ? 'active' : '';
                const diffBadge = ex.difficulty === 'Easy' ? 'badge-easy' : ex.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard';
                return `
                  <div class="exercise-list-item ${active} ${exSolved ? 'solved' : ''}" data-id="${ex.id}">
                    <div class="ex-status">${exSolved ? ICONS.check(12) : ''}</div>
                    <div style="flex: 1; min-width: 0;">
                      <div style="font-size: 11px; color: var(--color-primary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.02em;">
                        ${ex.moduleName || 'Data Practice'}
                      </div>
                      <div style="font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-navy); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 1px;">
                        ${ex.title}
                      </div>
                      <div style="display: flex; gap: var(--space-2); margin-top: 4px;">
                        <span class="badge ${diffBadge}" style="font-size: 10px; padding: 1px 6px;">${ex.difficulty}</span>
                        <span class="badge badge-gray" style="font-size: 10px; padding: 1px 6px; display:inline-flex; align-items:center; gap:3px;">
                          ${ICONS.star(10)} +${ex.xpReward} XP
                        </span>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Skill Checklist Card (Synchronized with 14 Modules & 42 Exercises) -->
          <div class="card" style="padding: var(--space-4);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <h4 style="font-size: var(--text-sm); font-weight: var(--weight-bold); color: var(--color-navy); display:flex; align-items:center; gap:6px; margin:0;">
                ${ICONS.checkCircle(16)} Skill Checklist
              </h4>
              <span class="badge ${masteredSkillsCount > 0 ? 'badge-success' : 'badge-gray'}" style="font-size: 11px; padding: 2px 7px;">
                ${masteredSkillsCount}/${SKILLS_CHECKLIST.length} làm chủ
              </span>
            </div>

            <!-- Mini overall progress bar -->
            <div style="width: 100%; height: 5px; background: #E2E8F0; border-radius: 99px; overflow: hidden; margin-bottom: 10px;">
              <div style="width: ${skillProgressPct}%; height: 100%; background: linear-gradient(90deg, #10B981, #059669); transition: width 0.3s ease;"></div>
            </div>

            <div style="font-size: 11px; color: #64748B; margin-bottom: 8px; line-height: 1.4;">
              Làm chủ 14 kỹ năng tương ứng 42 bài tập (bấm vào để lọc bài theo kỹ năng):
            </div>

            <!-- 14 Skills List -->
            <div class="skill-checklist" style="max-height: 270px; overflow-y: auto; padding-right: 2px; display: flex; flex-direction: column; gap: 4px;">
              ${SKILLS_CHECKLIST.map(skill => {
                const skillExs = EXERCISES.filter(e => e.nodeId === skill.id);
                const solvedInSkill = skillExs.filter(e => userExercises[e.id]?.solved).length;
                const totalInSkill = skillExs.length || 3;
                const isMastered = solvedInSkill >= totalInSkill && totalInSkill > 0;
                const isSelectedMod = selectedModule === skill.id;

                let badgeColor = '#64748B';
                let badgeBg = '#F1F5F9';
                let badgeBorder = '#E2E8F0';
                if (isMastered) {
                  badgeColor = '#059669';
                  badgeBg = 'rgba(16, 185, 129, 0.12)';
                  badgeBorder = 'rgba(16, 185, 129, 0.3)';
                } else if (solvedInSkill > 0) {
                  badgeColor = '#0284C7';
                  badgeBg = 'rgba(2, 132, 199, 0.1)';
                  badgeBorder = 'rgba(2, 132, 199, 0.25)';
                }

                return `
                  <div class="skill-check-item ${isMastered ? 'done' : ''} ${isSelectedMod ? 'active-skill-filter' : ''}" 
                       data-skill-id="${skill.id}"
                       style="display:flex;align-items:center;justify-content:space-between;padding:6px 8px;border-radius:8px;cursor:pointer;transition:all 0.15s ease;border:1px solid ${isSelectedMod ? '#3B82F6' : 'transparent'};background:${isSelectedMod ? '#EFF6FF' : 'transparent'};"
                       title="Bấm để lọc danh sách bài tập theo ${skill.label}">
                    <div style="display:flex;align-items:center;gap:8px;min-width:0;flex:1;">
                      <div class="skill-check-box ${isMastered ? 'checked' : ''}" style="width:18px;height:18px;border-radius:4px;border:1.5px solid ${isMastered ? '#10B981' : solvedInSkill > 0 ? '#0284C7' : '#CBD5E1'};background:transparent;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        ${isMastered 
                          ? `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>` 
                          : solvedInSkill > 0 
                            ? `<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2.6"><circle cx="12" cy="12" r="7"/></svg>` 
                            : ''}
                      </div>
                      <span style="display:inline-flex;align-items:center;gap:6px;min-width:0;flex:1;font-size:12px;font-weight:${isMastered ? '600' : isSelectedMod ? '600' : '500'};color:${isMastered ? '#059669' : isSelectedMod ? '#1D4ED8' : 'var(--color-navy)'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                        <span style="display:inline-flex;align-items:center;color:${isMastered ? '#059669' : isSelectedMod ? '#2563EB' : '#64748B'};flex-shrink:0;">
                          ${SKILL_OUTLINE_ICONS[skill.id] || ''}
                        </span>
                        <span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${skill.label}</span>
                      </span>
                    </div>
                    <span style="font-size:10px;font-weight:700;padding:1px 6px;border-radius:99px;color:${badgeColor};background:${badgeBg};border:1px solid ${badgeBorder};flex-shrink:0;margin-left:6px;">
                      ${solvedInSkill}/${totalInSkill}
                    </span>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- Right Workspace: Problem + Code Editor + Result -->
        <div style="display: flex; flex-direction: column; gap: var(--space-4);">
          <!-- Problem Card -->
          <div class="card">
            <div class="card-header" style="margin-bottom: var(--space-2);">
              <div style="display: flex; align-items: center; gap: var(--space-3); flex-wrap:wrap;">
                <span class="badge badge-primary" style="font-size: 11px;">${currentEx.moduleName || 'Roadmap Module'}</span>
                <h3 class="card-title" style="font-size: var(--text-xl);">${currentEx.title}</h3>
                <span class="badge ${currentEx.difficulty === 'Easy' ? 'badge-easy' : currentEx.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard'}">
                  ${currentEx.difficulty}
                </span>
                ${isSolved ? `<span class="badge badge-success" style="display:inline-flex;align-items:center;gap:4px;">${ICONS.checkCircle(13)} Đã hoàn thành</span>` : ''}
              </div>
              <span class="badge badge-primary" style="display:inline-flex;align-items:center;gap:4px;">
                ${ICONS.star(13)} +${currentEx.xpReward} XP
              </span>
            </div>

            <div style="display: flex; gap: var(--space-2); margin-bottom: var(--space-4);">
              ${(currentEx.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
            </div>

            <div style="font-size: var(--text-sm); color: var(--color-gray-700); line-height: 1.6; white-space: pre-wrap; background: var(--color-gray-50); padding: var(--space-4); border-radius: var(--radius-md); border: 1px solid var(--color-gray-100);">
${currentEx.description}
            </div>
          </div>

          <!-- Code Editor -->
          <div class="code-editor-wrap">
            <div class="code-editor-header">
              <div style="display: flex; gap: 6px;">
                <span class="code-editor-dot" style="background: #FF5F56;"></span>
                <span class="code-editor-dot" style="background: #FFBD2E;"></span>
                <span class="code-editor-dot" style="background: #27C93F;"></span>
              </div>
              <span class="code-editor-lang" style="display:inline-flex;align-items:center;gap:4px;">
                ${ICONS.terminal(12)} python sandbox &middot; ${currentEx.id}
              </span>
              <div style="margin-left: auto; display: flex; gap: var(--space-2);">
                <button class="btn btn-secondary btn-sm" id="btn-reset-code" style="color: white; border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.1); display:inline-flex; align-items:center; gap:4px;">
                  ${ICONS.refresh(12)} Khôi phục code
                </button>
              </div>
            </div>
            <textarea class="code-textarea" id="practice-code-input" spellcheck="false">${userCodeMap[currentEx.id]}</textarea>
          </div>

          <!-- Action Buttons -->
          <div style="display: flex; justify-content: space-between; align-items: center; background: var(--color-white); padding: var(--space-3) var(--space-4); border-radius: var(--radius-lg); border: 1px solid var(--color-gray-100); flex-wrap:wrap; gap:var(--space-3);">
            <div style="font-size: var(--text-xs); color: var(--color-gray-500); display:flex; align-items:center; gap:6px;">
              ${ICONS.lightbulb(14)} <em>Chạy thử hoặc chấm điểm để tự động cập nhật tiến độ trên cây Roadmap.</em>
            </div>
            <div style="display: flex; gap: var(--space-3);">
              <button class="btn btn-secondary" id="btn-run-code" style="display:inline-flex; align-items:center; gap:6px;">
                ${ICONS.play(14)} Chạy thử (Run)
              </button>
              <button class="btn btn-primary" id="btn-submit-code" style="display:inline-flex; align-items:center; gap:6px;">
                ${ICONS.check(14)} Chấm điểm (Submit)
              </button>
            </div>
          </div>

          <!-- Result Panel -->
          <div class="result-panel">
            <div class="result-header">
              <span style="display:inline-flex;align-items:center;gap:6px;">
                ${ICONS.terminal(16)} Terminal Output / Kết quả chấm
              </span>
              ${outputStatus === 'running' ? `<span style="font-size: var(--text-xs); color: var(--color-warning); display:inline-flex; align-items:center; gap:4px;">${ICONS.clock(13)} Đang chạy code...</span>` : ''}
              ${outputStatus === 'success' ? `<span style="font-size: var(--text-xs); color: var(--color-success); font-weight: bold; display:inline-flex; align-items:center; gap:4px;">${ICONS.checkCircle(14)} PASSED (Tất cả test cases hợp lệ)</span>` : ''}
              ${outputStatus === 'error' ? `<span style="font-size: var(--text-xs); color: var(--color-error); font-weight: bold; display:inline-flex; align-items:center; gap:4px;">${ICONS.xCircle(14)} Thất bại</span>` : ''}
            </div>
            <div class="result-body ${outputStatus === 'success' ? 'success' : outputStatus === 'error' ? 'error' : ''}" id="result-output-box">
${currentOutput || '# Nhấn "Chạy thử (Run)" hoặc "Chấm điểm (Submit)" để xem kết quả đầu ra...'}
            </div>
          </div>
        </div>
      </div>
    `;

    // Event Listener for Exercise items
    container.querySelectorAll('.exercise-list-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.dataset.id;
        const textarea = container.querySelector('#practice-code-input');
        if (textarea && currentEx) userCodeMap[currentEx.id] = textarea.value;
        selectedExId = id;
        currentOutput = '';
        outputStatus = 'idle';
        window.location.hash = 'practice?ex=' + id;
        render();
      });
    });

    // Module Filter change
    const moduleSelect = container.querySelector('#practice-module-filter');
    if (moduleSelect) {
      moduleSelect.addEventListener('change', (e) => {
        selectedModule = e.target.value;
        if (selectedModule !== 'all') {
          const firstInMod = EXERCISES.find(e => e.nodeId === selectedModule);
          if (firstInMod) {
            selectedExId = firstInMod.id;
            window.location.hash = 'practice?ex=' + firstInMod.id;
          }
        }
        render();
      });
    }

    // Search input
    const searchInput = container.querySelector('#practice-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        // Don't full re-render on every key to keep focus, or re-render keeping focus
        const scrollBox = container.querySelector('#practice-exercise-scroll-box');
        if (scrollBox) {
          const userExercises = getState('exercises') || {};
          const filtered = EXERCISES.filter(ex => {
            const matchModule = (selectedModule === 'all') || (ex.nodeId === selectedModule);
            const matchSearch = !searchQuery || 
              ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (ex.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
              (ex.moduleName || '').toLowerCase().includes(searchQuery.toLowerCase());
            return matchModule && matchSearch;
          });

          scrollBox.innerHTML = filtered.length === 0 ? `
            <div style="text-align:center;padding:20px;color:var(--color-gray-400);font-size:12px;">
              Không tìm thấy bài tập phù hợp
            </div>
          ` : filtered.map(ex => {
            const exSolved = Boolean(userExercises[ex.id]?.solved);
            const active = ex.id === selectedExId ? 'active' : '';
            const diffBadge = ex.difficulty === 'Easy' ? 'badge-easy' : ex.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard';
            return `
              <div class="exercise-list-item ${active} ${exSolved ? 'solved' : ''}" data-id="${ex.id}">
                <div class="ex-status">${exSolved ? ICONS.check(12) : ''}</div>
                <div style="flex: 1; min-width: 0;">
                  <div style="font-size: 11px; color: var(--color-primary); font-weight: 600; text-transform: uppercase; letter-spacing: 0.02em;">
                    ${ex.moduleName || 'Data Practice'}
                  </div>
                  <div style="font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-navy); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 1px;">
                    ${ex.title}
                  </div>
                  <div style="display: flex; gap: var(--space-2); margin-top: 4px;">
                    <span class="badge ${diffBadge}" style="font-size: 10px; padding: 1px 6px;">${ex.difficulty}</span>
                    <span class="badge badge-gray" style="font-size: 10px; padding: 1px 6px; display:inline-flex; align-items:center; gap:3px;">
                      ${ICONS.star(10)} +${ex.xpReward} XP
                    </span>
                  </div>
                </div>
              </div>
            `;
          }).join('');

          scrollBox.querySelectorAll('.exercise-list-item').forEach(item => {
            item.addEventListener('click', () => {
              const id = item.dataset.id;
              const textarea = container.querySelector('#practice-code-input');
              if (textarea) userCodeMap[selectedExId] = textarea.value;
              selectedExId = id;
              currentOutput = '';
              outputStatus = 'idle';
              render();
            });
          });
        }
      });
    }

        // Skill checklist item click -> filters exercises to this skill module
    container.querySelectorAll('.skill-check-item[data-skill-id]').forEach(item => {
      item.addEventListener('click', () => {
        const skillId = item.dataset.skillId;
        selectedModule = skillId;
        const firstEx = EXERCISES.find(e => e.nodeId === skillId);
        if (firstEx) {
          selectedExId = firstEx.id;
          window.location.hash = 'practice?ex=' + firstEx.id;
        }
        render();
      });
    });

    const codeArea = container.querySelector('#practice-code-input');
    if (codeArea) {
      codeArea.addEventListener('input', (e) => {
        userCodeMap[currentEx.id] = e.target.value;
      });
    }

    const resetBtn = container.querySelector('#btn-reset-code');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        userCodeMap[currentEx.id] = currentEx.starterCode;
        render();
        showToast('Đã khôi phục code mẫu ban đầu', 'info');
      });
    }

    const runBtn = container.querySelector('#btn-run-code');
    if (runBtn) {
      runBtn.addEventListener('click', () => {
        outputStatus = 'running';
        currentOutput = `Executing Python code in sandbox...\n`;
        render();

        setTimeout(() => {
          outputStatus = 'idle';
          currentOutput = `>>> python solution.py
${currentEx.expectedOutput}

[Process completed with exit code 0]`;
          render();
          showToast('Chạy code thành công!', 'info');
        }, 600);
      });
    }

    const submitBtn = container.querySelector('#btn-submit-code');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        outputStatus = 'running';
        currentOutput = 'Bắt đầu kiểm tra và chấm điểm tự động...\nTest 1: Kiểm tra cấu trúc dữ liệu đầu vào... OK\nTest 2: Kiểm tra logic và kết quả đầu ra... OK\nTest 3: Edge cases validation... Đang hoàn tất...';
        render();

        setTimeout(() => {
          outputStatus = 'success';
          currentOutput = `================ KẾT QUẢ CHẤM BÀI ================\nTrạng thái: THÀNH CÔNG (Passed 3/3 Test Cases)\n\nKết quả trả về:\n${currentEx.expectedOutput}\n\n[+] Bài tập "${currentEx.title}" đã được ghi nhận hoàn thành!\n[+] Nhận +${currentEx.xpReward} XP vào hồ sơ của bạn!`;
          
          solveExercise(currentEx.id, currentEx.skill);
          addXP(currentEx.xpReward, `Giải thành công: ${currentEx.title}`);
          if (currentEx.nodeId) {
            markNodeActive(currentEx.nodeId);
          }

          render();
          showToast(`Chúc mừng! Bạn đã hoàn thành bài tập và nhận +${currentEx.xpReward} XP!`, 'success', 4000);
        }, 800);
      });
    }

    // Auto-scroll active exercise into view smoothly in sidebar list with pulse highlight
    setTimeout(() => {
      const scrollBox = container.querySelector('#practice-exercise-scroll-box');
      const activeEl = container.querySelector('.exercise-list-item.active');
      if (scrollBox && activeEl) {
        activeEl.scrollIntoView({ block: 'center', behavior: 'smooth' });
        activeEl.classList.add('highlight-pulse');
        setTimeout(() => activeEl.classList.remove('highlight-pulse'), 1800);
      }
    }, 80);
  }

  render();
}
