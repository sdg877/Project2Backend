import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
// import moment from 'moment'

const app = express()

// const formattedDate = moment().format('DDMMYYYY')

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
    county: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'County'
    }
})

const ufoSchema = new mongoose.Schema({
    date: String,
    description: String,
    town: String,
    county: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'County'
    }
})

const cryptidSchema = new mongoose.Schema({
    date: String,
    description: String,
    town: String,
    county: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'County'
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
    }
})

const Cryptid = mongoose.model('Cryptid', cryptidSchema)
const UFO = mongoose.model('UFO', ufoSchema)
const Ghost = mongoose.model('Ghost', ghostSchema)
const County = mongoose.model('County', countySchema)
const User = mongoose.model('User', userSchema)


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

app.get('/ghost', async (req, res) => {
    const ghosts = await Ghost.find({})
    res.json(ghosts)
})

app.get('/ghost/:id', async (req, res) => {
        const ghost = await Ghost.findById(req.params.id).populate('county')
        res.json(ghost)
    })

app.delete('/ghost/:id', async (req, res) => {
    const ghostToDelete = await Ghost.findByIdAndDelete(req.params.id)
    return res.status(204).json(ghostToDelete)
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

app.get('/ufo', async (req, res) => {
    const ufos = await UFO.find({})
    res.json(ufos)
})

app.get('/ufo/:id', async (req, res) => {
    const ufo = await UFO.findById(req.params.id).populate('county')
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

app.get('/cryptid', async (req, res) => {
    const cryptids = await Cryptid.find({})
    res.json(cryptids)
})

app.get('/cryptid/:id', async (req, res) => {
    const cryptid = await Cryptid.findById(req.params.id).populate('county')
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

app.get('/counties', async (req, res) => {
    const counties = await County.find({})
    res.json(counties)
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

// users

app.post('/user/login', async (req, res) => {
    const now = new Date()

    if( await User.countDocuments({"userEmail": req.body.userEmail}) === 0) {
        const newUser = new User ({
            userEmail: req.body.userEmail,
            lastLogin: now
        })
        newUser.save()
        .then(() => {
            res.sentStatus(200)
        })
        .catch(err => {
            res.sendStatus(500)
        })
    } else {
        await User.findOneAndUpdate({"userEmail": req.body.userEmail}, {lastLogin: now})
        res.sendStatus
    }
})

// const User = require('./models/user')

// const userIdToMakeAdmin = '65a78c4ae77de11d27973777'


// User.updateOne({ _id: userIdToMakeAdmin }, { $set: { isAdmin: true } }, (err, result) => {
//   if (err) {
//     console.error('Error setting admin status:', err)
//   } else {
//     console.log('Admin status set successfully.')
//   }
// });

// const checkAdminPermission = async (req, res, next) => {
//     const { userId } = req.user
  
//     try {
//       const user = await User.findById(userId)
  
//       if (user && user.isAdmin) {
//         req.isAdmin = true;
//       } else {
//         req.isAdmin = false;
//       }
  
//       return next();
//     } catch (error) {
//       console.error('Error checking admin permission:', error)
//       res.status(500).json({ message: 'Internal Server Error' })
//     }
//   }