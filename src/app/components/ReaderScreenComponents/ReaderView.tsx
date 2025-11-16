import { DocumentMeta, ReaderPosition, ReaderSettings } from '@app/types';
import React, { useImperativeHandle } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Reader, useReader } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/file-system';

export interface ReaderViewHandle {
  goToNext: () => void;
  goToPrev: () => void;
}

export interface ReaderViewProps {
  document: DocumentMeta;
  settings: ReaderSettings;
  position: ReaderPosition | undefined;
  onPositionChange: (pos: ReaderPosition) => void;
}

export const ReaderView = React.forwardRef<ReaderViewHandle, ReaderViewProps>(
  ({ document, settings, position, onPositionChange }, ref) => {

    const { goNext, goPrevious } = useReader();

    // Expose imperative controls to parent
    useImperativeHandle(ref, () => ({
      goToNext: () => {
        // Let the EPUB engine handle paging/scroll jumps
        goNext();
      },
      goToPrev: () => {
        goPrevious();
      },
    }));

    const flow = settings.layoutMode === 'scroll' ? 'scrolled-doc' : 'paginated'; // both supported by the lib :contentReference[oaicite:4]{index=4}

    const enableSwipe =
      settings.layoutMode === 'paged' &&
      ['swipe', 'swipeAndButtons', 'all'].includes(settings.pageTurnControl);

    console.log('document.uri', document.uri);
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

            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ActivityIndicator />
                <Text style={{ marginTop: 8 }}>Opening…</Text>
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
