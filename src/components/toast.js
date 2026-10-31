// ============================================
// DaConnect Toast Component
// ============================================

import { ICONS } from './icons.js';

const toastRoot = document.getElementById('toast-root');
let toastCount = 0;

export function showToast(message, type = 'info', duration = 3500) {
  const id = ++toastCount;
  const icons = {
    success: ICONS.checkCircle(20),
    error: ICONS.xCircle(20),
    warning: ICONS.alertTriangle(20),
    info: ICONS.lightbulb(20),
  };
  const icon = icons[type] || icons.info;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.id = `toast-${id}`;
  toast.innerHTML = `
    <span class="toast-icon" style="display:flex;align-items:center;">${icon}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
  `;
  toastRoot.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s ease reverse';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
