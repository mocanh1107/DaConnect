// ============================================
// DaConnect – Career Hub Module
// ============================================

import { JOBS } from '../data/mockData.js';
import { getState, updateState, addXP, addActivity } from '../main.js';
import { openModal, closeModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';
import { ICONS } from '../components/icons.js';

// ── State Helpers ─────────────────────────────

function getJobState(jobId) {
  const jobs = getState('jobs') || {};
  return jobs[jobId] || {};
}

function setJobState(jobId, patch) {
  updateState('jobs', (prev) => ({
    ...prev,
    [jobId]: { ...(prev[jobId] || {}), ...patch },
  }));
}

// ── Badge Helpers ─────────────────────────────

function getTypeBadge(type) {
  const map = {
    'Full-time':  { cls: 'badge-success', label: type },
    'Internship': { cls: 'badge-warning', label: type },
    'Part-time':  { cls: 'badge-primary', label: type },
  };
  const b = map[type] || { cls: 'badge-gray', label: type };
  return `<span class="badge ${b.cls}">${b.label}</span>`;
}

function getStatusBadge(state) {
  if (!state.applied) return '';
  return `<span class="badge badge-success" style="margin-left:6px;display:inline-flex;align-items:center;gap:4px;">${ICONS.checkCircle(13)} Đã ứng tuyển</span>`;
}

function deadlineCountdown(deadline) {
  const d = new Date(deadline);
  const now = new Date();
  const days = Math.ceil((d - now) / (1000 * 60 * 60 * 24));
  if (days < 0) return `<span style="color:#ef4444;display:inline-flex;align-items:center;gap:4px;">${ICONS.clock(13)} Đã hết hạn</span>`;
  if (days === 0) return `<span style="color:#f59e0b;font-weight:700;display:inline-flex;align-items:center;gap:4px;">${ICONS.clock(13)} Hết hạn hôm nay!</span>`;
  return `<span style="color:#f59e0b;font-weight:600;display:inline-flex;align-items:center;gap:4px;">${ICONS.clock(13)} Còn ${days} ngày</span>`;
}

// ── Apply Confirmation Modal ──────────────────

function openApplyModal(job, onConfirm) {
  const content = `
    <div style="padding:4px 0;">
      <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
        <div style="width:56px;height:56px;border-radius:12px;background:var(--color-primary-bg,#E0F2FE);color:var(--color-primary,#0284C7);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          ${ICONS.building(28)}
        </div>
        <div>
          <div style="font-size:1rem;font-weight:700;color:var(--text-primary,#0B1533);">${job.title}</div>
          <div style="font-size:0.875rem;color:var(--text-secondary,#6b7280);">${job.company}</div>
        </div>
      </div>
      <p style="color:var(--text-secondary,#4B5563);line-height:1.6;margin:0 0 8px;">
        Bạn muốn ứng tuyển vào vị trí <strong>${job.title}</strong> tại <strong>${job.company}</strong>?
      </p>
      <p style="font-size:0.85rem;color:var(--text-muted,#9ca3af);margin:0 0 20px;">
        Hồ sơ của bạn sẽ được gửi đến nhà tuyển dụng. Bạn có thể theo dõi trạng thái trong phần Ứng tuyển.
      </p>
      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button id="cancel-apply-btn" class="btn btn-secondary">Huỷ</button>
        <button id="confirm-apply-btn" class="btn btn-primary" style="display:inline-flex;align-items:center;gap:6px;">
          ${ICONS.check(14)} Xác nhận ứng tuyển
        </button>
      </div>
    </div>
  `;

  const overlay = openModal({ title: 'Xác nhận ứng tuyển', content });

  overlay.querySelector('#cancel-apply-btn').addEventListener('click', closeModal);
  overlay.querySelector('#confirm-apply-btn').addEventListener('click', () => {
    closeModal();
    onConfirm();
  });
}

// ── Challenge Submission ──────────────────────

function openChallengeSubmitModal(job, container, navigate, onSuccess) {
  const challenge = job.challenge;

  const content = `
    <div>
      <p style="color:var(--text-secondary,#4B5563);margin:0 0 16px;line-height:1.6;">
        Nhập câu trả lời / link GitHub của bạn cho bài thử thách "<strong>${challenge.title}</strong>".
      </p>
      <div class="form-group" style="margin-bottom:16px;">
        <label class="form-label" style="display:block;font-weight:600;margin-bottom:8px;font-size:0.9rem;">
          Link GitHub hoặc mô tả giải pháp
        </label>
        <input id="challenge-link-input" class="form-input" type="url" placeholder="https://github.com/username/repo"
          style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:0.9rem;box-sizing:border-box;" />
      </div>
      <div class="form-group" style="margin-bottom:20px;">
        <label class="form-label" style="display:block;font-weight:600;margin-bottom:8px;font-size:0.9rem;">
          Mô tả cách tiếp cận & kết quả <span style="color:#ef4444;">*</span>
        </label>
        <textarea id="challenge-textarea" class="form-textarea" rows="5" placeholder="Mô tả phương pháp, công cụ và kết quả chính của bạn..."
          style="width:100%;padding:10px 14px;border:1px solid #d1d5db;border-radius:8px;font-size:0.9rem;resize:vertical;font-family:inherit;box-sizing:border-box;"></textarea>
      </div>
      <div style="display:flex;gap:10px;justify-content:flex-end;">
        <button id="cancel-challenge-btn" class="btn btn-secondary">Huỷ</button>
        <button id="submit-challenge-btn" class="btn btn-primary" style="display:inline-flex;align-items:center;gap:6px;">
          ${ICONS.send(14)} Nộp bài
        </button>
      </div>
    </div>
  `;

  const overlay = openModal({ title: `Nộp bài – ${challenge.title}`, content, wide: true });

  overlay.querySelector('#cancel-challenge-btn').addEventListener('click', closeModal);
  overlay.querySelector('#submit-challenge-btn').addEventListener('click', () => {
    const text = overlay.querySelector('#challenge-textarea').value.trim();
    if (!text) {
      showToast('Vui lòng điền mô tả giải pháp của bạn.', 'warning');
      return;
    }

    const btn = overlay.querySelector('#submit-challenge-btn');
    btn.disabled = true;
    btn.innerHTML = `<span style="display:inline-flex;align-items:center;gap:6px;">${ICONS.clock(14)} Đang chấm điểm...</span>`;

    setTimeout(() => {
      const score = Math.floor(Math.random() * 29) + 70; // 70–98
      closeModal();

      setJobState(job.id, { challengeSubmitted: true, challengeScore: score });
      addXP(challenge.xpReward, `Hoàn thành thử thách ${challenge.title}`);
      addActivity(`Nộp bài thử thách "${challenge.title}" – ${score}/100`);

      // Show result modal
      const grade = score >= 90 ? 'Xuất sắc' : score >= 80 ? 'Tốt' : 'Đạt yêu cầu';
      const resultContent = `
        <div style="text-align:center;padding:20px 0;">
          <div style="display:flex;justify-content:center;color:${score >= 90 ? '#059669' : score >= 80 ? '#0284C7' : '#D97706'};margin-bottom:12px;">
            ${ICONS.award(56)}
          </div>
          <div style="font-size:3rem;font-weight:900;color:${score >= 90 ? '#059669' : score >= 80 ? '#0284C7' : '#D97706'};margin-bottom:4px;">${score}/100</div>
          <div style="font-size:1.1rem;font-weight:700;margin-bottom:16px;">${grade}</div>
          <p style="color:var(--text-secondary,#4B5563);margin:0 0 20px;line-height:1.6;">
            ${score >= 90 ? 'Xuất sắc! Nhà tuyển dụng sẽ rất ấn tượng với kết quả của bạn.' : score >= 80 ? 'Tốt lắm! Kết quả này thể hiện kỹ năng phân tích vững chắc.' : 'Bài làm đạt yêu cầu. Hãy cải thiện thêm để tăng cơ hội được nhận.'}
          </p>
          <div style="background:rgba(18,183,106,0.08);border-radius:10px;padding:14px;margin-bottom:20px;display:flex;align-items:center;justify-content:center;gap:6px;">
            ${ICONS.star(16)} <span style="font-size:0.9rem;font-weight:600;color:#065F46;">+${challenge.xpReward} XP đã được cộng vào tài khoản!</span>
          </div>
          <button id="result-close-btn" class="btn btn-primary" style="width:100%;">Đóng</button>
        </div>
      `;

      const resultOverlay = openModal({ title: 'Kết quả thử thách', content: resultContent });
      resultOverlay.querySelector('#result-close-btn').addEventListener('click', () => {
        closeModal();
        if (onSuccess) onSuccess();
      });
    }, 2000);
  });
}

// ── Job Detail View ───────────────────────────

function renderJobDetail(jobId, container, navigate, renderList) {
  const job = JOBS.find(j => j.id === jobId);
  if (!job) return;

  let jobState = getJobState(job.id);

  function refresh() {
    jobState = getJobState(job.id);
    renderJobDetail(jobId, container, navigate, renderList);
  }

  container.innerHTML = '';

  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'max-width:860px;margin:0 auto;padding:0 0 40px;';

  // Back button
  const backBtn = document.createElement('button');
  backBtn.className = 'btn btn-secondary';
  backBtn.style.cssText = 'margin-bottom:24px;display:inline-flex;align-items:center;gap:8px;';
  backBtn.innerHTML = '← Quay lại danh sách';
  backBtn.addEventListener('click', () => renderList());
  wrapper.appendChild(backBtn);

  // Hero
  const hero = document.createElement('div');
  hero.className = 'card';
  hero.style.cssText = 'padding:28px;margin-bottom:20px;';
  hero.innerHTML = `
    <div style="display:flex;align-items:flex-start;gap:20px;flex-wrap:wrap;">
      <div class="company-logo" style="width:72px;height:72px;display:flex;align-items:center;justify-content:center;background:var(--color-primary-bg,#E0F2FE);color:var(--color-primary,#0284C7);border-radius:14px;flex-shrink:0;">
        ${ICONS.building(36)}
      </div>
      <div style="flex:1;min-width:180px;">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;">
          <h1 class="job-title" style="font-size:1.4rem;font-weight:800;color:var(--text-primary,#0B1533);margin:0;">${job.title}</h1>
          ${jobState.applied ? `<span class="badge badge-success" style="display:inline-flex;align-items:center;gap:4px;">${ICONS.checkCircle(13)} Đã ứng tuyển</span>` : ''}
        </div>
        <div class="job-company" style="font-size:1rem;font-weight:600;color:var(--text-secondary,#4B5563);margin-bottom:4px;">${job.company}</div>
        <div style="font-size:0.85rem;color:var(--text-muted,#9ca3af);margin-bottom:14px;">${job.companyDesc}</div>
        <div class="job-meta" style="display:flex;flex-wrap:wrap;gap:14px;">
          <div class="job-meta-item" style="display:flex;align-items:center;gap:6px;font-size:0.85rem;color:var(--text-secondary,#4B5563);">
            ${ICONS.mapPin(14)} ${job.location}
          </div>
          <div class="job-meta-item" style="display:flex;align-items:center;gap:6px;font-size:0.85rem;color:var(--text-secondary,#4B5563);">
            ${getTypeBadge(job.type)}
          </div>
          <div class="job-meta-item" style="display:flex;align-items:center;gap:6px;font-size:0.85rem;font-weight:600;color:#059669;">
            ${ICONS.dollarSign(14)} ${job.salary}
          </div>
          <div class="job-meta-item" style="display:flex;align-items:center;gap:6px;font-size:0.85rem;color:var(--text-secondary,#4B5563);">
            ${ICONS.practice(14)} ${job.experience}
          </div>
        </div>
      </div>
    </div>
  `;
  wrapper.appendChild(hero);

  // Job Description
  const descSection = document.createElement('div');
  descSection.className = 'card';
  descSection.style.cssText = 'padding:24px;margin-bottom:20px;';
  descSection.innerHTML = `
    <h2 style="font-size:1.1rem;font-weight:700;margin:0 0 14px;display:flex;align-items:center;gap:8px;">
      ${ICONS.fileText(18)} Mô tả công việc
    </h2>
    <p style="color:var(--text-secondary,#4B5563);line-height:1.7;margin:0;">${job.description}</p>
  `;
  wrapper.appendChild(descSection);

  // Requirements
  const reqSection = document.createElement('div');
  reqSection.className = 'card';
  reqSection.style.cssText = 'padding:24px;margin-bottom:20px;';
  reqSection.innerHTML = `
    <h2 style="font-size:1.1rem;font-weight:700;margin:0 0 14px;display:flex;align-items:center;gap:8px;">
      ${ICONS.checkCircle(18)} Yêu cầu công việc
    </h2>
    <ul style="margin:0;padding-left:20px;display:flex;flex-direction:column;gap:10px;">
      ${job.requirements.map(r => `<li style="color:var(--text-secondary,#4B5563);line-height:1.5;">${r}</li>`).join('')}
    </ul>
    <div style="margin-top:16px;">
      <h3 style="font-size:0.9rem;font-weight:700;color:var(--text-primary,#0B1533);margin:0 0 10px;">Kỹ năng cần có:</h3>
      <div class="job-skills" style="display:flex;flex-wrap:wrap;gap:8px;">
        ${job.skills.map(s => `<span class="tag">${s}</span>`).join('')}
      </div>
    </div>
  `;
  wrapper.appendChild(reqSection);

  // Business Challenge section (if applicable)
  if (job.hasChallenge) {
    const c = job.challenge;
    const challengeSubmitted = jobState.challengeSubmitted;
    const challengeSection = document.createElement('div');
    challengeSection.style.cssText = 'margin-bottom:20px;';

    let challengeContent = '';
    if (challengeSubmitted) {
      challengeContent = `
        <div style="background:rgba(18,183,106,0.08);border-radius:10px;padding:16px;margin-top:16px;display:flex;align-items:center;gap:16px;">
          <div style="color:#059669;display:flex;">${ICONS.checkCircle(32)}</div>
          <div>
            <div style="font-weight:700;color:#065F46;font-size:1rem;">Đã hoàn thành thử thách!</div>
            <div style="font-size:0.875rem;color:#047857;margin-top:4px;">Điểm của bạn: <strong>${jobState.challengeScore}/100</strong></div>
          </div>
        </div>
      `;
    } else {
      challengeContent = `
        <div style="margin-top:16px;">
          <div style="margin-bottom:14px;">
            <h4 style="font-size:0.95rem;font-weight:700;margin:0 0 8px;color:var(--text-primary,#0B1533);display:flex;align-items:center;gap:6px;">
              ${ICONS.fileText(16)} Bài toán
            </h4>
            <p style="color:var(--text-secondary,#4B5563);line-height:1.6;margin:0;">${c.problem}</p>
          </div>
          <div style="margin-bottom:14px;">
            <h4 style="font-size:0.95rem;font-weight:700;margin:0 0 8px;color:var(--text-primary,#0B1533);display:flex;align-items:center;gap:6px;">
              ${ICONS.database(16)} Dataset mẫu
            </h4>
            <pre style="background:#0B1533;color:#a5f3fc;padding:14px;border-radius:8px;font-size:0.8rem;overflow-x:auto;margin:0;line-height:1.5;">${c.dataset}</pre>
          </div>
          <div style="margin-bottom:14px;">
            <h4 style="font-size:0.95rem;font-weight:700;margin:0 0 10px;color:var(--text-primary,#0B1533);display:flex;align-items:center;gap:6px;">
              ${ICONS.checkCircle(16)} Yêu cầu bài làm
            </h4>
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${c.requirements.map(r => `
                <div style="display:flex;align-items:flex-start;gap:10px;">
                  <span style="color:#0284C7;font-weight:700;flex-shrink:0;margin-top:1px;">✓</span>
                  <span style="color:var(--text-secondary,#4B5563);font-size:0.9rem;line-height:1.5;">${r}</span>
                </div>
              `).join('')}
            </div>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;padding:14px;background:rgba(245,158,11,0.08);border-radius:8px;border:1px solid rgba(245,158,11,0.2);margin-bottom:16px;">
            <span style="font-size:0.9rem;">${deadlineCountdown(c.deadline)} (${c.deadline})</span>
            <span style="font-size:0.9rem;font-weight:700;color:var(--color-primary);display:inline-flex;align-items:center;gap:4px;">
              ${ICONS.zap(15)} +${c.xpReward} XP
            </span>
          </div>
          <button id="join-challenge-btn" class="btn btn-primary" style="display:inline-flex;align-items:center;gap:8px;">
            ${ICONS.play(14)} Tham gia thử thách
          </button>
        </div>
      `;
    }

    challengeSection.innerHTML = `
      <div class="card" style="padding:24px;border:1.5px solid rgba(2,132,199,0.3);background:linear-gradient(135deg,rgba(2,132,199,0.04) 0%,rgba(14,165,233,0.06) 100%);">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
          <span style="color:var(--color-primary);display:flex;">${ICONS.zap(18)}</span>
          <h2 style="font-size:1.1rem;font-weight:800;margin:0;color:var(--color-primary-dark);">Business Challenge</h2>
          <span class="badge badge-primary">${c.title}</span>
        </div>
        <p style="color:var(--color-primary-dark);font-size:0.875rem;margin:0 0 0;">${c.desc}</p>
        ${challengeContent}
      </div>
    `;
    wrapper.appendChild(challengeSection);

    if (!challengeSubmitted) {
      const joinBtn = challengeSection.querySelector('#join-challenge-btn');
      if (joinBtn) {
        joinBtn.addEventListener('click', () => {
          openChallengeSubmitModal(job, container, navigate, refresh);
        });
      }
    }
  }

  // Apply CTA
  const ctaSection = document.createElement('div');
  ctaSection.className = 'card';
  ctaSection.style.cssText = 'padding:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;background:linear-gradient(135deg,#0B1533 0%,#1e3a6e 100%);color:#fff;';

  if (jobState.applied) {
    ctaSection.innerHTML = `
      <div>
        <div style="font-size:1.15rem;font-weight:700;margin-bottom:6px;display:flex;align-items:center;gap:6px;color:#ffffff !important;">
          ${ICONS.checkCircle(18)} Bạn đã ứng tuyển vị trí này
        </div>
        <div style="font-size:0.875rem;color:#e2e8f0 !important;opacity:0.9;">Nhà tuyển dụng sẽ liên hệ trong vòng 5-7 ngày làm việc.</div>
      </div>
      <span class="badge badge-success" style="font-size:0.9rem;padding:8px 16px;">Đang xem xét</span>
    `;
  } else {
    ctaSection.innerHTML = `
      <div>
        <div style="font-size:1.15rem;font-weight:700;margin-bottom:6px;color:#ffffff !important;">Sẵn sàng ứng tuyển?</div>
        <div style="font-size:0.875rem;color:#e2e8f0 !important;opacity:0.9;">Gửi hồ sơ ngay và bắt đầu hành trình sự nghiệp tại ${job.company}.</div>
      </div>
      <button id="detail-apply-btn" class="btn" style="background:#fff;color:#0B1533;font-weight:700;padding:12px 24px;white-space:nowrap;display:inline-flex;align-items:center;gap:8px;">
        ${ICONS.send(16)} Ứng tuyển ngay
      </button>
    `;
    const applyBtn = ctaSection.querySelector('#detail-apply-btn');
    applyBtn.addEventListener('click', () => {
      openApplyModal(job, () => {
        setJobState(job.id, { applied: true });
        addActivity(`Ứng tuyển vị trí ${job.title} tại ${job.company}`);
        showToast(`Đã ứng tuyển thành công vào ${job.title} – ${job.company}!`, 'success');
        refresh();
      });
    });
  }

  wrapper.appendChild(ctaSection);
  container.appendChild(wrapper);
}

// ── Job Card ──────────────────────────────────

function renderJobCard(job, container, navigate, renderList) {
  const jobState = getJobState(job.id);

  const card = document.createElement('div');
  card.className = `job-card card${job.hasChallenge ? ' has-challenge' : ''}`;
  card.style.cssText = 'display:flex;flex-direction:column;overflow:hidden;transition:transform 0.2s,box-shadow 0.2s;';
  card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-3px)'; card.style.boxShadow = '0 8px 28px rgba(0,0,0,0.12)'; });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; card.style.boxShadow = ''; });

  const challengeBanner = job.hasChallenge ? `
    <div class="challenge-banner" style="background:linear-gradient(135deg,var(--color-primary-dark) 0%,var(--color-primary) 100%);padding:10px 16px;display:flex;align-items:center;gap:10px;">
      <span style="color:#fff;display:flex;">${ICONS.zap(16)}</span>
      <div class="challenge-banner-text">
        <div class="challenge-banner-title" style="font-size:0.8rem;font-weight:700;color:#fff;">Business Challenge</div>
        <div class="challenge-banner-desc" style="font-size:0.72rem;color:rgba(255,255,255,0.85);">+${job.challenge.xpReward} XP nếu hoàn thành</div>
      </div>
      ${jobState.challengeSubmitted ? `<span class="badge" style="background:rgba(255,255,255,0.2);color:#fff;margin-left:auto;display:inline-flex;align-items:center;gap:4px;">${ICONS.check(12)} Đã nộp</span>` : ''}
    </div>
  ` : '';

  card.innerHTML = `
    ${challengeBanner}
    <div class="job-header" style="display:flex;align-items:flex-start;gap:14px;padding:18px 18px 0;flex-shrink:0;">
      <div class="company-logo" style="width:52px;height:52px;display:flex;align-items:center;justify-content:center;background:var(--color-primary-bg,#E0F2FE);color:var(--color-primary,#0284C7);border-radius:12px;flex-shrink:0;">
        ${ICONS.building(26)}
      </div>
      <div style="flex:1;min-width:0;">
        <div class="job-company" style="font-size:0.8rem;font-weight:600;color:var(--text-muted,#9ca3af);margin-bottom:2px;">${job.company}</div>
        <div style="font-size:0.75rem;color:var(--text-muted,#9ca3af);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${job.companyDesc}">${job.companyDesc}</div>
      </div>
      ${jobState.applied ? `<span class="badge badge-success" style="flex-shrink:0;display:inline-flex;align-items:center;">${ICONS.checkCircle(14)}</span>` : ''}
    </div>
    <div style="padding:14px 18px;flex:1;display:flex;flex-direction:column;gap:10px;">
      <h3 class="job-title" style="font-size:1rem;font-weight:800;color:var(--text-primary,#0B1533);margin:0;line-height:1.3;">${job.title}</h3>
      <div class="job-meta" style="display:flex;flex-wrap:wrap;gap:8px;">
        <div class="job-meta-item" style="display:flex;align-items:center;gap:4px;font-size:0.78rem;color:var(--text-secondary,#4B5563);">${ICONS.mapPin(13)} ${job.location}</div>
        <div class="job-meta-item">${getTypeBadge(job.type)}</div>
        <div class="job-meta-item" style="display:flex;align-items:center;gap:4px;font-size:0.78rem;font-weight:600;color:#059669;">${ICONS.dollarSign(13)} ${job.salary}</div>
        <div class="job-meta-item" style="display:flex;align-items:center;gap:4px;font-size:0.78rem;color:var(--text-secondary,#4B5563);">${ICONS.practice(13)} ${job.experience}</div>
      </div>
      <div class="job-skills" style="display:flex;flex-wrap:wrap;gap:5px;">
        ${job.skills.slice(0, 4).map(s => `<span class="tag" style="font-size:0.72rem;">${s}</span>`).join('')}
        ${job.skills.length > 4 ? `<span class="tag" style="font-size:0.72rem;">+${job.skills.length - 4}</span>` : ''}
      </div>
      <p style="font-size:0.82rem;color:var(--text-secondary,#6b7280);margin:0;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${job.description}</p>
    </div>
    <div class="job-actions" style="padding:12px 18px;border-top:1px solid rgba(0,0,0,0.07);display:flex;gap:8px;flex-shrink:0;">
      <button class="btn btn-secondary btn-sm view-job-btn" style="flex:1;font-size:0.82rem;">Xem chi tiết</button>
      ${jobState.applied
        ? `<button class="btn btn-sm" style="flex:1;font-size:0.82rem;background:rgba(18,183,106,0.1);color:#059669;border:1px solid rgba(18,183,106,0.3);cursor:default;display:inline-flex;align-items:center;justify-content:center;gap:4px;" disabled>${ICONS.checkCircle(13)} Đã ứng tuyển</button>`
        : `<button class="btn btn-primary btn-sm apply-btn" style="flex:1;font-size:0.82rem;">Ứng tuyển</button>`
      }
    </div>
  `;

  // View detail
  card.querySelector('.view-job-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    renderJobDetail(job.id, container, navigate, renderList);
  });

  // Apply button on card
  const applyBtn = card.querySelector('.apply-btn');
  if (applyBtn) {
    applyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openApplyModal(job, () => {
        setJobState(job.id, { applied: true });
        addActivity(`Ứng tuyển vị trí ${job.title} tại ${job.company}`);
        showToast(`Đã ứng tuyển thành công vào ${job.title}!`, 'success');
        renderList();
      });
    });
  }

  return card;
}

