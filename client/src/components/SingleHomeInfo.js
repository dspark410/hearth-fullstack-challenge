import React from 'react'

function SingleHomeInfo({ searchedHome }) {
  return (
    <div
      className='grid_item'
      onClick={() =>
        window.open(
          searchedHome[
            'URL (SEE http://www.redfin.com/buy-a-home/comparative-market-analysis FOR INFO ON PRICING)'
          ]
        )
      }>
      <div>{` Cost: $${searchedHome.PRICE.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ','
      )}`}</div>
      <div>{`${searchedHome.BEDS} Beds ${
        searchedHome.BATHS.indexOf('0') !== -1
          ? Math.round(+searchedHome.BATHS)
          : searchedHome.BATHS
      } Baths`}</div>
      <div>{`${searchedHome.ADDRESS}, ${searchedHome.CITY.toUpperCase()}, ${
        searchedHome['STATE OR PROVINCE']
      } ${searchedHome['ZIP OR POSTAL CODE']}`}</div>
    </div>
  )
}

export default SingleHomeInfo
