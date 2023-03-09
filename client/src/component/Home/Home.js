import React ,{useEffect , useState} from 'react'
import { Container, Grow, Grid, Paper , AppBar , TextField , Button} from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch } from 'react-redux';
import Pagination from '../pagination'
import {getPosts, getPostsBySearch} from '../../actions/posts'
import { useNavigate , useLocation } from 'react-router';
import ChipInput from 'material-ui-chip-input'
import { ClassNames } from '@emotion/react';
import useStyles from '../Home/styles'


function useQuery(){
  return new URLSearchParams(useLocation().search)
}

const Home = () => {
   
    const dispatch = useDispatch();
    const [currentId , setCurrentId] = useState(null);
    const query = useQuery();
    const Navigate = useNavigate()
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery')
    const classes = useStyles()
    const [search , setSearch] = useState('')
    const [tags , setTags] = useState([])
    const handleAdd =(tag)=> setTags([...tags , tag]);
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete));

    const searchPost =()=>{
      if(search.trim() || tags) {
        dispatch(getPostsBySearch({search , tags : tags.join(',')}))
        Navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      }else{
        Navigate('/');
      }
    }

    const handleKeyPress = (e)=>{
          if(e.keyCode === 13) {
            searchPost(); 
          }
    }

    // useEffect(() => {
    //   dispatch(getPosts());
    // }, [currentId,dispatch]);

    

  return (
    <Grow in>
        <Container maxWidth ="xl">
                  <Grid container justify="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts  setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                <TextField name='search' variant='outlined' label='Search Memories' fullWidth value={search} onChange={(e)=>setSearch(e.target.value)}
                onKeyPress ={handleKeyPress}
                />
                <ChipInput 
                margin='10px 0px'
                value ={tags}
                onAdd ={handleAdd}
                onDelete ={handleDelete}
                label = 'Search Tags'
                variant ='outlined'
                />
                <Button onClick={searchPost} className={classes.searchbutton} color='primary' variant='contained'>Search</Button>
              </AppBar>
              <Form setCurrentId={setCurrentId} currentId={currentId}/>
              <Paper elevation={6} className = {classes.paper}>
                  <Pagination page={page}/>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow> 
  );
}

export default Home