import { useState, useRef } from 'react'
import iconLeft from '../assets/images/icon_left.svg'
import iconRight from '../assets/images/icon_right.svg'

const Carousel = ({ isLoadingData, numCharacters, charactersFiltered }) => {
  // ref for carousel ul
  const ref = useRef(null)
  const [currentPosition, setCurrentPosition] = useState(0)

  const widthScreen = window.innerWidth
  const numItemsMobile = widthScreen / 78 // 68px thumbs width + 10px margin right
  const itemsToScroll = numCharacters / numItemsMobile

  const goToLeft = () => {
    if (currentPosition === 0) return
    else {
      setCurrentPosition(currentPosition - 1)
      ref.current.style.transform = `translateX(-${currentPosition - 1}00%)`
    }
  }

  const goToRight = () => {
    if (currentPosition >= itemsToScroll) return
    else {
      setCurrentPosition(currentPosition + 1)
      ref.current.style.transform = `translateX(-${currentPosition + 1}00%)`
    }
  }

  return <div className="carousel pl-8">
    <h2 className="text-3xl mb-6">Characters</h2>

    <ul className="flex" ref={ref}>
      {
        !isLoadingData ?
          charactersFiltered?.map((ele) => {
            return <li key={ele.id}>
              <img src={ele.image} alt={ele.name} />
              <span>{ele.name}</span>
            </li>
          }) : <p>loading...</p>
      }
    </ul>

    <div className="buttons flex justify-center items-center">
      <button
        type="button"
        className="btn_icon prev"
        onClick={goToLeft}
        disabled={currentPosition === 0}
      >
        <img src={iconLeft} alt="left" />
      </button>
      <button
        type="button"
        className="btn_icon next"
        onClick={goToRight}
        disabled={currentPosition >= itemsToScroll}
      >
        <img src={iconRight} alt="right" />
      </button>
    </div>
  </div>
}

export default Carousel
