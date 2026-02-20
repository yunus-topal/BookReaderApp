import React, { useEffect, useMemo, useState } from "react";
import { Modal, View, Text, Pressable, FlatList } from "react-native";
import Tts from "react-native-tts";

type Voice = {
  id: string;
  name?: string;
  language: string; // e.g. "en-US"
  notInstalled?: boolean;
  networkConnectionRequired?: boolean;
};

function unique<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

export function ReadAloudDialog({
  visible,
  text,
  onClose,
}: {
  visible: boolean;
  text: string;
  onClose: () => void;
}) {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!visible) return;

    setError(null);
    Tts.getInitStatus().then(
      async () => {
        const v = (await Tts.voices()) as Voice[];
        // Keep only usable voices
        setVoices(v.filter((x) => x.notInstalled !== true));
      },
      (err) => {
        // If no engine, offer install
        if (err?.code === "no_engine") setError("No TTS engine installed.");
        else setError("TTS init failed.");
      }
    );
  }, [visible]);

  const languages = useMemo(() => {
    const langs = voices.map((v) => v.language);
    return unique(langs).sort();
  }, [voices]);

  const speakInLanguage = async (language: string) => {
    // Pick a voice in that language (prefer non-network voices if possible)
    const candidates = voices.filter((v) => v.language === language);
    const chosen =
      candidates.find((v) => !v.networkConnectionRequired) ?? candidates[0];

    if (!chosen) return;

    // Set language + voice, then speak
    await Tts.setDefaultLanguage(language);         // :contentReference[oaicite:2]{index=2}
    await Tts.setDefaultVoice(chosen.id);           // API>=21 on Android :contentReference[oaicite:3]{index=3}
    Tts.stop();
    Tts.speak(text);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, justifyContent: "center", padding: 24, backgroundColor: "rgba(0,0,0,0.4)" }}>
        <View style={{ backgroundColor: "white", borderRadius: 16, padding: 16, maxHeight: "75%" }}>
          <Text style={{ fontWeight: "700", fontSize: 16, marginBottom: 10 }}>
            Read aloud
          </Text>

          {!!error && (
            <View style={{ marginBottom: 12 }}>
              <Text style={{ marginBottom: 8 }}>{error}</Text>
              <Pressable
                onPress={() => Tts.requestInstallEngine()} // :contentReference[oaicite:4]{index=4}
                style={{ paddingVertical: 8 }}
              >
                <Text style={{ fontWeight: "700" }}>Install TTS engine</Text>
              </Pressable>
            </View>
          )}

          <Pressable
            onPress={() => Tts.requestInstallData()} // opens Android activity to install more language/voice data :contentReference[oaicite:5]{index=5}
            style={{ paddingVertical: 8, marginBottom: 8 }}
          >
            <Text style={{ fontWeight: "700" }}>Get more voices / languages</Text>
            <Text style={{ opacity: 0.6, fontSize: 12 }}>
              Opens system TTS downloads
            </Text>
          </Pressable>

          <Text style={{ fontWeight: "700", marginTop: 6, marginBottom: 6 }}>
            Available languages
          </Text>

          <FlatList
            data={languages}
            keyExtractor={(x) => x}
            renderItem={({ item }) => (
              <Pressable onPress={() => speakInLanguage(item)} style={{ paddingVertical: 10 }}>
                <Text>{item}</Text>
              </Pressable>
            )}
            ListEmptyComponent={
              <Text style={{ opacity: 0.6 }}>
                No voices found (or they’re not installed yet).
              </Text>
            }
          />

          <Pressable onPress={onClose} style={{ paddingTop: 12 }}>
            <Text style={{ fontWeight: "700" }}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}