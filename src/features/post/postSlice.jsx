 import { createSlice,nanoid,createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from 'date-fns'
import axios from 'axios'

const POSTS_URL = 'http://jsonplaceholder.typicode.com/posts'
 const initialState = {
   posts: [],
   status: 'idle', //'idle' | loading | "succeeded" | "failed"
   error: null,
 }
export  const fetchPosts = createAsyncThunk('posts/fetchPosts',async ()=>{
    try{
      const response = await axios.get(POSTS_URL)
      return response.data
  }catch(err){
    return err.message
    }
  }) 

  export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) =>{
    try{
      const res = await axios.post(POSTS_URL, initialPost)
      return res.data
    }catch(err){
      return err.message
    }
    })
   export const postSlice = createSlice({
     name: "posts",
     initialState,
     reducers: {
       postAdded: {
         reducer(state, action) {
           state.posts.push(action.payload);
         },
         prepare(title, content, userId) {
           return {
             payload: {
               id: nanoid,
               title,
               content,
               date: new Date().toISOString(),
               userId,
               reactions: {
                 thumbUp: 0,
                 wow: 0,
                 heart: 0,
                 rocket: 0,
                 coffee: 0,
               },
             },
           };
         },
       },
       reactionAdded(state, action) {
         const { postId, reaction } = action.payload;
         const existingPost = state.posts.find((post) => post.id === postId);
         if (existingPost) {
           existingPost.reactions[reaction]++;
         }
       },
     },
     extraReducers(builder) {
       builder
         .addCase(fetchPosts.pending, (state, action) => {
           state.status = "loading";
         })
         .addCase(fetchPosts.fulfilled, (state, action) => {
           state.status = "succeeded";
           // addig date and reactions
           let min = 1;
           const loadedPosts = action.payload.map((post) => {
             post.date = sub(new Date(), { minutes: min++ }).toISOString();
             post.reactions = {
               thumbUp: 0,
               wow: 0,
               heart: 0,
               rocket: 0,
               coffee: 0,
             };
             return post;
           });
           // Add any fetched data to the array
           state.posts = state.posts.concat(loadedPosts);
         })
         .addCase(fetchPosts.rejected, (state, action) => {
           state.status = "failed";
           state.error = action.error.message;
         })

         .addCase(addNewPost.fulfilled, (state, action) => {
           action.payload.userId = +action.payload.userId;
           action.payload.date = new Date().toISOString();
           action.payload.reactions = {
             thumbUp: 0,
             wow: 0,
             heart: 0,
             rocket: 0,
             coffee: 0,
           };
           console.log(action.payload);
           state.posts.push(action.payload);
         });
     },
   });
 export const selectAllPost = (state) => state.posts.posts
 export const getPostsStatus = (state) => state.posts.status
 export const getPostsError = (state) => state.posts.error

 export const {postAdded, reactionAdded} = postSlice.actions
export default postSlice.reducer;

     // const initialState = [
     //   {id:'1', title:'Learning redux tool kit', content: 
     //   ' I ve heard good thing about redux tolkit',date:
     // sub(new Date(), {minutes: 10}).toISOString(),
   // reactions:{
   //   thumbUp:0,
   //   wow:0,
   //   heart:0,
   //   rocket:0,
   //   coffee:0
   // }
   // },
   //   {id:'2', title:'Slices...', 
   //   content: ' The more I say Slice the more i understand',
   //    date: sub(new Date(), {minutes:5}).toISOString(),
   //    reactions:{
   //     thumbUp:0,
   //     wow:0,
   //     heart:0,
   //     rocket:0,
   //     coffee:0
   //   }
   // }
   // ];*/