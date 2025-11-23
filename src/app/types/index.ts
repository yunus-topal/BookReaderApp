import { Location } from '@epubjs-react-native/core';

export type SupportedDocType = 'epub' | 'pdf' | 'txt' | 'unknown';
export * from './readerSettingTypes'; // placeholder for other types

export interface DocumentMeta {
  id: string; // stable id for a file (you can evolve this later)
  name: string; // filename for display
  uri: string; // local file uri
  type: SupportedDocType; // inferred type
  coverUri?: string; // optional small cover preview
  lastPosition: number; // 0..1 progress fraction
  lastOpenedAt: number; // epoch millis
  //readingState: DocumentReadingState;
}

export interface ReaderPosition {
  // Canonical locator in the book (EPUB CFI)
  epubCfi: string | null;

  // Spine href / chapter
  href: string | null;

  // 0–1 fraction for overall book progress
  progressFraction: number;

  // For showing "Page X of Y" on the current screen
  displayedPage: number | null;
  displayedTotal: number | null;

  // Optional flags
  atStart?: boolean;
  atEnd?: boolean;
}

export interface DocumentReadingState {
  documentId: string;
  position: ReaderPosition;
}

export function locationToReaderPosition(loc: Location): ReaderPosition {
  const anchor = loc.start ?? loc.end;
  //console.log('Mapping location to ReaderPosition', loc);

  return {
    epubCfi: anchor?.cfi ?? null,
    href: anchor?.href ?? null,
    progressFraction: anchor?.percentage ?? 0,
    displayedPage: anchor?.displayed?.page ?? null,
    displayedTotal: anchor?.displayed?.total ?? null,
    atStart: loc.atStart,
    atEnd: loc.atEnd,
  };
}