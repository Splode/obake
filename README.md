![Obake header image](.github/obake_header_04--960x540.png)

# Obake

> Obake automates checking online merchants for deals and inventory.

Periodically check online stores for goods, and be alerted when inventory is available or on sale.

## Installation

Install with npm:

```sh
npm install -g @splode/obake
```

Alternatively, clone this repo and link:

```sh
npm install && npm link
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

Obake will notify you if the item is in stock and _below_ the given price.

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
