export const getClasses = (classes: (string | false | null | undefined)[]): string => {
  return classes
    .filter((item): item is string => typeof item === "string" && item.trim() !== "")
    .join(" ");
};
