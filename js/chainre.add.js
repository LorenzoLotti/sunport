function onchainre(data)
{
  if (noerr(data, 'req_ok:chain'))
  {
    const select = document.querySelector('select')
    const result = solvechain(data.chain, id)

    for (const key in data.chain[0])
      appendHTML(select, /*html*/ `<option>${key}</option>`)

    if (result.end)
      openurl()
    else
    {
      document.querySelector('form').onsubmit = () =>
      {
        document.querySelector('.loading').classList.add('animating')

        setTimeout(() =>
        {
          req({
            type: 'add',
            common: false,
            id: id,
            toid: select.value,
            money: parseFloat(document.querySelector('[type=number]').value),
            desc: document.querySelector('[type=text]').value
          }).then(data =>
          {
            if (noerr(data, 'req_ok'))
              alert('Chain updated!')
            else
              alert('ERROR:\n' + data.desc)

            openurl()
          })
        }, 500)

        return false
      }

      updateHeader(result.money)
    }
  }
  else
    openurl()
}
