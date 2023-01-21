import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from "axios";
import MUIDataTable from "mui-datatables";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Buttons from "../../components/page_components/Button";
import Button from '@mui/material/Button';
import Layout from '../../components/Layout';

const columns = [
  { field: 'id', label: 'ID', width: 70 },
  { field: 'ComicsName', label: 'Name', width: 130 },  
  { field: 'lang', label: 'lang', width: 130 },
  { field: 'description', label: 'description', width: 130 },
  { field: 'ico', label: 'ico', width: 130 },
  { field: 'page', label: 'pages', width: 130 },
  {
    field:'actions',type:'action',
  }
];
const url = 'http://localhost:8000/comics/list'

const Comics =() =>{
  const names = columns.map(items =>{
    return items.field;
  })

  const fetchData = ()=>{
    axios.get(url).then(resp=>{
      console.log('Full',setPosts(resp.data));
    }).catch(err=>{console.log(err)})
  }

  const [posts, setPosts] = useState([])
  useEffect(()=>{
    axios.get(url).then(resp=>{
      console.log('Full',setPosts(resp.data));
    }).catch(err=>{console.log(err)});
     console.log(posts);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const dropButton_func = (id) =>{
    console.log(id);
      const config = {
        method: 'post',
        url: 'http://localhost:8000/comics/drop_comm',
        headers: { 
          'Accept': 'application/json',
          'Content-Type':'application/json'
        },
        data : {
          id:id
        }
      };
    
      axios(config).then(function(responce){
        fetchData();
        console.log(responce)
      }).catch(function(error){
        console.log(error)
      })
    
  }

  // if (!posts.length) return <h4>Loading...</h4>;

  const data = posts.map(items =>{
    const message = Object.values(items);
    const page = items.page.length;
    message[5]=page;
    message[6]=<Button onClick={()=>{
      dropButton_func(message[0])
    }} color='secondary'>Delete</Button>
    return message
    })

  function table_2(param){
    console.log(param)
      const data = posts[param[0]-1].page.map(items =>{
        const num = Object.values(items)
        return (  <TableRow key={num[0]}>
            <TableCell component="th" scope="row">{num[0]}</TableCell>
            <TableCell align="right">{num[1]}</TableCell>
            <TableCell align="right">{num[2]}</TableCell>
            <TableCell align="right">{num[3]}</TableCell>
          </TableRow>
        )})
      // console.log(data)
      return data
    }

  const options = {
    filter: true,
    onFilterChange: (changedColumn, filterList) => {
      // console.log(changedColumn, filterList);
    },
    selectableRows: "single",
    filterType: "dropdown",
    responsive: "standart",
    rowsPerPage: 10,
    expandableRows: true,
    renderExpandableRow: (rowData, rowMeta) => {
      // console.log(rowData, rowMeta);
      return (
        <React.Fragment>
          <tr>
            <td colSpan={6}>
              <TableContainer component={Paper}>
                <Table style={{ minWidth: "700" }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="right">id</TableCell>
                      <TableCell align="right">PageNumber</TableCell>
                      <TableCell align="right">Lang</TableCell>
                      <TableCell align="right">imageUrl</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      table_2(rowData)
                    }
                  </TableBody>
                </Table>
              </TableContainer>
            </td>
          </tr>
        </React.Fragment>
      );
    },
    page: 1
  };
  return(
    <Layout>
    <div className="PageClass">
   <Box display='flex' gap = '20px' alignItems={'center'}>
   <h1 className="PageMessage">Comics</h1>
    <Buttons variant='contained' text = 'CREATE_COMICS' href = './comics/create_comics'/>
    <Buttons variant='contained' text = 'CREATE_PAGE' href = './comics/create_page'/>
   </Box>
    <div>
    <MUIDataTable
      title={'Comics'}
      data= {data}
      columns={columns}
      options={options}
    />
    </div>
    </div>
  </Layout>
  )
}
export default Comics
