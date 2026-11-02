# DaConnect – Data Career Community Platform

Nền tảng cộng đồng, học tập tương tác và phát triển sự nghiệp Khoa học Dữ liệu (Data Science & Analytics) dành cho sinh viên và nhân sự chuyển ngành tại Việt Nam.

---

## 1. TỔNG QUAN DỰ ÁN

DaConnect là hệ thống Single Page Application (SPA) tích hợp toàn diện các phân hệ từ định hướng nghề nghiệp, đào tạo kỹ năng thực chiến, rèn luyện giải thuật dữ liệu, đến xây dựng hồ sơ năng lực (Portfolio) và kết nối việc làm.

Hệ thống được thiết kế theo tiêu chuẩn công nghệ và giao diện của các nền tảng giáo dục công nghệ hàng đầu (Brilliant.org, DataCamp, LeetCode, NeetCode), kết hợp cơ chế Gamification giúp tối ưu hóa động lực học tập bền bỉ cho người dùng.

### Các giá trị cốt lõi
- Học tập qua thực hành (Learn Data by doing): Chuyển hóa lý thuyết thành các bài toán dữ liệu thực tế có thể chạy code và chấm điểm tự động tức thì.
- Lộ trình có cấu trúc (Structured Roadmap): Bản đồ tri thức dạng đồ thị có hướng (DAG), phân định rõ mối quan hệ điều kiện tiên quyết giữa các kỹ năng.
- Gắn kết cộng đồng (Community-Driven): Diễn đàn hỏi đáp kỹ thuật, tạp chí phân tích xu hướng AI/Data và nhóm cộng đồng hỗ trợ hơn 9,500 thành viên.

---

## 2. KIẾN TRÚC KỸ THUẬT VÀ CÔNG NGHỆ

Dự án áp dụng mô hình kiến trúc SPA không phụ thuộc vào framework nặng, tối ưu hóa triệt để tốc độ phản hồi và khả năng bảo trì lâu dài.

| Thành phần | Công nghệ sử dụng | Mục đích triển khai |
| :--- | :--- | :--- |
| Core Framework | Vanilla JavaScript (ES6+ Modules) | Kiến trúc Module hóa độc lập, không phụ thuộc build tool phức tạp, tải trang dưới 0.5s |
| Routing Engine | Client-Side Hash Router | Quản lý lịch sử duyệt trang, điều hướng mượt mà không reload trình duyệt |
| Styling & Tokens | Tailwind CSS + CSS Custom Properties | Hệ thống Design System phân tầng (`tokens.css`, `base.css`, `layout.css`, `components.css`) |
| Interactive Visuals | Canvas API & Dynamic SVG Cartesian Graphs | Đồ họa dữ liệu tương tác, biểu đồ phân tán hồi quy tuyến tính, sóng Bézier và đồ thị DAG |
| State Management | LocalStorage Client Store | Bảo toàn trạng thái bài tập, điểm kinh nghiệm (XP), chuỗi ngày học (Streak) và cấu hình cá nhân |
| Iconography | SVG Outline Vector Engine | Hệ thống hơn 40 biểu tượng vector nét mảnh chuẩn mực, đồng bộ hoàn toàn phong cách Lucide |
| Branding Assets | High-Resolution Master PNG/SVG | Logo thương hiệu tỷ lệ vuông chuẩn 1:1, favicon đa độ phân giải tối ưu trên mọi màn hình |

---

## 3. DANH MỤC PHÂN HỆ CHỨC NĂNG

Hệ thống bao gồm 11 phân hệ chức năng chuyên biệt, được liên kết chặt chẽ thông qua luồng dữ liệu người dùng:

