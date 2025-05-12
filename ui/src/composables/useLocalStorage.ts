import { ref, watch } from "vue";

export const useLocalStorage = <T = any>(key: string, defaultValue: T) => {
  const stored = localStorage.getItem(key);
  const data = ref<T>();

  if (stored === null) {
    data.value = defaultValue;
  } else {
    if (typeof defaultValue === "boolean") {
      data.value = (stored == "true") as T;
    } else {
      data.value = stored as T;
    }
  }

  watch(data, (val) => {
    localStorage.setItem(key, String(val));
  });

  return data;
};
