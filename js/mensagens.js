// js/mensagens.js
export const roteiros = {
  leon: [
    { type:'msg', autor:'leon', text:'Se você recebeu isso… já é tarde.', delay:1000 },
    { type:'msg', autor:'leon', text:'ÁUDIO: "Eles estão me seguindo..."', delay:1200 },
    {
      type:'opts',
      options: [
        { text:'Porque ele confia em mim', next:3 },
        { text:'Não faço ideia',           next:3 },
        { text:'Talvez ele estivesse com medo', next:3 }
      ]
    },
    { type:'msg', autor:'leon', text:'Obrigado por responder.', delay:800 },
    { type:'end', nextChat:'rafa' }
  ],
  rafa: [
    { type:'msg', autor:'rafa', text:'Ei, você foi adicionado(a) por mim!', delay:1000 },
    { type:'msg', autor:'rafa', text:'Dá uma olhada nessa foto.', delay:1200 },
    { type:'msg', autor:'system', text:'[IMAGEM: beco escuro]', delay:500 },
    {
      type:'opts',
      options: [
        { text:'Conheço esse lugar', next:4 },
        { text:'Isso é recente?',  next:4 }
      ]
    },
    { type:'msg', autor:'system', text:'Continua no próximo capítulo…', delay:800 },
    { type:'end', nextChat:null }
  ]
};
