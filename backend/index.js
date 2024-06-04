const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const { privateDecrypt } = require('crypto')
require('dotenv').config()
const Users = require('./schema2')
const Product = require('./schema')
const Subscriber = require('./schema3')
const nodemailer = require('nodemailer')

const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 4000

mongoose.connect(process.env.connection)

// API creation
app.get('/', (req, res) => {
  res.send('Express App is Running')
})

//handle subsriber
app.post('/subscribe', async (req, res) => {
  const email = req.body.email
  const subscriber = new Subscriber({
    email: email,
  })
  await subscriber.save()
  res.send({ success: true })
})

app.get('/subscribeAlert', async (req, res) => {
  const subscribers = await Subscriber.find({})
  if (!subscribers) {
    return res.send('No subscribers found') // Handle no subscribers case
  }
  subscribers.forEach((sub) => {
    const email = sub.email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // required for TLS connection
      auth: {
        user: 'praveenmariappan23@gmail.com', // Replace with your Gmail address
        pass: 'mzhudbstruvomslc', // Replace with your App Password (not your regular Gmail password)
      },
    })
    const emailOptions = {
      from: 'praveenmariappan23@gmail.com',
      to: email,
      subject: 'New Arrivals Update',
      text: 'Visit your shopnow account for exciting offers and new arrivals',
    }
    transporter.sendMail(emailOptions, (error, info) => {
      if (error) {
        console.log(error)
      } else {
        res.send({ success: true })
      }
    })
  })
})

//addProduct
app.post('/addproduct', async (req, res) => {
  try {
    const { name, new_price, image, old_price, category } = req.body
    let products = await Product.find({})
    let id
    if (products.length > 0) {
      let last_product_array = products.slice(-1)
      let last_product = last_product_array[0]
      id = last_product.id + 1
    } else {
      id = 1
    }
    const product = new Product({
      id: id,
      name: name,
      image: image,
      category: category,
      new_price: new_price,
      old_price: old_price,
    })
    await product.save()
    console.log('saved')
    res.json({
      success: true,
      name: name,
    })
  } catch {
    res.send({ success: false })
  }
})

//remove product api
app.post('/removeproduct', async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id })
  console.log('removed')
  res.json({
    success: true,
    name: req.body.name,
  })
})

//crreating api for getting all products
app.post('/allproducts', async (req, res) => {
  let sorter = req.body.filter
  let products = await Product.find({}).sort({ new_price: sorter })
  res.send(products)
})

app.get('/image/:filename', async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename })
    const readStream = gfs.createReadStream(file.filename)
    readStream.pipe(res)
  } catch {
    res.send('not found')
  }
})

//creating endpoint for registering user
app.post('/signup', async (req, res) => {
  let check = await Users.findOne({ email: req.body.email })
  if (check) {
    return res.status(400).json({
      success: false,
      error: 'existing user found with same email address',
    })
  }
  let cart = {}
  for (let i = 0; i < 300; i++) {
    cart[i] = 0
  }
  const user = new Users({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  })
  await user.save()
  const data = {
    user: {
      id: user.id,
    },
  }
  const token = jwt.sign(data, 'secret_ecom')
  res.json({ success: true, token })
})

//endpoint for user login
app.post('/login', async (req, res) => {
  let user = await Users.findOne({ email: req.body.email })
  if (user) {
    const passCompare = req.body.password === user.password
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      }
      const token = jwt.sign(data, 'secret_ecom')
      res.json({ success: true, token })
    } else {
      res.json({ success: false, error: 'Wrong Password' })
    }
  } else {
    res.json({ success: false, error: 'Wrong Email Id' })
  }
})

//new collection
app.get('/newcollection', async (req, res) => {
  let products = await Product.find({})
  let newcollection = products.slice(1).slice(-8)
  res.send(newcollection)
})

//popular in women
app.get('/popularinwomen', async (req, res) => {
  let products = await Product.find({ category: 'women' })
  let popular_in_women = products.slice(0, 4)
  res.send(popular_in_women)
})

//middleware to fetch user
const fetchUser = async (req, res, next) => {
  const token = req.header('auth-token')
  if (!token) {
    res.status(401).send({ errors: 'Please authenticate using a valid token' })
  } else {
    try {
      const data = jwt.verify(token, 'secret_ecom')
      req.user = data.user
      next()
    } catch (error) {
      res
        .status(401)
        .send({ errors: 'Please authenticate using a valid token' })
    }
  }
}
//endpoint for addtocart
app.post('/addtocart', fetchUser, async (req, res) => {
  console.log('added', req.body.itemId)
  let userData = await Users.findOne({ _id: req.user.id })
  userData.cartData[req.body.itemId] += 1
  await Users.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData },
  )
  res.send('Added')
})

//creating endpoint to remove product from cartData
app.post('/removefromcart', fetchUser, async (req, res) => {
  console.log('removed', req.body.itemId)
  let userData = await Users.findOne({ _id: req.user.id })
  if (userData.cartData[req.body.itemId] > 0) {
    userData.cartData[req.body.itemId] -= 1
    await Users.findOneAndUpdate(
      { _id: req.user.id },
      { cartData: userData.cartData },
    )
  }
  res.send('Removed')
})

//creating endpoint to get cartdata
app.post('/getcart', fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id })
  res.json(userData.cartData)
})

app.post('/getuserdata', fetchUser, async (req, res) => {
  console.log('GetUserData')
  let userData = await Users.findOne({ _id: req.user.id })
  res.json(userData)
})

//endpoint
app.listen(port, (error) => {
  if (!error) {
    console.log('Server Running in Port ' + port)
    console.log(process.env.connection)
  } else {
    console.log('Error : ' + error)
  }
})
