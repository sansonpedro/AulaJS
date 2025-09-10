const express = require("express")
const cors = require("cors")

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

const usuarios = [
  { id: 1, nome: "Otavio", idade: 20, senha: "123", cep: "01001000", rua: "Praça da Sé", bairro: "Sé" },
  { id: 2, nome: "Admin", idade: 20, senha: "1234", cep: "89251100", rua: "Rua Walter Marquardt", bairro: "Barra do Rio Molha" },
]

let nextId = 3

// Função para buscar dados no ViaCEP
async function buscarEndereco(cep) {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await response.json()
    return {
      rua: data.logradouro || "",
      bairro: data.bairro || ""
    }
  } catch (err) {
    console.error("Erro ao buscar endereço:", err)
    return { rua: "", bairro: "" }
  }
}

// Rota inicial
app.get("/", (req, res) => {
  res.send("Primeiro servidor DESI - Malwee")
})

// Buscar todos os usuários
app.get("/usuarios", (req, res) => {
  res.send(usuarios)
})

// Buscar usuário por ID
app.get("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const usuario = usuarios.find(u => u.id === id)

  if (usuario) {
    res.send(usuario)
  } else {
    res.status(404).send("Usuário não encontrado!")
  }
})

// Criar usuário
app.post("/usuarios", async (req, res) => {
  const novoUsuario = req.body
  novoUsuario.id = nextId++

  // Completa rua e bairro com base no CEP
  if (novoUsuario.cep) {
    const endereco = await buscarEndereco(novoUsuario.cep)
    novoUsuario.rua = endereco.rua
    novoUsuario.bairro = endereco.bairro
  }

  usuarios.push(novoUsuario)
  res.status(201).send(novoUsuario)
})

// Atualizar usuário
app.put("/usuarios/:id", async (req, res) => {
  const id = parseInt(req.params.id)
  const novoUsuario = req.body
  novoUsuario.id = id

  if (novoUsuario.cep) {
    const endereco = await buscarEndereco(novoUsuario.cep)
    novoUsuario.rua = endereco.rua
    novoUsuario.bairro = endereco.bairro
  }

  const index = usuarios.findIndex(u => u.id === id)
  if (index !== -1) {
    usuarios[index] = novoUsuario
    res.status(200).send(novoUsuario)
  } else {
    res.status(404).send("Usuário não encontrado!")
  }
})

// Deletar usuário
app.delete("/usuarios/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const index = usuarios.findIndex(u => u.id === id)

  if (index !== -1) {
    usuarios.splice(index, 1)
    res.status(204).send()
  } else {
    res.status(404).send("Usuário não encontrado!")
  }
})

app.listen(port, () => {
  console.log("Servidor rodando em http://localhost:3000")
})
