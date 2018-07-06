const exp = require('express');
const app = exp();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('running');
})

app.listen(PORT, () => {
  console.log('listening on port ' + PORT);
})
