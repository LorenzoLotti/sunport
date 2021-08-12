const args = new URLSearchParams(location.search)
const indexpage = document.querySelector('#index')
const server = `http://${args.get('ip')}:${args.get('port')}`
const id = args.get('id')
const header = document.querySelector('header')
let withPermissions = null

function appendHTML(element, html)
{
  element.insertAdjacentHTML('beforeend', html)
}

function openurl(url = '')
{
  const index = url.indexOf('#')

  location.href = location.href.slice(0, location.href.indexOf('?')) +
    (indexpage == null ? '/../' : '') +
    (index > 0 ? url.slice(0, index) + location.search + url.slice(index) : url + location.search)
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
  let result = { end: false, money: chain[0][id], users: n }

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
        const loan = getloan(chain, node.loanid)

        if (node.common)
          result.money += (loan?.money / n) ?? 0
        else if (node.id == id)
          result.money += loan?.money ?? 0
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

function getH(div, node)
{
  const h = {}
  h.loanID = () => appendHTML(div, /*html*/ `<span class="shadow">${node.loanid}<span>`)
  h.id = () => appendHTML(div, /*html*/ `<p>ID: ${node.id}</p>`)
  h.toID = () => appendHTML(div, /*html*/ `<p>to: ${node.toid}</p>`)

  h.money = (prefix = '') => appendHTML(
    div,
    /*html*/
    `
      <p>
        money: <span class="money" data-value="${prefix}${node.money}"></span>
      </p>
    `
  )

  h.desc = () => appendHTML(div, /*html*/ `<p>description: <i>${node.desc}</i></p>`)

  h.common = () => appendHTML(
    div,
    node.common ? /*html*/ `<p><span class="commonhash">#common<span></p>` : ''
  )

  return h
}

function createChainNode(node, chain)
{
  node.type ??= 'start'
  const div = document.createElement('div')
  const h = getH(div, node)

  appendHTML(
    div,
    /*html*/
    `
      <div></div>
      <div></div>
      <div></div>
      <h3>${node.type.toUpperCase()}</h3>
    `
  )

  switch (node.type)
  {
    case 'loss':
      div.style.setProperty('--main-color', 'orange')
      h.id()
      h.money('-')
      h.desc()
      h.common()
      break

    case 'loan':
      div.style.setProperty('--main-color', 'violet')
      h.loanID()
      h.id()
      h.money('-')
      h.desc()
      h.common()
      break

    case 'add':
      div.style.setProperty('--main-color', 'limegreen')
      h.id()
      h.toID()
      h.money()
      h.desc()
      break

    case 'return':
      div.style.setProperty('--main-color', 'dodgerblue')
      const lh = getH(div, getloan(chain, node.loanid))
      h.loanID()
      h.id()
      lh.money()
      lh.desc()
      h.common()
      break

    default:
      delete node.type

      for (const key in node)
      {
        appendHTML(
          div,
          /*html*/
          `
            <p>
              ${key}: <span class="money" data-value="${node[key]}"></span>
              &nbsp; &rarr; &nbsp;
              <span class="money" data-value="${solvechain(chain, key).money}"></span>
            </p>
          `
        )
      }
      return div
  }

  appendHTML(div, /*html*/ `<span class="shadow">${node.time}</span>`)
  return div
}

function createLoansNode(node)
{
  const div = document.createElement('div')
  div.id = 'id-' + node.loanid

  if (node.common)
    div.classList.add('admin')

  appendHTML(
    div,
    /*html*/
    `
      <span class="shadow common-${node.common}"></span>
      <p>${node.desc}</p>
      <br>
      <span class="money" data-value="${node.money}">&#128184;</span> <!-- Money with Wings -->
      <button class="myloans"></button>
    `
  )

  div.querySelector('button').onclick = () =>
  {
    this.onclick = () => { }
    document.querySelector('.loading').classList.add('animating')

    setTimeout(() =>
    {
      req({ type: 'return', common: node.common, id: id, loanid: node.loanid }).then(data =>
      {
        if (noerr(data, 'req_ok'))
          alert('Chain updated!')
        else
          alert('ERROR:\n' + data.desc)

        openurl()
      })
    }, 500)
  }

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
