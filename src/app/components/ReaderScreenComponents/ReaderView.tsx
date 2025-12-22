import {
  DocumentMeta,
  locationToReaderPosition,
  READER_THEMES,
  ReaderFontFamily,
  ReaderFontSize,
  ReaderPosition,
  ReaderSettings,
} from '@app/types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Reader, useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';
import { ReaderControlsBar } from './ReaderControlsBar';
import { useReaderSettings } from '@app/hooks/useReaderSettingsStore';

export interface ReaderViewProps {
  document: DocumentMeta;
  position: ReaderPosition | undefined;
  onUserNavigate?: (pos: ReaderPosition) => void;
}

const fontFamilyForSettings = (font: ReaderFontFamily) => {
  switch (font) {
    case 'serif':
      return 'serif';
    case 'sans-serif':
      return 'sans-serif';
    case 'monospace':
      return 'monospace';
    default:
      return 'serif';
  }
};

const FONT_SIZE_PERCENT: Record<ReaderFontSize, string> = {
  xsmall: '85%',
  small: '92%',
  medium: '100%',
  large: '108%',
  xlarge: '116%',
};

const buildThemeFromSettings = (settings: ReaderSettings) => {
  const base = READER_THEMES[settings.theme];
  const fontFamily = fontFamilyForSettings(settings.fontFamily);
  const fontSize = FONT_SIZE_PERCENT[settings.fontSize] ?? '100%';

  return {
    ...base,
    body: {
      ...(base.body || {}),
      'font-family': fontFamily,
      //'font-family': 'serif',
      //'font-family': 'sans-serif',
      //'font-family': 'monospace',
      'font-size': fontSize,
    },
  };
};

export const ReaderView: React.FC<ReaderViewProps> = ({ document, position, onUserNavigate }) => {
  const { settings, updateSettings } = useReaderSettings();
  const { layoutMode, pageTurnControl } = settings;

  const { goToLocation, goNext, goPrevious, changeTheme } = useReader();
  const [isReady, setIsReady] = useState(false);
  const [hasRestored, setHasRestored] = useState(false);

  const [controlsVisible, setControlsVisible] = useState(false);
  const [settingsExpanded, setSettingsExpanded] = useState(false);

  const flow = layoutMode === 'scroll' ? 'scrolled' : 'paginated';
  const enableSwipe =
    pageTurnControl === 'swipe' ||
    pageTurnControl === 'swipeAndButtons' ||
    pageTurnControl === 'all';

  const defaultThemeRef = useRef(buildThemeFromSettings(settings));

  const suppressSingleTapUntilRef = useRef(0);
  const suppressSingleTapFor = (ms: number) => {
    suppressSingleTapUntilRef.current = Date.now() + ms;
  };

  const shouldSuppressSingleTap = () => Date.now() < suppressSingleTapUntilRef.current;

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

  //console.log('ReaderView settings', settings);

  return (
    <View style={[styles.container]}>
      <Reader
        src={document.uri}
        fileSystem={useFileSystem}
        flow={flow}
        defaultTheme={defaultThemeRef.current}
        enableSwipe={enableSwipe}
        enableSelection
        onSingleTap={() => {
          if (shouldSuppressSingleTap()) return;
          console.log('ReaderView: onSingleTap');
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

      {/* Tap-zones overlay */}
      <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
        <View pointerEvents="box-none" style={styles.tapRow}>
          <Pressable
            style={styles.tapLeft}
            onPressIn={() => suppressSingleTapFor(350)}
            onPress={() => goPrevious?.()}
          />

          <Pressable
            style={styles.tapRight}
            onPressIn={() => suppressSingleTapFor(350)}
            onPress={() => goNext?.()}
          />
        </View>
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
    ...StyleSheet.absoluteFill,
  },
  tapLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '18%', // ~18–20% side strip
  },
  tapRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '18%',
  },
});
