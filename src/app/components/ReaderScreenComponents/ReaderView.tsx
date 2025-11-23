import { DocumentMeta, locationToReaderPosition, ReaderPosition, ReaderSettings } from '@app/types';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Reader, useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';
import { IconButton } from 'react-native-paper';
import { ReaderControlsBar } from './ReaderControlsBar';

export interface ReaderViewProps {
  document: DocumentMeta;
  settings: ReaderSettings;
  position: ReaderPosition | undefined;
  onUserNavigate?: (pos: ReaderPosition) => void;
}

export const ReaderView: React.FC<ReaderViewProps> = ({
  document,
  settings,
  position,
  onUserNavigate,
}) => {
  const flow = settings.layoutMode === 'scroll' ? 'scrolled-doc' : 'paginated'; // both supported by the lib :contentReference[oaicite:4]{index=4}
  const { goToLocation, goNext, goPrevious } = useReader();
  const [isReady, setIsReady] = useState(false);
  const [hasRestored, setHasRestored] = useState(false);

  const [controlsVisible, setControlsVisible] = useState(false);
  const [settingsExpanded, setSettingsExpanded] = useState(false);

  const toggleControls = () => {
    setControlsVisible(prev => {
      const next = !prev;
      if (!next) setSettingsExpanded(false);
      return next;
    });
  };

  const toggleExpanded = () => setSettingsExpanded(prev => !prev);

  const enableSwipe =
    settings.layoutMode === 'paged' &&
    ['swipe', 'swipeAndButtons', 'all'].includes(settings.pageTurnControl);

  useEffect(() => {
    setHasRestored(false);
    setIsReady(false);
  }, [document.id]);

  const handleStarted = useCallback(() => {
    setIsReady(false);
    setHasRestored(false);
  }, []);

  const handleReady = useCallback(() => {
    setIsReady(true);
    console.log('Reader is ready');
  }, []);

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
    setIsReady(false);
    setHasRestored(false);
  }, []);

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
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" />
              <Text style={styles.loadingText}>
                {downloadSuccess ? 'Opening book…' : `Loading book… ${pct}%`}
              </Text>
              {downloadError && (
                <Text style={styles.loadingError}>Error: {String(downloadError)}</Text>
              )}
            </View>
          );
        }}
      />

      {/* Tap-zones overlay */}
      <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
        <View style={styles.tapRow}>
          <Pressable style={styles.tapLeft} onPress={() => goPrevious?.()} />
          <Pressable style={styles.tapCenter} onPress={toggleControls} />
          <Pressable style={styles.tapRight} onPress={() => goNext?.()} />
        </View>
      </View>

      <ReaderControlsBar
        visible={controlsVisible}
        expanded={settingsExpanded}
        onToggleVisible={toggleControls}
        onToggleExpanded={toggleExpanded}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    marginTop: 8,
  },
  loadingError: {
    marginTop: 8,
    color: 'red',
  },

  tapRow: {
    flex: 1,
    flexDirection: 'row',
  },
  tapLeft: {
    flex: 3, // ~30%
  },
  tapCenter: {
    flex: 4, // ~40%
  },
  tapRight: {
    flex: 3, // ~30%
  },
});
