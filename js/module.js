const args = new URLSearchParams(location.search)

const server = 'http://' + args.get('ip') + ':' + args.get('port')
const id = args.get('id')
const header = document.querySelector('header')

function appendHTML(element, html)
{
  element.insertAdjacentHTML('beforeend', html)
}

function open(url = '')
{
  const index = url.indexOf('#')

  if (index > 0)
    location = url.slice(0, index) + location.search + url.slice(index)
  else
    location = url + location.search
}

function err(data, desc)
{
  return data.error && data.desc == desc
}

function noerr(data, desc)
{
  return !data.error && data.desc == desc
}

function getloan(chain, loanid) {
  for (const node of chain)
    if (node.type == 'loan' && node.loanid == loanid)
      return node

  return null
}

function solvechain(chain, id)
{
  const n = Object.keys(chain[0]).length
  let result = { end: false, money: chain[0][id] }

  for (var i = 1; i < chain.length; i++)
  {
    const node = chain[i]

    switch (node.type)
    {
      case 'loss':
      case 'loan':
        if (node.common)
          result.money -= node.money / n
        else if (node.id == id)
          result.money -= node.money
        break

      case 'add':
        if (node.toid == id)
          result.money += node.money
        break

      case 'return':
        if (node.id == id)
          result.money += getloan(chain, node.loanid)?.money ?? 0
        break

      case 'end':
        result.end = true
        i = chain.length
        break
    }
  }

  return result
}

function updateHeader(money)
{
  document.querySelector('.money').setAttribute('data-value', money)
  document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px')
}

function createChainNode(node, chain)
{
  node.type ??= 'start'
  const div = document.createElement('div')
  appendHTML(div, '<div></div><div></div><div></div><h3>' + node.type.toUpperCase() + '</h3>')
  const hLoanID = () => appendHTML(div, '<span class="shadow">' + node.loanid + '<span>')
  const hID = () => appendHTML(div, '<p>ID: ' + node.id + '</p>')
  const hToID = () => appendHTML(div, '<p>to: ' + node.toid + '</p>')

  const hMoney = (prefix = '') => appendHTML(
    div,
    '<p>money: <span class="money" data-value="' + prefix + node.money + '"></span></p>'
  )

  const hDesc = () => appendHTML(div, '<p>description: <i>' + node.desc + '</i></p>')

  const hCommon = () => appendHTML(
    div,
    node.common ? '<p><span class="shadow">#common<span></p>' : ''
  )

  switch (node.type)
  {
    case 'loss':
      div.style.setProperty('--main-color', 'orange')
      hID()
      hMoney('-')
      hDesc()
      hCommon()
      break

    case 'loan':
      div.style.setProperty('--main-color', 'violet')
      hLoanID()
      hID()
      hMoney('-')
      hDesc()
      hCommon()
      break

    case 'add':
      div.style.setProperty('--main-color', 'limegreen')
      hID()
      hToID()
      hMoney()
      hDesc()
      break

    case 'return':
      div.style.setProperty('--main-color', 'dodgerblue')
      hLoanID()
      hID()
      break

    default:
      delete node.type

      for (const key in node)
      {
        appendHTML(
          div,
          '<p>' + key + ': <span class="money" data-value="' + node[key] +
            '"></span> &nbsp; &rarr; &nbsp; <span class="money" data-value="' +
            solvechain(chain, key).money + '"></span></p>'
        )
      }
      return div
  }

  appendHTML(div, '<span class="shadow">' + node.time + '</span>')
  return div
}

async function req(data)
{
  data.time = new Date().toLocaleString()

  return (await fetch(server,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })).json()
}
