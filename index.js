const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

//Models
const User = require('./models/User')
const Faculty = require('./models/Faculty')
const Notice = require('./models/Notice')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

//Middlewares
app.use(cors())
app.use(express.json())

//Database Connection
mongoose.connect('mongodb://localhost:27017/studentWebsite')

//Register User
app.post('/register', async (req,res) => {
    console.log(req.body)
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10) //Hashing Passwords
        await User.create({
            name : req.body.name,
            email : req.body.email, //email validation is done in models
            password : newPassword
        })
        res.json({status : 'ok'})
    } catch (error) {
        console.log(error)
        res.json({status : 'error', error : 'Email Already Exists'})
    }
})

//Logging in User
app.post('/login', async (req,res) => {
    const user = await User.findOne({
        email : req.body.email,
    })

    if(!user){
        return res.json({status : 'error', error : 'Invalid login'})
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

    if(isPasswordValid){
        const token = jwt.sign({
            name : user.name,
            email : user.email
        }, 'secret123')
        return res.json({status : 'ok', user : token})
    }else{
        return res.json({status : 'error', user : false})
    }
})



//FACULTY LOGIN

//Login
app.post('/facultyLogin', async (req,res) => {
    const faculty = await Faculty.findOne({
        email : req.body.email,
    })

    if(!faculty){
        return res.json({status : 'error', error : 'Invalid login'})
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, faculty.password)

    if(isPasswordValid){
        const token = jwt.sign({
            name : faculty.name,
            email : faculty.email
        }, 'secret123')
        return res.json({status : 'ok', user : token})
    }else{
        return res.json({status : 'error', user : false})
    }
})

//Register
app.post('/registerFaculty', async (req,res) => {
    console.log(req.body)
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10) //Hashing Passwords
        await Faculty.create({
            name : req.body.name,
            gender : req.body.gender,
            email : req.body.email, //email validation is done in models
            username : req.body.username,
            password : newPassword
        })
        res.json({status : 'ok'})
    } catch (error) {
        console.log(error)
        res.json({status : 'error', error : 'Email Already Exists'})
    }
})


// NOTICES
app.post('/createNotice', async(req,res) => {
    console.log(req.body)
    try{
        Notice.create({
            fname : req.body.fname,
            title : req.body.title,
            description : req.body.description
        })
        res.json({status : 'ok'})
    } catch(error){
        res.json({status : 'error', error : 'Dont left blank space'})
    }
})

app.get('/getNotice', async(req,res) => {
    let notices = Notice.find({}, function(err, notices){
        if(err){
            console.log(err);
        }
        else {
            res.json(notices);
        }
    });
})

app.delete('/delNotice', async(req,res) => {
    //Will do it later

    // router.get('/delete/(:id)', function (req, res, next) {
    //     UseDataModelrModel.findByIdAndRemove(req.params.id, (err, doc) => {
    //       if (!err) {
    //         res.redirect('/users-list')
    //       } else {
    //         console.log(err)
    //       }
    //     })
    //   })
})

app.listen(1337, () => {
    console.log('Server Started on 1337')
})  



