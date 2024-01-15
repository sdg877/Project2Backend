import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import { format } from 'date-fns'

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
    county: String
    // County: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'County'
    // }
})

const countySchema = new mongoose.Schema({
    county: String
})



const Cryptid = mongoose.model('Cryptid', cryptidSchema)
const UFO = mongoose.model('UFO', ufoSchema)
const Ghost = mongoose.model('Ghost', ghostSchema)

//GHOSTS
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

app.delete('/ghost/:id', async (req, res) => {
    const ghostToDelete = await Ghost.findByIdAndDelete(req.params.id)
    return res.status(204).json(ghostToDelete)
})

app.put('/ghost/update/:id', (req, res) => {
    Ghost.updateOne({"_id": req.params.id}, {description: req.body.description, date: req.body.date, town: req.body.town, county: req.body.county})
    .then(() => {
        res.sendStatus(200)
    })
    .catch(err => {
        res.sendStatus(500)
    })
})

//UFOs
app.post('/ufo/add', (req, res) => {
    const ufo = req.body
    const alien = new UFO({
        date: ufo.date,
        description: ufo.description,
        town: ufo.town,
        county: ufo.county
    })

    alien.save()
    .then(() => {
        console.log('UFO was saved')
        res.sendStatus(200)
    })
    .catch(err => console.error(err))
})

app.get('/ufo', async (req, res) => {
    const ufos = await UFO.find({})
    res.json(ufos)
})

app.get('/ufo/:id', async (req, res) => {
    const ufo = await UFO.findById(req.params.id)
    res.json(ufo)
})

app.delete('/ufo/:id', async (req, res) => {
    const ufoToDelete = await UFO.findByIdAndDelete(req.params.id)
    return res.status(204).json(ufoToDelete)
})

app.put('/ufo/update/:id', (req, res) => {
    UFO.updateOne({"_id": req.params.id}, {description: req.body.description, date: req.body.date, town: req.body.town, county: req.body.county})
    .then(() => {
        res.sendStatus(200)
    })
    .catch(err => {
        res.sendStatus(500)
    })
})


//Cryptids
app.post('/cryptid/add', (req, res) => {
    const cryptid = req.body
    const bigfoot = new Cryptid({
        date: cryptid.date,
        description: cryptid.description,
        town: cryptid.town,
        county: cryptid.county
    })

    bigfoot.save()
    .then(() => {
        console.log('Cryptid was saved')
        res.sendStatus(200)
    })
    .catch(err => console.error(err))
})

app.get('/cryptid', async (req, res) => {
    const cryptids = await Cryptid.find({})
    res.json(cryptids)
})

app.get('/cryptid/:id', async (req, res) => {
    const cryptid = await Cryptid.findById(req.params.id)
    res.json(cryptid)
})

app.delete('/cryptid/:id', async (req, res) => {
    const cryptidToDelete = await Cryptid.findByIdAndDelete(req.params.id)
    return res.status(204).json(cryptidToDelete)
})

app.put('/cryptid/update/:id', (req, res) => {
    Cryptid.updateOne({"_id": req.params.id}, {description: req.body.description, date: req.body.date, town: req.body.town, county: req.body.county})
    .then(() => {
        res.sendStatus(200)
    })
    .catch(err => {
        res.sendStatus(500)
    })
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