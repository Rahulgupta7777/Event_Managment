import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'

interface LoginPageProps {
  onLogin: (email: string, password: string) => void
  isLoading?: boolean
}

export function LoginPage({ onLogin, isLoading = false }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newErrors: { email?: string; password?: string } = {}
    
    if (!email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    
    if (Object.keys(newErrors).length === 0) {
      onLogin(email, password)
    }
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        background: 'linear-gradient(135deg, #FAE1DD 0%, #FFD7BA 50%, #FEC5BB 100%)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl p-8">
          <div className="flex items-center justify-center mb-8">
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-r from-[#8d6b5b] to-[#a37f6e] p-4 rounded-2xl shadow-lg"
            >
              <Calendar className="w-10 h-10 text-white" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold text-[#1a1a1a] mb-2">
              Welcome Back
            </h1>
            <p className="text-[#4a4a4a] flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8d6b5b]" />
              Let's make events happen
            </p>
          </motion.div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#1a1a1a] font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setErrors({ ...errors, email: undefined })
                }}
                className="bg-white/50 backdrop-blur-sm border-white/60 focus:border-[#8d6b5b] focus:ring-[#8d6b5b]"
                disabled={isLoading}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600"
                >
                  {errors.email}
                </motion.p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-[#1a1a1a] font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setErrors({ ...errors, password: undefined })
                }}
                className="bg-white/50 backdrop-blur-sm border-white/60 focus:border-[#8d6b5b] focus:ring-[#8d6b5b]"
                disabled={isLoading}
              />
              {errors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-600"
                >
                  {errors.password}
                </motion.p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-white/60 text-[#8d6b5b] focus:ring-[#8d6b5b]"
                />
                <span className="text-[#4a4a4a]">Remember me</span>
              </label>
              <a
                href="#"
                className="text-[#8d6b5b] hover:text-[#a37f6e] font-medium transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#8d6b5b] to-[#a37f6e] hover:from-[#a37f6e] hover:to-[#8d6b5b] text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[#4a4a4a]">
              Don't have an account?{' '}
              <a
                href="#"
                className="text-[#8d6b5b] hover:text-[#a37f6e] font-medium transition-colors"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-6 text-sm text-[#4a4a4a]"
        >
          © 2024 Event Manager. All rights reserved.
        </motion.p>
      </motion.div>
    </div>
  )
}