// ── Filter Bar ────────────────────────────────

function buildFilterBar(onFilter) {
  const bar = document.createElement('div');
  bar.style.cssText = 'display:flex;gap:10px;flex-wrap:wrap;align-items:center;margin-bottom:24px;';

  const filters = [
    { key: 'all',        label: 'Tất cả' },
    { key: 'Full-time',  label: 'Full-time' },
    { key: 'Internship', label: 'Internship' },
    { key: 'salary-low', label: '< 20 triệu' },
    { key: 'salary-high',label: '20+ triệu' },
  ];

  let active = 'all';

  filters.forEach(f => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-secondary btn-sm';
    btn.style.cssText = f.key === active ? 'background:var(--color-primary,#0284C7);color:#fff;' : '';
    btn.textContent = f.label;
    btn.dataset.key = f.key;
    btn.addEventListener('click', () => {
      active = f.key;
      bar.querySelectorAll('button').forEach(b => {
        b.style.cssText = b.dataset.key === active ? 'background:var(--color-primary,#0284C7);color:#fff;' : '';
      });
      onFilter(active);
    });
    bar.appendChild(btn);
  });

  return bar;
}

// ── Main Render ───────────────────────────────

export function renderCareer(container, navigate) {
  function renderList() {
    renderCareer(container, navigate);
  }

  container.innerHTML = '';

  // Page header
  const header = document.createElement('div');
  header.className = 'page-header';
  header.innerHTML = `
    <h1 style="font-size:1.75rem;font-weight:800;color:var(--text-primary,#0B1533);margin:0 0 8px;display:flex;align-items:center;gap:10px;">
      ${ICONS.career(26)} Career Hub
    </h1>
    <p style="color:var(--text-secondary,#6b7280);margin:0;font-size:1rem;">
      Khám phá cơ hội việc làm Data Analyst hàng đầu tại Việt Nam. Ứng tuyển và tham gia Business Challenge để nổi bật.
    </p>
  `;
  container.appendChild(header);

  // Stats
  const jobsState = getState('jobs') || {};
  const appliedCount = Object.values(jobsState).filter(j => j && j.applied).length;
  const challengeDoneCount = Object.values(jobsState).filter(j => j && j.challengeSubmitted).length;
  const jobsWithChallenge = JOBS.filter(j => j.hasChallenge).length;

  const statsBar = document.createElement('div');
  statsBar.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px;margin:20px 0 28px;';

  const careerStats = [
    {
      title: 'Việc làm tuyển chọn',
      value: JOBS.length,
      unit: 'vị trí',
      desc: 'Top doanh nghiệp công nghệ & tài chính',
      color: 'var(--color-primary)',
      bg: 'var(--color-primary-bg)',
      icon: ICONS.briefcase(18),
      border: 'var(--color-primary)',
    },
    {
      title: 'Đã nộp hồ sơ',
      value: appliedCount,
      unit: 'công ty',
      desc: appliedCount > 0 ? 'Đang chờ phản hồi từ nhà tuyển dụng' : 'Chưa ứng tuyển vị trí nào',
      color: 'var(--color-success)',
      bg: 'var(--color-success-bg)',
      icon: ICONS.send(18),
      border: 'var(--color-success)',
    },
    {
      title: 'Business Challenge',
      value: `${challengeDoneCount}/${jobsWithChallenge}`,
      unit: 'hoàn thành',
      desc: 'Tăng 3x cơ hội phỏng vấn khi làm test',
      color: 'var(--color-warning)',
      bg: 'var(--color-warning-bg)',
      icon: ICONS.zap(18),
      border: 'var(--color-warning)',
    },
    {
      title: 'Mức lương trung bình',
      value: '18 - 35',
      unit: 'triệu VNĐ',
      desc: 'Theo khảo sát thị trường Data 2025',
      color: '#7C3AED',
      bg: '#F3E8FF',
      icon: ICONS.dollarSign(18),
      border: '#7C3AED',
    },
  ];

  careerStats.forEach(stat => {
    const el = document.createElement('div');
    el.className = 'card stat-card';
    el.style.cssText = `padding:18px 20px;display:flex;flex-direction:column;justify-content:space-between;border-left:4px solid ${stat.border};transition:transform var(--transition-fast);`;
    el.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
        <span style="font-size:0.8rem;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.04em;">${stat.title}</span>
        <div style="width:34px;height:34px;border-radius:10px;background:${stat.bg};color:${stat.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          ${stat.icon}
        </div>
      </div>
      <div>
        <div style="font-size:1.75rem;font-weight:800;color:var(--text-primary);line-height:1.2;margin-bottom:4px;">
          ${stat.value} <span style="font-size:0.85rem;font-weight:600;color:var(--text-muted);">${stat.unit}</span>
        </div>
        <div style="font-size:0.78rem;color:var(--text-muted);">${stat.desc}</div>
      </div>
    `;
    statsBar.appendChild(el);
  });
  container.appendChild(statsBar);

  // Grid container
  const gridWrapper = document.createElement('div');

  // Filter bar
  const grid = document.createElement('div');
  grid.className = 'page-grid grid-auto';
  grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:24px;';

  function renderGrid(filterKey) {
    grid.innerHTML = '';

    let filtered = [...JOBS];
    if (filterKey === 'Full-time') {
      filtered = JOBS.filter(j => j.type === 'Full-time');
    } else if (filterKey === 'Internship') {
      filtered = JOBS.filter(j => j.type === 'Internship');
    } else if (filterKey === 'salary-low') {
      filtered = JOBS.filter(j => {
        const match = j.salary.match(/(\d+)/);
        return match && parseInt(match[1]) < 20;
      });
    } else if (filterKey === 'salary-high') {
      filtered = JOBS.filter(j => {
        const match = j.salary.match(/(\d+)/);
        return match && parseInt(match[1]) >= 20;
      });
    }

    if (filtered.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted,#9ca3af);">Không tìm thấy công việc phù hợp.</div>`;
      return;
    }

    filtered.forEach(job => {
      const card = renderJobCard(job, container, navigate, renderList);
      grid.appendChild(card);
    });
  }

  const filterBar = buildFilterBar(renderGrid);
  gridWrapper.appendChild(filterBar);
  gridWrapper.appendChild(grid);
  container.appendChild(gridWrapper);

  renderGrid('all');

  // Tips section at bottom
  const tipsSection = document.createElement('div');
  tipsSection.style.cssText = 'margin-top:48px;';
  tipsSection.innerHTML = `
    <h2 style="font-size:1.25rem;font-weight:800;color:var(--text-primary,#0B1533);margin:0 0 20px;display:flex;align-items:center;gap:8px;">
      ${ICONS.lightbulb(20)} Mẹo ứng tuyển thành công
    </h2>
  `;

  const tipsCard = document.createElement('div');
  tipsCard.className = 'card';
  tipsCard.style.cssText = 'padding:28px;';
  tipsCard.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:20px;">
      ${[
        { icon: ICONS.zap(22), title: 'Tham gia Business Challenge', desc: 'Hoàn thành challenge để thể hiện kỹ năng thực tế và kiếm thêm XP.' },
        { icon: ICONS.target(22), title: 'Tối ưu CV với keywords', desc: 'Dùng đúng từ khoá trong JD: Python, SQL, Power BI, A/B Testing...' },
        { icon: ICONS.briefcase(22), title: 'Xây dựng portfolio', desc: 'Hoàn thành các dự án trong Project Lab và đẩy lên GitHub.' },
        { icon: ICONS.users(22), title: 'Kết nối trên LinkedIn', desc: 'Connect với Data Analyst tại các công ty target. Tham gia group DA Việt Nam.' },
      ].map(tip => `
        <div style="display:flex;gap:14px;align-items:flex-start;">
          <span style="color:var(--color-primary);display:flex;flex-shrink:0;">${tip.icon}</span>
          <div>
            <div style="font-weight:700;font-size:0.95rem;color:var(--text-primary,#0B1533);margin-bottom:4px;">${tip.title}</div>
            <div style="font-size:0.83rem;color:var(--text-secondary,#6b7280);line-height:1.5;">${tip.desc}</div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  tipsSection.appendChild(tipsCard);
  container.appendChild(tipsSection);
}
