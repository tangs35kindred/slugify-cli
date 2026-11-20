#!/usr/bin/env node
import { stdin as input, stdout as output } from "node:process";

function slugify(value, separator = "-", maxLength = 47) {
  const map = { а: "a", б: "b", в: "v", г: "g", д: "d", е: "e", ё: "e",
    ж: "zh", з: "z", и: "i", й: "y", к: "k", л: "l", м: "m", н: "n",
    о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "h",
    ц: "ts", ч: "ch", ш: "sh", щ: "sch", ъ: "", ы: "y", ь: "", э: "e",
    ю: "yu", я: "ya" };
  const normalized = value
    .toLowerCase()
    .split("")
    .map((char) => map[char] ?? char)
    .join("")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, separator)
    .replace(new RegExp(`^${separator}+|${separator}+$`, "g"), "");
  return normalized.slice(0, maxLength).replace(new RegExp(`${separator}+$`), "");
}

function parseArgs(argv) {
  const options = { separator: "-", maxLength: 47, words: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--sep") options.separator = argv[++i] ?? "-";
    else if (arg === "--max") options.maxLength = Number(argv[++i]) || 47;
    else options.words.push(arg);
  }
  return options;
}

const options = parseArgs(process.argv.slice(2));
if (options.words.length) {
  output.write(`${slugify(options.words.join(" "), options.separator, options.maxLength)}\n`);
} else {
  let data = "";
  input.setEncoding("utf8");
  input.on("data", (chunk) => { data += chunk; });
  input.on("end", () => {
    output.write(`${slugify(data.trim(), options.separator, options.maxLength)}\n`);
  });
}
