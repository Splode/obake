![Obake header image](.github/obake_header_04--960x540.png)

# Obake

> Obake automates checking online merchants for deals and inventory.

Periodically check online stores for goods, and be alerted when inventory is available or on sale.

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

#### Notifications

Obake currently supports the following, optional types of notifications:

- Desktop
- Email
- Telegram

#### Adding Goods

To add a good, simply add an entry to the `goods` config:

```toml
[[goods]]
URL = "https://example.org/someproduct" # string
name = "A Pretty Name for Display"      # string
price = 199.99                          # number
```

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
