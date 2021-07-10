import express from 'express';
import v1API from './api/v1'
const app = express();
const port = process.env.PORT || 3000;

//Use API V1 on route /api/v1
app.use("/api/v1", v1API)

//Fallback to API V1 if no version specified
app.use("/api", v1API)


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})