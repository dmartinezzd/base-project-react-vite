export function getLoginRequest(payload={}) {
  return {
    method: 'get',
    headers: { "content-type": "application/json" },
    url: 'https://private-c9c3b5-homepagetest1.apiary-mock.com/login-content',
  }
}