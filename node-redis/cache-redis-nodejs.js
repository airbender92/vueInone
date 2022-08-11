const express = require('express');
const responseTime = require('response-time');
const redis = require('redis')
const axios = require('axios')

const runApp = async () => {
  // connect to redis
  const client = redis.createClient();
  client.on('error', (err) => console.log('redis client errpr', err))
  await client.connect();
  console.log('redis connected')

  const app = express();
  // add response-time to requests
  app.use(responseTime())

  app.get('/character', async (req, res) => {
    try {
      const cacheCharacters = await client.get('characters')
      if (cacheCharacters) {
        return res.json(JSON.parse(cacheCharacters))
      }

      // makes the request to the api
      const response = await axios.get('https://rickandmortyapi.com/api/character')

      // save the response in the cache
      await client.set('characters', JSON.stringify(response.data))
      return res.status(200).json(response.data)
    } catch (err) {
      return res.status(err.response.status).json({ message: err.message })
    }

  })

  app.get('/characters/:id', async (req, res) => {
    try {
      const cacheCharacter = await client.get('cacheCharacter' + req.params.id)
      if (cacheCharacter) {
        return res.json(JSON.parse(cacheCharacter))
      }

      const response = await axios.get('https://rickandmortyapi.com/api/character/' + req.params.id)

      await client.set('cacheCharacter' + req.params.id, JSON.stringify(response.data))
      return res.json(response.data)
    } catch (err) {
      return res.status(err.response.status).json({ message: err.message })
    }
  })

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server on port 3000`)
  })
}

runApp();