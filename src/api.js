// src/api.js
// =========================================================================
// API ФУНКЦИИ-ЗАГЛУШКИ (MOCK FUNCTIONS)
// Все функции возвращают Promise с моковыми данными через setTimeout
// Для подключения реального бэкенда просто замените fetch-вызовы
// =========================================================================

// =========================================================================
// 1. АВТОРИЗАЦИЯ И АУТЕНТИФИКАЦИЯ
// =========================================================================

/**
 * Регистрация пользователя
 * @param {string} phone - Номер телефона
 * @param {string} password - Пароль
 * @returns {Promise<{success: boolean, token?: string, error?: string}>}
 */
export async function registerUser(phone, password) {
  try {
    // РЕАЛЬНЫЙ ЗАПРОС (раскомментируйте для подключения бэкенда):
    /*
    const response = await fetch('http://localhost:8000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password })
    });
    if (!response.ok) throw new Error('Registration failed');
    const data = await response.json();
    return { success: true, token: data.token };
    */

    // МОК-ФУНКЦИЯ с имитацией задержки
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // 90% успех, 10% ошибка
        if (Math.random() < 0.9) {
          resolve({
            success: true,
            token: `token_${Date.now()}`, // Имитация токена
            message: 'Регистрация успешна!'
          });
        } else {
          reject({
            success: false,
            error: 'Номер телефона уже зарегистрирован'
          });
        }
      }, 1500); // Задержка 1.5 сек (имитация работы сервера)
    });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    throw { success: false, error: error.message || 'Ошибка при регистрации' };
  }
}

/**
 * Вход пользователя
 * @param {string} phone - Номер телефона
 * @param {string} password - Пароль
 * @returns {Promise<{success: boolean, token?: string, error?: string}>}
 */
export async function loginUser(phone, password) {
  try {
    // РЕАЛЬНЫЙ ЗАПРОС:
    /*
    const response = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password })
    });
    if (!response.ok) throw new Error('Login failed');
    const data = await response.json();
    return { success: true, token: data.token };
    */

    // МОК-ФУНКЦИЯ
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.9) {
          resolve({
            success: true,
            token: `token_${Date.now()}`,
            message: 'Вход успешен!'
          });
        } else {
          reject({
            success: false,
            error: 'Неверный номер телефона или пароль'
          });
        }
      }, 1500);
    });
  } catch (error) {
    console.error('Ошибка входа:', error);
    throw { success: false, error: error.message || 'Ошибка при входе' };
  }
}

// =========================================================================
// 2. СОЗДАНИЕ И УПРАВЛЕНИЕ СОБЫТИЯМИ
// =========================================================================

/**
 * Отправка сообщения боту (чат)
 * @param {string} text - Текст сообщения
 * @param {Array} currentMessages - История сообщений
 * @returns {Promise<{text: string, buttons: Array, error?: string}>}
 */
export async function sendMessageToBot(text, currentMessages = []) {
  try {
    // РЕАЛЬНЫЙ ЗАПРОС:
    /*
    const response = await fetch('http://localhost:8000/api/chat/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        message: text,
        history: currentMessages,
        eventId: localStorage.getItem('currentEventId')
      })
    });
    if (!response.ok) throw new Error('Chat API error');
    const data = await response.json();
    // Ожидаемый ответ: { response: "Текст ответа", suggestedActions: [...] }
    return {
      text: data.response,
      buttons: data.suggestedActions || [],
      error: null
    };
    */

    // МОК-ФУНКЦИЯ
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockResponses = {
          'Что ты хочешь организовать?': {
            text: 'Отлично! Я помогу тебе спланировать мероприятие. На следующем этапе нам нужно выбрать дату.',
            buttons: ['Выбрать дату', 'Изменить тип']
          },
          'Я выбрал дату': {
            text: 'Спасибо за информацию о дате! Теперь давайте определимся с местом проведения и гостями.',
            buttons: ['Выбрать место', 'Указать гостей', 'Смета бюджета']
          }
        };

        const defaultResponse = `Принято! Я проанализировал: "${text}". Информация сохранена в вашем профиле.`;
        const response = mockResponses[text] || {
          text: defaultResponse,
          buttons: []
        };

        resolve({
          text: response.text,
          buttons: response.buttons,
          error: null
        });
      }, 1500);
    });
  } catch (error) {
    console.error('Ошибка отправки сообщения:', error);
    return {
      text: 'Упс, произошла ошибка связи с сервером. Попробуй позже.',
      buttons: [],
      error: error.message
    };
  }
}

/**
 * Сохранение даты события
 * @param {string} timeZone - Часовой пояс
 * @param {string} startDate - Дата начала (YYYY-MM-DD)
 * @param {string} startTime - Время начала (HH:MM)
 * @param {string} endDate - Дата окончания (YYYY-MM-DD)
 * @param {string} endTime - Время окончания (HH:MM)
 * @param {boolean} hasNoEndDate - Нет даты окончания
 * @returns {Promise<{success: boolean, eventId?: string, error?: string}>}
 */
