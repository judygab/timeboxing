import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

const options = {
  site: process.env.NEXTAUTH_URL,
  database: process.env.DATABASE_URL,
  providers: [
  Providers.Email({
      server: {
        port: process.env.EMAIL_SERVER_PORT,
        host: process.env.EMAIL_SERVER_HOST,
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    redirect: async (url, _) => {
      if (url === '/api/auth/signin') {
        return Promise.resolve('/profile')
      }
      return Promise.resolve('/api/auth/signin')
    },
  },
}

export default (req, res) => NextAuth(req, res, options)
