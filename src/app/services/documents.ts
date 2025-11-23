import { defaultSettings, DocumentMeta, ReaderSettings } from '@app/types';
import { getJSON, setJSON } from './storage';

const RECENTS_KEY = 'recents@v1';
const LAST_OPENED_KEY = 'last_opened@v1';
const READER_SETTINGS_KEY = 'reader_settings@v1';
const DOCUMENT_READING_STATES_KEY = 'document_reading_states@v1';

export async function addRecentDocument(doc: DocumentMeta) {
  const existing = await getJSON<DocumentMeta[]>(RECENTS_KEY, []);
  const filtered = existing.filter(d => d.id !== doc.id);
  const recents = [{ ...doc }, ...filtered].slice(0, 25);
  await setJSON(RECENTS_KEY, recents);
  await setJSON(LAST_OPENED_KEY, doc);
}

export async function deleteRecentDocument(documentId: string) {
  const existing = await getJSON<DocumentMeta[]>(RECENTS_KEY, []);
  const recents = existing.filter(d => d.id !== documentId);
  await setJSON(RECENTS_KEY, recents);

  // Optional: clear last opened if it was this doc
  const lastOpened = await getJSON<DocumentMeta | null>(LAST_OPENED_KEY, null);
  if (lastOpened && lastOpened.id === documentId) {
    await setJSON(LAST_OPENED_KEY, null as any);
  }
}

export async function getRecents() {
  return getJSON<DocumentMeta[]>(RECENTS_KEY, []);
}

export async function getLastOpened() {
  return getJSON<DocumentMeta | null>(LAST_OPENED_KEY, null);
}

export async function clearRecents() {
  await setJSON(RECENTS_KEY, [] as DocumentMeta[]);
}

export async function openDocument(doc: DocumentMeta) {
  // TODO: Wire to reader screen once implemented.
  await setJSON(LAST_OPENED_KEY, { ...doc, lastOpenedAt: Date.now() });
  // no-op for now
}

// implement get reader settings and set reader settings
export async function getReaderSettings() {
  return getJSON<ReaderSettings>(READER_SETTINGS_KEY, defaultSettings);
}

export async function setReaderSettings(settings: ReaderSettings) {
  await setJSON(READER_SETTINGS_KEY, settings);
}

export async function getDocumentReadingState(documentId: string) {
  const allStates = await getJSON<Record<string, any>>(DOCUMENT_READING_STATES_KEY, {});
  //console.log('getDocumentReadingState', documentId, allStates[documentId]);
  return allStates[documentId] || null;
}

export async function setDocumentReadingState(state: { documentId: string; position: any }) {
  //console.log('document id and saved cfi: ', state.documentId, state.position.epubCfi);
  const allStates = await getJSON<Record<string, any>>(DOCUMENT_READING_STATES_KEY, {});
  allStates[state.documentId] = state;
  await setJSON(DOCUMENT_READING_STATES_KEY, allStates);
}
