import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import CatViewer from './components/CatViewer'
import Stats from './components/Stats'
import LikedCats from './components/LikedCats'
import DislikedCats from './components/DislikedCats'

const CAT_API_URL = 'https://api.thecatapi.com/v1/images/search'
const STORAGE_KEY = 'catRatingApp'

export default function App() {
  const [currentCat, setCurrentCat] = useState(null)
  const [likedCats, setLikedCats] = useState([])
  const [dislikedCats, setDislikedCats] = useState([])
  const [loading, setLoading] = useState(false)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const { liked: savedLiked, disliked: savedDisliked } = JSON.parse(saved)
        setLikedCats(savedLiked || [])
        setDislikedCats(savedDisliked || [])
      } catch (error) {
        console.error('Error loading from localStorage:', error)
      }
    }
    fetchNextCat()
  }, [])



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
  const handleLike = () => {
    if (!currentCat) return

    if (liked) {
      // Remove from liked
      const newLikedCats = likedCats.filter((cat) => cat.id !== currentCat.id)
      setLikedCats(newLikedCats)
      setLiked(false)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          liked: newLikedCats,
          disliked: dislikedCats,
        }))
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    } else {
      // Add to liked (remove from disliked if present)
      let newLikedCats = [...likedCats, currentCat]
      let newDislikedCats = dislikedCats
      if (disliked) {
        newDislikedCats = dislikedCats.filter((cat) => cat.id !== currentCat.id)
        setDisliked(false)
      }
      setLikedCats(newLikedCats)
      setDislikedCats(newDislikedCats)
      setLiked(true)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          liked: newLikedCats,
          disliked: newDislikedCats,
        }))
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    }
  }

  // Handle dislike
  const handleDislike = () => {
    if (!currentCat) return

    if (disliked) {
      // Remove from disliked
      const newDislikedCats = dislikedCats.filter((cat) => cat.id !== currentCat.id)
      setDislikedCats(newDislikedCats)
      setDisliked(false)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          liked: likedCats,
          disliked: newDislikedCats,
        }))
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    } else {
      // Add to disliked (remove from liked if present)
      let newDislikedCats = [...dislikedCats, currentCat]
      let newLikedCats = likedCats
      if (liked) {
        newLikedCats = likedCats.filter((cat) => cat.id !== currentCat.id)
        setLiked(false)
      }
      setDislikedCats(newDislikedCats)
      setLikedCats(newLikedCats)
      setDisliked(true)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          liked: newLikedCats,
          disliked: newDislikedCats,
        }))
      } catch (error) {
        console.error('Error saving to localStorage:', error)
      }
    }
  }

  
  const clearLikes = () => {
    setLikedCats([])
    if (liked) {
      setLiked(false)
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        liked: [],
        disliked: dislikedCats,
      }))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }
  const clearDislikes = () => {
    setDislikedCats([])
    if (disliked) {
      setDisliked(false)
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        liked: likedCats,
        disliked: [],
      }))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
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