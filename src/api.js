const BASE_URL = 'http://localhost:8000';

function getToken() {
  return localStorage.getItem('token');
}

async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.detail || errorData.message || `HTTP ${response.status}`;
    throw new Error(message);
  }

  // 204 No Content
  if (response.status === 204) return null;
  return response.json();
}

// ─── AUTH ────────────────────────────────────────────────────────────────────

/** Запросить OTP на номер телефона */
export async function requestOTP(phone) {
  return apiFetch('/auth/request-otp', {
    method: 'POST',
    body: JSON.stringify({ phone }),
  });
}

/**
 * Верифицировать OTP и получить JWT
 * @returns {{ access_token, token_type, user_id, full_name }}
 */
export async function verifyOTP(phone, code) {
  return apiFetch('/auth/verify', {
    method: 'POST',
    body: JSON.stringify({ phone, code }),
  });
}

// ─── TOKEN HELPERS ────────────────────────────────────────────────────────────

export function saveToken(token) {
  if (token) localStorage.setItem('token', token);
}

export function removeToken() {
  localStorage.removeItem('token');
}

export { getToken };

// ─── USERS ───────────────────────────────────────────────────────────────────

export async function getProfile() {
  return apiFetch('/users/me');
}

export async function updateProfile(data) {
  return apiFetch('/users/me', {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function getPreferences() {
  return apiFetch('/users/me/preferences');
}

// ─── EVENTS ──────────────────────────────────────────────────────────────────

export async function getEvents() {
  return apiFetch('/events');
}

export async function getEvent(eventId) {
  return apiFetch(`/events/${eventId}`);
}

export async function createEvent(data) {
  return apiFetch('/events', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateEvent(eventId, data) {
  return apiFetch(`/events/${eventId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteEvent(eventId) {
  return apiFetch(`/events/${eventId}`, { method: 'DELETE' });
}

// ─── GUESTS ──────────────────────────────────────────────────────────────────

export async function getGuests(eventId) {
  return apiFetch(`/events/${eventId}/guests`);
}

/**
 * Пригласить гостя
 * @param {number} eventId
 * @param {{ phone, full_name, role? }} data
 */
export async function inviteGuest(eventId, data) {
  return apiFetch(`/events/${eventId}/guests`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Обновить статус гостя
 * @param {number} eventId
 * @param {number} userId
 * @param {{ status }} data  — "invited" | "confirmed" | "declined" | "maybe"
 */
export async function updateGuestStatus(eventId, userId, data) {
  return apiFetch(`/events/${eventId}/guests/${userId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function removeGuest(eventId, userId) {
  return apiFetch(`/events/${eventId}/guests/${userId}`, { method: 'DELETE' });
}

// ─── TASKS ───────────────────────────────────────────────────────────────────

export async function getTasks(eventId) {
  return apiFetch(`/tasks/event/${eventId}`);
}

/**
 * Создать задачу
 * @param {number} eventId
 * @param {{ title, priority?, deadline?, category?, description? }} data
 */
export async function createTask(eventId, data) {
  return apiFetch(`/tasks/${eventId}`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Обновить статус задачи
 * @param {number} taskId
 * @param {string} status — "pending" | "in_progress" | "completed" | "overdue"
 */
export async function updateTaskStatus(taskId, status) {
  return apiFetch(`/tasks/${taskId}?status=${status}`, { method: 'PATCH' });
}

export async function deleteTask(taskId) {
  return apiFetch(`/tasks/${taskId}`, { method: 'DELETE' });
}

// ─── BUDGET ──────────────────────────────────────────────────────────────────

export async function getBudget(eventId) {
  return apiFetch(`/events/${eventId}/budget`);
}

/**
 * Добавить позицию бюджета
 * @param {number} eventId
 * @param {{ category, description?, planned_amount, vendor? }} data
 */
export async function addBudgetItem(eventId, data) {
  return apiFetch(`/events/${eventId}/budget`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Обновить позицию бюджета
 * @param {number} itemId
 * @param {{ paid?: boolean, actual_amount?: number }} params
 */
export async function updateBudgetItem(itemId, { paid, actual_amount } = {}) {
  const query = new URLSearchParams();
  if (paid !== undefined) query.set('paid', paid);
  if (actual_amount !== undefined) query.set('actual_amount', actual_amount);
  return apiFetch(`/budget/${itemId}?${query}`, { method: 'PATCH' });
}

export async function deleteBudgetItem(itemId) {
  return apiFetch(`/budget/${itemId}`, { method: 'DELETE' });
}

// ─── TIMELINE ────────────────────────────────────────────────────────────────

export async function getTimeline(eventId) {
  return apiFetch(`/events/${eventId}/timeline`);
}

/**
 * Добавить событие в таймлайн
 * @param {number} eventId
 * @param {{ time, activity, description?, location?, duration_minutes? }} data
 */
export async function addTimelineItem(eventId, data) {
  return apiFetch(`/events/${eventId}/timeline`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateTimelineItem(eventId, itemId, data) {
  return apiFetch(`/events/${eventId}/timeline/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteTimelineItem(eventId, itemId) {
  return apiFetch(`/events/${eventId}/timeline/${itemId}`, { method: 'DELETE' });
}

// ─── CHAT ────────────────────────────────────────────────────────────────────

/**
 * REST-альтернатива чата
 * @param {number} userId
 * @param {number} eventId
 * @param {string} message
 * @returns {{ message, suggested_actions, tasks_created }}
 */
export async function sendChatMessage(userId, eventId, message) {
  return apiFetch(`/chat/message?user_id=${userId}&event_id=${eventId}`, {
    method: 'POST',
    body: JSON.stringify({ message }),
  });
}

/**
 * Обёртка для CreateEventPage — сохраняет старый интерфейс { text, buttons, error }
 * userId и eventId берёт из localStorage
 */
export async function sendMessageToBot(message) {
  const userId = localStorage.getItem('user_id');
  const eventId = localStorage.getItem('current_event_id');
  try {
    const data = await sendChatMessage(userId, eventId, message);
    return {
      text: data.message,
      buttons: data.suggested_actions || [],
      error: null,
    };
  } catch (err) {
    return {
      text: 'Ошибка связи с сервером. Попробуйте позже.',
      buttons: [],
      error: err.message,
    };
  }
}

/**
 * Создать WebSocket соединение с чат-агентом
 * @param {number} userId
 * @param {number} eventId
 * @returns {WebSocket}
 */
export function createChatWebSocket(userId, eventId) {
  const token = getToken();
  const wsBase = BASE_URL.replace(/^http/, 'ws');
  return new WebSocket(`${wsBase}/chat/${userId}/${eventId}?token=${token}`);
}
