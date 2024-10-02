import supabase, {supabaseUrl} from "./supabase";

/**
 * Asynchronously retrieves URLs associated with a specific user from the database.
 * @param {string|number} user_id - The unique identifier of the user whose URLs are to be fetched.
 * @returns {Promise<Array>} A promise that resolves to an array of URL objects belonging to the specified user.
 * @throws {Error} If there's an issue fetching the URLs from the database.
 */
export async function getUrls(user_id) {
  let {data, error} = await supabase
    .from("urls")
    .select("*")
    .eq("user_id", user_id);

  if (error) {
    console.error(error);
    /**
     * Retrieves a URL record from the database based on the provided ID and user ID.
     * @param {Object} params - The parameters object.
     * @param {string|number} params.id - The unique identifier of the URL record.
     * @param {string|number} params.user_id - The user ID associated with the URL record.
     * @returns {Promise<Object>} A promise that resolves to the URL data object if found.
     * @throws {Error} Throws an error if the URL is not found or if there's a database error.
     */
    throw new Error("Unable to load URLs");
  }

  return data;
}

export async function getUrl({id, user_id}) {
  const {data, error} = await supabase
    .from("urls")
    .select("*")
    .eq("id", id)
    .eq("user_id", user_id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Short Url not found");
  }

  return data;
}

/**
 * Retrieves the original long URL associated with a given short URL or custom URL identifier.
 * @param {string} id - The short URL or custom URL identifier to look up.
 * @returns {Promise<Object|undefined>} An object containing the id and original_url if found, or undefined if an error occurs.
 */
export async function getLongUrl(id) {
  let {data: shortLinkData, error: shortLinkError} = await supabase
    .from("urls")
    .select("id, original_url")
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .single();

  if (shortLinkError && shortLinkError.code !== "PGRST116") {
    console.error("Error fetching short link:", shortLinkError);
    return;
  /**
   * Creates a shortened URL with associated QR code and stores it in the database.
   * @param {Object} urlData - The data for creating the URL.
   * @param {string} urlData.title - The title of the URL.
   * @param {string} urlData.longUrl - The original long URL to be shortened.
   * @param {string} [urlData.customUrl] - Optional custom URL string.
   * @param {string} urlData.user_id - The ID of the user creating the URL.
   * @param {Blob} qrcode - The QR code image data.
   * @returns {Promise<Object>} The created URL data from the database.
   */
  }

  return shortLinkData;
}

export async function createUrl({title, longUrl, customUrl, user_id}, qrcode) {
  const short_url = Math.random().toString(36).substr(2, 6);
  const fileName = `qr-${short_url}`;

  const {error: storageError} = await supabase.storage
    .from("qrs")
    .upload(fileName, qrcode);

  if (storageError) throw new Error(storageError.message);

  const qr = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

  const {data, error} = await supabase
    .from("urls")
    .insert([
      {
        title,
        user_id,
        original_url: longUrl,
        custom_url: customUrl || null,
        short_url,
        qr,
      },
    ])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error creating short URL");
  }

  return data;
}

/**
 * Deletes a URL entry from the database based on its ID.
 * @param {string|number} id - The unique identifier of the URL to be deleted.
 * @returns {Promise<object>} The deleted URL data if successful.
 * @throws {Error} If unable to delete the URL.
 */
export async function deleteUrl(id) {
  const {data, error} = await supabase.from("urls").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Unable to delete Url");
  }

  return data;
}
