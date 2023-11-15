"use client";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


interface Props{
  tabs: string[];
  content: React.ReactNode[];
}
export default function TabInfo(props : Props) {
  return (
    <Tabs defaultActiveKey={props.tabs[0].toLowerCase()} id="fill-tab-example" className="mb-3" fill >
      {props.tabs.map((tab, index) => (
        <Tab key={index} eventKey={tab.toLowerCase()} title={tab} >
          {props.content[index]}
        </Tab>
      ))}
    </Tabs>
  );
}
