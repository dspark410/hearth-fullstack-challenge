import './App.css'
import { useState, useEffect } from 'react'
import HomeInfo from './components/HomeInfo'
import SingleHomeInfo from './components/SingleHomeInfo'
import Input from './components/Input'

function App() {
  const [homeData, setHomeData] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [filteredData, setFilteredData] = useState([])
  const [results, setResults] = useState([])
  const [searchedHome, setSearchedHome] = useState({})
  const [showAddress, setShowAddress] = useState(true)

  // handle setting user input into state and set filtered data into state
  const handleOnChange = (e) => {
    setInputValue(e.target.value)
  }

  // handle showing results based on user input
  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue === '') return
    else {
      setSearchedHome({})
      setResults([...filteredData])

      //clear out fields
      setInputValue('')
      setFilteredData([])
    }
  }

  // show addresses based on searched input
  const handleSearchAddress = (home) => {
    setSearchedHome(home)
    setShowAddress(false)
  }

  // filter the data based on user input
  const filterData = () => {
    return homeData.filter((home) => {
      return (
        inputValue.length > 2 &&
        home.ADDRESS.toLowerCase().includes(inputValue.toLowerCase())
      )
    })
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
    <div className='container'>
      <h1 className='header'>RedFin San Francisco</h1>
      <p className='p'>Search For Homes Available For Sale!</p>
      <section className='form_container'>
        <Input
          handleOnChange={handleOnChange}
          setShowAddress={setShowAddress}
          handleSubmit={handleSubmit}
          inputValue={inputValue}
          handleSearchAddress={handleSearchAddress}
          showAddress={showAddress}
          filteredData={filteredData}
        />
      </section>

      <div className='grid_container'>
        {Object.keys(searchedHome).length ? (
          <SingleHomeInfo searchedHome={searchedHome} />
        ) : (
          results.map((home, i) => {
            return <HomeInfo home={home} key={i} />
          })
        )}
      </div>
    </div>
  )
}

export default App
