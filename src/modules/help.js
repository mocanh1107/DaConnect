// ============================================
// DaConnect - Help & Getting Started Module
// Redesigned with Linear, Stripe & Duolingo aesthetics
// ============================================

import { ICONS } from '../components/icons.js';
import { addXP } from '../main.js';
import { showToast } from '../components/toast.js';

// ── DATA DEFINITIONS ─────────────────────────
const QUESTS_KEY = 'daconnect_gamified_quests';

function getQuestState() {
  try {
    const raw = localStorage.getItem(QUESTS_KEY);
    return raw ? JSON.parse(raw) : { q1: false, q2: false, q3: false, q4: false, bonusGiven: false };
  } catch {
    return { q1: false, q2: false, q3: false, q4: false, bonusGiven: false };
  }
}

function saveQuestState(state) {
  try {
    localStorage.setItem(QUESTS_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn('Could not save quest state:', e);
  }
}

const FEATURE_CARDS = [
  {
    id: 'roadmap',
    name: 'Roadmap',
    route: 'roadmap',
    tag: 'Cây kỹ năng',
    tagBg: '#DBEAFE',
    tagColor: '#1E40AF',
    iconBg: '#EFF6FF',
    iconColor: '#2563EB',
    icon: (s) => ICONS.roadmap(s),
    mockup: `
      <div class="help-mockup-header">
        <span class="help-mockup-dot"></span><span class="help-mockup-dot"></span><span class="help-mockup-dot"></span>
        <span style="margin-left:6px;font-size:10px;color:#94A3B8;">roadmap_graph.svg</span>
      </div>
      <div class="help-mockup-content">
        <span style="color:#10B981;">● Python [✓]</span> ➔ <span style="color:#10B981;">● Pandas [✓]</span> ➔ <span style="color:#38BDF8;">● SQL [Active]</span> ➔ <span style="color:#94A3B8;">○ ML Models</span>
      </div>
    `,
    bullets: [
      'Trực quan hóa sơ đồ kỹ năng từ cơ bản đến nâng cao có điều kiện tiên quyết.',
      'Tương tác kéo thả mượt mà, hỗ trợ zoom in/out và định vị nhanh.',
      'Drawer bài học tích hợp video Youtube chuẩn và link chuyển thẳng tới bài tập thực hành.',
    ],
  },
  {
    id: 'practice',
    name: 'Practice Lab',
    route: 'practice',
    tag: 'Luyện code trực tiếp',
    tagBg: '#D1FAE5',
    tagColor: '#065F46',
    iconBg: '#ECFDF5',
    iconColor: '#059669',
    icon: (s) => ICONS.practice(s),
    mockup: `
      <div class="help-mockup-header">
        <span class="help-mockup-dot"></span><span class="help-mockup-dot"></span><span class="help-mockup-dot"></span>
        <span style="margin-left:6px;font-size:10px;color:#94A3B8;">solution.py</span>
      </div>
      <div class="help-mockup-content">
        <span style="color:#F472B6;">def</span> <span style="color:#60A5FA;">clean_orders</span>(df):<br>
        &nbsp;&nbsp;<span style="color:#F472B6;">return</span> df.dropna(subset=[<span style="color:#FBBF24;">'customer_id'</span>]) <span style="color:#10B981;"># PASS (3/3)</span>
      </div>
    `,
    bullets: [
      '42 bài tập thực chiến chia theo 14 nhóm kỹ năng Python, Pandas, SQL.',
      'Hệ thống chạy test case tự động tức thì kèm gợi ý khi gặp lỗi logic.',
      'Skill Checklist thông minh lọc bài tập và ghi nhận tiến độ giải mã.',
    ],
  },
  {
    id: 'challenge',
    name: 'Challenge Arena',
    route: 'challenge',
    tag: 'Đấu trường tranh tài',
    tagBg: '#FFEDD5',
    tagColor: '#C2410C',
    iconBg: '#FFF7ED',
    iconColor: '#EA580C',
    icon: (s) => ICONS.challenge(s),
    mockup: `
      <div class="help-mockup-header">
        <span class="help-mockup-dot"></span><span class="help-mockup-dot"></span><span class="help-mockup-dot"></span>
        <span style="margin-left:6px;font-size:10px;color:#94A3B8;">monthly_podium.live</span>
      </div>
      <div class="help-mockup-content">
        <span style="color:#FBBF24;display:inline-flex;align-items:center;gap:3px;">${ICONS.trophy(14)} Top 1: 8,920 XP</span> • <span style="color:#E2E8F0;display:inline-flex;align-items:center;gap:3px;">${ICONS.award(14)} Top 2: 7,650 XP</span> • <span style="color:#F97316;display:inline-flex;align-items:center;gap:3px;">${ICONS.flame(14)} Streak 42d</span>
      </div>
    `,
    bullets: [
      'Daily & Weekly Challenge bài toán dữ liệu thực tế cập nhật mỗi 24 giờ.',
      'Bảng vinh danh Top 1 (vàng kim), Top 2 (bạc sáng), Top 3 (đồng ánh đỏ).',
      'Rèn luyện giác quan xử lý dữ liệu nhiễu (Messy Data) thường gặp tại doanh nghiệp.',
    ],
  },
  {
    id: 'projects',
    name: 'Project Lab',
    route: 'projects',
    tag: 'Đồ án thực chiến',
    tagBg: '#FEF3C7',
    tagColor: '#92400E',
    iconBg: '#FFFBEB',
    iconColor: '#D97706',
    icon: (s) => ICONS.projects(s),
    mockup: `
      <div class="help-mockup-header">
        <span class="help-mockup-dot"></span><span class="help-mockup-dot"></span><span class="help-mockup-dot"></span>
        <span style="margin-left:6px;font-size:10px;color:#94A3B8;">portfolio_repo/</span>
      </div>
      <div class="help-mockup-content">
        <span style="color:#38BDF8;display:inline-flex;align-items:center;gap:3px;">${ICONS.projects(14)} churn_analytics/</span> ➔ <span style="color:#A78BFA;">notebook.ipynb</span> • <span style="color:#34D399;">README.md</span>
      </div>
    `,
    bullets: [
      'Bộ đề án lớn theo ngành (Thương mại điện tử, Tài chính ngân hàng, Vận tải).',
      'Hướng dẫn thiết lập cấu trúc mã nguồn, Git và viết báo cáo Executive Summary.',
      'Xây dựng các sản phẩm thực tế chứng minh năng lực để đưa vào CV.',
    ],
  },
  {
    id: 'career',
    name: 'Career Hub',
    route: 'career',
    tag: 'Cơ hội việc làm',
    tagBg: '#EDE9FE',
    tagColor: '#6D28D9',
    iconBg: '#F5F3FF',
    iconColor: '#7C3AED',
    icon: (s) => ICONS.career(s),
    mockup: `
      <div class="help-mockup-header">
        <span class="help-mockup-dot"></span><span class="help-mockup-dot"></span><span class="help-mockup-dot"></span>
        <span style="margin-left:6px;font-size:10px;color:#94A3B8;">job_match.ai</span>
      </div>
      <div class="help-mockup-content">
        <span style="color:#38BDF8;display:inline-flex;align-items:center;gap:3px;">${ICONS.career(14)} Junior Data Analyst</span> • 18-25M VND • <span style="color:#10B981;">Độ khớp 92%</span>
      </div>
    `,
    bullets: [
      'Việc làm Data chọn lọc cho Intern, Fresher và Junior từ các công ty uy tín.',
      'Phân tích độ tương thích giữa kỹ năng bạn đã đạt và yêu cầu tuyển dụng.',
      'Khung lương thị trường minh bạch và cẩm nang phỏng vấn chuyên môn.',
    ],
  },
  {
    id: 'qa',
    name: 'Data Q&A',
    route: 'qa',
    tag: 'Hỏi đáp cộng đồng',
    tagBg: '#E0F2FE',
    tagColor: '#0369A1',
    iconBg: '#F0F9FF',
    iconColor: '#0284C7',
    icon: (s) => ICONS.qa(s),
    mockup: `
      <div class="help-mockup-header">
        <span class="help-mockup-dot"></span><span class="help-mockup-dot"></span><span class="help-mockup-dot"></span>
        <span style="margin-left:6px;font-size:10px;color:#94A3B8;">thread_429.discuss</span>
      </div>
      <div class="help-mockup-content">
        <span style="color:#FBBF24;">▲ 32 votes</span> • <span style="color:#E2E8F0;">"Làm sao khử duplicate trong SQL Window Function?"</span>
      </div>
    `,
    bullets: [
      'Cộng đồng gỡ rối bug lập trình và giải đáp phương pháp xử lý số liệu.',
      'Hệ thống Upvote và đánh dấu "Giải pháp chuẩn" giúp tích lũy điểm uy tín.',
      'Tìm kiếm kho tri thức theo hashtag (#pandas, #sql, #airflow, #machine-learning).',
    ],
  },
];

const FAQ_ITEMS = [
  {
    id: 1,
    category: 'newbie',
    categoryLabel: 'Người mới / Trái ngành',
    q: 'Tôi là người trái ngành (không học CNTT/Toán), có thể theo đuổi ngành Data không?',
    keywords: 'trai nganh kinh te marketing tai chinh ngoai thuong bat dau con so 0 excel power bi sql',
    renderAnswer: () => `
      <div class="faq-answer-lead">
        Hoàn toàn có thể! Hơn 60% chuyên gia phân tích dữ liệu (Data Analyst) hiện nay xuất thân từ khối ngành Kinh tế, Ngoại thương, Marketing hoặc Tài chính. Bạn có lợi thế rất lớn về tư duy kinh doanh thực tế.
      </div>
      <div class="faq-grid-2">
        <div class="faq-subcard">
          <div class="faq-subcard-header">
            <span class="faq-subcard-icon" style="background:#EFF6FF; color:#2563EB;">${ICONS.lightbulb(15)}</span>
            <span>Lợi thế sẵn có của bạn</span>
          </div>
          <ul class="faq-subcard-list">
            <li>${ICONS.checkCircle(14)} <span>Thấu hiểu bài toán thị trường và tư duy nghiệp vụ (Business Sense).</span></li>
            <li>${ICONS.checkCircle(14)} <span>Kỹ năng giao tiếp và truyền tải câu chuyện dữ liệu thuyết phục.</span></li>
            <li>${ICONS.checkCircle(14)} <span>Nhạy bén nhận diện cơ hội tối ưu hóa doanh thu cho doanh nghiệp.</span></li>
          </ul>
        </div>
        <div class="faq-subcard">
          <div class="faq-subcard-header">
            <span class="faq-subcard-icon" style="background:#FFF7ED; color:#EA580C;">${ICONS.compass(15)}</span>
            <span>Lộ trình DaConnect hỗ trợ bạn</span>
          </div>
          <ul class="faq-subcard-list">
            <li>${ICONS.checkCircle(14)} <span>Bắt đầu từ trắc nghiệm định hướng tại phân hệ <strong>Khám phá Data</strong>.</span></li>
            <li>${ICONS.checkCircle(14)} <span>Học công cụ trực quan không cần code sâu: Excel nâng cao & Power BI.</span></li>
            <li>${ICONS.checkCircle(14)} <span>Tiếp cận SQL và Python theo bài tập tình huống thực tế có sẵn test cases.</span></li>
          </ul>
        </div>
      </div>
    `,
  },
  {
    id: 2,
    category: 'xp',
    categoryLabel: 'Điểm XP & Hạng',
    q: 'Điểm kinh nghiệm (XP) và Bảng xếp hạng trên DaConnect hoạt động như thế nào?',
    keywords: 'diem kinh nghiem xp bang xep hang challenge arena top 1 2 3 nhiem vu tan thu practice lab',
    renderAnswer: () => `
      <div class="faq-answer-lead">
        Điểm kinh nghiệm (XP) ghi nhận nỗ lực rèn luyện của bạn. Bạn tích lũy XP qua 4 nguồn hoạt động chính sau:
      </div>
      <div class="faq-grid-4">
        <div class="faq-subcard">
          <div class="faq-subcard-header">
            <span class="faq-subcard-icon" style="background:#ECFDF5; color:#059669;">${ICONS.code(15)}</span>
            <span>Practice Lab</span>
          </div>
          <div class="faq-subcard-text">
            Giải đúng các bài tập lập trình Python & SQL.
          </div>
          <div style="margin-top:auto; padding-top:6px;">
            <span class="faq-highlight-pill faq-pill-xp">${ICONS.star(12)} +20 đến +50 XP</span>
          </div>
        </div>

        <div class="faq-subcard">
          <div class="faq-subcard-header">
            <span class="faq-subcard-icon" style="background:#FFF7ED; color:#EA580C;">${ICONS.compass(15)}</span>
            <span>Khám phá Data</span>
          </div>
          <div class="faq-subcard-text">
            Vượt qua các mini-game Thám tử & Đọc Insight.
          </div>
          <div style="margin-top:auto; padding-top:6px;">
            <span class="faq-highlight-pill faq-pill-xp">${ICONS.star(12)} +30 XP / game</span>
          </div>
        </div>

        <div class="faq-subcard">
          <div class="faq-subcard-header">
            <span class="faq-subcard-icon" style="background:#EFF6FF; color:#2563EB;">${ICONS.challenge(15)}</span>
            <span>Đấu trường Arena</span>
          </div>
          <div class="faq-subcard-text">
            Tham gia thử thách Daily & Weekly Challenge.
          </div>
          <div style="margin-top:auto; padding-top:6px;">
            <span class="faq-highlight-pill faq-pill-xp">${ICONS.star(12)} +50 đến +150 XP</span>
          </div>
        </div>

        <div class="faq-subcard">
          <div class="faq-subcard-header">
            <span class="faq-subcard-icon" style="background:#FEF3C7; color:#D97706;">${ICONS.award(15)}</span>
            <span>Nhiệm vụ tân thủ</span>
          </div>
          <div class="faq-subcard-text">
            Hoàn thành trọn bộ 4 nhiệm vụ nhập môn.
          </div>
          <div style="margin-top:auto; padding-top:6px;">
            <span class="faq-highlight-pill faq-pill-xp">${ICONS.star(12)} +100 XP trọn gói</span>
          </div>
        </div>
      </div>

      <div class="faq-podium-row">
        <div class="faq-podium-item top1">
          <div class="faq-podium-badge">${ICONS.trophy(16)} Top 1 Vàng kim</div>
          <div class="faq-podium-desc">Dẫn đầu bảng tổng sắp tháng với điểm số cao nhất</div>
        </div>
        <div class="faq-podium-item top2">
          <div class="faq-podium-badge">${ICONS.award(16)} Top 2 Bạc sáng</div>
          <div class="faq-podium-desc">Á quân xuất sắc duy trì phong độ bền bỉ</div>
        </div>
        <div class="faq-podium-item top3">
          <div class="faq-podium-badge">${ICONS.award(16)} Top 3 Đồng ánh đỏ</div>
          <div class="faq-podium-desc">Top 3 danh giá được vinh danh toàn cộng đồng</div>
        </div>
      </div>
    `,
  },
  {
    id: 3,
    category: 'learning',
    categoryLabel: 'Lộ trình học tập',
    q: 'Thứ tự học tối ưu nhất cho người mới bắt đầu từ con số 0 là gì?',
    keywords: 'thu tu hoc toi uu sql power bi python pandas spark data analyst engineer scientist',
    renderAnswer: () => `
      <div class="faq-answer-lead">
        Lộ trình học tập được thiết kế cân đối theo 3 hướng đi nghề nghiệp cốt lõi:
      </div>
      <div class="faq-grid-3">
        <div class="faq-subcard">
          <div class="faq-subcard-header">
            <span class="faq-subcard-icon" style="background:#EFF6FF; color:#2563EB;">${ICONS.barChart(15)}</span>
            <span>Data Analyst (DA)</span>
          </div>
          <ul class="faq-subcard-list">
            <li>${ICONS.checkCircle(14)} <span><strong>Bước 1:</strong> SQL Truy vấn dữ liệu (SELECT, JOIN, Aggregations).</span></li>
            <li>${ICONS.checkCircle(14)} <span><strong>Bước 2:</strong> Power BI / Tableau thiết kế Dashboard tương tác.</span></li>
            <li>${ICONS.checkCircle(14)} <span><strong>Bước 3:</strong> Python Pandas xử lý và tự động hóa báo cáo.</span></li>
          </ul>
        </div>

        <div class="faq-subcard">
          <div class="faq-subcard-header">
            <span class="faq-subcard-icon" style="background:#FFF7ED; color:#EA580C;">${ICONS.database(15)}</span>
            <span>Data Engineer (DE)</span>
          </div>
          <ul class="faq-subcard-list">
            <li>${ICONS.checkCircle(14)} <span><strong>Bước 1:</strong> Python Lập trình nâng cao & Cấu trúc dữ liệu.</span></li>
            <li>${ICONS.checkCircle(14)} <span><strong>Bước 2:</strong> SQL Tối ưu hóa, Indexing & Data Warehouse.</span></li>
            <li>${ICONS.checkCircle(14)} <span><strong>Bước 3:</strong> Xây dựng Data Pipeline với Spark, Kafka & Airflow.</span></li>
          </ul>
        </div>

        <div class="faq-subcard">
          <div class="faq-subcard-header">
            <span class="faq-subcard-icon" style="background:#F5F3FF; color:#7C3AED;">${ICONS.cpu(15)}</span>
            <span>Data Scientist (DS)</span>
          </div>
          <ul class="faq-subcard-list">
            <li>${ICONS.checkCircle(14)} <span><strong>Bước 1:</strong> Python Khoa học dữ liệu (NumPy, Pandas, EDA).</span></li>
            <li>${ICONS.checkCircle(14)} <span><strong>Bước 2:</strong> Toán, Xác suất thống kê & Thử nghiệm A/B Testing.</span></li>
            <li>${ICONS.checkCircle(14)} <span><strong>Bước 3:</strong> Thuật toán Machine Learning (Scikit-Learn, PyTorch).</span></li>
          </ul>
        </div>
      </div>
    `,
  },
  {
    id: 4,
    category: 'learning',
    categoryLabel: 'Lưu trữ tiến độ',
    q: 'Tiến độ học tập và bài tập của tôi có bị mất khi tắt trình duyệt không?',
    keywords: 'luu tien do bai tap localstorage trinh duyet khong bi mat',
    renderAnswer: () => `
      <div class="faq-grid-2">
        <div class="faq-subcard">
          <div class="faq-subcard-header">
            <span class="faq-subcard-icon" style="background:#ECFDF5; color:#059669;">${ICONS.shield(15)}</span>
            <span>Cơ chế đồng bộ tự động</span>
          </div>
          <div class="faq-subcard-text">
            Toàn bộ điểm XP, các bài tập đã hoàn thành trong Practice Lab, cờ kỹ năng trên cây Roadmap và lịch sử hoạt động đều được DaConnect tự động lưu trữ tức thì vào <span class="faq-highlight-pill faq-pill-code">localStorage</span> của trình duyệt.
          </div>
        </div>

        <div class="faq-subcard">
          <div class="faq-subcard-header">
            <span class="faq-subcard-icon" style="background:#EFF6FF; color:#2563EB;">${ICONS.checkCircle(15)}</span>
            <span>Bảo toàn dữ liệu học tập</span>
          </div>
          <div class="faq-subcard-text">
            Bạn hoàn toàn có thể yên tâm đóng tab, tắt trình duyệt hoặc tắt máy tính. Lần truy cập tiếp theo, hệ thống sẽ tự động khôi phục toàn bộ tiến độ và điểm số chính xác như trước khi rời đi.
          </div>
        </div>
      </div>
    `,
  },
  {
    id: 5,
    category: 'newbie',
    categoryLabel: 'Hỗ trợ kỹ thuật',
    q: 'Khi gặp lỗi code bài tập hoặc thắc mắc khó, tôi nên tìm trợ giúp ở đâu?',
    keywords: 'loi code bug thac mac data qa hoi dap mentor cong dong ho tro',
    renderAnswer: () => `
      <div class="faq-answer-lead">
        Quy trình 3 bước nhận hỗ trợ giải đáp kỹ thuật nhanh nhất tại phân hệ <strong>Data Q&A</strong>:
      </div>
      <div class="faq-grid-3">
        <div class="faq-subcard">
          <div class="faq-subcard-header">
            <span class="faq-subcard-icon" style="background:#EFF6FF; color:#2563EB;">${ICONS.code(15)}</span>
            <span>1. Đặt câu hỏi & Gắn Code</span>
          </div>
          <div class="faq-subcard-text">
            Sao chép đoạn code bị lỗi hoặc chụp ảnh thông báo lỗi, mô tả kết quả mong muốn và kết quả thực tế nhận được.
          </div>
        </div>

        <div class="faq-subcard">
          <div class="faq-subcard-header">
            <span class="faq-subcard-icon" style="background:#FFF7ED; color:#EA580C;">${ICONS.tag(15)}</span>
            <span>2. Gắn Hashtag chuyên môn</span>
          </div>
          <div class="faq-subcard-text">
            Thêm các thẻ chủ đề như <span class="faq-highlight-pill faq-pill-code">#sql</span>, <span class="faq-highlight-pill faq-pill-code">#pandas</span>, <span class="faq-highlight-pill faq-pill-code">#python</span> để Mentor chuyên trách nhận diện nhanh.
          </div>
        </div>

        <div class="faq-subcard">
          <div class="faq-subcard-header">
            <span class="faq-subcard-icon" style="background:#ECFDF5; color:#059669;">${ICONS.messageSquare(15)}</span>
            <span>3. Nhận phản hồi sớm nhất</span>
          </div>
          <div class="faq-subcard-text">
            Cộng đồng học viên và các Mentor DaConnect sẽ phân tích nguyên nhân lỗi và hướng dẫn phương án khắc phục chuẩn.
          </div>
        </div>
      </div>
    `,
  },
  {
    id: 6,
    category: 'xp',
    categoryLabel: 'Kỷ luật học tập',
    q: 'Làm thế nào để duy trì chuỗi ngày Streak học tập trên DaConnect?',
    keywords: 'streak chuoi ngay lien tuc daily challenge practice lab ky luat thep',
    renderAnswer: () => `
      <div class="faq-grid-2">
        <div class="faq-subcard">
          <div class="faq-subcard-header">
            <span class="faq-subcard-icon" style="background:#FFF7ED; color:#EA580C;">${ICONS.flame(15)}</span>
            <span>Cơ chế tính ngày Streak liên tục</span>
          </div>
          <div class="faq-subcard-text">
            Mỗi ngày bạn đăng nhập và giải quyết ít nhất một bài tập trong Practice Lab hoặc nộp bài Daily Challenge, chuỗi ngày Streak sẽ được tự động cộng thêm +1 ngày liên tiếp.
          </div>
        </div>

        <div class="faq-subcard">
          <div class="faq-subcard-header">
            <span class="faq-subcard-icon" style="background:#FEF3C7; color:#D97706;">${ICONS.award(15)}</span>
            <span>Đặc quyền duy trì Streak</span>
          </div>
          <div class="faq-subcard-text">
            Duy trì chuỗi Streak liên tục (7 ngày, 30 ngày, 100 ngày) giúp bạn hình thành phản xạ dữ liệu vững chắc, mở khóa huy hiệu Kỷ luật thép và tăng thứ hạng vinh danh trong cộng đồng.
          </div>
        </div>
      </div>
    `,
  },
];

// ── MAIN RENDER FUNCTION ─────────────────────
export function renderHelp(container, navigate) {
  const questState = getQuestState();
  const completedCount = ['q1', 'q2', 'q3', 'q4'].filter((k) => questState[k]).length;
  const progressPct = Math.round((completedCount / 4) * 100);

  container.innerHTML = `
    <div class="help-container">
      
      <!-- 1. HERO HEADER & QUICK SEARCH BAR -->
      <section class="help-hero-banner">
        <div class="help-hero-badge">
          ${ICONS.helpCircle ? ICONS.helpCircle(16) : ICONS.help(16)} Trung tâm Trợ giúp & Bắt đầu
        </div>
        <h1 class="help-hero-title">
          Bạn cần tìm gì tại <span>DaConnect</span> hôm nay?
        </h1>
        <p class="help-hero-subtitle">
          Tìm kiếm câu trả lời nhanh chóng về mọi tính năng, quy chế điểm thưởng XP hoặc bắt đầu hành trình chinh phục sự nghiệp Data của bạn.
        </p>

        <!-- Smart Search Bar -->
        <div class="help-search-wrapper">
          <div class="help-search-box">
            <span class="help-search-icon">${ICONS.search(18)}</span>
            <input 
              type="text" 
              id="help-search-input" 
              class="help-search-input" 
              placeholder="Tìm kiếm tính năng, quy chế điểm XP, mẹo học tập, Pandas..." 
              autocomplete="off"
            />
            <button id="help-search-clear" class="help-search-clear" title="Xóa tìm kiếm">✕</button>
          </div>

          <!-- Quick tag hints -->
          <div class="help-search-tag-hints">
            <span>Gợi ý nhanh:</span>
            <span class="help-hint-pill" data-hint="XP">Điểm thưởng XP</span>
            <span class="help-hint-pill" data-hint="Roadmap">Cây Roadmap</span>
            <span class="help-hint-pill" data-hint="Trái ngành">Dân trái ngành</span>
            <span class="help-hint-pill" data-hint="Practice Lab">Luyện Practice</span>
            <span class="help-hint-pill" data-hint="Streak">Chuỗi Streak</span>
          </div>
        </div>
      </section>

      <!-- 2. GAMIFIED QUEST CHECKLIST (NHIỆM VỤ TÂN THỦ) -->
      <section class="help-quest-section" id="quest-section">
        <div class="help-quest-header">
          <div class="help-quest-title-wrap">
            <div class="help-quest-title">
              <span>Hành trình làm chủ DaConnect</span>
              <span class="help-quest-badge-award">
                ${ICONS.star(13)} Thưởng ngay +100 XP
              </span>
            </div>
            <div class="help-quest-subtitle">
              Hoàn thành 4 nhiệm vụ nhập môn dưới đây để mở khóa toàn bộ tiềm năng học tập của nền tảng:
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="help-quest-progress-wrap">
            <div class="help-quest-progress-track">
              <div class="help-quest-progress-fill" id="quest-progress-fill" style="width: ${progressPct}%;"></div>
            </div>
            <span class="help-quest-progress-text" id="quest-progress-text">
              ${completedCount}/4 Hoàn thành
            </span>
          </div>
        </div>

        <div class="help-quest-grid">
          <!-- Step 1 -->
          <div class="help-quest-card ${questState.q1 ? 'completed' : ''}" data-quest="q1">
            <div class="help-quest-card-top">
              <div class="help-quest-step-pill">${questState.q1 ? '✓' : '1'}</div>
              <span class="help-quest-xp-badge">${ICONS.star(12)} +20 XP</span>
            </div>
            <div class="help-quest-card-title">
              Khám phá ngành & Trắc nghiệm định hướng
            </div>
            <button class="help-quest-btn" data-go="explore" data-quest-trigger="q1">
              ${questState.q1 ? `${ICONS.check(14)} Đã hoàn thành` : `Bắt đầu ${ICONS.arrowRight(14)}`}
            </button>
          </div>

          <!-- Step 2 -->
          <div class="help-quest-card ${questState.q2 ? 'completed' : ''}" data-quest="q2">
            <div class="help-quest-card-top">
              <div class="help-quest-step-pill">${questState.q2 ? '✓' : '2'}</div>
              <span class="help-quest-xp-badge">${ICONS.star(12)} +20 XP</span>
            </div>
            <div class="help-quest-card-title">
              Chọn mục tiêu kỹ năng trên Roadmap
            </div>
            <button class="help-quest-btn" data-go="roadmap" data-quest-trigger="q2">
              ${questState.q2 ? `${ICONS.check(14)} Đã hoàn thành` : `Mở Roadmap ${ICONS.arrowRight(14)}`}
            </button>
          </div>

          <!-- Step 3 -->
          <div class="help-quest-card ${questState.q3 ? 'completed' : ''}" data-quest="q3">
            <div class="help-quest-card-top">
              <div class="help-quest-step-pill">${questState.q3 ? '✓' : '3'}</div>
              <span class="help-quest-xp-badge">${ICONS.star(12)} +30 XP</span>
            </div>
            <div class="help-quest-card-title">
              Hoàn thành bài code đầu tiên ở Practice Lab
            </div>
            <button class="help-quest-btn" data-go="practice" data-quest-trigger="q3">
              ${questState.q3 ? `${ICONS.check(14)} Đã hoàn thành` : `Luyện Lab ${ICONS.arrowRight(14)}`}
            </button>
          </div>

          <!-- Step 4 -->
          <div class="help-quest-card ${questState.q4 ? 'completed' : ''}" data-quest="q4">
            <div class="help-quest-card-top">
              <div class="help-quest-step-pill">${questState.q4 ? '✓' : '4'}</div>
              <span class="help-quest-xp-badge">${ICONS.star(12)} +30 XP</span>
            </div>
            <div class="help-quest-card-title">
              Thử sức Đấu trường & Career Hub
            </div>
            <button class="help-quest-btn" data-go="challenge" data-quest-trigger="q4">
              ${questState.q4 ? `${ICONS.check(14)} Đã hoàn thành` : `Tham gia ${ICONS.arrowRight(14)}`}
            </button>
          </div>
        </div>
      </section>

      <!-- 3. FEATURE SHOWCASE CARDS (3 CỘT x 2 HÀNG) -->
      <section class="help-section">
        <div class="help-section-header">
          <div class="help-section-badge">
            ${ICONS.compass(14)} Cẩm nang tính năng
          </div>
          <h2 class="help-section-title">Khám phá 6 phân hệ cốt lõi</h2>
          <p class="help-section-desc">
            Không cần đọc tài liệu dài dòng — hãy xem nhanh bản xem trước và giá trị cốt lõi của từng công cụ dưới đây.
          </p>
        </div>

        <div class="help-showcase-grid" id="showcase-grid">
          ${FEATURE_CARDS.map(
            (item) => `
            <div class="help-showcase-card" data-showcase-id="${item.id}" data-search="${(item.name + ' ' + item.tag + ' ' + item.bullets.join(' ')).toLowerCase()}">
              <div class="help-showcase-top">
                <div class="help-showcase-icon-box" style="background: ${item.iconBg}; color: ${item.iconColor};">
                  ${item.icon(22)}
                </div>
                <span class="help-showcase-tag" style="background: ${item.tagBg}; color: ${item.tagColor};">
                  ${item.tag}
                </span>
              </div>

              <h3 class="help-showcase-title">${item.name}</h3>

              <!-- Mini Mockup Interface Preview -->
              <div class="help-mini-preview">
                ${item.mockup}
              </div>

              <!-- 3 Concise Bullets -->
              <div class="help-showcase-bullets">
                ${item.bullets
                  .map(
                    (b) => `
                  <div class="help-showcase-bullet">
                    ${ICONS.checkCircle(15)}
                    <span>${b}</span>
                  </div>
                `
                  )
                  .join('')}
              </div>

              <!-- Slim CTA Button -->
              <button class="help-showcase-cta" data-go="${item.route}">
                <span>Khám phá tính năng</span>
                ${ICONS.arrowRight(15)}
              </button>
            </div>
          `
          ).join('')}
        </div>
      </section>

      <!-- 4. MODERN INTERACTIVE ACCORDION (FAQ) -->
      <section class="help-faq-section">
        <div class="help-section-header">
          <div class="help-section-badge">
            ${ICONS.lightbulb(14)} Giải đáp thắc mắc
          </div>
          <h2 class="help-section-title">Câu hỏi thường gặp</h2>
          <p class="help-section-desc">
            Các câu trả lời súc tích, làm rõ những thắc mắc phổ biến nhất của người mới khi bắt đầu học tập.
          </p>
        </div>

        <!-- Filter Tabs -->
        <div class="help-faq-tabs">
          <button class="help-faq-tab-btn active" data-tab="all">Tất cả</button>
          <button class="help-faq-tab-btn" data-tab="newbie">Người mới / Trái ngành</button>
          <button class="help-faq-tab-btn" data-tab="xp">Điểm XP & Hạng</button>
          <button class="help-faq-tab-btn" data-tab="learning">Học tập & Bài tập</button>
        </div>

        <!-- Accordion List -->
        <div class="help-faq-list" id="faq-list">
          ${FAQ_ITEMS.map(
            (faq, idx) => `
            <div class="help-faq-item ${idx === 0 ? 'open' : ''}" data-category="${faq.category}" data-search="${(faq.q + ' ' + faq.keywords).toLowerCase()}">
              <!-- CÂU HỎI Ở TRÊN -->
              <div class="help-faq-header">
                <div class="help-faq-q-title">
                  <span class="help-faq-q-num">Q${idx + 1}</span>
                  <span>${faq.q}</span>
                  <span class="help-faq-q-category">${faq.categoryLabel}</span>
                </div>
                <span class="help-faq-chevron">${ICONS.chevronDown(16)}</span>
              </div>
              <!-- CÂU TRẢ LỜI Ở DƯỚI (TRÌNH BÀY CÂN ĐỐI, ĐẸP MẮT) -->
              <div class="help-faq-body">
                ${faq.renderAnswer()}
              </div>
            </div>
          `
          ).join('')}
        </div>

        <!-- Empty search state -->
        <div id="faq-empty-state" class="help-faq-empty">
          ${ICONS.search(24)}
          <div style="font-weight:700;margin-top:8px;color:#0B1533;">Không tìm thấy câu hỏi phù hợp</div>
          <div style="font-size:13px;margin-top:4px;">Hãy thử tìm từ khóa khác như "XP", "Roadmap", hoặc "Trái ngành".</div>
        </div>
      </section>

      <!-- 5. COMMUNITY BANNER (CHÂN TRANG) -->
      <section class="help-community-card">
        <div class="help-community-info">
          <div class="help-community-badge">
            ${ICONS.users(14)} Cộng đồng học tập 24/7
          </div>
          <h2 class="help-community-title">
            Bạn muốn đồng hành cùng cộng đồng DaConnect?
          </h2>
          <p class="help-community-desc">
            Nền tảng chia sẻ kiến thức thực chiến, kết nối chuyên gia và cập nhật cơ hội<br class="hidden-sm"> thực tập, việc làm Data mới nhất được cập nhật liên tục.
          </p>
        </div>
        <a 
          href="https://web.facebook.com/share/g/1F2AeXe8m6/" 
          target="_blank" 
          rel="noopener noreferrer" 
          class="help-community-btn"
        >
          ${ICONS.users(16)}
          <span>Tham gia Group Facebook (9,500+ thành viên)</span>
          ${ICONS.arrowRight(14)}
        </a>
      </section>

    </div>
  `;

  // ── ATTACH INTERACTIVE HANDLERS ───────────────
  initSearchHandler(container);
  initQuestHandler(container, navigate);
  initFaqAccordion(container);
  initNavigationButtons(container, navigate);
}

// ── 1. SMART SEARCH & FILTER ─────────────────
function initSearchHandler(container) {
  const searchInput = container.querySelector('#help-search-input');
  const clearBtn = container.querySelector('#help-search-clear');
  const hintPills = container.querySelectorAll('.help-hint-pill');

  const faqItems = container.querySelectorAll('.help-faq-item');
  const showcaseCards = container.querySelectorAll('.help-showcase-card');
  const emptyState = container.querySelector('#faq-empty-state');

  function performSearch(query) {
    const q = query.trim().toLowerCase();

    // Toggle clear button
    clearBtn.classList.toggle('visible', q.length > 0);

    let matchedFaqCount = 0;

    // Filter FAQ
    faqItems.forEach((item) => {
      const searchData = item.dataset.search || '';
      const textContent = item.textContent.toLowerCase();
      const match = q === '' || searchData.includes(q) || textContent.includes(q);
      item.style.display = match ? 'block' : 'none';
      if (match) matchedFaqCount++;
    });

    // Filter Showcase
    showcaseCards.forEach((card) => {
      const searchData = card.dataset.search || '';
      const textContent = card.textContent.toLowerCase();
      const match = q === '' || searchData.includes(q) || textContent.includes(q);
      card.style.display = match ? 'flex' : 'none';
    });

    // Show empty state if no FAQ matched
    if (emptyState) {
      emptyState.classList.toggle('show', q !== '' && matchedFaqCount === 0);
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      performSearch('');
      searchInput.focus();
    });
  }

  hintPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const text = pill.dataset.hint;
      searchInput.value = text;
      performSearch(text);
      searchInput.focus();
    });
  });
}

