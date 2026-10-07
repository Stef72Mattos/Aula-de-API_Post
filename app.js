const gridPosts = document.getElementById('gridPosts');
const indicadorCarregamento = document.getElementById('indicadorCarregamento');
const contadorPosts = document.getElementById('contadorPosts');
const formNovoPost = document.getElementById('formNovoPost');
const campoTitulo = document.getElementById('campoTitulo');
const campoConteudo = document.getElementById('campoConteudo');
const btnSalvarPost = document.getElementById('btnSalvarPost');
const containerAlerta = document.getElementById('containerAlerta');

const modalBootstrap = new bootstrap.Modal(document.getElementById('modalNovoPost'));
let listaDePosts = [];


const modalExcluir = new bootstrap.Modal(document.getElementById('modalExcluirPost'));
const modalEditar = new bootstrap.Modal(document.getElementById('modalEditarPost'));
const fromEditarPost = document.getElementById('formEditarPost');
const campoIdEdicao = document.getElementById('campoIdEdicao');
const campoTituloEdicao = document.getElementById('campoTituloEdicao');
const campoConteudoEdicao = document.getElementById('campoConteudoEdicao');
const btnSalvarEdicao = document.getElementById('btnSalvarEdicao');
const textoExclir = document.getElementById('textoExclir');
const btnConfirmarExclusao = document.getElementById('btnConfirmarExclusao');
const rotuloIdEdicao = document.getElementById('rotuloIdEdicao');

let idPostExclusao = null;





function exibirAlerta(mensagem, tipo = 'success'){
    const alerta = document.createElement('div');
    alerta.className = `alert alert-${tipo} alert-dismissible fade show shadow-sm`;
    alerta.innerHTML = `
        <span>${mensagem}</span>
        <button type='button' class='btn-close' data-bs-dismiss='alert'></button>
    `;
    containerAlerta.appendChild(alerta);
    setTimeout(()=> alerta.remove(), 4000);
}

async function buscarPosts(){
    try{
        const resposta = await fetch('https://jsonplaceholder.typicode.com/posts');
        if(!resposta.ok) throw new Error('Erro ao carregar posts');
        listaDePosts = await resposta.json();
        indicadorCarregamento.classList.add('d-none');
        gridPosts.classList.remove('d-none');
        renderizarListaPosts();
    }catch(error){
        exibirAlerta(error.message,'danger');
        contadorPosts.textContent = 'Erro';
    }
}

function renderizarListaPosts(){
    gridPosts.innerHTML = '';
    contadorPosts.textContent = `Total: ${listaDePosts.length} post(s)`;

    listaDePosts.forEach(post => {
        const coluna = document.createElement('div');
        coluna.className = 'col-12 col-md-6 col-lg-4';
        const seloNovo = post.eNovo ? '<span class="badge bg-success badge-novo">Novo</span>' : '';
        
        coluna.innerHTML = `
            <div class="card h-100 border-0 shadow-sm post-card position-relative">
                ${seloNovo}
                <div class="card-body d-flex flex-column justify-between">
                    <div>
                        <small class="text-primary">Usuário #${post.userId}</small>
                        <h2 class="h6 card-title">${post.title}</h2>
                        <p class="card-text small">${post.body}</p>
                    </div>
                    <div class="mt-3 border-top">
                        <span> ID Post nº ${post.id} </span>
                        <div class="d-flex gap-2">
                            <button class="btn btn-outline-primary btn-sm" data-acao="editar" data-id="${post.id}" aria-label="Editar post${post.id}">
                                <i class="fa-solid fa-pen-to-square"></i>Editar
                            </button>
                            <button class="btn btn-outline-danger btn-sm" data-acao="excluir" data-id="${post.id}" aria-label="Excluir post${post.id}">
                                <i class="fa-solid fa-trash"></i>Excluir
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        gridPosts.appendChild(coluna);
    });
}

async function cadastrarPosts(evento){
    evento.preventDefault();
    const titulo = campoTitulo.value.trim();
    const conteudo = campoConteudo.value.trim();
    try{
        const resposta = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {'Content-Type':'application/json; charset=UTF-8'},
            body: JSON.stringify({title: titulo, body: conteudo, userId: 1})
        });
        if(!resposta.ok) throw new Error('Falha ao cadastrar!');

        const novoPost = await resposta.json();
        novoPost.eNovo = true;
        novoPost.id = listaDePosts.length > 0 ? Math.max(...listaDePosts.map(p=>p.id)) +1 : 101;
        listaDePosts.unshift(novoPost);
        renderizarListaPosts();
        formNovoPost.reset();
        modalBootstrap.hide();
        exibirAlerta('Post cadastrado com sucesso!','success');    
    }catch(erro){
        exibirAlerta(erro.message,'danger');
    }
}

function abrirModalEdicao(id){
    const post = listaDePosts.find(item => item.id === id);
    if(!post) return;
    campoIdEdicao.value = post.id;
    campoTituloEdicao.value = post.title;
    campoConteudoEdicao.value = post.body;
    rotuloIdEdicao.textContent = `#${post.id}`;
    modalEditar.show();
}

async function salvarEdicao(evento){
    evento.preventDefault();
    const id = Number(campoIdEdicao.value);
    const post = listaDePosts.find(item => item.id === id);
    if(!post) return;

    const titulo = campoTituloEdicao.value.trim();
    const conteudo = campoConteudoEdicao.value.trim();
    //btnSalvarEdicao.disabled = true;

    try{
        const resposta = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'PUT',
            headers: {'Content-Type':'application/json; charset=UTF-8'},
            body: JSON.stringify({
                id,
                title: titulo,
                body: conteudo,
                userId: post.userId
            })
        });
        if(!resposta.ok) throw new Error('Falha ao editar Post!');
        const postAtualizado = await resposta.json();
        const indice = listaDePosts.findIndex(item => item.id === id);
        listaDePosts[indice] = {...post, ...postAtualizado, id, userId: post.userId, eNovo: post.eNovo};
        renderizarListaPosts();
        modalEditar.hide();
        exibirAlerta('Post atualizado com sucesso','success');
    }catch(erro){
        exibirAlerta(erro.message,'danger');
    }
}

gridPosts.addEventListener('click', (evento) => {
    const botao = evento.target.closest('button[data-acao]');
    if(!botao) return;

    const id = Number(botao.dataset.id);
    if(botao.dataset.acao === 'editar')abrirModalEdicao(id);
    if(botao.dataset.acao === 'excluir')abrirModelExclusao (id);    
});

formEditarPost.addEventListener('submit',salvarEdicao);
formNovoPost.addEventListener('submit',cadastrarPosts);
buscarPosts();