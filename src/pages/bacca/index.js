import React, { useState, useEffect } from 'react';
import { Grid, Input, Button } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import axios from 'axios';

// components
import PageTitle from '../../components/PageTitle';

// styles
import useStyles from './styles';

export default function Bacca() {
  var classes = useStyles();

  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [url, setUrl] = useState('/api/bacca/list');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const result = await axios(url);
        if (typeof result.data !== 'number') {
          setData(result.data);
        } else {
          setData([{ number: '', result: `Total : ${result.data}` }]);
        }
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  const handleSearch = e => {
    setSearch(e.target.value.trim().toUpperCase());
  };

  const handleSubmit = e => {
    setUrl(`/api/bacca/list/${search}`);
    e.preventDefault();
  };

  const columns = [
    {
      label: 'NUMBER',
      name: 'number',
      options: {
        sort: true,
        sortDirection: 'asc'
      }
    },
    {
      label: 'RESULT',
      name: 'result'
    }
  ];

  return (
    <>
      <PageTitle title="Search My Data - Bacca" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <form onSubmit={e => handleSubmit(e)}>
            <Input
              className={classes.inputInput}
              placeholder="Search with P,B,T......"
              value={search}
              onChange={e => handleSearch(e)}
            />
            <Button
              type="submit"
              size="large"
              color="primary"
              className={classes.buttonSearch}
            >
              Search
            </Button>
          </form>
        </Grid>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Grid item xs={12}>
            <MUIDataTable
              title="Bacca List"
              data={data}
              columns={columns}
              options={{
                filter: false,
                search: false,
                print: false,
                download: false,
                selectableRows: 'none',
                responsive: 'scrollMaxHeight',
                rowsPerPage: 1
              }}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
}