// ── 2. GAMIFIED QUEST HANDLER ─────────────────
function initQuestHandler(container, navigate) {
  const questCards = container.querySelectorAll('.help-quest-card');
  const progressFill = container.querySelector('#quest-progress-fill');
  const progressText = container.querySelector('#quest-progress-text');

  container.querySelectorAll('[data-quest-trigger]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const questKey = btn.dataset.questTrigger;
      const targetRoute = btn.dataset.go;

      const state = getQuestState();
      const isAlreadyCompleted = !!state[questKey];

      if (!isAlreadyCompleted) {
        state[questKey] = true;
        saveQuestState(state);

        // Calculate completed count
        const completed = ['q1', 'q2', 'q3', 'q4'].filter((k) => state[k]).length;
        const pct = Math.round((completed / 4) * 100);

        if (progressFill) progressFill.style.width = `${pct}%`;
        if (progressText) progressText.textContent = `${completed}/4 Hoàn thành`;

        // Update card appearance
        const card = container.querySelector(`[data-quest="${questKey}"]`);
        if (card) {
          card.classList.add('completed');
          const pill = card.querySelector('.help-quest-step-pill');
          if (pill) pill.textContent = '✓';
          btn.innerHTML = `${ICONS.check(14)} Đã hoàn thành`;
        }

        // Check if all 4 completed for the bonus +100 XP
        if (completed === 4 && !state.bonusGiven) {
          state.bonusGiven = true;
          saveQuestState(state);
          addXP(100, 'Hoàn thành trọn bộ 4 Nhiệm vụ tân thủ DaConnect');
          showToast('Chúc mừng! Bạn nhận được +100 XP khi hoàn thành Nhiệm vụ tân thủ!', 'success');
        } else {
          showToast(`Đã mở khóa nhiệm vụ! Chuyển hướng sang ${targetRoute}...`, 'info');
        }

        // Navigate after small delay for pleasant feedback
        setTimeout(() => {
          if (targetRoute && navigate) navigate(targetRoute);
        }, 250);
      } else {
        // Even when completed, clicking still navigates directly to that feature!
        if (targetRoute && navigate) {
          navigate(targetRoute);
        }
      }
    });
  });

  // Clicking anywhere on the quest card also navigates to that feature
  questCards.forEach((card) => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('[data-quest-trigger]')) return;
      const btn = card.querySelector('[data-quest-trigger]');
      if (btn) btn.click();
    });
  });
}

