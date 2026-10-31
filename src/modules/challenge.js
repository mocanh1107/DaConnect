// ============================================
// DaConnect – Challenge Arena Module (Redesigned 65/35 & Gamified Leaderboard)
// ============================================

import { CHALLENGES } from '../data/mockData.js';
import { getState, updateState, addXP, addActivity } from '../main.js';
import { showToast } from '../components/toast.js';
import { ICONS } from '../components/icons.js';

// ── Extended 50-User Mock Leaderboard ──────────
const FULL_LEADERBOARD = [
  { rank: 1, name: 'Nguyễn Thanh Long', initials: 'TL', score: 8920, title: 'Lead Data Scientist', streak: 42 },
  { rank: 2, name: 'Trần Minh Phương', initials: 'MP', score: 7650, title: 'Senior Analytics Engineer', streak: 28 },
  { rank: 3, name: 'Lê Thị Ánh Tuyết', initials: 'AT', score: 6890, title: 'BI Specialist', streak: 35 },
  { rank: 4, name: 'Phạm Đức Anh', initials: 'DA', score: 5430, title: 'Data Engineer', streak: 19 },
  { rank: 5, name: 'Hoàng Quỳnh Anh', initials: 'QA', score: 4870, title: 'Data Analyst', streak: 15 },
  { rank: 6, name: 'Nguyễn Minh Khoa', initials: 'MK', score: 3850, title: 'Junior Data Analyst', isUser: true, streak: 7 },
  { rank: 7, name: 'Đặng Thị Loan', initials: 'TL', score: 3210, title: 'Data Enthusiast', streak: 12 },
  { rank: 8, name: 'Bùi Văn Hải', initials: 'VH', score: 2980, title: 'Product Analyst', streak: 9 },
  { rank: 9, name: 'Vũ Thị Ngân', initials: 'TN', score: 2450, title: 'Marketing Analyst', streak: 14 },
  { rank: 10, name: 'Đinh Văn Tùng', initials: 'VT', score: 1920, title: 'Data Student', streak: 6 },
  { rank: 11, name: 'Phan Hồng Sơn', initials: 'HS', score: 1810, title: 'Junior DA', streak: 5 },
  { rank: 12, name: 'Trần Bảo Ngọc', initials: 'BN', score: 1750, title: 'BI Analyst', streak: 11 },
  { rank: 13, name: 'Lê Hoàng Nam', initials: 'HN', score: 1690, title: 'Python Developer', streak: 4 },
  { rank: 14, name: 'Vũ Minh Trí', initials: 'MT', score: 1620, title: 'Data Scientist Intern', streak: 8 },
  { rank: 15, name: 'Đỗ Mai Chi', initials: 'MC', score: 1560, title: 'Business Analyst', streak: 10 },
  { rank: 16, name: 'Nguyễn Quốc Huy', initials: 'QH', score: 1500, title: 'Junior DA', streak: 3 },
  { rank: 17, name: 'Hà Thu Thảo', initials: 'TT', score: 1440, title: 'Student', streak: 7 },
  { rank: 18, name: 'Lý Gia Huy', initials: 'GH', score: 1390, title: 'Analytics Intern', streak: 5 },
  { rank: 19, name: 'Trịnh Bích Diệp', initials: 'BD', score: 1330, title: 'Junior BI', streak: 9 },
  { rank: 20, name: 'Đặng Tuấn Kiệt', initials: 'TK', score: 1280, title: 'Data Trainee', streak: 6 },
  { rank: 21, name: 'Võ Ngọc Hân', initials: 'NH', score: 1230, title: 'DA Student', streak: 8 },
  { rank: 22, name: 'Chu Đình Trọng', initials: 'DT', score: 1180, title: 'Data Analyst', streak: 4 },
  { rank: 23, name: 'Mai Khánh Linh', initials: 'KL', score: 1130, title: 'Product DA', streak: 12 },
  { rank: 24, name: 'Lâm Quang Vinh', initials: 'QV', score: 1090, title: 'Junior Analyst', streak: 3 },
  { rank: 25, name: 'Đoàn Yến Vy', initials: 'YV', score: 1040, title: 'Marketing DA', streak: 7 },
  { rank: 26, name: 'Tạ Thành Đạt', initials: 'TD', score: 990, title: 'Student', streak: 5 },
  { rank: 27, name: 'Quách Hải Đăng', initials: 'HD', score: 950, title: 'Data Trainee', streak: 6 },
  { rank: 28, name: 'Nghiêm Bảo Châu', initials: 'BC', score: 910, title: 'Business Analyst', streak: 4 },
  { rank: 29, name: 'Lương Hữu Phước', initials: 'HP', score: 870, title: 'Junior DA', streak: 2 },
  { rank: 30, name: 'Cao Thùy Dung', initials: 'TD', score: 830, title: 'BI Student', streak: 5 },
  { rank: 31, name: 'Thân Trọng Nghĩa', initials: 'TN', score: 790, title: 'Data Learner', streak: 3 },
  { rank: 32, name: 'Bạch Nhật Minh', initials: 'NM', score: 750, title: 'Student', streak: 4 },
  { rank: 33, name: 'Vương Trúc Linh', initials: 'TL', score: 710, title: 'Junior DA', streak: 6 },
  { rank: 34, name: 'Trương Vĩnh Khang', initials: 'VK', score: 680, title: 'Data Trainee', streak: 2 },
  { rank: 35, name: 'Đào Cẩm Tú', initials: 'CT', score: 650, title: 'Student', streak: 5 },
  { rank: 36, name: 'Dương Văn Hùng', initials: 'VH', score: 620, title: 'Junior Analyst', streak: 3 },
  { rank: 37, name: 'Tiêu Mỹ Uyên', initials: 'MU', score: 590, title: 'DA Learner', streak: 4 },
  { rank: 38, name: 'Khổng Minh Châu', initials: 'MC', score: 560, title: 'Student', streak: 2 },
  { rank: 39, name: 'Tôn Nữ Bích Nga', initials: 'BN', score: 530, title: 'Junior BI', streak: 1 },
  { rank: 40, name: 'La Chí Thiện', initials: 'CT', score: 500, title: 'Data Learner', streak: 3 },
  { rank: 41, name: 'Nhan Gia Bảo', initials: 'GB', score: 470, title: 'Student', streak: 4 },
  { rank: 42, name: 'Thiều Bảo Trang', initials: 'BT', score: 440, title: 'DA Trainee', streak: 2 },
  { rank: 43, name: 'Giáp Văn Thắng', initials: 'VT', score: 410, title: 'Junior Analyst', streak: 1 },
  { rank: 44, name: 'Uông Đình Hưng', initials: 'DH', score: 390, title: 'Student', streak: 2 },
  { rank: 45, name: 'Ân Thiên Phúc', initials: 'TP', score: 370, title: 'Data Learner', streak: 3 },
  { rank: 46, name: 'Sầm Ngọc Ánh', initials: 'NA', score: 350, title: 'Student', streak: 1 },
  { rank: 47, name: 'Mã Hữu Tài', initials: 'HT', score: 330, title: 'Junior DA', streak: 2 },
  { rank: 48, name: 'Cổ Gia Hân', initials: 'GH', score: 310, title: 'DA Trainee', streak: 1 },
  { rank: 49, name: 'Diệp Vĩnh Thụy', initials: 'VT', score: 290, title: 'Student', streak: 1 },
  { rank: 50, name: 'Tống Khánh Vy', initials: 'KV', score: 270, title: 'Newbie', streak: 1 },
];

