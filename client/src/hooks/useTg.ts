import WebApp from "@twa-dev/sdk";

export interface ThemeParamsProps {
  accent_text_color: string;
  bg_color: string;
  button_color: string;
  button_text_color: string;
  destructive_text_color: string;
  header_bg_color: string;
  hint_color: string;
  link_color: string;
  secondary_bg_color: string;
  section_bg_color: string;
  section_header_text_color: string;
  subtitle_text_color: string;
  text_color: string;
}

export const useTg = () => {
  const onClose = () => {
    WebApp.close();
  };

  const setMainButtonCallBack = (callBack: () => void) => {
    WebApp.MainButton.onClick(callBack);
  };
  const offMainButtonCallBack = (callBack: () => void) => {
    WebApp.MainButton.offClick(callBack);
  };
  const onToggleMainButton = (needShow: boolean, text: string) => {
    if (!needShow) {
      WebApp.MainButton.hide();
    } else {
      WebApp.MainButton.show();
      WebApp.MainButton.setParams({ text: text });
    }
  };
  const onToggleBackButton = (callBack: () => void, needShow: boolean) => {
    if (!needShow) {
      WebApp.BackButton.offClick(callBack);
      WebApp.BackButton.hide();
    } else {
      WebApp.BackButton.show();
      WebApp.BackButton.onClick(callBack);
    }
  };
  const onToggleSettingsButton = (callBack: () => void) => {
    if (WebApp.SettingsButton.isVisible) {
      WebApp.SettingsButton.offClick(callBack);
      WebApp.SettingsButton.hide();
    } else {
      WebApp.SettingsButton.show();
      WebApp.SettingsButton.onClick(callBack);
    }
  };

  return {
    onClose,
    onToggleMainButton,
    onToggleBackButton,
    onToggleSettingsButton,
    setMainButtonCallBack,
    offMainButtonCallBack,
    tg: WebApp,
    user: WebApp.initDataUnsafe?.user,
    themeParams: WebApp.themeParams as ThemeParamsProps,
  };
};
