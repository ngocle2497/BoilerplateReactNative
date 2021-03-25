import {useAnimationState} from '@common';
import {useEffect} from 'react';

import {PostDelayProps} from './PostDelay.props';

export const PostDelay = ({children}: PostDelayProps) => {
  // state
  const [loaded, setLoaded] = useAnimationState<boolean>(false);
  // effect
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setLoaded(true);
    });
    return () => {
      cancelAnimationFrame(id);
    };
  }, []);

  // render
  return loaded && children;
};
