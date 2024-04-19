import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Header from './components/common/Header'
import ListEpisodes from './components/ListEpisodes'
import Episode from './components/Episode'
import './App.css'

function App() {

  return (
    <>
      <Header />

      <main className="main">
        <div className="container">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/episodes" element={<ListEpisodes />} />
            <Route path="/episode/:epi" element={<Episode />} />
            <Route path="*" element={<p>There's nothing here: 404!</p>} />
          </Routes>
        </div>
      </main>
    </>
  )
}

export default App