export async function saveEventDate(
  timeZone,
  startDate,
  startTime,
  endDate,
  endTime,
  hasNoEndDate
) {
  try {
    // РЕАЛЬНЫЙ ЗАПРОС:
    /*
    const response = await fetch('http://localhost:8000/api/events/set-date', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        timeZone,
        startDate,
        startTime,
        endDate: hasNoEndDate ? null : endDate,
        endTime: hasNoEndDate ? null : endTime
      })
    });
    if (!response.ok) throw new Error('Date save failed');
    const data = await response.json();
    return { success: true, eventId: data.eventId };
    */

    // МОК-ФУНКЦИЯ
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          eventId: `event_${Date.now()}`,
          savedData: {
            timeZone,
            startDate,
            startTime,
            endDate: hasNoEndDate ? null : endDate,
            endTime: hasNoEndDate ? null : endTime
          },
          message: 'Дата события успешно сохранена!'
        });
      }, 1200);
    });
  } catch (error) {
    console.error('Ошибка сохранения даты:', error);
    throw { success: false, error: error.message || 'Ошибка при сохранении даты' };
  }
}

/**
 * Получение списка событий пользователя
 * @returns {Promise<{events: Array, error?: string}>}
 */
export async function getEvents() {
  try {
    // РЕАЛЬНЫЙ ЗАПРОС:
    /*
    const response = await fetch('http://localhost:8000/api/events', {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    if (!response.ok) throw new Error('Fetch events failed');
    const data = await response.json();
    return { events: data.events };
    */

    // МОК-ФУНКЦИЯ
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          events: [
            {
              id: 1,
              title: 'День рождения',
              date: '2026-04-09',
              description: 'Вечеринка в ресторане'
            },
            {
              id: 2,
              title: 'Свадьба',
              date: '2026-05-15',
              description: 'Церемония в загородном доме'
            }
          ],
          error: null
        });
      }, 1000);
    });
  } catch (error) {
    console.error('Ошибка получения событий:', error);
    return { events: [], error: error.message };
  }
}

// =========================================================================
// 3. БЮДЖЕТ
// =========================================================================

const MOCK_BUDGET = {
  totalBudget: 20000,
  guestCount: 12,
  items: [
    { id: 1, name: 'Напитки', qty: 1, pricePerUnit: 200, totalPrice: 2000 },
    { id: 2, name: 'Еда', qty: 1, pricePerUnit: 500, totalPrice: 6000 },
    { id: 3, name: 'Декор', qty: 1, pricePerUnit: 300, totalPrice: 3600 },
    { id: 4, name: 'Музыка', qty: 1, pricePerUnit: 150, totalPrice: 1500 },
  ]
};

export async function getBudgetItems(eventId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem(`budget_${eventId}`);
      resolve(stored ? JSON.parse(stored) : { ...MOCK_BUDGET });
    }, 600);
  });
}

export async function addBudgetItem(eventId, item) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem(`budget_${eventId}`);
      const budget = stored ? JSON.parse(stored) : { ...MOCK_BUDGET };
      const newItem = { ...item, id: Date.now() };
      budget.items = [...budget.items, newItem];
      localStorage.setItem(`budget_${eventId}`, JSON.stringify(budget));
      resolve({ success: true, item: newItem });
    }, 500);
  });
}

export async function deleteBudgetItem(eventId, itemId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem(`budget_${eventId}`);
      const budget = stored ? JSON.parse(stored) : { ...MOCK_BUDGET };
      budget.items = budget.items.filter((i) => i.id !== itemId);
      localStorage.setItem(`budget_${eventId}`, JSON.stringify(budget));
      resolve({ success: true });
    }, 400);
  });
}

export async function updateBudgetSettings(eventId, totalBudget, guestCount) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem(`budget_${eventId}`);
      const budget = stored ? JSON.parse(stored) : { ...MOCK_BUDGET };
      budget.totalBudget = totalBudget;
      budget.guestCount = guestCount;
      localStorage.setItem(`budget_${eventId}`, JSON.stringify(budget));
      resolve({ success: true });
    }, 400);
  });
}

// =========================================================================
// СЛУЖЕБНЫЕ ФУНКЦИИ
// =========================================================================

/**
 * Сохранение токена в localStorage
 * @param {string} token - JWT токен
 */
export function saveToken(token) {
  if (token) {
    localStorage.setItem('token', token);
  }
}

/**
 * Извлечение токена из localStorage
 * @returns {string|null}
 */
export function getToken() {
  return localStorage.getItem('token');
}

/**
 * Удаление токена (выход)
 */
export function removeToken() {
  localStorage.removeItem('token');
}