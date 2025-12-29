import { useState, useEffect } from 'react';

export function useTheme() {
  const [data, setData] = useState(null);
  return { data, setData };
}
