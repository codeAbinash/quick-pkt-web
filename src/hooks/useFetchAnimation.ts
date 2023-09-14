import { useEffect, useState } from 'react';

function useFetchAnimation(animationName: string) {
  const [animationData, setAnimationData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`/weather/animations/${animationName}.json`)
      .then((response) => response.json())
      .then((data) => {
        setAnimationData(data);
        setLoaded(true);
      });
  }, [animationName]);

  return [animationData, loaded];
}

export default useFetchAnimation;
