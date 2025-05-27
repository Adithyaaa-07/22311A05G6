import React, { useEffect, useState } from 'react';
import { Button, Container, Select, MenuItem, Typography, CircularProgress, Alert } from '@mui/material';
import StockChart from './StockChart';
import Heatmap from './Heatmap';

const App = () => {
  const [interval, setInterval] = useState<number>(10);
  const [data, setData] = useState<Record<string, number[]>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`http://localhost:3000/api/stocks?minutes=${interval}`);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [interval]);

  const symbols = Object.keys(data);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Stock Price Viewer
      </Typography>

      <Select
        value={interval}
        onChange={(e) => setInterval(Number(e.target.value))}
        sx={{ minWidth: 150, mr: 2 }}
      >
        {[5, 10, 30].map(i => (
          <MenuItem key={i} value={i}>{i} minutes</MenuItem>
        ))}
      </Select>

      <Button 
        variant="contained" 
        onClick={fetchData}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Refresh'}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {loading && !error && <CircularProgress sx={{ mt: 4 }} />}

      {symbols.length > 0 && !loading && (
        <>
          <StockChart prices={data[symbols[0]]} symbol={symbols[0]} />
          <Heatmap data={data} />
        </>
      )}
    </Container>
  );
};

const fetchStockData = async () => {
  try {
    const response = await fetch(
      'http://20.244.56.144/evaluation-service/stocks',
      {
        headers: {
          'Authorization': 'BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ4MzI2MjE3LCJpYXQiOjE3NDgzMjU5MTcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjdiMzdiMzAwLTAwOTctNDVjZC1iMzUyLTY3M2Q4YWNkODNhYyIsInN1YiI6IjIyMzExYTA1ZzZAY3NlLnNyZWVuaWRoaS5lZHUuaW4ifSwiZW1haWwiOiIyMjMxMWEwNWc2QGNzZS5zcmVlbmlkaGkuZWR1LmluIiwibmFtZSI6Imsgc2FpIGFkaXRoeWEiLCJyb2xsTm8iOiIyMjMxMWEwNWc2IiwiYWNjZXNzQ29kZSI6IlBDcUFVSyIsImNsaWVudElEIjoiN2IzN2IzMDAtMDA5Ny00NWNkLWIzNTItNjczZDhhY2Q4M2FjIiwiY2xpZW50U2VjcmV0IjoiZnJkYVlkUE1Ya2plYlRLWiJ9.XZxgiojv00bmOzUzqFnoqi_afo5giY2pv1zkW5POElQ', // MUST REPLACE
          'Content-Type': 'application/xml'
        }
      }
    );

    if (response.status === 401) {
      throw new Error('Please check your authorization token');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};






export default App;