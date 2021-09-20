import { build, validate } from ".";

validate(
  [1, "sda", 4.5],
  build().isArray(
    build().oneOfSelf([
      build().isInt(),
      build().isString(),
      build().isNumeric()
    ])
  )
).then(console.log);
