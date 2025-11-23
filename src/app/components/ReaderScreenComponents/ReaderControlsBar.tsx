import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';

interface Props {
  visible: boolean;
  expanded: boolean;
  onToggleVisible: () => void;
  onToggleExpanded: () => void;
  // later: pass reader settings and updater here
}

export function ReaderControlsBar({
  visible,
  expanded,
  onToggleVisible,
  onToggleExpanded,
}: Props) {
  if (!visible) return null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Reader settings</Text>

        <IconButton
          icon={expanded ? 'chevron-down' : 'chevron-up'}
          size={20}
          onPress={onToggleExpanded}
        />
      </View>

      {/* Expanded content */}
      {expanded && (
        <View style={styles.content}>
          <Text style={styles.label}>Background</Text>
          <Text style={styles.label}>Font</Text>
          {/* More settings here later */}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: 'rgba(15,23,42,0.96)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(148,163,184,0.6)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 14,
    color: '#e5e7eb',
  },
  content: {
    marginTop: 8,
    gap: 8,
  },
  label: {
    fontSize: 12,
    color: '#9ca3af',
  },
});