| Phân hệ | Tuyến đường (Route) | Mô tả nghiệp vụ và tính năng trọng tâm |
| :--- | :---: | :--- |
| Trang chủ (Dashboard) | `#dashboard` | Trung tâm điều khiển cá nhân: Banner Hero tương tác Brilliant.org, cụm 3 thẻ chỉ số Gamified Stats (Điểm XP, Chuỗi ngày học Streak, Thử thách hôm nay), danh sách nhiệm vụ tân thủ và tiến độ kỹ năng tổng thể. |
| Khám phá Data (Explore) | `#explore` | Định hướng nghề nghiệp: Bento Grid 4 lĩnh vực ứng dụng (E-commerce, Fintech, Streaming, Logistics); Thẻ mô tả 3 vị trí (Data Analyst, Data Engineer, Data Scientist); Bảng thang bậc thu nhập; 3 Mini Data Games và Bộ trắc nghiệm định hướng 5 bước. |
| Lộ trình học (Roadmap) | `#roadmap` | Cây kỹ năng tương tác mô hình NeetCode: Thuật toán làm nổi bật đường dẫn tiên quyết (Prerequisite Path Traversal); Thanh công cụ Zoom controls viên thuốc (+/-/Focus); Hint bar gợi ý; Side Drawer tích hợp bài học YouTube và tài liệu W3Schools; Deep-linking bài tập. |
| Phòng thực hành (Practice Lab) | `#practice` | Môi trường luyện code thực chiến: 42 bài tập phân loại theo 14 chủ đề kỹ năng (Python, NumPy, Pandas, Data Cleaning, SQL, EDA, Visualization, ML); Trình soạn thảo mã nguồn tương tác, bộ kiểm tra test cases tự động và chấm điểm XP tức thì. |
| Dự án mẫu (Project Lab) | `#projects` | Thư viện đồ án Portfolio thực tế: Các bài toán kinh doanh trên dữ liệu thật (Phân tích hành vi khách hàng thương mại điện tử, Dự báo biến động nhân sự, Tối ưu chuỗi bán lẻ); Cấu trúc Card Header Minimalist bo góc 16px. |
| Kho tài nguyên (Resources) | `#resources` | Học liệu tuyển chọn: Sách giáo trình chuyên ngành O'Reilly, danh mục khóa học chứng chỉ quốc tế (Google, Harvard, Kaggle), bộ Cheat Sheet tra cứu cú pháp và công cụ phần mềm chuẩn ngành. |
| Tin tức Data & AI (Community) | `#community` | Tạp chí công nghệ chuyên sâu: Các bài viết phân tích xu hướng GenAI, LLMs, kiến trúc dữ liệu Big Data tại các tập đoàn lớn (Netflix, OpenAI, Anthropic); Banner kết nối Facebook Group chính thức với hơn 9,500 thành viên. |
| Diễn đàn hỏi đáp (Data Q&A) | `#qa` | Hệ thống thảo luận kỹ thuật: Bố cục phân cấp câu hỏi và câu trả lời trực quan; Cơ chế biểu quyết (Upvote/Downvote); Điểm uy tín người đóng góp; Phân loại thẻ kỹ năng. |
| Đấu trường (Challenge Arena) | `#challenge` | Sân chơi thử thách định kỳ: Bài toán dữ liệu hàng tuần; Bục vinh danh Podium Top 1 (Vàng kim), Top 2 (Bạc sáng), Top 3 (Đồng ánh cam) với hiệu ứng kim loại có chiều sâu; Bảng xếp hạng thành tích cộng đồng. |
| Cổng nghề nghiệp (Career Hub) | `#career` | Kết nối cơ hội việc làm: Tin tuyển dụng Data Analyst và Data Engineer thực tế từ doanh nghiệp đối tác, tích hợp bài toán thử thách ứng tuyển trực tiếp. |
| Trung tâm trợ giúp (Help Center) | `#help` | Hướng dẫn vận hành hệ thống: Tìm kiếm bài viết trợ giúp; Bảng kiểm tra nhiệm vụ nhập môn (Gamified Quest Checklist); Hệ thống câu hỏi thường gặp (FAQ Accordion). |

---

## 4. QUY CHUẨN THIẾT KẾ VÀ NHẬN DIỆN THƯƠNG HIỆU

### 4.1. Hero Banner và Nghệ thuật Typography Tương tác
- Phong cách chủ đạo: Lấy cảm hứng từ hệ thống edtech của Brilliant.org, sử dụng font chữ Serif cổ điển cỡ lớn (`Newsreader` / `Playfair Display`) kết hợp font đơn không gian (`JetBrains Mono`).
- Đồ họa giao thoa có chủ đích (Intentional Overlap & Layering):
  - Đường biểu đồ hồi quy màu cam: Bắt đầu luồn tự nhiên phía sau nửa bên phải chữ "Data", vươn ra khoảng trống bên phải 146px trên desktop; các điểm dữ liệu cam, beacon circle và badge R2 = 0.94 nằm hoàn toàn ngoài vùng chữ.
  - Đường sóng lượn màu xanh: Luồn phía sau chân chữ "doing", tiếp nối nhịp điệu của tiêu đề.
  - Phân tầng hiển thị (Stacking Context): Biểu đồ nằm sau (`z-index: 1`), nét chữ đen đặc nằm trên (`z-index: 2`, mã màu `#0F172A`). Đoạn đường vẽ bị che khuất tự nhiên bởi các nét chữ mà không dùng nền trắng nhân tạo.

