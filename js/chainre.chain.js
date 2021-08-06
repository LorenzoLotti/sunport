function onchainre(data)
{
  if (noerr(data, 'req_ok:chain'))
  {
    const result = solvechain(data.chain, id)

    if (result.end)
      open()
    else
    {
      const panel = document.querySelector('.chain-panel')

      for (const node of data.chain)
        panel.appendChild(createChainNode(node, data.chain))

      updateHeader(result.money)
    }
  }
  else
    open()
}
