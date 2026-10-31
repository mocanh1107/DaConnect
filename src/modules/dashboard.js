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
    <!-- 1. HERO BANNER (Rounded-3xl, Dark Data Gradient, Glass CTA) -->
    <div class="dashboard-hero">
      <div class="dashboard-hero-content">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:12px;">
          <span style="display:inline-flex;align-items:center;gap:6px;padding:4px 14px;border-radius:99px;font-size:12px;font-weight:600;background:rgba(56,189,248,0.15);color:#38BDF8;border:1px solid rgba(56,189,248,0.3);">
            ${ICONS.zap(14)} Data Analyst Career Track 2026
          </span>
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="font-size:12px;color:rgba(255,255,255,0.7);display:inline-flex;align-items:center;gap:5px;">
              ${ICONS.calendar(14)} Hôm nay, ${new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric' })}
            </span>
          </div>
        </div>

        <h1 style="font-size:2.2rem;font-weight:800;letter-spacing:-0.03em;margin:0 0 8px 0;line-height:1.2;color:#FFFFFF;display:flex;align-items:center;gap:10px;">
          Xin chào, ${user.name || 'Nguyễn Minh Khoa'} <span style="display:inline-flex;color:#FBBF24;">${ICONS.hand(26)}</span>
        </h1>
        <p style="font-size:0.98rem;color:#CBD5E1;margin:0;line-height:1.6;max-width:680px;">
          Hôm nay bạn muốn học gì? Tiếp tục hành trình chinh phục kỹ năng Phân tích Dữ liệu để mở khóa các cơ hội nghề nghiệp hàng đầu!
        </p>
      </div>

      <!-- Hero Learning Action Card (Glassmorphism) -->
      <div class="dashboard-hero-cta">
        <div style="display:flex;align-items:center;gap:14px;min-width:280px;flex:1;">
          <div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg, rgba(2,132,199,0.4), rgba(56,189,248,0.2));border:1px solid rgba(56,189,248,0.4);display:flex;align-items:center;justify-content:center;color:#38BDF8;flex-shrink:0;">
            ${ICONS.code(22)}
          </div>
          <div style="flex:1;">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#38BDF8;margin-bottom:2px;">
              Đang học dở • Module 2/6
            </div>
            <div style="font-size:14px;font-weight:700;color:#FFFFFF;margin-bottom:6px;">
              Lập trình Python & Phân tích Dữ liệu
            </div>
            <div style="display:flex;align-items:center;gap:10px;">
              <div style="flex:1;max-width:200px;height:6px;background:rgba(255,255,255,0.15);border-radius:99px;overflow:hidden;">
                <div style="height:100%;width:${learningProgress || 17}%;background:linear-gradient(90deg, #38BDF8, #818CF8);border-radius:99px;"></div>
              </div>
              <span style="font-size:11px;color:#94A3B8;font-weight:600;">${learningProgress || 17}% hoàn thành</span>
            </div>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:10px;">
          <button class="btn btn-primary" style="padding:10px 22px;font-size:14px;font-weight:700;border-radius:14px;background:linear-gradient(135deg, #0284C7, #0EA5E9);box-shadow:0 4px 18px rgba(14,165,233,0.45);display:inline-flex;align-items:center;gap:8px;" data-nav="practice">
            ${ICONS.play(15)} Vào học ngay
          </button>
          <button class="btn btn-secondary" style="padding:10px 18px;font-size:14px;font-weight:600;border-radius:14px;background:rgba(255,255,255,0.08);color:#FFFFFF;border:1px solid rgba(255,255,255,0.2);" data-nav="roadmap">
            ${ICONS.roadmap(15)} Xem Roadmap
          </button>
        </div>
      </div>
    </div>

    <!-- 2. CỤM 3 THẺ CHỈ SỐ TRỌNG TÂM (GAMIFIED DOME CARDS) -->
    <div class="gamified-stats-grid">
      <!-- Thẻ 1: Chuỗi Ngày Học (Streak - Bonfire Amber/Orange, Làm to & rực rỡ nhất!) -->
      <div class="gamified-dome-card dome-streak" data-nav="roadmap" title="Bấm để xem lịch chuỗi học tập">
        <div class="dome-icon-wrap" style="color:#F97316;box-shadow:0 0 20px rgba(249,115,22,0.45);background:rgba(249,115,22,0.15);">
          ${ICONS.flame(26)}
        </div>
        <div style="width:100%;">
          <div class="dome-title" style="color:#FDBA74;">Chuỗi Ngày Học</div>
          <div class="dome-stat-number" style="background:linear-gradient(135deg, #FF944D, #FF5500);-webkit-background-clip:text;-webkit-text-fill-color:transparent;filter:drop-shadow(0 0 16px rgba(249,115,22,0.5));">
            ${streakDays}
          </div>
          <div style="font-size:12px;font-weight:700;color:#FED7AA;letter-spacing:0.04em;margin-bottom:6px;">
            NGÀY LIÊN TỤC
          </div>
          <div style="font-size:11px;color:#FDBA74;opacity:0.9;display:flex;align-items:center;justify-content:center;gap:4px;">
            ${ICONS.flame(13)} Duy trì mỗi ngày để không đứt chuỗi!
          </div>
        </div>
        <div class="dome-link" style="color:#FB923C;">
          Chi tiết chuỗi ngày &rarr;
        </div>
      </div>

      <!-- Thẻ 2: Điểm Tích Lũy & Hạng (Deep Indigo/Cyan Tech) -->
      <div class="gamified-dome-card dome-xp" data-nav="challenge" title="Bấm để xem Bảng xếp hạng">
        <div class="dome-icon-wrap" style="color:#38BDF8;box-shadow:0 0 16px rgba(56,189,248,0.3);">
          ${ICONS.star(24)}
        </div>
        <div style="width:100%;">
          <div class="dome-title" style="color:#93C5FD;">Điểm Tích Lũy & Hạng</div>
          <div class="dome-stat-number" style="color:#E0F2FE;">
            ${totalXP.toLocaleString()} <span style="font-size:1.3rem;font-weight:600;color:#38BDF8;">XP</span>
          </div>
          <div style="display:inline-flex;align-items:center;gap:6px;padding:3px 12px;border-radius:99px;background:rgba(56,189,248,0.15);border:1px solid rgba(56,189,248,0.3);color:#7DD3FC;font-size:12px;font-weight:600;margin-top:4px;">
            ${ICONS.award(13)} Hạng: ${user.rank || 'Silver II'}
          </div>
          <div style="font-size:11px;color:#94A3B8;margin-top:8px;">
            Còn 1,050 XP để thăng hạng Gold I
          </div>
        </div>
        <div class="dome-link" style="color:#38BDF8;">
          Xem Bảng xếp hạng &rarr;
        </div>
      </div>

      <!-- Thẻ 3: Thử Thách Hôm Nay (Violet Nebula) -->
      <div class="gamified-dome-card dome-challenge" data-nav="challenge" title="Bấm để giải Thử thách hôm nay">
        <div class="dome-icon-wrap" style="color:#F59E0B;box-shadow:0 0 18px rgba(245,158,11,0.35);background:rgba(245,158,11,0.12);">
          ${ICONS.zap(24)}
        </div>
        <div style="width:100%;">
          <div class="dome-title" style="color:#C4B5FD;">Thử Thách Hôm Nay</div>
          <div style="margin:6px 0 8px;">
            <span style="display:inline-flex;align-items:center;gap:4px;padding:4px 12px;border-radius:99px;font-size:12px;font-weight:700;background:rgba(16,185,129,0.2);color:#34D399;border:1px solid rgba(52,211,153,0.35);">
              ${ICONS.zap(12)} +50 XP THƯỞNG
            </span>
          </div>
          <div style="font-size:14px;font-weight:700;color:#F1F5F9;line-height:1.4;margin:4px 0 6px;">
            Dữ liệu bán hàng bị nhiễu
          </div>
          <div style="font-size:11px;color:#A78BFA;">
            Kết thúc sau 06h 45m
          </div>
        </div>
        <div class="dome-link" style="color:#C084FC;">
          Nhận thử thách ngay &rarr;
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
