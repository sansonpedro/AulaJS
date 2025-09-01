function cadastroUsuario(event) {
  event.preventDefault(), console.log(event);

  let nome = document.getElementById("nome").value;
  let idade = document.getElementById("idade").value;
  let senha = document.getElementById("senha").value;

  fetch("http://localhost:3000/usuarios", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      "nome": nome,
      "idade": idade,
      "senha": senha
    }),
  })

    .then((response) => response.json())

    .then((data) => {
      console.log(data)
      alert("Usuário cadastrado com sucesso");
      window.location.href("../index.html");
    })

    .catch((error) => console.log(error));
}
