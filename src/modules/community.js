// src/modules/community.js
// ============================================
// DaConnect – Data & AI News & Trends Hub
// ============================================

import { ARTICLES } from '../data/mockData.js';
import { getState, updateState } from '../main.js';
import { showToast } from '../components/toast.js';
import { ICONS } from '../components/icons.js';

const CATEGORIES = ['Tất cả', 'Tin tức AI', 'Xu hướng ngành Data', 'Case Study công nghệ', 'Phỏng vấn & Góc nhìn'];

/**
 * Convert markdown-like content to safe HTML.
 */
function parseMarkdown(text) {
  if (!text) return '';

  const codeBlocks = [];
  text = text.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
    const idx = codeBlocks.length;
    codeBlocks.push(`<pre class="code-block" style="background:#0B1533;color:#a5f3fc;padding:20px;border-radius:12px;font-size:0.85rem;overflow-x:auto;margin:20px 0;line-height:1.6;border:1px solid rgba(255,255,255,0.08);"><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`);
    return `%%CODEBLOCK_${idx}%%`;
  });

  text = escapeHtml(text);
  text = text.replace(/%%CODEBLOCK_(\d+)%%/g, (_, i) => codeBlocks[parseInt(i)]);
  text = text.replace(/`([^`]+)`/g, '<code style="background:var(--color-primary-bg,#E0F2FE);color:var(--color-primary-dark,#0369A1);padding:3px 7px;border-radius:5px;font-family:monospace;font-size:0.88em;">$1</code>');
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong style="color:var(--color-navy);">$1</strong>');
  text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  const lines = text.split('\n');
  const output = [];
  let inList = false;
  let inNumberedList = false;
  let inTable = false;
  let isTableHead = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code block placeholder
    if (line.includes('<pre class="code-block"')) {
      if (inList) { output.push('</ul>'); inList = false; }
      if (inNumberedList) { output.push('</ol>'); inNumberedList = false; }
      if (inTable) { output.push('</tbody></table></div>'); inTable = false; }
      output.push(line);
      continue;
    }

    // Markdown Table row
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      if (inList) { output.push('</ul>'); inList = false; }
      if (inNumberedList) { output.push('</ol>'); inNumberedList = false; }
      if (!inTable) {
        output.push('<div style="overflow-x:auto;margin:20px 0;"><table style="width:100%;border-collapse:collapse;font-size:0.9rem;border:1px solid var(--color-gray-200);border-radius:8px;overflow:hidden;">');
        inTable = true;
        isTableHead = true;
      }
      if (line.includes('---')) {
        isTableHead = false;
        continue;
      }
      const cells = line.split('|').slice(1, -1).map(c => c.trim());
      if (isTableHead) {
        output.push('<thead style="background:var(--color-primary-bg,#E0F2FE);"><tr>' + cells.map(c => `<th style="padding:12px 16px;text-align:left;font-weight:700;color:var(--color-navy);border-bottom:2px solid var(--color-primary);">${c}</th>`).join('') + '</tr></thead><tbody>');
        isTableHead = false;
      } else {
        output.push('<tr style="border-bottom:1px solid var(--color-gray-100);">' + cells.map(c => `<td style="padding:10px 16px;color:var(--color-gray-700);">${c}</td>`).join('') + '</tr>');
      }
      continue;
    } else if (inTable) {
      output.push('</tbody></table></div>');
      inTable = false;
    }

    // Heading 2
    if (/^## (.+)$/.test(line)) {
      if (inList) { output.push('</ul>'); inList = false; }
      if (inNumberedList) { output.push('</ol>'); inNumberedList = false; }
      output.push(`<h2 style="font-size:1.45rem;font-weight:800;color:var(--color-navy);margin:28px 0 14px;line-height:1.35;">${line.replace(/^## /, '')}</h2>`);
      continue;
    }

    // Heading 3
    if (/^### (.+)$/.test(line)) {
      if (inList) { output.push('</ul>'); inList = false; }
      if (inNumberedList) { output.push('</ol>'); inNumberedList = false; }
      output.push(`<h3 style="font-size:1.15rem;font-weight:700;color:var(--color-navy);margin:22px 0 10px;line-height:1.4;">${line.replace(/^### /, '')}</h3>`);
      continue;
    }

    // Blockquote
    if (/^> (.+)$/.test(line)) {
      if (inList) { output.push('</ul>'); inList = false; }
      if (inNumberedList) { output.push('</ol>'); inNumberedList = false; }
      output.push(`<blockquote style="border-left:4px solid var(--color-primary);margin:20px 0;padding:16px 22px;background:var(--color-primary-bg,#E0F2FE);border-radius:0 10px 10px 0;font-style:italic;color:var(--color-navy);line-height:1.7;">${line.replace(/^> /, '')}</blockquote>`);
      continue;
    }

    // Numbered list
    if (/^\d+\. (.+)$/.test(line)) {
      if (inList) { output.push('</ul>'); inList = false; }
      if (!inNumberedList) { output.push('<ol style="margin-bottom:16px;padding-left:26px;color:var(--color-gray-700);line-height:1.75;">'); inNumberedList = true; }
      output.push(`<li style="margin-bottom:8px;">${line.replace(/^\d+\. /, '')}</li>`);
      continue;
    }

    // Unordered list
    if (/^- (.+)$/.test(line)) {
      if (inNumberedList) { output.push('</ol>'); inNumberedList = false; }
      if (!inList) { output.push('<ul style="margin-bottom:16px;padding-left:26px;color:var(--color-gray-700);line-height:1.75;">'); inList = true; }
      output.push(`<li style="margin-bottom:8px;">${line.replace(/^- /, '')}</li>`);
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      if (inList) { output.push('</ul>'); inList = false; }
      if (inNumberedList) { output.push('</ol>'); inNumberedList = false; }
      continue;
    }

    // Regular paragraph
    if (inList) { output.push('</ul>'); inList = false; }
    if (inNumberedList) { output.push('</ol>'); inNumberedList = false; }
    output.push(`<p style="margin-bottom:16px;line-height:1.8;color:var(--color-gray-700);font-size:0.98rem;">${line}</p>`);
  }

  if (inList) output.push('</ul>');
  if (inNumberedList) output.push('</ol>');
  if (inTable) output.push('</tbody></table></div>');

  return output.join('\n');
}

