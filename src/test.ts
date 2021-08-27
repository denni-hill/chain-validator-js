import { build, validate } from ".";

async function test() {
  const result = await validate(
    {
      name: "Кристофер Робин",
      age: "23",
      figuredIn: ["1", "2", "3"]
    },
    {
      name: build().isString(),
      age: build().isNumeric(),
      figuredIn: [build().isArray(), build().isNumeric()]
    },
    false
  );

  console.log(JSON.stringify(result));
}

test();
