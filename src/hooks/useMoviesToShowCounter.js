import { useEffect, useState } from "react";

import {
  HOW_MANY_CARDS_BIG_WINDOW_SIZE,
  HOW_MANY_CARDS_MEDIUM_WINDOW_SIZE,
  HOW_MANY_CARDS_SMALL_WINDOW_SIZE,
} from '../utils/constants';

export default function useMoviesToShowCounter(currentSizeX, bigWindowSize, mediumWindowSize) {
  const [howManyMoviesToShow, setHowManyMoviesToShow] = useState(0)

  useEffect(() => {
    if (currentSizeX > bigWindowSize) {
      setHowManyMoviesToShow(HOW_MANY_CARDS_BIG_WINDOW_SIZE)
    } else if (currentSizeX > mediumWindowSize) {
      setHowManyMoviesToShow(HOW_MANY_CARDS_MEDIUM_WINDOW_SIZE)
    } else {
      setHowManyMoviesToShow(HOW_MANY_CARDS_SMALL_WINDOW_SIZE)
    }
  }, [currentSizeX, bigWindowSize, mediumWindowSize])

  return howManyMoviesToShow;
} 