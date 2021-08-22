import * as fs from 'fs'
import * as http from 'http'

const port = 8080

if (!fs.existsSync('chain.json'))
{
  fs.writeFileSync(
    'chain.json',
    JSON.stringify(
    {
      error: false,
      desc: "req_ok:chain",

      chain:
      [
        {
          _admin: 0,
          user: 0
        }
      ]
    }, null, '\t')
  )

  console.log('chain.json file generated')
}

console.log('Listening to port ' + port)

http.createServer((req, res) =>
{
  switch (req.method)
  {
    case 'OPTIONS':
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'POST')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
      res.end()
      break

    case 'POST':
      req.body = ''
      req.on('data', chunk => req.body += chunk)

      req.on('end', () =>
      {
        req.doc = JSON.parse(req.body)
        const chainObj = JSON.parse(fs.readFileSync('chain.json'))
        const admin = req.doc.id.startsWith('_')

        if (!(req.doc.id in chainObj.chain[0]) || req.doc.common && !admin)
          res.doc = { error: true, desc: 'access_denied' }
        else if ((req.doc.type == 'add' || req.doc.type == 'end') && !admin)
          res.doc = { error: true, desc: 'access_denied:' + req.doc.type }
        else
        {
          switch (req.doc.type)
          {
            case 'chain':
              res.doc = chainObj
              break

            case 'admin':
              res.doc = { error: admin, desc: 'req::admin' }
              break

            default:
              chainObj.chain.push(req.doc)
              fs.writeFileSync('chain.json', JSON.stringify(chainObj))
              res.doc = { error: false, desc: 'req_ok' }
              break
          }
        }

        res.body = JSON.stringify(res.doc)
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Content-Length', res.body.length)
        res.write(res.body, () => res.end())
      })
      break

    default:
      res.statusCode = 405
      res.end()
      break
  }
}).listen(port)
