function cadastroUsuario(event) {
  event.preventDefault(), console.log(event);

  let nome = document.getElementById("nome").value;
  let idade = document.getElementById("idade").value;
  let cep = document.getElementById("cep").value;
  let rua = document.getElementById("rua").value;
  let bairro = document.getElementById("bairro").value;

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
    .then((response) => response.json())

    .then((data) => {
      console.log(data);
      alert("Usuário cadastrado com sucesso");
      window.location.href("../index.html");
    })

    .catch((error) => console.log(error));
}
function cepImplementar(event) {
  fetch("URL: viacep.com.br/ws/01001000/json/", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  })
    .then((response) => response.json())

    .then((data) => console.log(data))

    .catch((error) => console.log(error));
}
