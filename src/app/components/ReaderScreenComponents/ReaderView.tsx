import { DocumentMeta, ReaderPosition, ReaderSettings } from '@app/types';
import React, { useCallback } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Reader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';

export interface ReaderViewProps {
  document: DocumentMeta;
  settings: ReaderSettings;
  position: ReaderPosition | undefined;
  onPositionChange: (pos: ReaderPosition) => void;
  onReadyChange?: (ready: boolean) => void;
}

export const ReaderView: React.FC<ReaderViewProps> =
  ({ document, settings, position, onPositionChange, onReadyChange }) => {

    const flow = settings.layoutMode === 'scroll' ? 'scrolled-doc' : 'paginated'; // both supported by the lib :contentReference[oaicite:4]{index=4}

    const enableSwipe =
      settings.layoutMode === 'paged' &&
      ['swipe', 'swipeAndButtons', 'all'].includes(settings.pageTurnControl);

    const handleStarted = useCallback(() => {
      onReadyChange?.(false);
    }, [onReadyChange]);

    const handleReady = useCallback(() => {
      onReadyChange?.(true);
    }, [onReadyChange]);

    const handleDisplayError = useCallback(() => {
      onReadyChange?.(false);
    }, [onReadyChange]);

    return (
      <View style={styles.container}>
        <Reader
          src={document.uri}
          fileSystem={useFileSystem}
          flow={flow}
          enableSwipe={enableSwipe}
          enableSelection
          initialLocation={position?.location}
          onSelected={(cfiRange, contents) => {
            // later
          }}
          onLocationChange={(location, progressFraction) => {
            //
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
            console.log('EPUB loading state', {
              fileSize,
              downloadProgress,
              downloadSuccess,
              downloadError,
              src: document.uri,
            });
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
  },
);

const styles = StyleSheet.create({
  container: { flex: 1 },
});
