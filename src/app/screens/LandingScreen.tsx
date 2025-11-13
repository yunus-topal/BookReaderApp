import {
  View,
  Text,
  Pressable,
  Alert,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import SectionHeader from '@app/components/SectionHeader';
import ContinueCard from '@app/components/ContinueCard';
import RecentList from '@app/components/RecentList';
import { useRecentDocs } from '@app/hooks/useRecentDocs';
import { addRecentDocument, openDocument } from '@app/services/documents';
import { useCallback } from 'react';
import createLandingStyles from './LandingScreenStyles';
import { useAppTheme } from '@theme/ThemeProvider';

export default function LandingScreen() {
  const { theme } = useAppTheme();
  const { recents, lastOpened, refresh } = useRecentDocs();
  const styles = createLandingStyles(theme);

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const onPickDocument = useCallback(async () => {
    try {
      // Lazy import to avoid build errors if the native module isn't installed yet.
      const mod = await import('react-native-document-picker').catch(
        () => null,
      );
      if (!mod) {
        Alert.alert(
          'Document Picker not installed',
          'Install react-native-document-picker to enable file picking. For now, a demo file will be added.',
        );
        // Demo: add a fake document so UI can be tested.
        await addRecentDocument({
          id: String(Date.now()),
          name: 'Demo Book.epub',
          uri: 'file:///storage/emulated/0/Books/demo.epub',
          type: 'epub',
          coverUri: undefined,
          lastPosition: 0,
          lastOpenedAt: Date.now(),
        });
        await refresh();
        return;
      }

      const DocumentPicker = mod.default;
      const res = await DocumentPicker.pickSingle({
        type: ['application/epub+zip'], // EPUB MIME type
        copyTo: 'cachesDirectory',
        presentationStyle: 'fullScreen',
      });

      await addRecentDocument({
        id: res.name + ':' + (res.size ?? 0),
        name: res.name ?? 'Document',
        uri: res.fileCopyUri ?? res.uri,
        type: inferType(res.name ?? ''),
        coverUri: undefined,
        lastPosition: 0,
        lastOpenedAt: Date.now(),
      });

      await refresh();
    } catch (e: any) {
      if (!e?.message?.includes('User canceled')) {
        Alert.alert('Could not pick document', String(e?.message ?? e));
      }
    }
  }, [refresh]);

  const onContinue = useCallback(async () => {
    if (!lastOpened) return;
    await openDocument(lastOpened);
  }, [lastOpened]);

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.title}>Your Library</Text>
        <Pressable style={styles.pickBtn} onPress={onPickDocument}>
          <Text style={styles.pickBtnText}>Pick a document</Text>
        </Pressable>
      </View>

      <SectionHeader title="Continue reading" />
      <ContinueCard document={lastOpened} onPress={onContinue} />

      <SectionHeader
        title="Recent"
        actionLabel={recents.length > 0 ? 'Clear' : undefined}
        onAction={async () => {
          const { clearRecents } = await import('../services/documents');
          await clearRecents();
          await refresh();
        }}
      />

      <RecentList data={recents} onPressItem={openDocument} />
    </View>
  );
}

function inferType(name: string): 'epub' | 'pdf' | 'txt' | 'unknown' {
  const lower = name.toLowerCase();
  if (lower.endsWith('.epub')) return 'epub';
  if (lower.endsWith('.pdf')) return 'pdf';
  if (lower.endsWith('.txt')) return 'txt';
  return 'unknown';
}