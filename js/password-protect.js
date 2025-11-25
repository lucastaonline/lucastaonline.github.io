// Sistema Simples de Proteção por Senha
// Hash SHA-256 da senha configurada

// Eu sei que isso é muito fácil de ser burlado, é só uma proteção simples.
// Se você realmente é curioso ao ponto de vir até aqui, pode ver o conteúdo dos sites.

// Só te digo uma coisa. Muitos desses sites são de resenha, e até de conteúdo pessoal mesmo.
// Se você estiver querendo me contratar, me contrate, eu faço sites muito melhores que esses.
// E por favor, desconsidere as besteiras que você vai ver aqui.

async function checkPassword() {
    // Hash SHA-256 da senha - Para gerar novo hash, abra gerar-hash.html
    const SENHA_HASH = '9a260ff2a578df8ec79cdd237b79987f6b7ce8b2572cf0eb355a82803dc9c02f';

    // Esconde o conteúdo
    document.body.style.visibility = 'hidden';

    // Verifica se já foi autenticado nesta sessão
    if (sessionStorage.getItem('autenticado') === 'sim') {
        document.body.style.visibility = 'visible';
        return;
    }

    // Pede a senha
    const senha = prompt('Digite a senha para acessar:');

    if (senha === null) {
        // Usuário cancelou
        window.location.href = '../index.html';
        return;
    }

    // Gera hash da senha digitada
    const msgBuffer = new TextEncoder().encode(senha);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const senhaHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    // Verifica se está correta
    if (senhaHash === SENHA_HASH) {
        sessionStorage.setItem('autenticado', 'sim');
        document.body.style.visibility = 'visible';
    } else {
        alert('Senha incorreta!');
        window.location.href = '../index.html';
    }
}

// Executa quando o DOM estiver carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', checkPassword);
} else {
    checkPassword();
}
