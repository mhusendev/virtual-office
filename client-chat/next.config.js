/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    // host user server
    NEXT_PUBLIC_API_URL:'http://localhost:3000',
    // host socket server,
    SOCKET_HOST:'http://localhost:3002',
    // endpoint
    login: '/user/login',
    userinfo:'/account-api/user/info'
  }
}

module.exports = nextConfig
