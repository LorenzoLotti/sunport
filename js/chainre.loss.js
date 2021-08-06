function onchainre(data)
{
  if (noerr(data, 'req_ok:chain'))
  {
    const result = solvechain(data.chain, id)

    if (result.end)
      open()
    else
    {
      document.querySelector('form').onsubmit = () =>
      {
        document.querySelector('.loading').classList.add('animating')

        setTimeout(() =>
        {
          req({
            type: 'loss',
            common: location.hash == '#common',
            id: id,
            money: parseFloat(document.querySelector('[type=number]').value),
            desc: document.querySelector('[type=text]').value
          }).then(data =>
          {
            if (noerr(data, 'req_ok'))
              alert('Chain updated!')
            else
              alert('ERROR:\n' + data.desc)

            open()
          })
        }, 500)

        return false
      }

      updateHeader(result.money)
    }
  }
  else
    open()
}
