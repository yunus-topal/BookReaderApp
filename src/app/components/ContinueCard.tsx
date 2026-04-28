import { useEffect, useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { DocumentMeta, DocumentReadingState } from '@app/types';
import createStyles from './ContinueCardStyles';
import { getDocumentReadingState } from '@app/services/documents';
import { useIsFocused } from '@react-navigation/native';

interface Props {
  document?: DocumentMeta | null;
  onPress?: () => void;
}

export default function ContinueCard({ document, onPress }: Props) {
  const styles = createStyles();
  const isFocused = useIsFocused();
  const [readingState, setReadingState] = useState<DocumentReadingState | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadProgress() {
      // If document or ID is missing, reset state and exit
      if (!document?.id) {
        setReadingState(null);
        return;
      }

      try {
        const state = await getDocumentReadingState(document.id);
        if (isMounted) {
          setReadingState(state);
        }
      } catch (error) {
        console.error("Failed to load reading progress:", error);
      }
    }

    if (isFocused) {
      loadProgress();
    }

    // Cleanup to prevent state updates on unmounted components
    return () => {
      isMounted = false;
    };
  }, [document?.id, isFocused]);



  if (!document) {
    return (
      <View style={[styles.card, styles.empty]}>
        <Text style={styles.emptyText}>
          No recent book. Pick one to start reading.
        </Text>
      </View>
    );
  }

  const progressPercent = ((readingState?.position?.progress ?? 0) * 100).toFixed(1);
  
  return (
    <Pressable style={styles.card} onPress={onPress}>
      {document.coverUri ? (
        <Image source={{ uri: document.coverUri }} style={styles.cover} />
      ) : (
        <View style={[styles.cover, styles.coverPlaceholder]} />
      )}
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={styles.name}>
          {document.name}
        </Text>
        <Text style={styles.meta}>
          Progress: {progressPercent}%
        </Text>
      </View>
    </Pressable>
  );
}

