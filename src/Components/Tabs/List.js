import React from "react";
import * as moment from "moment";

const List = ({ data }) => {
  return (
    <div className="table">
      <table>
        <tr>
          <th>Title</th>
          <th>User</th>
          <th>Date</th>
          <th>Time</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.title}</td>
              <td>{val.username}</td>
              <td>{moment(val.searchDate).format("DD/MM/YYYY")}</td>
              <td>{moment(val.searchDate).format("HH:MM")}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default List;
