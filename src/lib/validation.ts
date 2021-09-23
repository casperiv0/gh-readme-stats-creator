import { z, ZodError } from "zod";
import isHexColor from "hex-color-regex";
import { Values } from "types/Values";

const HEX_COLOR_REGEX = isHexColor({ strict: true });
const ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;

const COLORS = ["bg_color", "border_color", "icon_color", "text_color", "title_color"];
const NULLABLE: (keyof Values)[] = ["custom-host-url", "custom-title", "line-height"];

export function validate(values: Values) {
  const errors: Partial<Values> = {};

  // obj `colors` -> `colors.<key>`
  COLORS.map((key) => {
    const value = ((values as any)?.colors ?? {})[key];

    values[`colors.${key}`] = value || null;
  });

  // make empty strings null
  NULLABLE.map((key) => {
    const value = values[key];

    if (typeof value === "string" && value.trim() === "") {
      (values as any)[key] = value || null;
    }
  });

  const obj = z.object({
    "count-private-contributions": z.boolean(),
    "custom-host-url": z.string().regex(ABSOLUTE_URL_REGEX).nullable(),
    "custom-title": z.string().nullable(),
    "github-username": z.string().min(1),
    "line-height": z.number().nullable(),
    theme: z.string().optional(),

    "hide-rank": z.boolean(),
    "hide-title": z.boolean(),
    "include-all-commits": z.boolean(),
    "show-icons": z.boolean(),
    "disable-animations": z.boolean(),

    "colors.bg_color": z.string().regex(HEX_COLOR_REGEX, "Invalid HEX color").nullable(),
    "colors.border_color": z.string().regex(HEX_COLOR_REGEX, "Invalid HEX color").nullable(),
    "colors.icon_color": z.string().regex(HEX_COLOR_REGEX, "Invalid HEX color").nullable(),
    "colors.title_color": z.string().regex(HEX_COLOR_REGEX, "Invalid HEX color").nullable(),
    "colors.text_color": z.string().regex(HEX_COLOR_REGEX, "Invalid HEX color").nullable(),
  });

  try {
    obj.parse(values);
  } catch (e) {
    const err = e as ZodError<typeof obj>;

    for (const error of err.errors) {
      const [key] = error.path;
      errors[key as string] = error.message;
    }

    return errors;
  }

  return errors;
}
