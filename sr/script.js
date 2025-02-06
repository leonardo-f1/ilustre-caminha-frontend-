// URL do backend
const API_URL = "http://127.0.0.1:5000";

// Verifica se o script foi carregado
console.log("O script.js foi carregado corretamente!");

// Função para buscar membros e mostrar no HTML
async function carregarMembros() {
    console.log("Tentando buscar membros do backend...");

    try {
        const response = await fetch("http://127.0.0.1:5000/membros");
        if (!response.ok) {
            console.error("Erro na resposta da API:", response.status);
            return;
        }

        const membros = await response.json();
        console.log("Membros recebidos:", membros);

        // Filtrar para remover Jorge e Leonardo Fonseca
        const membrosFiltrados = membros.filter(membro => 
            membro.Nome !== "Jorge" && membro.Nome !== "Leonardo Fonseca"
        );

        const listaMembros = document.getElementById("lista-membros");
        if (!listaMembros) {
            console.error("Elemento lista-membros não encontrado!");
            return;
        }

        listaMembros.innerHTML = ""; // Limpa antes de adicionar novos membros

        membrosFiltrados.forEach(membro => {
            const li = document.createElement("li");
            li.textContent = `${membro.Nome} - ${membro.Funcao || "Função desconhecida"}`;
            listaMembros.appendChild(li);
        });

    } catch (error) {
        console.error("Erro ao carregar membros:", error);
    }
}


// Função para buscar jogadores e exibir no HTML
async function carregarJogadores() {
    console.log("Tentando buscar jogadores do backend...");

    try {
        const response = await fetch("http://127.0.0.1:5000/jogadores"); // Substitua com a rota correta
        console.log("Resposta da API:", response);

        if (!response.ok) {
            console.error("Erro na resposta da API:", response.status);
            return;
        }

        let jogadores = await response.json();
        console.log("Jogadores recebidos:", jogadores);

        // Filtrar para remover Leonardo Fonseca
        jogadores = jogadores.filter(jogador => jogador.Nome !== "Leonardo Fonseca");

        const listaJogadores = document.getElementById("lista-jogadores");
        if (!listaJogadores) {
            console.error("Elemento lista-jogadores não encontrado!");
            return;
        }

        listaJogadores.innerHTML = ""; // Limpa a lista antes de adicionar novos jogadores

        jogadores.forEach(jogador => {
            const li = document.createElement("li");
            li.textContent = `${jogador.Nome} - ${jogador.Posicao}`;
            listaJogadores.appendChild(li);
        });

    } catch (error) {
        console.error("Erro ao carregar jogadores:", error);
    }
}


// Quando a página carregar, chamar carregarJogadores()
window.addEventListener("load", () => {
    console.log("A página carregou, chamando carregarJogadores()...");
    carregarJogadores();
});


// Quando a página carregar, buscar os membros
window.addEventListener("load", () => {
    console.log("A página carregou, chamando carregarMembros()...");
    carregarMembros();
});


async function carregarNoticias() {
    console.log("Tentando buscar notícias do backend...");

    try {
        const response = await fetch(`${API_URL}/noticias`);
        console.log("Resposta da API:", response);

        if (!response.ok) {
            console.error("Erro na resposta da API:", response.status);
            return;
        }

        const noticias = await response.json();
        console.log("Notícias recebidas:", noticias);

        const listaNoticias = document.getElementById("lista-noticias");
        if (!listaNoticias) {
            console.error("Elemento lista-noticias não encontrado!");
            return;
        }

        listaNoticias.innerHTML = ""; // Limpa antes de adicionar novas notícias

        noticias.forEach(noticia => {
            const div = document.createElement("div");
            div.classList.add("noticia-card"); // Adicione uma classe para estilização
            div.innerHTML = `
                <h3>${noticia.titulo}</h3>
                <p>${noticia.descricao}</p>
            `;
            listaNoticias.appendChild(div);
        });

    } catch (error) {
        console.error("Erro ao carregar notícias:", error);
    }
}

// Quando a página carregar, buscar as notícias
window.addEventListener("load", () => {
    console.log("A página carregou, chamando carregarNoticias()...");
    carregarNoticias();
});