// ============================================
// DaConnect - Explore Data Module
// Modern Edtech UI (Brilliant, DataCamp, Stripe)
// ============================================

import { ICONS } from '../components/icons.js';
import { addXP } from '../main.js';
import { showToast } from '../components/toast.js';

// ── DATA FOR CAREER CARDS ────────────────────
const CAREER_DATA = {
  da: {
    id: 'da',
    name: 'Data Analyst (DA)',
    tag: 'Phân tích & Kinh doanh',
    tagClass: 'da-tag',
    themeClass: 'da-theme',
    iconBg: '#EFF6FF',
    iconColor: '#2563EB',
    icon: (s) => ICONS.barChart(s),
    quote: '"Người kể chuyện bằng dữ liệu cho doanh nghiệp"',
    desc: 'Chuyển hóa dữ liệu thô thành biểu đồ trực quan, Dashboard kinh doanh và các đề xuất chiến lược giúp ban lãnh đạo ra quyết định chính xác.',
    tools: ['SQL', 'Power BI', 'Tableau', 'Excel Nâng cao', 'Python (Pandas)'],
    timeline: [
      { time: '09:00', text: 'Kiểm tra Dashboard doanh thu đêm qua và phát hiện biến động bất thường.' },
      { time: '10:30', text: 'Viết truy vấn SQL trích xuất tỷ lệ khách hàng rời bỏ (Churn Rate).' },
      { time: '14:00', text: 'Họp cùng đội Marketing & Kinh doanh phân tích hiệu quả chiến dịch mới.' },
      { time: '16:30', text: 'Thuyết trình báo cáo trực quan cho Giám đốc kinh doanh ra quyết định.' },
    ],
    problem: '"Vì sao doanh số quý này tại chi nhánh TP.HCM sụt giảm 15% dù lượng người ghé thăm vẫn tăng cao? Nhóm sản phẩm nào đang kéo tỷ suất lợi nhuận đi xuống?"',
    persona: [
      'Sinh viên khối Kinh tế, Marketing, Tài chính, Ngoại thương hoặc người có tư duy nghiệp vụ.',
      'Người yêu thích làm việc với con số, vẽ biểu đồ và thuyết phục người khác qua hình ảnh trực quan.',
      'Không yêu cầu xuất phát điểm lập trình phức tạp; bắt đầu thuận lợi từ SQL và Power BI.',
    ],
  },
  de: {
    id: 'de',
    name: 'Data Engineer (DE)',
    tag: 'Kỹ thuật & Hạ tầng',
    tagClass: 'de-tag',
    themeClass: 'de-theme',
    iconBg: '#FFF7ED',
    iconColor: '#EA580C',
    icon: (s) => ICONS.database(s),
    quote: '"Kỹ sư kiến thiết đường ống và kho dữ liệu"',
    desc: 'Thiết kế, xây dựng và vận hành các đường ống truyền tải dữ liệu (Data Pipelines), đảm bảo dữ liệu sạch, an toàn và sẵn sàng theo thời gian thực.',
    tools: ['Python', 'SQL Nâng cao', 'Apache Spark', 'Airflow', 'Docker & Cloud'],
    timeline: [
      { time: '09:00', text: 'Kiểm tra hệ thống giám sát pipeline Airflow chạy tự động ban đêm.' },
      { time: '10:30', text: 'Tối ưu hóa câu lệnh Spark xử lý luồng dữ liệu 5 triệu log mỗi giờ.' },
      { time: '14:00', text: 'Phối hợp với team Backend mở rộng kiến trúc kho dữ liệu BigQuery/Snowflake.' },
      { time: '16:30', text: 'Cấu hình cụm Docker & Kubernetes để hạn chế nghẽn mạng và tràn RAM.' },
    ],
    problem: '"Làm thế nào để đồng bộ dữ liệu giao dịch từ 500 cửa hàng tiện lợi về kho dữ liệu trung tâm trong vòng 3 giây mà không bao giờ bị nghẽn mạng hay mất mát dữ liệu?"',
    persona: [
      'Sinh viên ngành Khoa học Máy tính, CNTT, Kỹ thuật phần mềm hoặc Mạng máy tính.',
      'Người đam mê tối ưu hóa hiệu năng, hệ thống phân tán, xử lý dữ liệu lớn (Big Data).',
      'Thích cảm giác xây dựng hạ tầng vững chắc, vận hành âm thầm nhưng là xương sống toàn công ty.',
    ],
  },
  ds: {
    id: 'ds',
    name: 'Data Scientist (DS)',
    tag: 'Mô hình & AI',
    tagClass: 'ds-tag',
    themeClass: 'ds-theme',
    iconBg: '#F5F3FF',
    iconColor: '#7C3AED',
    icon: (s) => ICONS.cpu(s),
    quote: '"Nhà khoa học mô hình dự báo và thuật toán AI"',
    desc: 'Ứng dụng toán học thống kê, Machine Learning và Deep Learning để tìm kiếm quy luật ẩn sâu và xây dựng các hệ thống trí tuệ nhân tạo tự động hóa.',
    tools: ['Python', 'Scikit-learn', 'PyTorch / TensorFlow', 'XGBoost', 'SQL & Jupyter'],
    timeline: [
      { time: '09:00', text: 'Đánh giá các chỉ số Precision, Recall, F1-Score của model gian lận đêm qua.' },
      { time: '11:00', text: 'Thử nghiệm trích xuất thêm các đặc trưng hành vi người dùng mới (Feature Engineering).' },
      { time: '14:30', text: 'Phân tích kết quả A/B Testing giữa 2 thuật toán gợi ý sản phẩm.' },
      { time: '16:30', text: 'Đóng gói mô hình Machine Learning thành API để team sản phẩm tích hợp vào app.' },
    ],
    problem: '"Xây dựng mô hình AI dự đoán chính xác khách hàng nào có khả năng hủy gói dịch vụ trả phí trong 30 ngày tới để kịp thời gửi ưu đãi cá nhân hóa giữ chân?"',
    persona: [
      'Sinh viên Toán, Thống kê, Kinh tế lượng, Khoa học dữ liệu hoặc Trí tuệ nhân tạo.',
      'Người tò mò khoa học, say mê các mô hình học máy, xác suất và thử nghiệm giả thuyết.',
      'Thích đào sâu tìm quy luật tiềm ẩn và mong muốn kiến tạo các giải pháp AI tự động hóa.',
    ],
  },
};

