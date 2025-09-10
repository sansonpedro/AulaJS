const express = require("express");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());

const usuarios = [
  { id: 1, nome: "Otavio", idade: 20, senha: "123", cep: "01001000", rua: "Praça da Sé", bairro: "Sé" },
  {
    id: 2,
    nome: "Admin",
    idade: 20,
    senha: "1234",
    cep: "89251100",
    rua: "Rua Walter Marquardt",
    bairro: "Barra do Rio Molha",
  },
];

let nextId = 3;

const buscarEndereco = async (cep) => {
  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await res.json();
    return { rua: data.logradouro || "", bairro: data.bairro || "" };
  } catch {
    return { rua: "", bairro: "" };
  }
};

app.get("/", (req, res) => res.send("Primeiro servidor DESI - Malwee"));
app.get("/usuarios", (req, res) => res.send(usuarios));
app.get("/usuarios/:id", (req, res) => {
  const u = usuarios.find((u) => u.id === +req.params.id);
  u ? res.send(u) : res.status(404).send("Usuário não encontrado!");
});

app.post("/usuarios", async (req, res) => {
  const u = req.body;
  u.id = nextId++;
  if (u.cep) Object.assign(u, await buscarEndereco(u.cep));
  usuarios.push(u);
  res.status(201).send(u);
});

app.put("/usuarios/:id", async (req, res) => {
  const id = +req.params.id;
  const u = req.body;
  u.id = id;
  if (u.cep) Object.assign(u, await buscarEndereco(u.cep));
  const i = usuarios.findIndex((x) => x.id === id);
  i !== -1 ? ((usuarios[i] = u), res.send(u)) : res.status(404).send("Usuário não encontrado!");
});

app.delete("/usuarios/:id", (req, res) => {
  const i = usuarios.findIndex((u) => u.id === +req.params.id);
  i !== -1 ? (usuarios.splice(i, 1), res.status(204).send()) : res.status(404).send("Usuário não encontrado!");
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));
