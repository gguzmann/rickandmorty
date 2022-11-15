const URL = 'https://rickandmortyapi.com/api'

export const getData = async (param, page) => {
    const response = await fetch(URL + param + page)
    const data = await response.json()
    return data
}

export const getAllEpisodes = async () => {
    const getNumEpisodes = await fetch(`${URL}/episode`)
    const dataNumEpisodes = await getNumEpisodes.json()

    const arrNumEpisodes = new Array(dataNumEpisodes.info.count).fill(0).map((x,i) => i + 1)
    const response = await fetch(`${URL}/episode/${arrNumEpisodes}`)
    const data = await response.json()
    console.log(data[0].episode[2])
    return data
}