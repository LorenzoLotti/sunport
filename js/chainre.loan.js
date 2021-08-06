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
        const loanid = Math.random().toString(36).substr(2)

        setTimeout(() =>
        {
          req({
            type: 'loan',
            common: location.hash == '#common',
            id: id,
            loanid: loanid,
            money: parseFloat(document.querySelector('[type=number]').value),
            desc: document.querySelector('[type=text]').value
          }).then(data =>
          {
            if (noerr(data, 'req_ok'))
              alert('Chain updated!\nLoan ID: ' + loanid)
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
