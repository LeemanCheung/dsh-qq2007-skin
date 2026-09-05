const React = require("react");

const THEME_ID = "dsh-qq2007-retro";
const STORAGE_KEY = "dsh-qq2007-skin:enabled";
const PREVIOUS_THEME_KEY = "dsh-qq2007-skin:previous-theme";
const SOUND_KEY = "dsh-qq2007-skin:sound";
const BUILTIN_THEMES = new Set(["light", "dark", "system"]);
const CSS = __QQ2007_CSS__;
const BUDDY_URL = __QQ2007_BUDDY_URL__;

const THEME = Object.freeze({
  id: THEME_ID,
  colorScheme: "light",
  tokens: Object.freeze({
    "--dsw-alias-bg-base": "#edf7ff",
    "--dsw-alias-bg-layer-1": "#ffffff",
    "--dsw-alias-bg-layer-2": "#e5f2fc",
    "--dsw-alias-bg-layer-3": "#cfe4f6",
    "--dsw-alias-bg-module-platform": "#dcecf9",
    "--dsw-alias-bg-multi-select": "#dcecf9",
    "--dsw-alias-bg-overlay": "#f7fcff",
    "--dsw-alias-bg-skeleton": "rgba(30, 111, 181, 0.10)",
    "--dsw-alias-border-l1": "rgba(30, 91, 145, 0.18)",
    "--dsw-alias-border-l2-darkmode-thin": "rgba(30, 91, 145, 0.28)",
    "--dsw-alias-border-l2": "#9bbbd6",
    "--dsw-alias-border-l3": "#6d99bf",
    "--dsw-alias-border-l4": "#4779a5",
    "--dsw-alias-brand-primary-invert": "#ffffff",
    "--dsw-alias-brand-primary": "#1269bb",
    "--dsw-alias-brand-text": "#07599f",
    "--dsw-alias-button-contrast-fill": "#155f9e",
    "--dsw-alias-button-elevated-fill": "#ffffff",
    "--dsw-alias-button-floating-fill": "#edf7ff",
    "--dsw-alias-button-floating-hover": "#d5ecff",
    "--dsw-alias-button-ghost-active-border": "#5f92bd",
    "--dsw-alias-button-ghost-active-fill": "#d8ecfc",
    "--dsw-alias-button-ghost-active-hover": "#c7e3f8",
    "--dsw-alias-button-info-fill": "#1776c7",
    "--dsw-alias-button-info-hover": "#318dd9",
    "--dsw-alias-button-primary-dimmed": "#c7dcee",
    "--dsw-alias-button-primary-fill": "#1269bb",
    "--dsw-alias-button-primary-hover": "#2c84cf",
    "--dsw-alias-interactive-bg-active": "rgba(18, 105, 187, 0.18)",
    "--dsw-alias-interactive-bg-hover-accent": "rgba(18, 105, 187, 0.15)",
    "--dsw-alias-interactive-bg-hover-solid": "#dceeff",
    "--dsw-alias-interactive-bg-hover": "rgba(18, 105, 187, 0.09)",
    "--dsw-alias-label-caption": "#7791a8",
    "--dsw-alias-label-dimmed": "#adbdcb",
    "--dsw-alias-label-primary-bluish": "#0b4c84",
    "--dsw-alias-label-primary-dimmed": "#29445c",
    "--dsw-alias-label-primary-foreground": "#ffffff",
    "--dsw-alias-label-primary-inverted": "#ffffff",
    "--dsw-alias-label-primary": "#122d45",
    "--dsw-alias-label-secondary": "#3b5871",
    "--dsw-alias-label-tertiary": "#617b91",
    "--dsw-alias-markdown-code-block-banner": "#deedf8",
    "--dsw-alias-markdown-code-block": "#f4f9fd",
    "--dsw-alias-markdown-inline-code": "#ddecf8",
    "--dsw-alias-scrollbar-bg-l1": "#91badd",
    "--dsw-alias-scrollbar-bg-l2": "#70a8d6",
    "--dsw-alias-scrollbar-hover-l1": "#4f95cc",
    "--dsw-alias-scrollbar-hover-l2": "#3985bf",
    "--dsw-alias-state-business-primary": "#1675c7",
    "--dsw-alias-state-business-tertiary": "#d9ecfb",
    "--dsw-alias-state-error-primary": "#c73b35",
    "--dsw-alias-state-error-secondary": "#df6b65",
    "--dsw-alias-state-success-primary": "#3a9b31",
    "--dsw-alias-state-success-secondary": "#68bd55",
    "--dsw-alias-state-success-tertiary": "#e0f3d9",
    "--dsw-alias-state-warn-label": "#9b5a00",
    "--dsw-alias-state-warn-primary": "#cb7800",
    "--dsw-alias-state-warn-secondary": "#e7a13d",
    "--dsw-alias-state-warn-tertiary": "#fff0d5",
    "--dsw-alias-toast-bg": "#174f7e",
    "--dsw-alias-tooltip-bg": "#16466f",
    "--dsw-specific-bubble-highlight": "#b9ddfa",
    "--dsw-specific-bubble": "#d9edfd",
    "--dsw-specific-input-major": "#ffffff",
    "--dsw-specific-login-input": "#f5fbff",
    "--dsw-specific-menu": "#f8fcff",
    "--dsw-specific-selector": "#e1effa",
    "--dsw-specific-sidebar-fill": "#d7ebfb",
    "--dsw-specific-sidebar-nav-item-active-accent": "#1776c7",
    "--dsw-specific-sidebar-nav-item-active": "#b9ddf8",
    "--dsw-specific-sidebar-nav-item-hover": "#d6ecfc",
    "--dsw-specific-tip": "#e7f3fc"
  })
});

