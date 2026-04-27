import { useEffect, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { useDeepLTranslation } from "./useDeepLTranslation";
import { generateDictionaryEntryId, getDictionary, setDictionaryEntry } from "@app/services/dictionary";
import createStyles from "./TranslateDialogStyles";

type ToastState = { message: string; type: "success" | "error" } | null;

type TranslateDialogProps = {
  documentId: string;
  documentName: string;
  isVisible: boolean;
  text: string;
  onClose: () => void;
};

type Lang = "EN" | "DE";

export default function TranslateDialog({
  documentId,
  documentName,
  isVisible,
  text,
  onClose,
}: TranslateDialogProps) {
  const styles = createStyles();
  const [fromLang, setFromLang] = useState<Lang>("EN");
  const [toLang, setToLang] = useState<Lang>("DE");

  const [inputText, setInputText] = useState<string>(text ?? "");
  const [outputText, setOutputText] = useState<string>("");
  const [dismissedError, setDismissedError] = useState<string | null>(null);
  const errorAnim = useRef(new Animated.Value(0)).current;

  const [toast, setToast] = useState<ToastState>(null);
  const toastAnim = useRef(new Animated.Value(0)).current;
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [pendingDuplicate, setPendingDuplicate] = useState<{
    existingEntry: { germanText: string; englishDefinition: string };
    newEntry: Parameters<typeof setDictionaryEntry>[0];
  } | null>(null);
  
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

  const showToast = (message: string, type: "success" | "error") => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ message, type });
    Animated.spring(toastAnim, { toValue: 1, useNativeDriver: true, tension: 120, friction: 10 }).start();
    toastTimer.current = setTimeout(() => {
      Animated.timing(toastAnim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() =>
        setToast(null)
      );
    }, 2800);
  };

  const saveToDictionary = async (force = false) => {
    if (!inputText.trim() || !outputText.trim()) return;
    const germanText = fromLang === "DE" ? inputText : outputText;
    const englishDefinition = fromLang === "EN" ? inputText : outputText;
    const samples: string[] = [];
    const entry = {
      id: generateDictionaryEntryId(documentId),
      documentId,
      documentName,
      germanText,
      englishDefinition,
      samples,
    };

    if (!force) {
      try {
        const dict = await getDictionary();
        const duplicate = Object.values(dict).find(
          (e) => e.germanText.trim().toLowerCase() === germanText.trim().toLowerCase()
        );
        if (duplicate) {
          setPendingDuplicate({ existingEntry: duplicate, newEntry: entry });
          return;
        }
      } catch {
        // If we can't read the dictionary, proceed with save
      }
    }

    try {
      await setDictionaryEntry(entry);
      showToast("Saved to dictionary ✓", "success");
    } catch {
      showToast("Failed to save. Please try again.", "error");
    }
  };

  const confirmDuplicateSave = async () => {
    if (!pendingDuplicate) return;
    setPendingDuplicate(null);
    try {
      await setDictionaryEntry(pendingDuplicate.newEntry);
      showToast("Saved to dictionary ✓", "success");
    } catch {
      showToast("Failed to save. Please try again.", "error");
    }
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
              <Pressable onPress={() => saveToDictionary()} style={styles.actionBtn}>
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

      {/* ── Duplicate warning ── */}
      {pendingDuplicate && (
        <View style={styles.dupeOverlay}>
          <View style={styles.dupeCard}>
            <Text style={styles.dupeTitle}>Already in Dictionary</Text>
            <Text style={styles.dupeBody}>
              <Text style={styles.dupeWord}>"{pendingDuplicate.existingEntry.germanText}"</Text>
              {" "}is already saved with the definition:{"\n"}
              <Text style={styles.dupeDefinition}>"{pendingDuplicate.existingEntry.englishDefinition}"</Text>
            </Text>
            <Text style={styles.dupeQuestion}>Do you want to add it again?</Text>
            <View style={styles.dupeActions}>
              <Pressable onPress={() => setPendingDuplicate(null)} style={[styles.dupeBtn, styles.dupeBtnCancel]}>
                <Text style={styles.dupeBtnText}>Cancel</Text>
              </Pressable>
              <Pressable onPress={confirmDuplicateSave} style={[styles.dupeBtn, styles.dupeBtnConfirm]}>
                <Text style={styles.dupeBtnText}>Add Anyway</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      {/* ── Toast ── */}
      {toast && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.toast,
            toast.type === "error" ? styles.toastError : styles.toastSuccess,
            {
              opacity: toastAnim,
              transform: [{ translateY: toastAnim.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }],
            },
          ]}
        >
          <Text style={styles.toastText}>{toast.message}</Text>
        </Animated.View>
      )}
    </Modal>
  );
}

