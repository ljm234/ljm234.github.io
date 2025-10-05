"use client";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, ReferenceLine } from "recharts";

export default function CalibrationChart({ data }) {
  return (
    <div className="h-64 w-full border rounded-lg p-2">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis dataKey="expected" type="number" domain={[0,1]} />
          <YAxis dataKey="observed" type="number" domain={[0,1]} />
          <Tooltip />
          <ReferenceLine segment={[{x:0,y:0},{x:1,y:1}]} strokeDasharray="4 4" />
          <Line dataKey="observed" dot isAnimationActive={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
