// ============================================
// DaConnect – Learning Resources Module
// ============================================

import { RESOURCES } from '../data/mockData.js';
import { getState, updateState } from '../main.js';
import { showToast } from '../components/toast.js';
import { ICONS } from '../components/icons.js';

function getResourceIcon(type, size = 20) {
  switch (type) {
    case 'Sách': return ICONS.book(size);
    case 'Khóa học': return ICONS.practice(size);
    case 'Cheat Sheet': return ICONS.fileText(size);
    case 'Công cụ': return ICONS.terminal(size);
    default: return ICONS.book(size);
  }
}

function getLevelBadgeClass(level) {
  switch (level) {
    case 'Beginner': return 'badge-success';
    case 'Intermediate': return 'badge-warning';
    case 'Advanced': return 'badge-primary';
    default: return 'badge-gray';
  }
}

export function renderResources(container, navigate) {
  let activeType = 'Tất cả';
  let activeLevel = 'Tất cả';
  let searchQuery = '';

  const TYPE_TABS = ['Tất cả', 'Sách', 'Khóa học', 'Cheat Sheet', 'Công cụ', 'Đã lưu'];
  const LEVEL_FILTERS = ['Tất cả', 'Beginner', 'Intermediate', 'Advanced'];

  function getBookmarkedIds() {
    const user = getState('user') || {};
    return user.bookmarkedResources || [];
  }

  function toggleBookmark(resId) {
    const list = getBookmarkedIds();
    const isBookmarked = list.includes(resId);
    let nextList;
    if (isBookmarked) {
      nextList = list.filter(id => id !== resId);
      showToast('Đã xóa khỏi danh sách đã lưu', 'info');
    } else {
      nextList = [...list, resId];
      showToast('Đã lưu tài nguyên vào bộ sưu tập!', 'success');
    }

    updateState('user', (u) => ({
      ...(u || {}),
      bookmarkedResources: nextList,
    }));

    renderList();
  }

  function getFilteredResources() {
    const bookmarkedIds = getBookmarkedIds();

    return RESOURCES.filter(res => {
      // Type match
      let matchType = true;
      if (activeType === 'Đã lưu') {
        matchType = bookmarkedIds.includes(res.id);
      } else if (activeType !== 'Tất cả') {
        matchType = res.type === activeType;
      }

      // Level match
      const matchLevel = activeLevel === 'Tất cả' || res.level === activeLevel || res.level === 'All';

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        res.title.toLowerCase().includes(q) ||
        (res.author && res.author.toLowerCase().includes(q)) ||
        (res.desc && res.desc.toLowerCase().includes(q)) ||
        (res.tags && res.tags.some(t => t.toLowerCase().includes(q)));

      return matchType && matchLevel && matchSearch;
    });
  }

  function renderList() {
    const filtered = getFilteredResources();
    const bookmarkedIds = getBookmarkedIds();

    container.innerHTML = `
      <div class="page-header" style="margin-bottom:var(--space-6);">
        <h1 style="display:flex;align-items:center;gap:10px;">
          ${ICONS.book(26)} Tài nguyên học tập Data & AI
        </h1>
        <p>Kho sách chuyên ngành, khóa học thực hành, cheat sheet tra cứu nhanh và công cụ chuẩn mực cho người làm Dữ liệu</p>
      </div>

      <!-- STATS BAR -->
      <div class="grid-4" style="margin-bottom:var(--space-6);display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:var(--space-4);">
        <div class="card stat-card">
          <div class="stat-value" style="color:var(--color-primary);">${RESOURCES.length}</div>
          <div class="stat-label">Tổng tài nguyên tuyển chọn</div>
          <div class="stat-desc">Được kiểm duyệt chất lượng</div>
        </div>
        <div class="card stat-card">
          <div class="stat-value" style="color:var(--color-navy);">${RESOURCES.filter(r => r.type === 'Sách').length}</div>
          <div class="stat-label">Sách chuyên ngành O'Reilly</div>
          <div class="stat-desc">Kiến thức chuyên sâu từ tác giả gốc</div>
        </div>
        <div class="card stat-card">
          <div class="stat-value" style="color:var(--color-success);">${RESOURCES.filter(r => r.type === 'Khóa học').length}</div>
          <div class="stat-label">Khóa học & Chứng chỉ</div>
          <div class="stat-desc">Google, Harvard, Kaggle, DeepLearning.AI</div>
        </div>
        <div class="card stat-card">
          <div class="stat-value" style="color:var(--color-warning);">${bookmarkedIds.length}</div>
          <div class="stat-label">Tài nguyên bạn đã lưu</div>
          <div class="stat-desc">Dễ dàng xem lại bất cứ lúc nào</div>
        </div>
      </div>

      <!-- SEARCH & FILTER BAR -->
      <div class="card" style="padding:24px 28px;margin-bottom:var(--space-6);">
        <!-- Search bar -->
        <div style="position:relative;margin-bottom:16px;">
          <span style="position:absolute;left:14px;top:50%;transform:translateY(-50%);color:var(--color-gray-400);display:flex;">
            ${ICONS.search(18)}
          </span>
          <input
            type="text"
            id="resource-search-input"
            class="input form-input"
            placeholder="Tìm kiếm tài nguyên theo tên sách, khóa học, tác giả, công nghệ (Python, SQL, Pandas)..."
            value="${escapeHtml(searchQuery)}"
            style="width:100%;padding:10px 14px 10px 42px;box-sizing:border-box;border-radius:var(--radius-lg);"
          />
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:var(--space-3);">
          <!-- Type Filter Tabs -->
          <div class="filter-bar" style="display:flex;flex-wrap:wrap;gap:var(--space-2);">
            ${TYPE_TABS.map(tab => {
              const active = tab === activeType;
              const count = tab === 'Đã lưu' ? bookmarkedIds.length : (tab === 'Tất cả' ? RESOURCES.length : RESOURCES.filter(r => r.type === tab).length);
              return `
                <button
                  class="btn btn-sm ${active ? 'btn-primary' : 'btn-secondary'} resource-type-tab"
                  data-type="${tab}"
                  style="border-radius:var(--radius-full);padding:6px 14px;"
                >
                  ${tab} <span class="badge ${active ? 'badge-primary' : 'badge-gray'}" style="margin-left:4px;font-size:10px;background:${active ? 'rgba(255,255,255,0.25)' : 'var(--color-gray-100)'};color:${active ? '#fff' : 'inherit'}">${count}</span>
                </button>
              `;
            }).join('')}
          </div>

          <!-- Level Filter -->
          <div style="display:flex;align-items:center;gap:var(--space-2);">
            <span style="font-size:var(--text-xs);color:var(--color-gray-500);font-weight:var(--weight-semibold);">Trình độ:</span>
            <select id="resource-level-select" class="form-select" style="padding:4px 10px;border-radius:var(--radius-md);border:1px solid var(--color-gray-200);font-size:var(--text-xs);">
              ${LEVEL_FILTERS.map(lvl => `<option value="${lvl}" ${lvl === activeLevel ? 'selected' : ''}>${lvl}</option>`).join('')}
            </select>
          </div>
        </div>
      </div>

      <!-- RESOURCES GRID -->
      <div id="resources-grid" class="page-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:var(--space-5);">
        ${filtered.length > 0 ? filtered.map(res => {
          const isBookmarked = bookmarkedIds.includes(res.id);
          return `
            <div class="card" style="display:flex;flex-direction:column;justify-content:space-between;padding:24px;transition:transform var(--transition-fast),box-shadow var(--transition-fast);">
              <div>
                <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:var(--space-3);margin-bottom:var(--space-3);">
                  <div style="width:44px;height:44px;border-radius:var(--radius-lg);background:var(--color-primary-bg);color:var(--color-primary);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                    ${getResourceIcon(res.type, 22)}
                  </div>
                  <div style="display:flex;align-items:center;gap:6px;margin-left:auto;">
                    <span class="badge ${getLevelBadgeClass(res.level)}" style="font-size:10px;">${res.level}</span>
                    <button
                      class="btn btn-ghost btn-sm btn-bookmark"
                      data-id="${res.id}"
                      title="${isBookmarked ? 'Bỏ lưu' : 'Lưu tài nguyên'}"
                      style="padding:6px;border-radius:var(--radius-full);color:${isBookmarked ? 'var(--color-warning)' : 'var(--color-gray-400)'};"
                    >
                      ${ICONS.star(16)}
                    </button>
                  </div>
                </div>

                <div style="font-size:var(--text-xs);font-weight:var(--weight-semibold);color:var(--color-primary);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">
                  ${res.type} · ${res.format || 'Tài liệu'}
                </div>

                <h3 style="font-size:var(--text-base);font-weight:var(--weight-bold);color:var(--color-navy);margin:0 0 6px;line-height:1.4;">
                  ${res.title}
                </h3>

                <div style="font-size:var(--text-xs);color:var(--color-gray-500);margin-bottom:var(--space-3);font-weight:var(--weight-medium);">
                  ${res.author || 'Chuyên gia Data'}
                </div>

                <p style="font-size:var(--text-sm);color:var(--color-gray-600);line-height:1.5;margin:0 0 var(--space-4);display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">
                  ${res.desc}
                </p>
              </div>

              <div>
                <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:var(--space-4);">
                  ${(res.tags || []).map(t => `<span class="tag" style="font-size:11px;">${t}</span>`).join('')}
                </div>

                <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--color-gray-100);padding-top:var(--space-3);">
                  <div style="display:flex;align-items:center;gap:8px;font-size:var(--text-xs);color:var(--color-gray-500);">
                    <span style="color:var(--color-warning);display:inline-flex;align-items:center;gap:3px;font-weight:var(--weight-bold);">
                      ${ICONS.star(12)} ${res.rating || '4.9'}
                    </span>
                    <span>·</span>
                    <span>${(res.bookmarks || 100).toLocaleString()} người lưu</span>
                  </div>

                  <a
                    href="${res.url || '#'}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="btn btn-primary btn-sm"
                    style="display:inline-flex;align-items:center;gap:4px;text-decoration:none;"
                  >
                    Truy cập →
                  </a>
                </div>
              </div>
            </div>
          `;
        }).join('') : `
          <div style="grid-column:1/-1;text-align:center;padding:var(--space-10);color:var(--color-gray-400);">
            <div style="display:flex;justify-content:center;color:var(--color-gray-300);margin-bottom:var(--space-3);">
              ${ICONS.book(48)}
            </div>
            <div style="font-size:var(--text-lg);font-weight:var(--weight-semibold);color:var(--color-navy);">Không tìm thấy tài nguyên phù hợp</div>
            <div style="font-size:var(--text-sm);margin-top:var(--space-2);">Thử đổi bộ lọc hoặc từ khóa tìm kiếm của bạn</div>
          </div>
        `}
      </div>

      <!-- PRACTICE LAB PROMOTION BANNER -->
      <div class="card card-accent" style="margin-top:var(--space-8);padding:var(--space-6);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:var(--space-4);background:linear-gradient(135deg,#0B1533 0%,#0284C7 100%);color:#fff;border-radius:var(--radius-xl);">
        <div>
          <h3 style="font-size:var(--text-lg);font-weight:var(--weight-bold);margin:0 0 6px;color:#ffffff !important;">
            Đọc xong lý thuyết? Hãy thực hành code ngay!
          </h3>
          <p style="font-size:var(--text-sm);color:#e2e8f0 !important;margin:0;">
            Hơn 15+ bài tập Python, Pandas và SQL thực chiến đang đợi bạn tại Practice Lab.
          </p>
        </div>
        <button id="go-to-practice-btn" class="btn" style="background:#fff;color:var(--color-navy);font-weight:var(--weight-bold);padding:10px 20px;">
          Đến Practice Lab →
        </button>
      </div>
    `;

    attachEvents();
  }

  function attachEvents() {
    // Search input
    const searchInput = container.querySelector('#resource-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        const grid = container.querySelector('#resources-grid');
        if (grid) renderList();
      });
    }

    // Type Tabs
    container.querySelectorAll('.resource-type-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        activeType = btn.dataset.type;
        renderList();
      });
    });

    // Level Select
    const levelSelect = container.querySelector('#resource-level-select');
    if (levelSelect) {
      levelSelect.addEventListener('change', (e) => {
        activeLevel = e.target.value;
        renderList();
      });
    }

    // Bookmark buttons
    container.querySelectorAll('.btn-bookmark').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleBookmark(btn.dataset.id);
      });
    });

    // Practice button
    const practiceBtn = container.querySelector('#go-to-practice-btn');
    if (practiceBtn) {
      practiceBtn.addEventListener('click', () => {
        navigate('practice');
      });
    }
  }

  function escapeHtml(str) {
    return (str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  renderList();
}

