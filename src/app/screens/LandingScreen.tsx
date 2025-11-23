import { View, Text, Pressable, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import SectionHeader from '@app/components/SectionHeader';
import ContinueCard from '@app/components/ContinueCard';
import RecentList from '@app/components/RecentList';
import { useRecentDocs } from '@app/hooks/useRecentDocs';
import { addRecentDocument, deleteRecentDocument, openDocument } from '@app/services/documents';
import { useCallback } from 'react';
import createStyles from './LandingScreenStyles';
import { DocumentMeta } from '@app/types';
import { HomeStackParamList } from '@app/navigation/HomeStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as RNFS from '@dr.pogodin/react-native-fs';
import { DocumentPickerResponse } from 'react-native-document-picker';

type Props = NativeStackScreenProps<HomeStackParamList, 'Landing'>;

const LandingScreen: React.FC<Props> = ({ navigation }) => {
  const { recents, lastOpened, refresh } = useRecentDocs();
  const styles = createStyles();

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh]),
  );

  const handleDeleteRecent = useCallback(async (doc: DocumentMeta) => {
    await deleteRecentDocument(doc.id);
    // optimistic UI update
    refresh();
  }, []);

  const onPickDocument = useCallback(async () => {
    try {
      const mod = await import('react-native-document-picker').catch(() => null);
      if (!mod) {
        Alert.alert(
          'Document Picker not installed',
          'Install react-native-document-picker to enable file picking. For now, a demo file will be added.',
        );
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
        type: ['application/epub+zip'],
        copyTo: 'cachesDirectory',
        presentationStyle: 'fullScreen',
      });

      const safeUri = await getSafeFileUri(res);

      console.log('Picked URIs', {
        uri: res.uri,
        fileCopyUri: res.fileCopyUri,
        safeUri,
      });

      await addRecentDocument({
        id: res.name + ':' + (res.size ?? 0),
        name: res.name ?? 'Document',
        uri: safeUri, 
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

  const handleOpen = async (doc: DocumentMeta) => {
    await openDocument(doc); // persist "last opened"
    navigation.navigate('Reader', { document: doc });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Text style={styles.title}>Your Library</Text>
        <Pressable style={styles.pickBtn} onPress={onPickDocument}>
          <Text style={styles.pickBtnText}>Pick a document</Text>
        </Pressable>
      </View>

      {lastOpened && (
        <>
          <SectionHeader title="Continue reading" />
          <ContinueCard document={lastOpened} onPress={() => handleOpen(lastOpened)} />
        </>
      )}

      <SectionHeader
        title="Recent"
        actionLabel={recents.length > 0 ? 'Clear' : undefined}
        onAction={async () => {
          const { clearRecents } = await import('../services/documents');
          await clearRecents();
          await refresh();
        }}
      />

      <RecentList data={recents} onPressItem={(doc: DocumentMeta) => handleOpen(doc)} onDeleteItem={handleDeleteRecent}/>
    </View>
  );
};

function inferType(name: string): 'epub' | 'pdf' | 'txt' | 'unknown' {
  const lower = name.toLowerCase();
  if (lower.endsWith('.epub')) return 'epub';
  if (lower.endsWith('.pdf')) return 'pdf';
  if (lower.endsWith('.txt')) return 'txt';
  return 'unknown';
}

async function getSafeFileUri(res: DocumentPickerResponse): Promise<string> {
  const base = res.fileCopyUri ?? res.uri;

  if (!base) {
    throw new Error('Picker did not return a URI');
  }

  // We always copy into the app's documents dir
  const fileName = res.name ?? `book-${Date.now()}.epub`;
  const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

  console.log('Copying picked file', { from: base, to: destPath });

  try {
    await RNFS.copyFile(base, destPath);
  } catch (err) {
    console.log('RNFS.copyFile error', err);
    throw err;
  }

  // Reader wants a file:// URI string
  return `file://${destPath}`;
}

export default LandingScreen;
