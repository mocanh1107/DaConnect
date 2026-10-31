// ============================================
// DaConnect Q&A Module (StackOverflow-style)
// ============================================

import { QUESTIONS, ANSWERS } from '../data/mockData.js';
import { getState, updateState, addXP, addActivity } from '../main.js';
import { openModal, closeModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';
import { ICONS } from '../components/icons.js';

// ── Helpers ────────────────────────────────────

function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Hôm nay';
  if (days === 1) return 'Hôm qua';
  if (days < 30) return `${days} ngày trước`;
  const months = Math.floor(days / 30);
  return `${months} tháng trước`;
}

function formatNum(n) {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return String(n);
}

function renderMarkdown(text) {
  if (!text) return '';
  return text
    // code blocks
    .replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) =>
      `<pre class="code-block"><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`)
    // inline code
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    // bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    // italic
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    // bullets
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
    // numbered list
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // line breaks
    .replace(/\n\n/g, '</p><p>')
    .replace(/^/, '<p>')
    .replace(/$/, '</p>');
}

// ── State helpers ──────────────────────────────

function getQuestionsState() {
  return getState('questions') || {};
}

function getAnswersState() {
  return getState('answers') || {};
}

function getAllQuestions() {
  const stored = getState('localQuestions') || [];
  return [...stored, ...QUESTIONS];
}

function getAllAnswersForQuestion(questionId) {
  const storedAll = getState('localAnswers') || {};
  const local = storedAll[questionId] || [];
  const mock = ANSWERS[questionId] || [];
  return [...local, ...mock];
}

// ── Main render ────────────────────────────────

