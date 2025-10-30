// Dados de exemplo para demonstração
let convenios = [
    {
        id: 1,
        nome: "Hospital Santa Maria",
        tipo: "saude",
        status: "ativo",
        dataCriacao: "2024-01-15",
        descricao: "Convênio para atendimento médico",
        email: "contato@santamaria.com.br"
    },
    {
        id: 2,
        nome: "Universidade Federal",
        tipo: "educacao",
        status: "pendente",
        dataCriacao: "2024-02-01",
        descricao: "Convênio para programas educacionais",
        email: "convenios@uf.edu.br"
    },
    {
        id: 3,
        nome: "Centro Cultural",
        tipo: "cultural",
        status: "inativo",
        dataCriacao: "2023-11-20",
        descricao: "Convênio para eventos culturais",
        email: "cultural@centro.com.br"
    }
];

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    inicializarAplicacao();
});

function inicializarAplicacao() {
    carregarListaConvenios();
    popularSelectConvenios();
    configurarEventListeners();
}

function configurarEventListeners() {
    // Formulário de solicitação
    document.getElementById('solicitacaoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        enviarSolicitacao();
    });

    // Formulário de atualização
    document.getElementById('atualizacaoForm').addEventListener('submit', function(e) {
        e.preventDefault();
        atualizarConvenio();
    });

    // Busca
    document.getElementById('searchBtn').addEventListener('click', buscarConvenios);
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            buscarConvenios();
        }
    });

    // Modal
    document.querySelector('.close').addEventListener('click', fecharModal);
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('detalhesModal');
        if (e.target === modal) {
            fecharModal();
        }
    });

    // Logout
    document.querySelector('.logout-btn').addEventListener('click', function() {
        if (confirm('Deseja realmente sair do sistema?')) {
            alert('Saindo do sistema...');
            // Aqui você pode redirecionar para a página de login
        }
    });
}

