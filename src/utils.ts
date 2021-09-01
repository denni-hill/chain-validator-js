export const bindAll = <T>(object: T): { [K in keyof T]: T[K] } => {
  const protoKeys = Object.getOwnPropertyNames(
    Object.getPrototypeOf(object)
  ) as (keyof T)[];
  protoKeys.forEach((key) => {
    const maybeFn = object[key];
    if (typeof maybeFn === "function" && key !== "constructor") {
      object[key] = maybeFn.bind(object);
    }
  });

  return object;
};

export function toString(value: unknown, deep = true): string {
  if (Array.isArray(value) && value.length && deep) {
    return toString(value[0], false);
  } else if (value instanceof Date) {
    return value.toISOString();
  } else if (value && typeof value === "object" && value.toString) {
    if (typeof value.toString !== "function") {
      return Object.getPrototypeOf(value).toString.call(value);
    }
    return value.toString();
  } else if (value == null || (isNaN(Number(value)) && !String(value).length)) {
    return "";
  }

  return String(value);
}

export function getValueByPath(object: unknown, path: string[]): unknown {
  let value = object;
  for (const pathPart of path) {
    if (value[pathPart] === undefined) return undefined;
    else value = value[pathPart];
  }
  return value;
}
