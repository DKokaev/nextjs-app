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
import { KeyboardArrowRight} from '@mui/icons-material';
import Layout from '../../components/Layout';


const url = 'http://localhost:8000/comics/lang';

export default function AddMenuComics() {
  const i = axios.get('http://localhost:8000/comics/list').then(res=>{
    const data = res.data;
    // console.log(data)
    var a = 0;
  if (data == 0){
    console.log('k')
    return 1;
  }else{
    const total = data.map(items=>{
      if (a < items.id){
        a = items.id;
        return a;
      }
    })
    return Number(total)+1
  }})
  const [name, setName] = useState('')
  const [description, setDescr] = useState('')
  const [ico, setIco] = useState()

  const nameChange = (event) => {
    setName(event.target.value);
    // console.log(event.target.value)
  };
  const descrChange = (event) => {
    setDescr(event.target.value);
    // console.log(event.target.value)
  };
  const icoChange = (event) => {
    setIco(event.target.files[0]);
    // console.log(event.target.files[0])
  };
  
  const handleSubmit = async e =>{
    const id = await i;
    // console.log(id)
    if (name && description && ico && message){
        let formData = new FormData();
      formData.append('id', id)
      formData.append('name', name)
      formData.append('description', description)
      formData.append('lang', message )
      formData.append('ico', ico )

      const config = {
        method: 'post',
        url: 'http://localhost:8000/comics/create',
        headers: { 
          'Accept': 'application/json',
          'Content-Type':'multipart/form-data'        },
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

  const [lang, setLang] = useState([])
  useEffect(()=>{
    axios.get(url).then(resp=>{
      console.log('language',setLang(resp.data))
    }).catch(err=>{console.log(err)})
  },[]);

  const [message, setMessage] = useState('')
  const changeLang = (event) =>{
    setMessage(event.target.value)
  }
  if (!lang.length) return <h4>Loading...</h4>;


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
<h3> Create Comics</h3>  
  <TextField label="Comics Name" id="Com_name" value={name} onChange={nameChange}/>
    
        <FormControl>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={message}
          label="Language"
          onChange={changeLang}>
            {lang.map((items, index) =>
            <MenuItem key={index} value={items.name}>{items.name}</MenuItem>
            )}
          </Select>
        </FormControl>
      <TextField label="Description" id="Com_descr" value={description} onChange={descrChange}/>

      <Button variant="contained" component="label" width ='fit-content'>
        ADD ICON
        <input hidden accept="image/*" multiple type="file" onChange={icoChange}/>
      </Button>
    <Button width ='fit-content' onClick={handleSubmit } color='secondary' endIcon={<KeyboardArrowRight/>}>Submit</Button>
    </Box>
    </Layout>
  )
}
