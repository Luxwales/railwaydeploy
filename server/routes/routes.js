import {getTypeplans, getTypeplan, createTypeplan, getTypeplansArchitects} from '../controllers/typeplancontroller.js'

/////// FROM EXPRESS DOCS

import express from 'express'

const router = express.Router()

// middleware that is specific to this router
//router.use((req, res, next) => {
//  console.log('Time: ', Date.now())
//  next()
//})
// define the home page route

// Fetch all type plans
router.get('/typeplans', async (req, res) => {
    const typeplans = await getTypeplans()
    res.json(typeplans)
})

// Find type plans by id
router.get('/typeplans/:id', async (req, res) => {
    const id = req.params.id
    const typeplan = await getTypeplan(id)
    res.status(200).json(typeplan)
})

// Create typeplan
router.post('/typeplans', async (req, res) => {
  const { planNumber, description, planType } = req.body
  const newTypeplan = await createTypeplan( planNumber, description, planType)
  res.status(201).json(newTypeplan)
})

// Testing getTypeplansArchitects
router.get('/testing', async (req, res) => {
  const typeplans = await getTypeplansArchitects()
  res.json(typeplans)
})



router.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })


export { router }