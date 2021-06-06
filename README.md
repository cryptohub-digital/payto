# Payto link

> The 'payto' URI Scheme for Payments

The 'payto' Uniform Resource Identifier (URI) scheme for designating targets for payments.

A unified URI scheme for all payment target types allows applications to offer user interactions with URIs that represent payment targets, simplifying the introduction of new payment systems and applications.

## Schema

```
payto-URI = "payto:" authority path-abempty [ "?" opts ]
opts = opt *( "&" opt )
opt-name = generic-opt / authority-specific-opt
opt-value = *pchar
opt = opt-name "=" opt-value
generic-opt = "amount" / "receiver-name" / "sender-name" /
              "message" / "instruction"
authority-specific-opt = ALPHA *( ALPHA / DIGIT / "-" / "." )
authority = ALPHA *( ALPHA / DIGIT / "-" / "." )
```

### Generic options

```
amount = currency ":" unit [ "." fraction ]
        currency = 1*ALPHA
        unit = 1*(DIGIT / ",")
        fraction = 1*(DIGIT / ",")
```

## Start dev server

```
npm install
npm run dev:debug
```

You can view the website at the given access URL:

> light-server is listening at http://localhost:4000

The local url is configured in `.lightserverrc`

## License

[CORE License](LICENSE)
