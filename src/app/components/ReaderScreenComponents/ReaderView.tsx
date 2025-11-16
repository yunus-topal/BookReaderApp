import { DocumentMeta, ReaderPosition, ReaderSettings } from "@app/types";
import React, { useImperativeHandle, useRef } from "react";
import { StyleSheet, View } from "react-native";

// If you want imperative controls from outside:
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
    const scrollRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      goToNext: () => {
        if (settings.layoutMode === 'scroll') {
          // Scroll down by viewport height
          scrollRef.current?.scrollTo({
            y: (scrollRef.current?._value ?? 0) + 400, // refine with layout measurements
            animated: true,
          });
        } else {
          // paged: call EPUB engine's "nextPage"
          // epubViewRef.current?.nextPage();
        }
      },
      goToPrev: () => {
        if (settings.layoutMode === 'scroll') {
          scrollRef.current?.scrollTo({
            y: Math.max((scrollRef.current?._value ?? 0) - 400, 0),
            animated: true,
          });
        } else {
          // epubViewRef.current?.prevPage();
        }
      },
    }));

    // TODO: load EPUB from document.uri and render

    if (settings.layoutMode === 'scroll') {
      return (
        <View style={styles.container}>
          {/* Replace with EPUB renderer output in a ScrollView */}
          {/* Example with ScrollView to show concept */}
          {/* <ScrollView
            ref={scrollRef}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            <EPUBScrollRenderer
              uri={document.uri}
              initialLocation={position.location}
              onLocationChange={...}
            />
          </ScrollView> */}
        </View>
      );
    }

    // Paged mode (swipe horizontally, each page screen-sized)
    return (
      <View style={styles.container}>
        {/* For paged, use something like a FlatList horizontal paging,
            or the EPUB lib's own paging widget */}
        {/* <PagedEPUBRenderer
          uri={document.uri}
          initialLocation={position.location}
          onLocationChange={...}
          enableSwipe={['swipe','swipeAndButtons','all'].includes(settings.pageTurnControl)}
        /> */}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: { flex: 1 },
});