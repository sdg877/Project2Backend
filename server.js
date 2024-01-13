import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const app = express()

app.use(cors())
app.use(bodyParser.json())

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
})

mongoose.connect(process.env.DATABASE_URL)

const ghostSchema = new mongoose.Schema({
    date: Number,
    description: String,
    town: String,
    county: String
    // County: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'County'
    // }
})

const ufoSchema = new mongoose.Schema({
    date: String,
    description: String,
    town: String,
    county: String
    // County: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'County'
    // }
})

const cryptidSchema = new mongoose.Schema({
    date: String,
    description: String,
    town: String,
    County: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'County'
    }
})

const countySchema = new mongoose.Schema({
    county: String
})



const Cryptid = mongoose.model('Cryptid', cryptidSchema)
const UFO = mongoose.model('UFO', ufoSchema)
const Ghost = mongoose.model('Ghost', ghostSchema)

app.post('/ghost/add', (req, res) => {
    const ghost = req.body
    const poltergeist = new Ghost({
        date: ghost.date,
        description: ghost.description,
        town: ghost.town,
        county: ghost.county
    })

    poltergeist.save()
    .then(() => {
        console.log('Ghost was saved')
        res.sendStatus(200)
    })
    .catch(err => console.error(err))
})

app.get('/ghost', async (req, res) => {
    const ghosts = await Ghost.find({})
    res.json(ghosts)
})

app.get('/ghost/:id', async (req, res) => {
    const ghost = await Ghost.findById(req.params.id)
    res.json(ghost)
})

// app.get('/bylocation', async (req, res) => {
//     const county = await County.find({})
//     res.json(county)
// })

// app.post('/ghost/add', async (req, res) => {
//     if(await County.countDocuments({"county": req.body.county}) === 0) {
//         const newCounty = new County({name: req.body.county})
//         newCounty.save()
//         .then(() => {
//             addGhost(req.body.county)
//         })
//     }
//     else {
//         addGhost(req.body.county)
//     }

//     async function addGhost(reqCounty) {
//         const county = await County.findOne({"county": reqCounty})
//         const ghost = new Ghost({
//             date: req.body.date,
//             description: req.body.description,
//             town: req.body.town,
//             county: county
//         })
//         ghost.save()
//         .then(() => {
//             console.log('new ghost added')
//             res.sendStatus(200)
//         })
//         .catch(err => console.error(err))
//     }
// })
