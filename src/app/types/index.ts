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
  // This depends on your EPUB lib (CFI, spine index, etc).
  // Keep it generic for now:
  location: string | undefined; // e.g. EPUB CFI, or "chapterId#offset"
  progressFraction: number; // 0..1 as in DocumentMeta.lastPosition
}

export interface DocumentReadingState {
  documentId: string;
  position: ReaderPosition;
}