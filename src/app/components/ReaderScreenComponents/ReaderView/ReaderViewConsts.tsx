import { ReaderFontFamily, ReaderFontSize, ReaderSettings, READER_THEMES } from "@app/types";

const fontFamilyForSettings = (font: ReaderFontFamily) => {
  switch (font) {
    case 'serif':
      return 'serif';
    case 'sans-serif':
      return 'sans-serif';
    case 'monospace':
      return 'monospace';
    default:
      return 'serif';
  }
};

const FONT_SIZE_PERCENT: Record<ReaderFontSize, string> = {
  xsmall: '85%',
  small: '92%',
  medium: '100%',
  large: '108%',
  xlarge: '116%',
};

const buildThemeFromSettings = (settings: ReaderSettings) => {
  const base = READER_THEMES[settings.theme];
  const fontFamily = fontFamilyForSettings(settings.fontFamily);
  const fontSize = FONT_SIZE_PERCENT[settings.fontSize] ?? '100%';

  return {
    ...base,
    body: {
      ...(base.body || {}),
      'font-family': fontFamily,
      //'font-family': 'serif',
      //'font-family': 'sans-serif',
      //'font-family': 'monospace',
      'font-size': fontSize,
    },
  };
};

export { buildThemeFromSettings };