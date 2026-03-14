import { motion } from 'framer-motion'

export default function LikedCats({ cats, onClear }) {
  return (
    <motion.div
      className="section liked-section"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '15px',
        }}
      >
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className={cats.length > 0 ? 'emoji-beat' : ''}></span> Liked Cats ({cats.length})
        </motion.h2>
        {cats.length > 0 && (
          <motion.button
            className="btn-clear"
            onClick={onClear}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
             Clear Likes
          </motion.button>
        )}
      </div>

      {cats.length === 0 ? (
        <motion.div
          className="empty-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          No liked cats yet. Rate some cats to see them here! 
        </motion.div>
      ) : (
        <motion.div
          className="grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          {cats.map((cat, index) => (
            <motion.div
              key={cat.id}
              className="grid-item"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.5 + index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <img src={cat.url} alt="Liked cat" />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
