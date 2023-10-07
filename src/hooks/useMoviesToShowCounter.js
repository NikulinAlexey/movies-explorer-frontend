import { useEffect, useState } from "react"

export default function useMoviesToShowCounter(currentSizeX, bigWindowSize, mediumWindowSize) {
  const [howManyMoviesToShow, setHowManyMoviesToShow] = useState(0)

  useEffect(() => {
    if (currentSizeX > bigWindowSize) {
      setHowManyMoviesToShow(12)
    } else if (currentSizeX > mediumWindowSize) {
      setHowManyMoviesToShow(8)
    } else {
      setHowManyMoviesToShow(5)
    }
  }, [currentSizeX, bigWindowSize, mediumWindowSize])

  return howManyMoviesToShow;
} 