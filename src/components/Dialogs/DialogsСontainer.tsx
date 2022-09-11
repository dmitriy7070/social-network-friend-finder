import React from "react";
import { sendMessageCreator } from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import { connect } from 'react-redux';
import { withAuthNavigate } from "../../hoc/withAuthNavigate";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        sendMessage: (newMessageBody: any) => {
            dispatch(sendMessageCreator(newMessageBody));
        }
    }
}


export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToProps /*{sendMessageCreator: sendMessageCreator}*/),
    withAuthNavigate
)(Dialogs);






// import React from "react";
// import { sendMessageCreator } from "../../redux/dialogsReducer";
// import Dialogs from "./Dialogs";
// import { connect } from 'react-redux';
// import { withAuthNavigate } from "../../hoc/withAuthNavigate";
// import { compose } from "redux";
// import { AppStateType } from "../../redux/redux-store";

// let mapStateToProps = (state: AppStateType) => {
//     return {
//         dialogsPage: state.dialogsPage
//     }
// }

// let mapDispatchToProps = (dispatch) => {
//     return {
//         sendMessage: (newMessageBody) => {
//             dispatch(sendMessageCreator(newMessageBody));
//         }
//     }
// }


// export default compose(
//     connect(mapStateToProps, mapDispatchToProps),
//     withAuthNavigate
// )(Dialogs);