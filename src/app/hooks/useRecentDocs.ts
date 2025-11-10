import { getLastOpened, getRecents } from '@app/services/documents';
import { DocumentMeta } from '@app/types';
import { useCallback, useState } from 'react';

export function useRecentDocs() {
  const [recents, setRecents] = useState<DocumentMeta[]>([]);
  const [lastOpened, setLastOpened] = useState<DocumentMeta | null>(null);

  const refresh = useCallback(async () => {
    const [r, l] = await Promise.all([getRecents(), getLastOpened()]);
    setRecents(r);
    setLastOpened(l);
  }, []);

  return { recents, lastOpened, refresh };
}
