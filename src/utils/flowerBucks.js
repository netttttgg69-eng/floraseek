export const FLOWERBUCKS_STORAGE_KEY = "floraseek-flowerbucks-state-v1";
export const FLOWERBUCKS_EVENT = "floraseek-flowerbucks-change";

export const FLOWERBUCK_EARNING_SETTINGS = {
  activeRewardAmount: 10,
  activeRewardIntervalMs: 60_000,
  inactivityTimeoutMs: 60_000,
};

export const FLOWERBUCK_THEMES = [
  {
    id: "meadow",
    name: "Meadow",
    description: "The original Floraseek greens.",
    cost: 0,
    swatches: ["#c8dda9", "#294d3e", "#f3f0e8"],
  },
  {
    id: "sunset-bloom",
    name: "Sunset Bloom",
    description: "Warm petals and soft golden highlights.",
    cost: 120,
    swatches: ["#f0c06f", "#d98a73", "#395b44"],
  },
  {
    id: "moon-fern",
    name: "Moon Fern",
    description: "Cool moonlit greens with pale mint accents.",
    cost: 240,
    swatches: ["#a8d8c2", "#244c4b", "#e6f0dc"],
  },
  {
    id: "rose-glass",
    name: "Rose Glass",
    description: "Rosy botanical accents over deep foliage.",
    cost: 360,
    swatches: ["#e8aaa8", "#3d4f3f", "#f3dccf"],
  },
];

export const DAILY_FLOWERBUCK_REWARDS = [
  { id: "day-1", day: 1, amount: 10, implemented: true },
  { id: "day-2", day: 2, amount: 0, implemented: false },
  { id: "day-3", day: 3, amount: 0, implemented: false },
];

const DEFAULT_FLOWERBUCK_STATE = {
  balance: 0,
  totalEarned: 0,
  activeMilliseconds: 0,
  unlockedThemes: ["meadow"],
  selectedTheme: "meadow",
  dailyRewards: {
    lastClaimDate: "",
    currentStreakDay: 0,
    claimedRewardIds: [],
  },
  settings: {
    ...FLOWERBUCK_EARNING_SETTINGS,
    noRealWorldValue: true,
  },
};

function hasStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function toSafeInteger(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? Math.floor(number) : fallback;
}

function normalizeState(state = {}) {
  const dailyRewards = state.dailyRewards && typeof state.dailyRewards === "object"
    ? state.dailyRewards
    : DEFAULT_FLOWERBUCK_STATE.dailyRewards;
  const settings = state.settings && typeof state.settings === "object"
    ? state.settings
    : DEFAULT_FLOWERBUCK_STATE.settings;
  const selectedTheme = FLOWERBUCK_THEMES.some((theme) => theme.id === state.selectedTheme)
    ? state.selectedTheme
    : DEFAULT_FLOWERBUCK_STATE.selectedTheme;
  const unlockedThemes = Array.isArray(state.unlockedThemes)
    ? [...new Set(["meadow", ...state.unlockedThemes.filter((themeId) => (
        FLOWERBUCK_THEMES.some((theme) => theme.id === themeId)
      ))])]
    : DEFAULT_FLOWERBUCK_STATE.unlockedThemes;

  return {
    ...DEFAULT_FLOWERBUCK_STATE,
    balance: toSafeInteger(state.balance),
    totalEarned: toSafeInteger(state.totalEarned),
    activeMilliseconds: toSafeInteger(state.activeMilliseconds),
    unlockedThemes,
    selectedTheme: unlockedThemes.includes(selectedTheme) ? selectedTheme : "meadow",
    dailyRewards: {
      lastClaimDate: typeof dailyRewards.lastClaimDate === "string" ? dailyRewards.lastClaimDate : "",
      currentStreakDay: toSafeInteger(dailyRewards.currentStreakDay),
      claimedRewardIds: Array.isArray(dailyRewards.claimedRewardIds)
        ? [...new Set(dailyRewards.claimedRewardIds.filter((rewardId) => typeof rewardId === "string"))]
        : [],
    },
    settings: {
      activeRewardAmount: Math.max(
        1,
        toSafeInteger(settings.activeRewardAmount, DEFAULT_FLOWERBUCK_STATE.settings.activeRewardAmount)
      ),
      activeRewardIntervalMs: Math.max(
        1_000,
        toSafeInteger(settings.activeRewardIntervalMs, DEFAULT_FLOWERBUCK_STATE.settings.activeRewardIntervalMs)
      ),
      inactivityTimeoutMs: Math.max(
        5_000,
        toSafeInteger(settings.inactivityTimeoutMs, DEFAULT_FLOWERBUCK_STATE.settings.inactivityTimeoutMs)
      ),
      noRealWorldValue: true,
    },
  };
}

