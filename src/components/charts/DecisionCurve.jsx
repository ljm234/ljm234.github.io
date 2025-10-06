"use client";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
export default function DecisionCurve({ data }){
  return (
    <div className="h-64 w-full border rounded-lg p-2">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="threshold" domain={[0,1]} type="number" />
          <YAxis />
          <Tooltip /><Legend />
          <Line dataKey="model" dot={false} isAnimationActive={false}/>
          <Line dataKey="treat_all" dot={false} isAnimationActive={false}/>
          <Line dataKey="treat_none" dot={false} isAnimationActive={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
