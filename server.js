const exp = require('express');
const app = exp();
const port = 3000;

app.get('/', (req, res) => {
  res.send('running');
})

app.listen(port, () => {
  console.log('listening on port ' + port);
})
