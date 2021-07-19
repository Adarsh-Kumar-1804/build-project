import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Typography, Button } from '@material-ui/core';
import { Line } from 'react-chartjs-2';

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
  const [resultAvg, setResultAvg] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  // API call from results object
  useEffect(() => {
    fetch(`/api/pipelines/${id}/builds`)
      .then((res) => res.json())
      .then((resultAvg) => {
        setResultAvg(resultAvg[0].avg);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // API call from data array
  useEffect(() => {
    fetch(`/api/pipelines/builds/${id}`)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return 'loading...';

  if (error) return 'Error!!';

  let compareRes = 0;
  let n = data.length;

  for (var i = 0; i < n - 1; i++) {
    compareRes += data[i].duration;
  }

  let prevAvg = compareRes / (n - 1);

  function printAvg(x) {
    let y = (((resultAvg - x) / x) * 100).toFixed(2);

    if (y > 70) {
      return <Typography color="secondary">+ {y}%</Typography>;
    } else if (y > 40 && y < 70) {
      return <Typography color="secondary">+ {y}%</Typography>;
    } else if (y > 0) return <Typography>+ {y}%</Typography>;
    else return <Typography>{y}%</Typography>;
  }

  let durArray = [];

  for (let i = 0; i < data.length; i++) {
    durArray[i] = data[i].duration;
  }

  let idArray = [];

  let count = 0;
  for (let i = 0; i < data.length; i++) {
    idArray[i] = count++;
  }

  const datas = {
    labels: idArray,
    datasets: [
      {
        label: '# of builds',
        data: durArray,
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" className={classes.pos}>
          Av.time: {resultAvg.toFixed(2)} mins
        </Typography>
        <Typography variant="h5" className={classes.pos}>
          {printAvg(prevAvg)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" color="secondary" onClick={toggle}>
          {!isOpen ? 'Details' : 'Close'}
        </Button>
      </CardActions>
      {isOpen ? <Line data={datas} options={options} /> : null}
    </Card>
  );
}