### 4.2. Cụm 3 Thẻ Thống kê Gamified Stats
- Bố cục: 3 khối vòm bo góc đồng đều 26px / 24px, căn chỉnh 4 hàng thông tin pixel-perfect thẳng tắp trên mọi kích thước màn hình.
- Bảng màu chuẩn tương phản WCAG AA (> 4.5:1):
  - Thẻ 1 (Trái - Điểm tích lũy & Hạng): Nền Deep Navy `#0B2A4A`, viền `#175986`, điểm nhấn cyan `#38BDF8`, chữ chính `#F0F9FF`.
  - Thẻ 2 (Giữa - Chuỗi ngày học Streak): Nền Gradient cam năng lượng `linear-gradient(135deg, #9A3412 0%, #C2410C 55%, #EA580C 100%)`, số ngày trắng lớn đậm, biểu tượng ngọn lửa vàng `#FDE68A`.
  - Thẻ 3 (Phải - Thử thách hôm nay): Nền Royal Violet `#281342`, viền `#6D3A91`, điểm nhấn tím sáng `#C084FC`, chữ chính `#FAF5FF`.

### 4.3. Logo Thương hiệu và Biểu tượng Sidebar
- Biểu tượng thương hiệu: Chữ cái lồng ghép DC cách điệu với 4 cột biểu đồ dữ liệu bên trong chữ D và vòng quỹ đạo hạt node bao quanh.
- Định dạng xuất bản: Tỷ lệ vuông chuẩn 1:1 (`512x512px`), phiên bản màu xanh dương gradient (cyan sang royal blue đậm) trên nền trắng.
- Tích hợp thanh bên: Container `.sidebar-logo-mark` kích thước chuẩn 36x36px, nền trắng cao cấp (`#FFFFFF`), viền nhẹ `1px solid var(--color-gray-200)` và đổ bóng nhẹ `0 1px 3px rgba(0,0,0,0.05)`, hòa hợp với tone sáng của sidebar và nhãn "Trang chủ".

---

## 5. HƯỚNG DẪN CÀI ĐẶT VÀ VẬN HÀNH

Dự án được xây dựng trên nền tảng JavaScript ES Modules chuẩn trình duyệt, cho phép khởi chạy linh hoạt trên nhiều môi trường khác nhau mà không cần quy trình build phức tạp.

### Phương thức 1: Sử dụng máy chủ Python (Tối ưu và nhanh nhất)
Nếu môi trường máy tính đã có sẵn Python:

```bash
# Di chuyển vào thư mục dự án
cd DaConnect

# Khởi chạy HTTP Server trên cổng 5173
python -m http.server 5173
```

Mở trình duyệt web và truy cập địa chỉ: `http://localhost:5173/`

### Phương thức 2: Sử dụng Node.js và Vite
Nếu sử dụng môi trường phát triển Node.js:

```bash
# Cài đặt các gói phụ trợ
npm install

# Khởi chạy Vite Development Server
npm run dev
```

---

## 6. CẤU TRÚC THƯ MỤC DỰ ÁN

```text
DaConnect/
├── index.html                   # Entry point, import Google Fonts, CSS tokens và root DOM
├── package.json                 # Cấu hình dự án và scripts Vite dev server
├── README.md                    # Tài liệu kỹ thuật dự án chính thức
├── AI_CHAT_LOG.md               # Hồ sơ nhật ký phát triển cộng tác với AI
└── src/
    ├── main.js                  # Khởi tạo App, quản lý Router và trạng thái người dùng
    ├── assets/                  # Tài nguyên đồ họa thương hiệu
    │   ├── logo.png             # Master Logo vuông 512x512px nền sáng
    │   ├── logo-full.png         # Logo vuông 512x512px kèm chữ DaConnect
    │   ├── logo-trans.png        # Logo bản nền trong suốt RGBA
    │   ├── favicon.png          # Favicon 64x64px
    │   └── favicon-32x32.png    # Favicon 32x32px
    ├── components/              # Các thành phần giao diện tái sử dụng
    │   ├── navbar.js            # Thanh điều hướng trên cùng, breadcrumbs và ô tìm kiếm
    │   ├── sidebar.js           # Thanh bên điều hướng tích hợp logo và menu chức năng
    │   ├── modal.js             # Hộp thoại popup xác nhận và xem chi tiết
    │   └── toast.js             # Hệ thống thông báo trạng thái người dùng
    ├── data/
    │   └── mockData.js          # CSDL giả lập: 42 bài tập, cây roadmap, tin tức, dự án
    ├── modules/                 # Các phân hệ chức năng độc lập (Feature Modules)
    │   ├── dashboard.js         # Phân hệ Trang chủ tổng quan
    │   ├── explore.js           # Phân hệ Khám phá Data (Bento Grid, Games, Quiz)
    │   ├── roadmap.js           # Phân hệ Cây kỹ năng tương tác và Drawer bài học
    │   ├── practice.js          # Phân hệ Phòng thực hành với 42 bài tập lập trình
    │   ├── projects.js          # Phân hệ Đồ án mẫu Portfolio thực tế
    │   ├── resources.js         # Phân hệ Tài nguyên học tập và sách giáo trình
    │   ├── community.js         # Phân hệ Tạp chí tin tức AI và kết nối mạng xã hội
    │   ├── qa.js                # Phân hệ Diễn đàn hỏi đáp kỹ thuật
    │   ├── challenge.js         # Phân hệ Đấu trường thi đấu và bảng xếp hạng
    │   ├── career.js            # Phân hệ Cổng kết nối việc làm và bài toán doanh nghiệp
    │   └── help.js              # Phân hệ Hướng dẫn sử dụng và nhiệm vụ tân thủ
    └── styles/                  # Hệ thống tài liệu thiết kế CSS phân tầng
        ├── tokens.css           # Biến CSS hệ thống (Màu sắc, typography, radius, bóng đổ)
        ├── base.css             # Reset CSS chuẩn và thiết lập typography mặc định
        ├── layout.css           # Cấu trúc khung lưới ứng dụng và responsive breakpoints
        ├── components.css       # Quy chuẩn giao diện cho nút bấm, thẻ, bảng và logo
        ├── modules.css          # Quy chuẩn giao diện chuyên sâu cho từng phân hệ
        ├── roadmap.css          # Quy chuẩn giao diện riêng cho đồ họa Canvas và SVG
        ├── explore.css          # Quy chuẩn giao diện phân hệ Khám phá Data
        └── help.css             # Quy chuẩn giao diện phân hệ Trợ giúp và nhiệm vụ
```

