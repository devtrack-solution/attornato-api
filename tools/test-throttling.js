const axios = require('axios');

// Configuração
const BASE_URL = 'http://localhost:3000'; // URL da sua API NestJS
const ENDPOINT = '/'; // Endpoint a ser testado
const TOTAL_REQUESTS = 60; // Total de requisições para enviar
const DELAY_BETWEEN_REQUESTS = 2; // Delay entre as requisições (em ms)

// Função para esperar um tempo (delay)
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Função principal para enviar requisições
const testThrottling = async () => {
  console.log(`Iniciando teste de throttling para ${TOTAL_REQUESTS} requisições...`);

  for (let i = 1; i <= TOTAL_REQUESTS; i++) {
    try {
      const response = await axios.get(`${BASE_URL}${ENDPOINT}`);
      console.log(`Requisição ${i}: Sucesso - Status ${response.status}`);
    } catch (error) {
      if (error.response) {
        console.log(
          `Requisição ${i}: Falhou - Status ${error.response.status}, Mensagem: ${error.response.data.message}`
        );
      } else {
        console.log(`Requisição ${i}: Erro desconhecido - ${error.message}`);
      }
    }
    await delay(DELAY_BETWEEN_REQUESTS);
  }

  console.log('Teste concluído!');
};

testThrottling();