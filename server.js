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
    County: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'County'
    }
})

const ufoSchema = new mongoose.Schema({
    date: String,
    description: String,
    town: String,
    County: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'County'
    }
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
    county: { type: String, unique: true }
})

// const countySchema = new mongoose.Schema({
//     county: String
// })



const Cryptid = mongoose.model('Cryptid', cryptidSchema)
const UFO = mongoose.model('UFO', ufoSchema)
const Ghost = mongoose.model('Ghost', ghostSchema)
const County = mongoose.model('County', countySchema)

//GHOSTS
app.post('/ghost/add', async (req, res) => {
    if(await County.countDocuments({"county": req.body.county}) === 0) {
        const newCounty = new County({county: req.body.county})
        newCounty.save()
        .then(() => {
            addGhost(req.body.county)
        })
    }
    else {
        addGhost(req.body.county)
    }

    async function addGhost(reqCounty) {
        const county = await County.findOne({"county": reqCounty})
        const ghost = new Ghost({
            date: req.body.date,
            description: req.body.description,
            town: req.body.town,
            county: county
        })
        ghost.save()
        .then(() => {
            console.log('new ghost added')
            res.sendStatus(200)
        })
        .catch(err => console.error(err))
    }
})

// app.post('/ghost/add', (req, res) => {
//     const ghost = req.body
//     const poltergeist = new Ghost({
//         date: ghost.date,
//         description: ghost.description,
//         town: ghost.town,
//         county: ghost.county
//     })

//     poltergeist.save()
//     .then(() => {
//         console.log('Ghost was saved')
//         res.sendStatus(200)
//     })
//     .catch(err => console.error(err))
// })

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

app.get('/book/:id', async (req, res) => {
    const book = await Book.findById(req.params.id).populate('author')
    res.json(book)
})

app.put('/ghost/update/:id', async (req, res) => {
    if( await County.countDocuments({"county": req.body.county}) === 0) {
        const newCounty = new County({"county": req.body.county})
        newCounty.save()
        .then(() => {
            updateGhost()
        })
    } else {
        updateGhost()
    }

    async function updateGhost() {
        const county = await County.findOne({"county": req.body.county})
        Ghost.updateOne({"_id": req.params.id}, {date: req.body.date, description: req.body.description, town: req.body.town, county: county})
        .then(() => {
            res.sendStatus(200)
        })
        .catch( error => {
            res.sendStatus(500)
        })
    }
})


// app.put('/ghost/update/:id', (req, res) => {
//     Ghost.updateOne({"_id": req.params.id}, {description: req.body.description, date: req.body.date, town: req.body.town, county: req.body.county})
//     .then(() => {
//         res.sendStatus(200)
//     })
//     .catch(err => {
//         res.sendStatus(500)
//     })
// })

//UFOs
app.post('/ufo/add', async (req, res) => {
    if(await County.countDocuments({"county": req.body.county}) === 0) {
        const newCounty = new County({county: req.body.county})
        newCounty.save()
        .then(() => {
            addUFO(req.body.county)
        })
    }
    else {
        addUFO(req.body.county)
    }

    async function addUFO(reqCounty) {
        const county = await County.findOne({"county": req.body.county})
        const ufo = new UFO({
            date: req.body.date,
            description: req.body.description,
            town: req.body.town,
            county: county
        })
        ufo.save()
        .then(() => {
            console.log('new ufo added')
            res.sendStatus(200)
        })
        .catch(err => console.error(err))
    }
})

// app.post('/ufo/add', (req, res) => {
//     const ufo = req.body
//     const alien = new UFO({
//         date: ufo.date,
//         description: ufo.description,
//         town: ufo.town,
//         county: ufo.county
//     })

//     alien.save()
//     .then(() => {
//         console.log('UFO was saved')
//         res.sendStatus(200)
//     })
//     .catch(err => console.error(err))
// })

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

