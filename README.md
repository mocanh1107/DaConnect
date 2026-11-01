# DaConnect – Data Career Community Platform 🚀

> **Nền tảng Cộng đồng, Học tập & Định hướng Sự nghiệp Dữ liệu toàn diện dành cho sinh viên và chuyên gia Data tại Việt Nam.**

![DaConnect](https://img.shields.io/badge/DaConnect-v1.0.0-FF5B18?style=for-the-badge)
![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-ES_Modules-F7DF1E?style=for-the-badge&logo=javascript)
![CSS3](https://img.shields.io/badge/CSS3-Design_Tokens-1572B6?style=for-the-badge&logo=css3)
![Python Server](https://img.shields.io/badge/Dev_Server-Python_HTTP-3776AB?style=for-the-badge&logo=python)

---

## 📋 Giới thiệu Dự án

**DaConnect** là nền tảng Single Page Application (SPA) chuyên biệt kết nối toàn bộ hệ sinh thái phát triển sự nghiệp trong ngành Dữ liệu (Data Analyst, Data Engineer, Data Scientist):

```
Khám phá Data ➔ Roadmap kỹ năng ➔ Practice Lab ➔ Project Lab ➔ Tài nguyên ➔ Q&A & Tin tức ➔ Đấu trường Arena ➔ Tuyển dụng Career
```

Được thiết kế theo tiêu chuẩn UI/UX của các nền tảng edtech hàng đầu thế giới (**Brilliant.org, DataCamp, Stripe, Linear**), DaConnect mang đến trải nghiệm học tập gắn liền với **Gamification** (điểm XP, chuỗi Streak, bảng vàng thi đấu, mini-games tương tác).

---

## ✨ 11 Phân hệ Chức năng Cốt lõi

| Phân hệ | Route | Mô tả & Tính năng nổi bật |
| :--- | :---: | :--- |
| 🧭 **Explore Data** | `#explore` | **Khám phá ngành Data:** Bento Grid 4 lĩnh vực (E-commerce, Fintech, Streaming, Logistics); 3 Career Cards (DA, DE, DS) với Segmented Tabs (Timeline 1 ngày, Bài toán thực tế, Chân dung phù hợp); Stepper cấp bậc & Bảng mức lương thị trường; 3 Mini Data Games (+30 XP); Stepper Quiz 5 câu trắc nghiệm định hướng có Celebration View. |
| 🏠 **Dashboard** | `#dashboard` | **Tổng quan cá nhân:** Tiến độ học tập, tổng điểm XP, chuỗi ngày Streak, thẻ thống kê kỹ năng và dòng sự kiện hoạt động gần đây. |
| 🗺️ **Roadmap** | `#roadmap` | **Cây kỹ năng tương tác (NeetCode style):** Sơ đồ quan hệ tiên quyết giữa các kỹ năng, Drawer bài học tích hợp video YouTube chuẩn và tài liệu W3Schools, liên kết sâu (deep-linking) tới bài tập Practice Lab. |
| 💻 **Practice Lab** | `#practice` | **Phòng thực hành lập trình:** 42 bài tập thực chiến chia theo 14 nhóm kỹ năng Python, Pandas, SQL. Trình soạn thảo mã nguồn, bộ lọc độ khó, kiểm tra test case tự động tức thì. |
| 📁 **Project Lab** | `#projects` | **Thư viện đồ án thực chiến:** Các dự án phân tích dữ liệu trên dataset thật (E-commerce, HR Analytics, Retail), hướng dẫn xây dựng Portfolio chuyên nghiệp. |
| 📚 **Tài nguyên** | `#resources` | **Kho học liệu tuyển chọn:** Sách O'Reilly, khóa học chứng chỉ (Google, Harvard, Kaggle), Cheat Sheet tra cứu nhanh và công cụ chuẩn mực. |
| 📰 **Data & AI News** | `#community` | **Cộng đồng & Tin tức:** Cập nhật các bài viết phân tích chuyên sâu về GenAI, Big Data, xu hướng công nghệ và thị trường lao động. |
| 💬 **Data Q&A** | `#qa` | **Diễn đàn hỏi đáp:** Mô hình StackOverflow dành cho dân Dữ liệu, hệ thống biểu quyết (vote), danh hiệu và điểm uy tín. |
| 🏆 **Challenge Arena** | `#challenge` | **Đấu trường thi đấu:** Thử thách giải quyết bài toán dữ liệu hàng tuần, bục vinh danh Podium Top 1 (Vàng kim), Top 2 (Bạc sáng), Top 3 (Đồng ánh đỏ). |
| 💼 **Career Hub** | `#career` | **Cổng kết nối nghề nghiệp:** Tin tuyển dụng Data Analyst/Engineer kèm bài toán Business Challenge thực tế từ doanh nghiệp. |
| ❓ **Help & Guide** | `#help` | **Trung tâm trợ giúp:** Thanh tìm kiếm thông minh; Gamified Quest Checklist (4 nhiệm vụ tân thủ, +100 XP); Cẩm nang 6 phân hệ; FAQ Accordion; Kết nối Group Facebook 9,500+ thành viên. |

---

## 🚀 Hướng dẫn Cài đặt & Khởi chạy

Dự án được xây dựng trên nền tảng **Vanilla JavaScript ES Modules** thuần (No-build toolchain), có thể chạy ngay lập tức mà không bắt buộc phải cài đặt Node.js hay build webpack phức tạp.

### Cách 1: Khởi chạy bằng Python (Khuyên dùng – Nhanh nhất)

Nếu máy tính đã cài đặt Python (mặc định trên hầu hết môi trường Windows/Mac/Linux):

```bash
# 1. Mở Terminal / PowerShell và chuyển vào thư mục dự án
cd DaConnect

# 2. Khởi chạy máy chủ HTTP tích hợp sẵn
python -m http.server 5173
```

Mở trình duyệt và truy cập: **`http://localhost:5173/`**

---

### Cách 2: Khởi chạy bằng Node.js & Vite

Nếu máy tính đã cài đặt Node.js và npm:

```bash
# 1. Cài đặt các gói phụ trợ
npm install

# 2. Khởi chạy development server
npm run dev
```

---

## 📁 Cấu trúc Thư mục Dự án

```
DaConnect/
├── index.html                   # HTML Entry Point (CSS links, App root, Toast container)
├── package.json                 # Cấu hình dự án & scripts Vite
├── README.md                    # Tài liệu hướng dẫn dự án
├── AI_CHAT_LOG.md               # Nhật ký minh bạch hỗ trợ kỹ thuật AI (AI Disclosure Log)
└── src/
    ├── main.js                  # Khởi tạo App, Global State Management (XP, Streak, User)
    ├── router.js                # Hash-based Client-side SPA Router
    ├── data/
    │   └── mockData.js          # Dữ liệu mẫu (Roadmap, 42 bài tập, Projects, Resources, Q&A)
    ├── components/
    │   ├── icons.js             # Thư viện 40+ Outline SVG Icons (Lucide-style, không dùng emojis)
    │   ├── sidebar.js           # Thanh điều hướng Sidebar thực tế (Explore card, Help menu)
    │   ├── navbar.js            # Thanh Top Navigation & Search
    │   ├── modal.js             # Overlay Modal tương tác
    │   └── toast.js             # Toast Notifications đa trạng thái (success, error, info)
    ├── modules/
    │   ├── dashboard.js         # Phân hệ Trang chủ tổng quan
    │   ├── explore.js           # Phân hệ Khám phá Data (Bento Grid, Career, Games, Quiz)
    │   ├── roadmap.js           # Phân hệ Cây kỹ năng tương tác & Lesson Drawer
    │   ├── practice.js          # Phân hệ Practice Lab với 42 bài tập code
    │   ├── projects.js          # Phân hệ Project Lab
    │   ├── resources.js         # Phân hệ Tài nguyên học tập Data & AI
    │   ├── community.js         # Phân hệ Data & AI News
    │   ├── qa.js                # Phân hệ Hỏi đáp Data Q&A
    │   ├── challenge.js         # Phân hệ Đấu trường Challenge Arena & Leaderboard
    │   ├── career.js            # Phân hệ Career Hub & Tuyển dụng
    │   └── help.js              # Phân hệ Trợ giúp, Quest Checklist & FAQ
    └── styles/
        ├── tokens.css           # Design Tokens (Bảng màu Ocean Blue, Navy, Spacing, Typography)
        ├── base.css             # CSS Reset & Base typography
        ├── layout.css           # Bố cục Flex/Grid (Sidebar, Header, Main content)
        ├── components.css       # Styles cho Buttons, Badges, Tables, Cards, Modals
        ├── roadmap.css          # Styles riêng cho Canvas Roadmap & Drawer
        ├── modules.css          # Styles cho Challenge Podium, Q&A, Projects
        ├── explore.css          # Styles riêng cho Explore Data (Bento, Games, Stepper Quiz)
        └── help.css             # Styles cho Help Center, Quests & Community Banner
```

---

## 🎨 Tiêu chuẩn Thiết kế (Design System)

Hệ thống nhận diện thương hiệu tuân thủ nghiêm ngặt chuẩn UI edtech hiện đại:

| Yếu tố | Quy chuẩn kỹ thuật |
| :--- | :--- |
| **Bảng màu chủ đạo** | **Navy quý tộc:** `#0B1533` (Tiêu đề, Header tables, Hero banner)<br>**Cam nhận diện:** `#FF5B18` (Buttons, Active tags, Progress, Accent)<br>**Xanh đại dương:** `#0284C7` (Link, Primary highlights)<br>**Nền giao diện:** `#F8FAFC` (Slate-50 thanh lịch, tương phản cao) |
| **Hệ thống Badge Độ khó** | **Beginner / Easy:** Nền `#ECFDF3` · Chữ xanh lá `#12B76A`<br>**Intermediate / Medium:** Nền `#FFFAEB` · Chữ vàng cam `#F79009`<br>**Advanced / Hard:** Nền `#FEF3F2` · Chữ đỏ san hô `#F04438` *(Đồng bộ 100%)* |
| **Typography** | Font chính: `Inter` (Sans-serif hiện đại, độ đọc cao)<br>Font code: `JetBrains Mono` (Hiển thị cú pháp code sắc nét) |
| **Iconography** | 100% SVG Outline Vector thuần (Stroke 2px, nét bo cong, không dùng emoji màu) |
| **Bo góc & Đổ bóng** | Bo góc lớn mềm mại (`rounded-2xl` 16px - 24px), đổ bóng đa tầng nhẹ nhàng (`box-shadow: 0 4px 20px rgba(11, 21, 51, 0.04)`) |

---

## 💾 Cơ chế Lưu trữ & Quản lý State

Toàn bộ trạng thái tương tác của người dùng được đồng bộ và lưu trữ cục bộ trong **`localStorage`** của trình duyệt:

- `daconnect_state`: Lưu tiến độ bài tập giải xong, trạng thái roadmap nodes, điểm XP cá nhân, bài viết Q&A đã vote.
- `daconnect_gamified_quests`: Trạng thái hoàn thành 4 nhiệm vụ tân thủ trong Help Center.
- `daconnect_game_detective_awarded`: Ghi nhận nhận thưởng game Thám tử dữ liệu (+30 XP).
- `daconnect_game_chart_awarded`: Ghi nhận nhận thưởng game Chọn biểu đồ (+30 XP).
- `daconnect_game_insight_awarded`: Ghi nhận nhận thưởng game Đọc insight (+30 XP).

### Khôi phục trạng thái ban đầu (Reset Data)
Để reset toàn bộ dữ liệu mẫu về mặc định, mở Console trên trình duyệt (F12) và chạy:
```javascript
localStorage.clear();
location.reload();
```

---

## 🤝 Mạng lưới Liên kết giữa các Phân hệ

```
   ┌─────────────────────────────────────────────────────────────┐
   │                         DACONNECT                           │
   └───────────────┬─────────────────────────────┬───────────────┘
                   │                             │
         ┌─────────▼─────────┐         ┌─────────▼─────────┐
         │   Explore Data    │         │    Help Center    │
         │  (Định hướng)     │         │ (Nhiệm vụ tân thủ)│
         └─────────┬─────────┘         └─────────┬─────────┘
                   │ (Gợi ý lộ trình)            │ (Thưởng +100 XP)
         ┌─────────▼─────────┐                   │
         │  Interactive      │◄──────────────────┤
         │     Roadmap       │ (Mở cây kỹ năng)  │
         └─────────┬─────────┘                   │
                   │ (Deep-link bài tập)         │
         ┌─────────▼─────────┐                   │
         │   Practice Lab    │◄──────────────────┤
         │ (42 bài thực hành)│ (Luyện code)      │
         └─────────┬─────────┘                   │
                   │ (+XP khi giải đúng)         │
         ┌─────────▼─────────┐                   │
         │  Challenge Arena  │◄──────────────────┘
         │ (Bảng vàng Podium)│ (Tham gia đấu trường)
         └───────────────────┘
```

---

## 👥 Cộng đồng & Đóng góp

- **Facebook Group chính thức:** [DaConnect Community (9,500+ thành viên)](https://web.facebook.com/share/g/1F2AeXe8m6/)
- **Sứ mệnh:** Cung cấp cho sinh viên và người chuyển ngành kiến thức thực chiến về Khoa học Dữ liệu, kết nối chuyên gia, chia sẻ đồ án và cập nhật cơ hội việc làm chất lượng.

---

© 2026 **DaConnect Team** · All rights reserved.
