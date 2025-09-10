function buscarCEP() {
  let cep = document.getElementById("cep").value.replace(/\D/g, "")

  if (cep.length !== 8) {
    alert("CEP inválido!")
    return
  }

  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(response => response.json())
    .then(data => {
      if (data.erro) {
        alert("CEP não encontrado!")
      } else {
        document.getElementById("rua").value = data.logradouro
        document.getElementById("bairro").value = data.bairro
      }
    })
    .catch(error => console.error("Erro ao buscar CEP:", error))
}

function cadastroUsuario(event) {
  event.preventDefault()

  let nome = document.getElementById("nome").value
  let idade = document.getElementById("idade").value
  let senha = document.getElementById("senha").value
  let cep = document.getElementById("cep").value
  let rua = document.getElementById("rua").value
  let bairro = document.getElementById("bairro").value

  fetch("http://localhost:3000/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome: nome,
      idade: idade,
      senha: senha,
      cep: cep,
      rua: rua,
      bairro: bairro,
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data)
      alert("Usuário cadastrado com sucesso")
      window.location.href = "../index.html"
    })
    .catch(error => console.log(error))
}