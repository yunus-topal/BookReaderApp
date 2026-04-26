import { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { useDeepLTranslation } from "./useDeepLTranslation";

type TranslateDialogProps = {
  isVisible: boolean;
  text: string;
  onClose: () => void;
};

type Lang = "EN" | "DE";

export default function TranslateDialog({
  isVisible,
  text,
  onClose,
}: TranslateDialogProps) {
  const [fromLang, setFromLang] = useState<Lang>("EN");
  const [toLang, setToLang] = useState<Lang>("DE");

  const [inputText, setInputText] = useState<string>(text ?? "");
  const [outputText, setOutputText] = useState<string>("");
  const [dismissedError, setDismissedError] = useState<string | null>(null);
  const errorAnim = useRef(new Animated.Value(0)).current;
  
  const { translate, isLoading, error, last } = useDeepLTranslation({
    defaultTargetLang: "EN-US", // default: English
  });

  // Keep inputText in sync with prop `text` when the dialog opens / changes.
  useEffect(() => {
    if (isVisible) {
      setFromLang("DE");
      setToLang("EN");
      setInputText(text ?? "");
      setOutputText("");
    }
  }, [isVisible, text]);

  // Animate error banner in when a new error arrives, out when dismissed.
  useEffect(() => {
    if (error && error !== dismissedError) {
      Animated.spring(errorAnim, { toValue: 1, useNativeDriver: true, tension: 120, friction: 10 }).start();
    } else {
      Animated.timing(errorAnim, { toValue: 0, duration: 180, useNativeDriver: true }).start();
    }
  }, [error, dismissedError]);
  const dismissError = () => setDismissedError(error ?? null);

  useEffect(() => {
    if (!error) setDismissedError(null);
  }, [error]);

  const runTranslation = async (value: string, targetLang: Lang) => {
    if (!value.trim()) return;
    const deepLTarget = targetLang === "EN" ? "EN-US" : "DE";
    const result = await translate({ text: value, targetLang: deepLTarget });
    if (result) setOutputText(result.output);
  };

  useEffect(() => {
    if (isVisible && inputText.trim()) {
      runTranslation(inputText, toLang);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  useEffect(() => {
    if (!inputText.trim()) {
      setOutputText("");
      return;
    }
    const timer = setTimeout(() => {
      runTranslation(inputText, toLang);
    }, 600);
    return () => clearTimeout(timer);
  }, [inputText, toLang]);

  const swapLanguages = () => {
    setFromLang((prev) => (prev === "EN" ? "DE" : "EN"));
    setToLang((prev) => (prev === "EN" ? "DE" : "EN"));
    // Swap visible texts — the debounce effect will re-translate the new input
    setInputText(outputText);
    setOutputText(inputText);
  };

  const saveToDictionary = () => {
    // TODO: save the current text pair
    console.log("Save to dictionary - not implemented yet");
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <Modal visible={isVisible} transparent animationType="fade" onRequestClose={handleClose}>
      <View style={styles.backdrop}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.centerWrap}
        >
          <View style={styles.card}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Translator</Text>

              <Pressable onPress={handleClose} hitSlop={10} style={styles.closeBtn}>
                <Text style={styles.closeText}>✕</Text>
              </Pressable>
            </View>

            {/* Language row */}
            <View style={styles.langRow}>
              <View style={styles.langPill}>
                <Text style={styles.langPillText}>{fromLang === "EN" ? "English" : "German"}</Text>
              </View>

              <Pressable onPress={swapLanguages} style={styles.swapBtn}>
                <Text style={styles.swapBtnText}>⇄</Text>
              </Pressable>

              <View style={styles.langPill}>
                <Text style={styles.langPillText}>{toLang === "EN" ? "English" : "German"}</Text>
              </View>
            </View>

            {/* Input box */}
            <Text style={styles.sectionLabel}>Input</Text>
            <View style={styles.textBox}>
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                placeholder={`Type ${fromLang === "EN" ? "English" : "German"}...`}
                placeholderTextColor="#888"
                multiline
                style={styles.textInput}
              />
            </View>

            {/* Actions */}
            <View style={styles.actionRow}>
              <Pressable onPress={saveToDictionary} style={styles.actionBtn}>
                <Text style={styles.actionBtnText}>Save to Dictionary</Text>
              </Pressable>

              <Pressable
                onPress={() => setInputText("")}
                style={[styles.actionBtn, styles.secondaryBtn]}
              >
                <Text style={styles.actionBtnText}>Clear</Text>
              </Pressable>
            </View>

            {/* Error banner */}
            {error && error !== dismissedError && (
              <Animated.View
                style={[
                  styles.errorBanner,
                  {
                    opacity: errorAnim,
                    transform: [{ scale: errorAnim.interpolate({ inputRange: [0, 1], outputRange: [0.95, 1] }) }],
                  },
                ]}
              >
                <Text style={styles.errorIcon}>⚠️</Text>
                <Text style={styles.errorText} numberOfLines={2}>
                  {error}
                </Text>
                <Pressable onPress={dismissError} hitSlop={10} style={styles.errorDismiss}>
                  <Text style={styles.errorDismissText}>✕</Text>
                </Pressable>
              </Animated.View>
            )}

            {/* Output box */}
            <Text style={styles.sectionLabel}>Translation</Text>
            <View style={[styles.textBox, styles.outputBox]}>
              <Text style={[styles.outputText, isLoading && styles.outputTextMuted]}>
                {isLoading
                  ? "Translating…"
                  : outputText || `Translation will appear here (${fromLang}→${toLang}).`}
              </Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
});