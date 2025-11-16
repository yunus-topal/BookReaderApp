// src/hooks/useDocumentReadingState.ts
import { useCallback, useEffect, useState } from 'react';
import type { DocumentReadingState, ReaderPosition } from '@app/types';
import { getDocumentReadingState, setDocumentReadingState } from '@app/services/documents';

export function useDocumentReadingState(documentId: string | null) {
  const [state, setState] = useState<DocumentReadingState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const refresh = useCallback(async () => {
    if (!documentId) return;

    setIsLoading(true);
    try {
      const existing = await getDocumentReadingState(documentId);

      if (existing) {
        setState(existing);
      } else {
        // sensible default for a new document
        const initial: DocumentReadingState = {
          documentId,
          position: {
            location: undefined,
            progressFraction: 0,
          },
        };
        setState(initial);
      }
    } finally {
      setIsLoading(false);
    }
  }, [documentId]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const updatePosition = useCallback(
    async (position: ReaderPosition) => {
      if (!documentId) return;

      const next: DocumentReadingState = {
        documentId,
        position,
      };

      // update UI immediately
      setState(next);

      // persist
      setIsSaving(true);
      try {
        await setDocumentReadingState(next);
      } finally {
        setIsSaving(false);
      }
    },
    [documentId]
  );

  return {
    state,                       // full DocumentReadingState | null
    position: state?.position ?? null,
    isLoading,
    isSaving,
    refresh,
    updatePosition,
  };
}
