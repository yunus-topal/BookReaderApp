import { StyleSheet } from "react-native";

export const readerViewStyles = () => StyleSheet.create({
  container: { flex: 1 },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    marginTop: 8,
  },
  loadingError: {
    marginTop: 8,
    color: 'red',
  },

  tapRow: {
    ...StyleSheet.absoluteFill,
  },
  tapLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '18%', // ~18–20% side strip
  },
  tapRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '18%',
  },
});
