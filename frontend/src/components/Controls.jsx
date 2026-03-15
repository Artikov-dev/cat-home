import { motion } from 'framer-motion'

export default function Controls({
  liked,
  disliked,
  onLike,
  onDislike,
  onNext,
  loading,
}) {
  return (
    <motion.div
      className="controls"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <motion.button
        className={`btn-like ${liked ? 'active' : ''}`}
        onClick={onLike}
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={liked ? { scale: [1, 1.1, 1] } : {}}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className={liked ? 'emoji-beat' : ''}></span> Like
      </motion.button>
      <motion.button
        className={`btn-dislike ${disliked ? 'active' : ''}`}
        onClick={onDislike}
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={disliked ? { scale: [1, 1.1, 1] } : {}}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <span className={disliked ? 'emoji-shake' : ''}></span> Dislike
      </motion.button>
      <motion.button
        className="btn-next"
        onClick={onNext}
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
         Next Cat
      </motion.button>
    </motion.div>
  )
}
