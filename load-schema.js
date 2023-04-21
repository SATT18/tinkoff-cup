import axios from 'axios'
import fs from 'fs'
import services from './services.js'

const load = async () => {
  const response = await Promise.all(
    services.map((service) =>
      axios({
        url: `https://host.com/${service.url}`,
        method: 'get',
      })
    )
  )

  if (fs.existsSync('schemas')) {
    fs.rmdirSync('schemas', { recursive: true })
  }

  fs.mkdirSync('schemas')
  response.forEach((service, index) => {
    fs.writeFileSync(`./schemas/${services[index].name}.yaml`, service.data)
    console.log('wrote to: ', `./schemas/${services[index].name}.yaml`)
  })
}

load()
  .then(() => console.log('Schemas loaded'))
  .catch((err) => console.error('Schemas loading error: ', err))
