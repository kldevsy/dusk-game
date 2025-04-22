// js/ui.js
import { personagens } from './personagens.js';

const chatListEl      = document.getElementById('chat-list');
const chatContainerEl = document.getElementById('chat-container');
const optionsEl       = document.getElementById('options-container');
const typingEl        = document.getElementById('typing-indicator');
const msgSound        = document.getElementById('msg-sound');
const typeSound       = document.getElementById('type-sound');
const avatarEl        = document.getElementById('chat-avatar');
const nameEl          = document.getElementById('chat-name');

export function play(soundEl) {
  soundEl.currentTime = 0;
  soundEl.play();
}

export function renderChatList(chats, onSelect) {
  chatListEl.innerHTML = '';
  chats.forEach(id => {
    const char = personagens[id];
    const li = document.createElement('li');
    li.innerHTML = `<img src="${char.avatar}" /><span>${char.name}</span>`;
    li.addEventListener('click', ()=> onSelect(id));
    chatListEl.appendChild(li);
  });
}

export function showChatHeader(character) {
  avatarEl.src = character.avatar;
  nameEl.textContent = character.name;
}

export function renderMessages(history) {
  chatContainerEl.innerHTML = '';
  history.forEach(m => {
    const div = document.createElement('div');
    div.className = 'message ' + (m.autor==='player'?'sent':'received');
    if (m.autor!=='player' && m.autor!=='system') {
      const img = document.createElement('img');
      img.className = 'chat-avatar';
      img.src = personagens[m.autor].avatar;
      div.appendChild(img);
    }
    const span = document.createElement('span');
    span.textContent = m.text;
    div.appendChild(span);
    chatContainerEl.appendChild(div);
  });
  chatContainerEl.scrollTop = chatContainerEl.scrollHeight;
  play(msgSound);
}

export function showTyping(name) {
  typingEl.textContent = `${name} está digitando...`;
  typingEl.classList.remove('hidden');
  play(typeSound);
}

export function hideTyping() {
  typingEl.classList.add('hidden');
}

export function renderOptions(opts) {
  optionsEl.innerHTML = '';
  opts.forEach(o => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.textContent = o.text;
    btn.addEventListener('click', ()=> o.handler(o.text));
    optionsEl.appendChild(btn);
  });
}
