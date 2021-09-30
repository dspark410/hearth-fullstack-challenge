import React from 'react'

function HomeInfo({ home }) {
  return (
    <div
      className='grid_item'
      onClick={() =>
        window.open(
          home[
            'URL (SEE http://www.redfin.com/buy-a-home/comparative-market-analysis FOR INFO ON PRICING)'
          ]
        )
      }>
      <div>{`Cost: $${home.PRICE.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`}</div>
      <div>{`${home.BEDS} Beds ${
        home.BATHS.indexOf('0') !== -1 ? Math.round(+home.BATHS) : home.BATHS
      } Baths`}</div>
      <div>{`${home.ADDRESS}, ${home.CITY.toUpperCase()}, ${
        home['STATE OR PROVINCE']
      } ${home['ZIP OR POSTAL CODE']}`}</div>
    </div>
  )
}

export default HomeInfo
