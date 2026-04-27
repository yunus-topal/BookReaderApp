import { DictionaryEntry } from "@app/types/dictionaryTypes";
import { getJSON, setJSON } from "./storage";


const DICTIONARY_KEY = 'dictionary@V1';

export function getDictionary() {
  return getJSON<Record<string, DictionaryEntry>>(DICTIONARY_KEY, {});
}

export async function setDictionaryEntry(entry: DictionaryEntry) {
  const dict = await getDictionary();

  const updated = {
    ...dict,
    [entry.id]: entry,
  };

  await setJSON(DICTIONARY_KEY, updated);
}

export async function deleteDictionaryEntry(id: string) {
  const dict = await getDictionary();
  const { [id]: _, ...rest } = dict;
  await setJSON(DICTIONARY_KEY, rest);
}

export function generateDictionaryEntryId(documentId: string) {
  return `${documentId}-${Date.now()}`;
}