import { useRef, useEffect } from 'react';

export default (callback, dependencyArray) => {
  const controllerRef = useRef();
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    controllerRef.current = new AbortController();
    const cleanUp = callbackRef.current(controllerRef.current?.signal);

    return () => {
      controllerRef.current.abort();
      cleanUp?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencyArray);
};
