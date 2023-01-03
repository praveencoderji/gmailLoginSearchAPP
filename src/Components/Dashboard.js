import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import List from "./Tabs/List";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect( () => {
    async function fetchData() {
        const result = await axios.get("http://localhost:8080/api/list?lastDays=7");
        setData(result.data);
      }
      fetchData();
    
  }, []);
  const onChange = async (key) => {
    let result;
    switch (key) {
      case "1":
        result = await axios.get("http://localhost:8080/api/list?lastDays=7");
        break;
      case "2":
        result = await axios.get("http://localhost:8080/api/list?lastDays=1");
        break;
      default:
        result = await axios.get(
          "http://localhost:8080/api/list/hours?lastHours=1"
        );
    }

    setData(result.data);
  };
  return (
    <Tabs
      defaultActiveKey="1"
      onChange={onChange}
      items={[
        {
          label: `Past 7 Days Search Results`,
          key: "1",
          children: <List data={data} />,
        },
        {
          label: `Past 1 Day Results`,
          key: "2",
          children: <List data={data} />,
        },
        {
          label: `Past 1 Hour Results`,
          key: "3",
          children: <List data={data} />,
        },
      ]}
    />
  );
};
export default Dashboard;
