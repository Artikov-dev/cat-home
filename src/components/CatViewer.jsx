import { motion } from 'framer-motion'
import Controls from './Controls'

export default function CatViewer({
  currentCat,
  liked,
  disliked,
  onLike,
  onDislike,
  onNext,
  loading,
}) {
  return (
    <motion.div
      className="cat-viewer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h2
        style={{ marginBottom: '10px', color: '#667eea' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Current Cat 🐱
      </motion.h2>
      <motion.div
        className="cat-image-container"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {loading ? (
          <motion.div
            className="loading-spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          ></motion.div>
        ) : currentCat ? (
          <motion.img
            src={currentCat.url}
            alt="Current cat"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
            onLoad={(e) => {
              e.target.style.display = 'block'
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          />
        ) : (
          <motion.div
            style={{ color: '#999' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Loading first cat...
          </motion.div>
        )}
      </motion.div>
      <Controls
        liked={liked}
        disliked={disliked}
        onLike={onLike}
        onDislike={onDislike}
        onNext={onNext}
        loading={loading}
      />
    </motion.div>
  )
}
