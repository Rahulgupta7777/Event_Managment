import { motion } from 'framer-motion'
import { Calendar, Sparkles } from 'lucide-react'

export function LoadingScreen() {
  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, #FAE1DD 0%, #FFD7BA 50%, #FEC5BB 100%)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center mb-8"
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="bg-gradient-to-r from-[#8d6b5b] to-[#a37f6e] p-6 rounded-3xl shadow-2xl"
          >
            <Calendar className="w-16 h-16 text-white" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold text-[#1a1a1a] flex items-center justify-center gap-3">
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Let's
            </motion.span>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            >
              happen
            </motion.span>
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            >
              event
            </motion.span>
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex items-center justify-center gap-2 text-[#4a4a4a]"
          >
            <Sparkles className="w-5 h-5 text-[#8d6b5b]" />
            <span>Preparing your dashboard...</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center gap-2 mt-8"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -12, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
              className="w-3 h-3 rounded-full bg-gradient-to-r from-[#8d6b5b] to-[#a37f6e]"
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}
