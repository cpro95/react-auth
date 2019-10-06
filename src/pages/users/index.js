import React, { useState, useEffect } from 'react';
import { Grid, Button, Switch } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import axios from 'axios';

// components
import PageTitle from '../../components/PageTitle';

export default function Users() {
  const [data, setData] = useState([]);
  const [edited, setEdited] = useState(false);

  useEffect(() => {
    axios
      .get('/api/users/list')
      .then(res => {
        setData(res.data);
        // console.dir(res.data);
      })
      .catch(err => console.log(err));
  }, [edited]);

  const handleDelete = id => {
    axios
      .delete('/api/users/list/' + id)
      .then(res => {
        // console.log(res.data);
        setEdited(!edited);
      })
      .catch(err => console.log(err));
  };

  const handleActivate = (id, activate) => {
    axios
      .put('/api/users/list/' + id, { 'activated': activate })
      .then(res => {
        // console.log(res.data);
        setEdited(!edited);
      })
      .catch(err => console.log(err));
  };

  const handleChangeRole = (id, role) => {
    axios
      .put('/api/users/list/' + id, { role: role })
      .then(res => {
        // console.log(res.data);
        setEdited(!edited);
      })
      .catch(err => console.log(err));
  };

  const columns = [
    {
      label: 'ROLE',
      name: 'role',
      options: {
        display: true,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <Switch
                defaultChecked={tableMeta.rowData[0] === 'admin'}
                color="primary"
                onChange={() => {
                  if (tableMeta.rowData[0] === 'user')
                    handleChangeRole(tableMeta.rowData[1], 'admin');
                  else handleChangeRole(tableMeta.rowData[1], 'user');
                }}
              />
              {tableMeta.rowData[0]}
            </div>
          );
        }
      }
    },
    {
      label: 'ID',
      name: '_id',
      options: {
        display: false,
        filter: false,
        viewColumns: false
      }
    },
    {
      label: 'NAME',
      name: 'name'
    },
    {
      label: 'EMAIL',
      name: 'email'
    },
    {
      name: 'date',
      options: {
        display: false,
        filter: false,
        viewColumns: false
      }
    },
    {
      name: 'password',
      options: {
        display: false,
        filter: false,
        viewColumns: false
      }
    },
    {
      label: 'ACTIVATE',
      name: 'activated',
      options: {
        display: true,
        filter: false,
        // viewColumns: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <div>
              <Switch
                defaultChecked={tableMeta.rowData[6]}
                color="primary"
                onChange={() => {
                  // console.log(tableMeta.rowData);
                  handleActivate(tableMeta.rowData[1],!tableMeta.rowData[6]);
                }}
              ></Switch>
              {tableMeta.rowData[6] ? 'Y' : 'N'}
            </div>
          );
        }
      }
    },
    {
      name: 'DELETE',
      options: {
        display: true,
        filter: false,
        viewColumns: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                // console.log(tableMeta.rowData[1]);
                handleDelete(tableMeta.rowData[1]);
              }}
            >
              Delete
            </Button>
          );
        }
      }
    }
  ];

  return (
    <>
      <PageTitle title="Manage Users" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="User Lists"
            data={data}
            columns={columns}
            options={{
              filterType: 'checkbox',
              responsive: 'scrollMaxHeight',
              print: false,
              download: false,
              selectableRows: 'none'
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
