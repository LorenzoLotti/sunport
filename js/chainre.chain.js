function onchainre(data)
{
  if (noerr(data, 'req_ok:chain'))
  {
    const result = solvechain(data.chain, id)

    if (result.end)
      openurl()
    else
    {
      const panel = document.querySelector('.chain-panel')

      for (const node of data.chain)
        panel.append(createChainNode(node, data.chain))

      updateHeader(result.money)
    }
  }
  else
    openurl()
}
