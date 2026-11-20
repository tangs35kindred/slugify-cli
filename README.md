# slugify-cli

Convert titles into URL-friendly slugs from arguments or stdin. Supports a custom separator and a maximum length.

## Usage

```bash
echo "Hello, World!" | node cli.js --sep _
```

## Options

- `--sep -` — separator (default `-`)
- `--max 60` — truncate the result
## License

MIT

## Notes

The code is organized as a single file on purpose.
