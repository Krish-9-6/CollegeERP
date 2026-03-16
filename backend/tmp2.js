import bcrypt from "bcrypt";

async function run() {
  console.log(
    await bcrypt.compare(
      "passtest",
      "$2b$10$8s77AjQ5oFF5V/syHeO6Z.E3sNcFwxjn5k5fywJN9yPOBLe/K7aLS",
    ),
  );
}

run();
