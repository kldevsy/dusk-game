// js/main.js
import { roteiros }   from './mensagens.js';
import * as ui         from './ui.js';
import { saveProgress, loadProgress } from './storage.js';
import { personagens } from './personagens.js';

const introScreen     = document.getElementById('intro-screen');
const listScreen      = document.getElementById('chat-list-screen');
const chatScreen      = document.getElementById('chat-screen');
const btnStart        = document.getElementById('btn-start');
const btnBack         = document.getElementById('btn-back');

let unlockedChats = [];
let history       = [];
let pointer       = 0;
let currentChatId = null;

// esconde todas
function hideAll() {
  introScreen.classList.add('hidden');
  listScreen.classList.add('hidden');
  chatScreen.classList.add('hidden');
}

// mostra lista de chats
function showList() {
  hideAll();
  listScreen.classList.remove('hidden');
  ui.renderChatList(unlockedChats, openChat);
}

// mostra chat ativo
function showChat() {
  hideAll();
  chatScreen.classList.remove('hidden');
}

// start
btnStart.addEventListener('click', ()=>{
  unlockedChats = ['leon'];
  saveProgress({ unlockedChats });
  showList();
});

// back
btnBack.addEventListener('click', showList);

// abre chat
function openChat(id) {
  currentChatId = id;
  history = [];
  pointer = 0;
  ui.showChatHeader(personagens[id]);
  advance();
  showChat();
}

// avança no roteiro
function advance(choiceText) {
  const script = roteiros[currentChatId];
  if (choiceText) {
    history.push({ autor:'player', text:choiceText });
  }
  const node = script[pointer++];
  if (!node) return;

  if (node.type==='msg') {
    ui.showTyping(personagens[currentChatId].name);
    setTimeout(()=>{
      ui.hideTyping();
      history.push({ autor: node.autor, text: node.text });
      ui.renderMessages(history);
      advance();
    }, node.delay);
  }
  else if (node.type==='opts') {
    ui.hideTyping();
    ui.renderMessages(history);
    ui.renderOptions(
      node.options.map(opt=>({
        text: opt.text,
        handler: ()=> advance(opt.text)
      }))
    );
  }
  else if (node.type==='end') {
    if (node.nextChat && !unlockedChats.includes(node.nextChat)) {
      unlockedChats.push(node.nextChat);
      saveProgress({ unlockedChats });
    }
    showList();
  }
}

// ao carregar
window.addEventListener('load', ()=>{
  const prog = loadProgress();
  if (prog && prog.unlockedChats) {
    unlockedChats = prog.unlockedChats;
    showList();
  } else {
    hideAll();
    introScreen.classList.remove('hidden');
  }
});
