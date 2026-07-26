import { useState, useEffect} from 'react'
import './App.css'

function App() {
  const [pokemon, setPokemon] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)


  const buscar = async() => {
    try{
      setCargando(true)
      setError(null)
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${busqueda}`)
      const data = await res.json()
      console.log(data)
      setPokemon(data)
    }
    catch {
      console.log("Error en la busqueda")
    }
    setCargando(false)
  }


  return (
    <>
      <section>
        <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)}></input>
        <button onClick={buscar}>Buscar</button>
        <div className='ContenedorPokemon'>
          <div className='ContenedorImg'>
            <img className='ImgPokemon' src={pokemon?.sprites?.front_default ?? ''} alt={pokemon?.name ?? ''}></img>
          </div>
          <div className='ContenedorDatos'>
            <span>Nombre: {pokemon?.name ?? ''}</span>
            <span>Altura: {pokemon?.height ?? ''}</span>
            <span>Peso: {pokemon?.weight ?? ''}</span>
          </div>
        </div>
      </section> 
    </>
  )
}

export default App
