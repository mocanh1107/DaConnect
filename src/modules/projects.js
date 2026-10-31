// ============================================
// DaConnect – Project Lab Module
// ============================================

import { PROJECTS } from '../data/mockData.js';
import { getState, updateState, addXP, addActivity } from '../main.js';
import { showToast } from '../components/toast.js';
import { ICONS } from '../components/icons.js';

// ── Helpers ──────────────────────────────────

function getDifficultyBadge(difficulty) {
  const map = {
    Beginner:     { cls: 'badge-success',  label: 'Beginner' },
    Intermediate: { cls: 'badge-warning',  label: 'Intermediate' },
    Advanced:     { cls: 'badge-primary',  label: 'Advanced' },
  };
  const b = map[difficulty] || { cls: 'badge-gray', label: difficulty };
  return `<span class="badge ${b.cls}">${b.label}</span>`;
}

function getCategoryBadge(category) {
  return `<span class="badge badge-primary">${category}</span>`;
}

function truncateText(text, maxLines = 3) {
  return `<span style="display:-webkit-box;-webkit-line-clamp:${maxLines};-webkit-box-orient:vertical;overflow:hidden;">${text}</span>`;
}

function fakeSubmitProject(projectId, container, navigate) {
  const score = Math.floor(Math.random() * 21) + 75; // 75–95
  const submittedAt = new Date().toISOString();

  updateState('projects', (prev) => ({
    ...prev,
    [projectId]: { submitted: true, score, submittedAt },
  }));

  const xpEarned = Math.round(score * 2);
  addXP(xpEarned, `Nộp dự án #${projectId}`);
  addActivity(`Nộp dự án và nhận điểm ${score}/100`);
  showToast(`Nộp bài thành công! Điểm của bạn: ${score}/100 (+${xpEarned} XP)`, 'success', 5000);

  renderProjectDetail(projectId, container, navigate);
}

// ── Project Card ──────────────────────────────

function getProjectTheme(project) {
  if (project.id === 'pr1') {
    return {
      background: 'linear-gradient(135deg, #132238 0%, #172c47 100%)',
      iconColor: '#38BDF8',
      icon: ICONS.trendingUp(18),
    };
  }
  if (project.id === 'pr2') {
    return {
      background: 'linear-gradient(135deg, #132238 0%, #1c2747 100%)',
      iconColor: '#A5B4FC',
      icon: ICONS.users(18),
    };
  }
  return {
    background: 'linear-gradient(135deg, #132238 0%, #142f36 100%)',
    iconColor: '#6EE7B7',
    icon: ICONS.barChart(18),
  };
}

function getPillBadge(difficulty) {
  if (difficulty === 'Beginner') {
    return `<span style="margin-left:auto;padding:3px 10px;border-radius:99px;font-size:11px;font-weight:600;letter-spacing:0.02em;background:rgba(18,183,106,0.14);color:#34D399;border:1px solid rgba(52,211,153,0.22);display:inline-flex;align-items:center;">Beginner</span>`;
  }
  if (difficulty === 'Intermediate') {
    return `<span style="margin-left:auto;padding:3px 10px;border-radius:99px;font-size:11px;font-weight:600;letter-spacing:0.02em;background:rgba(245,158,11,0.14);color:#FBBF24;border:1px solid rgba(251,191,36,0.22);display:inline-flex;align-items:center;">Intermediate</span>`;
  }
  return `<span style="margin-left:auto;padding:3px 10px;border-radius:99px;font-size:11px;font-weight:600;letter-spacing:0.02em;background:rgba(56,189,248,0.14);color:#38BDF8;border:1px solid rgba(56,189,248,0.22);display:inline-flex;align-items:center;">${difficulty}</span>`;
}

