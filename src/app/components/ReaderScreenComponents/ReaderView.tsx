import { DocumentMeta, locationToReaderPosition, ReaderPosition, ReaderSettings } from '@app/types';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Location, Reader, useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';

export interface ReaderViewProps {
  document: DocumentMeta;
  settings: ReaderSettings;
  position: ReaderPosition | undefined;
  onReadyChange?: (ready: boolean) => void;
  onUserNavigate?: (pos: ReaderPosition) => void; 
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  document,
  settings,
  position,
  onReadyChange,
  onUserNavigate,
}) => {
  const flow = settings.layoutMode === 'scroll' ? 'scrolled-doc' : 'paginated'; // both supported by the lib :contentReference[oaicite:4]{index=4}
  const { goToLocation, getCurrentLocation } = useReader();
  const [isReady, setIsReady] = useState(false);
  const [hasRestored, setHasRestored] = useState(false);

  const enableSwipe =
    settings.layoutMode === 'paged' &&
    ['swipe', 'swipeAndButtons', 'all'].includes(settings.pageTurnControl);

  useEffect(() => {
    setHasRestored(false);
    setIsReady(false);
  }, [document.id]);

  const handleStarted = useCallback(() => {
    onReadyChange?.(false);
    setIsReady(false);
    setHasRestored(false);
  }, [onReadyChange]);

  const handleReady = useCallback(() => {
    onReadyChange?.(true);
    setIsReady(true);
    console.log('Reader is ready');
  }, [onReadyChange]);

  useEffect(() => {
    if (!isReady || hasRestored) return;

    if (position?.epubCfi) {
      console.log('Restoring to saved position', position.epubCfi);
      setHasRestored(true);
      goToLocation(position.epubCfi);
    } else {
      // Nothing to restore, but we still mark as done so normal tracking can start
      setHasRestored(true);
    }
  }, [isReady, hasRestored, position?.epubCfi, goToLocation]);

  const handleDisplayError = useCallback(() => {
    onReadyChange?.(false);
    setIsReady(false);
    setHasRestored(false);
  }, [onReadyChange]);
  
  return (
    <View style={styles.container}>
      <Reader
        src={document.uri}
        fileSystem={useFileSystem}
        flow={flow}
        enableSwipe={enableSwipe}
        enableSelection
        onSelected={(cfiRange, contents) => {
          // later
        }}

        onLocationChange={(_, currentLocation) => {
          const nextPos = locationToReaderPosition(currentLocation);

          if (!hasRestored && position?.epubCfi) {
            return;
          }
          onUserNavigate?.(nextPos);
        }}

        onStarted={handleStarted}
        onReady={handleReady}
        onDisplayError={handleDisplayError}
        renderLoadingFileComponent={({
          fileSize,
          downloadProgress,
          downloadSuccess,
          downloadError,
        }) => {
          const pct = Math.round((downloadProgress ?? 0) * 100);

          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 16,
              }}
            >
              <ActivityIndicator size="large" />
              <Text style={{ marginTop: 8 }}>
                {downloadSuccess ? 'Opening book…' : `Loading book… ${pct}%`}
              </Text>
              {downloadError && (
                <Text style={{ marginTop: 8, color: 'red' }}>Error: {String(downloadError)}</Text>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1 },
});
