import {useState} from "react";

/**
 * A custom React hook for handling asynchronous data fetching operations.
 * @param {Function} cb - The callback function to be executed for fetching data.
 * @param {Object} [options={}] - Optional configuration object for the fetch operation.
 * @returns {Object} An object containing the fetch state and execution function.
 *                   - data: The fetched data or null if not yet fetched.
 *                   - loading: A boolean indicating whether the fetch is in progress.
 *                   - error: Any error that occurred during the fetch or null if successful.
 *                   - fn: A function to trigger the fetch operation with additional arguments.
 */
const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  /**
   * Asynchronous function wrapper that handles loading state, error handling, and data setting.
   * @param {...*} args - Arguments to be passed to the callback function.
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cb(options, ...args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return {data, loading, error, fn};
};

export default useFetch;
