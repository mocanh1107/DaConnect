// ============================================
// DaConnect – Dashboard Module (Redesigned Modern Gamified)
// ============================================

import { getState } from '../main.js';
import { CHALLENGES, JOBS, EXERCISES } from '../data/mockData.js';
import { ICONS } from '../components/icons.js';

const SKILL_NAMES = {
  py: 'Python Fundamentals',
  np: 'NumPy Arrays & Matrices',
  pd: 'Pandas Data Manipulation',
  dc: 'Data Cleaning & Preprocessing',
  dt: 'Data Transformation & Features',
  sql1: 'SQL Query Fundamentals',
  sql2: 'SQL Aggregations & Joins',
  eda: 'Exploratory Data Analysis',
  stat: 'Applied Statistics & Testing',
  viz: 'Data Visualization & Charts',
  bm: 'Business Metrics & KPIs',
  story: 'Data Storytelling & Briefs',
  proj: 'Final DA Capstone Project',
  port: 'Portfolio & Showcase',
};

const SKILL_KEYS = Object.keys(SKILL_NAMES);

// Simulated 7-day activity heights (percentages)
const WEEK_ACTIVITY = [40, 70, 55, 90, 35, 80, 60];
const WEEK_DAYS = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];

function getActivityIcon(text) {
  if (text.includes('Hoàn thành') || text.includes('thành công')) {
    return {
      icon: ICONS.checkCircle(16),
      bg: 'rgba(16, 185, 129, 0.12)',
      color: '#10B981',
      border: 'rgba(16, 185, 129, 0.25)',
    };
  }
  if (text.includes('Bắt đầu') || text.includes('Python') || text.includes('NumPy')) {
    return {
      icon: ICONS.terminal(16),
      bg: 'rgba(2, 132, 199, 0.12)',
      color: '#0284C7',
      border: 'rgba(2, 132, 199, 0.25)',
    };
  }
  if (text.includes('thử thách') || text.includes('Challenge')) {
    return {
      icon: ICONS.zap(16),
      bg: 'rgba(245, 158, 11, 0.12)',
      color: '#F59E0B',
      border: 'rgba(245, 158, 11, 0.25)',
    };
  }
  return {
    icon: ICONS.book(16),
    bg: 'rgba(139, 92, 246, 0.12)',
    color: '#8B5CF6',
    border: 'rgba(139, 92, 246, 0.25)',
  };
}

