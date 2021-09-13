![Obake header image](.github/obake_header_04--960x540.png)

# Obake

Obake automates checking merchants for deals.

## Installation

Install with npm:

```sh
npm install -g obake
```

Alternatively, clone this repo and link:

```sh
npm link
```

## Usage

Obake requires [configuration](#configuration).

```sh
obake [options]
```

Run Obake, specifying the config file path:

```sh
obake --config "example.toml"
```

### Configuration

Obake uses [TOML](https://toml.io/en/) for its configuration. An example configuration file, [example.toml](./example.toml), is provided as a starting point.

### Supported Merchants

- Amazon
- Apple App Store
- B&H Photo*
- Best Buy
- Costco
- JensonUSA
- NewEgg
- REI
- WalMart

* Note: you may encounter aggressive anti-bot detection with these merchants.
