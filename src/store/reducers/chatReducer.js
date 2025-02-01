import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../api/api';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const add_friend = createAsyncThunk(
    'chat/add_friend',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            // await delay(1000);
            const { data } = await api.post('/chat/customer/add-customer-friend', info);
            // console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const send_message = createAsyncThunk(
    'chat/send_message',
    async (info, { rejectWithValue, fulfillWithValue }) => {
        try {
            const { data } = await api.post('/chat/customer/send-message-to-seller', info);
            console.log(data);
            return fulfillWithValue(data);
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const chatReducer = createSlice({
    name: 'chat',
    initialState: {
        my_friends: [],
        fb_messages: [],
        currentFd: "",
        errorMessage: '',
        successMessage: '',
        loader: false,
        loaderMessages: false,
    },
    reducers: {
        messageClear: (state, _) => {
            state.errorMessage = '';
            state.successMessage = '';
        },
        updateMessage: (state, { payload }) => {
            state.fb_messages = [...state.fb_messages, payload];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(add_friend.fulfilled, (state, { payload }) => {
                state.fb_messages = payload.messages;
                state.currentFd = payload.currentFd;
                state.my_friends = payload.MyFriends;
                state.loader = false;
            })
            .addCase(add_friend.rejected, (state) => {
                state.loaderMessages = false;
            })
            .addCase(add_friend.pending, (state) => {
                state.loaderMessages = true;
            })

            .addCase(send_message.fulfilled, (state, { payload }) => {
                let tempFriends = state.my_friends;
                let index = tempFriends.findIndex(f => f.fdId === payload.message.receverId);

                while (index > 0) {
                    let temp = tempFriends[index];
                    tempFriends[index] = tempFriends[index - 1];
                    tempFriends[index - 1] = temp;
                    index--;
                }

                state.my_friends = tempFriends;
                state.fb_messages = [...state.fb_messages, payload.message];
                state.successMessage = 'Message Send Success';

                state.loaderMessages = false;
            })
            .addCase(send_message.rejected, (state) => {
                state.loaderMessages = false;
            })
            .addCase(send_message.pending, (state) => {
                state.loaderMessages = true;
            })
    }
});

export const { messageClear, updateMessage } = chatReducer.actions;
export default chatReducer.reducer;