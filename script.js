const BASE_URL = 'https://strapi.kitek-pg.ru'
const API_URL = `${BASE_URL}/api/mangaa?populate=*`
const API_TOKEN = 'aa1e4f6b3a539a20830d0d30ba5af85e7dd71c57f34cd26882008834bc625d0e975e444848be8e0631460d4c97ea7bfed5abc1bbbc8f12dd9eed5749086b37b0a665c3e76c5548277ca75648d050be6d54dd09d1980b5711b56406d62a709bcffc8a82029a39b9c99f3fb118bae7b71fde6fed1e096285b14c0d32b51349055c'

const cardsEl = document.querySelector('#cards')
const statusEl = document.querySelector('#status')

function createCard(item) {
    const { title, author, genre, chapter, release, condition, read, picture } = item

    return `
        <article class="card">
                    <img
                        class="card__image"
                        src="${BASE_URL}${picture.url}"
                        alt="${title}" />
                    <div class="card__body">
                        <h2 class="card__title">${title}</h2>
                        <p class="card__text">${chapter}</p>
                        <p class="card__text">${genre}</p>
                        <p class="card__text">${author}</p>
                        <p class="card__text">${release}</p>
                        <div class="card__footer">
                            <span class="card__read">${read ? 'Прочитано' : 'Не прочитано'}</span>
                            <span class="badge badge--yes">${condition}</span>
                        </div>
                    </div>
                </article>
    `
}

async function loadCards() {
    try {
        statusEl.textContent = 'Загрузка...'
        const response = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
            },
        })

        if (!response.ok) {
            throw new Error(`Ошибка запроса: ${response.status}`)
        }

        const result = await response.json()
        const items = result.data

        if (items.length === 0) {
            statusEl.textContent = 'Записей пока нет'
            cardsEl.innerHTML = ''
            return
        }

        cardsEl.innerHTML = items.map(createCard).join('')
        statusEl.textContent = ''
    } catch (error) {
        console.error(error)
        cardsEl.innerHTML = ''
        statusEl.textContent = `Не удалось загрузить данные: ${error.message}`
        statusEl.classList.add('status--error')
    }
}

loadCards()