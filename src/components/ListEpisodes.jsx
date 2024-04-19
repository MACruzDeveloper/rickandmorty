import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Pagination from './common/Pagination'

const ListEpisodes = () => {
  const [episodes, setEpisodes] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoadingData, setIsLoadingData] = useState(false)

  // fetch list of episodes from api
  const fetchListOfEpisodes = async (page) => {
    setIsLoadingData(true)

    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/episode?page=${page}`
      )
      const data = await response.json()
      setEpisodes(data)
    } catch (error) {
      console.error("Error:", error)
      return await Promise.reject("Unable to fetch data.")
    }

    setIsLoadingData(false)
  }
  
  useEffect(() => {
    fetchListOfEpisodes(currentPage)
  },[])

  // Pagination list
  const itemsPerPage = 20
  const paginate = (num) => {
    setCurrentPage(num)
    fetchListOfEpisodes(num)
  }

  return <section className="episodes">
    <div className="container p-8">
      <ul className="episodes_list">
        {
          episodes?.results?.map((ele) => {
            return <li key={ele.id} className="flex py-4">
              <p className="text-2xl">
                <span className="block name">{ele.episode}: <strong>{ele.name}</strong></span>
                <span className="block date">{ele.air_date}</span>
                <NavLink to={`/episode/${ele.id}`}>View more</NavLink>
              </p>
            </li>
          })
        }
      </ul>

      {
        !isLoadingData && episodes?.results?.length > 0 && episodes?.info?.count > itemsPerPage ?

        <Pagination
          currentPage={currentPage}
          totalPages={episodes?.info?.pages}
          totalItems={episodes?.info?.count}
          paginate={paginate}
        /> : null
      }
    </div>
  </section>
}

export default ListEpisodes