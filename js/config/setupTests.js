import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

/* These definitions are necessary to avoid having jest throw an error every
 * time it sees a fetch() call, because fetch is not included in node, although
 * it is a browser standard.
 * For more sophisticated mocking/testing of fetch() calls, consider using
 * https://github.com/jefflau/jest-fetch-mock
 */
const fetchPolifill = require("whatwg-fetch");
global.fetch = fetchPolifill.fetch;
global.Request = fetchPolifill.Request;
global.Headers = fetchPolifill.Headers;
global.Response = fetchPolifill.Response;

configure({ adapter: new Adapter() });
