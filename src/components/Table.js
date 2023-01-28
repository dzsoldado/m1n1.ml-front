import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Link, Button, CircularProgress, Backdrop } from '@mui/material/';

import { getLinks, deleteLink } from '../FirebaseDB';


export default function LinksTable() {

  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const css_TruncateText = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }

  useEffect(() => {
    loadTable();
  }, [])

  function loadTable() {
    getLinks()
      .then(result => {
        setRows(_ => result);
        setIsLoading(_ => false);
      })
  }

  function handleDelete(id) {
    setIsLoading(_ => true);

    deleteLink(id)
      .then(() => {
        loadTable()
      })

  }


  return (
    <>
      <TableContainer component={Paper} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Table sx={{ maxWidth: "md" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ minWidth: 100, maxWidth: 150 }}>Original Link</TableCell>
              <TableCell style={{ minWidth: 100, maxWidth: 150 }}>Short Link</TableCell>
              <TableCell style={{ minWidth: 100, maxWidth: 150 }}>Creation Date</TableCell>
              <TableCell align="center" style={{ minWidth: 100, maxWidth: 150 }}>Total Clicks</TableCell>
              <TableCell style={{ minWidth: 100, maxWidth: 150 }}></TableCell>
              <TableCell style={{ minWidth: 100, maxWidth: 150 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
              >

                <TableCell style={{ minWidth: 100, maxWidth: 150 }}><Link href={row.short_link} target='_blanc' noopener='true'>{row.short_link}</Link></TableCell>
                <TableCell title={row.original_link} style={{ minWidth: 100, maxWidth: 150, ...css_TruncateText }} >
                  {row.original_link}
                </TableCell>
                <TableCell style={{ minWidth: 100, maxWidth: 150 }}>{row.created_at}</TableCell>
                <TableCell align="center" style={{ minWidth: 100, maxWidth: 150 }}>{row.clicks_count}</TableCell>
                <TableCell align="center" style={{ minWidth: 100, maxWidth: 150 }}>
                  <Button >
                    Details
                  </Button>
                </TableCell>
                <TableCell align="center" style={{ minWidth: 100, maxWidth: 150 }}>
                  <Button onClick={() => handleDelete(row.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}