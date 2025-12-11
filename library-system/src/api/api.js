// URL base do JSON Server (alterar conforme necessário)
const BASE_URL = 'http://localhost:3000'

// Função auxiliar para pedidos HTTP genéricos
// Centraliza headers e tratamento de resposta
async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })

  if (!response.ok) {
    throw new Error(`Erro HTTP: ${response.status}`)
  }

  const text = await response.text()
  return text ? JSON.parse(text) : null
}

// GET - Obter recursos (suporta query params para filtros/pesquisa/paginação)
export async function get(endpoint) {
  const url = `${BASE_URL}${endpoint}`
  return request(url)
}

// POST - Criar novos recursos
export async function post(endpoint, data) {
  const url = `${BASE_URL}${endpoint}`
  return request(url, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// PUT - Atualizar recurso completo
export async function put(endpoint, data) {
  const url = `${BASE_URL}${endpoint}`
  return request(url, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

// DELETE - Remover recurso
// Nota: 'del' porque 'delete' é palavra reservada em JS
export async function del(endpoint) {
  const url = `${BASE_URL}${endpoint}`
  return request(url, {
    method: 'DELETE',
  })
}

// Constrói query string a partir de objeto de parâmetros
// Filtra valores vazios/null/undefined automaticamente
export function buildQueryString(params) {
  const query = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    // Só adiciona se o valor não for vazio/null/undefined
    if (value !== null && value !== undefined && value !== '') {
      query.append(key, value)
    }
  })

  const queryString = query.toString()
  return queryString ? `?${queryString}` : ''
}   