function renderProjectCard(project, container, navigate) {
  const projectsState = getState('projects') || {};
  const pState = projectsState[project.id] || {};
  const isSubmitted = pState.submitted;
  const theme = getProjectTheme(project);

  const card = document.createElement('div');
  card.className = 'project-card card';
  card.style.cssText = 'cursor:pointer;display:flex;flex-direction:column;overflow:hidden;transition:transform 0.2s,box-shadow 0.2s;padding:0;';
  card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-3px)'; card.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; card.style.boxShadow = ''; });

  card.innerHTML = `
    <!-- Inset Rounded Banner (Dark Blue Tone #132238 / #162a45, No dots pattern) -->
    <div class="project-banner" style="margin:14px 14px 0 14px;padding:16px 18px;min-height:96px;border-radius:14px;background:${theme.background};border:1px solid rgba(255,255,255,0.08);display:flex;flex-direction:column;justify-content:space-between;align-items:stretch;box-sizing:border-box;color:#fff;">
      <!-- Hàng trên: Icon ô vuông bên trái + Badge viên thuốc đẩy sang phải -->
      <div style="display:flex;align-items:center;width:100%;">
        <div style="width:34px;height:34px;border-radius:8px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);display:flex;align-items:center;justify-content:center;color:${theme.iconColor};flex-shrink:0;">
          ${theme.icon}
        </div>
        ${getPillBadge(project.difficulty)}
      </div>

      <!-- Hàng dưới: Tên danh mục căn trái tự nhiên, không bị cắt dòng -->
      <div style="width:100%;text-align:left;margin-top:14px;">
        <div style="font-size:0.95rem;font-weight:600;color:#F8FAFC;letter-spacing:0.01em;line-height:1.25;text-align:left;">
          ${project.category}
        </div>
      </div>
    </div>

    <!-- Card Body -->
    <div class="project-body" style="padding:16px 18px 20px;display:flex;flex-direction:column;flex:1;gap:12px;">
      <h3 class="project-title" style="font-size:1.05rem;font-weight:700;color:var(--text-primary);line-height:1.4;margin:0;">
        ${project.title}
      </h3>
      <p class="project-desc" style="font-size:0.875rem;color:var(--text-secondary);margin:0;line-height:1.6;flex:1;">
        ${truncateText(project.description)}
      </p>

      <div class="project-meta" style="display:flex;flex-wrap:wrap;gap:12px;font-size:0.8rem;color:var(--text-muted);">
        <span style="display:inline-flex;align-items:center;gap:4px;">${ICONS.clock(13)} ${project.duration}</span>
        <span style="display:inline-flex;align-items:center;gap:4px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${project.dataset}">${ICONS.database(13)} ${project.dataset.split('–')[0].trim()}</span>
      </div>

      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        ${project.tags.map(t => `<span class="tag" style="font-size:11px;">${t}</span>`).join('')}
      </div>

      ${isSubmitted ? `<div style="display:flex;align-items:center;gap:8px;padding:8px 12px;background:rgba(18,183,106,0.08);border-radius:8px;border:1px solid rgba(18,183,106,0.25);">
        <span style="color:#12B76A;display:flex;">${ICONS.checkCircle(14)}</span>
        <span style="font-size:0.82rem;font-weight:600;color:#12B76A;">Đã nộp – Điểm: ${pState.score}/100</span>
      </div>` : ''}

      <div style="margin-top:auto;padding-top:4px;">
        <button class="btn btn-primary view-detail-btn" style="width:100%;display:flex;align-items:center;justify-content:center;gap:6px;">
          Xem chi tiết
        </button>
      </div>
    </div>
  `;

  card.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-detail-btn') || e.target.closest('.view-detail-btn')) {
      renderProjectDetail(project.id, container, navigate);
    } else if (!e.target.closest('button')) {
      renderProjectDetail(project.id, container, navigate);
    }
  });

  card.querySelector('.view-detail-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    renderProjectDetail(project.id, container, navigate);
  });

  return card;
}

// ── Project Detail ────────────────────────────

