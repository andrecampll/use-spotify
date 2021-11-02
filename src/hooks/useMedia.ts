import { useEffect, useState } from "react";

export const useMedia = <T>(queries: string[], values: T[], defaultValue: T) => {
  const mediaQueryList = queries.map(query => window.matchMedia(query));

  const getValue = () => {
    const index = mediaQueryList.findIndex((mediaQuery) => mediaQuery.matches);

    return values?.[index] || defaultValue;
  };

  const [value, setValue] = useState<T>(getValue);

  useEffect(() => {
    const handler = () => setValue(getValue);

    mediaQueryList.forEach((mediaQuery) => mediaQuery.addListener(handler));

    return () => mediaQueryList.forEach((mediaQuery) => mediaQuery.removeListener(handler));
  });

  return value;
};
