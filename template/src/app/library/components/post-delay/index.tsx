import React, { useEffect, useState } from 'react';

import { Freeze } from 'react-freeze';

import { PostDelayProps } from './type';

const DURATION = 300;

export const PostDelay = ({
  children,
  durationMs = DURATION,
}: PostDelayProps) => {
  // state
  const [loaded, setLoaded] = useState<boolean>(false);

  // effect
  useEffect(() => {
    const id = setTimeout(() => {
      setLoaded(true);
    }, durationMs);

    return () => {
      clearTimeout(id);
    };
  }, []);

  // render
  return <Freeze freeze={!loaded}>{children}</Freeze>;
};
