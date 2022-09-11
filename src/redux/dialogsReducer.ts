const SEND_MESSAGE = 'SEND-MESSAGE';

type DialogType = {
    id: number
    name: string
}

type MessageType = {
    id: number
    message: string
}

let initialState = {
    messagesData: [
        { id: 1, message: "Hi" },
        { id: 2, message: "How are you?" },
        { id: 3, message: "Hello" },
        { id: 4, message: "Yo" },
        { id: 5, message: "YO" },
        { id: 6, message: "Yo" },
        { id: 7, message: "Gav" }
    ] as Array<MessageType>,
    dialogsData: [
        { id: 1, name: "Dmitryi" },
        { id: 2, name: "Valeriia" },
        { id: 3, name: "Vladislav" },
        { id: 4, name: "Artem" },
        { id: 5, name: "Alexey" },
        { id: 6, name: "Katya" },
        { id: 7, name: "Kasper" }
    ] as Array<DialogType>
}

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: SendMessageCreatorActionType): InitialStateType => {

    switch (action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messagesData: [...state.messagesData, { id: 8, message: body }]
            };
        default:
            return state;
    }
}


type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => {
    return {
        type: SEND_MESSAGE, newMessageBody
    }
}


export default dialogsReducer;