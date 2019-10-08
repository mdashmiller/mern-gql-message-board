import React from 'react'

import { Link, withRouter } from 'react-router-dom'

const Nav = () => {
  return (
    <section>
      {/* <h2>
        {user ? `${user.data.signIn.username}` : 'GUEST'}
      </h2> */}
      <ul>
        <li>
          <Link to="/">Log In</Link>
        </li>
        <li>
          <Link to="/posts">Dashboard</Link>
        </li>
        <li>
          <Link to="/create-post">Create Post</Link>
        </li>
        {/* <li>
          <button onClick={handleClick}>Log Out</button>
        </li> */}
      </ul>
    </section>
  )
}

export default Nav

// import { connect } from 'react-redux'

// const mapStateToProps = state => {
//   return {
//     user: state.authReducer.user
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     deauthorize: () => dispatch(deauthorize())
//   }
// }

// const Nav = ({ history, user, deauthorize }) => {
//   const [signOut] = useMutation(SIGN_OUT)

//   async function handleClick () {
//     try {
//       await signOut()

//       deauthorize()

//       history.push('/')
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   return (
//     <section>
//       <h2>
//         {user ? `${user.data.signIn.username}` : 'GUEST'}
//       </h2>
//       <ul>
//         <li>
//           <Link to="/">Log In</Link>
//         </li>
//         <li>
//           <Link to="/posts">Dashboard</Link>
//         </li>
//         <li>
//           <Link to="/create-post">Create Post</Link>
//         </li>
//         <li>
//           <button onClick={handleClick}>Log Out</button>
//         </li>
//       </ul>
//     </section>
//   )
// }

// export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Nav))
