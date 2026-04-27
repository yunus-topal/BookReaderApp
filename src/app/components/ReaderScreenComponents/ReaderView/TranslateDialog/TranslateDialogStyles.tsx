import { baseColors } from "@theme/colors";
import { sizes } from "@theme/sizes";
import { spacing } from "@theme/spacing";
import { useAppTheme } from "@theme/ThemeProvider";
import { StyleSheet } from "react-native";

const createStyles = () => {
  const { theme } = useAppTheme();
  const palette = theme.appPalette;
  const isDark = palette.mode === 'dark';

  return StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: palette.overlay || "rgba(0,0,0,0.45)",
    },
    centerWrap: {
      flex: 1,
      justifyContent: "center",
      padding: spacing.lg,
    },
    card: {
      borderRadius: sizes.radiusLg,
      backgroundColor: palette.surface,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: palette.border,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: spacing.sm,
    },
    headerTitle: {
      color: palette.title,
      fontSize: 18,
      fontWeight: "700",
    },
    closeBtn: {
      width: 36,
      height: 36,
      borderRadius: sizes.radiusMd,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
    },
    closeText: {
      color: palette.text,
      fontSize: 18,
      fontWeight: "700",
    },
    langRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: spacing.sm,
      marginBottom: spacing.md,
    },
    langPill: {
      flex: 1,
      paddingVertical: spacing.sm,
      borderRadius: 999,
      backgroundColor: palette.surfaceSoft,
      alignItems: "center",
      borderWidth: 1,
      borderColor: palette.border,
    },
    langPillText: {
      color: palette.primary,
      fontWeight: "600",
    },
    swapBtn: {
      width: 44,
      height: 36,
      borderRadius: sizes.radiusMd,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: palette.primary,
    },
    swapBtnText: {
      color: "#fff", // Action icons usually stay white
      fontSize: 18,
      fontWeight: "700",
    },
    sectionLabel: {
      color: palette.subtle,
      fontSize: 12,
      fontWeight: "600",
      marginBottom: spacing.xs,
      marginTop: spacing.xs,
      textTransform: 'uppercase',
    },
    textBox: {
      borderRadius: sizes.radiusMd,
      borderWidth: 1,
      borderColor: palette.border,
      backgroundColor: palette.background,
      padding: spacing.sm,
      minHeight: 90,
    },
    textInput: {
      color: palette.text,
      fontSize: 15,
      minHeight: 70,
      textAlignVertical: "top",
    },
    outputBox: {
      minHeight: 90,
    },
    outputText: {
      color: palette.text,
      fontSize: 15,
    },
    outputTextMuted: {
      color: palette.subtle,
    },
    actionRow: {
      flexDirection: "row",
      gap: spacing.sm,
      marginTop: spacing.sm,
      marginBottom: spacing.xs,
    },
actionBtn: {
      flex: 1,
      paddingVertical: spacing.sm,
      borderRadius: sizes.radiusMd,
      alignItems: "center",
      backgroundColor: palette.primary, // Indigo, Emerald, or Sepia primary
    },
    secondaryBtn: {
      backgroundColor: palette.surfaceSoft, // Adaptive light/dark surface
      borderWidth: 1,
      borderColor: palette.border,
    },
    actionBtnText: {
      color: "#fff", // White text for the primary action
      fontWeight: "700",
    },
    secondaryBtnText: {
      color: palette.text, // Fixes unreadable "Clear" button in light mode
      fontWeight: "700",
    },
    errorBanner: {
      flexDirection: "row",
      alignItems: "center",
      gap: spacing.sm,
      backgroundColor: isDark ? 'rgba(185, 28, 28, 0.15)' : '#fee2e2',
      borderWidth: 1,
      borderColor: palette.danger,
      borderRadius: sizes.radiusMd,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      marginTop: spacing.sm,
    },
    errorIcon: {
      fontSize: 15, // Restored
    },
    errorText: {
      flex: 1,
      color: palette.danger,
      fontSize: 13,
      fontWeight: "600",
    },
    errorDismiss: {
      width: 24, // Restored layout
      height: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    errorDismissText: {
      color: palette.danger,
      fontSize: 14,
      fontWeight: "700", // Restored
    },
    // ── Toast ──
    toast: {
      position: "absolute",
      bottom: spacing.xxl,
      alignSelf: "center",
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.sm,
      borderRadius: 999,
      elevation: 8,
      shadowColor: "#000",
      shadowOpacity: 0.3,
      shadowRadius: 4,
    },
    toastSuccess: {
      backgroundColor: palette.primary, // Or palette.success if added
    },
    toastError: {
        backgroundColor: palette.danger,
    },
    toastText: {
      color: "#fff",
      fontWeight: "600",
    },
    // ── Duplicate overlay ──
    dupeOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: palette.overlay, // Themed overlay color
      justifyContent: "center",
      alignItems: "center",
      padding: spacing.xl,
    },
    dupeCard: {
      width: "100%",
      backgroundColor: palette.surface,
      borderRadius: sizes.radiusLg,
      padding: spacing.lg,
      borderWidth: 1,
      borderColor: palette.warning,
    },
    dupeTitle: {
      color: palette.warning,
      fontSize: 16,
      fontWeight: "700",
      marginBottom: spacing.sm,
    },
    dupeBody: {
      color: palette.text,
      fontSize: 14,
      lineHeight: 20,
      marginBottom: spacing.sm,
    },
    dupeWord: {
      color: palette.title,
      fontWeight: "700",
    },
    dupeDefinition: {
      color: palette.subtle,
      fontStyle: "italic",
    },
    dupeQuestion: {
      color: palette.muted,
      fontSize: 13,
      marginBottom: spacing.lg,
    },
    dupeActions: {
      flexDirection: "row",
      gap: spacing.sm,
    },
    dupeBtn: {
      flex: 1,
      paddingVertical: 11,
      borderRadius: sizes.radiusMd,
      alignItems: "center",
    },
    dupeBtnCancel: {
      backgroundColor: palette.surfaceSoft, // Fixes unreadable "Cancel" button background
      borderWidth: 1,
      borderColor: palette.border,
    },
    dupeBtnConfirm: {
      backgroundColor: palette.warning, // Uses themed warning (Amber in Sepia, Orange in Indigo)
    },
    dupeBtnText: {
      color: isDark ? palette.background : "#fff", // Adaptive contrast for "Add Anyway"
      fontWeight: "700",
      fontSize: 14,
    },
    dupeBtnTextCancel: {
      color: palette.text, // Fixes unreadable "Cancel" text in light mode
      fontWeight: "700",
      fontSize: 14,
    },
  });
};

export default createStyles;