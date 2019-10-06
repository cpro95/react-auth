import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import axios from 'axios';

// styles
import useStyles from './styles';

// components
import Widget from '../../components/Widget';
import PageTitle from '../../components/PageTitle';
import { Typography } from '../../components/Wrappers';

export default function Dashboard(props) {
  var classes = useStyles();

  const [total, setTotal] = useState(0);
  const [startP, setStartP] = useState(0);
  const [startB, setStartB] = useState(0);
  const [startT, setStartT] = useState(0);

  useEffect(() => {
    axios
      .get('/api/bacca/list')
      .then(res => {
        console.log(res.data);
        setTotal(Number(res.data));
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get('/api/bacca/list/P')
      .then(res => {
        setStartP(Number(res.data.length));
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get('/api/bacca/list/B')
      .then(res => {
        setStartB(Number(res.data.length));
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get('/api/bacca/list/T')
      .then(res => {
        setStartT(Number(res.data.length));
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      {/* <PageTitle title="Dashboard" button="Latest Reports" /> */}
      <PageTitle title="Dashboard" />
      <Grid container spacing={4}>
        {/* <Grid item lg={3} md={4} sm={6} xs={12}> */}
        <Grid item lg={6} md={6} sm={6} xs={12}>
          <Widget
            title="Search My Data - Bacca"
            upperTitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
            disableWidgetMenu={true}
          >
            <div className={classes.visitsNumberContainer}>
              <Typography size="xl" weight="medium">
                {total.toLocaleString()}
              </Typography>
            </div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography color="text" colorBrightness="secondary">
                  Start with P
                </Typography>
                <Typography size="md">{startP.toLocaleString()}</Typography>
              </Grid>
              <Grid item>
                <Typography color="text" colorBrightness="secondary">
                  Start with B
                </Typography>
                <Typography size="md">{startB.toLocaleString()}</Typography>
              </Grid>
              <Grid item>
                <Typography color="text" colorBrightness="secondary">
                  Start with T
                </Typography>
                <Typography size="md">{startT.toLocaleString()}</Typography>
              </Grid>
            </Grid>
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}
