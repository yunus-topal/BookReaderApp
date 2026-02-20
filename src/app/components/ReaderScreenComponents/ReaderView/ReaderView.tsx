import {
  DocumentMeta,
  locationToReaderPosition,
  ReaderPosition,
} from '@app/types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Reader, TapPosition, useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';
import { ReaderControlsBar } from '../ReaderControlsBar';
import { useReaderSettings } from '@app/hooks/useReaderSettingsStore';
import { buildThemeFromSettings } from './ReaderViewConsts';
import { readerViewStyles } from './ReaderViewStyles';

export interface ReaderViewProps {
  document: DocumentMeta;
  position: ReaderPosition | undefined;
  onUserNavigate?: (pos: ReaderPosition) => void;
}


export const ReaderView: React.FC<ReaderViewProps> = ({ document, position, onUserNavigate }) => {
  const { settings, updateSettings } = useReaderSettings();
  const { layoutMode, pageTurnControl } = settings;

  const { goToLocation, goNext, goPrevious, changeTheme } = useReader();
  const [isReady, setIsReady] = useState(false);
  const [hasRestored, setHasRestored] = useState(false);

  const [controlsVisible, setControlsVisible] = useState(false);
  const [settingsExpanded, setSettingsExpanded] = useState(false);

  const styles = readerViewStyles();

  const flow = layoutMode === 'scroll' ? 'scrolled' : 'paginated';
  const enableSwipe =
    pageTurnControl === 'swipe' ||
    pageTurnControl === 'swipeAndButtons' ||
    pageTurnControl === 'all';

  const defaultThemeRef = useRef(buildThemeFromSettings(settings));

  useEffect(() => {
    if (!isReady) return;

    const theme = buildThemeFromSettings(settings);
    changeTheme(theme);
  }, [isReady, settings.theme, settings.fontFamily, settings.fontSize, changeTheme]);

  const toggleControls = () => {
    setControlsVisible(prev => {
      const next = !prev;
      if (!next) setSettingsExpanded(false);
      return next;
    });
  };

  const toggleExpanded = () => setSettingsExpanded(prev => !prev);

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
  }, []);

  useEffect(() => {
    if (!isReady || hasRestored) return;

    if (position?.epubCfi) {
      //console.log('Restoring to saved position', position.epubCfi);
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

  /// handling reader frame measurement

  const readerWrapRef = useRef<View>(null);
  const [readerFrame, setReaderFrame] = useState<{ x: number; width: number } | null>(null);

  // measure in window coordinates
  const measureReaderFrame = useCallback(() => {
    const node = readerWrapRef.current;
    if (!node) return;

    node.measureInWindow((x, _y, width, _height) => {
      setReaderFrame({ x, width });
    });
  }, []);

  useEffect(() => {
    // measure once on mount; also re-measure when layout changes
    measureReaderFrame();
  }, [measureReaderFrame]);

  ///  handling reader frame measurement

  return (
    <View style={[styles.container]}>
      <View
        ref={readerWrapRef}
        style={StyleSheet.absoluteFill}
        onLayout={measureReaderFrame}
        pointerEvents="box-none"
      >
        <Reader
          src={document.uri}
          fileSystem={useFileSystem}
          flow={flow}
          defaultTheme={defaultThemeRef.current}
          enableSwipe={enableSwipe}
          enableSelection
          onSingleTap={(pos: TapPosition) => {
            // Fallback to pos.x if we don't have a measured frame yet
            const frame = readerFrame;
            const width = frame?.width ?? 0;

            // If we can measure, compute local X using absoluteX
            const localX = frame && width > 0 ? pos.absoluteX - frame.x : pos.x;

            if (width > 0) {
              const edge = width * 0.15;

              if (localX <= edge) {
                goPrevious?.();
                return;
              }
              if (localX >= width - edge) {
                goNext?.();
                return;
              }
            }

            toggleControls();
          }}
          onSelected={(cfiRange, contents) => {
            // later
            console.log('Selected', cfiRange);
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
      </View>

      <ReaderControlsBar
        visible={controlsVisible}
        expanded={settingsExpanded}
        onToggleExpanded={toggleExpanded}
        settings={settings}
        updateSettings={updateSettings}
      />
    </View>
  );
};
