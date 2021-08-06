function onchainre(data)
{
  if (noerr(data, 'req_ok:chain'))
  {
    const result = solvechain(data.chain, id)

    if (result.end)
    {
      document.querySelector('#start').classList.add('hidden')
      document.querySelector('#end').classList.remove('hidden')
    }
    else
    {
      header.classList.remove('hidden')
      document.querySelector('#start').classList.add('hidden')
      document.querySelector('#home').classList.remove('hidden')
      updateHeader(result.money)
    }
  }
}
