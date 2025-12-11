export const FALLBACK_COVER_URL = 'https://via.placeholder.com/200x300?text=No+Cover'

export function formatGenre(genre = '') {
  const normalized = (genre || '').toLowerCase()
  const map = {
    fantasy: 'Fantasy',
    fiction: 'Fiction',
    classic: 'Classic',
    dystopian: 'Dystopian',
    thriller: 'Thriller',
    scifi: 'Sci-Fi',
    romance: 'Romance',
    biography: 'Biography',
    horror: 'Horror',
  }

  return map[normalized] || 'Unknown'
}

export function handleImageError(event) {
  if (event && event.target) {
    event.target.src = FALLBACK_COVER_URL
  }
}

export function renderStars(rating = 0) {
  const safe = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)))
  return '★'.repeat(safe) + '☆'.repeat(5 - safe)
}
