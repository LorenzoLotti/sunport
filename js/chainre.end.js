function onchainre(data)
{
  if (noerr(data, 'req_ok:chain'))
  {
    const result = solvechain(data.chain, id)

    if (result.end)
      open()
    else
    {
      document.querySelector('.the-red-button').onclick = () =>
      {
        document.querySelector('.loading').classList.add('animating')

        setTimeout(() =>
        {
          req({ type: 'end', common: false, id: id, }).then(data =>
          {
            if (noerr(data, 'req_ok'))
              alert('Chain ended!')
            else
              alert('ERROR:\n' + data.desc)

            open()
          })
        }, 500)
      }

      updateHeader(result.money)
    }
  }
  else
    open()
}
