const cepInput = document.getElementById('cep');

cepInput.addEventListener('input', () => {
  const cep = cepInput.value.replace(/\D/g, '');
  if (cep.length === 8) {
    buscarEndereco(cep);
  }
});

function buscarEndereco(cep) {
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(data => {
      if (data.erro) {
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
      limparCampos();
    });
}

function limparCampos() {
  const campos = ['logradouro', 'bairro', 'cidade', 'uf', 'codigo_ibge', 'complemento'];
  campos.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}
