import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
  uri: "http://localhost:4000",
  clientState: {
    defaults,
    resolvers
  },
  request: (operation) => {
    const token = localStorage.getItem("token");

    //로그인했을때 토큰을 주기위함
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
  },
  onError: (error) => {
    if (
      !(
        error.operation.operationName === "findUserInfo" ||
        error.operation.operationName === "inflowFindUser" ||
        error.operation.operationName === "findUser" ||
        error.operation.operationName === "searchPost" ||
        error.operation.operationName === "allPost" ||
        error.operation.operationName === "allBanner" ||
        error.operation.operationName === "allBanner" ||
        error.operation.operationName === "searchTeamName" ||
        error.operation.operationName === "checkUserEmail" ||
        error.operation.operationName === "oneOfPost" ||
        error.operation.operationName === "searchEpisode" ||
        error.operation.operationName === "searchEpisode" ||
        error.operation.operationName === "findCategory" ||
        error.operation.operationName === "guestOneOfPost" ||
        error.operation.operationName === "findEpisodeReportCategory" ||
        error.operation.operationName === "searchEpisode" ||
        error.operation.operationName === "myLikesOfOneEpisode" ||
        error.operation.operationName === "myUnLikesOfOneEpisode" ||
        error.operation.operationName === "searchEpisode" ||
        error.operation.operationName === "findSubscriptionPost" ||
        error.operation.operationName === "findSubscriptionPost" ||
        error.operation.operationName === "searchNotification" ||
        error.operation.operationName === "guestOneOfPost"
      )
    ) {
      // localStorage.removeItem("userEmailToken");
      // localStorage.removeItem("token");
    }
  }
});
