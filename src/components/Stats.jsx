import { motion } from 'framer-motion'

export default function Stats({ likedCount, dislikedCount }) {
  const total = likedCount + dislikedCount
  const likedPercentage = total > 0 ? (likedCount / total) * 100 : 0
  const dislikedPercentage = total > 0 ? (dislikedCount / total) * 100 : 0

  return (
    <motion.div
      className="stats"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      <motion.div
        className="stats-container"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="stats-header">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Your Cat Stats
          </motion.h3>
        </div>
        <div className="stats-grid">
          <motion.div
            className="stat-card liked"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="stat-icon">❤️</div>
            <div className="stat-info">
              <div className="stat-label">Liked</div>
              <motion.div
                className="stat-number"
                key={likedCount}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                {likedCount}
              </motion.div>
              <div className="stat-percentage">{likedPercentage.toFixed(1)}%</div>
            </div>
            <motion.div
              className="liquid-fill"
              style={{ height: `${likedPercentage}%` }}
              initial={{ height: 0 }}
              animate={{ height: `${likedPercentage}%` }}
              transition={{ delay: 1.5, duration: 1 }}
            />
          </motion.div>
          <motion.div
            className="stat-card disliked"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="stat-icon">💔</div>
            <div className="stat-info">
              <div className="stat-label">Disliked</div>
              <motion.div
                className="stat-number"
                key={dislikedCount}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                {dislikedCount}
              </motion.div>
              <div className="stat-percentage">{dislikedPercentage.toFixed(1)}%</div>
            </div>
            <motion.div
              className="liquid-fill"
              style={{ height: `${dislikedPercentage}%` }}
              initial={{ height: 0 }}
              animate={{ height: `${dislikedPercentage}%` }}
              transition={{ delay: 1.5, duration: 1 }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
