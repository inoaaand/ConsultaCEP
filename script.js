const cepInput = document.getElementById('cep');
const erro = document.getElementById('erro');

cepInput.addEventListener('input', () => {
  const cep = cepInput.value.replace(/\D/g, '');
  if (cep.length === 8) {
    buscarEndereco(cep);
  }
});

function buscarEndereco(cep) {
  erro.classList.add('hidden');

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(data => {
      if (data.erro) {
        mostrarErro('CEP não encontrado.');
        limparCampos();
        return;
      }

      document.getElementById('logradouro').value = data.logradouro || '';
      document.getElementById('bairro').value = data.bairro || '';
      document.getElementById('cidade').value = data.localidade || '';
      document.getElementById('uf').value = data.uf || '';
      document.getElementById('codigo_ibge').value = data.ibge || '';
      document.getElementById('complemento').value = data.complemento || '';
    })
    .catch(() => {
      mostrarErro('Erro ao consultar o CEP.');
      limparCampos();
    });
}

function mostrarErro(msg) {
  erro.textContent = msg;
  erro.classList.remove('hidden');
  limparCampos();
}

function limparCampos() {
  const campos = ['logradouro', 'bairro', 'cidade', 'uf', 'codigo_ibge']
  campos.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}