export function renderQA(container, navigate) {
  let currentFilter = 'all';
  let currentTag = null;
  let searchQuery = '';
  let currentView = 'list'; // 'list' | 'detail'
  let currentQuestionId = null;

  function render() {
    if (currentView === 'detail') {
      renderDetail();
    } else {
      renderList();
    }
  }

  // ── LIST VIEW ──────────────────────────────────

  function renderList() {
    const questions = getAllQuestions();
    const qState = getQuestionsState();

    // Filter
    let filtered = questions.filter(q => {
      if (currentFilter === 'unanswered') return q.answers === 0 || getAllAnswersForQuestion(q.id).length === 0;
      if (currentFilter === 'solved') return q.solved;
      return true;
    });

    if (currentTag) {
      filtered = filtered.filter(q => q.tags && q.tags.includes(currentTag));
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(item => item.title.toLowerCase().includes(q));
    }

    const totalQ = questions.length;
    const answeredQ = questions.filter(q => q.solved).length;
    const tagCounts = {};
    questions.forEach(q => (q.tags || []).forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + 1; }));
    const topTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);

    container.innerHTML = `
      <div class="qa-layout">
        <!-- Main column -->
        <div class="qa-main">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px;">
            <div>
              <h2 style="font-size:1.4rem;font-weight:700;color:var(--text-primary);margin:0;display:flex;align-items:center;gap:8px;">
                ${ICONS.qa(22)} ${filtered.length} câu hỏi
              </h2>
              <p style="font-size:0.85rem;color:var(--text-muted);margin:4px 0 0;">Hỏi đáp và giải đáp thắc mắc về Data Analytics</p>
            </div>
            <button class="btn btn-primary" id="ask-btn" style="display:flex;align-items:center;gap:6px;">
              ${ICONS.edit(16)} <span>Đặt câu hỏi</span>
            </button>
          </div>

          <!-- Search bar -->
          <div style="position:relative;margin-bottom:16px;">
            <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);color:var(--text-muted);display:flex;">
              ${ICONS.search(16)}
            </span>
            <input
              type="text"
              class="form-input"
              id="qa-search"
              placeholder="Tìm kiếm câu hỏi..."
              value="${searchQuery}"
              style="padding-left:36px;width:100%;box-sizing:border-box;"
            />
          </div>

          <!-- Filter tabs -->
          <div class="tabs" style="margin-bottom:16px;">
            <button class="tab ${currentFilter === 'all' ? 'active' : ''}" data-filter="all">Tất cả <span class="badge badge-primary">${totalQ}</span></button>
            <button class="tab ${currentFilter === 'unanswered' ? 'active' : ''}" data-filter="unanswered">Chưa trả lời</button>
            <button class="tab ${currentFilter === 'solved' ? 'active' : ''}" data-filter="solved">Đã giải <span class="badge badge-success">${answeredQ}</span></button>
          </div>

          <!-- Tag chips -->
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px;">
            <button class="tag ${!currentTag ? 'active' : ''}" data-tag="" style="cursor:pointer;">Tất cả tags</button>
            ${['Python', 'SQL', 'Pandas', 'NumPy', 'Statistics', 'Machine Learning'].map(t =>
              `<button class="tag ${currentTag === t ? 'active' : ''}" data-tag="${t}" style="cursor:pointer;">${t}</button>`
            ).join('')}
          </div>

          <!-- Questions list -->
          <div id="questions-list">
            ${filtered.length === 0 ? `
              <div style="text-align:center;padding:48px 0;color:var(--text-muted);">
                <div style="display:flex;justify-content:center;color:var(--text-muted);margin-bottom:12px;">
                  ${ICONS.qa(44)}
                </div>
                <p>Không tìm thấy câu hỏi nào phù hợp.</p>
              </div>
            ` : filtered.map(q => renderQuestionCard(q, qState)).join('')}
          </div>
        </div>

        <!-- Sidebar -->
        <aside class="qa-sidebar">
          <!-- Stats -->
          <div class="card" style="margin-bottom:16px;">
            <h4 style="font-size:0.9rem;font-weight:600;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.05em;margin:0 0 14px;display:flex;align-items:center;gap:6px;">
              ${ICONS.barChart(16)} Thống kê cộng đồng
            </h4>
            <div class="question-stats" style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
              <div class="question-stat-item" style="text-align:center;padding:12px;background:var(--bg-secondary);border-radius:8px;">
                <div class="question-stat-num" style="font-size:1.5rem;font-weight:700;color:var(--color-primary);">${totalQ}</div>
                <div class="question-stat-label" style="font-size:0.75rem;color:var(--text-muted);">Câu hỏi</div>
              </div>
              <div class="question-stat-item" style="text-align:center;padding:12px;background:var(--bg-secondary);border-radius:8px;">
                <div class="question-stat-num" style="font-size:1.5rem;font-weight:700;color:var(--color-success);">${answeredQ}</div>
                <div class="question-stat-label" style="font-size:0.75rem;color:var(--text-muted);">Đã giải</div>
              </div>
              <div class="question-stat-item" style="text-align:center;padding:12px;background:var(--bg-secondary);border-radius:8px;">
                <div class="question-stat-num" style="font-size:1.5rem;font-weight:700;color:var(--color-warning);">${questions.reduce((s, q) => s + (getAllAnswersForQuestion(q.id).length), 0)}</div>
                <div class="question-stat-label" style="font-size:0.75rem;color:var(--text-muted);">Câu trả lời</div>
              </div>
              <div class="question-stat-item" style="text-align:center;padding:12px;background:var(--bg-secondary);border-radius:8px;">
                <div class="question-stat-num" style="font-size:1.5rem;font-weight:700;color:var(--color-primary-light);">${Math.round(answeredQ / totalQ * 100)}%</div>
                <div class="question-stat-label" style="font-size:0.75rem;color:var(--text-muted);">Tỷ lệ giải</div>
              </div>
            </div>
          </div>

          <!-- Top Tags -->
          <div class="card">
            <h4 style="font-size:0.9rem;font-weight:600;color:var(--text-secondary);text-transform:uppercase;letter-spacing:0.05em;margin:0 0 14px;display:flex;align-items:center;gap:6px;">
              ${ICONS.tag(16)} Tags phổ biến
            </h4>
            <div style="display:flex;flex-direction:column;gap:8px;">
              ${topTags.map(([tag, count]) => `
                <div style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;" class="tag-row" data-tag="${tag}">
                  <span class="tag" style="cursor:pointer;">${tag}</span>
                  <span style="font-size:0.8rem;color:var(--text-muted);">${count} câu hỏi</span>
                </div>
              `).join('')}
            </div>
          </div>
        </aside>
      </div>
    `;

    // Events
    container.querySelector('#ask-btn').addEventListener('click', openAskModal);

    container.querySelector('#qa-search').addEventListener('input', (e) => {
      searchQuery = e.target.value;
      render();
    });

    container.querySelectorAll('.tab[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentFilter = btn.dataset.filter;
        render();
      });
    });

    container.querySelectorAll('[data-tag]').forEach(btn => {
      btn.addEventListener('click', () => {
        const tag = btn.dataset.tag;
        currentTag = tag || null;
        render();
      });
    });

    container.querySelectorAll('.question-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.vote-btn')) return;
        const id = card.dataset.questionId;
        currentQuestionId = id;
        currentView = 'detail';
        render();
      });
    });

    container.querySelectorAll('.vote-btn[data-vote-question]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const qId = btn.dataset.voteQuestion;
        const dir = btn.dataset.dir;
        handleQuestionVote(qId, dir);
      });
    });
  }

  function renderQuestionCard(q, qState) {
    const qs = qState[q.id] || {};
    const votes = qs.votes !== undefined ? qs.votes : q.votes;
    const userVoted = qs.userVoted || q.userVoted;
    const answerCount = getAllAnswersForQuestion(q.id).length;

    return `
      <div class="question-card card" data-question-id="${q.id}" style="margin-bottom:12px;cursor:pointer;transition:transform 0.15s,box-shadow 0.15s;">
        <div style="display:flex;gap:16px;align-items:flex-start;">
          <!-- Vote mini panel -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:4px;min-width:48px;">
            <button class="vote-btn" data-vote-question="${q.id}" data-dir="up"
              style="background:none;border:none;cursor:pointer;padding:4px;border-radius:4px;display:flex;align-items:center;justify-content:center;color:${userVoted === 'up' ? 'var(--color-primary)' : 'var(--text-muted)'};"
              title="Vote up">${ICONS.arrowUp(14)}</button>
            <span class="vote-count" style="font-size:1rem;font-weight:700;color:var(--text-primary);">${formatNum(votes)}</span>
            <button class="vote-btn" data-vote-question="${q.id}" data-dir="down"
              style="background:none;border:none;cursor:pointer;padding:4px;border-radius:4px;display:flex;align-items:center;justify-content:center;color:${userVoted === 'down' ? 'var(--color-error)' : 'var(--text-muted)'};"
              title="Vote down">${ICONS.arrowDown(14)}</button>
          </div>

          <!-- Question info -->
          <div style="flex:1;min-width:0;">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;">
              ${q.solved ? `<span class="badge badge-success" style="font-size:0.75rem;padding:2px 8px;display:inline-flex;align-items:center;gap:4px;">${ICONS.checkCircle(12)} Đã giải</span>` : ''}
              <h3 class="question-title" style="margin:0;font-size:1rem;font-weight:600;color:var(--text-primary);line-height:1.4;">${q.title}</h3>
            </div>
            <p class="question-excerpt" style="font-size:0.85rem;color:var(--text-muted);margin:0 0 10px;line-height:1.5;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${q.body}</p>
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
              <div class="question-tags" style="display:flex;flex-wrap:wrap;gap:4px;">
                ${(q.tags || []).map(t => `<span class="tag" style="font-size:0.75rem;">${t}</span>`).join('')}
              </div>
              <div style="display:flex;align-items:center;gap:12px;font-size:0.8rem;color:var(--text-muted);">
                <span style="display:inline-flex;align-items:center;gap:4px;">${ICONS.messageSquare(12)} ${answerCount} trả lời</span>
                <span style="display:inline-flex;align-items:center;gap:4px;">${ICONS.eye(12)} ${formatNum(q.views)}</span>
                <div class="question-author" style="display:flex;align-items:center;gap:6px;">
                  <div class="avatar" style="width:22px;height:22px;background:var(--color-primary);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.65rem;font-weight:700;">${q.authorInitials || getInitials(q.author)}</div>
                  <span style="color:var(--text-secondary);">${q.author}</span>
                  <span style="color:var(--color-primary);display:inline-flex;align-items:center;gap:2px;">${ICONS.star(12)} ${q.reputation}</span>
                </div>
                <span>${timeAgo(q.date)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ── DETAIL VIEW ────────────────────────────────

  function renderDetail() {
    const questions = getAllQuestions();
    const q = questions.find(item => item.id === currentQuestionId);
    if (!q) { currentView = 'list'; render(); return; }

    const qState = getQuestionsState();
    const aState = getAnswersState();
    const qs = qState[q.id] || {};
    const votes = qs.votes !== undefined ? qs.votes : q.votes;
    const userVoted = qs.userVoted || null;
    const answers = getAllAnswersForQuestion(q.id);

    container.innerHTML = `
      <div style="max-width:900px;margin:0 auto;">
        <!-- Back button -->
        <button class="btn btn-secondary" id="back-btn" style="margin-bottom:20px;display:flex;align-items:center;gap:6px;">
          ← Quay lại danh sách
        </button>

        <!-- Question header -->
        <div class="card" style="margin-bottom:20px;">
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
            ${q.solved ? `<span class="badge badge-success" style="font-size:0.8rem;padding:3px 10px;display:inline-flex;align-items:center;gap:4px;">${ICONS.checkCircle(13)} Đã giải</span>` : ''}
            <h1 class="question-title" style="margin:0;font-size:1.3rem;font-weight:700;color:var(--text-primary);line-height:1.4;flex:1;">${q.title}</h1>
          </div>
          <div style="display:flex;gap:16px;font-size:0.82rem;color:var(--text-muted);margin-bottom:16px;flex-wrap:wrap;">
            <span style="display:inline-flex;align-items:center;gap:4px;">${ICONS.clock(12)} Đăng: ${timeAgo(q.date)}</span>
            <span style="display:inline-flex;align-items:center;gap:4px;">${ICONS.eye(12)} ${formatNum(q.views)} lượt xem</span>
            <span style="display:inline-flex;align-items:center;gap:4px;">${ICONS.messageSquare(12)} ${answers.length} câu trả lời</span>
          </div>

          <div style="display:flex;gap:20px;align-items:flex-start;">
            <!-- Vote panel -->
            <div style="display:flex;flex-direction:column;align-items:center;gap:6px;">
              <button class="vote-btn" id="vote-q-up" data-dir="up"
                style="width:36px;height:36px;border-radius:50%;border:1.5px solid ${userVoted === 'up' ? 'var(--color-primary)' : 'var(--color-gray-200)'};background:${userVoted === 'up' ? 'var(--color-primary-bg)' : 'none'};cursor:pointer;display:flex;align-items:center;justify-content:center;color:${userVoted === 'up' ? 'var(--color-primary)' : 'var(--text-muted)'};"
                title="Vote up">${ICONS.arrowUp(16)}</button>
              <span class="vote-count" id="q-vote-count" style="font-size:1.3rem;font-weight:700;color:var(--text-primary);">${votes}</span>
              <button class="vote-btn" id="vote-q-down" data-dir="down"
                style="width:36px;height:36px;border-radius:50%;border:1.5px solid ${userVoted === 'down' ? 'var(--color-error)' : 'var(--color-gray-200)'};background:${userVoted === 'down' ? 'rgba(239,68,68,0.1)' : 'none'};cursor:pointer;display:flex;align-items:center;justify-content:center;color:${userVoted === 'down' ? 'var(--color-error)' : 'var(--text-muted)'};"
                title="Vote down">${ICONS.arrowDown(16)}</button>
            </div>

            <!-- Question body -->
            <div style="flex:1;min-width:0;">
              <div class="question-body" style="color:var(--text-primary);line-height:1.7;font-size:0.95rem;">
                ${renderMarkdown(q.body)}
              </div>
              <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:16px;">
                ${(q.tags || []).map(t => `<span class="tag">${t}</span>`).join('')}
              </div>
              <div class="question-author" style="display:flex;align-items:center;gap:8px;margin-top:16px;padding:12px;background:var(--bg-secondary);border-radius:8px;">
                <div class="avatar" style="width:36px;height:36px;background:var(--color-primary);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.85rem;font-weight:700;">${q.authorInitials || getInitials(q.author)}</div>
                <div>
                  <div style="font-weight:600;color:var(--text-primary);font-size:0.9rem;">${q.author}</div>
                  <div style="font-size:0.78rem;color:var(--text-muted);display:flex;align-items:center;gap:4px;">
                    ${ICONS.star(12)} Reputation: ${q.reputation} &nbsp;·&nbsp; ${timeAgo(q.date)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Answers -->
        <h3 style="font-size:1.1rem;font-weight:700;color:var(--text-primary);margin-bottom:16px;display:flex;align-items:center;gap:6px;">
          ${ICONS.messageSquare(18)} ${answers.length} Câu trả lời
        </h3>
        <div id="answers-container">
          ${answers.length === 0 ? `
            <div class="card" style="text-align:center;padding:36px;color:var(--text-muted);">
              <div style="display:flex;justify-content:center;color:var(--text-muted);margin-bottom:10px;">
                ${ICONS.messageSquare(36)}
              </div>
              <p>Chưa có câu trả lời nào. Hãy là người đầu tiên chia sẻ giải pháp!</p>
            </div>
          ` : answers.map(a => renderAnswerCard(a, aState, q)).join('')}
        </div>

        <!-- Answer form -->
        <div class="card" style="margin-top:24px;">
          <h4 style="font-size:1rem;font-weight:700;color:var(--text-primary);margin:0 0 16px;display:flex;align-items:center;gap:6px;">
            ${ICONS.edit(18)} Trả lời câu hỏi này
          </h4>
          <div class="form-group">
            <label class="form-label">Câu trả lời của bạn</label>
            <textarea id="answer-body" class="form-textarea" rows="8"
              placeholder="Chia sẻ kiến thức, kinh nghiệm hoặc giải pháp của bạn... (hỗ trợ Markdown và code blocks)"
              style="font-family:inherit;resize:vertical;"></textarea>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:8px;">
            <p style="font-size:0.8rem;color:var(--text-muted);margin:0;display:flex;align-items:center;gap:4px;">
              ${ICONS.lightbulb(14)} Hỗ trợ Markdown: <strong>bold</strong>, <code>code</code>, block code
            </p>
            <button class="btn btn-primary" id="submit-answer-btn">Đăng câu trả lời</button>
          </div>
        </div>
      </div>
    `;

    // Events
    container.querySelector('#back-btn').addEventListener('click', () => {
      currentView = 'list';
      render();
    });

    container.querySelector('#vote-q-up').addEventListener('click', () => handleQuestionVote(q.id, 'up'));
    container.querySelector('#vote-q-down').addEventListener('click', () => handleQuestionVote(q.id, 'down'));

    container.querySelectorAll('.vote-answer-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const ansId = btn.dataset.answerId;
        const dir = btn.dataset.dir;
        handleAnswerVote(ansId, dir);
      });
    });

    container.querySelectorAll('.accept-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const ansId = btn.dataset.answerId;
        handleAcceptAnswer(q.id, ansId);
      });
    });

    container.querySelector('#submit-answer-btn').addEventListener('click', () => {
      const body = container.querySelector('#answer-body').value.trim();
      if (!body) { showToast('Vui lòng nhập câu trả lời.', 'warning'); return; }
      submitAnswer(q.id, body);
    });
  }

  function renderAnswerCard(a, aState, question) {
    const as = aState[a.id] || {};
    const votes = as.votes !== undefined ? as.votes : a.votes;
    const userVoted = as.userVoted || null;
    const currentUser = getState('user');
    const isOwner = question.author === currentUser.name || question.authorId === currentUser.id;

    return `
      <div class="answer-card card ${a.accepted ? 'accepted' : ''}" data-answer-id="${a.id}" style="margin-bottom:12px;${a.accepted ? 'border-left:3px solid var(--color-success);' : ''}">
        ${a.accepted ? `<div class="accepted-badge" style="display:inline-flex;align-items:center;gap:6px;font-size:0.8rem;font-weight:600;color:var(--color-success);margin-bottom:12px;"><span>${ICONS.checkCircle(14)}</span> Câu trả lời được chấp nhận</div>` : ''}
        <div style="display:flex;gap:20px;align-items:flex-start;">
          <!-- Vote panel -->
          <div style="display:flex;flex-direction:column;align-items:center;gap:6px;min-width:40px;">
            <button class="vote-answer-btn vote-btn" data-answer-id="${a.id}" data-dir="up"
              style="width:32px;height:32px;border-radius:50%;border:1.5px solid ${userVoted === 'up' ? 'var(--color-primary)' : 'var(--color-gray-200)'};background:${userVoted === 'up' ? 'var(--color-primary-bg)' : 'none'};cursor:pointer;display:flex;align-items:center;justify-content:center;color:${userVoted === 'up' ? 'var(--color-primary)' : 'var(--text-muted)'};"
              title="Vote up">${ICONS.arrowUp(14)}</button>
            <span class="vote-count" style="font-size:1.1rem;font-weight:700;color:var(--text-primary);">${votes}</span>
            <button class="vote-answer-btn vote-btn" data-answer-id="${a.id}" data-dir="down"
              style="width:32px;height:32px;border-radius:50%;border:1.5px solid ${userVoted === 'down' ? 'var(--color-error)' : 'var(--color-gray-200)'};background:${userVoted === 'down' ? 'rgba(239,68,68,0.1)' : 'none'};cursor:pointer;display:flex;align-items:center;justify-content:center;color:${userVoted === 'down' ? 'var(--color-error)' : 'var(--text-muted)'};"
              title="Vote down">${ICONS.arrowDown(14)}</button>
            ${isOwner && !a.accepted ? `
              <button class="accept-btn" data-answer-id="${a.id}"
                title="Đánh dấu là câu trả lời đúng"
                style="width:32px;height:32px;border-radius:50%;border:1.5px solid var(--color-success);background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--color-success);margin-top:4px;">
                ${ICONS.check(14)}
              </button>
            ` : ''}
          </div>

          <!-- Answer body -->
          <div style="flex:1;min-width:0;">
            <div style="color:var(--text-primary);line-height:1.7;font-size:0.95rem;">
              ${renderMarkdown(a.body)}
            </div>
            <div class="question-author" style="display:flex;align-items:center;gap:8px;margin-top:16px;padding:10px;background:var(--bg-secondary);border-radius:8px;">
              <div class="avatar" style="width:32px;height:32px;background:var(--color-primary);border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.78rem;font-weight:700;">${a.authorInitials || getInitials(a.author)}</div>
              <div>
                <div style="font-weight:600;color:var(--text-primary);font-size:0.85rem;">${a.author}</div>
                <div style="font-size:0.75rem;color:var(--text-muted);display:flex;align-items:center;gap:4px;">
                  ${ICONS.star(12)} ${a.reputation} reputation &nbsp;·&nbsp; ${timeAgo(a.date)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ── Modal: Ask Question ─────────────────────────

  function openAskModal() {
    const tags = ['Python', 'SQL', 'Pandas', 'NumPy', 'Statistics', 'Machine Learning', 'Data Cleaning', 'Visualization'];
    let selectedTags = [];

    openModal({
      title: 'Đặt câu hỏi mới',
      wide: true,
      content: `
        <div>
          <div class="form-group">
            <label class="form-label">Tiêu đề câu hỏi <span style="color:var(--color-error);">*</span></label>
            <input type="text" class="form-input" id="q-title" placeholder="Mô tả câu hỏi ngắn gọn, rõ ràng..." />
          </div>
          <div class="form-group" style="margin-top:16px;">
            <label class="form-label">Nội dung chi tiết <span style="color:var(--color-error);">*</span></label>
            <textarea class="form-textarea" id="q-body" rows="7"
              placeholder="Mô tả chi tiết vấn đề, code bạn đã thử, lỗi nhận được... (hỗ trợ Markdown)"
              style="resize:vertical;font-family:inherit;"></textarea>
          </div>
          <div class="form-group" style="margin-top:16px;">
            <label class="form-label">Tags (chọn tối đa 5)</label>
            <div id="tag-selector" style="display:flex;flex-wrap:wrap;gap:8px;margin-top:8px;">
              ${tags.map(t => `<button class="tag tag-select" data-tag="${t}" style="cursor:pointer;">${t}</button>`).join('')}
            </div>
            <div id="selected-tags-preview" style="margin-top:8px;font-size:0.82rem;color:var(--text-muted);">Chưa chọn tag nào</div>
          </div>
          <div style="display:flex;gap:12px;justify-content:flex-end;margin-top:20px;">
            <button class="btn btn-secondary" id="cancel-ask-btn">Hủy</button>
            <button class="btn btn-primary" id="submit-question-btn">Đăng câu hỏi</button>
          </div>
        </div>
      `,
    });

    // Tag selection
    document.querySelectorAll('.tag-select').forEach(btn => {
      btn.addEventListener('click', () => {
        const t = btn.dataset.tag;
        if (selectedTags.includes(t)) {
          selectedTags = selectedTags.filter(x => x !== t);
          btn.style.background = '';
          btn.style.color = '';
        } else if (selectedTags.length < 5) {
          selectedTags.push(t);
          btn.style.background = 'var(--color-primary)';
          btn.style.color = '#fff';
        }
        const preview = document.getElementById('selected-tags-preview');
        if (preview) preview.textContent = selectedTags.length ? selectedTags.join(', ') : 'Chưa chọn tag nào';
      });
    });

    document.getElementById('cancel-ask-btn')?.addEventListener('click', closeModal);

    document.getElementById('submit-question-btn')?.addEventListener('click', () => {
      const title = document.getElementById('q-title')?.value.trim();
      const body = document.getElementById('q-body')?.value.trim();
      if (!title) { showToast('Vui lòng nhập tiêu đề câu hỏi.', 'warning'); return; }
      if (!body) { showToast('Vui lòng nhập nội dung câu hỏi.', 'warning'); return; }
      submitQuestion(title, body, selectedTags);
    });
  }

  // ── Actions ────────────────────────────────────

  function submitQuestion(title, body, tags) {
    const currentUser = getState('user');
    const newQ = {
      id: `q_local_${Date.now()}`,
      title,
      body,
      tags,
      author: currentUser.name,
      authorInitials: currentUser.initials,
      reputation: currentUser.reputation || 0,
      votes: 0,
      answers: 0,
      views: 0,
      date: new Date().toISOString().split('T')[0],
      solved: false,
      userVoted: null,
    };

    updateState('localQuestions', (existing) => {
      const arr = Array.isArray(existing) ? existing : [];
      return [newQ, ...arr];
    });

    addXP(10, `Đặt câu hỏi: ${title}`);
    addActivity(`Đặt câu hỏi: "${title}"`);
    closeModal();
    showToast('Câu hỏi đã được đăng thành công! +10 XP', 'success');
    render();
  }

  function submitAnswer(questionId, body) {
    const currentUser = getState('user');
    const newAnswer = {
      id: `ans_local_${Date.now()}`,
      questionId,
      author: currentUser.name,
      authorInitials: currentUser.initials,
      reputation: currentUser.reputation || 0,
      body,
      votes: 0,
      userVoted: null,
      accepted: false,
      date: new Date().toISOString().split('T')[0],
    };

    updateState('localAnswers', (existing) => {
      const obj = existing && typeof existing === 'object' ? existing : {};
      return {
        ...obj,
        [questionId]: [newAnswer, ...(obj[questionId] || [])],
      };
    });

    addXP(20, 'Trả lời câu hỏi trong Q&A');
    addActivity(`Trả lời câu hỏi trong Q&A`);
    showToast('Câu trả lời đã được đăng! +20 XP', 'success');
    render();
  }

  function handleQuestionVote(questionId, dir) {
    const qState = getQuestionsState();
    const current = qState[questionId] || {};
    const question = getAllQuestions().find(q => q.id === questionId);
    const baseVotes = question ? question.votes : 0;
    const currentVotes = current.votes !== undefined ? current.votes : baseVotes;
    const prevVote = current.userVoted || null;

    let newVotes = currentVotes;
    let newVoted = null;

    if (prevVote === dir) {
      newVotes = currentVotes + (dir === 'up' ? -1 : 1);
      newVoted = null;
    } else {
      if (prevVote) newVotes = currentVotes + (dir === 'up' ? 2 : -2);
      else newVotes = currentVotes + (dir === 'up' ? 1 : -1);
      newVoted = dir;
    }

    updateState('questions', (qs) => ({
      ...(qs || {}),
      [questionId]: { ...current, votes: newVotes, userVoted: newVoted },
    }));

    if (newVoted === 'up') {
      addXP(5, 'Vote câu hỏi hay');
    }

    render();
  }

  function handleAnswerVote(answerId, dir) {
    const aState = getAnswersState();
    const current = aState[answerId] || {};

    let baseVotes = 0;
    for (const qId of Object.keys(ANSWERS)) {
      const found = ANSWERS[qId].find(a => a.id === answerId);
      if (found) { baseVotes = found.votes; break; }
    }
    if (!baseVotes) {
      const localAnswers = getState('localAnswers') || {};
      for (const qId of Object.keys(localAnswers)) {
        const found = (localAnswers[qId] || []).find(a => a.id === answerId);
        if (found) { baseVotes = found.votes; break; }
      }
    }

    const currentVotes = current.votes !== undefined ? current.votes : baseVotes;
    const prevVote = current.userVoted || null;

    let newVotes = currentVotes;
    let newVoted = null;

    if (prevVote === dir) {
      newVotes = currentVotes + (dir === 'up' ? -1 : 1);
      newVoted = null;
    } else {
      if (prevVote) newVotes = currentVotes + (dir === 'up' ? 2 : -2);
      else newVotes = currentVotes + (dir === 'up' ? 1 : -1);
      newVoted = dir;
    }

    updateState('answers', (as) => ({
      ...(as || {}),
      [answerId]: { ...current, votes: newVotes, userVoted: newVoted },
    }));

    if (newVoted === 'up') {
      addXP(2, 'Vote câu trả lời hay');
    }

    render();
  }

  function handleAcceptAnswer(questionId, answerId) {
    updateState('localAnswers', (existing) => {
      const obj = existing && typeof existing === 'object' ? existing : {};
      const list = obj[questionId] || [];
      return {
        ...obj,
        [questionId]: list.map(a => ({ ...a, accepted: a.id === answerId })),
      };
    });

    updateState('localQuestions', (existing) => {
      const arr = Array.isArray(existing) ? existing : [];
      return arr.map(q => q.id === questionId ? { ...q, solved: true } : q);
    });

    addXP(15, 'Chấp nhận câu trả lời');
    showToast('Đã đánh dấu câu trả lời là đúng! +15 XP', 'success');
    render();
  }

  // Initial render
  render();
}
