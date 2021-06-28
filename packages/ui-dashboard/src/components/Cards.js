import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Typography, Button } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  title: {
    fontSize: 10,
  },
  pos: {
    marginBottom: 2,
  },
});
export default function OutlineCard({ id }) {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let results = {};

  useEffect(() => {
    fetch(`http://localhost:4000/api/${id}/builds`)
      .then((res) => {
        if (res.ok) return res.json();

        throw res;
      })
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return 'loading...';

  if (error) return 'Error!!';

  data.forEach((element) => {
    results[element.pipelineId] = {
      total:
        ((results[element.pipelineId] && results[element.pipelineId].total) ||
          0) + element.duration,
      count:
        ((results[element.pipelineId] && results[element.pipelineId].count) ||
          0) + 1,
      avg:
        (results[element.pipelineId] &&
          (results[element.pipelineId].total + element.duration) /
            (results[element.pipelineId].count + 1)) ||
        element.duration,
    };
  });

  let compareRes = 0;
  let n = data.length;

  for (var i = 0; i < n - 1; i++) {
    compareRes += data[i].duration;
  }

  let prevAvg = compareRes / (n - 1);

  function printAvg(x) {
    let y = (((results[`${id}`].avg - x) / x) * 100).toFixed(2);

    if (y > 70) {
      return <Typography color="secondary">+ {y}%</Typography>;
    } else if (y > 40 && y < 70) {
      return <Typography color="secondary">+ {y}%</Typography>;
    } else if (y > 0) return <Typography>+ {y}%</Typography>;
    else return <Typography>{y}%</Typography>;
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" className={classes.pos}>
          {results[`${id}`].avg} {printAvg(prevAvg)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="outlined"
          color="secondary"
          href="http://localhost:8000/builds"
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