app.put('/ufo/update/:id', async (req, res) => {
    if( await County.countDocuments({"county": req.body.county}) === 0) {
        const newCounty = new County({"county": req.body.county})
        newCounty.save()
        .then(() => {
            updateUFO()
        })
    } else {
        updateUFO()
    }

    async function updateUFO() {
        const county = await County.findOne({"county": req.body.county})
        UFO.updateOne({"_id": req.params.id}, {date: req.body.date, description: req.body.description, town: req.body.town, county: county})
        .then(() => {
            res.sendStatus(200)
        })
        .catch( error => {
            res.sendStatus(500)
        })
    }
})

// app.put('/ufo/update/:id', (req, res) => {
//     UFO.updateOne({"_id": req.params.id}, {description: req.body.description, date: req.body.date, town: req.body.town, county: req.body.county})
//     .then(() => {
//         res.sendStatus(200)
//     })
//     .catch(err => {
//         res.sendStatus(500)
//     })
// })


//Cryptids
app.post('/cryptid/add', async (req, res) => {
    if(await County.countDocuments({"county": req.body.county}) === 0) {
        const newCounty = new County({county: req.body.county})
        newCounty.save()
        .then(() => {
            addCryptid(req.body.county)
        })
    }
    else {
        addCryptid(req.body.county)
    }

    async function addCryptid(reqCounty) {
        const county = await County.findOne({"county": req.body.county})
        const cryptid = new Cryptid({
            date: req.body.date,
            description: req.body.description,
            town: req.body.town,
            county: county
        })
        cryptid.save()
        .then(() => {
            console.log('new cryptid added')
            res.sendStatus(200)
        })
        .catch(err => console.error(err))
    }
})

// app.post('/cryptid/add', (req, res) => {
//     const cryptid = req.body
//     const bigfoot = new Cryptid({
//         date: cryptid.date,
//         description: cryptid.description,
//         town: cryptid.town,
//         county: cryptid.county
//     })

//     bigfoot.save()
//     .then(() => {
//         console.log('Cryptid was saved')
//         res.sendStatus(200)
//     })
//     .catch(err => console.error(err))
// })

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

app.put('/cryptid/update/:id', async (req, res) => {
    if( await County.countDocuments({"county": req.body.county}) === 0) {
        const newCounty = new County({"county": req.body.county})
        newCounty.save()
        .then(() => {
            updateCryptid()
        })
    } else {
        updateCryptid()
    }

    async function updateCryptid() {
        const county = await County.findOne({"county": req.body.county})
        Cryptid.updateOne({"_id": req.params.id}, {date: req.body.date, description: req.body.description, town: req.body.town, county: county})
        .then(() => {
            res.sendStatus(200)
        })
        .catch( error => {
            res.sendStatus(500)
        })
    }
})


//county
    app.get('/search/:county', async (req, res) => {
        const county = req.params.county
        const cryptids = await Cryptid.find({ county })
        const ufos = await UFO.find({ county })
        const ghosts = await Ghost.find({ county})

        const sightings = {
            cryptids,
            ufos,
            ghosts
    }
    res.json(sightings)
})

app.post('/county/add', async (req, res) => {
    const newCounty = req.body

    const existingCounty = await County.findOne({ county: newCounty.county })

    if (existingCounty) {
        res.status(409).send('County already exists in the database')
    } else {
        const countyNew = new County({ county: newCounty.county })

        countyNew.save()
            .then(() => {
                console.log(`New county ${newCounty.county} was added to the database`)
                res.sendStatus(200)
            })
            .catch(error => {
                console.error(error)
                res.sendStatus(500)
            });
    }
});

// app.get('/bylocation', async (req, res) => {
//     const county = await County.find({})
//     res.json(county)
// })


// app.post('/county/add', (req, res) => {
//     const newCounty = req.body

//     const countyNew = new County ({county: newCounty.county})
//     countyNew.save()
//         .then(() => {
//             console.log(`new county ${newCounty.county} was added to the database`)
//             res.sendStatus(200)
//         })
//         .catch(error => console.error(error))
//     })