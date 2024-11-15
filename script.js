let tarefas = [];

function carregarTarefas() {
  const tarefasGuardadas = JSON.parse(localStorage.getItem("tarefas"));
  if (tarefasGuardadas) {
    tarefas = tarefasGuardadas;
    mostrarTarefas();
  }
}

function adicionarTarefa() {
  const tarefaInput = document.getElementById("adicionar-tarefa");
  if (tarefaInput) {
    const tarefaTexto = tarefaInput.value.trim();
    if (tarefaTexto) {
      const novaTarefa = {
        texto: tarefaTexto,
        completo: false,
        editado: false,
      };
      tarefas.push(novaTarefa);
      tarefaInput.value = "";
      salvarMostrarTarefa();
    }
  }
}

function editarTarefa(index) {
  tarefas[index].editado = true;
  mostrarTarefas();
}

function atualizarTarefa(index) {
  const tarefaInput = document.getElementById(`tarefa-input-${index}`);
  if (tarefaInput) {
    const tarefaTexto = tarefaInput.value.trim();
    if (tarefaTexto) {
      tarefas[index].texto = tarefaTexto;
      tarefas[index].editado = false;
      salvarMostrarTarefa();
    }
  }
}

function deletarTarefa(index) {
  tarefas.splice(index, 1);
  salvarMostrarTarefa();
}

function ativarTarefasCompletas(index) {
  tarefas[index].completo = !tarefas[index].completo;
  salvarMostrarTarefa();
}

function limparTodasTarefas() {
  tarefas = [];
  salvarMostrarTarefa();
}

function mostrarTarefas() {
  const listaTarefas = document.getElementById("lista-tarefas");
  if (listaTarefas) {
    listaTarefas.innerHTML = "";

    const mostrarCompleto = document.getElementById("mostrar-completo").checked;

    tarefas.forEach((tarefa, index) => {
      if (mostrarCompleto || !tarefa.completo) {
        const tarefaItem = document.createElement("li");
        tarefaItem.className = `flex items-center justify-between p-4 rounded hover:bg-gray-200 ${
          tarefa.completo ? "bg-gray-200" : ""
        }`;

        const tarefaTexto = tarefa.editado
          ? `<input type="text" id="tarefa-input-${index}" class="flex-1 px-2 py-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" value="${tarefa.texto}">`
          : `<span class="${
              tarefa.completo ? "line-through text-gray-500" : ""
            }">${tarefa.texto}</span>`;

        tarefaItem.innerHTML = `
          <div class="flex items-center">
            <input type="checkbox" class="mr-2" ${
              tarefa.completo ? "checked" : ""
            } onchange="ativarTarefasCompletas(${index})">
            ${tarefaTexto}
          </div>
          <div class="flex items-center space-x-2">
            ${
              tarefa.editado
                ? `<button class="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded" onclick="atualizarTarefa(${index})">Salvar</button>`
                : `<button class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded" onclick="editarTarefa(${index})">Editar</button>`
            }
            <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded" onclick="deletarTarefa(${index})">Deletar</button>
          </div>
        `;
        listaTarefas.appendChild(tarefaItem);
      }
    });
  }
}

function salvarMostrarTarefa() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  mostrarTarefas();
}

window.onload = carregarTarefas;

const adicionarTarefaBTN = document.getElementById("adicionar-tarefa-b");
if (adicionarTarefaBTN) {
  adicionarTarefaBTN.addEventListener("click", adicionarTarefa);
}

const apagarTudoBTN = document.getElementById("limpar-tudo");
if (apagarTudoBTN) {
  apagarTudoBTN.addEventListener("click", limparTodasTarefas);
}

const mostrarCompletoCheckbox = document.getElementById("mostrar-completo");
if (mostrarCompletoCheckbox) {
  mostrarCompletoCheckbox.addEventListener("change", mostrarTarefas);
}