export function renderDashboard(container, navigate) {
  const state = getState();
  const user = state.user || {};
  const skills = state.skills || {};
  const exercises = state.exercises || {};
  const activities = state.activities || [];

  // Compute stats
  const totalSkills = SKILL_KEYS.length;
  const completedSkills = SKILL_KEYS.filter(k => {
    const skillExercises = EXERCISES.filter(ex => ex.nodeId === k);
    return skillExercises.length > 0 && skillExercises.every(ex => exercises[ex.id]?.solved);
  }).length;
  const learningProgress = Math.round((completedSkills / totalSkills) * 100);
  const totalXP = user.xp || 3950;
  const streakDays = user.streak || 7;

  // Get skill progress per skill based on solved exercises
  function getSkillProgress(skillKey) {
    const skillExercises = EXERCISES.filter(ex => ex.nodeId === skillKey);
    if (skillExercises.length === 0) return 0;
    const solved = skillExercises.filter(ex => exercises[ex.id]?.solved).length;
    return Math.min(100, Math.round((solved / skillExercises.length) * 100));
  }

  // Pick 2 featured challenges
  const featuredChallenges = (CHALLENGES || []).slice(0, 2);

  container.innerHTML = `
<!-- 1. HERO ZONE (Tối ưu biên độ ngang max-w-6xl & Khóa chiều cao 350px chuẩn 100vh) -->
    <div class="dashboard-brilliant-hero flex flex-col items-center justify-between text-center py-2.5 md:py-3 px-6 md:px-8 relative overflow-hidden bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm">
      <div class="brilliant-hero-ambient-glow"></div>
      <div class="brilliant-hero-math-grid"></div>

      <!-- Trục tọa độ ngang 100% chạy dài từ mép trái sang mép phải -->
      <div class="brilliant-full-axis axis-top">
        <div class="brilliant-full-axis-line">
          <div class="brilliant-full-axis-ticks">
            ${Array.from({ length: 54 }).map(() => '<span></span>').join('')}
          </div>
        </div>
      </div>

      <!-- Header Top Row: Badge bên góc trái trên & Ngày tháng bên góc phải trên như cũ -->
      <div class="brilliant-hero-top-row w-full flex items-center justify-between z-10 px-1 mb-1">
        <!-- Badge bên góc trái trên như cũ -->
        <div class="brilliant-hero-top-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200/70 text-orange-600 text-[11px] font-bold tracking-wide uppercase shadow-xs">
          ${ICONS.sparkles ? ICONS.sparkles(12) : ICONS.zap(12)}
          <span>HỌC TẬP TƯƠNG TÁC THẾ HỆ MỚI <span class="hidden sm:inline">• BRILLIANT DATA LEARNING</span></span>
        </div>

        <!-- Góc phải trên: Ngày tháng (đã bỏ Xin chào) -->
        <div class="brilliant-hero-user-pinned text-xs text-slate-500 font-medium flex items-center gap-1.5">
          <span class="inline-flex items-center gap-1.5">${ICONS.calendar(12)} Hôm nay, ${new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric' })}</span>
        </div>
      </div>

      <!-- Khung Typography trung tâm (Mở rộng max-w-5xl md:max-w-6xl, Tỷ lệ chuẩn Brilliant) -->
      <div class="brilliant-typo-stage w-full max-w-5xl md:max-w-6xl mx-auto text-center relative select-none z-10">
        <!-- Dòng 1: "Learn Data" với đồ họa cột tím bên trái và đường hồi quy cam dạt sang phải -->
        <div class="brilliant-row-1 text-4xl sm:text-5xl md:text-6xl lg:text-[5.15rem] font-serif font-black tracking-tight text-slate-900 leading-[0.92] flex items-baseline justify-center relative">
          <!-- Cụm bên trái chữ "Learn": Cột biểu đồ tím và slider dạt hẳn sang cánh trái -->
          <span class="word-learn-wrap relative inline-flex items-baseline">
            <svg class="svg-histogram-slider" style="opacity:0.45;" viewBox="0 0 240 115" aria-hidden="true">
              <defs>
                <linearGradient id="histGrad1" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stop-color="#818CF8" stop-opacity="0.3" />
                  <stop offset="100%" stop-color="#818CF8" stop-opacity="0.75" />
                </linearGradient>
                <linearGradient id="histGrad2" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stop-color="#6366F1" stop-opacity="0.4" />
                  <stop offset="100%" stop-color="#6366F1" stop-opacity="0.85" />
                </linearGradient>
                <linearGradient id="histGrad3" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stop-color="#4F46E5" stop-opacity="0.5" />
                  <stop offset="100%" stop-color="#4F46E5" stop-opacity="0.95" />
                </linearGradient>
              </defs>
              <!-- 6 Cột biểu đồ dạt sang mép ngoài bên trái -->
              <rect x="8" y="65" width="13" height="42" rx="3" fill="url(#histGrad1)" />
              <rect x="27" y="48" width="13" height="59" rx="3" fill="url(#histGrad1)" />
              <rect x="46" y="30" width="14" height="77" rx="3" fill="url(#histGrad2)" />
              <rect x="66" y="14" width="15" height="93" rx="3" fill="url(#histGrad3)" />
              <rect x="87" y="42" width="13" height="65" rx="3" fill="url(#histGrad2)" />
              <rect x="106" y="60" width="13" height="47" rx="3" fill="url(#histGrad1)" />
              <!-- Thanh nét đứt dóng sang trái lên badge 85% -->
              <line x1="66" y1="14" x2="4" y2="14" stroke="#6366F1" stroke-width="1.5" stroke-dasharray="3,3" />
              <g transform="translate(2, 6)">
                <rect x="0" y="0" width="34" height="16" rx="8" fill="#EEF2FF" stroke="#6366F1" stroke-width="1.2" />
                <text x="17" y="11.5" font-size="8.5" font-weight="800" fill="#4F46E5" text-anchor="middle" font-family="system-ui, sans-serif">85%</text>
              </g>
              <!-- Nút trượt slider ◂ ▸ -->
              <circle cx="73" cy="14" r="6" fill="#FFFFFF" stroke="#4F46E5" stroke-width="2" />
              <circle cx="73" cy="14" r="2" fill="#4F46E5" />
              <text x="73" y="110" font-size="8.5" fill="#6366F1" font-weight="700" text-anchor="middle">◂ ▸</text>
            </svg>
            <span class="serif-text">Learn</span>
          </span>

          <span class="word-spacing">&nbsp;</span>

          <!-- Chữ "Data" kết hợp Đường hồi quy cam luồn sau chữ vươn ra ngoài -->
          <span class="word-data-wrap relative inline-flex items-baseline">
            <!-- Dedicated Container: Đường hồi quy cam nằm phía sau chữ (z-index: 1), điểm bắt đầu luồn sau chữ "Data" -->
            <div class="hero-chart-orange-zone" aria-hidden="true">
              <svg class="svg-orange-trend" viewBox="0 0 225 90">
                <defs>
                  <linearGradient id="regGradPure" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stop-color="#F97316" stop-opacity="0.45" />
                    <stop offset="55%" stop-color="#FF5B18" />
                    <stop offset="100%" stop-color="#EA580C" />
                  </linearGradient>
                  <filter id="beaconGlowPure" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3.5" flood-color="#FF5B18" flood-opacity="0.8" />
                  </filter>
                </defs>
                <!-- Trục dóng ngang nét đứt -->
                <line x1="8" y1="74" x2="220" y2="74" stroke="#E2E8F0" stroke-width="1.1" stroke-dasharray="3,3" />
                <!-- Đường hồi quy dốc nhẹ từ sau chữ "Data" (x=10, y=72) vươn ra ngoài (x=218, y=22) -->
                <line x1="10" y1="72" x2="218" y2="22" stroke="url(#regGradPure)" stroke-width="2.1" stroke-linecap="round" />
                <!-- Beacon circle ở điểm kết thúc ngoài vùng chữ (218, 22) - vượt mép chữ ~146px -->
                <circle cx="218" cy="22" r="8" fill="none" stroke="#FF5B18" stroke-width="1.3" stroke-dasharray="2,2" opacity="0.65" />
                <circle cx="218" cy="22" r="3.2" fill="#FF5B18" filter="url(#beaconGlowPure)" />
                <circle cx="218" cy="22" r="1.2" fill="#FFFFFF" />
                <!-- Các điểm dữ liệu cam tiết chế (chỉ đặt ngoài vùng chữ x > 72) -->
                <circle cx="86" cy="55" r="2.3" fill="#FF5B18" opacity="0.55" />
                <circle cx="112" cy="48" r="2.4" fill="#FF5B18" opacity="0.55" />
                <circle cx="138" cy="42" r="2.3" fill="#FF5B18" opacity="0.55" />
                <circle cx="166" cy="35" r="2.4" fill="#FF5B18" opacity="0.55" />
                <circle cx="192" cy="28" r="2.3" fill="#FF5B18" opacity="0.55" />
                <circle cx="124" cy="56" r="2.0" fill="#FF5B18" opacity="0.45" />
                <circle cx="180" cy="40" r="2.0" fill="#FF5B18" opacity="0.45" />
              </svg>
              <!-- Badge R² = 0.94 nằm ngoài vùng chữ, dưới đường cam >= 12px, sắc nét -->
              <span class="trendline-r2-badge">R<sup>2</sup> = 0.94</span>
            </div>
            <span class="serif-text">Data</span>
          </span>
        </div>

        <!-- Cụm 3 Pills code nằm lồng gọn trong khe hẹp (my-1 md:my-1.5, scale-90 sm:scale-95) -->
        <div class="brilliant-floating-pills flex items-center justify-center gap-2 my-1 scale-[0.80] sm:scale-[0.85] opacity-80">
          <div class="code-pill pill-query rounded-md text-xs font-mono shadow-xs" title="df.filter(active == True)">
            <span class="code-df">df</span><span class="code-op">.filter</span>(<span class="code-arg">active == True</span>) <span class="code-dropdown">▾</span>
          </div>
          <div class="code-pill pill-loop rounded-md text-xs font-mono shadow-xs" title="while practicing:">
            <span class="code-pulse-dot"></span>
            <span class="code-kw">while</span> practicing:
          </div>
          <div class="code-pill pill-yield rounded-md text-xs font-mono shadow-xs" title="yield data_insight">
            <span class="code-sparkle">✦</span>
            <span class="code-kw">yield</span> data_insight
          </div>
        </div>

        <!-- Dòng 2: "by doing" với đường sóng xanh dạt sang phải (cách chữ >= 24px) -->
        <div class="brilliant-row-2 text-4xl sm:text-5xl md:text-6xl lg:text-[5.15rem] font-serif font-black tracking-tight text-slate-900 leading-[0.92] flex items-baseline justify-center">
          <span class="serif-text">by</span>
          <span class="word-spacing">&nbsp;</span>
          <!-- Chữ "doing" kết hợp Đường sóng xanh luồn sau chữ vươn ra ngoài -->
          <span class="word-doing-wrap relative inline-flex items-baseline">
            <!-- Dedicated Container: Đường sóng xanh nằm phía sau chữ (z-index: 1), nhô lên gần mép phải chữ rồi hạ nhẹ -->
            <div class="hero-chart-blue-zone" aria-hidden="true">
              <svg class="svg-blue-curve" viewBox="0 0 190 68">
                <defs>
                  <linearGradient id="cyanBlueGradPure" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="#0284C7" />
                    <stop offset="50%" stop-color="#06B6D4" />
                    <stop offset="100%" stop-color="#38BDF8" />
                  </linearGradient>
                  <filter id="cyanNodeGlowPure" x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="0" stdDeviation="2.5" flood-color="#0EA5E9" flood-opacity="0.7" />
                  </filter>
                </defs>
                <line x1="4" y1="50" x2="186" y2="50" stroke="#E2E8F0" stroke-width="1.1" />
                <!-- Bước sóng cong: luồn sau 'doing' (x=8, y=50), nhô lên gần mép phải chữ (x=70, y=20), hạ nhẹ ra ngoài (x=184, y=50) -->
                <path d="M 8 50 C 28 50, 48 34, 70 20 C 94 6, 124 18, 146 34 C 164 47, 174 50, 184 50" 
                      fill="none" stroke="url(#cyanBlueGradPure)" stroke-width="2.2" stroke-linecap="round" />
                <!-- Đường dóng nét đứt rơi xuống trục hoành từ đỉnh (x=70, y=20) -->
                <line x1="70" y1="20" x2="70" y2="50" stroke="#0284C7" stroke-width="1.2" stroke-dasharray="2.5,2.5" />
                <circle cx="70" cy="20" r="2.4" fill="#0284C7" />
                <!-- Chấm tròn xanh phát sáng ở điểm kết thúc (184, 50) - vượt mép chữ ~136px -->
                <circle cx="184" cy="50" r="5.5" fill="none" stroke="#0EA5E9" stroke-width="1.2" stroke-dasharray="2,2" opacity="0.65" />
                <circle cx="184" cy="50" r="2.6" fill="#0EA5E9" filter="url(#cyanNodeGlowPure)" />
                <circle cx="184" cy="50" r="1.2" fill="#FFFFFF" />
              </svg>
            </div>
            <span class="serif-text">doing</span>
          </span>
        </div>
      </div>

      <!-- Khu vực chân Banner: Cụm 2 nút CTA chuẩn Brilliant (tinh gọn kích thước và shadow) -->
      <div class="brilliant-hero-footer flex items-center justify-center text-center w-full z-10 mt-1.5 md:mt-2">
        <div class="brilliant-hero-btn-group flex items-center justify-center gap-2.5">
          <!-- CTA 1: Nút chính tinh gọn -->
          <button class="brilliant-btn-primary px-5 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-xs md:text-sm shadow-sm shadow-orange-500/20 hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer" data-nav="explore">
            <span>Bắt đầu học ngay</span>
            <span class="btn-arrow text-sm leading-none">&rarr;</span>
          </button>
          <!-- CTA 2: Link phụ nhẹ nhàng -->
          <button class="brilliant-btn-secondary px-4 py-2 rounded-full border border-slate-300 text-slate-700 bg-white hover:bg-slate-50 font-medium text-xs md:text-sm flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs" data-nav="roadmap">
            ${ICONS.roadmap(13)}
            <span>Khám phá Roadmap</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 2. CỤM 3 THẺ CHỈ SỐ TRỌNG TÂM (GAMIFIED DOME CARDS) - Cao cố định, Chuẩn hóa 4 tầng đối xứng -->
    <div class="gamified-stats-grid">
      <!-- Thẻ 1 (Bên trái): Điểm Tích Lũy (#163959 / #235882 / Accent #38BDF8 / Link #BAE6FD) -->
      <div class="gamified-dome-card dome-xp" data-nav="challenge" title="Bấm để xem Bảng xếp hạng" tabindex="0">
        <!-- Tầng 1: Icon vòng tròn 36px, icon 20px -->
        <div class="dome-icon-row">
          <div class="dome-icon-circle" style="color:#38BDF8; background:rgba(56,189,248,0.12);">
            ${ICONS.star(20)}
          </div>
        </div>
        <!-- Tầng 2: Tiêu đề 12px 700 uppercase -->
        <div class="dome-title-row">
          <div class="dome-title" style="color:#BAE6FD;">Điểm Tích Lũy & Hạng</div>
        </div>
        <!-- Tầng 3: Khung nội dung chính cao thống nhất 64px -->
        <div class="dome-main-zone">
          <div class="dome-stat-number" style="color:#F0F9FF;">
            ${totalXP.toLocaleString()} <span class="dome-stat-unit" style="color:#38BDF8;">XP</span>
          </div>
          <div class="dome-pill-badge" style="background:rgba(56,189,248,0.12); border:1px solid rgba(56,189,248,0.25); color:#BAE6FD;">
            ${ICONS.award(11)} Hạng: ${user.rank || 'Silver II'}
          </div>
        </div>
        <!-- Tầng 4: Link chân thẻ 14px 600 -->
        <div class="dome-footer-row">
          <span class="dome-link" style="color:#BAE6FD;">Xem Bảng xếp hạng &rarr;</span>
        </div>
      </div>

      <!-- Thẻ 2 (Ở giữa): Chuỗi Ngày Học (Gradient Cam Cháy Năng Lượng, Chữ Trắng, Link Trắng 14px 600) -->
      <div class="gamified-dome-card dome-streak" data-nav="roadmap" title="Bấm để xem lịch chuỗi học tập" tabindex="0">
        <!-- Tầng 1: Icon vòng tròn 36px, icon 20px -->
        <div class="dome-icon-row">
          <div class="dome-icon-circle" style="color:#FDE68A; background:rgba(255,255,255,0.12);">
            ${ICONS.flame(20)}
          </div>
        </div>
        <!-- Tầng 2: Tiêu đề 12px 700 uppercase -->
        <div class="dome-title-row">
          <div class="dome-title" style="color:#FFEDD5;">Chuỗi Ngày Học</div>
        </div>
        <!-- Tầng 3: Khung nội dung chính cao thống nhất 64px -->
        <div class="dome-main-zone">
          <div class="dome-stat-number" style="color:#FFFFFF;">
            ${streakDays}
          </div>
          <div class="dome-sublabel" style="color:#FFEDD5;">
            NGÀY LIÊN TỤC
          </div>
        </div>
        <!-- Tầng 4: Link chân thẻ 14px 600 -->
        <div class="dome-footer-row">
          <span class="dome-link" style="color:#FFFFFF;">Chi tiết chuỗi ngày &rarr;</span>
        </div>
      </div>

      <!-- Thẻ 3 (Bên phải): Thử Thách Hôm Nay (Tím Trầm #361F4D / #643E87 / Accent #C084FC / Link #E9D5FF) -->
      <div class="gamified-dome-card dome-challenge" data-nav="challenge" title="Bấm để giải Thử thách hôm nay" tabindex="0">
        <!-- Tầng 1: Icon vòng tròn 36px, icon 20px -->
        <div class="dome-icon-row">
          <div class="dome-icon-circle" style="color:#C084FC; background:rgba(192,132,252,0.12);">
            ${ICONS.zap(20)}
          </div>
        </div>
        <!-- Tầng 2: Tiêu đề 12px 700 uppercase -->
        <div class="dome-title-row">
          <div class="dome-title" style="color:#E9D5FF;">Thử Thách Hôm Nay</div>
        </div>
        <!-- Tầng 3: Khung nội dung chính cao thống nhất 64px -->
        <div class="dome-main-zone">
          <div>
            <span class="dome-reward-badge" style="background:rgba(16,185,129,0.16); color:#34D399; border:1px solid rgba(52,211,153,0.35);">
              ${ICONS.zap(10)} +50 XP THƯỞNG
            </span>
          </div>
          <div class="dome-challenge-name" style="color:#FAF5FF;">
            Dữ liệu bán hàng bị nhiễu
          </div>
        </div>
        <!-- Tầng 4: Link chân thẻ 14px 600 -->
        <div class="dome-footer-row">
          <span class="dome-link" style="color:#E9D5FF;">Nhận thử thách ngay &rarr;</span>
        </div>
      </div>
    </div>

    <!-- 3. PHẦN CHI TIẾT (NỬA DƯỚI MÀN HÌNH: CỘT TRÁI ~65%, CỘT PHẢI ~35%) -->
    <div class="dashboard-lower-grid">
      <!-- CỘT TRÁI: Tiến độ kỹ năng & Biểu đồ hoạt động -->
      <div>
        <!-- Skill Progress Card -->
        <div class="modern-dashboard-card">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="color:var(--color-primary);display:flex;">${ICONS.trendingUp(20)}</span>
              <span style="font-size:1.05rem;font-weight:700;color:var(--color-navy);">Tiến độ kỹ năng trọng tâm</span>
            </div>
            <span style="font-size:12px;font-weight:600;padding:3px 10px;border-radius:99px;background:rgba(2,132,199,0.1);color:var(--color-primary);border:1px solid rgba(2,132,199,0.2);">
              ${completedSkills}/${totalSkills} hoàn thành
            </span>
          </div>

          <div style="display:flex;flex-direction:column;">
            ${SKILL_KEYS.map(key => {
              const pct = getSkillProgress(key);
              const done = skills[key] || pct === 100;
              return `
                <div class="skill-row-modern">
                  <div style="width:200px;display:flex;align-items:center;gap:10px;flex-shrink:0;">
                    ${done
                      ? `<span style="color:#10B981;display:flex;">${ICONS.checkCircle(16)}</span>`
                      : `<span style="width:16px;height:16px;border:1.5px solid #CBD5E1;border-radius:50%;display:inline-block;"></span>`}
                    <span style="font-size:13px;font-weight:${done ? '600' : '500'};color:${done ? '#0F172A' : '#475569'};">${SKILL_NAMES[key]}</span>
                  </div>
                  <div class="skill-capsule-track">
                    <div class="skill-capsule-fill ${done ? 'completed' : 'active'}" style="width:${pct}%;"></div>
                  </div>
                  <div style="width:48px;text-align:right;">
                    <span style="font-size:12px;font-weight:700;color:${done ? '#10B981' : pct > 0 ? '#0284C7' : '#94A3B8'};">${pct}%</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Weekly Activity Chart -->
        <div class="modern-dashboard-card">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="color:var(--color-primary);display:flex;">${ICONS.barChart(20)}</span>
              <span style="font-size:1.05rem;font-weight:700;color:var(--color-navy);">Hoạt động học tập tuần này</span>
            </div>
            <span style="font-size:12px;color:#64748B;">Tổng thời gian: 4.5 giờ</span>
          </div>

          <div style="padding:10px 8px 4px;">
            <div style="display:flex;align-items:flex-end;gap:12px;height:90px;margin-bottom:8px;">
              ${WEEK_ACTIVITY.map((h, i) => `
                <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:6px;height:100%;justify-content:flex-end;">
                  <div style="height:${h}%;width:100%;min-height:6px;border-radius:6px;background:${i === 3 ? 'linear-gradient(180deg, #38BDF8, #0284C7)' : 'rgba(2,132,199,0.2)'};box-shadow:${i === 3 ? '0 0 12px rgba(56,189,248,0.5)' : 'none'};transition:all 0.2s ease;" title="${h}% vào ${WEEK_DAYS[i]}"></div>
                </div>
              `).join('')}
            </div>
            <div style="display:flex;gap:12px;">
              ${WEEK_DAYS.map((d, i) => `
                <div style="flex:1;text-align:center;font-size:12px;font-weight:${i === 3 ? '700' : '500'};color:${i === 3 ? '#0284C7' : '#94A3B8'};">${d}</div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>

      <!-- CỘT PHẢI: Hoạt động gần đây & Hồ sơ -->
      <div>
        <!-- Recent Activity Card -->
        <div class="modern-dashboard-card">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="color:var(--color-primary);display:flex;">${ICONS.clock(20)}</span>
              <span style="font-size:1.05rem;font-weight:700;color:var(--color-navy);">Hoạt động gần đây</span>
            </div>
          </div>

          <div style="display:flex;flex-direction:column;">
            ${activities.length > 0
              ? activities.slice(0, 5).map(act => {
                  const style = getActivityIcon(act.text);
                  return `
                    <div class="activity-item-modern">
                      <div class="activity-icon-badge" style="background:${style.bg};color:${style.color};border:1px solid ${style.border};">
                        ${style.icon}
                      </div>
                      <div style="flex:1;min-width:0;">
                        <div style="font-size:13px;font-weight:600;color:#1E293B;line-height:1.4;">${act.text}</div>
                        <div style="font-size:11px;color:#94A3B8;margin-top:3px;">${act.time}</div>
                      </div>
                    </div>
                  `;
                }).join('')
              : '<div style="color:#94A3B8;font-size:13px;text-align:center;padding:16px 0;">Chưa có hoạt động nào</div>'
            }
          </div>
        </div>

        <!-- Student Profile Widget -->
        <div class="modern-dashboard-card" style="text-align:center;">
          <div style="width:68px;height:68px;border-radius:50%;background:linear-gradient(135deg, #0284C7, #0B1533);display:flex;align-items:center;justify-content:center;font-size:1.6rem;font-weight:800;color:white;margin:0 auto 12px;box-shadow:0 8px 20px rgba(2,132,199,0.3);border:2px solid #fff;">
            ${user.initials || 'MK'}
          </div>
          <div style="font-weight:800;color:#0B1533;font-size:1.1rem;margin-bottom:2px;">
            ${user.name || 'Nguyễn Minh Khoa'}
          </div>
          <div style="font-size:12px;color:#64748B;margin-bottom:14px;">
            @${user.username || 'minhkhoa.da'} • Tham gia T3/2024
          </div>

          <div style="display:flex;justify-content:space-around;border-top:1px solid #F1F5F9;padding-top:14px;">
            <div>
              <div style="font-weight:700;color:#0B1533;font-size:14px;">${totalXP.toLocaleString()}</div>
              <div style="font-size:11px;color:#94A3B8;">Tổng XP</div>
            </div>
            <div>
              <div style="font-weight:700;color:#0B1533;font-size:14px;">${user.reputation || 1240}</div>
              <div style="font-size:11px;color:#94A3B8;">Điểm uy tín</div>
            </div>
            <div>
              <div style="font-weight:700;color:#F97316;font-size:14px;">${streakDays} ngày</div>
              <div style="font-size:11px;color:#94A3B8;">Streak</div>
            </div>
          </div>
        </div>

        <!-- Pro Tip Card -->
        <div style="background:linear-gradient(135deg, #FEF9C3 0%, #FEF08A 100%);border:1px solid #FDE047;border-radius:20px;padding:18px 20px;">
          <div style="display:flex;align-items:center;gap:8px;color:#854D0E;font-weight:700;font-size:13px;margin-bottom:6px;">
            ${ICONS.lightbulb(18)} Mẹo duy trì Streak
          </div>
          <div style="font-size:12px;color:#713F12;line-height:1.5;">
            Chỉ cần hoàn thành 1 bài tập hoặc giải 1 câu hỏi Daily Challenge mỗi ngày (khoảng 10-15 phút) là bạn đã giữ trọn vẹn chuỗi học tập và nhận thưởng XP!
          </div>
        </div>
      </div>
    </div>
  `;

  // Event Delegation for Navigation
  container.addEventListener('click', (e) => {
    const navEl = e.target.closest('[data-nav]');
    if (navEl) {
      const target = navEl.dataset.nav;
      if (target && navigate) {
        navigate(target);
      }
    }
  });
}
