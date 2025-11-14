import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [progress, setProgress] = useState(0)
  const [direction, setDirection] = useState('forward')
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  const messages = [
    "Initializing system...",
    "Loading resources...",
    "Processing data...",
    "Optimizing performance...",
    "Synchronizing state...",
    "Validating inputs...",
    "Compiling assets...",
    "Establishing connections...",
    "Finalizing setup...",
    "Ready to proceed..."
  ]

  // Calculate current message index based on elapsed seconds
  // Message changes every 2 seconds (on odd-numbered seconds)
  const messageIndex = Math.floor(elapsedSeconds / 2) % messages.length

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedSeconds(prev => prev + 1)

      setProgress(currentProgress => {
        let newProgress = currentProgress

        if (direction === 'forward') {
          newProgress = currentProgress + 10
          if (newProgress >= 100) {
            newProgress = 100
            setDirection('backward')
          }
        } else {
          newProgress = currentProgress - 10
          if (newProgress <= 0) {
            newProgress = 0
            setDirection('forward')
          }
        }

        return newProgress
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [direction])

  return (
    <div className="app-container">
      <h1>Progress Bar Demo</h1>
      
      <div className="progress-container">
        <div className="progress-bar-wrapper">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${progress}%` }}
          >
            <span className="progress-text">{progress}%</span>
          </div>
        </div>
        
        <div className="message-container">
          <p className="message">{messages[messageIndex]}</p>
        </div>

        <div className="info-container">
          <p className="info">Direction: <strong>{direction}</strong></p>
          <p className="info">Elapsed: <strong>{elapsedSeconds}s</strong></p>
        </div>
      </div>
    </div>
  )
}

export default App
