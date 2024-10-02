import supabase, {supabaseUrl} from "./supabase";

/**
 * Authenticates a user with their email and password using Supabase authentication.
 * @param {Object} loginCredentials - The login credentials object.
 * @param {string} loginCredentials.email - The user's email address.
 * @param {string} loginCredentials.password - The user's password.
 * @returns {Promise<Object>} A promise that resolves to the user's authentication data.
 * @throws {Error} If the authentication fails, an error with the error message is thrown.
 */
export async function login({email, password}) {
  const {data, error} = await supabase.auth.signInWithPassword({
    email,
    /**
     * Handles user signup process including profile picture upload
     * @param {Object} signupData - The signup information
     * @param {string} signupData.name - The user's full name
     * @param {string} signupData.email - The user's email address
     * @param {string} signupData.password - The user's chosen password
     * @param {File} signupData.profile_pic - The user's profile picture file
     * @returns {Promise<Object>} The data object returned by Supabase after successful signup
     * @throws {Error} If there's an error during storage upload or signup process
     */
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function signup({name, email, password, profile_pic}) {
  const fileName = `dp-${name.split(" ").join("-")}-${Math.random()}`;

  const {error: storageError} = await supabase.storage
    .from("profile_pic")
    .upload(fileName, profile_pic);

  if (storageError) throw new Error(storageError.message);

  const {data, error} = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${fileName}`,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

/**
 * Retrieves the current authenticated user from the session
 * @returns {Promise<Object|null>} A Promise that resolves to the user object if authenticated, or null if not authenticated
 * @throws {Error} If there's an error retrieving the session
 */
export async function getCurrentUser() {
  const {data: session, error} = await supabase.auth.getSession();
  if (!session.session) return null;

  // const {data, error} = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return session.session?.user;
}

/**
 * Logs out the current user from the Supabase authentication system.
 * @throws {Error} If there's an error during the sign-out process.
 * @returns {Promise<void>} A promise that resolves when the logout is successful.
 */
export async function logout() {
  const {error} = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
