export type SupportedDocType = 'epub' | 'pdf' | 'txt' | 'unknown';

export interface DocumentMeta {
  id: string; // stable id for a file (you can evolve this later)
  name: string; // filename for display
  uri: string; // local file uri
  type: SupportedDocType; // inferred type
  coverUri?: string; // optional small cover preview
  lastPosition: number; // 0..1 progress fraction
  lastOpenedAt: number; // epoch millis
}