// ── QUIZ QUESTIONS DATA ──────────────────────
const QUIZ_QUESTIONS = [
  {
    id: 1,
    title: 'Khi đối mặt với một vấn đề kinh doanh phức tạp, phản xạ tự nhiên của bạn là gì?',
    options: [
      { role: 'da', letter: 'A', text: 'Muốn vẽ biểu đồ trực quan, tìm nguyên nhân gốc rễ và chia sẻ phát hiện đó cho mọi người hiểu.' },
      { role: 'de', letter: 'B', text: 'Muốn biết dữ liệu được thu thập từ đâu, lưu ở cơ sở dữ liệu nào và luân chuyển ra sao.' },
      { role: 'ds', letter: 'C', text: 'Muốn tìm công thức toán học hoặc thuật toán để tự động dự đoán trước kết quả.' },
    ],
  },
  {
    id: 2,
    title: 'Bạn cảm thấy hào hứng và có cảm giác thành tựu nhất khi làm công việc nào?',
    options: [
      { role: 'da', letter: 'A', text: 'Thiết kế một Dashboard tương tác đẹp mắt, giúp sếp nhìn vào là ra quyết định ngay.' },
      { role: 'de', letter: 'B', text: 'Viết code tối ưu hóa hệ thống, xử lý hàng triệu bản ghi trong vài giây mà không bị lỗi.' },
      { role: 'ds', letter: 'C', text: 'Huấn luyện một mô hình AI có độ chính xác cao và thử nghiệm các giả thuyết thống kê.' },
    ],
  },
  {
    id: 3,
    title: 'Nhóm công cụ công nghệ nào khiến bạn muốn dành hàng giờ để mày mò làm chủ?',
    options: [
      { role: 'da', letter: 'A', text: 'SQL, Power BI, Tableau, Excel nâng cao và kỹ năng Data Storytelling.' },
      { role: 'de', letter: 'B', text: 'Python chuyên sâu, Apache Spark, Docker, Airflow, SQL tối ưu hóa dữ liệu lớn.' },
      { role: 'ds', letter: 'C', text: 'Python, Thư viện Machine Learning (Scikit-Learn, PyTorch), Xác suất thống kê & Jupyter.' },
    ],
  },
  {
    id: 4,
    title: 'Môi trường làm việc và cộng sự lý tưởng mà bạn muốn gắn bó:',
    options: [
      { role: 'da', letter: 'A', text: 'Làm việc gần gũi với đội ngũ kinh doanh, marketing, tham gia định hình chiến lược sản phẩm.' },
      { role: 'de', letter: 'B', text: 'Làm việc sâu cùng đội kỹ sư phần mềm, hạ tầng Cloud, DevOps và kiến trúc hệ thống.' },
      { role: 'ds', letter: 'C', text: 'Làm việc trong nhóm nghiên cứu giải thuật, tối ưu hóa chỉ số toán học và thử nghiệm mô hình.' },
    ],
  },
  {
    id: 5,
    title: 'Thế mạnh nổi bật nhất của bạn là:',
    options: [
      { role: 'da', letter: 'A', text: 'Nhạy bén với các con số kinh doanh và thích giao tiếp, thuyết phục qua hình ảnh.' },
      { role: 'de', letter: 'B', text: 'Tư duy lập trình có cấu trúc, kiên nhẫn sửa lỗi kỹ thuật và thích sự vận hành trơn tru.' },
      { role: 'ds', letter: 'C', text: 'Tò mò khoa học, thích đặt câu hỏi "Tại sao" và đam mê các thuật toán trí tuệ nhân tạo.' },
    ],
  },
];