function badgeClass(type) {
  return type === 'Daily' ? 'badge-warning' : 'badge-primary';
}

function badgeIcon(type) {
  return type === 'Daily' ? ICONS.zap(13) : ICONS.calendar(13);
}

function escapeHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ── Challenge Card ─────────────────────────────
function renderChallengeCard(challenge, container) {
  const challengesState = getState('challenges') || {};
  const cState          = challengesState[challenge.id] || {};
  const participated    = cState.participated || false;
  const submitted       = cState.score != null;
  const score           = cState.score;

  const card = document.createElement('div');
  card.className = 'challenge-card card';
  card.style.cssText = 'border-radius:20px;border:1px solid #E2E8F0;box-shadow:0 4px 16px rgba(0,0,0,0.03);overflow:hidden;';

  card.innerHTML = `
    <div class="challenge-header card-header" style="padding:18px 20px;background:linear-gradient(135deg, #0B192C 0%, #1E3E62 100%);color:#fff;">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
        <span class="badge ${badgeClass(challenge.type)}" style="display:inline-flex;align-items:center;gap:4px;font-weight:700;">
          ${badgeIcon(challenge.type)} ${challenge.type} Challenge
        </span>
        <span style="font-size:12px;color:rgba(255,255,255,0.7);display:inline-flex;align-items:center;gap:4px;">
          ${ICONS.clock(13)} Còn 06h 45m
        </span>
      </div>
      <div class="challenge-title card-title" style="margin-top:8px;font-size:1.15rem;font-weight:800;color:#fff;">
        ${challenge.title}
      </div>
      <div class="challenge-subtitle" style="color:#94A3B8;font-size:13px;margin-top:2px;">
        ${challenge.subtitle}
      </div>
    </div>

    <div class="challenge-body" style="padding:18px 20px;">
      <div style="font-size:13px;color:#475569;line-height:1.6;margin-bottom:14px;white-space:pre-line;">
        ${challenge.description.trim()}
      </div>

      <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:14px;padding:8px 12px;background:#F8FAFC;border-radius:10px;border:1px solid #E2E8F0;">
        <div class="challenge-points" style="display:flex;align-items:center;gap:6px;font-size:13px;color:#0284C7;font-weight:700;margin:0;">
          ${ICONS.zap(15)} +${challenge.xpReward} XP Thưởng
        </div>
        <div style="font-size:12px;color:#64748B;display:flex;align-items:center;gap:4px;">
          ${ICONS.clock(13)} Thời gian: ${challenge.timeLimit}
        </div>
      </div>

      <div style="margin-bottom:14px;">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#64748B;margin-bottom:6px;">
          Yêu cầu nghiệp vụ
        </div>
        <ul style="margin:0;padding-left:18px;font-size:12px;color:#475569;line-height:1.8;">
          ${challenge.requirements.map(r => `<li>${r}</li>`).join('')}
        </ul>
      </div>

      <div style="margin-bottom:14px;">
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#64748B;margin-bottom:6px;display:flex;align-items:center;gap:4px;">
          ${ICONS.database(13)} Dữ liệu mẫu (Sample Dataset)
        </div>
        <pre style="background:#0A192F;color:#7DD3FC;font-size:11px;padding:12px 14px;border-radius:10px;overflow-x:auto;max-height:110px;line-height:1.5;border:1px solid rgba(255,255,255,0.08);">${escapeHtml(challenge.dataset)}</pre>
      </div>

      ${submitted ? `
        <div style="background:linear-gradient(135deg, rgba(16,185,129,0.1), rgba(6,182,212,0.1));border:1px solid rgba(16,185,129,0.3);border-radius:12px;padding:14px;margin-bottom:14px;display:flex;align-items:center;gap:12px;">
          <div style="color:#10B981;display:flex;">${ICONS.trophy(28)}</div>
          <div>
            <div style="font-size:14px;font-weight:700;color:#059669;">Điểm số hoàn thành: ${score}/100</div>
            <div style="font-size:12px;color:#475569;margin-top:2px;">
              ${score >= 90 ? 'Xuất sắc!' : score >= 80 ? 'Rất tốt!' : 'Đã hoàn thành!'} +${challenge.xpReward} XP đã được cộng vào tài khoản của bạn.
            </div>
          </div>
        </div>
      ` : ''}

      <div class="challenge-action-area" data-cid="${challenge.id}">
        ${!participated
          ? `<button class="btn btn-primary" style="width:100%;padding:10px;font-weight:700;border-radius:12px;" data-action="join" data-cid="${challenge.id}">
               Tham gia thử thách ngay
             </button>`
          : !submitted
          ? `
            <div style="font-size:12px;font-weight:700;color:var(--color-primary);margin-bottom:8px;display:flex;align-items:center;gap:6px;">
              ${ICONS.checkCircle(14)} Đã đăng ký — Điền kết quả giải pháp của bạn:
            </div>
            <textarea
              class="challenge-answer-textarea"
              data-cid="${challenge.id}"
              placeholder="Mô tả giải pháp, code Python/SQL hoặc kết quả phân tích số liệu..."
              style="width:100%;box-sizing:border-box;min-height:85px;padding:10px 12px;background:#F8FAFC;border:1px solid #CBD5E1;border-radius:10px;font-size:12px;line-height:1.5;resize:vertical;color:#1E293B;"
            ></textarea>
            <button class="btn btn-primary" style="width:100%;margin-top:8px;padding:10px;font-weight:700;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;gap:6px;" data-action="submit" data-cid="${challenge.id}">
              ${ICONS.send(14)} Nộp bài & Nhận điểm
            </button>
          `
          : `<button class="btn btn-secondary" disabled style="width:100%;opacity:.7;cursor:not-allowed;border-radius:12px;display:inline-flex;align-items:center;justify-content:center;gap:6px;">
               ${ICONS.checkCircle(14)} Đã nộp bài thành công
             </button>`
        }
      </div>
    </div>
  `;

  return card;
}

