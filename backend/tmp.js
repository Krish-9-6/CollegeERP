import bcrypt from "bcrypt";

async function run() {
  const hash = await bcrypt.hash("passtest", 10);
  console.log(hash);
}

run();
