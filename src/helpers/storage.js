export const getFavCharacters = () => {
    return JSON.parse(localStorage.getItem('Characters')) || []
}

export const setFavCharacter = (item) => {
    const favoritos = JSON.parse(localStorage.getItem('Characters')) || []

    if (favoritos.some(x => x.id == item.id)) return false

    const newFavoritos = [...favoritos, item]
    localStorage.setItem('Characters', JSON.stringify(newFavoritos))
}

export const removeFavCharacter = (item) => {
    const favoritos = JSON.parse(localStorage.getItem('Characters')) || []
    const newFavoritos = favoritos.filter(x => x.id != item.id)
    localStorage.setItem('Characters', JSON.stringify(newFavoritos))
}

export const getFavEpisodes = () => {
    return JSON.parse(localStorage.getItem('Episodes')) || []
}

export const setFavEpisode = (item) => {
    const episodes = getFavEpisodes()

    if(episodes.some(x => x.id == item.id)) return false

    const newList = [...episodes, item]
    localStorage.setItem('Episodes', JSON.stringify(newList))
}

export const removeFavEpisode = (item) => {
    const episodes = JSON.parse(localStorage.getItem('Episodes')) || []
    const newList = episodes.filter(x => x.id != item.id)
    localStorage.setItem('Episodes', JSON.stringify(newList))
}