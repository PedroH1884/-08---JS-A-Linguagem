const readline = require('readline-sync');

const perguntas = [
   {
    pergunta: "Qual é o maior planeta do sistema solar?",
    alternativas: ["Terra", "Júpiter", "Saturno"],
    resposta: 1
  },
  {
    pergunta: "Quem pintou a Mona Lisa?",
    alternativas: ["Leonardo da Vinci", "Pablo Picasso", "Vincent Van Gogh"],
    resposta: 0
  },
  {
    pergunta: "Qual é o elemento químico representado por 'O'?",
    alternativas: ["Ouro", "Oxigênio", "Prata"],
    resposta: 1
  },
  {
    pergunta: "Qual é o país com o maior número de habitantes do mundo?",
    alternativas: ["Estados Unidos", "Índia", "China"],
    resposta: 2
  },
  {
    pergunta: "Em que continente fica o Egito?",
    alternativas: ["África", "Ásia", "Europa"],
    resposta: 0
  },
  {
    pergunta: "Quantos segundos há em uma hora?",
    alternativas: ["3600", "6000", "1600"],
    resposta: 0
  },
  {
    pergunta: "Qual desses animais é um mamífero?",
    alternativas: ["Tubarão", "Golfinho", "Polvo"],
    resposta: 1
  },
  {
    pergunta: "Qual é a capital da Austrália?",
    alternativas: ["Sydney", "Melbourne", "Canberra"],
    resposta: 2
  },
  {
    pergunta: "Quem escreveu 'Dom Quixote'?",
    alternativas: ["William Shakespeare", "Miguel de Cervantes", "José de Alencar"],
    resposta: 1
  },
  {
    pergunta: "Qual é a cor resultante da mistura de azul e amarelo?",
    alternativas: ["Verde", "Roxo", "Laranja"],
    resposta: 0
  },
  {
    pergunta: "Em que ano o homem pisou na Lua pela primeira vez?",
    alternativas: ["1965", "1969", "1972"],
    resposta: 1
  },
  {
    pergunta: "Quantos lados tem um octógono?",
    alternativas: ["Seis", "Oito", "Dez"],
    resposta: 1
  },
  {
    pergunta: "Qual é o idioma mais falado no mundo?",
    alternativas: ["Espanhol", "Chinês mandarim", "Inglês"],
    resposta: 1
  },
  {
    pergunta: "Quem descobriu o Brasil?",
    alternativas: ["Pedro Álvares Cabral", "Dom Pedro I", "Vasco da Gama"],
    resposta: 0
  },
  {
    pergunta: "Qual o nome do cientista que formulou a teoria da gravidade?",
    alternativas: ["Galileu Galilei", "Isaac Newton", "Albert Einstein"],
    resposta: 1
  }
];

const premiacoes = [1000, 5000, 10000, 50000, 100000, 250000, 500000, 750000, 1000000];

function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function jogar() {
  const nome = readline.question("Digite seu nome: ");
  console.log(`\n🎉 Bem-vindo ao Show do Milhão, ${nome}!\n`);

  embaralhar(perguntas);

  let rodada = 0;
  let premio = 0;
  let usouAjuda = false;

  while (rodada < perguntas.length) {
    const perguntaAtual = perguntas[rodada];
    const valorRodada = premiacoes[rodada] || premiacoes[premiacoes.length - 1];

    console.log(`\n🔷 Rodada ${rodada + 1} - Valendo R$ ${valorRodada.toLocaleString('pt-BR')}`);
    console.log(perguntaAtual.pergunta);

    perguntaAtual.alternativas.forEach((alt, i) => {
      console.log(`${i + 1} - ${alt}`);
    });

    console.log("P - Parar e levar o prêmio atual");
    if (!usouAjuda) {
      console.log("A - Usar ajuda (elimina 1 ou 2 alternativas erradas)");
    }

    let resposta = readline.question("Sua resposta: ").toUpperCase();

    if (resposta === "P") {
      console.log(`\n🛑 Você decidiu parar! Prêmio final: R$ ${premio.toLocaleString('pt-BR')}`);
      break;
    }

    if (resposta === "A" && !usouAjuda) {
      usouAjuda = true;

      const alternativasErradas = perguntaAtual.alternativas
        .map((_, i) => i)
        .filter(i => i !== perguntaAtual.resposta);

      const quantasEliminar = Math.random() < 0.5 ? 1 : 2;
      const eliminadas = [];

      while (eliminadas.length < quantasEliminar && alternativasErradas.length > 0) {
        const idx = Math.floor(Math.random() * alternativasErradas.length);
        eliminadas.push(alternativasErradas.splice(idx, 1)[0]);
      }

      console.log(`\n💡 AJUDA ATIVADA! Eliminamos ${eliminadas.length} alternativa(s):`);

      perguntaAtual.alternativas.forEach((alt, i) => {
        if (!eliminadas.includes(i)) {
          console.log(`${i + 1} - ${alt}`);
        }
      });

      resposta = readline.question("Sua resposta: ").toUpperCase();

      if (resposta === "P") {
        console.log(`\n🛑 Você decidiu parar! Prêmio final: R$ ${premio.toLocaleString('pt-BR')}`);
        break;
      }
    }

    const respostaIndex = parseInt(resposta) - 1;

    if (respostaIndex === perguntaAtual.resposta) {
      premio = valorRodada;
      console.log("✅ Resposta correta!");
    } else {
      console.log("❌ Resposta errada!");
      console.log(`A resposta correta era: ${perguntaAtual.alternativas[perguntaAtual.resposta]}`);
      premio = 0;
      break;
    }

    rodada++;

    if (premio >= 1000000) {
  console.log("\n🏆 Parabéns! Você atingiu o prêmio máximo de R$ 1.000.000!");
  break;
}
  }

  console.log(`\n👤 Jogador: ${nome}`);
  console.log(`🎯 Rodada alcançada: ${rodada}`);
  console.log(`💰 Prêmio final: R$ ${premio.toLocaleString('pt-BR')}`);

  const jogarNovamente = readline.question("\nDeseja jogar novamente? (S/N): ").toUpperCase();
  if (jogarNovamente === "S") {
    jogar();
  } else {
    console.log("\n Valeu por jogar! Até a próxima.");
  }
}

module.exports = jogar;
