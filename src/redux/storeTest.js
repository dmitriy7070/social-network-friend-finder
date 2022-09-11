import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import sidebarReducer from "./sidebarReducer";

let store = {
    _state: {
        profilePage: {
            postData: [
                { id: 1, message: 'Hi, how are you?', likesCount: '17' },
                { id: 2, message: 'My first post!', likesCount: '23' }
            ],
            newPostText: ''
        },
        dialogsPage: {
            messagesData: [
                { id: 1, message: "Hi" },
                { id: 2, message: "How are you?" },
                { id: 3, message: "Hello" },
                { id: 4, message: "Yo" },
                { id: 5, message: "YO" },
                { id: 6, message: "Yo" },
                { id: 7, message: "Gav" }
            ],
            dialogsData: [
                { id: 1, name: "Dmitryi" },
                { id: 2, name: "Valeriia" },
                { id: 3, name: "Vladislav" },
                { id: 4, name: "Artem" },
                { id: 5, name: "Alexey" },
                { id: 6, name: "Katya" },
                { id: 7, name: "Kasper" }
            ],
            newMessageBody: ""
        },
        sidebar: {},
    },
    getState() {
        return this._state;
    },
    _callSubscriber() {
        console.log('');
    },
    subscribe(observer) {
        this._callSubscriber = observer; //наблюдатель (патерн) 
    },

    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);

    }

}




export default store;

window.store = store;



// store - OOP