// ── MAIN RENDER FUNCTION ─────────────────────
export function renderExplore(container, navigate) {
  container.innerHTML = `
    <div class="explore-container">
      
      <!-- 1. HERO ZONE & BENTO GRID (DỮ LIỆU VẬN HÀNH THẾ GIỚI) -->
      <section class="explore-hero">
        <div class="explore-hero-header">
          <div class="explore-badge">
            🌐 Khám phá thế giới Data
          </div>
          <h1 class="explore-hero-title">
            Dữ liệu không khô khan, <span>Data vận hành thế giới</span>
          </h1>
          <p class="explore-hero-desc">
            Mỗi lượt click trên Shopee, mỗi bài hát được Spotify đề xuất hay những chuyến xe Grab đến đúng giờ — tất cả đều được định hình bởi sức mạnh của dữ liệu. Khám phá cách dữ liệu kiến tạo tương lai và tìm kiếm vị trí phù hợp nhất với bạn.
          </p>
        </div>

        <!-- Bento Grid 4 Ô (2 Cột x 2 Hàng) -->
        <div class="explore-bento-grid">
          <!-- Ô 1: E-Commerce -->
          <div class="explore-bento-card">
            <div class="explore-bento-top">
              <div class="explore-bento-icon-box" style="background:#FFF7ED; color:#EA580C;">
                ${ICONS.shoppingBag(22)}
              </div>
              <span class="explore-bento-tag" style="background:#FFF7ED; color:#C2410C; border:1px solid #FFEDD5;">
                E-Commerce & Bán lẻ
              </span>
            </div>
            <div>
              <div class="explore-bento-stat" style="color:#EA580C;">+35%</div>
              <div class="explore-bento-title">Hệ thống gợi ý Recommender</div>
              <p class="explore-bento-desc">
                Doanh số từ hệ thống gợi ý sản phẩm Recommender của Shopee/Amazon dựa trên lịch sử tìm kiếm và thói quen giỏ hàng.
              </p>
            </div>
          </div>

          <!-- Ô 2: Fintech & Ngân hàng -->
          <div class="explore-bento-card">
            <div class="explore-bento-top">
              <div class="explore-bento-icon-box" style="background:#EFF6FF; color:#2563EB;">
                ${ICONS.shield(22)}
              </div>
              <span class="explore-bento-tag" style="background:#EFF6FF; color:#1E40AF; border:1px solid #DBEAFE;">
                Fintech & Ngân hàng
              </span>
            </div>
            <div>
              <div class="explore-bento-stat" style="color:#2563EB;">50ms / 99.9%</div>
              <div class="explore-bento-title">Chặn đứng gian lận thẻ tín dụng</div>
              <p class="explore-bento-desc">
                Tốc độ phát hiện và chặn đứng giao dịch gian lận thẻ tín dụng bất thường theo thời gian thực trước khi tiền bị chuyển đi.
              </p>
            </div>
          </div>

          <!-- Ô 3: Streaming & Giải trí -->
          <div class="explore-bento-card">
            <div class="explore-bento-top">
              <div class="explore-bento-icon-box" style="background:#F5F3FF; color:#7C3AED;">
                ${ICONS.tv(22)}
              </div>
              <span class="explore-bento-tag" style="background:#F5F3FF; color:#6D28D9; border:1px solid #EDE9FE;">
                Streaming & Giải trí
              </span>
            </div>
            <div>
              <div class="explore-bento-stat" style="color:#7C3AED;">70%</div>
              <div class="explore-bento-title">Thuật toán cá nhân hóa nội dung</div>
              <p class="explore-bento-desc">
                Thời lượng xem trên TikTok & Spotify đến từ thuật toán cá nhân hóa thông minh, giữ chân người dùng cuốn hút theo sở thích riêng.
              </p>
            </div>
          </div>

          <!-- Ô 4: Logistics & Đô thị -->
          <div class="explore-bento-card">
            <div class="explore-bento-top">
              <div class="explore-bento-icon-box" style="background:#ECFDF5; color:#059669;">
                ${ICONS.truck(22)}
              </div>
              <span class="explore-bento-tag" style="background:#ECFDF5; color:#065F46; border:1px solid #D1FAE5;">
                Logistics & Đô thị
              </span>
            </div>
            <div>
              <div class="explore-bento-stat" style="color:#059669;">25%</div>
              <div class="explore-bento-title">Điều phối luồng xe thông minh</div>
              <p class="explore-bento-desc">
                Thời gian giao hàng được rút ngắn nhờ thuật toán điều phối luồng xe của Grab, tối ưu hóa cung đường và dự báo nhu cầu tài xế.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- 2. 3 HƯỚNG ĐI CỐT LÕI (CAREER CARDS - DA, DE, DS) -->
      <section class="explore-section">
        <div class="explore-section-header">
          <div class="explore-section-tag">
            ${ICONS.briefcase(14)} Định hướng nghề nghiệp
          </div>
          <h2 class="explore-section-title">3 Hướng đi cốt lõi trong ngành Data</h2>
          <p class="explore-section-subtitle">
            Chuyển đổi qua các tab để tìm hiểu chi tiết một ngày làm việc thực tế, bài toán cần giải quyết và chân dung người phù hợp nhất cho từng vai trò.
          </p>
        </div>

        <div class="explore-career-grid">
          ${Object.values(CAREER_DATA).map((role) => `
            <div class="explore-career-card ${role.themeClass}" data-career="${role.id}">
              <div class="explore-career-top">
                <div class="explore-career-icon-box" style="background: ${role.iconBg}; color: ${role.iconColor};">
                  ${role.icon(22)}
                </div>
                <span class="explore-career-badge" style="background: ${role.iconBg}; color: ${role.iconColor};">
                  ${role.tag}
                </span>
              </div>
              <h3 class="explore-career-title">${role.name}</h3>
              <div class="explore-career-quote">${role.quote}</div>
              <p style="font-size: 13.5px; color: #475569; line-height: 1.5; margin: 0 0 12px 0;">
                ${role.desc}
              </p>

              <div class="explore-career-meta-label">Công cụ cốt lõi</div>
              <div class="explore-chip-wrap">
                ${role.tools.map((t) => `<span class="explore-chip">${t}</span>`).join('')}
              </div>

              <!-- Segmented Control Tabs (Mini Tabs) -->
              <div class="explore-segmented-tabs" data-role-tabs="${role.id}">
                <button class="explore-tab-btn active" data-tab="timeline">1 Ngày làm việc</button>
                <button class="explore-tab-btn" data-tab="problem">Bài toán thực tế</button>
                <button class="explore-tab-btn" data-tab="persona">Ai phù hợp?</button>
              </div>

              <!-- Tab Pane: Timeline -->
              <div class="explore-tab-pane active" id="pane-${role.id}-timeline">
                <div class="explore-timeline-vert">
                  ${role.timeline.map((item) => `
                    <div class="explore-timeline-item dot-${role.id === 'da' ? 'blue' : role.id === 'de' ? 'orange' : 'purple'}">
                      <span class="explore-timeline-dot"></span>
                      <span class="explore-timeline-time">${item.time}</span>
                      <span>${item.text}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Tab Pane: Problem -->
              <div class="explore-tab-pane" id="pane-${role.id}-problem">
                <div class="explore-callout-quote">
                  ${role.problem}
                </div>
              </div>

              <!-- Tab Pane: Persona -->
              <div class="explore-tab-pane" id="pane-${role.id}-persona">
                <div class="explore-persona-box">
                  ${role.persona.map((p) => `
                    <div class="explore-persona-item">
                      ${ICONS.checkCircle(15)}
                      <span>${p}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

            </div>
          `).join('')}
        </div>
      </section>

      <!-- 3. KHUNG LỘ TRÌNH CẤP BẬC & MỨC LƯƠNG -->
      <section class="explore-section">
        <div class="explore-section-header">
          <div class="explore-section-tag">
            ${ICONS.trendingUp(14)} Tiềm năng phát triển
          </div>
          <h2 class="explore-section-title">Lộ trình cấp bậc & Mức lương tham khảo</h2>
          <p class="explore-section-subtitle">
            Khung phát triển sự nghiệp chuẩn hóa cùng mức thu nhập trung bình trên thị trường tuyển dụng công nghệ.
          </p>
        </div>

        <div class="explore-salary-card">
          <!-- 5-Step Stepper -->
          <div class="explore-stepper-wrap">
            <div class="explore-step-item">
              <div class="explore-step-circle">1</div>
              <div class="explore-step-name">Intern</div>
              <div class="explore-step-years">0 - 6 tháng</div>
            </div>
            <div class="explore-step-item">
              <div class="explore-step-circle">2</div>
              <div class="explore-step-name">Fresher</div>
              <div class="explore-step-years">6 tháng - 1.5 năm</div>
            </div>
            <div class="explore-step-item">
              <div class="explore-step-circle active">3</div>
              <div class="explore-step-name">Junior</div>
              <div class="explore-step-years">1 - 3 năm</div>
            </div>
            <div class="explore-step-item">
              <div class="explore-step-circle">4</div>
              <div class="explore-step-name">Middle</div>
              <div class="explore-step-years">3 - 5 năm</div>
            </div>
            <div class="explore-step-item">
              <div class="explore-step-circle">5</div>
              <div class="explore-step-name">Senior / Lead</div>
              <div class="explore-step-years">5+ năm</div>
            </div>
          </div>

          <!-- Salary Benchmark Table -->
          <div class="explore-table-container">
            <table class="explore-table">
              <thead>
                <tr>
                  <th>Vị trí nghề nghiệp</th>
                  <th>Intern</th>
                  <th>Fresher</th>
                  <th>Junior (1-3 năm)</th>
                  <th>Middle (3-5 năm)</th>
                  <th>Senior / Lead (5+ năm)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div style="font-weight: 800; color: #0B1533;">Data Analyst (DA)</div>
                    <div style="font-size: 11.5px; color: #64748B;">Phân tích kinh doanh</div>
                  </td>
                  <td><span class="salary-pill da">3 – 6 triệu</span></td>
                  <td><span class="salary-pill da">8 – 15 triệu</span></td>
                  <td><span class="salary-pill da">15 – 25 triệu</span></td>
                  <td><span class="salary-pill da">25 – 40 triệu</span></td>
                  <td><span class="salary-pill da">40 – 70 triệu</span></td>
                </tr>
                <tr>
                  <td>
                    <div style="font-weight: 800; color: #0B1533;">Data Engineer (DE)</div>
                    <div style="font-size: 11.5px; color: #64748B;">Hạ tầng & Đường ống</div>
                  </td>
                  <td><span class="salary-pill de">4 – 8 triệu</span></td>
                  <td><span class="salary-pill de">10 – 18 triệu</span></td>
                  <td><span class="salary-pill de">20 – 35 triệu</span></td>
                  <td><span class="salary-pill de">35 – 55 triệu</span></td>
                  <td><span class="salary-pill de">55 – 90 triệu</span></td>
                </tr>
                <tr>
                  <td>
                    <div style="font-weight: 800; color: #0B1533;">Data Scientist (DS)</div>
                    <div style="font-size: 11.5px; color: #64748B;">Mô hình học máy & AI</div>
                  </td>
                  <td><span class="salary-pill ds">4 – 8 triệu</span></td>
                  <td><span class="salary-pill ds">12 – 20 triệu</span></td>
                  <td><span class="salary-pill ds">22 – 38 triệu</span></td>
                  <td><span class="salary-pill ds">38 – 60 triệu</span></td>
                  <td><span class="salary-pill ds">60 – 100+ triệu</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Disclaimer footer -->
          <div class="explore-salary-disclaimer">
            <div style="display:flex; align-items:center; gap:8px;">
              ${ICONS.info(16)}
              <span><strong>Khảo sát thị trường:</strong> Dữ liệu tổng hợp từ thị trường công nghệ Việt Nam 2024-2025. Mức lương thực tế tùy thuộc vào quy mô công ty, ngoại ngữ và năng lực dự án.</span>
            </div>
            <span style="color: #0284C7; font-weight: 700;">Nhu cầu nhân sự tăng ~30%/năm</span>
          </div>
        </div>
      </section>

      <!-- 4. MINI DATA GAMES (INTERACTIVE GAME PLAYGROUND) -->
      <section class="explore-section">
        <div class="explore-section-header">
          <div class="explore-section-tag">
            ${ICONS.gamepad(14)} Trải nghiệm tương tác
          </div>
          <h2 class="explore-section-title">Mini Data Games: Thử sức phản xạ</h2>
          <p class="explore-section-subtitle">
            Chơi trực tiếp 3 thử thách thực tế dưới đây để kiểm tra giác quan Data và tích lũy ngay điểm thưởng XP vào hồ sơ của bạn!
          </p>
        </div>

        <div class="explore-games-grid">
          
          <!-- GAME 1: DATA DETECTIVE -->
          <div class="explore-game-card" id="game-detective-card">
            <div>
              <div class="explore-game-header">
                <span class="explore-game-num-tag">Game 1</span>
                <span class="explore-game-xp-badge">${ICONS.star(12)} +30 XP</span>
              </div>
              <h3 class="explore-game-title">Data Detective (Thám tử)</h3>
              <p class="explore-game-desc">
                Bảng bên dưới có <strong>3 ô bị lỗi chất lượng dữ liệu</strong> (giá trị âm vô lý, để trống null, hoặc tiền âm). Hãy click chọn đúng 3 ô đó!
              </p>

              <!-- Detective Table -->
              <div class="detective-table-wrap">
                <table class="detective-table" id="detective-table">
                  <thead>
                    <tr>
                      <th>Mã ĐH</th>
                      <th>Khách hàng</th>
                      <th>SL</th>
                      <th>Thành tiền</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td data-err="0">ĐH-101</td>
                      <td data-err="0">Nguyễn Văn A</td>
                      <td data-err="0">2</td>
                      <td data-err="0">400.000đ</td>
                    </tr>
                    <tr>
                      <td data-err="0">ĐH-102</td>
                      <td data-err="0">Trần Thị B</td>
                      <td data-err="1" title="Bấm để chọn ô này">-3</td>
                      <td data-err="0">600.000đ</td>
                    </tr>
                    <tr>
                      <td data-err="0">ĐH-103</td>
                      <td data-err="1" title="Bấm để chọn ô này"><em>(null - trống)</em></td>
                      <td data-err="0">1</td>
                      <td data-err="0">150.000đ</td>
                    </tr>
                    <tr>
                      <td data-err="0">ĐH-104</td>
                      <td data-err="0">Lê Văn C</td>
                      <td data-err="0">5</td>
                      <td data-err="0">1.250.000đ</td>
                    </tr>
                    <tr>
                      <td data-err="0">ĐH-105</td>
                      <td data-err="0">Hoàng Nam</td>
                      <td data-err="0">2</td>
                      <td data-err="1" title="Bấm để chọn ô này">-50.000đ</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <div id="detective-feedback" class="game-feedback-msg"></div>
              <button class="game-action-btn" id="btn-check-detective">
                ${ICONS.checkCircle(16)} Kiểm tra kết quả
              </button>
            </div>
          </div>

          <!-- GAME 2: CHART MASTER -->
          <div class="explore-game-card" id="game-chart-card">
            <div>
              <div class="explore-game-header">
                <span class="explore-game-num-tag">Game 2</span>
                <span class="explore-game-xp-badge">${ICONS.star(12)} +30 XP</span>
              </div>
              <h3 class="explore-game-title">Chart Master (Chọn biểu đồ)</h3>
              <p class="explore-game-desc">
                Ban Giám Đốc muốn <strong>so sánh tỷ lệ cơ cấu doanh thu theo 4 danh mục hàng hóa trong Quý 3</strong> để xem nhóm nào chiếm tỷ trọng lớn nhất. Bạn chọn loại biểu đồ nào?
              </p>

              <!-- Choice Cards -->
              <div class="chart-choice-list" id="chart-choices">
                <button class="chart-choice-card" data-choice="line">
                  <div class="chart-choice-icon">${ICONS.lineChart(18)}</div>
                  <div class="chart-choice-text">
                    <strong>Line Chart</strong>
                    <span>Biểu đồ đường biến thiên theo thời gian</span>
                  </div>
                </button>
                <button class="chart-choice-card" data-choice="pie">
                  <div class="chart-choice-icon">${ICONS.pieChart(18)}</div>
                  <div class="chart-choice-text">
                    <strong>Pie / Donut Chart</strong>
                    <span>Biểu đồ tròn so sánh tỷ trọng cơ cấu</span>
                  </div>
                </button>
                <button class="chart-choice-card" data-choice="scatter">
                  <div class="chart-choice-icon">${ICONS.sparkles(18)}</div>
                  <div class="chart-choice-text">
                    <strong>Scatter Plot</strong>
                    <span>Biểu đồ phân tán tìm kiếm tương quan</span>
                  </div>
                </button>
              </div>
            </div>

            <div>
              <div id="chart-feedback" class="game-feedback-msg"></div>
              <button class="game-action-btn" id="btn-check-chart" disabled>
                ${ICONS.checkCircle(16)} Xác nhận biểu đồ
              </button>
            </div>
          </div>

          <!-- GAME 3: FIND THE INSIGHT -->
          <div class="explore-game-card" id="game-insight-card">
            <div>
              <div class="explore-game-header">
                <span class="explore-game-num-tag">Game 3</span>
                <span class="explore-game-xp-badge">${ICONS.star(12)} +30 XP</span>
              </div>
              <h3 class="explore-game-title">Find the Insight (Đọc số liệu)</h3>
              <p class="explore-game-desc">
                Quan sát bảng chiến dịch Marketing dưới đây và chọn nhận định mang lại <strong>giá trị kinh doanh (Actionable Insight)</strong> sâu sắc nhất:
              </p>

              <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; padding:10px 12px; font-size:12px; margin-bottom:12px; line-height:1.5;">
                <div>• <strong>Facebook:</strong> Chi 20tr | 500 khách đăng ký | Mua 8% | Thu 60tr</div>
                <div>• <strong>Google:</strong> Chi 20tr | 250 khách đăng ký | Mua 24% | Thu 95tr</div>
              </div>

              <!-- Choice Cards -->
              <div class="insight-card-list" id="insight-choices">
                <button class="insight-card-btn" data-choice="1">
                  1. Facebook tốt hơn vì thu hút nhiều khách đăng ký gấp đôi (500 vs 250).
                </button>
                <button class="insight-card-btn" data-choice="2">
                  2. Google ít khách hơn nhưng tỷ lệ mua gấp 3 và doanh thu vượt trội (+58%). Nên dồn ngân sách vào Google.
                </button>
                <button class="insight-card-btn" data-choice="3">
                  3. Cả hai kênh đều chi 20 triệu nên hiệu quả đem lại cho công ty là như nhau.
                </button>
              </div>
            </div>

            <div>
              <div id="insight-feedback" class="game-feedback-msg"></div>
              <button class="game-action-btn" id="btn-check-insight" disabled>
                ${ICONS.checkCircle(16)} Xác nhận Insight
              </button>
            </div>
          </div>

        </div>
      </section>

      <!-- 5. IS DATA RIGHT FOR YOU? (STEPPER QUIZ TRẮC NGHIỆM TỪNG CÂU) -->
      <section class="explore-section">
        <div class="explore-section-header">
          <div class="explore-section-tag">
            ${ICONS.lightbulb(14)} Trắc nghiệm hướng nghiệp
          </div>
          <h2 class="explore-section-title">Is Data Right for You? (Khảo sát 5 câu)</h2>
          <p class="explore-section-subtitle">
            Trả lời từng câu hỏi ngắn để hệ thống phân tích tư duy và xác định vị trí phù hợp nhất với bạn trong thế giới Data.
          </p>
        </div>

        <div class="explore-quiz-card">
          <!-- Active Question Container -->
          <div id="quiz-question-container">
            <div class="quiz-stepper-header">
              <span class="quiz-stepper-label" id="quiz-step-label">Câu hỏi 1 / 5</span>
              <span class="quiz-stepper-count" id="quiz-step-progress-text">20% Hoàn thành</span>
            </div>
            
            <div class="quiz-progress-track">
              <div class="quiz-progress-fill" id="quiz-progress-bar" style="width: 20%;"></div>
            </div>

            <div class="quiz-question-box" id="quiz-box">
              <!-- Content rendered dynamically via JavaScript -->
            </div>
          </div>

          <!-- Celebration Result View (Hidden initially) -->
          <div class="quiz-result-view" id="quiz-result-view">
            <div class="quiz-result-trophy">
              ${ICONS.trophy(32)}
            </div>
            <div class="quiz-result-badge-top">Kết quả phân tích định hướng</div>
            <h3 class="quiz-result-title">
              Bạn có thiên hướng trở thành <span id="res-top-role">Data Analyst</span>!
            </h3>
            <p class="quiz-result-desc" id="res-top-desc">
              Dựa trên câu trả lời, bạn có trực giác kinh doanh sắc bén, thích đào sâu tìm nguyên nhân và đam mê kể chuyện qua hình ảnh biểu đồ trực quan.
            </p>

            <!-- 3 Correlation Bars -->
            <div class="quiz-correlation-box">
              <div class="quiz-corr-row">
                <div class="quiz-corr-label">
                  <span>Data Analyst (DA)</span>
                  <span id="corr-da-pct" style="color: #2563EB;">80%</span>
                </div>
                <div class="quiz-corr-track">
                  <div class="quiz-corr-fill" id="corr-da-bar" style="width: 80%; background: #2563EB;"></div>
                </div>
              </div>

              <div class="quiz-corr-row">
                <div class="quiz-corr-label">
                  <span>Data Engineer (DE)</span>
                  <span id="corr-de-pct" style="color: #EA580C;">45%</span>
                </div>
                <div class="quiz-corr-track">
                  <div class="quiz-corr-fill" id="corr-de-bar" style="width: 45%; background: #EA580C;"></div>
                </div>
              </div>

              <div class="quiz-corr-row">
                <div class="quiz-corr-label">
                  <span>Data Scientist (DS)</span>
                  <span id="corr-ds-pct" style="color: #7C3AED;">30%</span>
                </div>
                <div class="quiz-corr-track">
                  <div class="quiz-corr-fill" id="corr-ds-bar" style="width: 30%; background: #7C3AED;"></div>
                </div>
              </div>
            </div>

            <!-- Action buttons -->
            <div class="quiz-actions-row">
              <button class="quiz-cta-primary" id="btn-quiz-go-roadmap">
                <span>Khám phá Roadmap ngay</span>
                ${ICONS.arrowRight(16)}
              </button>
              <button class="quiz-cta-secondary" id="btn-quiz-restart">
                ${ICONS.refresh(15)} Làm lại trắc nghiệm
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  `;

  // ── ATTACH INTERACTIVE HANDLERS ───────────────
  initCareerTabs(container);
  initMiniGames(container);
  initStepperQuiz(container, navigate);
}

// ── 1. SEGMENTED TABS CHO 3 CARD NGHỀ NGHIỆP ───
function initCareerTabs(container) {
  const tabGroups = container.querySelectorAll('.explore-segmented-tabs');
  tabGroups.forEach((group) => {
    const role = group.dataset.roleTabs;
    const btns = group.querySelectorAll('.explore-tab-btn');

    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        btns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const tabKey = btn.dataset.tab;
        const card = container.querySelector(`[data-career="${role}"]`);
        if (!card) return;

        // Hide all panes for this role
        card.querySelectorAll('.explore-tab-pane').forEach((pane) => {
          pane.classList.remove('active');
        });

        // Show matching pane
        const targetPane = card.querySelector(`#pane-${role}-${tabKey}`);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  });
}

// ── 2. MINI DATA GAMES LOGIC ──────────────────
function initMiniGames(container) {
  // ── GAME 1: DATA DETECTIVE ──
  const detectiveTable = container.querySelector('#detective-table');
  const btnCheckDetective = container.querySelector('#btn-check-detective');
  const feedbackDetective = container.querySelector('#detective-feedback');
  const selectedCells = new Set();

  detectiveTable.querySelectorAll('tbody td').forEach((td, idx) => {
    td.addEventListener('click', () => {
      if (selectedCells.has(idx)) {
        selectedCells.delete(idx);
        td.classList.remove('selected-cell');
      } else {
        selectedCells.add(idx);
        td.classList.add('selected-cell');
      }
    });
  });

  btnCheckDetective.addEventListener('click', () => {
    let correctCount = 0;
    let wrongCount = 0;

    selectedCells.forEach((idx) => {
      const td = detectiveTable.querySelectorAll('tbody td')[idx];
      if (td && td.dataset.err === '1') {
        correctCount++;
      } else {
        wrongCount++;
      }
    });

    if (correctCount === 3 && wrongCount === 0) {
      feedbackDetective.className = 'game-feedback-msg success show';
      feedbackDetective.innerHTML = `
        <strong>${ICONS.checkCircle(16)} Xuất sắc! Thám tử dữ liệu siêu hạng!</strong><br>
        Bạn đã chỉ ra chính xác 3 lỗi chất lượng dữ liệu:
        <ul style="margin:6px 0 0 16px; padding:0; line-height:1.45;">
          <li>Số lượng âm (-3): Lỗi logic nghiệp vụ nhập liệu.</li>
          <li>Khách hàng null: Lỗi dữ liệu thiếu (Missing Value).</li>
          <li>Thành tiền âm (-50.000đ): Lỗi tính toán đơn hàng.</li>
        </ul>
      `;
      btnCheckDetective.disabled = true;
      btnCheckDetective.innerHTML = `${ICONS.check(16)} Đã hoàn thành (+30 XP)`;

      if (!localStorage.getItem('daconnect_game_detective_awarded')) {
        addXP(30, 'Hoàn thành mini-game Data Detective');
        localStorage.setItem('daconnect_game_detective_awarded', 'true');
        showToast('Chúc mừng! Bạn nhận được +30 XP từ Data Detective!', 'success');
      }
    } else {
      feedbackDetective.className = 'game-feedback-msg error show';
      feedbackDetective.innerHTML = `
        <strong>${ICONS.alertTriangle(16)} Chưa chính xác!</strong><br>
        Bạn đã chọn đúng ${correctCount}/3 ô lỗi (và có ${wrongCount} ô chọn sai). Hãy tìm các giá trị bất thường như số âm hoặc ô bị để trống null nhé!
      `;
    }
  });

  // ── GAME 2: CHART MASTER ──
  const chartChoices = container.querySelectorAll('#chart-choices .chart-choice-card');
  const btnCheckChart = container.querySelector('#btn-check-chart');
  const feedbackChart = container.querySelector('#chart-feedback');
  let selectedChart = null;

  chartChoices.forEach((btn) => {
    btn.addEventListener('click', () => {
      chartChoices.forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedChart = btn.dataset.choice;
      btnCheckChart.disabled = false;
    });
  });

  btnCheckChart.addEventListener('click', () => {
    if (!selectedChart) return;

    chartChoices.forEach((b) => {
      b.classList.remove('correct', 'wrong');
      if (b.dataset.choice === 'pie') b.classList.add('correct');
      else if (b.dataset.choice === selectedChart) b.classList.add('wrong');
    });

    if (selectedChart === 'pie') {
      feedbackChart.className = 'game-feedback-msg success show';
      feedbackChart.innerHTML = `
        <strong>${ICONS.checkCircle(16)} Chính xác 100%!</strong><br>
        Để thể hiện <em>tỷ lệ cơ cấu / tỷ trọng (part-to-whole)</em> của một tập hợp nhỏ (4 danh mục), <strong>Pie / Donut Chart</strong> là lựa chọn tối ưu nhất giúp người xem nhìn ra ngay danh mục chiếm miếng bánh to nhất!
      `;
      btnCheckChart.disabled = true;
      btnCheckChart.innerHTML = `${ICONS.check(16)} Đã hoàn thành (+30 XP)`;

      if (!localStorage.getItem('daconnect_game_chart_awarded')) {
        addXP(30, 'Hoàn thành mini-game Chart Master');
        localStorage.setItem('daconnect_game_chart_awarded', 'true');
        showToast('Chúc mừng! Bạn nhận được +30 XP từ Chart Master!', 'success');
      }
    } else {
      feedbackChart.className = 'game-feedback-msg error show';
      feedbackChart.innerHTML = `
        <strong>${ICONS.alertTriangle(16)} Chưa tối ưu!</strong><br>
        Line Chart phù hợp cho biến thiên theo thời gian; Scatter Plot phù hợp tìm tương quan. Để so sánh tỷ lệ cơ cấu, hãy chọn <strong>Pie / Donut Chart</strong>!
      `;
    }
  });

  // ── GAME 3: FIND THE INSIGHT ──
  const insightChoices = container.querySelectorAll('#insight-choices .insight-card-btn');
  const btnCheckInsight = container.querySelector('#btn-check-insight');
  const feedbackInsight = container.querySelector('#insight-feedback');
  let selectedInsight = null;

  insightChoices.forEach((btn) => {
    btn.addEventListener('click', () => {
      insightChoices.forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedInsight = btn.dataset.choice;
      btnCheckInsight.disabled = false;
    });
  });

  btnCheckInsight.addEventListener('click', () => {
    if (!selectedInsight) return;

    insightChoices.forEach((b) => {
      b.classList.remove('correct', 'wrong');
      if (b.dataset.choice === '2') b.classList.add('correct');
      else if (b.dataset.choice === selectedInsight) b.classList.add('wrong');
    });

    if (selectedInsight === '2') {
      feedbackInsight.className = 'game-feedback-msg success show';
      feedbackInsight.innerHTML = `
        <strong>${ICONS.checkCircle(16)} Tư duy Data-Driven tuyệt vời!</strong><br>
        Người làm Data giỏi không chỉ nhìn vào số lượng bề nổi (Vanity Metrics như số lượt đăng ký) mà nhìn vào <em>chất lượng chuyển đổi cuối phễu và tỷ suất lợi nhuận (Conversion Rate & ROI)</em>. Kênh Google mang lại hiệu quả cao hơn rõ rệt!
      `;
      btnCheckInsight.disabled = true;
      btnCheckInsight.innerHTML = `${ICONS.check(16)} Đã hoàn thành (+30 XP)`;

      if (!localStorage.getItem('daconnect_game_insight_awarded')) {
        addXP(30, 'Hoàn thành mini-game Find the Insight');
        localStorage.setItem('daconnect_game_insight_awarded', 'true');
        showToast('Chúc mừng! Bạn nhận được +30 XP từ Find the Insight!', 'success');
      }
    } else {
      feedbackInsight.className = 'game-feedback-msg error show';
      feedbackInsight.innerHTML = `
        <strong>${ICONS.alertTriangle(16)} Chưa phải Insight cốt lõi!</strong><br>
        Lượng đăng ký nhiều chưa chắc đã hiệu quả nếu khách không mua hàng. Hãy chú ý tỷ lệ chuyển đổi và doanh thu thực tế giữa hai kênh!
      `;
    }
  });
}

// ── 3. STEPPER QUIZ TRẮC NGHIỆM TỪNG CÂU ──────
function initStepperQuiz(container, navigate) {
  let currentIndex = 0;
  const userAnswers = []; // array of 'da' | 'de' | 'ds'

  const qBox = container.querySelector('#quiz-box');
  const stepLabel = container.querySelector('#quiz-step-label');
  const stepProgressText = container.querySelector('#quiz-step-progress-text');
  const progressBar = container.querySelector('#quiz-progress-bar');
  const questionContainer = container.querySelector('#quiz-question-container');
  const resultView = container.querySelector('#quiz-result-view');

  const btnGoRoadmap = container.querySelector('#btn-quiz-go-roadmap');
  const btnRestart = container.querySelector('#btn-quiz-restart');

  function renderCurrentQuestion() {
    const q = QUIZ_QUESTIONS[currentIndex];
    const pct = Math.round(((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100);

    stepLabel.textContent = `Câu hỏi ${currentIndex + 1} / ${QUIZ_QUESTIONS.length}`;
    stepProgressText.textContent = `${pct}% Hoàn thành`;
    progressBar.style.width = `${pct}%`;

    qBox.innerHTML = `
      <h3 class="quiz-question-title">${q.title}</h3>
      <div class="quiz-options-group">
        ${q.options.map((opt) => `
          <button class="quiz-choice-btn" data-role="${opt.role}">
            <span class="quiz-choice-letter">${opt.letter}</span>
            <span>${opt.text}</span>
          </button>
        `).join('')}
      </div>
    `;

    // Attach choice click handlers
    qBox.querySelectorAll('.quiz-choice-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const role = btn.dataset.role;
        userAnswers[currentIndex] = role;

        // Visual flash of selected choice
        btn.style.borderColor = '#FF5B18';
        btn.style.background = '#FFF7ED';

        setTimeout(() => {
          if (currentIndex < QUIZ_QUESTIONS.length - 1) {
            currentIndex++;
            renderCurrentQuestion();
          } else {
            showQuizResults();
          }
        }, 220);
      });
    });
  }

  function showQuizResults() {
    const scores = { da: 0, de: 0, ds: 0 };
    userAnswers.forEach((r) => {
      if (scores[r] !== undefined) scores[r]++;
    });

    const total = QUIZ_QUESTIONS.length;
    const daPct = Math.round((scores.da / total) * 100);
    const dePct = Math.round((scores.de / total) * 100);
    const dsPct = Math.round((scores.ds / total) * 100);

    let topRole = 'da';
    if (scores.de > scores.da && scores.de >= scores.ds) topRole = 'de';
    else if (scores.ds > scores.da && scores.ds > scores.de) topRole = 'ds';

    const roleInfo = {
      da: {
        name: 'Data Analyst (DA)',
        desc: 'Bạn có trực giác kinh doanh sắc bén, thích đào sâu tìm nguyên nhân vấn đề và hào hứng khi trực quan hóa dữ liệu qua biểu đồ cho người khác. Lộ trình học SQL, Power BI và phân tích định lượng sẽ là bệ phóng tuyệt vời nhất cho bạn!',
      },
      de: {
        name: 'Data Engineer (DE)',
        desc: 'Bạn đam mê lập trình, kiến trúc hệ thống và thích sự tối ưu hóa luồng dữ liệu trơn tru không lỗi. Lộ trình học Python nâng cao, Apache Spark, cơ sở dữ liệu lớn và thiết kế Data Pipeline sẽ biến bạn thành một kỹ sư hạ tầng đắt giá!',
      },
      ds: {
        name: 'Data Scientist (DS)',
        desc: 'Bạn có niềm say mê với toán học, thống kê và tò mò về trí tuệ nhân tạo (AI). Khả năng kiên nhẫn tìm quy luật ẩn và huấn luyện các mô hình Machine Learning dự báo tương lai sẽ là lợi thế cạnh tranh hàng đầu của bạn!',
      },
    };

    const res = roleInfo[topRole];
    container.querySelector('#res-top-role').textContent = res.name;
    container.querySelector('#res-top-desc').textContent = res.desc;

    // Set dynamic button CTA text
    if (btnGoRoadmap) {
      btnGoRoadmap.innerHTML = `<span>Khám phá Roadmap ${res.name} ngay</span> ${ICONS.arrowRight(16)}`;
    }

    // Set correlation bars
    container.querySelector('#corr-da-pct').textContent = `${daPct}%`;
    container.querySelector('#corr-da-bar').style.width = `${Math.max(daPct, 10)}%`;

    container.querySelector('#corr-de-pct').textContent = `${dePct}%`;
    container.querySelector('#corr-de-bar').style.width = `${Math.max(dePct, 10)}%`;

    container.querySelector('#corr-ds-pct').textContent = `${dsPct}%`;
    container.querySelector('#corr-ds-bar').style.width = `${Math.max(dsPct, 10)}%`;

    questionContainer.style.display = 'none';
    resultView.classList.add('show');
    resultView.scrollIntoView({ behavior: 'smooth', block: 'center' });

    showToast(`Chúc mừng! Bạn phù hợp nhất với vị trí ${res.name}.`, 'success');
  }

  // Navigation handlers
  btnGoRoadmap.addEventListener('click', () => {
    if (navigate) navigate('roadmap');
  });

  btnRestart.addEventListener('click', () => {
    currentIndex = 0;
    userAnswers.length = 0;
    resultView.classList.remove('show');
    questionContainer.style.display = 'block';
    renderCurrentQuestion();
  });

  // Initial render
  renderCurrentQuestion();
}
