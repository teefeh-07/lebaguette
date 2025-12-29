import { useState, useEffect } from 'react';

export function useEvents() {
  const [data, setData] = useState(null);
  return { data, setData };
}
