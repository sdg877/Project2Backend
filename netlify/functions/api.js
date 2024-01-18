import 'dotenv/config'
import express, { Router } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import serverless from 'serverless-http'

// import moment from 'moment'



const api = express()

// const formattedDate = moment().format('DDMMYYYY')

api.use(cors())
api.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_URL)

const router = Router()

const ghostSchema = new mongoose.Schema({
    date: Number,
    description: String,
    town: String,
    county: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'County'
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const ufoSchema = new mongoose.Schema({
    date: String,
    description: String,
    town: String,
    county: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'County'
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const cryptidSchema = new mongoose.Schema({
    date: String,
    description: String,
    town: String,
    county: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'County'
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const countySchema = new mongoose.Schema({
    county: { type: String, unique: true }
})

const userSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        required: true
    },
    uniqueSub: {
        required: true,
        type: String
    }
})

const Cryptid = mongoose.model('Cryptid', cryptidSchema)
const UFO = mongoose.model('UFO', ufoSchema)
const Ghost = mongoose.model('Ghost', ghostSchema)
const County = mongoose.model('County', countySchema)
const User = mongoose.model('User', userSchema)


//GHOSTS
router.post('/ghost/add', async (req, res) => {
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
        const findUser = await User.findOne({"userEmail": req.body.userEmail})
        const ghost = new Ghost({
            date: req.body.date,
            description: req.body.description,
            town: req.body.town,
            county: county,
            addedBy: findUser._id
        })
        ghost.save()
        .then(() => {
            console.log('new ghost added')
            res.sendStatus(200)
        })
        .catch(err => console.error(err))
    }
})

router.get('/ghost', async (req, res) => {
    const ghosts = await Ghost.find({}).populate("addedBy")
    res.json(ghosts)
})

router.get('/ghost/:id', async (req, res) => {
        const ghost = await Ghost.findById(req.params.id).populate('county')
        res.json(ghost)
    })

router.delete('/ghost/:id', async (req, res) => {
    const ghostToDelete = await Ghost.findByIdAndDelete(req.params.id)
    return res.status(204).json(ghostToDelete)
})

router.put('/ghost/update/:id', async (req, res) => {
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

//UFOs
router.post('/ufo/add', async (req, res) => {
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
        const findUser = await User.findOne({"userEmail": req.body.userEmail})
        const ufo = new UFO({
            date: req.body.date,
            description: req.body.description,
            town: req.body.town,
            county: county,
            addedBy: findUser._id
        })
        ufo.save()
        .then(() => {
            console.log('new ufo added')
            res.sendStatus(200)
        })
        .catch(err => console.error(err))
    }
})

router.get('/ufo', async (req, res) => {
    const ufos = await UFO.find({}).populate('addedBy')
    res.json(ufos)
})

router.get('/ufo/:id', async (req, res) => {
    const ufo = await UFO.findById(req.params.id).populate('county')
    res.json(ufo)
})

router.delete('/ufo/:id', async (req, res) => {
    const ufoToDelete = await UFO.findByIdAndDelete(req.params.id)
    return res.status(204).json(ufoToDelete)
})

router.put('/ufo/update/:id', async (req, res) => {
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


//Cryptids
router.post('/cryptid/add', async (req, res) => {
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
        const findUser = await User.findOne({"userEmail": req.body.userEmail})
        const cryptid = new Cryptid({
            date: req.body.date,
            description: req.body.description,
            town: req.body.town,
            county: county,
            addedBy: findUser._id
        })
        cryptid.save()
        .then(() => {
            console.log('new cryptid added')
            res.sendStatus(200)
        })
        .catch(err => console.error(err))
    }
})

router.get('/cryptid', async (req, res) => {
    const cryptids = await Cryptid.find({}).populate('addedBy')
    res.json(cryptids)
})

router.get('/cryptid/:id', async (req, res) => {
    const cryptid = await Cryptid.findById(req.params.id).populate('county')
    res.json(cryptid)
})

router.delete('/cryptid/:id', async (req, res) => {
    const cryptidToDelete = await Cryptid.findByIdAndDelete(req.params.id)
    return res.status(204).json(cryptidToDelete)
})

router.put('/cryptid/update/:id', async (req, res) => {
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
router.get('/search/:county', async (req, res) => {
    const county = req.params.county
    const cryptids = await Cryptid.find({ county })
    const ufos = await UFO.find({ county })
    const ghosts = await Ghost.find({ county })

    const findCounty = await County.findById(county)

    const sightings = {
        cryptids,
        ufos,
        ghosts,
        findCounty
    }
    res.json(sightings)
})

router.get('/counties', async (req, res) => {
    const counties = await County.find({})
    res.json(counties)
})


router.post('/county/add', async (req, res) => {
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

// users

router.post('/user/login', async (req, res) => {
    const now = new Date()

    if( await User.countDocuments({"userEmail": req.body.userEmail}) === 0) {
        const newUser = new User ({
            userEmail: req.body.userEmail,
            lastLogin: now,
            uniqueSub: req.body.uniqueSub
        })
        newUser.save()
        .then(() => {
            res.sendStatus(200)
        })
        .catch(err => {
            res.sendStatus(500)
        })
    } else {
        await User.findOneAndUpdate({"userEmail": req.body.userEmail}, {lastLogin: now}, {"uniqueSub": req.body.uniqueSub})
        res.sendStatus
    }
})

api.use("/api/", router )

export const handler = serverless(api)
