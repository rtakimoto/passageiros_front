/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {
  let url = 'http://127.0.0.1:5000/passageiros';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.passageiros.forEach(item => insertList(item.id,item.nome, item.cpf, item.flight))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputPassageiro, inputCPF, inputFlight) => {
  const formData = new FormData();
  formData.append('nome', inputPassageiro);
  formData.append('cpf', inputCPF);
  formData.append('flight', inputFlight);

  let url = 'http://127.0.0.1:5000/passageiro';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

const insertButton2 = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00BA");
  span.className = "edit";
  span.appendChild(txt);
  parent.appendChild(span);
}

/*
  --------------------------------------------------------------------------------------
  Função para editar um item da lista de acordo com o click no botão edit
  --------------------------------------------------------------------------------------
*/
const updateElement = () => {
  let edit = document.getElementsByClassName("edit");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < edit.length; i++) {
    edit[i].onclick = function () {
      /*let div = this.parentElement.parentElement;
      const cpf = div.getElementsByTagName('td')[1].innerHTML*/
      const rowId = this.parentElement.parentElement.id;
      console.log('Row ID:', rowId);
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const cpf = div.getElementsByTagName('td')[1].innerHTML
      const rowId = this.parentElement.parentElement.id;
      console.log('Row ID:', rowId);
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(cpf)
        alert("Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  
  let url = 'http://127.0.0.1:5000/passageiro?cpf=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo passageiro com nome, cpf e peso 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputPassageiro = document.getElementById("newPassageiro").value;
  let inputCPF = document.getElementById("newCPF").value;
  let inputFlight = document.getElementById("newPeso").value;

  if (inputPassageiro === '') {
    alert("Escreva o nome de um passageiro!")
  } else if (inputCPF === '') {
    alert("Entre com o CPF");
  } else if (inputFlight === '') {
    alert("Entre com o Voo!");
  } else {
    postItem(inputPassageiro, inputCPF, inputFlight)
    /*tratar erro post*/
    insertList(inputPassageiro, inputCPF, inputFlight)
    alert("Item adicionado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (id, namePassageiro, cpf, flight) => {
  var item = [id,namePassageiro, cpf, flight]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    if (i===0){
      row.id=item[0];
      console.log(item[0]);
    }
    else{
      var cel = row.insertCell(i-1);
      cel.textContent = item[i];
    }
  }
  insertButton(row.insertCell(-1))
  insertButton2(row.insertCell(-1))
  document.getElementById("newPassageiro").value = "";
  document.getElementById("newCPF").value = "";
  document.getElementById("newFlight").value = "";

  removeElement()
  updateElement()
}