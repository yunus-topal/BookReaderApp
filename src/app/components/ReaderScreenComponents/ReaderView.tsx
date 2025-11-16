import { DocumentMeta, ReaderPosition, ReaderSettings } from '@app/types';
import React, { useImperativeHandle } from 'react';
import { StyleSheet, View } from 'react-native';
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
    //console.log('FSModule =>', FSModule);

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

    const flow =
      settings.layoutMode === 'scroll'
        ? 'scrolled-doc'
        : 'paginated'; // both supported by the lib :contentReference[oaicite:4]{index=4}

    const enableSwipe =
      settings.layoutMode === 'paged' &&
      ['swipe', 'swipeAndButtons', 'all'].includes(
        settings.pageTurnControl,
      );

    return (
      <View style={styles.container}>
        {/* <Reader
          // Local epub/opf path from your DocumentMeta
          src={document.uri}
          fileSystem={useFileSystem}
          flow={flow}
          enableSwipe={enableSwipe}
          enableSelection={true} // needed for future word selection
          initialLocation={position?.location}
          // onLocationChange={(epubCfi: string) => {
          //   // You can later improve progressFraction using locations API
          //   onPositionChange({
          //     location: epubCfi,
          //     progressFraction: position?.progressFraction ?? 0,
          //   });
          // }}
          onSelected={(cfiRange, contents) => {
            // Hook for text selection → translation
            // You’ll get the CFI, you can use epub.js APIs / JS injection
            // to get the selected text if you want, or rely on menuItems.
          }}
          // Later: map ReaderSettings to font size, theme, etc.
          // defaultTheme={...}
        /> */}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: { flex: 1 },
});
