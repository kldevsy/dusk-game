import { personagens } from './personagens.js';

const chatListEl = document.getElementById('chat-list');
const chatContainer = document.getElementById('chat-container');
const optionsEl = document.getElementById('options-container');
const typingEl = document.getElementById('typing-indicator');
const msgSound = document.getElementById('msg-sound');
const typeSound = document.getElementById('type-sound');
const chatAvatar = document.getElementById('chat-avatar');
const chatName = document.getElementById('chat-name');

export function playSound(el) {
  el.currentTime = 0;
  el.play();
}

export function renderChatList(chats, onSelect) {
  chatListEl.innerHTML = '';
  chats.forEach((c, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<img src="${c.avatar}"/><span>${c.name}</span>`;
    li.addEventListener('click', () => onSelect(c.id));
    chatListEl.appendChild(li);
  });
}

export function showChatHeader(character) {
  chatAvatar.src = character.avatar;
  chatName.textContent = character.name;
}

export function renderMessages(history) {
  chatContainer.innerHTML = '';
  history.forEach(m => {
    const div = document.createElement('div');
    div.className = 'message ' + (m.autor==='player'?'sent':'received');
    if (m.autor!=='player' && m.autor!=='system') {
      const av = document.createElement('img');
      av.className = 'chat-avatar';
      av.src = personajes[m.autor].avatar;
      div.appendChild(av);
    }
    const span = document.createElement('span');
    span.textContent = m.text;
    div.appendChild(span);
    chatContainer.appendChild(div);
  });
  chatContainer.scrollTop = chatContainer.scrollHeight;
  playSound(msgSound);
}

export function showTyping(name) {
  typingEl.textContent = `${name} está digitando...`;
  typingEl.classList.remove('hidden');
  playSound(typeSound);
}

export function hideTyping() {
  typingEl.classList.add('hidden');
}

export function renderOptions(options) {
  optionsEl.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = opt.text;
    btn.addEventListener('click', () => opt.handler(opt.text));
    optionsEl.appendChild(btn);
  });
}
