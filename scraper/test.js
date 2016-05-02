const fs = require('fs')

fs.readFile('filteredData.json', (err, data) => {
  if (err) {console.error(err)}

  data = JSON.parse(data).map(entry => entry.trim())
  console.log(data)
})
