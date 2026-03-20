export function getHomeRequest(payload={}) {
  return {
    method: 'get',
    headers: { "content-type": "application/json" },
    url: 'https://private-317c08-pruebafrontend20261.apiary-mock.com/home-content',
  }
}