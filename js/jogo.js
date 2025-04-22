import { roteiros } from './mensagens.js';
import { personagens } from './personagens.js';
import * as ui from './ui.js';
import { saveProgress, loadProgress } from './storage.js';


const introScreen = document.getElementById('intro-screen');
const chatListScreen = document.getElementById('chat-list-screen');
const chatScreen = document.getElementById('chat-screen');
const btnStart = document.getElementById('btn-start');
const btnBack = document.getElementById('btn-back');

let unlockedChats = [];
let history = [];
let pointer = 0;
let currentChatId = null;

// navegação de telas
function hideAll() {
  introScreen.classList.add('hidden');
  chatListScreen.classList.add('hidden');
  chatScreen.classList.add('hidden');
}

function showIntro() {
  hideAll();
  introScreen.classList.remove('hidden');
}
function showList() {
  hideAll();
  chatListScreen.classList.remove('hidden');
  ui.renderChatList(
    unlockedChats.map(id=>({ id, name: personagens[id].name, avatar: personagens[id].avatar })),
    openChat
  );
}
function showChat() {
  hideAll();
  chatScreen.classList.remove('hidden');
}

// iniciar o jogo
const btnstart = document.getElementById('btn-start');
btnStart.onclick = () => {
  unlockedChats = ['leon'];
  saveProgress({ unlockedChats });
  showList();
};


// voltar à lista
btnBack.onclick = ()=> showList();

// abrir conversa
function openChat(id) {
  currentChatId = id;
  history = [];
  pointer = 0;
  ui.showChatHeader(personagens[id]);
  advance();
  showChat();
}

// avançar script
function advance(choiceText) {
  const script = roteiros[currentChatId];
  if (choiceText) {
    history.push({ autor:'player', text: choiceText });
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
        text:opt.text,
        handler:()=> {
          advance(opt.text);
        }
      }))
    );
  }
  else if (node.type==='end') {
    // desbloquear próximo chat
    if (node.nextChat) {
      if (!unlockedChats.includes(node.nextChat)) {
        unlockedChats.push(node.nextChat);
        saveProgress({ unlockedChats });
      }
    }
    showList();
  }
}

// ao carregar, tenta retomar progresso
window.addEventListener('load', ()=>{
  const prog = loadProgress();
  if (prog && prog.unlockedChats) {
    unlockedChats = prog.unlockedChats;
    showList();
  } else showIntro();
});
