const dhs = document.querySelectorAll('[data-href]')

if (location.pathname.startsWith('/index'))
  location.pathname = '/'

for (const dh of dhs)
  dh.onclick = () =>
    open(dh.getAttribute('data-href'))

req({ type: 'chain', common: false, id: id }).then(onchainre).catch(() =>
{
  if(location.pathname != '/')
    open()
})

req({ type: 'admin', common: false, id: id }).then(data =>
{
  if (err(data, 'req::admin'))
    document.body.classList.add('admin')
})
