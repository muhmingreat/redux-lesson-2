import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const USERS_URL = 'https://jsonplaceholder.typicode.com/users'

                            
const initialState = []
//     {id:'0', name:'Muhmin Soliu' },
//     {id:'1', name:'Ayoolu Sodiq' },
//     {id:'2', name:'Ayatullah mumin' },
export const fetchUsers = createAsyncThunk('user/fetchUsers',async () => {
    try{
        const res = await axios.get(USERS_URL)
        return  res.data
    }catch(err){
        return err.message
    }
})
const usersSlice = createSlice({
    name:'users',
    initialState,
    reducers:{},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) =>{
            return action.payload
        })
    }
})

export const selectAllUsers = ( state) => state.users;
 export default usersSlice.reducer