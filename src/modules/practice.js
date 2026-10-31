// ============================================
// DaConnect Practice Lab Module
// ============================================

import { EXERCISES } from '../data/mockData.js';
import { getState, solveExercise, addXP, markNodeActive } from '../main.js';
import { showToast } from '../components/toast.js';
import { ICONS } from '../components/icons.js';

const SKILLS_CHECKLIST = [
  { id: 'filtering', label: 'Lọc và truy vấn dữ liệu' },
  { id: 'missing_values', label: 'Xử lý dữ liệu thiếu' },
  { id: 'groupby', label: 'GroupBy và tổng hợp' },
  { id: 'merge', label: 'Merge dữ liệu' },
  { id: 'statistics', label: 'Thống kê mô tả' },
  { id: 'outliers', label: 'Phát hiện và xử lý ngoại lệ' }
];

export function renderPractice(container, navigate) {
  let selectedExId = EXERCISES[0].id;
  let userCodeMap = {};
  let currentOutput = '';
  let outputStatus = 'idle'; // idle | running | success | error

  function render() {
    const userExercises = getState('exercises') || {};
    const skills = getState('skills') || {};
    const currentEx = EXERCISES.find(e => e.id === selectedExId) || EXERCISES[0];
    const isSolved = Boolean(userExercises[currentEx.id]?.solved);

    if (userCodeMap[currentEx.id] === undefined) {
      userCodeMap[currentEx.id] = currentEx.starterCode;
    }

    const solvedCount = EXERCISES.filter(e => userExercises[e.id]?.solved).length;

    container.innerHTML = `
      <div class="page-header">
        <h1 style="display:flex;align-items:center;gap:10px;">
          ${ICONS.practice(26)} Practice Lab
        </h1>
        <p>Luyện tập kỹ năng lập trình Python, Pandas và xử lý dữ liệu thực tế dành cho Data Analyst</p>
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

            <div style="display: flex; flex-direction: column; gap: var(--space-2);">
              ${EXERCISES.map(ex => {
                const exSolved = Boolean(userExercises[ex.id]?.solved);
                const active = ex.id === currentEx.id ? 'active' : '';
                const diffBadge = ex.difficulty === 'Easy' ? 'badge-easy' : ex.difficulty === 'Medium' ? 'badge-medium' : 'badge-hard';
                return `
                  <div class="exercise-list-item ${active} ${exSolved ? 'solved' : ''}" data-id="${ex.id}">
                    <div class="ex-status">${exSolved ? ICONS.check(12) : ''}</div>
                    <div style="flex: 1; min-width: 0;">
                      <div style="font-size: var(--text-sm); font-weight: var(--weight-semibold); color: var(--color-navy); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
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

          <!-- Skill Checklist Card -->
          <div class="card" style="padding: var(--space-4);">
            <h4 style="font-size: var(--text-sm); font-weight: var(--weight-bold); margin-bottom: var(--space-3); color: var(--color-navy); display:flex; align-items:center; gap:6px;">
              ${ICONS.checkCircle(16)} Skill Checklist
            </h4>
            <div class="skill-checklist">
              ${SKILLS_CHECKLIST.map(skill => {
                const done = Boolean(skills[skill.id]);
                return `
                  <div class="skill-check-item ${done ? 'done' : ''}">
                    <div class="skill-check-box">${done ? ICONS.check(12) : ''}</div>
                    <span class="skill-check-label">${skill.label}</span>
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
              ${currentEx.tags.map(t => `<span class="tag">${t}</span>`).join('')}
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
                ${ICONS.terminal(12)} python sandbox
              </span>
              <div style="margin-left: auto; display: flex; gap: var(--space-2);">
                <button class="btn btn-secondary btn-sm" id="btn-reset-code" style="color: white; border-color: rgba(255,255,255,0.2); background: rgba(255,255,255,0.1); display:inline-flex; align-items:center; gap:4px;">
                  ${ICONS.refresh(12)} Reset
                </button>
              </div>
            </div>
            <textarea class="code-textarea" id="practice-code-input" spellcheck="false">${userCodeMap[currentEx.id]}</textarea>
          </div>

          <!-- Action Buttons -->
          <div style="display: flex; justify-content: space-between; align-items: center; background: var(--color-white); padding: var(--space-3) var(--space-4); border-radius: var(--radius-lg); border: 1px solid var(--color-gray-100); flex-wrap:wrap; gap:var(--space-3);">
            <div style="font-size: var(--text-xs); color: var(--color-gray-500); display:flex; align-items:center; gap:6px;">
              ${ICONS.lightbulb(14)} <em>Môi trường chạy code là mô phỏng frontend (Demo Sandbox).</em>
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

    // Attach Event Listeners
    container.querySelectorAll('.exercise-list-item').forEach(item => {
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
        currentOutput = 'Executing Python code in sandbox...\n';
        render();

        setTimeout(() => {
          outputStatus = 'idle';
          currentOutput = `>>> python solution.py\n${currentEx.expectedOutput}\n\n[Process completed with exit code 0]`;
          render();
          showToast('Chạy code thành công!', 'info');
        }, 800);
      });
    }

    const submitBtn = container.querySelector('#btn-submit-code');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        outputStatus = 'running';
        currentOutput = 'Bắt đầu kiểm tra và chấm điểm tự động...\nTest 1: Kiểm tra cấu trúc DataFrame... OK\nTest 2: Kiểm tra kiểu dữ liệu và giá trị đầu ra... OK\nTest 3: Edge cases validation... Đang chạy...';
        render();

        setTimeout(() => {
          outputStatus = 'success';
          currentOutput = `================ KẾT QUẢ CHẤM BÀI ================\nTrạng thái: THÀNH CÔNG (Passed 3/3 Test Cases)\n\nKết quả trả về:\n${currentEx.expectedOutput}\n\n[+] Kỹ năng "${currentEx.skill}" đã được đánh dấu hoàn thành!\n[+] Nhận +${currentEx.xpReward} XP vào hồ sơ của bạn!`;
          
          solveExercise(currentEx.id, currentEx.skill);
          addXP(currentEx.xpReward, `Giải thành công: ${currentEx.title}`);
          if (currentEx.skill) {
            markNodeActive('dc');
          }

          render();
          showToast(`Chúc mừng! Bạn đã hoàn thành bài tập và nhận +${currentEx.xpReward} XP!`, 'success', 4000);
        }, 1200);
      });
    }
  }

  render();
}
