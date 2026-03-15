import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CatViewer from './components/CatViewer'
import Stats from './components/Stats'
import LikedCats from './components/LikedCats'
import DislikedCats from './components/DislikedCats'
import API_URL from './config/api'

const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search'

export default function App() {
  const [currentCat, setCurrentCat] = useState(null)
  const [likedCats, setLikedCats] = useState([])
  const [dislikedCats, setDislikedCats] = useState([])
  const [loading, setLoading] = useState(false)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  // Fetch reactions from backend
  const fetchReactions = async () => {
    try {
      const response = await fetch(`${API_URL}/api/reactions-summary`)
      const data = await response.json()
      if (data.success) {
        const liked = []
        const disliked = []
        data.data.forEach(item => {
          if (item.likes_count > 0) {
            liked.push({ id: item.image_id, url: item.image_url })
          }
          if (item.dislikes_count > 0) {
            disliked.push({ id: item.image_id, url: item.image_url })
          }
        })
        setLikedCats(liked)
        setDislikedCats(disliked)
      }
    } catch (error) {
      console.error('Error fetching reactions:', error)
    }
  }

  // Load reactions on mount
  useEffect(() => {
    fetchReactions()
    fetchNextCat()
  }, [])

  // Update liked/disliked when lists or currentCat change
  useEffect(() => {
    if (currentCat) {
      setLiked(likedCats.some(cat => cat.id === currentCat.id))
      setDisliked(dislikedCats.some(cat => cat.id === currentCat.id))
    }
  }, [likedCats, dislikedCats, currentCat])



  // Fetch a new cat
  const fetchNextCat = async () => {
    setLoading(true)
    setLiked(false)
    setDisliked(false)

    try {
      const response = await fetch(CAT_API_URL)
      const data = await response.json()
      if (data && data.length > 0) {
        const newCat = data[0]

        // Check if cat is already rated
        const isLiked = likedCats.some((cat) => cat.id === newCat.id)
        const isDisliked = dislikedCats.some((cat) => cat.id === newCat.id)

        setCurrentCat(newCat)
        setLiked(isLiked)
        setDisliked(isDisliked)
      }
    } catch (error) {
      console.error('Error fetching cat:', error)
    } finally {
      setLoading(false)
    }
  }

  // Handle like
  const handleLike = async () => {
    if (!currentCat) return

    try {
      await fetch(`${API_URL}/api/reactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_id: currentCat.id,
          image_url: currentCat.url,
          reaction_type: 'like'
        })
      })
      await fetchReactions()
    } catch (error) {
      console.error('Error posting like:', error)
    }
  }

  // Handle dislike
  const handleDislike = async () => {
    if (!currentCat) return

    try {
      await fetch(`${API_URL}/api/reactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image_id: currentCat.id,
          image_url: currentCat.url,
          reaction_type: 'dislike'
        })
      })
      await fetchReactions()
    } catch (error) {
      console.error('Error posting dislike:', error)
    }
  }

  
  const clearLikes = () => {
    setLikedCats([])
    if (liked) {
      setLiked(false)
    }
  }
  const clearDislikes = () => {
    setDislikedCats([])
    if (disliked) {
      setDisliked(false)
    }
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key.toLowerCase() === 'l') {
        handleLike()
      } else if (e.key.toLowerCase() === 'd') {
        handleDislike()
      } else if (e.key.toLowerCase() === 'n') {
        fetchNextCat()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentCat, liked, disliked, likedCats, dislikedCats])

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
       Cat Rating App 
      </motion.h1>

      <CatViewer
        currentCat={currentCat}

        liked={liked}
        disliked={disliked}
        onLike={handleLike}
        onDislike={handleDislike}
        onNext={fetchNextCat}
        loading={loading}
      />

      <Stats likedCount={likedCats.length} dislikedCount={dislikedCats.length} />

      <motion.div
        className="sections-container"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <LikedCats cats={likedCats} onClear={clearLikes} />
        <DislikedCats cats={dislikedCats} onClear={clearDislikes} />
      </motion.div>

      <motion.div
        style={{ marginTop: '40px', textAlign: 'center', color: 'white' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <p style={{ fontSize: '14px', opacity: 0.8 }}>
           Keyboard shortcuts: Press <kbd>L</kbd> to  Like, <kbd>D</kbd> to  Dislike, <kbd>N</kbd> for  Next Cat
        </p>
      </motion.div>
    </motion.div>
  )
}
8