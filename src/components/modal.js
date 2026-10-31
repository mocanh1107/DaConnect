// ============================================
// DaConnect Modal Component
// ============================================

const modalRoot = document.getElementById('modal-root');
let activeModal = null;

export function openModal({ title, content, wide = false, onClose }) {
  closeModal();
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal${wide ? ' modal-wide' : ''}">
      <div class="modal-header">
        <h3 class="modal-title">${title}</h3>
        <button class="modal-close" id="modal-close-btn">✕</button>
      </div>
      <div class="modal-body">${content}</div>
    </div>
  `;
  modalRoot.appendChild(overlay);
  activeModal = overlay;

  const closeBtn = overlay.querySelector('#modal-close-btn');
  closeBtn.addEventListener('click', () => { closeModal(); onClose?.(); });
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) { closeModal(); onClose?.(); }
  });
  document.addEventListener('keydown', handleEsc);
  return overlay;
}

export function closeModal() {
  if (activeModal) {
    activeModal.remove();
    activeModal = null;
    document.removeEventListener('keydown', handleEsc);
  }
}

function handleEsc(e) {
  if (e.key === 'Escape') closeModal();
}

export function setModalContent(html) {
  if (activeModal) {
    activeModal.querySelector('.modal-body').innerHTML = html;
  }
}