function renderProjectDetail(projectId, container, navigate) {
  const project = PROJECTS.find(p => p.id === projectId);
  if (!project) return;

  const projectsState = getState('projects') || {};
  const pState = projectsState[projectId] || {};
  const isSubmitted = pState.submitted;

  container.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'max-width:860px;margin:0 auto;padding:0 0 40px;';

  // Back button
  const backBtn = document.createElement('button');
  backBtn.className = 'btn btn-secondary';
  backBtn.style.cssText = 'margin-bottom:24px;display:inline-flex;align-items:center;gap:8px;';
  backBtn.innerHTML = '← Quay lại danh sách';
  backBtn.addEventListener('click', () => renderProjects(container, navigate));
  wrapper.appendChild(backBtn);

  // Hero section
  const hero = document.createElement('div');
  hero.style.cssText = 'background:linear-gradient(135deg,#0B1533 0%,#1e3a6e 100%);border-radius:16px;padding:36px;margin-bottom:28px;color:#ffffff;box-shadow:0 10px 25px -5px rgba(11,21,51,0.3);';
  hero.innerHTML = `
    <div style="display:flex;align-items:flex-start;gap:20px;">
      <span style="color:var(--color-primary-light);display:flex;filter:drop-shadow(0 2px 8px rgba(56,189,248,0.4));">${ICONS.projects(44)}</span>
      <div style="flex:1;">
        <h1 style="font-size:1.65rem;font-weight:800;margin:0 0 12px;color:#ffffff !important;line-height:1.35;text-shadow:0 1px 2px rgba(0,0,0,0.2);">${project.title}</h1>
        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:14px;">
          ${getDifficultyBadge(project.difficulty)}
          ${getCategoryBadge(project.category)}
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:18px;font-size:0.875rem;color:#f1f5f9 !important;">
          <span style="display:flex;align-items:center;gap:6px;color:#f1f5f9 !important;">${ICONS.clock(14)} ${project.duration}</span>
          <span style="display:flex;align-items:center;gap:6px;color:#f1f5f9 !important;">${ICONS.database(14)} ${project.dataset}</span>
        </div>
      </div>
    </div>
  `;
  wrapper.appendChild(hero);

  // Problem statement
  const problemSection = document.createElement('div');
  problemSection.className = 'card';
  problemSection.style.cssText = 'padding:24px;margin-bottom:20px;';
  problemSection.innerHTML = `
    <div class="card-header" style="margin-bottom:14px;">
      <h2 class="card-title" style="font-size:1.1rem;font-weight:700;display:flex;align-items:center;gap:8px;">
        ${ICONS.zap(18)} Bài toán thực tế
      </h2>
    </div>
    <p style="color:var(--text-secondary,#4B5563);line-height:1.7;margin:0;">${project.problem}</p>
  `;
  wrapper.appendChild(problemSection);

  // Dataset info
  const datasetSection = document.createElement('div');
  datasetSection.className = 'card';
  datasetSection.style.cssText = 'padding:24px;margin-bottom:20px;';
  datasetSection.innerHTML = `
    <div class="card-header" style="margin-bottom:14px;">
      <h2 class="card-title" style="font-size:1.1rem;font-weight:700;display:flex;align-items:center;gap:8px;">
        ${ICONS.database(18)} Dataset
      </h2>
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
      <div>
        <p style="font-weight:600;margin:0 0 4px;color:var(--text-primary,#0B1533);">${project.dataset}</p>
        <p style="font-size:0.85rem;color:var(--text-muted,#9ca3af);margin:0;">Nguồn dữ liệu công khai</p>
      </div>
      <a href="${project.datasetUrl}" target="_blank" rel="noopener" class="btn btn-secondary" style="font-size:0.85rem;display:inline-flex;align-items:center;gap:6px;">
        ${ICONS.download(14)} Xem Dataset
      </a>
    </div>
  `;
  wrapper.appendChild(datasetSection);

  // Two-column: Objectives + Deliverables
  const twoCol = document.createElement('div');
  twoCol.style.cssText = 'display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px;';

  // Objectives
  const objCard = document.createElement('div');
  objCard.className = 'card';
  objCard.style.cssText = 'padding:24px;';
  objCard.innerHTML = `
    <h2 class="card-title" style="font-size:1.1rem;font-weight:700;margin-bottom:14px;display:flex;align-items:center;gap:8px;">
      ${ICONS.checkCircle(18)} Mục tiêu
    </h2>
    <ul style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:8px;">
      ${project.objectives.map(o => `<li style="color:var(--text-secondary,#4B5563);line-height:1.5;font-size:0.9rem;">${o}</li>`).join('')}
    </ul>
  `;

  // Deliverables
  const delCard = document.createElement('div');
  delCard.className = 'card';
  delCard.style.cssText = 'padding:24px;';
  delCard.innerHTML = `
    <h2 class="card-title" style="font-size:1.1rem;font-weight:700;margin-bottom:14px;display:flex;align-items:center;gap:8px;">
      ${ICONS.projects(18)} Sản phẩm nộp
    </h2>
    <ul style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:8px;">
      ${project.deliverables.map(d => `<li style="color:var(--text-secondary,#4B5563);line-height:1.5;font-size:0.9rem;">${d}</li>`).join('')}
    </ul>
  `;

  twoCol.appendChild(objCard);
  twoCol.appendChild(delCard);
  wrapper.appendChild(twoCol);

  // Scoring criteria table
  const scoringSection = document.createElement('div');
  scoringSection.className = 'card';
  scoringSection.style.cssText = 'padding:24px;margin-bottom:20px;overflow:hidden;';
  scoringSection.innerHTML = `
    <h2 class="card-title" style="font-size:1.1rem;font-weight:700;margin-bottom:16px;display:flex;align-items:center;gap:8px;">
      ${ICONS.award(18)} Tiêu chí chấm điểm
    </h2>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;font-size:0.9rem;">
        <thead>
          <tr style="background:rgba(11,21,51,0.05);">
            <th style="text-align:left;padding:10px 14px;font-weight:600;color:var(--text-primary,#0B1533);">Tiêu chí</th>
            <th style="text-align:right;padding:10px 14px;font-weight:600;color:var(--text-primary,#0B1533);">Điểm tối đa</th>
          </tr>
        </thead>
        <tbody>
          ${project.criteria.map((c, i) => `
            <tr style="border-top:1px solid rgba(0,0,0,0.07);${i % 2 === 1 ? 'background:rgba(11,21,51,0.02);' : ''}">
              <td style="padding:10px 14px;color:var(--text-secondary,#4B5563);">${c.name}</td>
              <td style="padding:10px 14px;text-align:right;font-weight:700;color:var(--color-primary);">${c.points}</td>
            </tr>
          `).join('')}
          <tr style="border-top:2px solid rgba(0,0,0,0.12);background:rgba(11,21,51,0.04);">
            <td style="padding:10px 14px;font-weight:700;color:var(--text-primary,#0B1533);">Tổng cộng</td>
            <td style="padding:10px 14px;text-align:right;font-weight:800;color:var(--color-primary);font-size:1rem;">
              ${project.criteria.reduce((s, c) => s + c.points, 0)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
  wrapper.appendChild(scoringSection);

  // Tags
  const tagsSection = document.createElement('div');
  tagsSection.style.cssText = 'display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px;';
  project.tags.forEach(t => {
    const tag = document.createElement('span');
    tag.className = 'tag';
    tag.textContent = t;
    tagsSection.appendChild(tag);
  });
  wrapper.appendChild(tagsSection);

  // Submission result
  if (isSubmitted) {
    const resultCard = document.createElement('div');
    const score = pState.score;
    const grade = score >= 90 ? { label: 'Xuất sắc', color: '#059669' } : score >= 80 ? { label: 'Tốt', color: '#2563EB' } : { label: 'Đạt', color: '#D97706' };
    resultCard.style.cssText = `padding:24px;border-radius:12px;background:linear-gradient(135deg,rgba(18,183,106,0.08) 0%,rgba(5,150,105,0.12) 100%);border:2px solid rgba(18,183,106,0.3);margin-bottom:24px;`;
    resultCard.innerHTML = `
      <h3 style="margin:0 0 12px;font-size:1.1rem;font-weight:700;color:#065F46;display:flex;align-items:center;gap:8px;">
        ${ICONS.checkCircle(18)} Bài đã được nộp
      </h3>
      <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;">
        <div style="text-align:center;">
          <div style="font-size:2.5rem;font-weight:900;color:${grade.color};">${score}</div>
          <div style="font-size:0.8rem;color:#6b7280;margin-top:2px;">/ 100 điểm</div>
        </div>
        <div>
          <span style="display:inline-block;background:${grade.color};color:#fff;padding:4px 14px;border-radius:99px;font-size:0.875rem;font-weight:700;">${grade.label}</span>
          <p style="margin:8px 0 0;font-size:0.875rem;color:#4B5563;">
            ${score >= 90
              ? 'Xuất sắc! Bạn đã thể hiện sự thành thạo cao trong phân tích dữ liệu.'
              : score >= 80
              ? 'Tốt lắm! Dự án chất lượng cao với insight rõ ràng.'
              : 'Bài làm đạt yêu cầu. Hãy cải thiện thêm phần visualization.'}
          </p>
          <p style="margin:4px 0 0;font-size:0.8rem;color:#9ca3af;">
            Nộp lúc: ${new Date(pState.submittedAt).toLocaleString('vi-VN')}
          </p>
        </div>
      </div>
    `;
    wrapper.appendChild(resultCard);
  }

  // Action buttons
  const actions = document.createElement('div');
  actions.style.cssText = 'display:flex;gap:12px;flex-wrap:wrap;';

  const downloadBtn = document.createElement('button');
  downloadBtn.className = 'btn btn-secondary';
  downloadBtn.style.cssText = 'display:flex;align-items:center;gap:8px;';
  downloadBtn.innerHTML = `${ICONS.download(16)} Tải Dataset`;
  downloadBtn.addEventListener('click', () => {
    showToast('Đang tải dataset... (Chức năng demo)', 'info');
  });
  actions.appendChild(downloadBtn);

  if (!isSubmitted) {
    const submitBtn = document.createElement('button');
    submitBtn.className = 'btn btn-primary';
    submitBtn.style.cssText = 'display:flex;align-items:center;gap:8px;';
    submitBtn.innerHTML = `${ICONS.send(16)} Nộp bài`;
    submitBtn.addEventListener('click', () => {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Đang chấm điểm...';
      setTimeout(() => fakeSubmitProject(project.id, container, navigate), 1500);
    });
    actions.appendChild(submitBtn);
  }

  wrapper.appendChild(actions);
  container.appendChild(wrapper);

  if (window.innerWidth < 640) {
    twoCol.style.gridTemplateColumns = '1fr';
  }
}

// ── Portfolio Guide ───────────────────────────

function renderPortfolioGuide() {
  const section = document.createElement('div');
  section.style.cssText = 'margin-top:48px;';

  section.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;">
      <h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary,#0B1533);margin:0;display:flex;align-items:center;gap:8px;">
        ${ICONS.trophy(20)} Portfolio Guide
      </h2>
      <span class="badge badge-primary">Mới</span>
    </div>
  `;

  const card = document.createElement('div');
  card.className = 'card';
  card.style.cssText = 'padding:32px;background:linear-gradient(135deg,#0B1533 0%,#1e3a6e 100%);color:#ffffff;border-radius:16px;border:none;box-shadow:0 12px 30px -8px rgba(11,21,51,0.35);';
  card.innerHTML = `
    <h3 style="font-size:1.25rem;font-weight:800;margin:0 0 10px;color:#ffffff !important;line-height:1.35;">Cách xây dựng Portfolio Data Analyst chuyên nghiệp</h3>
    <p style="color:#e2e8f0 !important;opacity:0.95;margin:0 0 24px;font-size:0.95rem;line-height:1.65;">Một portfolio mạnh là bằng chứng tốt nhất cho kỹ năng của bạn. Dưới đây là các bước để tạo portfolio gây ấn tượng với nhà tuyển dụng.</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin-bottom:24px;">
      ${[
        { step: '1', icon: ICONS.code(20), title: 'GitHub Repository', desc: 'Tạo repo riêng cho mỗi dự án. README rõ ràng với mô tả, dataset, kết quả.' },
        { step: '2', icon: ICONS.fileText(20), title: 'README chuyên nghiệp', desc: 'Mô tả bài toán, phương pháp, kết quả và insight chính. Thêm screenshot.' },
        { step: '3', icon: ICONS.book(20), title: 'Jupyter Notebook', desc: 'Code sạch, có comment. Chia thành sections rõ ràng. Export HTML để xem nhanh.' },
        { step: '4', icon: ICONS.edit(20), title: 'Case Study Blog', desc: 'Viết bài blog giải thích quá trình phân tích. Medium hoặc LinkedIn Article.' },
      ].map(s => `
        <div style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:20px;transition:background 0.2s;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
            <span style="background:rgba(255,255,255,0.22);color:#ffffff;border-radius:8px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:0.9rem;">${s.step}</span>
            <span style="color:var(--color-primary-light);display:flex;">${s.icon}</span>
          </div>
          <h4 style="font-size:1rem;font-weight:700;margin:0 0 8px;color:#ffffff !important;line-height:1.35;">${s.title}</h4>
          <p style="font-size:0.85rem;color:#cbd5e1 !important;margin:0;line-height:1.55;">${s.desc}</p>
        </div>
      `).join('')}
    </div>
    <div style="background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:20px 24px;">
      <h4 style="margin:0 0 14px;font-size:1rem;font-weight:700;display:flex;align-items:center;gap:8px;color:#ffffff !important;">
        ${ICONS.lightbulb(16)} Tips cho CV & LinkedIn
      </h4>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
        ${[
          'Ghi rõ impact: "Phân tích tăng conversion 15%"',
          'Link trực tiếp đến GitHub trong CV',
          'Đăng bài phân tích lên LinkedIn hàng tuần',
          'Tham gia Kaggle Competition để thêm kinh nghiệm',
          'Kết nối với Data Analyst để nhận feedback',
          'Cập nhật portfolio thường xuyên với project mới',
        ].map(tip => `
          <div style="display:flex;align-items:flex-start;gap:8px;font-size:0.875rem;color:#f1f5f9 !important;">
            <span style="margin-top:1px;flex-shrink:0;color:var(--color-primary-light);font-weight:700;">→</span>
            <span>${tip}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;

  section.appendChild(card);
  return section;
}