function readEnabled() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== "off";
  } catch {
    return true;
  }
}

function writeEnabled(enabled) {
  try {
    window.localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
  } catch {}
}

function readPreviousTheme() {
  try {
    const value = window.localStorage.getItem(PREVIOUS_THEME_KEY);
    return BUILTIN_THEMES.has(value) ? value : "system";
  } catch {
    return "system";
  }
}

function writePreviousTheme(themeId) {
  if (!BUILTIN_THEMES.has(themeId)) return;
  try {
    window.localStorage.setItem(PREVIOUS_THEME_KEY, themeId);
  } catch {}
}

function readSoundEnabled() {
  try {
    return window.localStorage.getItem(SOUND_KEY) === "on";
  } catch {
    return false;
  }
}

function writeSoundEnabled(enabled) {
  try {
    window.localStorage.setItem(SOUND_KEY, enabled ? "on" : "off");
  } catch {}
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function formatClock(date) {
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return hh + ":" + mm;
}

function SettingsRow({
  getEnabled, setEnabled, subscribe,
  getSoundEnabled, setSoundEnabled, subscribeSound
}) {
  const [enabled, setLocalEnabled] = React.useState(getEnabled());
  const [soundEnabled, setLocalSoundEnabled] = React.useState(getSoundEnabled());
  React.useEffect(() => subscribe(setLocalEnabled), [subscribe]);
  React.useEffect(() => subscribeSound(setLocalSoundEnabled), [subscribeSound]);

  const choose = (value) => {
    setEnabled(value);
    setLocalEnabled(value);
  };
  const chooseSound = (value) => {
    setSoundEnabled(value);
    setLocalSoundEnabled(value);
  };
  const rowStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    padding: "14px 0",
    borderBottom: "1px solid var(--dsw-alias-border-l1)"
  };
  const baseButton = {
    minWidth: "92px",
    height: "30px",
    border: "1px solid var(--dsw-alias-border-l3)",
    borderRadius: "4px",
    padding: "0 12px",
    cursor: "pointer",
    font: "inherit"
  };
  const buttonStyle = (selected) => Object.assign({}, baseButton, selected ? {
    color: "#fff",
    background: "linear-gradient(180deg, #68bdf5, #1269bb)",
    boxShadow: "inset 1px 1px rgba(255,255,255,.65)"
  } : {
    color: "var(--dsw-alias-label-primary)",
    background: "var(--dsw-alias-button-elevated-fill)"
  });
  const copyStyle = { marginTop: "4px", color: "var(--dsw-alias-label-tertiary)", fontSize: "12px", lineHeight: 1.5 };

  return React.createElement("div", null,
    React.createElement("div", { style: rowStyle },
      React.createElement("div", { style: { minWidth: 0 } },
        React.createElement("div", { style: { color: "var(--dsw-alias-label-primary)", fontWeight: 600 } }, "QQ 2007 复古皮肤"),
        React.createElement("div", { style: copyStyle }, "Codex 原创美术、XP 蓝色窗框、账号资料卡与复古状态栏；关闭后恢复切换前的系统外观。")
      ),
      React.createElement("div", { style: { display: "flex", gap: "8px", flexShrink: 0 } },
        React.createElement("button", {
          type: "button",
          style: buttonStyle(enabled),
          "aria-pressed": enabled,
          onClick: () => choose(true)
        }, "启用皮肤"),
        React.createElement("button", {
          type: "button",
          style: buttonStyle(!enabled),
          "aria-pressed": !enabled,
          onClick: () => choose(false)
        }, "系统外观")
      )
    ),
    React.createElement("div", { style: rowStyle },
      React.createElement("div", { style: { minWidth: 0 } },
        React.createElement("div", { style: { color: "var(--dsw-alias-label-primary)", fontWeight: 600 } }, "原创双音发送提示"),
        React.createElement("div", { style: copyStyle }, "默认关闭；开启时试听一次，之后为本地发送操作播放约 0.18 秒双音。它不是送达成功提示，也不包含 QQ 历史音效。")
      ),
      React.createElement("button", {
        type: "button",
        style: Object.assign({}, buttonStyle(soundEnabled), { minWidth: "112px" }),
        "aria-pressed": soundEnabled,
        onClick: () => chooseSound(!soundEnabled)
      }, soundEnabled ? "提示音：开启" : "提示音：关闭")
    )
  );
}

