//sdA6Fvx12sd75!sdf
import { useCallback, useState } from "react";
import Config from "react-native-config";

const DEEPL_WORKER_URL = "https://bookreader-translation.emretopal20.workers.dev/";
const workerPassword = Config.WORKER_PASSWORD ?? "";

type TargetLang = "EN-US" | "EN-GB" | "EN" | "DE";

type DeepLTranslation = {
  detected_source_language: string;
  text: string;
};

type DeepLResponse = {
  translations: DeepLTranslation[];
};

type UseTranslateOptions = {
  defaultTargetLang?: TargetLang; // default: EN-US
};

type TranslateArgs = {
  text: string;
  targetLang?: TargetLang;        // optional override; defaultTargetLang used otherwise
};

export function useDeepLTranslation(options: UseTranslateOptions) {
  const { defaultTargetLang = "EN-US" } = options;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [last, setLast] = useState<{
    input: string;
    output: string;
    detectedSourceLang?: string;
    targetLang: TargetLang;
  } | null>(null);

  const translate = useCallback(
    async ({ text, targetLang }: TranslateArgs) => {
      const input = text.trim();
      if (!input) throw new Error("Text is empty");

      setIsLoading(true);
      setError(null);

      const target = targetLang ?? defaultTargetLang;

      try {
        // This assumes your Cloudflare Worker expects { text, target_lang }
        // and forwards to DeepL with source_lang omitted (auto-detect).
        const res = await fetch(DEEPL_WORKER_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: input,
            target_lang: target,
            password: workerPassword,
          }),
        });

        if (!res.ok) {
          const t = await res.text().catch(() => "");
          throw new Error(`Translate failed (${res.status}): ${t || res.statusText}`);
        }

        const data = (await res.json()) as DeepLResponse;
        const first = data.translations?.[0];

        const output = first?.text ?? "";
        const detected = first?.detected_source_language;

        const result = {
          input,
          output,
          detectedSourceLang: detected,
          targetLang: target,
        };

        setLast(result);
        return result;
      } catch (e: any) {
        setError(e?.message ?? "Unknown error");
        throw e;
      } finally {
        setIsLoading(false);
      }
    },
    [DEEPL_WORKER_URL, workerPassword, defaultTargetLang]
  );

  return { translate, isLoading, error, last };
}