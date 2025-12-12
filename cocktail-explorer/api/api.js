const Base_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

async function get(endpoint) {
    const url = `${Base_URL}/${endpoint}`;

    const response = await fetch(url, {
        headers: {

            Accept: 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
}
export async function getRandomCocktail() {
    const data = await get('random.php');
    return data.drinks ? data.drinks[0] : null;
}

export async function getCocktailById(id) {
    const data = await get(`lookup.php?i=${id}`);
    return data.drinks ? data.drinks[0] : null;
}

export async function searchCocktails(query) {
  if (!query || query.trim() === '') {
    return []
  }

  const data = await get(`search.php?s=${encodeURIComponent(query)}`);
  return data.drinks || []
}

export async function getCocktailsByCategory(category) {
  if (!category) {
    return []
  }

  const data = await get(`filter.php?c=${encodeURIComponent(category)}`)
  return data.drinks || []
}

export async function getCategories(){
    const data = await get('list.php?c=list');
    
    if (!data.drinks) {
        return [];
    }

    return data.drinks.map(item => item.strCategory);
}