import { useEffect, useState, useContext } from 'react'
import { useParams, NavLink } from 'react-router-dom'
//import { useDispatch, useSelector } from 'react-redux'
//import { fetchAllCharacters } from '../store/characterSlice'
import { myContext } from '../App'
import Carousel from './Carousel'
import FormComments from './FormComments'

const Episode = () => {
  const userFromContext = useContext(myContext)
  const [charactersFiltered, setCharactersFiltered] = useState([])
  const [isLoadingData, setIsLoadingData] = useState(false)
  const [numCharacters, setNumCharacters] = useState(0)

  // get all characters from store
  //const dispatch = useDispatch()
  //useEffect(() => {
    //dispatch(fetchAllCharacters())
  //}, [dispatch])
  //const { characters } = useSelector((state) => state.characters)

  // get episode data using url param from episodes list
  const { epi } = useParams()
  const [dataEpisode, setDataEpisode] = useState([])

  useEffect(() => {
    const fetchDataEpisode = async () => {
      setIsLoadingData(true)

      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/episode/${epi}`
        )
        const data = await response.json()
        setDataEpisode(data)
        setNumCharacters(data.characters.length)
        fetchImagesFromCharacters(data.characters)
      } catch (error) {
        console.error("Error:", error)
        return await Promise.reject("Unable to fetch data.")
      }
    }

    fetchDataEpisode()
  }, [])


  // filter characters of this episode from the store list and save it in state
  const fetchImagesFromCharacters = async (arr) => {
    for (const url of arr) {
      try {
        const response = await fetch(url)
        const data = await response.json()
        if (charactersFiltered.length === 0) {
          setCharactersFiltered((prevState) => [...prevState, data])
        }
      } catch (error) {
        console.error("Error:", error)
        return await Promise.reject("Unable to fetch data.")
      }
    }

    setIsLoadingData(false)
  }

  return <section className="episode">
    <div className="container py-4">
      <nav className="back flex justify-between items-center px-8 mb-12">
        <p className="text-2xl">Hi {userFromContext}!</p>
        <NavLink to="/episodes" className="text-2xl font-bold">« Back</NavLink>
      </nav>

      <div className="px-8 mb-8">
        <p className="text-2xl">{dataEpisode.episode}</p>
        <h1 className="text-4xl font-bold">{dataEpisode.name}</h1>
        <p className="text-2xl mt-2">{dataEpisode.air_date}</p>
      </div>

      <Carousel
        isLoadingData={isLoadingData}
        numCharacters={numCharacters}
        charactersFiltered={charactersFiltered}
      />

      <div className="form px-8 my-8">
        <h2 className="text-3xl mb-6">Comments</h2>

        <FormComments />
      </div>
    </div>
  </section>
}

export default Episode
