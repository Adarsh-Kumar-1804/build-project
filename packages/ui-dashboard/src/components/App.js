import React, { useState, useEffect } from 'react';
import OutlineCard from './Cards';
import { Grid, Typography } from '@material-ui/core';
import ButtonAppBar from './Navbar';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/pipelines`)
      .then((res) => {
        if (res.ok) return res.json();
        throw res;
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.error(err);
        setError(false);
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return 'loading...';

  if (error) return 'Error!!';

  return (
    <div>
      <ButtonAppBar />
      <Grid container spacing={4}>
        {data.map((item) => (
          <Grid item xs key={item.id}>
            <Typography variant="h5">{item.name}</Typography>
            <OutlineCard id={item.id} key={item.id} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default App;