function dispatchFlowerBuckChange(state) {
  window.dispatchEvent(new CustomEvent(FLOWERBUCKS_EVENT, { detail: state }));
}

export function readFlowerBuckState() {
  if (!hasStorage()) {
    return normalizeState();
  }

  try {
    return normalizeState(JSON.parse(window.localStorage.getItem(FLOWERBUCKS_STORAGE_KEY) || "{}"));
  } catch {
    return normalizeState();
  }
}

export function writeFlowerBuckState(state) {
  if (!hasStorage()) {
    return normalizeState(state);
  }

  const nextState = normalizeState(state);
  window.localStorage.setItem(FLOWERBUCKS_STORAGE_KEY, JSON.stringify(nextState));
  dispatchFlowerBuckChange(nextState);
  return nextState;
}

export function updateFlowerBuckState(updater) {
  const currentState = readFlowerBuckState();
  return writeFlowerBuckState(updater(currentState));
}

export function awardFlowerBucks(amount) {
  const earned = toSafeInteger(amount);

  if (earned <= 0) {
    return readFlowerBuckState();
  }

  return updateFlowerBuckState((state) => ({
    ...state,
    balance: state.balance + earned,
    totalEarned: state.totalEarned + earned,
  }));
}

export function recordActiveFlowerBuckTime(milliseconds) {
  const activeMilliseconds = toSafeInteger(milliseconds);

  if (activeMilliseconds <= 0) {
    return readFlowerBuckState();
  }

  return updateFlowerBuckState((state) => {
    const nextActiveMilliseconds = state.activeMilliseconds + activeMilliseconds;
    const intervalsEarned = Math.floor(nextActiveMilliseconds / state.settings.activeRewardIntervalMs);
    const earnedFlowerBucks = intervalsEarned * state.settings.activeRewardAmount;

    return {
      ...state,
      balance: state.balance + earnedFlowerBucks,
      totalEarned: state.totalEarned + earnedFlowerBucks,
      activeMilliseconds: nextActiveMilliseconds % state.settings.activeRewardIntervalMs,
    };
  });
}

export function claimAvailableDailyFlowerBuckReward(dateKey = getLocalDateKey()) {
  const dayOneReward = DAILY_FLOWERBUCK_REWARDS.find((reward) => reward.id === "day-1" && reward.implemented);

  if (!dayOneReward) {
    return readFlowerBuckState();
  }

  return updateFlowerBuckState((state) => {
    if (state.dailyRewards.claimedRewardIds.includes(dayOneReward.id)) {
      return state;
    }

    return {
      ...state,
      balance: state.balance + dayOneReward.amount,
      totalEarned: state.totalEarned + dayOneReward.amount,
      dailyRewards: {
        ...state.dailyRewards,
        lastClaimDate: dateKey,
        currentStreakDay: dayOneReward.day,
        claimedRewardIds: [...state.dailyRewards.claimedRewardIds, dayOneReward.id],
      },
    };
  });
}

export function unlockFlowerBuckTheme(themeId) {
  const theme = FLOWERBUCK_THEMES.find((themeOption) => themeOption.id === themeId);

  if (!theme) {
    return readFlowerBuckState();
  }

  return updateFlowerBuckState((state) => {
    if (state.unlockedThemes.includes(theme.id)) {
      return {
        ...state,
        selectedTheme: theme.id,
      };
    }

    if (state.balance < theme.cost) {
      return state;
    }

    return {
      ...state,
      balance: state.balance - theme.cost,
      unlockedThemes: [...state.unlockedThemes, theme.id],
      selectedTheme: theme.id,
    };
  });
}

export function selectFlowerBuckTheme(themeId) {
  return updateFlowerBuckState((state) => (
    state.unlockedThemes.includes(themeId)
      ? { ...state, selectedTheme: themeId }
      : state
  ));
}

export function formatFlowerBucks(amount) {
  return new Intl.NumberFormat("en").format(toSafeInteger(amount));
}

export function getLocalDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
