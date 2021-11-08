const express = require(`express`)
const path = require('path')

const app = express()

app.use(express.json())
app.use(express.static(path.resolve(__dirname, '../client/build')));

const port = process.env.PORT || 4000
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

app.listen(port, () => console.log(`Listening on port ${port}`))