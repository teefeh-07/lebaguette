import { useState, useEffect } from 'react';

export function useNotifications() {
  const [data, setData] = useState(null);
  return { data, setData };
}
