import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';


const EventGenre = ({ events }) => {
    // Manually set the genres and colours that we will use in the Pie Chart
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
    const colours = ['#0047AB', '#58508d', '#bc5090', '#ff6361', '#ffa600'];

    // Function to get the data that we will include in the Pie Chart
    const getData = () => {
        const data = genres.map((genre) => {
            const value = events.filter((event) =>
                event.summary.split(' ').includes(genre)).length;

                return { name: genre, value };
        });
        return data;
    }

    // useEffect will listen to changes to the events prop and then set the state
    useEffect(() => {
        setData(() => getData());
    }, [events]);

    // useState will set the state when there are events
    const [data, setData] = useState([]);

    return (
        <ResponsiveContainer height={400} >
          <PieChart width={400} height={400} >
            <Legend layout="vertical" verticalAlign="top" align="right"/>
            <Pie
              data={data}
              cx={200}
              cy={200}
              labelLine={false}
              outerRadius={80}
              dataKey="value"
              label={({ name, percent }) => {
                if (percent < 0.05) {
                  return ``
                } else {
                  return `${name} ${(percent * 100).toFixed(0)}%`
                }
                }
              }
            >
              {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colours[index]}/>
                ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
    );
}

export default EventGenre;
