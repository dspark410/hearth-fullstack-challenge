import React from 'react'
import { BsSearch } from 'react-icons/bs'

function Input({
  handleOnChange,
  setShowAddress,
  handleSubmit,
  handleSearchAddress,
  inputValue,
  showAddress,
  filteredData,
}) {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='input_container'>
          <input
            autoFocus
            className='input'
            type='text'
            value={inputValue}
            onChange={handleOnChange}
            onFocus={() => setShowAddress(true)}
          />
          <span className='search_icon' onClick={handleSubmit}>
            <BsSearch
              style={{
                pointerEvents: 'none',
                fontSize: '1.25rem',
                color: '#aaa',
              }}
            />
          </span>
        </div>
      </form>
      {showAddress ? (
        <div className='address_container'>
          {filteredData.slice(0, 5).map((home, i) => (
            <div
              className='address'
              key={i}
              onClick={() => handleSearchAddress(home)}>
              {home.ADDRESS}
            </div>
          ))}
        </div>
      ) : null}
    </>
  )
}

export default Input