// ── 3. FAQ ACCORDION & TABS ───────────────────
function initFaqAccordion(container) {
  const tabs = container.querySelectorAll('.help-faq-tab-btn');
  const items = container.querySelectorAll('.help-faq-item');
  const emptyState = container.querySelector('#faq-empty-state');

  // Filter Tabs
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      const cat = tab.dataset.tab;
      let matched = 0;

      items.forEach((item) => {
        const itemCat = item.dataset.category;
        const shouldShow = cat === 'all' || itemCat === cat;
        item.style.display = shouldShow ? 'block' : 'none';
        if (shouldShow) matched++;
      });

      if (emptyState) emptyState.classList.toggle('show', matched === 0);
    });
  });

  // Accordion Header Toggle
  items.forEach((item) => {
    const header = item.querySelector('.help-faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Optional: close other items for single-accordion behavior
        items.forEach((other) => {
          if (other !== item) other.classList.remove('open');
        });

        item.classList.toggle('open', !isOpen);
      });
    }
  });
}

// ── 4. GENERAL NAVIGATION BUTTONS ─────────────
function initNavigationButtons(container, navigate) {
  container.querySelectorAll('[data-go]').forEach((btn) => {
    if (btn.hasAttribute('data-quest-trigger')) return; // already handled by quest handler

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetRoute = btn.dataset.go;
      if (targetRoute && navigate) {
        navigate(targetRoute);
      }
    });
  });
}
