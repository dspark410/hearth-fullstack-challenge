import './App.css'
import { useState, useEffect } from 'react'

function App() {
  const [homeData, setHomeData] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [results, setResults] = useState([])

  // filter the data based on user input
  const filterData = () => {
    return homeData.filter((home) => {
      return (
        inputValue.length > 1 &&
        home.ADDRESS.toLowerCase().includes(inputValue.toLowerCase())
      )
    })
  }

  // handle setting user input into state and set filtered data into state
  const handleOnChange = (e) => {
    setInputValue(e.target.value)
  }

  // handle showing results based on user input
  const handleSubmit = (e) => {
    e.preventDefault()
    setResults([...filteredData])

    //clear out fields
    setInputValue('')
    setFilteredData([])
  }

  // fetch data on initial load and set it into state
  useEffect(() => {
    fetch('http://localhost:5000/api/redfin/sanfrancisco')
      .then((res) => res.json())
      .then((data) => {
        //console.log(data)
        setHomeData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  // call the filter data function everytime user input changes
  useEffect(() => {
    const filtered = filterData()
    setFilteredData(filtered)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue])

  return (
    <div className='App'>
      <form onSubmit={handleSubmit}>
        <input type='text' value={inputValue} onChange={handleOnChange} />
        <select>
          {filteredData.slice(0, 5).map((home, i) => (
            <option key={i}>{home.ADDRESS}</option>
          ))}
        </select>
        <button onClick={handleSubmit}>Submit</button>
      </form>

      <div className='grid_container'>
        {results.map((home, i) => {
          return (
            <div key={i}>
              <div>{`$${home.PRICE.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ','
              )}`}</div>
              <div>{`${home.BEDS} Beds ${
                home.BATHS.indexOf('0') !== -1
                  ? Math.round(+home.BATHS)
                  : home.BATHS
              } Baths`}</div>
              <div>{`${home.ADDRESS}, ${home.CITY.toUpperCase()}, ${
                home['STATE OR PROVINCE']
              } ${home['ZIP OR POSTAL CODE']}`}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
