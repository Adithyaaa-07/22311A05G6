import React from 'react';

const getColor = (value: number) => {
  const alpha = Math.abs(value);
  return value >= 0
    ? `rgba(0, 200, 0, ${alpha})`
    : `rgba(200, 0, 0, ${alpha})`;
};

function correlation(x: number[], y: number[]): number {
  const n = x.length;
  const meanX = x.reduce((a, b) => a + b) / n;
  const meanY = y.reduce((a, b) => a + b) / n;

  let num = 0, denX = 0, denY = 0;
  for (let i = 0; i < n; i++) {
    const dx = x[i] - meanX;
    const dy = y[i] - meanY;
    num += dx * dy;
    denX += dx * dx;
    denY += dy * dy;
  }

  return denX && denY ? +(num / Math.sqrt(denX * denY)).toFixed(2) : 0;
}

const Heatmap = ({ data }: { data: Record<string, number[]> }) => {
  const symbols = Object.keys(data);

  return (
    <div>
      <h4>Correlation Heatmap</h4>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr><th></th>{symbols.map(s => <th key={s}>{s}</th>)}</tr>
        </thead>
        <tbody>
          {symbols.map((rowSym, i) => (
            <tr key={rowSym}>
              <th>{rowSym}</th>
              {symbols.map((colSym, j) => {
                const corr = correlation(data[rowSym], data[colSym]);
                return (
                  <td key={j} style={{
                    padding: 5,
                    backgroundColor: getColor(corr),
                    color: '#fff',
                    textAlign: 'center'
                  }}>{corr}</td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Heatmap;
