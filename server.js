const exp = require('express');
const app = exp();
const PORT = process.env.PORT || 3000;

const mongoose = require('mongoose');
const mongoUri =  process.env.MONGODB_URI || 'mongodb://localhost:27017/ffiction';


app.get('/', (req, res) => {
  res.send('running');
})

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
})

mongoose.connect(mongoUri);
const db = mongoose.connection;
db.on('open', () => {
  console.log('Connected to mongoose!');
})
