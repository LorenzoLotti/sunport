function onchainre(data)
{
  if (noerr(data, 'req_ok:chain'))
  {
    const result = solvechain(data.chain, id)

    if (result.end)
    {
      document.querySelector('#start').classList.add('hidden')
      const end = document.querySelector('#end')
      end.classList.remove('hidden')

      for (const id in data.chain[0])
      {
        appendHTML(
          end,
          /*html*/
          `
            <h2>
              ${id}:&nbsp;
              <span class="money" data-value="${solvechain(data.chain, id).money}">&#128184;</span>
              <!-- Money with Wings -->
            </h2>
          `
        )
      }

      if (result.money < 0)
      {
        appendHTML(
          end,
          /*html*/
          `
            <br>
            <h1 class="negative">
              You owe
              <span class="money" data-value="${result.money / -(--result.users)}">&#128184;</span>
              <!-- Money with Wings -->
              each.
            </h1>
          `
        )
      }
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