function apply(ctx) {
  if (typeof document === "undefined" || typeof window === "undefined") return;

  const subscribers = new Set();
  const soundSubscribers = new Set();
  const restoreOnBoot = readEnabled();
  let active = false;
  let soundEnabled = readSoundEnabled();
  let audioContext = null;
  let status = null;
  let windowbar = null;
  let previousTheme = readPreviousTheme();
  let bootRestorePending = restoreOnBoot;
  let retryTimer = null;
  let settleTimer = null;
  let disposed = false;

  const clearBootTimers = () => {
    if (retryTimer !== null) window.clearTimeout(retryTimer);
    if (settleTimer !== null) window.clearTimeout(settleTimer);
    retryTimer = null;
    settleTimer = null;
  };
  const notify = () => {
    for (const subscriber of subscribers) subscriber(active);
  };
  const notifySound = () => {
    for (const subscriber of soundSubscribers) subscriber(soundEnabled);
  };
  const getAudioContext = () => {
    if (!soundEnabled || disposed) return null;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (typeof AudioContext !== "function") return null;
    try {
      if (audioContext === null || audioContext.state === "closed") audioContext = new AudioContext();
      if (audioContext.state === "suspended") {
        void audioContext.resume().catch(() => {
          // Autoplay policy rejection keeps the optional cue silent.
        });
      }
      return audioContext;
    } catch {
      // Audio is optional; browser policy or unavailable hardware leaves the skin silent.
      return null;
    }
  };
  const playSendChime = () => {
    const context = getAudioContext();
    if (context === null) return;
    try {
      const now = context.currentTime;
      const note = (frequency, delay, duration, peak) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(frequency, now + delay);
        gain.gain.setValueAtTime(0.0001, now + delay);
        gain.gain.exponentialRampToValueAtTime(peak, now + delay + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);
        oscillator.connect(gain);
        gain.connect(context.destination);
        oscillator.start(now + delay);
        oscillator.stop(now + delay + duration + 0.01);
      };
      note(659.25, 0, 0.075, 0.045);
      note(880, 0.062, 0.105, 0.038);
    } catch {
      // Audio is optional; browser policy or unavailable hardware leaves the skin silent.
    }
  };
  const setSoundEnabled = (next) => {
    soundEnabled = next === true;
    writeSoundEnabled(soundEnabled);
    if (status) status.dataset.sound = soundEnabled ? "on" : "off";
    notifySound();
    if (soundEnabled) playSendChime();
  };
  const markActive = (next, persist = true) => {
    active = next === true;
    if (active) document.body.setAttribute("data-dsh-qq2007-active", "true");
    else document.body.removeAttribute("data-dsh-qq2007-active");
    if (status) status.dataset.active = active ? "true" : "false";
    if (persist) writeEnabled(active);
    notify();
  };
  const setEnabled = (next) => {
    if (next) {
      const snapshot = ctx.theme.getTheme();
      if (BUILTIN_THEMES.has(snapshot.preference)) {
        previousTheme = snapshot.preference;
        writePreviousTheme(previousTheme);
      }
      if (snapshot.active.id !== THEME_ID) ctx.theme.setTheme(THEME_ID);
      else markActive(true);
    } else {
      bootRestorePending = false;
      clearBootTimers();
      const snapshot = ctx.theme.getTheme();
      if (snapshot.active.id === THEME_ID) ctx.theme.setTheme(previousTheme);
      else markActive(false);
    }
  };

  ctx.effect(() => ctx.theme.register(THEME), "dsh-qq2007-skin: theme registration");
  ctx.effect(() => () => {
    disposed = true;
    clearBootTimers();
  }, "dsh-qq2007-skin: startup synchronization cleanup");

  ctx.effect(() => {
    const previousStyle = document.querySelector('style[data-plugin="dsh-qq2007-skin"]');
    if (previousStyle) previousStyle.remove();
    const previousStatus = document.getElementById("dsh-qq2007-status");
    if (previousStatus) previousStatus.remove();
    const previousWindowbar = document.getElementById("dsh-qq2007-windowbar");
    if (previousWindowbar) previousWindowbar.remove();

    const style = document.createElement("style");
    style.dataset.plugin = "dsh-qq2007-skin";
    style.textContent = CSS;
    document.head.appendChild(style);

    windowbar = createElement("div", "", undefined);
    windowbar.id = "dsh-qq2007-windowbar";
    windowbar.setAttribute("aria-hidden", "true");

    const windowIcon = createElement("img", "dsh-qq2007-window-icon");
    windowIcon.src = BUDDY_URL;
    windowIcon.alt = "";
    const windowTitle = createElement("span", "dsh-qq2007-window-title", "DSH Messenger");
    const windowBadge = createElement("span", "dsh-qq2007-window-badge", "2007");
    const windowSignature = createElement("span", "dsh-qq2007-window-signature", "与智能伙伴一起探索未至之境");
    const windowSpacer = createElement("span", "dsh-qq2007-window-spacer");
    const quicktools = createElement("span", "dsh-qq2007-quicktools");
    const pearls = createElement("span", "dsh-qq2007-pearls");
    pearls.appendChild(createElement("i"));
    pearls.appendChild(createElement("i"));
    pearls.appendChild(createElement("i"));
    windowbar.appendChild(windowIcon);
    windowbar.appendChild(windowTitle);
    windowbar.appendChild(windowBadge);
    windowbar.appendChild(windowSignature);
    windowbar.appendChild(windowSpacer);
    windowbar.appendChild(quicktools);
    windowbar.appendChild(pearls);
    document.body.appendChild(windowbar);

    status = createElement("div", "", undefined);
    status.id = "dsh-qq2007-status";
    status.dataset.sound = soundEnabled ? "on" : "off";
    status.setAttribute("role", "group");
    status.setAttribute("aria-label", "QQ 2007 retro skin controls");

    const buddy = createElement("img", "dsh-qq2007-buddy");
    buddy.src = BUDDY_URL;
    buddy.alt = "";
    buddy.setAttribute("aria-hidden", "true");
    const dot = createElement("span", "dsh-qq2007-dot");
    dot.setAttribute("aria-hidden", "true");
    const title = createElement("span", "dsh-qq2007-title", "DSH Messenger 2007");
    const state = createElement("span", "", "本地视觉层已启用");
    const sound = createElement("span", "dsh-qq2007-sound", "双音发送提示");
    const spacer = createElement("span", "dsh-qq2007-spacer");
    const clock = createElement("time", "dsh-qq2007-clock");
    const close = createElement("button", "", "退出皮肤");
    close.type = "button";
    close.setAttribute("aria-label", "关闭 QQ 2007 复古皮肤并恢复系统外观");

    status.appendChild(buddy);
    status.appendChild(dot);
    status.appendChild(title);
    status.appendChild(state);
    status.appendChild(sound);
    status.appendChild(spacer);
    status.appendChild(clock);
    status.appendChild(close);
    document.body.appendChild(status);

    const updateClock = () => {
      const now = new Date();
      clock.textContent = formatClock(now);
      clock.dateTime = now.toISOString();
    };
    const disable = () => setEnabled(false);
    updateClock();
    const sendLabels = new Set(["发送消息", "Send message"]);
    const onDocumentClick = (event) => {
      const target = event.target;
      if (!target || typeof target.closest !== "function") return;
      const button = target.closest("button");
      if (!button || button.disabled || !button.closest("[data-composer-card]")) return;
      if (sendLabels.has(button.getAttribute("aria-label") || "")) playSendChime();
    };
    const onDocumentKeydown = (event) => {
      const target = event.target;
      if (event.key !== "Enter" || event.shiftKey || event.isComposing || !target) return;
      if (target.tagName !== "TEXTAREA" || target.disabled || target.readOnly) return;
      if (typeof target.closest !== "function" || !target.closest("[data-composer-card]")) return;
      if (typeof target.value !== "string" || target.value.trim() === "") return;
      getAudioContext();
      window.setTimeout(() => {
        if (target.value === "") playSendChime();
      }, 0);
    };
    const timer = window.setInterval(updateClock, 30000);
    close.addEventListener("click", disable);
    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onDocumentKeydown);
    document.documentElement.setAttribute("data-dsh-qq2007-installed", "true");

    return () => {
      window.clearInterval(timer);
      close.removeEventListener("click", disable);
      document.removeEventListener("click", onDocumentClick);
      document.removeEventListener("keydown", onDocumentKeydown);
      if (audioContext !== null) {
        const closing = audioContext;
        audioContext = null;
        try {
          void closing.close().catch(() => {
            // A browser may already have closed the optional audio context.
          });
        } catch {
          // A browser may throw synchronously for an already-closed context.
        }
      }
      style.remove();
      status.remove();
      windowbar.remove();
      status = null;
      windowbar = null;
      document.body.removeAttribute("data-dsh-qq2007-active");
      document.documentElement.removeAttribute("data-dsh-qq2007-installed");
      subscribers.clear();
      soundSubscribers.clear();
    };
  }, "dsh-qq2007-skin: scoped stylesheet and status strip");

  ctx.on("theme/change", (snapshot) => {
    const isRetro = snapshot.active.id === THEME_ID;
    if (isRetro) {
      markActive(true);
      if (bootRestorePending) {
        if (settleTimer !== null) window.clearTimeout(settleTimer);
        settleTimer = window.setTimeout(() => {
          settleTimer = null;
          bootRestorePending = false;
        }, 2500);
      }
      return;
    }

    if (bootRestorePending) {
      // ThemeRuntime's Host settings scope can adopt the built-in preference
      // shortly after immediate client plugins run. Preserve first-run intent,
      // wait one task, and re-apply until the startup state remains stable.
      markActive(false, false);
      if (settleTimer !== null) window.clearTimeout(settleTimer);
      settleTimer = null;
      if (retryTimer !== null) window.clearTimeout(retryTimer);
      retryTimer = window.setTimeout(() => {
        retryTimer = null;
        if (!disposed && bootRestorePending) setEnabled(true);
      }, 0);
      return;
    }

    if (BUILTIN_THEMES.has(snapshot.preference)) {
      previousTheme = snapshot.preference;
      writePreviousTheme(previousTheme);
    }
    markActive(false);
  });

  ctx.slots.inject("settings.general.item", () => ctx.slots.register({
    name: "settings.general.item",
    id: "dsh-qq2007-skin",
    order: 35,
    inject: () => ({
      getEnabled: () => active,
      setEnabled,
      subscribe: (subscriber) => {
        subscribers.add(subscriber);
        subscriber(active);
        return () => subscribers.delete(subscriber);
      },
      getSoundEnabled: () => soundEnabled,
      setSoundEnabled,
      subscribeSound: (subscriber) => {
        soundSubscribers.add(subscriber);
        subscriber(soundEnabled);
        return () => soundSubscribers.delete(subscriber);
      }
    })
  }, SettingsRow));

  if (restoreOnBoot) setEnabled(true);
  else markActive(false);
}

exports.THEME = THEME;
exports.THEME_ID = THEME_ID;
exports.apply = apply;
exports.inject = ["theme", "slots"];
