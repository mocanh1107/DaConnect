# DaConnect – Data Career Community 🚀

> Nền tảng học tập và phát triển sự nghiệp Data dành cho sinh viên và chuyên gia.

![DaConnect](https://img.shields.io/badge/DaConnect-v1.0.0-FF5B18?style=for-the-badge)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite)
![Vanilla JS](https://img.shields.io/badge/Vanilla_JS-ES_Modules-F7DF1E?style=for-the-badge&logo=javascript)

## 📋 Giới thiệu

DaConnect là một web prototype dành cho cộng đồng Data Việt Nam, cung cấp hệ sinh thái học tập toàn diện:

```
Cộng đồng → Hỏi đáp → Học tập → Roadmap → Thử thách → Dự án → Tuyển dụng
```

## ✨ Tính năng chính

| Module | Mô tả |
|--------|-------|
| 🏠 **Dashboard** | Tổng quan tiến độ học tập, điểm XP, streak và hoạt động gần đây |
| 🗺️ **Roadmap** | Bản đồ lộ trình Data Analyst với canvas tương tác, pan/zoom, node status |
| 💻 **Practice Lab** | Luyện tập Python/Pandas/NumPy với code editor và chấm bài mô phỏng |
| 📰 **Data Community** | Tin tức và bài viết về Data & AI, phân loại theo chủ đề |
| 💬 **Data Q&A** | Cộng đồng hỏi đáp như StackOverflow, vote và reputation system |
| ⚡ **Challenge Arena** | Thử thách phân tích dữ liệu định kỳ với leaderboard |
| 📁 **Project Lab** | Dự án thực tế với dataset thật và hướng dẫn xây dựng portfolio |
| 💼 **Career Hub** | Tin tuyển dụng Data Analyst kèm Business Challenge |

## 🚀 Cài đặt và chạy dự án

### Yêu cầu

- **Node.js** >= 18.0 ([tải về](https://nodejs.org))
- **npm** >= 9.0 (đi kèm với Node.js)

### Cài đặt

```bash
# Clone hoặc navigate vào thư mục dự án
cd DaConnect

# Cài đặt dependencies
npm install

# Chạy development server
npm run dev
```

Sau khi chạy, mở trình duyệt tại: **http://localhost:5173**

### Build production

```bash
npm run build
npm run preview
```

## 📁 Cấu trúc thư mục

```
DaConnect/
├── index.html              # Entry point HTML
├── package.json            # Dependencies và scripts
├── README.md               # Tài liệu này
└── src/
    ├── main.js             # Khởi chạy app, state management
    ├── router.js           # Client-side routing
    ├── data/
    │   └── mockData.js     # Dữ liệu mẫu cho toàn bộ ứng dụng
    ├── components/
    │   ├── sidebar.js      # Thanh điều hướng trái
    │   ├── navbar.js       # Thanh top navigation
    │   ├── modal.js        # Modal overlay component
    │   └── toast.js        # Toast notification component
    ├── modules/
    │   ├── dashboard.js    # Trang tổng quan
    │   ├── community.js    # Tin tức Data & AI
    │   ├── qa.js           # Q&A cộng đồng
    │   ├── practice.js     # Practice Lab
    │   ├── roadmap.js      # Roadmap tương tác
    │   ├── challenge.js    # Challenge Arena
    │   ├── projects.js     # Project Lab
    │   └── career.js       # Career Hub
    └── styles/
        ├── tokens.css      # Design tokens (màu, spacing, typography)
        ├── base.css        # Reset và base styles
        ├── layout.css      # Layout (sidebar, navbar, content)
        ├── components.css  # Component styles (buttons, cards, forms)
        ├── roadmap.css     # Roadmap-specific styles
        └── modules.css     # Module-specific styles
```

## 🎨 Design System

Dựa trên nguyên tắc thiết kế thoáng, tối giản với bộ màu đặc trưng:

| Token | Giá trị | Mô tả |
|-------|---------|-------|
| `--color-primary` | `#FF5B18` | Màu cam chủ đạo |
| `--color-navy` | `#0B1533` | Màu navy tiêu đề |
| `--color-gray-50` | `#F4F5F7` | Màu nền phụ |
| `--font-sans` | Inter | Font chính |
| `--font-mono` | JetBrains Mono | Font code |

## 💾 Lưu trữ dữ liệu

Tất cả trạng thái được lưu trong **localStorage** với key `daconnect_state`, bao gồm:

- ✅ Tiến độ học tập (skills completed)
- ✅ Bài tập đã giải (exercises solved)
- ✅ Trạng thái Roadmap nodes
- ✅ Điểm XP và streak
- ✅ Câu hỏi, câu trả lời, votes (Q&A)
- ✅ Thử thách đã tham gia (Challenge Arena)
- ✅ Dự án đã nộp (Project Lab)
- ✅ Trạng thái ứng tuyển (Career Hub)

Để reset về trạng thái ban đầu:
```javascript
// Mở DevTools Console và chạy:
localStorage.removeItem('daconnect_state');
location.reload();
```

## 🗺️ Roadmap Data Analyst

Lộ trình học tập được thiết kế với 14 nút kỹ năng theo thứ tự:

```
Python Fundamentals
├── NumPy
└── Pandas
    ├── Data Cleaning
    └── Data Transformation
        └── EDA (Exploratory Data Analysis)
            ├── Data Visualization
            └── Business Metrics
                └── Data Storytelling
                    └── Final DA Project
                        └── Portfolio
SQL Fundamentals
└── SQL Aggregation & Joins
    └── Statistics
```

## 🤝 Liên kết giữa các phân hệ

```
Practice Lab  ──solved──► Skill Map ──────► Roadmap Node Status
Challenge     ──complete──► +XP ──────────► Leaderboard
Q&A           ──vote/post──► +Reputation ──► Dashboard Stats
Career        ──challenge──► +XP ──────────► Dashboard
Project Lab   ──submit────► Portfolio ─────► CV Guide
```

## ⚠️ Lưu ý về Demo

- Code editor trong Practice Lab **không thực thi Python thật** – kết quả được mô phỏng
- Chấm bài thử thách là giả lập tự động
- Dataset trong Career Hub là dữ liệu mẫu minh hoạ

---

Made with ❤️ by **DaConnect Team** · [Data Career Community]

