import { getConfiguredCache } from "money-clip";
import ms from "milliseconds";

// version property used to reset browser cache

export default getConfiguredCache({
  maxAge: ms.days(7),
  version: 2,
  name: "client"
});
