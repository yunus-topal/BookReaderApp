import { defaultReaderSettings, ReaderSettings, ReaderSettingsContext } from "@app/types";
import { PropsWithChildren, useState, useEffect, useCallback, useMemo } from "react";
import { getReaderSettings, setReaderSettings } from "@app/services/documents";

export const ReaderSettingsProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [settings, setSettingsState] = useState<ReaderSettings>(defaultReaderSettings);
  const [isLoaded, setIsLoaded] = useState(false);
  

  // Load from storage once
  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const stored = await getReaderSettings();
        if (isMounted && stored) {
          setSettingsState((prev) => ({ ...prev, ...stored }));
        }
      } catch (e) {
        console.warn('Failed to load reader settings', e);
      } finally {
        if (isMounted) setIsLoaded(true);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);


  const setSettings = useCallback(async (next: ReaderSettings) => {
    setSettingsState(next);
    try {
      await setReaderSettings(next);
    } catch (e) {
      console.warn('Failed to save reader settings', e);
    }
  }, []);

  const updateSettings = useCallback(
    async (patch: Partial<ReaderSettings>) => {
      setSettingsState((prev) => {
        const merged = { ...prev, ...patch };
        // fire-and-forget the storage write
        void setReaderSettings(merged).catch((e) =>
          console.warn('Failed to save reader settings', e)
        );
        return merged;
      });
    },
    []
  );

  const value = useMemo(
    () => ({
      settings,
      setSettings,
      updateSettings,
      isLoaded,
    }),
    [settings, setSettings, updateSettings, isLoaded]
  );

  return (
    <ReaderSettingsContext.Provider value={value}>
      {children}
    </ReaderSettingsContext.Provider>
  );
};
