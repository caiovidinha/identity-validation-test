import IdentityValidation from '@paag-io/sdk-identity-validation';


document.querySelector('#app').innerHTML = `
   <style>
    body {
      font-family: Arial, sans-serif;
      margin: 2em;
      background-color: #f8f9fa;
      color: #333;
    }
    h1 {
      color: #444444;
      margin-bottom: 0.5em;
    }
    label {
      display: block;
      margin-bottom: 0.5em;
      font-weight: bold;
    }
    input[type="text"] {
      width: 100%;
      padding: 0.5em;
      margin-bottom: 1em;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 1em;
    }
    button {
      padding: 0.7em 1.2em;
      border: none;
      border-radius: 4px;
      background-color: #007BFF;
      color: #fff;
      font-size: 1em;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    #results {
      margin-top: 1em;
      background-color: #fff;
      padding: 1em;
      border: 1px solid #ddd;
      border-radius: 4px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    #logs p {
      margin: 0.5em 0;
      padding: 0.5em;
      border-bottom: 1px solid #eee;
    }
  </style>
  
  <h1>Teste: Paag Identity Validation</h1>
  <label for="cpf">CPF (opcional):</label>
  <input type="text" id="cpf" placeholder="Digite o CPF" />
  <button id="start">Iniciar Validação</button>

  <div id="results">
    <h2>Logs e Resultados</h2>
    <div id="logs"></div>
  </div>
`;


function logMessage(msg) {
  const logsDiv = document.getElementById('logs');
  const p = document.createElement('p');
  p.textContent = msg;
  logsDiv.appendChild(p);
}


const identityValidation = new IdentityValidation({
  host: import.meta.env.VITE_HOST_URL, 
  token: import.meta.env.VITE_TOKEN, 
});


identityValidation.on('success', () => {
  console.log('Validação realizada com sucesso!');
  logMessage('Validação realizada com sucesso!');
  
});

identityValidation.on('fail', () => {
  console.log('Validação falhou!');
  logMessage('Validação falhou!');
});

identityValidation.on('error', () => {
  console.log('Erro na validação!');
  logMessage('Erro na validação!');
});

identityValidation.on('close', () => {
  console.log('Usuário fechou a janela de validação.');
  logMessage('Usuário fechou a janela de validação.');
});


function iniciarValidacao() {
  const cpf = document.getElementById('cpf').value;
  if (cpf && cpf.trim() !== '') {
    console.log('Iniciando validação com CPF:', cpf);
    logMessage('Iniciando validação com CPF: ' + cpf);
    identityValidation.makeFullIdentityValidation(cpf);
  } else {
    console.log('Iniciando validação sem CPF');
    logMessage('Iniciando validação sem CPF');
    identityValidation.makeFullIdentityValidation();
  }
}


document.getElementById('start').addEventListener('click', iniciarValidacao);