function carregarListaConvenios() {
    const tbody = document.getElementById('conveniosTableBody');
    tbody.innerHTML = '';

    convenios.forEach(convenio => {
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td>${convenio.id}</td>
            <td>${convenio.nome}</td>
            <td>${formatarTipo(convenio.tipo)}</td>
            <td><span class="status-${convenio.status}">${formatarStatus(convenio.status)}</span></td>
            <td>${formatarData(convenio.dataCriacao)}</td>
            <td>
                <button class="btn-action view" onclick="verDetalhes(${convenio.id})" title="Ver detalhes">👁️</button>
                <button class="btn-action edit" onclick="editarConvenio(${convenio.id})" title="Editar">✏️</button>
                <button class="btn-action delete" onclick="excluirConvenio(${convenio.id})" title="Excluir">🗑️</button>
            </td>
        `;
        
        tbody.appendChild(tr);
    });
}

function popularSelectConvenios() {
    const select = document.getElementById('convenioSelect');
    select.innerHTML = '<option value="">Selecione um convênio...</option>';
    
    convenios.forEach(convenio => {
        const option = document.createElement('option');
        option.value = convenio.id;
        option.textContent = `${convenio.nome} (${formatarStatus(convenio.status)})`;
        select.appendChild(option);
    });
}

function enviarSolicitacao() {
    const formData = {
        nomeSolicitante: document.getElementById('nomeSolicitante').value,
        emailSolicitante: document.getElementById('emailSolicitante').value,
        tipoConvenio: document.getElementById('tipoConvenio').value,
        descricao: document.getElementById('descricao').value
    };

    // Simulação de envio para o servidor
    console.log('Solicitação enviada:', formData);
    
    // Aqui você faria uma requisição AJAX para o backend
    alert('Solicitação enviada com sucesso!');
    
    // Limpar formulário
    document.getElementById('solicitacaoForm').reset();
}

function atualizarConvenio() {
    const convenioId = document.getElementById('convenioSelect').value;
    const novoStatus = document.getElementById('novoStatus').value;
    const observacoes = document.getElementById('observacoes').value;

    if (!convenioId) {
        alert('Por favor, selecione um convênio.');
        return;
    }

    // Encontrar e atualizar o convênio
    const convenioIndex = convenios.findIndex(c => c.id == convenioId);
    if (convenioIndex !== -1) {
        convenios[convenioIndex].status = novoStatus;
        
        // Simulação de atualização no servidor
        console.log('Convênio atualizado:', convenios[convenioIndex]);
        console.log('Observações:', observacoes);
        
        alert('Convênio atualizado com sucesso!');
        
        // Atualizar a interface
        carregarListaConvenios();
        popularSelectConvenios();
        document.getElementById('atualizacaoForm').reset();
    }
}

function buscarConvenios() {
    const termo = document.getElementById('searchInput').value.toLowerCase();
    const tbody = document.getElementById('conveniosTableBody');
    tbody.innerHTML = '';

    const conveniosFiltrados = convenios.filter(convenio => 
        convenio.nome.toLowerCase().includes(termo) ||
        convenio.tipo.toLowerCase().includes(termo) ||
        convenio.status.toLowerCase().includes(termo)
    );

    if (conveniosFiltrados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center;">Nenhum convênio encontrado</td></tr>';
        return;
    }

    conveniosFiltrados.forEach(convenio => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${convenio.id}</td>
            <td>${convenio.nome}</td>
            <td>${formatarTipo(convenio.tipo)}</td>
            <td><span class="status-${convenio.status}">${formatarStatus(convenio.status)}</span></td>
            <td>${formatarData(convenio.dataCriacao)}</td>
            <td>
                <button class="btn-action view" onclick="verDetalhes(${convenio.id})" title="Ver detalhes">👁️</button>
                <button class="btn-action edit" onclick="editarConvenio(${convenio.id})" title="Editar">✏️</button>
                <button class="btn-action delete" onclick="excluirConvenio(${convenio.id})" title="Excluir">🗑️</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function verDetalhes(id) {
    const convenio = convenios.find(c => c.id === id);
    if (convenio) {
        const modal = document.getElementById('detalhesModal');
        const conteudo = document.getElementById('detalhesConteudo');
        
        conteudo.innerHTML = `
            <div style="line-height: 1.6;">
                <p><strong>ID:</strong> ${convenio.id}</p>
                <p><strong>Nome:</strong> ${convenio.nome}</p>
                <p><strong>Tipo:</strong> ${formatarTipo(convenio.tipo)}</p>
                <p><strong>Status:</strong> <span class="status-${convenio.status}">${formatarStatus(convenio.status)}</span></p>
                <p><strong>Data de Criação:</strong> ${formatarData(convenio.dataCriacao)}</p>
                <p><strong>E-mail:</strong> ${convenio.email}</p>
                <p><strong>Descrição:</strong> ${convenio.descricao}</p>
            </div>
        `;
        
        modal.style.display = 'block';
    }
}

function editarConvenio(id) {
    // Selecionar o convênio no dropdown de atualização
    document.getElementById('convenioSelect').value = id;
    
    // Rolar até a seção de atualização
    document.querySelector('#atualizacaoForm').scrollIntoView({
        behavior: 'smooth'
    });
}

function excluirConvenio(id) {
    const convenio = convenios.find(c => c.id === id);
    
    if (convenio && confirm(`Tem certeza que deseja excluir o convênio "${convenio.nome}"?`)) {
        // Simulação de exclusão
        convenios = convenios.filter(c => c.id !== id);
        
        alert('Convênio excluído com sucesso!');
        carregarListaConvenios();
        popularSelectConvenios();
    }
}

function fecharModal() {
    document.getElementById('detalhesModal').style.display = 'none';
}

// Funções auxiliares
function formatarTipo(tipo) {
    const tipos = {
        'saude': 'Saúde',
        'educacao': 'Educação',
        'cultural': 'Cultural',
        'comercial': 'Comercial'
    };
    return tipos[tipo] || tipo;
}

function formatarStatus(status) {
    const statusMap = {
        'ativo': 'Ativo',
        'inativo': 'Inativo',
        'pendente': 'Pendente',
        'expirado': 'Expirado'
    };
    return statusMap[status] || status;
}

function formatarData(dataString) {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
}