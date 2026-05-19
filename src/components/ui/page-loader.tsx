'use client';

import { useEffect, useState } from 'react';
import { Loader } from '@/components/ui/loader';

export function PageLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(t);
  }, []);

  return <Loader isVisible={visible} />;
}
