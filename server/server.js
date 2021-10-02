const express = require('express')
const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')
const cors = require('cors')

const app = express()
const port = 5000
const results = []

app.use(cors())

app.get('/api/redfin/sanfrancisco', (req, res) => {
  fs.createReadStream('redfin_sanfrancisco.csv')
    .pipe(csv())
    .on('data', (data) => {
      if (results.length !== 350) results.push(data)
    })
    .on('end', () => {
      //console.log(results)
      res.status(200).json(results)
    })
})

// deploy to heroku
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })
}

app.listen(port, () => {
  console.log(`Listening at https://localhost:${port}`)
})
