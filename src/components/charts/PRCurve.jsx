"use client";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
export default function PRCurve({ data }){
  return (
    <div className="h-64 w-full border rounded-lg p-2">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="recall" type="number" domain={[0,1]} />
          <YAxis dataKey="precision" type="number" domain={[0,1]} />
          <Tooltip />
          <Line dataKey="precision" dot={false} isAnimationActive={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
