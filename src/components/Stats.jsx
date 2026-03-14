import { motion } from 'framer-motion'

export default function Stats({ likedCount, dislikedCount }) {
  return (
    <motion.div
      className="stats"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      <motion.div
        className="stat-item liked"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="stat-label">❤️ Liked</div>
        <motion.div
          className="stat-count"
          key={likedCount}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          {likedCount}
        </motion.div>
      </motion.div>
      <motion.div
        className="stat-item disliked"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="stat-label">💔 Disliked</div>
        <motion.div
          className="stat-count"
          key={dislikedCount}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500 }}
        >
          {dislikedCount}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