// ── Main Render ───────────────────────────────

export function renderProjects(container, navigate) {
  container.innerHTML = '';

  const header = document.createElement('div');
  header.className = 'page-header';
  header.innerHTML = `
    <h1 style="font-size:1.75rem;font-weight:800;color:var(--text-primary,#0B1533);margin:0 0 8px;display:flex;align-items:center;gap:10px;">
      ${ICONS.projects(26)} Project Lab
    </h1>
    <p style="color:var(--text-secondary,#6b7280);margin:0;font-size:1rem;">
      Thực hành với các dự án thực tế, xây dựng portfolio ấn tượng và nâng cao kỹ năng Data Analyst.
    </p>
  `;
  container.appendChild(header);

  const projectsState = getState('projects') || {};
  const submittedCount = Object.values(projectsState).filter(p => p && p.submitted).length;
  const totalCount = PROJECTS.length;

  const statsBar = document.createElement('div');
  statsBar.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;margin:20px 0 28px;';

  [
    { icon: ICONS.projects(20), label: 'Tổng dự án', value: `${totalCount} dự án`, color: 'var(--color-primary)', bg: 'var(--color-primary-bg)' },
    { icon: ICONS.checkCircle(20), label: 'Đã hoàn thành', value: `${submittedCount} / ${totalCount}`, color: 'var(--color-success)', bg: 'var(--color-success-bg)' },
    { icon: ICONS.clock(20), label: 'Chưa làm', value: `${totalCount - submittedCount} dự án`, color: 'var(--color-warning)', bg: 'var(--color-warning-bg)' },
  ].forEach(stat => {
    const el = document.createElement('div');
    el.className = 'card';
    el.style.cssText = 'padding:16px 20px;display:flex;align-items:center;gap:14px;';
    el.innerHTML = `
      <div style="width:42px;height:42px;border-radius:10px;background:${stat.bg};color:${stat.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        ${stat.icon}
      </div>
      <div>
        <div style="font-size:1.35rem;font-weight:800;color:var(--text-primary);line-height:1.2;">${stat.value}</div>
        <div style="font-size:0.8rem;color:var(--text-muted);margin-top:2px;">${stat.label}</div>
      </div>
    `;
    statsBar.appendChild(el);
  });
  container.appendChild(statsBar);

  const grid = document.createElement('div');
  grid.className = 'page-grid grid-auto';
  grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:24px;';

  PROJECTS.forEach(project => {
    const card = renderProjectCard(project, container, navigate);
    grid.appendChild(card);
  });

  container.appendChild(grid);
  container.appendChild(renderPortfolioGuide());
}
