import { useAppTheme } from "@theme/ThemeProvider";
import { StyleSheet } from "react-native";

// todo: use palette and theme for constant values for colors and spacings.
const createStyles = () => {
  const { theme } = useAppTheme();
  const palette = theme.appPalette;
    return StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  centerWrap: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  card: {
    borderRadius: 16,
    backgroundColor: "#121212",
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  closeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 18,
  },
  langRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 12,
  },
  langPill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
  },
  langPillText: {
    color: "#fff",
    fontWeight: "600",
  },
  swapBtn: {
    width: 44,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  swapBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  sectionLabel: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 12,
    marginBottom: 6,
    marginTop: 6,
  },
  textBox: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
    backgroundColor: "rgba(255,255,255,0.06)",
    padding: 10,
    minHeight: 90,
  },
  textInput: {
    color: "#fff",
    fontSize: 15,
    minHeight: 70,
    textAlignVertical: "top",
  },
  outputBox: {
    minHeight: 90,
  },
  outputText: {
    color: "#fff",
    fontSize: 15,
  },
  outputTextMuted: {
    color: "rgba(255,255,255,0.4)",
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    marginBottom: 6,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.14)",
  },
  secondaryBtn: {
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  actionBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
  errorBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(220,53,53,0.18)",
    borderWidth: 1,
    borderColor: "rgba(220,53,53,0.45)",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 8,
    marginBottom: 2,
  },
  errorIcon: {
    fontSize: 15,
  },
  errorText: {
    flex: 1,
    color: "#ff8080",
    fontSize: 13,
    fontWeight: "500",
  },
  errorDismiss: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  errorDismissText: {
    color: "#ff8080",
    fontSize: 14,
    fontWeight: "700",
  },
  // ── Toast ──
  toast: {
    position: "absolute",
    bottom: 32,
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 8,
  },
  toastSuccess: {
    backgroundColor: "#1a6e3c",
    borderWidth: 1,
    borderColor: "rgba(52,211,100,0.35)",
  },
  toastError: {
    backgroundColor: "#6e1a1a",
    borderWidth: 1,
    borderColor: "rgba(211,52,52,0.35)",
  },
  toastText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  // ── Duplicate overlay ──
  dupeOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  dupeCard: {
    width: "100%",
    backgroundColor: "#1c1c1e",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "rgba(255,200,0,0.25)",
  },
  dupeTitle: {
    color: "#ffd060",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },
  dupeBody: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  dupeWord: {
    color: "#fff",
    fontWeight: "700",
  },
  dupeDefinition: {
    color: "rgba(255,255,255,0.6)",
    fontStyle: "italic",
  },
  dupeQuestion: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 13,
    marginBottom: 16,
  },
  dupeActions: {
    flexDirection: "row",
    gap: 10,
  },
  dupeBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 12,
    alignItems: "center",
  },
  dupeBtnCancel: {
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  dupeBtnConfirm: {
    backgroundColor: "rgba(255,200,0,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,200,0,0.35)",
  },
  dupeBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});
}

export default createStyles;