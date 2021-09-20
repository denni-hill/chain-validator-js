import { build, validate } from ".";

validate(
  [{ id: 1 }, { id: 2 }, { id: 3 }],
  build().isArray(build().oneOfSelf(build().isInt(), { id: build().isInt() }))
).then((result) => console.log(result));
