import {storeClicks} from "@/db/apiClicks";
import {getLongUrl} from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {BarLoader} from "react-spinners";

/**
 * RedirectLink component that handles URL redirection and click statistics
 * @returns {React.ReactElement|null} Returns a loading indicator while redirecting, or null when complete
 */
const RedirectLink = () => {
  const {id} = useParams();

  const {loading, data, fn} = useFetch(getLongUrl, id);

  const {loading: loadingStats, fn: fnStats} = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  /**
   * A React effect hook that triggers the fnStats function when data is loaded
   * @param {boolean} loading - A boolean indicating whether data is still loading
   * @param {any} data - The data that is being loaded
   * @param {Function} fnStats - A function to calculate or update stats
   * @returns {void} This effect does not return anything
   */
  /**
   * Executes a side effect after the component mounts
   * @param {function} fn - The function to be executed
   * @returns {void} No return value
   */
  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      fnStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  if (loading || loadingStats) {
    return (
      <>
        <BarLoader width={"100%"} color="#36d7b7" />
        <br />
        Redirecting...
      </>
    );
  }

  return null;
};

export default RedirectLink;
