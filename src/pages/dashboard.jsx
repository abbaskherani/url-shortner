// can add sonner from shadcn ui after link created

import {useEffect, useState} from "react";
import {BarLoader} from "react-spinners";
import {Filter} from "lucide-react";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {CreateLink} from "@/components/create-link";
import LinkCard from "@/components/link-card";
import Error from "@/components/error";

import useFetch from "@/hooks/use-fetch";

import {getUrls} from "@/db/apiUrls";
import {getClicksForUrls} from "@/db/apiClicks";
import {UrlState} from "@/context";

/**
 * Renders a dashboard component displaying user's links and related statistics
 * @param {void} - This component doesn't accept any parameters
 * @returns {JSX.Element} A React component that displays a dashboard with link statistics, search functionality, and a list of user's links
 */
const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {user} = UrlState();
  const {loading, error, data: urls, fn: fnUrls} = useFetch(getUrls, user.id);
  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getClicksForUrls,
    /**
     * Maps an array of URL objects to an array of their corresponding IDs
     * @param {Array<Object>} urls - An optional array of URL objects, each containing an 'id' property
     * @returns {Array<string|number>} An array of ID values extracted from the URL objects
     */
    urls?.map((url) => url.id)
  );

  /**
   * Executes the fnUrls function when the component mounts
   * @param {Function} fnUrls - The function to be called on component mount
   * @returns {void} No return value
   /**
    * Filters an array of URLs based on a search query
    * @param {Array} urls - An array of URL objects, each containing a 'title' property
    * @param {string} searchQuery - The search term to filter the URLs by
    * @returns {Array} An array of URL objects whose titles include the search query (case-insensitive)
    */
   */
  useEffect(() => {
    fnUrls();
  }, []);

  const filteredUrls = urls?.filter((url) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /**
   * React hook that triggers fnClicks when urls array length changes
   * @param {function} fnClicks - Function to be called when urls length changes
   * @param {string[]} urls - Array of URLs to be monitored
   * @returns {void} This effect does not return anything
   */
  useEffect(() => {
    if (urls?.length) fnClicks();
  }, [urls?.length]);

  return (
    <div className="flex flex-col gap-8">
      {(loading || loadingClicks) && (
        <BarLoader width={"100%"} color="#36d7b7" />
      )}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-between">
        <h1 className="text-4xl font-extrabold">My Links</h1>
        <CreateLink />
      </div>
      <div className="relative">
        <Input
          type="text"
          placeholder="Filter Links..."
          value={searchQuery}
          /**
           * Event handler for input change that updates the search query state
           * @param {React.ChangeEvent<HTMLInputElement>} e - The change event object
           * @returns {void} This function doesn't return a value
           */
          /**
           * Renders a list of LinkCard components based on filtered URLs
           * @param {Array} filteredUrls - An array of URL strings to be rendered as LinkCards
           * @param {Function} fnUrls - A function to fetch URLs, passed as a prop to each LinkCard
           * @returns {Array} An array of LinkCard components, each representing a URL
           */
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </div>
      {error && <Error message={error?.message} />}
      {(filteredUrls || []).map((url, i) => (
        <LinkCard key={i} url={url} fetchUrls={fnUrls} />
      ))}
    </div>
  );
};

export default Dashboard;
