import * as React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';
import axios from "axios";
import Button from '@mui/material/Button';
import {KeyboardArrowRight} from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import Layout from '../../components/Layout';

export default function AddMenuPage() {
  const [comics, setComics] = useState([])
  useEffect(()=>{
    axios.get('http://localhost:8000/comics/list').then(resp=>{
      console.log('comics',setComics(resp.data))
    }).catch(err=>{console.log(err)})
  },[]);

  const [currentComics, setCurrentComics] = useState(null);
  const [message, setMessage] = useState('')
  const changeComics = (event) =>{
    // console.log(event.target.value)
    setMessage(event.target.value);
    comics.map(item =>{
      if(item.id == event.target.value){
        setCurrentComics(item);

      }
    })
  }

  const [number, setNumber] = useState('')
  const [image, setImage] = useState()

  const numChange = (event) => {
    setNumber(event.target.value);
  };
  const imageChange = (event) => {
    setImage(event.target.files[0]);

  };
  const i = axios.get('http://localhost:8000/comics/all_pages').then(res=>{
      const data = res.data;
      console.log(data)
      var a = 0;
     const id =  data.map(items =>{
        if (a <= items.id){
          a = items.id
          return (a)
        }
      })
      console.log(a+1)
      return (a+1)
    });
  
  const handleSubmit = async e =>{
    const id = await i;
    if (number && image && currentComics && message){
      let formData = new FormData();
      formData.append('id', id)
      formData.append('number', number)
      formData.append('lang', currentComics.lang)
      formData.append('image', image)
      formData.append('comics_id', message )
      
      const config = {
        method: 'post',
        url: 'http://localhost:8000/comics/create-page',
        headers: { 
          'Accept': 'application/json',
          'Content-Type':'multipart/form-data'
        },
        data : formData
      };
      axios(config).then(function(responce){
        console.log(responce)
      }).catch(function(error){
        console.log(error)
      })
    } else {
      alert('error');
    }
  }
  return(
  <Layout> 
    <Box 
  sx={{
    p:'20px',
    width: 500,
    maxWidth: '100%',
  }}
  gap = '8px'
  display='flex'
  flexDirection= 'column'
    > 
    <h3> Create Page</h3>  
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Comics Name</InputLabel>
        <Select labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={message}
          label="Comics_id"
          onChange={changeComics}>
            {comics.map((items) =>
            // eslint-disable-next-line react/jsx-key
            <MenuItem value={items.id}>{items.ComicsName}</MenuItem>
            )}
          </Select>
        </FormControl>
      <TextField fullWidth label="Page_Number" id="Page Number" value={number} onChange={numChange}/>
      <Button width ='fit-content' variant="contained" component="label">
        ADD IMAGE
        <input hidden accept="image/*" multiple type="file" onChange={imageChange}/>
      </Button>
    <Button width ='fit-content' onClick={handleSubmit } color='secondary' endIcon={<KeyboardArrowRight/>} >Submit</Button>
    </Box>
    </Layout>
  )
}
