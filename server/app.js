// USING EXPRESS 5.0 Beta - npm install "express@>=5.0.0-beta.1" --save
import express from 'express'
import { port } from './config/config.js'
import { router } from './routes/routes.js'

const app = express()

app.use(express.json())

app.use(express.urlencoded())

app.use('/api', router)

// Handle production
if(process.env.NODE_ENV === 'production') {
  // Static Folder
  app.use(express.static(__dirname + '/dist/'))

  // Handle SPA - Important below ./routes in this order
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/dist/index.html'))
}

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })