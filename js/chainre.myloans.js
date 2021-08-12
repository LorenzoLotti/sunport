function onchainre(data)
{
  if (noerr(data, 'req_ok:chain'))
  {
    const result = solvechain(data.chain, id)

    if (result.end)
      openurl()
    else
    {
      const panel = document.querySelector('.loans-panel')

      for (const node of data.chain)
      {
        if (node.id == id || node.common)
        {
          if (node.type == 'loan')
            panel.append(createLoansNode(node))
          else if (node.type == 'return')
            panel.querySelector('#id-' + node.loanid).remove()
        }
      }

      withPermissions = () =>
      {
        if (panel.querySelectorAll(':scope > :not(.admin), body.admin :scope > .admin').length > 1)
          panel.querySelector('.empty-message').classList.add('hidden')
      }

      updateHeader(result.money)
    }
  }
  else
    openurl()
}
