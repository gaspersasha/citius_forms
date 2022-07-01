import express from 'express'
import cors from 'cors'
import { urlencoded, json } from 'body-parser'


const app = express()

app.disable('x-powered-by')

// MIDDLEWARE
app.use(cors())
app.use(urlencoded({ extended: true }))
app.use(json())
app.use(handleError)

// TEST ROUTE
app.get('/', (req, res) => res.send('HEY!'))

// PART EXCHANGE ROUTE (prev poc idea)
app.get('/part-exchange', (req, res) => res.send({
  Title: 'Part Exchange Page',

  Meta: {
    Rights: 'Autovia Group Limited, licensed by Felden',
    Description: '',
  },
}))

// RESERVATION ROUTE
app.get('/goreserve', (req, res) => res.send({
  Title: 'Reserve your car online at BuyaCar.co.uk',
  PageType: 'form',

  Meta: {
    Description: 'some description',
    Canonical: '/',
    PageTitle: 'Reserve your car online at BuyaCar.co.uk | BuyaCar',
    Rights: 'Autovia Group Limited, licensed by Felden',

    Twitter: {
      Card: 'photo',
      Site: '@buy_a_car',
      Title: 'BuyaCar',
      Url: 'https://website/',
    },
  },
}))

// FINANCE APPLICATION ROUTE
app.get('/gofinance', (req, res) => res.send({
  Title: 'Apply for car finance online at BuyaCar.co.uk',
  PageType: 'form',

  Meta: {
    Description: 'some description',
    Canonical: '/',
    PageTitle: 'Reserve your car online at BuyaCar.co.uk | BuyaCar',
    Rights: 'Autovia Group Limited, licensed by Felden',

    Twitter: {
      Card: 'photo',
      Site: '@buy_a_car',
      Title: 'BuyaCar',
      Url: 'https://website/',
    },
  },
}))


const PORT = 3001
export const start = async () => {
  try {
    app.listen(PORT, () => console.log(`CMS API MOCK on http://localhost:${PORT}/`))
  } catch (e) {
    console.error(e)
  }
}

// helpers
function handleError(error, req, res, next) {
  console.log('CUSTOM ERROR: ', error, error.message)
  res.status(506).json({
    error: `${error.message || error.toString()}`,
  })
}
