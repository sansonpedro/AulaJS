const params = new URLSearchParams(window.location.search)
const usuarioId = params.get("id")

let nome = document.getElementById("nome")
let idade = document.getElementById("idade")
let senha = document.getElementById("senha")
let cep = document.getElementById("cep")
let rua = document.getElementById("rua")
let bairro = document.getElementById("bairro")

// Preenche os dados quando a página carrega
document.addEventListener("DOMContentLoaded", () => {
  fetch(`http://localhost:3000/usuarios/${usuarioId}`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      nome.value = data.nome
      idade.value = data.idade
      senha.value = data.senha
      cep.value = data.cep || ""
      rua.value = data.rua || ""
      bairro.value = data.bairro || ""
    })
    .catch(error => console.log(error))
})

// Função ViaCEP
function buscarCEP() {
  let cepValor = cep.value.replace(/\D/g, "")

  if (cepValor.length !== 8) {
    alert("CEP inválido!")
    return
  }

  fetch(`https://viacep.com.br/ws/${cepValor}/json/`)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        alert("CEP não encontrado!")
      } else {
        rua.value = data.logradouro
        bairro.value = data.bairro
      }
    })
    .catch(error => console.log(error))
}

// Atualiza usuário
function atualizarUsuario(event) {
  event.preventDefault()

  fetch(`http://localhost:3000/usuarios/${usuarioId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: nome.value,
      idade: idade.value,
      senha: senha.value,
      cep: cep.value,
      rua: rua.value,
      bairro: bairro.value,
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      alert(`Usuário ${usuarioId} foi atualizado com sucesso!`)
      window.location.href = "../index.html"
    })
    .catch(error => console.log(error))
}