// ── Gamified Leaderboard Card ──────────────────
function renderGamifiedLeaderboard(showAll = false) {
  const user = getState('user') || {};
  const currentInitials = user.initials || 'MK';

  const userRankEntry = FULL_LEADERBOARD.find(e => e.isUser || e.initials === currentInitials) || FULL_LEADERBOARD[5];
  const userRank = userRankEntry.rank;
  const prevRankEntry = FULL_LEADERBOARD[userRank - 2] || FULL_LEADERBOARD[4];
  const xpNeeded = prevRankEntry.score - userRankEntry.score + 10;

  const displayList = showAll ? FULL_LEADERBOARD : FULL_LEADERBOARD.slice(0, 10);

  const rows = displayList.map(entry => {
    const isCurrent = entry.isUser || entry.initials === currentInitials;
    const isTop1 = entry.rank === 1;
    const isTop2 = entry.rank === 2;
    const isTop3 = entry.rank === 3;

    let rowClass = 'leaderboard-item-row';
    let rankBadge = '';

    if (isTop1) {
      rowClass += ' leaderboard-row-top1';
      rankBadge = `<span style="display:inline-flex;color:#D97706;" title="Top 1 Quán Quân">${ICONS.trophy(18)}</span>`;
    } else if (isTop2) {
      rowClass += ' leaderboard-row-top2';
      rankBadge = `<span style="display:inline-flex;color:#64748B;" title="Top 2 Á Quân">${ICONS.award(18)}</span>`;
    } else if (isTop3) {
      rowClass += ' leaderboard-row-top3';
      rankBadge = `<span style="display:inline-flex;color:#B45309;" title="Top 3 Quý Quân">${ICONS.award(18)}</span>`;
    } else {
      rankBadge = `<span style="font-size:12px;font-weight:700;color:#94A3B8;">#${entry.rank}</span>`;
    }

    if (isCurrent && !isTop1 && !isTop2 && !isTop3) {
      rowClass += ' leaderboard-row-current';
    }

    let avatarBg = '#475569';
    let avatarBorder = 'rgba(255,255,255,0.2)';
    if (isTop1) { avatarBg = 'linear-gradient(135deg, #F59E0B, #D97706)'; avatarBorder = '#FCD34D'; }
    else if (isTop2) { avatarBg = 'linear-gradient(135deg, #94A3B8, #64748B)'; avatarBorder = '#E2E8F0'; }
    else if (isTop3) { avatarBg = 'linear-gradient(135deg, #D97706, #B45309)'; avatarBorder = '#FED7AA'; }
    else if (isCurrent) { avatarBg = 'linear-gradient(135deg, #0284C7, #0369A1)'; avatarBorder = '#38BDF8'; }

    return `
      <div class="${rowClass}">
        <!-- Rank Icon / Number -->
        <div style="width:30px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          ${rankBadge}
        </div>

        <!-- Avatar -->
        <div style="width:34px;height:34px;border-radius:50%;background:${avatarBg};border:1.5px solid ${avatarBorder};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:white;flex-shrink:0;box-shadow:0 2px 6px rgba(0,0,0,0.1);">
          ${entry.initials}
        </div>

        <!-- Name & Title -->
        <div style="flex:1;min-width:0;">
          <div style="font-size:13px;font-weight:${isCurrent ? '800' : '600'};color:${isCurrent ? '#0284C7' : '#0F172A'};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
            ${entry.name} ${isCurrent ? '<span style="font-size:11px;padding:1px 6px;border-radius:99px;background:#0284C7;color:#fff;font-weight:700;margin-left:4px;">Bạn</span>' : ''}
          </div>
          <div style="font-size:11px;color:#64748B;display:flex;align-items:center;gap:6px;">
            <span>${entry.title}</span>
            <span style="display:inline-flex;align-items:center;gap:2px;color:#F97316;">${ICONS.flame(11)} ${entry.streak}d</span>
          </div>
        </div>

        <!-- XP Badge -->
        <div style="text-align:right;flex-shrink:0;">
          <div style="font-size:13px;font-weight:800;color:${isTop1 ? '#B45309' : isCurrent ? '#0284C7' : '#1E293B'};display:inline-flex;align-items:center;gap:3px;">
            ${entry.score.toLocaleString()} <span style="font-size:10px;font-weight:600;color:#64748B;">XP</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="gamified-leaderboard-card">
      <!-- Header -->
      <div style="padding:18px 20px 14px;border-bottom:1px solid #F1F5F9;background:#FAFAFA;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="color:#F59E0B;display:flex;">${ICONS.trophy(20)}</span>
            <span style="font-size:1.05rem;font-weight:800;color:var(--color-navy);">Bảng Xếp Hạng Mùa Giải</span>
          </div>
          <span style="font-size:11px;font-weight:700;padding:3px 9px;border-radius:99px;background:#EFF6FF;color:#1D4ED8;border:1px solid #BFDBFE;display:inline-flex;align-items:center;gap:5px;">
            <span style="width:7px;height:7px;border-radius:50%;border:1.5px solid #10B981;display:inline-block;"></span> Top 50 Thi Đấu
          </span>
        </div>
        <div style="font-size:12px;color:#64748B;">
          Đua top hàng tuần để nhận huy hiệu độc quyền và cơ hội tuyển dụng!
        </div>
      </div>

      <!-- Scrollable List -->
      <div class="leaderboard-scroll-box" id="leaderboard-scroll-box">
        ${rows}
      </div>

      <!-- Expand / Collapse Button -->
      <div style="padding:10px 16px;background:#F8FAFC;border-top:1px solid #F1F5F9;text-align:center;">
        <button id="toggle-top50-btn" style="background:none;border:none;color:#0284C7;font-size:12px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
          ${showAll ? `${ICONS.arrowUp(13)} Thu gọn (Top 10)` : `${ICONS.arrowDown(13)} Mở rộng xem đủ Top 50`}
        </button>
      </div>

      <!-- Sticky User Row (Ghim vị trí người dùng ở chân bảng) -->
      <div class="leaderboard-sticky-user">
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="width:26px;height:26px;border-radius:50%;background:#0284C7;color:#fff;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;">
            #${userRank}
          </div>
          <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg, #0284C7, #0B1533);color:#fff;font-size:11px;font-weight:800;display:flex;align-items:center;justify-content:center;border:2px solid #93C5FD;">
            ${userRankEntry.initials}
          </div>
          <div>
            <div style="font-size:13px;font-weight:800;color:#1E3A8A;">
              ${userRankEntry.name} (Bạn)
            </div>
            <div style="font-size:11px;color:#2563EB;font-weight:600;display:flex;align-items:center;gap:4px;">
              <span style="display:inline-flex;color:#F59E0B;">${ICONS.zap(12)}</span> Cần +${xpNeeded.toLocaleString()} XP để vượt #${userRank - 1} (${prevRankEntry.name})
            </div>
          </div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:14px;font-weight:800;color:#1D4ED8;">
            ${userRankEntry.score.toLocaleString()} XP
          </div>
          <span style="font-size:10px;font-weight:700;color:#059669;background:#DCFCE7;padding:1px 6px;border-radius:4px;">Hạng 6</span>
        </div>
      </div>
    </div>
  `;
}

// ── Main Render ────────────────────────────────
export function renderChallenge(container, navigate) {
  let isShowAll = false;
  const dailyChallenges  = CHALLENGES.filter(c => c.type === 'Daily');
  const weeklyChallenges = CHALLENGES.filter(c => c.type === 'Weekly');

  function renderView() {
    container.innerHTML = `
      <div class="page-header" style="margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px;">
          <div>
            <div style="display:inline-flex;align-items:center;gap:6px;padding:3px 12px;border-radius:99px;font-size:11px;font-weight:700;background:rgba(2,132,199,0.1);color:#0284C7;border:1px solid rgba(2,132,199,0.2);margin-bottom:6px;">
              ${ICONS.zap(13)} Season 2026 • AI & Data Competition Arena
            </div>
            <h1 style="font-size:1.8rem;font-weight:800;color:var(--color-navy);margin:0 0 6px;display:flex;align-items:center;gap:10px;">
              ${ICONS.challenge(26)} Đấu trường Thử thách (Challenge Arena)
            </h1>
            <p style="margin:0;font-size:14px;color:var(--color-gray-500);max-width:700px;">
              Giải quyết bài toán kinh doanh thực tế, làm sạch dữ liệu nhiễu và thi đua trực tiếp trên Bảng xếp hạng Data Analysts.
            </p>
          </div>
          <div style="display:flex;gap:10px;align-items:center;">
            <span style="padding:6px 14px;border-radius:12px;background:#F1F5F9;font-size:12px;font-weight:600;color:#475569;display:inline-flex;align-items:center;gap:5px;">
              ${ICONS.flame(13)} 12 Thử thách đang mở
            </span>
          </div>
        </div>
      </div>

      <!-- Responsive 65% / 35% Layout -->
      <div class="challenge-page-grid">
        <!-- CỘT TRÁI (~65% width): Danh sách thử thách -->
        <div>
          <!-- Daily Challenges Section -->
          <div style="margin-bottom:28px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
              <h2 style="font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:.07em;color:var(--color-navy);margin:0;display:flex;align-items:center;gap:6px;">
                ${ICONS.zap(16)} Thử thách hàng ngày (Daily Challenge)
              </h2>
              <span style="font-size:12px;color:#0284C7;font-weight:600;">Làm mới mỗi ngày lúc 00:00</span>
            </div>
            <div id="daily-challenges-grid" style="display:grid;grid-template-columns:1fr;gap:18px;"></div>
          </div>

          <!-- Weekly Challenges Section -->
          <div style="margin-bottom:24px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
              <h2 style="font-size:14px;font-weight:800;text-transform:uppercase;letter-spacing:.07em;color:var(--color-navy);margin:0;display:flex;align-items:center;gap:6px;">
                ${ICONS.calendar(16)} Thử thách hàng tuần (Weekly Challenge)
              </h2>
              <span style="font-size:12px;color:#64748B;">Tổng thưởng đến +500 XP</span>
            </div>
            <div id="weekly-challenges-grid" style="display:grid;grid-template-columns:1fr;gap:18px;"></div>
          </div>
        </div>

        <!-- CỘT PHẢI (~35% width): Bảng xếp hạng Gamified Leaderboard Card chạy song song -->
        <div id="leaderboard-column">
          ${renderGamifiedLeaderboard(isShowAll)}
        </div>
      </div>
    `;

    const dailyGrid  = container.querySelector('#daily-challenges-grid');
    const weeklyGrid = container.querySelector('#weekly-challenges-grid');

    dailyChallenges.forEach(c => {
      dailyGrid.appendChild(renderChallengeCard(c, container));
    });

    weeklyChallenges.forEach(c => {
      weeklyGrid.appendChild(renderChallengeCard(c, container));
    });

    // Toggle Top 50 / Top 10
    container.querySelector('#toggle-top50-btn')?.addEventListener('click', () => {
      isShowAll = !isShowAll;
      const lbCol = container.querySelector('#leaderboard-column');
      if (lbCol) {
        lbCol.innerHTML = renderGamifiedLeaderboard(isShowAll);
        attachLeaderboardEvents();
      }
    });

    attachLeaderboardEvents();
  }

  function attachLeaderboardEvents() {
    container.querySelector('#toggle-top50-btn')?.addEventListener('click', () => {
      isShowAll = !isShowAll;
      const lbCol = container.querySelector('#leaderboard-column');
      if (lbCol) {
        lbCol.innerHTML = renderGamifiedLeaderboard(isShowAll);
        attachLeaderboardEvents();
      }
    });
  }

  renderView();

  // Event delegation for Challenge Actions
  container.addEventListener('click', e => {
    const joinBtn = e.target.closest('[data-action="join"]');
    if (joinBtn) {
      const cid = joinBtn.dataset.cid;
      const challenge = CHALLENGES.find(c => c.id === cid);
      if (!challenge) return;

      updateState('challenges', prev => ({
        ...(prev || {}),
        [cid]: { ...(prev?.[cid] || {}), participated: true },
      }));

      addActivity(`Tham gia thử thách: ${challenge.title}`);
      showToast(`Đã tham gia "${challenge.title}"! Hãy đọc yêu cầu và nộp bài.`, 'success');
      renderView();
      return;
    }

    const submitBtn = e.target.closest('[data-action="submit"]');
    if (submitBtn) {
      const cid = submitBtn.dataset.cid;
      const challenge = CHALLENGES.find(c => c.id === cid);
      if (!challenge) return;

      const textarea = container.querySelector(`.challenge-answer-textarea[data-cid="${cid}"]`);
      const answer = (textarea?.value || '').trim();

      if (!answer) {
        showToast('Vui lòng nhập giải pháp trước khi nộp!', 'error');
        return;
      }

      const score = Math.floor(Math.random() * 21) + 80; // 80 - 100
      updateState('challenges', prev => ({
        ...(prev || {}),
        [cid]: { ...(prev?.[cid] || {}), score, answer, submittedAt: new Date().toISOString() },
      }));

      addXP(challenge.xpReward, `Hoàn thành thử thách ${challenge.title}`);
      addActivity(`Nộp bài thử thách "${challenge.title}" - Đạt ${score}/100 điểm`);
      showToast(`Nộp bài thành công! Điểm số: ${score}/100 (+${challenge.xpReward} XP)`, 'success');
      renderView();
      return;
    }
  });
}
