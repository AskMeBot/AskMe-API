import express from 'express';
import v1API from './api/v1'
import cors from 'cors'

const app = express();
const port = process.env.PORT || 3000;
const requiredAuthHeader = process.env.requiredAuthHeader || false

app.use(cors())
app.use(express.json({
  limit:"2mb"
}))

app.use((req, res, next) => {
  if(!req.headers.authorization || !requiredAuthHeader || req.headers.authorization != requiredAuthHeader)
    return res.status(401).json({message:"Unauthorized"})
  next()
})

//Use API V1 on route /api/v1
app.use("/api/v1", v1API)

//Fallback to API V1 if no version specified
app.use("/api", v1API)

app.use((req, res) => {
  res.status(404).json({message:"Invalid endpoint"})
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})