import NotificationPresenter from "./NotificationPagePresenter";
import React, { useState } from "react";
import { useQuery, useMutation } from "react-apollo-hooks";
import { SEARCH_NOTIFICATION, EDIT_NOTATION } from "./NotificationPageQuery";
import Loader from "../../../../../Components/Loader";

export default () => {
  const [pageNum, setPageNum] = useState(5);
  const [paging, setPaging] = useState(5);
  const { data, loading, error, refetch } = useQuery(SEARCH_NOTIFICATION);
  console.log(data);
  const [editNotification] = useMutation(EDIT_NOTATION);

  const deleteEvent = async (noficationId) => {
    if (window.confirm("삭제하시겠습니까?")) {
      await editNotification({ variables: { noficationId, actions: "EDIT" } });
      refetch();
    }
  };

  return !loading && data && data.searchNotification !== undefined ? (
    <NotificationPresenter
      data={data}
      deleteEvent={deleteEvent}
      pageNum={pageNum}
      setPageNum={setPageNum}
      paging={paging}
      setPaging={setPaging}
    />
  ) : (
    <Loader />
  );
};
