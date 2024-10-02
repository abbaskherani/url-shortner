import {UAParser} from "ua-parser-js";
import supabase from "./supabase";

// export async function getClicks() {
//   let {data, error} = await supabase.from("clicks").select("*");

//   if (error) {
//     console.error(error);
//     throw new Error("Unable to load Stats");
//   }

//   return data;
// }

/**
 * Asynchronously retrieves click data for specified URL IDs from the database.
 * @param {Array<string|number>} urlIds - An array of URL IDs to fetch click data for.
 * @returns {Promise<Array<Object>|null>} A promise that resolves to an array of click objects if successful, or null if an error occurs.
 */
export async function getClicksForUrls(urlIds) {
  const {data, error} = await supabase
    .from("clicks")
    .select("*")
    .in("url_id", urlIds);

  if (error) {
    console.error("Error fetching clicks:", error);
    return null;
  }

  return data;
}

/**
 * Retrieves click data for a specific URL from the database.
 * @param {string|number} url_id - The unique identifier of the URL to fetch clicks for.
 * @returns {Promise<Array>} A promise that resolves to an array of click data objects.
 */
export async function getClicksForUrl(url_id) {
  const {data, error} = await supabase
    .from("clicks")
    .select("*")
    .eq("url_id", url_id);

  if (error) {
    console.error(error);
    throw new Error("Unable to load Stats");
  }

  return data;
}

const parser = new UAParser();

/**
 * Stores click information and redirects to the original URL
 * @param {Object} options - The options object
 * @param {string} options.id - The ID of the URL
 * @param {string} options.originalUrl - The original URL to redirect to
 * @returns {Promise<void>} No return value, but redirects the user
 */
export const storeClicks = async ({id, originalUrl}) => {
  try {
    const res = parser.getResult();
    const device = res.type || "desktop"; // Default to desktop if type is not detected

    const response = await fetch("https://ipapi.co/json");
    const {city, country_name: country} = await response.json();

    // Record the click
    await supabase.from("clicks").insert({
      url_id: id,
      city: city,
      country: country,
      device: device,
    });

    // Redirect to the original URL
    window.location.href = originalUrl;
  } catch (error) {
    console.error("Error recording click:", error);
  }
};
