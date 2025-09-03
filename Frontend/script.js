fetch("http://localhost:3000/usuarios")
  .then(async (res) => {
    if (!res.ok) {
      throw new Error("Erro ao buscar usuários");
    }

    return res.json();
  })
  .then((usuarios) => {
    const listaUsuarios = document.getElementById("lista-usuarios");
    usuarios.forEach((usuario) => {
      console.log(usuario.nome);
      listaUsuarios.innerHTML += `
        <li class="list-group-item">
        <div class="d-flex justify-content-between">
            <h5>${usuario.nome} - idade: ${usuario.idade}</h5>
            <div>
              <a href="editarUsuario/index.html?id=${usuario.id}" class="btn btn-outline-warning">Atualizar Usuário</a>
              <button type="button" class="btn btn-outline-danger" onclick="deletarUsuario(${usuario.id})">Deletar</button>
            </div>
        </div>
        </li>
        `;
    });
  })
  .catch((err) => {
    console.error(err);
  });

function deletarUsuario(userId) {
  let confirmDelet = confirm("Do you want delet the user:" + userId + "?");
  if (confirmDelet) {
    fetch(`http://localhost:3000/usuarios/$(userId)`, {
    
      method: 'DELETE',
    
    })
    
      .then(response => {
        if(response.ok){
          alert("Usuário" + userId + "excluido com sucesso!")
          window.location.reload();
          return;
        }
        alert("Algo deu errado!")
      })
        
      .catch(error => console.log(error));
  }
}
