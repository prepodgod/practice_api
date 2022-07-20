import { useHttp } from '../hooks/http.hook'

const useMarvelService = () => {
    const { loading, error, request, clearError } = useHttp()
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
    const _apiKey = 'apikey=dde6057b8360ad2589e772a2a1152a79'
    const _baseOffset = '210'
    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }
    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics)

    }
    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics(res.data.results[0]);

    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }
    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description !== true ? "Нет информации по этому персонажу" : char.description.slice(0, 50),
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }

    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices[0].price !== true ? "Not available" : comics.prices[0].price,
            language: comics.textObjects.language || 'en-us',
            description: comics.textObjects.text ? comics.textObjects.text : "There is no description",
            pages: comics.pageCount + " pages"
        }

    }
    return { loading, error, getCharacter, getAllCharacters, clearError, getAllComics, getComics }
}

export default useMarvelService;