function escapeHtml(str) {
  return (str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getCategoryBadge(cat) {
  switch (cat) {
    case 'Tin tức AI': return '<span class="badge badge-primary">Tin tức AI</span>';
    case 'Xu hướng ngành Data': return '<span class="badge badge-success">Xu hướng ngành Data</span>';
    case 'Case Study công nghệ': return '<span class="badge badge-warning">Case Study</span>';
    case 'Phỏng vấn & Góc nhìn': return '<span class="badge" style="background:#7C3AED;color:#fff;">Góc nhìn</span>';
    default: return '<span class="badge badge-primary">Công nghệ</span>';
  }
}

function getCategoryIcon(cat) {
  switch (cat) {
    case 'Tin tức AI': return ICONS.cpu(32);
    case 'Xu hướng ngành Data': return ICONS.trendingUp(32);
    case 'Case Study công nghệ': return ICONS.database(32);
    case 'Phỏng vấn & Góc nhìn': return ICONS.messageSquare(32);
    default: return ICONS.fileText(32);
  }
}

export function renderCommunity(container, navigate) {
  let activeCategory = 'Tất cả';
  let searchQuery = '';
  let viewingArticleId = null;

  function getAllArticles() {
    const localLikes = getState('articleLikes') || {};
    return ARTICLES.map(a => ({
      ...a,
      likes: (a.likes || 0) + (localLikes[a.id] ? 1 : 0),
      isUserLiked: Boolean(localLikes[a.id]),
    }));
  }

  function getFilteredArticles() {
    const list = getAllArticles();
    return list.filter(a => {
      const matchCat = activeCategory === 'Tất cả' || a.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q ||
        a.title.toLowerCase().includes(q) ||
        (a.tags || []).some(t => t.toLowerCase().includes(q)) ||
        (a.source || '').toLowerCase().includes(q) ||
        (a.excerpt || '').toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }

  function handleLike(articleId) {
    const localLikes = getState('articleLikes') || {};
    const currentlyLiked = Boolean(localLikes[articleId]);
    const updated = { ...localLikes, [articleId]: !currentlyLiked };
    updateState('articleLikes', updated);

    if (!currentlyLiked) {
      showToast('Đã thích bài viết!', 'success');
    }
    if (viewingArticleId) {
      const art = getAllArticles().find(a => a.id === viewingArticleId);
      renderDetail(art);
    } else {
      renderList();
    }
  }

  function renderList() {
    viewingArticleId = null;
    const articles = getFilteredArticles();
    const hotArticle = articles.find(a => a.isHot) || articles[0];

    container.innerHTML = `
      <div class="page-header" style="margin-bottom:24px;">
        <div>
          <h1 class="page-title" style="display:flex;align-items:center;gap:10px;">
            ${ICONS.community(26)} Data & AI News & Trends
          </h1>
          <p class="page-subtitle">Cập nhật tin tức mới nhất về Trí tuệ Nhân tạo, xu hướng ngành Dữ liệu và các bài học kinh nghiệm từ tập đoàn hàng đầu</p>
        </div>
      </div>

      <!-- BREAKING NEWS TICKER -->
      <div style="background:var(--color-primary-bg,#E0F2FE);border-left:4px solid var(--color-primary,#0284C7);border-radius:var(--radius-lg);padding:12px 20px;margin-bottom:24px;display:flex;align-items:center;gap:12px;font-size:var(--text-sm);">
        <span class="badge badge-primary" style="font-weight:700;display:inline-flex;align-items:center;gap:4px;padding:4px 10px;font-size:11px;text-transform:uppercase;">
          ${ICONS.zap(12)} NỔI BẬT
        </span>
        <div style="flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:var(--color-navy);font-weight:var(--weight-semibold);">
          Anthropic vừa ra mắt Claude 3.5 Sonnet với Computer Use · Sam Altman chia sẻ về AGI · Netflix chia sẻ bí quyết Recommender System 2025
        </div>
      </div>

      <!-- FEATURED HERO ARTICLE -->
      ${hotArticle && !searchQuery && activeCategory === 'Tất cả' ? `
        <div class="card card-accent" style="cursor:pointer;padding:0;overflow:hidden;margin-bottom:28px;border:1px solid var(--color-gray-200);box-shadow:var(--shadow-md);transition:transform var(--transition-fast),box-shadow var(--transition-fast);" id="hero-article-card" data-article-id="${hotArticle.id}">
          <div class="hero-article-grid" style="display:grid;grid-template-columns:1fr 280px;align-items:stretch;">
            <div style="padding:32px 36px;">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                ${getCategoryBadge(hotArticle.category)}
                <span class="badge" style="background:#EF4444;color:#fff;font-size:10px;font-weight:700;padding:2px 8px;">HOT UPDATE</span>
                <span style="font-size:var(--text-xs);color:var(--color-gray-400);display:inline-flex;align-items:center;gap:4px;">
                  ${ICONS.clock(12)} ${hotArticle.date}
                </span>
              </div>
              <h2 style="font-size:1.45rem;font-weight:800;color:var(--color-navy);margin:0 0 12px;line-height:1.4;">
                ${hotArticle.title}
              </h2>
              <p style="font-size:0.95rem;color:var(--color-gray-600);line-height:1.65;margin:0 0 20px;">
                ${hotArticle.excerpt}
              </p>
              <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;">
                <div style="display:flex;align-items:center;gap:12px;font-size:var(--text-xs);color:var(--color-gray-500);">
                  <span style="font-weight:700;color:var(--color-primary);">${hotArticle.source}</span>
                  <span>·</span>
                  <span style="display:inline-flex;align-items:center;gap:4px;">${ICONS.clock(12)} ${hotArticle.readTime}</span>
                  <span>·</span>
                  <span style="display:inline-flex;align-items:center;gap:4px;">${ICONS.eye(12)} ${(hotArticle.views || 0).toLocaleString()} lượt xem</span>
                </div>
                <button class="btn btn-primary btn-sm" style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;">
                  Đọc phân tích chuyên sâu →
                </button>
              </div>
            </div>
            <div style="background:${hotArticle.gradient || 'linear-gradient(135deg,#0B1533,#0284C7)'};height:100%;min-height:220px;display:flex;align-items:center;justify-content:center;color:#fff;">
              <div style="text-align:center;padding:24px;">
                <div style="display:flex;justify-content:center;margin-bottom:10px;opacity:0.95;">
                  ${getCategoryIcon(hotArticle.category)}
                </div>
                <div style="font-size:0.85rem;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;opacity:0.9;">Deep Dive Analysis</div>
              </div>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- SEARCH & FILTER BAR -->
      <div style="margin-bottom:24px;">
        <!-- Search -->
        <div style="position:relative;margin-bottom:16px;">
          <span style="position:absolute;left:16px;top:50%;transform:translateY(-50%);color:var(--color-gray-400);display:flex;">
            ${ICONS.search(16)}
          </span>
          <input
            type="text"
            id="community-search"
            class="input form-input"
            placeholder="Tìm kiếm tin tức: Anthropic, Sam Altman, Netflix, Llama 3, Machine Learning, dbt..."
            value="${escapeHtml(searchQuery)}"
            style="width:100%;padding:12px 16px 12px 46px;box-sizing:border-box;border-radius:var(--radius-lg);font-size:var(--text-sm);"
          />
        </div>

        <!-- Filter tabs -->
        <div class="filter-bar" style="display:flex;flex-wrap:wrap;gap:8px;">
          ${CATEGORIES.map(cat => {
            const active = cat === activeCategory;
            return `
              <button
                class="btn btn-sm ${active ? 'btn-primary' : 'btn-secondary'} category-tab-btn"
                data-category="${cat}"
                style="border-radius:var(--radius-full);padding:7px 16px;"
              >${cat}</button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- ARTICLES GRID -->
      <div id="articles-grid" class="page-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(330px,1fr));gap:24px;">
        ${articles.length > 0 ? articles.map(art => `
          <div class="card article-card-item" data-id="${art.id}" style="cursor:pointer;padding:0;overflow:hidden;display:flex;flex-direction:column;border:1px solid var(--color-gray-200);transition:transform var(--transition-fast),box-shadow var(--transition-fast);">
            <div style="background:${art.gradient || 'linear-gradient(135deg,#0B1533,#0284C7)'};height:120px;padding:16px 20px;display:flex;align-items:flex-start;justify-content:space-between;color:#fff;">
              <div style="background:rgba(255,255,255,0.18);backdrop-filter:blur(4px);border-radius:8px;padding:8px;display:flex;align-items:center;justify-content:center;">
                ${getCategoryIcon(art.category)}
              </div>
              <span class="badge" style="background:rgba(0,0,0,0.35);color:#fff;font-size:10px;">${art.date}</span>
            </div>

            <div style="padding:22px;display:flex;flex-direction:column;flex:1;">
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
                ${getCategoryBadge(art.category)}
                <span style="font-size:11px;color:var(--color-gray-400);">${art.source}</span>
              </div>

              <h3 style="font-size:1.05rem;font-weight:700;color:var(--color-navy);margin:0 0 10px;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
                ${art.title}
              </h3>

              <p style="font-size:0.88rem;color:var(--color-gray-600);line-height:1.6;margin:0 0 16px;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;flex:1;">
                ${art.excerpt}
              </p>

              <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:16px;">
                ${(art.tags || []).slice(0, 3).map(t => `<span class="tag" style="font-size:11px;">${t}</span>`).join('')}
              </div>

              <div style="display:flex;align-items:center;justify-content:space-between;border-top:1px solid var(--color-gray-100);padding-top:14px;font-size:var(--text-xs);color:var(--color-gray-500);">
                <div style="display:flex;align-items:center;gap:8px;">
                  <span style="display:inline-flex;align-items:center;gap:3px;">${ICONS.clock(12)} ${art.readTime}</span>
                  <span>·</span>
                  <span style="display:inline-flex;align-items:center;gap:3px;">${ICONS.eye(12)} ${(art.views || 0).toLocaleString()}</span>
                </div>

                <div style="display:flex;align-items:center;gap:4px;color:${art.isUserLiked ? 'var(--color-primary)' : 'var(--color-gray-500)'};font-weight:${art.isUserLiked ? '700' : 'normal'};">
                  ${ICONS.heart(13)} ${art.likes}
                </div>
              </div>
            </div>
          </div>
        `).join('') : `
          <div style="grid-column:1/-1;text-align:center;padding:48px 24px;color:var(--color-gray-400);">
            <div style="display:flex;justify-content:center;color:var(--color-gray-300);margin-bottom:14px;">
              ${ICONS.search(48)}
            </div>
            <div style="font-size:var(--text-lg);font-weight:var(--weight-semibold);color:var(--color-navy);">Không tìm thấy bài viết tin tức phù hợp</div>
            <div style="font-size:var(--text-sm);margin-top:6px;">Thử tìm kiếm với từ khóa khác như "AI", "Anthropic", "Netflix", "Data"...</div>
          </div>
        `}
      </div>

      <style>
        @media (max-width: 768px) {
          .hero-article-grid { grid-template-columns: 1fr !important; }
        }
      </style>
    `;

    attachListEvents();
  }

  function attachListEvents() {
    // Search input
    const searchInput = container.querySelector('#community-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderList();
      });
    }

    // Category tabs
    container.querySelectorAll('.category-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.category;
        renderList();
      });
    });

    // Hero card click
    const heroCard = container.querySelector('#hero-article-card');
    if (heroCard) {
      heroCard.addEventListener('click', () => {
        const id = heroCard.dataset.articleId;
        const art = getAllArticles().find(a => a.id === id);
        if (art) renderDetail(art);
      });
    }

    // Article card click
    container.querySelectorAll('.article-card-item').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        const art = getAllArticles().find(a => a.id === id);
        if (art) renderDetail(art);
      });
    });
  }

  function renderDetail(article) {
    viewingArticleId = article.id;
    const allArticles = getAllArticles();
    const related = allArticles.filter(a => a.id !== article.id).slice(0, 3);
    const parsedHtml = parseMarkdown(article.content || '');

    container.innerHTML = `
      <div style="max-width:880px;margin:0 auto;padding-bottom:36px;">
        <!-- Back button -->
        <button id="back-to-news-btn" class="btn btn-secondary btn-sm" style="margin-bottom:20px;display:inline-flex;align-items:center;gap:6px;padding:8px 16px;">
          ← Quay lại danh sách tin tức
        </button>

        <!-- Article Header Card -->
        <div class="card" style="padding:32px 36px;margin-bottom:24px;border-left:4px solid var(--color-primary,#0284C7);">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;flex-wrap:wrap;">
            ${getCategoryBadge(article.category)}
            <span style="font-size:var(--text-xs);color:var(--color-primary);font-weight:700;">${article.source}</span>
            <span style="font-size:var(--text-xs);color:var(--color-gray-400);">·</span>
            <span style="font-size:var(--text-xs);color:var(--color-gray-400);display:inline-flex;align-items:center;gap:4px;">
              ${ICONS.clock(12)} ${article.date}
            </span>
            <span style="font-size:var(--text-xs);color:var(--color-gray-400);">·</span>
            <span style="font-size:var(--text-xs);color:var(--color-gray-400);display:inline-flex;align-items:center;gap:4px;">
              ${ICONS.eye(12)} ${(article.views || 0).toLocaleString()} lượt đọc
            </span>
          </div>

          <h1 style="font-size:1.85rem;font-weight:800;color:var(--color-navy);line-height:1.35;margin:0 0 16px;">
            ${article.title}
          </h1>

          <p style="font-size:1.05rem;color:var(--color-gray-600);line-height:1.65;font-style:italic;margin:0 0 20px;border-bottom:1px solid var(--color-gray-100);padding-bottom:20px;">
            ${article.excerpt}
          </p>

          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;">
            <div style="display:flex;align-items:center;gap:12px;">
              <div style="width:40px;height:40px;border-radius:50%;background:var(--color-primary);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:0.85rem;">
                ${article.authorInitials || 'DA'}
              </div>
              <div>
                <div style="font-weight:700;font-size:var(--text-sm);color:var(--color-navy);">${article.author}</div>
                <div style="font-size:11px;color:var(--color-gray-400);">${article.source}</div>
              </div>
            </div>

            <!-- Action buttons: Like and Share -->
            <div style="display:flex;align-items:center;gap:10px;">
              <button
                id="btn-like-detail"
                class="btn btn-sm ${article.isUserLiked ? 'btn-primary' : 'btn-secondary'}"
                style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;"
              >
                ${ICONS.heart(14)}
                <span>${article.isUserLiked ? 'Đã thích' : 'Thích bài viết'} (${article.likes})</span>
              </button>
              <button
                id="btn-share-detail"
                class="btn btn-secondary btn-sm"
                style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;"
              >
                ${ICONS.send(14)}
                <span>Chia sẻ</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Article Body Card -->
        <div class="card" style="padding:36px 40px;margin-bottom:28px;">
          <div class="article-content-body" style="font-size:1rem;color:var(--color-gray-700);">
            ${parsedHtml}
          </div>

          <div style="margin-top:28px;padding-top:20px;border-top:1px solid var(--color-gray-100);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <span style="font-size:var(--text-xs);font-weight:var(--weight-bold);color:var(--color-navy);">Tags:</span>
              ${(article.tags || []).map(t => `<span class="tag" style="font-size:11px;">${t}</span>`).join('')}
            </div>

            <button
              id="btn-like-bottom"
              class="btn btn-sm ${article.isUserLiked ? 'btn-primary' : 'btn-secondary'}"
              style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;"
            >
              ${ICONS.heart(14)} Thích bài viết (${article.likes})
            </button>
          </div>
        </div>

        <!-- Related News Section -->
        <div>
          <h3 style="font-size:1.2rem;font-weight:700;color:var(--color-navy);margin:0 0 16px;display:flex;align-items:center;gap:8px;">
            ${ICONS.trendingUp(18)} Tin tức & Phân tích liên quan
          </h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;">
            ${related.map(r => `
              <div class="card related-news-card" data-id="${r.id}" style="cursor:pointer;padding:20px;transition:transform var(--transition-fast),box-shadow var(--transition-fast);">
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
                  ${getCategoryBadge(r.category)}
                  <span style="font-size:11px;color:var(--color-gray-400);">${r.date}</span>
                </div>
                <h4 style="font-size:0.95rem;font-weight:700;color:var(--color-navy);margin:0 0 8px;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
                  ${r.title}
                </h4>
                <div style="font-size:11px;color:var(--color-gray-500);display:flex;align-items:center;gap:4px;">
                  ${ICONS.clock(11)} ${r.readTime} · ${r.source}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    // Event listeners
    container.querySelector('#back-to-news-btn')?.addEventListener('click', renderList);

    container.querySelector('#btn-like-detail')?.addEventListener('click', () => handleLike(article.id));
    container.querySelector('#btn-like-bottom')?.addEventListener('click', () => handleLike(article.id));

    container.querySelector('#btn-share-detail')?.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        showToast('Đã sao chép liên kết bài viết vào clipboard!', 'info');
      } else {
        showToast('Liên kết: ' + window.location.href, 'info');
      }
    });

    container.querySelectorAll('.related-news-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.id;
        const nextArt = allArticles.find(a => a.id === id);
        if (nextArt) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          renderDetail(nextArt);
        }
      });
    });
  }

  // Initial render
  renderList();
}
