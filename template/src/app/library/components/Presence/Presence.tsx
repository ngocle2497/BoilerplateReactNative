import {
  useRef,
  isValidElement,
  cloneElement,
  Children,
  ReactElement,
  ReactNode,
} from 'react';
import * as React from 'react';
import {useForceUpdate} from '@common';

import {AnimatePresenceProps} from './types';
import {PresenceChild} from './PresenceChild';

type ComponentKey = string | number;

function getChildKey(child: ReactElement<any>): ComponentKey {
  return child.key || '';
}

function updateChildLookup(
  children: ReactElement<any>[],
  allChildren: Map<ComponentKey, ReactElement<any>>,
) {
  const seenChildren =
    process.env.NODE_ENV !== 'production' ? new Set<ComponentKey>() : null;

  children.forEach((child) => {
    const key = getChildKey(child);

    if (process.env.NODE_ENV !== 'production' && seenChildren) {
      if (seenChildren.has(key)) {
        console.warn(
          `Children of AnimatePresence require unique keys. "${key}" is a duplicate.`,
        );
      }

      seenChildren.add(key);
    }

    allChildren.set(key, child);
  });
}

function onlyElements(children: ReactNode): ReactElement<any>[] {
  const filtered: ReactElement<any>[] = [];

  // We use forEach here instead of map as map mutates the component key by preprending `.$`
  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      filtered.push(child);
    }
  });

  return filtered;
}

export const Presence: React.FunctionComponent<AnimatePresenceProps> = ({
  children,
  onExitComplete,
  exitBeforeEnter,
}) => {
  // We want to force a re-render once all exiting animations have finished. We
  // either use a local forceRender function, or one from a parent context if it exists.
  const forceRender = useForceUpdate();

  const isInitialRender = useRef(true);

  // Filter out any children that aren't ReactElements. We can only track ReactElements with a props.key
  const filteredChildren = onlyElements(children);

  // Keep a living record of the children we're actually rendering so we
  // can diff to figure out which are entering and exiting
  const presentChildren = useRef(filteredChildren);

  // A lookup table to quickly reference components by key
  const allChildren = useRef(new Map<ComponentKey, ReactElement<any>>())
    .current;

  // A living record of all currently exiting components.
  const exiting = useRef(new Set<ComponentKey>()).current;

  updateChildLookup(filteredChildren, allChildren);

  // If this is the initial component render, just deal with logic surrounding whether
  // we play onMount animations or not.
  if (isInitialRender.current) {
    isInitialRender.current = false;

    return (
      <>
        {filteredChildren.map((child) => (
          <PresenceChild key={getChildKey(child)} isPresent>
            {child}
          </PresenceChild>
        ))}
      </>
    );
  }

  // If this is a subsequent render, deal with entering and exiting children
  let childrenToRender = [...filteredChildren];

  // Diff the keys of the currently-present and target children to update our
  // exiting list.
  const presentKeys = presentChildren.current.map(getChildKey);
  const targetKeys = filteredChildren.map(getChildKey);

  // Diff the present children with our target children and mark those that are exiting
  const numPresent = presentKeys.length;
  for (let i = 0; i < numPresent; i++) {
    const key = presentKeys[i];
    if (targetKeys.indexOf(key) === -1) {
      exiting.add(key);
    } else {
      // In case this key has re-entered, remove from the exiting list
      exiting.delete(key);
    }
  }

  if (exitBeforeEnter && exiting.size) {
    childrenToRender = [];
  }

  // Loop through all currently exiting components and clone them to overwrite `animate`
  // with any `exit` prop they might have defined.
  exiting.forEach((key) => {
    // If this component is actually entering again, early return
    if (targetKeys.indexOf(key) !== -1) {
      return;
    }

    const child = allChildren.get(key);
    if (!child) {
      return;
    }

    const insertionIndex = presentKeys.indexOf(key);

    const onExit = () => {
      allChildren.delete(key);
      exiting.delete(key);

      // Remove this child from the present children
      const removeIndex = presentChildren.current.findIndex(
        (presentChild) => presentChild.key === key,
      );
      presentChildren.current.splice(removeIndex, 1);

      // Defer re-rendering until all exiting children have indeed left
      if (!exiting.size) {
        presentChildren.current = filteredChildren;
        forceRender();
        onExitComplete && onExitComplete();
      }
    };

    childrenToRender.splice(
      insertionIndex,
      0,
      <PresenceChild
        key={getChildKey(child)}
        isPresent={false}
        onExitComplete={onExit}>
        {child}
      </PresenceChild>,
    );
  });

  childrenToRender = childrenToRender.map((child) => {
    const key = child.key as string | number;
    return exiting.has(key) ? (
      child
    ) : (
      <PresenceChild key={getChildKey(child)} isPresent>
        {child}
      </PresenceChild>
    );
  });

  presentChildren.current = childrenToRender;

  return (
    <>
      {exiting.size
        ? childrenToRender
        : childrenToRender.map((child) => cloneElement(child))}
    </>
  );
};
