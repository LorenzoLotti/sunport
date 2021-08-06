const dhs = document.querySelectorAll('[data-href]')

if (location.pathname.includes('/index'))
  openurl()

for (const dh of dhs)
  dh.onclick = () =>
    openurl(dh.getAttribute('data-href'))

req({ type: 'chain', common: false, id: id }).then(onchainre).catch(() =>
{
  if (document.querySelector('#index') == null)
    openurl()
})

req({ type: 'admin', common: false, id: id }).then(data =>
{
  if (err(data, 'req::admin'))
    document.body.classList.add('admin')
})
