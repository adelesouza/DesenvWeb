//conectando ao MongoDB
const { MongoClient, ObjectId } = require('mongodb')
async function connect() {
  if (global.db) return global.db

  const conn = await MongoClient.connect(
    'mongodb+srv://adelesouza:Everaldo8@cluster0.vo4ob5s.mongodb.net/?retryWrites=true&w=majority'
  )
  if (!conn) return new Error('ERRO de conexão!')
  global.db = await conn.db('unifor')
  return global.db
}

const express = require('express')
const app = express()
const port = 3000 //porta padrão do express
const fs = require('fs')

app.use(require('cors')()) //npm install cors no terminal
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//api teste
const router = express.Router()
router.get('/', (req, res) => res.json({ message: 'Funcionou!' }))

//GET
app.get('/produto/:id?', async function (req, res, next) {
  //o "?" depois do :id diz que é um parâmetro opcional
  try {
    const db = await connect()
    if (req.params.id) {
      res.json(
        await db
          .collection('produto')
          .findOne({ _id: new ObjectId(req.params.id) })
      )
    } else {
      res.json(await db.collection('produto').find().toArray())
    }
  } catch (ex) {
    console.log(ex)
    res.status(400).json({ erro: `${ex}` })
  }
})

app.get('/undproduto/:id?', async function (req, res, next) {
  //o "?" depois do :id diz que é um parâmetro opcional
  try {
    const db = await connect()
    if (req.params.id) {
      res.json(
        await db
          .collection('undproduto')
          .findOne({ _id: new ObjectId(req.params.id) })
      )
    } else {
      res.json(await db.collection('undproduto').find().toArray())
    }
  } catch (ex) {
    console.log(ex)
    res.status(400).json({ erro: `${ex}` })
  }
})

app.get('/usuario/:id?', async function (req, res, next) {
  //o "?" depois do :id diz que é um parâmetro opcional
  try {
    const db = await connect()
    if (req.params.id) {
      res.json(
        await db
          .collection('usuario')
          .findOne({ _id: new ObjectId(req.params.id) })
      )
    } else {
      res.json(await db.collection('usuario').find().toArray())
    }
  } catch (ex) {
    console.log(ex)
    res.status(400).json({ erro: `${ex}` })
  }
})

//POST
app.post('/produto', async function (req, res, next) {
  try {
    const produto = req.body
    const db = await connect()
    res.json(await db.collection('produto').insertOne(produto))
  } catch (ex) {
    console.log(ex)
    res.status(400).json({ erro: `${ex}` })
  }
})

app.post('/undproduto', async function (req, res, next) {
  try {
    const undproduto = req.body
    const db = await connect()
    res.json(await db.collection('undproduto').insertOne(undproduto))
  } catch (ex) {
    console.log(ex)
    res.status(400).json({ erro: `${ex}` })
  }
})

app.post('/usuario', async function (req, res, next) {
  try {
    const usuario = req.body
    const db = await connect()
    console.log(usuario)
    res.json(await db.collection('usuario').insertOne(usuario))
  } catch (ex) {
    console.log(ex)
    res.status(400).json({ erro: `${ex}` })
  }
})

//PUT
app.put('/produto/:id', async function (req, res, next) {
  try {
    const produto = req.body
    const db = await connect()
    res.json(
      await db
        .collection('produto')
        .updateOne({ _id: new ObjectId(req.params.id) }, { $set: produto })
    )
  } catch (ex) {
    console.log(ex)
    res.status(400).json({ erro: `${ex}` })
  }
})

app.put('/undproduto/:id', async function (req, res, next) {
  try {
    const undproduto = req.body
    const db = await connect()
    res.json(
      await db
        .collection('undproduto')
        .updateOne({ _id: new ObjectId(req.params.id) }, { $set: undproduto })
    )
  } catch (ex) {
    console.log(ex)
    res.status(400).json({ erro: `${ex}` })
  }
})

app.put('/usuario/:id', async function (req, res, next) {
  try {
    const usuario = req.body

    const db = await connect()
    res.json(
      await db
        .collection('usuario')
        .updateOne({ _id: new ObjectId(req.params.id) }, { $set: usuario })
    )
  } catch (ex) {
    console.log(ex)
    res.status(400).json({ erro: `${ex}` })
  }
})

//DELETE
app.delete('/produto/:id', async function (req, res, next) {
  try {
    const db = await connect()
    res.json(
      await db
        .collection('produto')
        .deleteOne({ _id: new ObjectId(req.params.id) })
    )
  } catch (ex) {
    console.log(ex)
    res.status(400).json({ erro: `${ex}` })
  }
})

app.delete('/undproduto/:id', async function (req, res, next) {
  try {
    const db = await connect()
    res.json(
      await db
        .collection('undproduto')
        .deleteOne({ _id: new ObjectId(req.params.id) })
    )
  } catch (ex) {
    console.log(ex)
    res.status(400).json({ erro: `${ex}` })
  }
})

app.delete('/usuario/:id', async function (req, res, next) {
  try {
    const db = await connect()
    res.json(
      await db
        .collection('usuario')
        .deleteOne({ _id: new ObjectId(req.params.id) })
    )
  } catch (ex) {
    console.log(ex)
    res.status(400).json({ erro: `${ex}` })
  }
})

app.listen(port)

console.log('API Funcionando!')
