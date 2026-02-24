import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

type TranslatorDialogProps = {
  isVisible: boolean;
  text: string;
  onClose: () => void;
};

type Lang = "EN" | "DE";

function dummyTranslate(input: string, from: Lang, to: Lang): string {
  // Replace this with your real translation call later.
  if (!input.trim()) return "";
  return `[${from}→${to}] ${input}`;
}

export default function TranslatorDialog({
  isVisible,
  text,
  onClose,
}: TranslatorDialogProps) {
  const [fromLang, setFromLang] = useState<Lang>("EN");
  const [toLang, setToLang] = useState<Lang>("DE");

  const [inputText, setInputText] = useState<string>(text ?? "");
  const [outputText, setOutputText] = useState<string>("");

  // Keep inputText in sync with prop `text` when the dialog opens / changes.
  useEffect(() => {
    if (isVisible) {
      setInputText(text ?? "");
    }
  }, [isVisible, text]);

  // Compute translation whenever inputs change.
  useEffect(() => {
    setOutputText(dummyTranslate(inputText, fromLang, toLang));
  }, [inputText, fromLang, toLang]);

  const title = useMemo(() => "Translator", []);

  const swapLanguages = () => {
    setFromLang((prev) => (prev === "EN" ? "DE" : "EN"));
    setToLang((prev) => (prev === "EN" ? "DE" : "EN"));
  };

  const swapTexts = () => {
    // Swap the visible content: what was translated becomes input (and vice versa).
    setInputText(outputText);
    // output will auto-recompute via effect
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
              <Text style={styles.headerTitle}>{title}</Text>

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
              <Pressable onPress={swapTexts} style={styles.actionBtn}>
                <Text style={styles.actionBtnText}>Swap texts</Text>
              </Pressable>

              <Pressable
                onPress={() => setInputText("")}
                style={[styles.actionBtn, styles.secondaryBtn]}
              >
                <Text style={styles.actionBtnText}>Clear</Text>
              </Pressable>
            </View>

            {/* Output box */}
            <Text style={styles.sectionLabel}>Translation</Text>
            <View style={[styles.textBox, styles.outputBox]}>
              <Text style={styles.outputText}>
                {outputText || `Translation will appear here (${fromLang}→${toLang}).`}
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
});