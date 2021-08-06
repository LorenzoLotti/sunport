const dhs = document.querySelectorAll('[data-href]')

if (location.pathname.includes('/index'))
  location.pathname = location.pathname.substring(0, location.pathname.indexOf('/index')) + '/'

for (const dh of dhs)
  dh.onclick = () =>
    open(dh.getAttribute('data-href'))

req({ type: 'chain', common: false, id: id }).then(onchainre).catch(() => open())

req({ type: 'admin', common: false, id: id }).then(data =>
{
  if (err(data, 'req::admin'))
    document.body.classList.add('admin')
})
