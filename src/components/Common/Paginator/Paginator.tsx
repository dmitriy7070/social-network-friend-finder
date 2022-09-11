import React from 'react'
import classes from '../../Users/Users.module.css'

type PropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}


let Paginator: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {

    let pagesCount = Math.ceil(totalUsersCount / pageSize);

    let pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    let newPages;
    if (currentPage <= 10) {
        newPages = pages.slice(0, 20)
    } else {
        newPages = pages.slice(currentPage - 10, currentPage + 10)
    }

    return (
        <div className={classes.page}>
            {newPages.map(p => {
                return <a className={classes.a} ><span className={currentPage === p && classes.selectedPage}
                    onClick={(e) => { onPageChanged(p) }}> {p}</span></a>
            })}
        </div>
    )
}


export default Paginator;



////////
// import React, {useState} from "react";
// import styles from "./Paginator.module.css"
// import cn from "classnames"

// type PropsType = {
//    totalItemsCount: number,
//    pageSize: number,
//    currentPage: number,
//    portionSize?: number,

//    onPageChanged: (pageNumber: number) => void
// }

// let Paginator: React.FC<PropsType> = (props) => {

//    let {
//       totalItemsCount, pageSize, currentPage, onPageChanged,
//       portionSize = 4
//    } = props;


//    let pageCount = Math.ceil(totalItemsCount / pageSize);
//    // 101 / 5 = 20,2 = окр 21 - всегда типо 21 стр показываем

//    let pages: Array<number> = [];

//    for (let i = 1; i <= pageCount; i++) {
//       pages.push(i);
//    }

//    let portionCount = Math.ceil(pageCount / portionSize);
//    // 21/4 = 5,25 = 6 - это сколько долек всего и это число
//    // не будем меняться если с сервера не придет другое

//    let [portionNumber,
//       setPortionNumber] = useState(1);


//    let leftPortionPageNumber = ((portionNumber - 1) * portionSize) + 1;
//    // (1 - 1) = 0 * 4 = 0 + 1 = 1
//    // (2 - 1) = 1 * 4 = 4 + 1 = 5
//    // (6 - 1) = 5 * 4 = 20 + 1 = 21

//    let rightPortionPageNumber = portionNumber * portionSize;
//    // 1 * 4 = 4
//    // 2 * 4 = 8
//    // 6 * 4 = 24 - и вчыше 21 не пройдет,
//    // потому что у нас в массиве всего 21 элемент!


//    return (

//       <div className={styles.paginator}>

//          {portionNumber > 1 &&
//          <button onClick={() => setPortionNumber(portionNumber - 1)}>
//             PREV </button>
//          }

//          {pages
//             .filter(pageF => {
//                return pageF >= leftPortionPageNumber
//                   && pageF <= rightPortionPageNumber
//             })
//             .map(page => {

//                return (
//                   <span
//                      className={cn(
//                         styles.pageNumber,
//                         {[styles.selectedPage]: currentPage === page})
//                      }
//                      key={page}
//                      onClick={() => {
//                         onPageChanged(page);
//                      }}>
//             {page}
//             </span>)

//             })}

//          {portionNumber < portionCount &&
//          <button onClick={() => setPortionNumber(portionNumber + 1)}>
//             NEXT </button>
//          }

//       </div>

//    )
// }

// export default Paginator;
/////


















// let Paginator = (props) => {

//     let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

//     let pages = [];
//     for (let i = 1; i <= pagesCount; i++) {
//         pages.push(i);
//     }

//     let newPages;
//     if (props.currentPage <= 5) {
//         newPages = pages.slice(0, 10)
//     } else {
//         newPages = pages.slice(props.currentPage - 10, props.currentPage + 10)
//     }

//     return (
//         <div className={classes.page}>
//             {newPages.map(p => {
//                 return <a className={classes.a} ><span className={props.currentPage === p && classes.selectedPage}
//                     onClick={(e) => { props.onPageChanged(p) }}> {p}</span></a>
//             })}
//         </div>
//     )
// }


// export default Paginator;


















// let Paginator = (props) => {

//     let portionSize = 10;
//     let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

//     let pages = [];
//     for (let i = 1; i <= pagesCount; i++) {
//         pages.push(i);
//     }

//     let portionCount = Math.ceil(props.pagesCount / portionSize);
//     let [portionNumber, setPortionNumber] = useState(1);
//     let leftPortionPageNumber = (portionNumber -1) * portionSize + 1;
//     let rightPortionPageNumber = portionNumber * portionSize;



//     return (
//         <div className={classes.page}>
//             {portionNumber > 1 &&
//             <button onClick={() => {setPortionNumber(portionNumber - 1) }} >PREV</button> }
            
//             { pages
//             .filter(p => p >= leftPortionPageNumber && p<= rightPortionPageNumber)
//             .map ((p) => {
//                 return <a className={classes.a} href="#"><span className={props.currentPage === p && classes.selectedPage} 
//                 key={p}
//                 onClick={(e) => { props.onPageChanged(p) }}> {p}</span></a>
//             })
//             }
//             {portionCount > portionNumber &&
//             <button onClick={() => { setPortionNumber(portionNumber +1 )} }>Next</button>
//             }

         
//         </div>
//     )
// }


// export default Paginator;