---

## 7. CƠ CHẾ QUẢN LÝ TRẠNG THÁI (STATE PERSISTENCE)

Hệ thống sử dụng cơ chế lưu trữ cục bộ phía client thông qua `window.localStorage` để duy trì dữ liệu người dùng qua các phiên làm việc:

| Key lưu trữ | Dữ liệu quản lý |
| :--- | :--- |
| `daconnect_user` | Thông tin hồ sơ người dùng, tổng điểm kinh nghiệm (XP), cấp hạng hiện tại (Silver II). |
| `daconnect_streak` | Số ngày học liên tục (Streak), ngày đăng nhập gần nhất. |
| `daconnect_completed_exercises` | Danh sách các mã định danh bài tập đã hoàn thành trong Practice Lab (tự động đồng bộ tick xanh trên Roadmap). |
| `daconnect_checklist` | Trạng thái hoàn thành của 4 nhiệm vụ nhập môn trên Dashboard. |
| `daconnect_roadmap_progress` | Tỷ lệ phần trăm hoàn thành theo từng phân nhóm kỹ năng. |

### Lệnh khôi phục trạng thái ban đầu
Để thiết lập lại toàn bộ dữ liệu mẫu về trạng thái gốc, mở cửa sổ Developer Tools (F12), chuyển sang tab Console và thực thi:

```javascript
localStorage.clear();
window.location.reload();
```

---

## 8. TIÊU CHUẨN CHẤT LƯỢNG VÀ KIỂM THỬ

Hệ thống trải qua quy trình kiểm thử trực quan tự động (Automated Visual Regression Testing) trên các môi trường độ phân giải chuẩn công nghiệp:
- Màn hình Desktop tiêu chuẩn: `1920x1080` và `1440x900`.
- Màn hình Laptop nhỏ: `1366x768`.
- Màn hình Thiết bị di động: `390x844` (chuẩn viewport điện thoại thông minh).

Các tiêu chí đảm bảo chất lượng:
- Bố cục responsive không xuất hiện thanh cuộn ngang ngoài ý muốn (Zero horizontal scroll overflow).
- Không xảy ra tình trạng va chạm văn bản hoặc đồ họa che khuất ký tự đọc.
- Thời gian tải trang ban đầu và chuyển đổi giữa các module đạt tốc độ tức thì dưới 100ms.

---

## 9. KÊNH THÔNG TIN VÀ CỘNG ĐỒNG

- Nhóm Facebook chính thức: [DaConnect Community (Hơn 9,500 thành viên)](https://web.facebook.com/share/g/1F2AeXe8m6/)
- Mục tiêu cộng đồng: Chia sẻ kiến thức phân tích dữ liệu thực chiến, kết nối chuyên gia, hỗ trợ xây dựng Portfolio và cập nhật các cơ hội nghề nghiệp chất lượng cao.

---

Bản quyền thuộc về **DaConnect Development Team** (2026). Tất cả các quyền được bảo lưu.
