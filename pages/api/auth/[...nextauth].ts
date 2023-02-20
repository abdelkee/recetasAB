import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '../../../models/user'
import bcrypt from 'bcrypt'
import { connectToDatabase } from '../../../utils/db'

connectToDatabase()

export default NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        email: { type: 'email', label: 'Email' },
        password: { type: 'password', label: 'Password' }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as { email: string, password: string }

        const user = await User.findOne({ email })
        if (!user) return null
        const passMatch = await bcrypt.compare(password, user.password)
        if (!passMatch) return null
        return user
      }
    })
  ],
  theme: {
    buttonText: 'Log in',
    brandColor: '#84cc16',
    logo: 'https://pngtree.com/freepng/cartoon-lemon-png-download_4484222.html'
  }
})