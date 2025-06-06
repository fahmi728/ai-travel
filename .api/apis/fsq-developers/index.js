import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';
class SDK {
    constructor() {
        this.spec = Oas.init(definition);
        this.core = new APICore(this.spec, 'fsq-developers/v1.0 (api/6.1.3)');
    }
    /**
     * Optionally configure various options that the SDK allows.
     *
     * @param config Object of supported SDK options and toggles.
     * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
     * should be represented in milliseconds.
     */
    config(config) {
        this.core.setConfig(config);
    }
    /**
     * If the API you're using requires authentication you can supply the required credentials
     * through this method and the library will magically determine how they should be used
     * within your API request.
     *
     * With the exception of OpenID and MutualTLS, it supports all forms of authentication
     * supported by the OpenAPI specification.
     *
     * @example <caption>HTTP Basic auth</caption>
     * sdk.auth('username', 'password');
     *
     * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
     * sdk.auth('myBearerToken');
     *
     * @example <caption>API Keys</caption>
     * sdk.auth('myApiKey');
     *
     * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
     * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
     * @param values Your auth credentials for the API; can specify up to two strings or numbers.
     */
    auth(...values) {
        this.core.setAuth(...values);
        return this;
    }
    /**
     * If the API you're using offers alternate server URLs, and server variables, you can tell
     * the SDK which one to use with this method. To use it you can supply either one of the
     * server URLs that are contained within the OpenAPI definition (along with any server
     * variables), or you can pass it a fully qualified URL to use (that may or may not exist
     * within the OpenAPI definition).
     *
     * @example <caption>Server URL with server variables</caption>
     * sdk.server('https://{region}.api.example.com/{basePath}', {
     *   name: 'eu',
     *   basePath: 'v14',
     * });
     *
     * @example <caption>Fully qualified server URL</caption>
     * sdk.server('https://eu.api.example.com/v14');
     *
     * @param url Server URL
     * @param variables An object of variables to replace into the server URL.
     */
    server(url, variables = {}) {
        this.core.setServer(url, variables);
    }
    /**
     * Search for places in the FSQ Places database using a location and querying by name,
     * category name, telephone number, taste label, or chain name. For example, search for
     * "coffee" to get back a list of recommended coffee shops.
     *
     * You may pass a location with your request by using one of the following options. If none
     * of the following options are passed, Place Search defaults to geolocation using ip
     * biasing with the optional radius parameter.
     *
     * <ul><li>ll & radius (circular boundary)</li><li>near (geocodable locality)</li><li>ne &
     * sw (rectangular boundary)</li></ul>
     *
     * @summary Place Search
     */
    placeSearch(metadata) {
        return this.core.fetch('/v3/places/search', 'get', metadata);
    }
    /**
     * Retrieve comprehensive information and metadata for a FSQ Place using the fsq_id.
     *
     * @summary Get Place Details
     */
    placeDetails(metadata) {
        return this.core.fetch('/v3/places/{fsq_id}', 'get', metadata);
    }
    /**
     * Retrieve photos for a FSQ Place using the fsq_id.
     *
     * To retrieve photos from a Photos response, learn [how to assemble photo
     * URLs](https://docs.foursquare.com/reference/photos-guide#assembling-a-photo-url).
     *
     * @summary Get Place Photos
     */
    placePhotos(metadata) {
        return this.core.fetch('/v3/places/{fsq_id}/photos', 'get', metadata);
    }
    /**
     * Retrieve tips for a FSQ Place using the fsq_id.
     *
     * @summary Get Place Tips
     */
    placeTips(metadata) {
        return this.core.fetch('/v3/places/{fsq_id}/tips', 'get', metadata);
    }
    /**
     * Return the Foursquare record of a POI (via FSQ_ID) given a Name and Location. Provide a
     * Location by using all the Address parameters, or by LL.
     *
     * @summary Place Match
     */
    placeMatch(metadata) {
        return this.core.fetch('/v3/places/match', 'get', metadata);
    }
    /**
     * Utilize Foursquare's Snap to Place technology to detect where your user's device is and
     * what is around them.
     * The endpoint is designed to provide POI tagging that supports a check-in use case. It
     * will intentionally return lower quality results not found in Place Search. It is not
     * intended to replace Place Search as the primary way to search for top, recommended POIs.
     *
     * @summary Find Nearby Places
     */
    placesNearby(metadata) {
        return this.core.fetch('/v3/places/nearby', 'get', metadata);
    }
    /**
     * Report the selection of a place as the result of a Nearby Places request.
     *
     * @summary Report Nearby Place Selection
     */
    placeSelect(metadata) {
        return this.core.fetch('/v3/place/select', 'post', metadata);
    }
    /**
     * Returns a list of top addresses, places, geos, and/or searches partially matching the
     * provided keyword and location inputs.
     *
     * An Autocomplete session **begins** when the user starts typing a query, and
     * **concludes** when they select a result and a call is made to [Place
     * Search](https://developer.foursquare.com/reference/place-search), [Place
     * Details](https://developer.foursquare.com/reference/place-details), or [Address
     * Details](https://developer.foursquare.com/reference/address-details).
     *
     * **IMPORTANT**: Autocomplete uses session tokens to group the user's query and the user's
     * selected result into a discrete session for billing purposes. Learn more about [session
     * tokens](https://developer.foursquare.com/reference/session-tokens).
     *
     * *If the session_token parameter is omitted, the session is charged per
     * keystroke/request.*
     *
     * @summary Get Autocomplete Results
     */
    autocomplete(metadata) {
        return this.core.fetch('/v3/autocomplete', 'get', metadata);
    }
    /**
     * Retrieve details for any address including non-Places. For addresses that do include FSQ
     * Places, the response will include a `directory` field that contains a list of said FSQ
     * Places.
     *
     * @summary Get Address Details
     */
    addressDetails(metadata) {
        return this.core.fetch('/v3/address/{fsq_addr_id}', 'get', metadata);
    }
    /**
     * Monitor the status of the feedback items provided by your users.
     *
     * @summary Get Feedback Status
     */
    feedbackStatus(metadata) {
        return this.core.fetch('/v3/feedback/status', 'get', metadata);
    }
    /**
     * Provide Feedback about a problematic Place due to a variety of reasons such as closed,
     * and mislocated via its `fsq_id`.
     *
     * @summary Flag Problematic Place
     */
    placeFlag(metadata) {
        return this.core.fetch('/v3/places/{fsq_id}/flag', 'post', metadata);
    }
    /**
     * Propose edits to an existing Place’s information such as address, phone number, and
     * hours of operation via its `fsq_id`. Providing values for the parameters below constitue
     * the proposed edit.
     *
     * @summary Propose Place Edit
     */
    placeProposeEdit(metadata) {
        return this.core.fetch('/v3/places/{fsq_id}/proposeedit', 'post', metadata);
    }
}
const createSDK = (() => { return new SDK(); })();
export default createSDK;
