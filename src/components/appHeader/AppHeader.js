import './appHeader.scss'
import {Link, NavLink} from 'react-router-dom'

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink 
                        end 
                        style={({isActive}) => ({color: isActive ? '#9f0013' : 'inherit' })} 
                        to="/">Characters</NavLink></li>
                    /
                    <li><NavLink 
                        style={({isActive}) => ({color: isActive ? '#9f0013' : 'inherit' })} 
                        to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;


// {/* <Container style={{ marginTop: '2rem' }}>
//         <TransitionGroup className="todo-list">
//           {items.map(({ id, text, nodeRef }) => (
//             <CSSTransition
//               key={id}
//               nodeRef={nodeRef}
//               timeout={500}
//               classNames="item"
//             >
//               <ListGroup.Item ref={nodeRef}>
//                 <Button
//                   className="remove-btn"
//                   variant="danger"
//                   size="sm"
//                   onClick={() =>
//                     setItems((items) =>
//                       items.filter((item) => item.id !== id)
//                     )
//                   }
//                 >
//                   &times;
//                 </Button>
//                 {text}
//               </ListGroup.Item>
//             </CSSTransition>
//           ))}
//         </TransitionGroup>

//       <Button
//         onClick={() => {
//           const text = prompt('Enter some text');
//           if (text) {
//             setItems((items) => [
//               ...items,
//               {
//                 id: uuid(),
//                 text,
//                 nodeRef: createRef(null),
//               },
//             ]);
//           }
//         }}
//       >
//         Add Item
//       </Button>
//     </Container> */}


  