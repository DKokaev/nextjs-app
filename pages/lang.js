import Buttons from '../components/page_components/Button'
import * as React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from "axios";
import Layout from '../components/Layout';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
];
const url = 'http://localhost:8000/comics/lang'
export default function Lang() {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    axios.get(url).then(resp=>{
      console.log('table',setPosts(resp.data))
    }).catch(err=>{console.log(err)})
  },[]);
  if (!posts.length) return <h4>Loading...</h4>;

  return (
    <Layout>
    <div className="PageClass">
      <h1 className="PageMessage">Languages</h1>
      <DataGrid
      autoHeight={true}
        rows={posts}
        columns={columns}
        pageSize={columns.length +1}
        rowsPerPageOptions={[3]}
      /> 
    <Buttons variant='contained' text = 'BACK' href = './'/>
    </div>
    </Layout>
  )
}