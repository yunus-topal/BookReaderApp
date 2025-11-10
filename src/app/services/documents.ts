import { DocumentMeta } from "@app/types";
import { getJSON, setJSON } from "./storage";

const RECENTS_KEY = 'recents@v1';
const LAST_OPENED_KEY = 'last_opened@v1';

export async function addRecentDocument(doc: DocumentMeta) {
  const existing = await getJSON<DocumentMeta[]>(RECENTS_KEY, []);
  const filtered = existing.filter(d => d.id !== doc.id);
  const recents = [{ ...doc }, ...filtered].slice(0, 25);
  await setJSON(RECENTS_KEY, recents);
  await setJSON(LAST_OPENED_KEY, doc);
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
