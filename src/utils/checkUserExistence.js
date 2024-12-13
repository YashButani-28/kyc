export async function checkUserExistence(username) {
  try {
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();
    return users.some((user) => user.name === username);
  } catch (error) {
    console.error("Error checking user existence:", error);
    return false;
  }
}
