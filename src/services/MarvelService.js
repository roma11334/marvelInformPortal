import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  
  const _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  const _apiKey = 'apikey=d72068d34358d6efb858b44120c044fd'
  const _baseOffset = 210
  
  const {request, loading, error, clearError} = useHttp()

  const getAllCharacters = async (offset = _baseOffset) => {
     const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
     return res.data.results.map(_transformCharacter)
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
    return _transformCharacter(res.data.results[0])
  };

  const getComics = async (offset = _baseOffset) => {
    const res = await request(`https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=${offset}&apikey=d72068d34358d6efb858b44120c044fd`)
    return res.data.results.map(transformComics)
  }

  const getOneComics = async (id) => {
    const res = await request(`https://gateway.marvel.com:443/v1/public/comics/${id}?${_apiKey}`)
    return transformComics(res.data.results[0])
  }

  const transformComics = (char) => {
    return {
      id:char.id,
      title:char.title,
      desc:char.description || 'This comic have no description',
      price:char.prices[0].price,
      page:char.pageCount,
      thumbnail:char.thumbnail.path + '.' + char.thumbnail.extension
    }
  }

  const _transformCharacter = (char) => {
    return {
        id:char.id,
        name:char.name,
        description:char.description,
        thumbnail:char.thumbnail.path + '.' + char.thumbnail.extension,
        homepage:char.urls[0].url,
        wiki:char.urls[1].url,
        comics:char.comics.items
    }
  }

  return {getAllCharacters, getCharacter, loading, error, clearError, getComics, getOneComics}
}

export default useMarvelService;
