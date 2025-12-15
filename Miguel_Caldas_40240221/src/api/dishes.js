const BASE_URL = 'http://localhost:3000'

async function request(endpoint, options = {}) {
  const { method = 'GET', body = null } = options

  const config = { method }

  if (body) {
    config.headers = { 'Content-Type': 'application/json' }
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  // DELETE não retorna conteúdo
  return method === 'DELETE' ? response.ok : await response.json()
}

function getDishes() {
  return request('/dishes')
}

function getDishesCategory(category) {
  return request(`/dishes?category=${category}`)
}

function createDish(payload) {
  return request('/dishes', {
    method: 'POST',
    body: payload,
  })
}

function deleteDish(id) {
  return request(`/dishes/${id}`, {
    method: 'DELETE',
  })
}

function updateDish(id, payload) {
  return request(`/dishes/${id}`, {
    method: 'PUT',
    body: payload,
  })
}

export { request, getDishes, getDishesCategory, createDish, deleteDish, updateDish }
