import { query } from "../../db/query";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(email: string, pass: string) {
  // ensure we have both parts before querying
  if (!email || !pass) {
    throw new Error("Email and password are required");
  }

  const result = await query("select * from users where email = $1", [email]);
  const user = result.rows[0];
  if (!user || !user.password) {
    // either no user or hash missing -- never call bcrypt with undefined
    throw new Error("Invalid email or password");
  }

  const passwordMatch = await bcrypt.compare(pass, user.password);

  if (!passwordMatch) {
    console.log("no match with hash");
    throw new Error("Invalid email or password");
  }

  let profileData: any = null;
  if (user.role === 'STUDENT') {
    const student = await query("SELECT * FROM students WHERE user_id = $1", [user.id]);
    profileData = student.rows[0] || {};
  } else if (user.role === 'FACULTY') {
    const faculty = await query("SELECT * FROM faculty WHERE user_id = $1", [user.id]);
    profileData = faculty.rows[0] || {};
  } else if (user.role === 'PARENT') {
    const parent = await query("SELECT * FROM parents WHERE user_id = $1", [user.id]);
    profileData = parent.rows[0] || {};
  }
  // ensure JWT secret is configured before creating a token
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    // This error should never happen in production if configuration is correct
    throw new Error("JWT_SECRET environment variable is not set");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    secret,
    { expiresIn: "1h" },
  );

  return {
    token,
    user: {
      id: user.id,
      name: user.full_name,
      role: user.role,
      details: profileData
      
    }
  }
}
