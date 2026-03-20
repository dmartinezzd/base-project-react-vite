export function getNavBarRequest(payload={}) {
  return {
    method: 'get',
    headers: { "content-type": "application/json" },
    url: 'https://private-cf558-juancmenj1.apiary-mock.com/home',
  }
}