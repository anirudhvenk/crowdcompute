




// auth0-config.js
// const passport = require('passport');
// const Auth0Strategy = require('passport-auth0');

// const strategy = new Auth0Strategy({
//   domain: 'your-auth0-domain',
//   authRequired: false,
//   auth0Logout: true,
//   secret: 'bf51056391047000',
//   baseURL: 'http://localhost:3000',
//   clientID: '6IYQU4W1Hcs5PcIroIDjf288MjSNJTiF',
//   issuerBaseURL: 'https://dev-8oa5adtk8rwe2smg.us.auth0.com'
// }, (accessToken, refreshToken, extraParams, profile, done) => {
//   return done(null, profile);
// });

// passport.use(strategy);

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

// module.exports = {
//   initialize: passport.initialize(),
//   session: passport.session(),
//   loginRequired: (req, res, next) => {
//     if (!req.isAuthenticated()) {
//       return res.redirect('/auth/login');
//     }
//     next();
//   },
// };



// const GITHUB_CLIENT_ID = '76b19a431569f2ae5645';
// const GITHUB_CLIENT_SECRET = '15fd7a37c2e34618aa78d3920d64680185da30ff';
// const GITHUB_CALLBACK_URL = 'http://localhost:3000/Home';
// const githubOAuthURL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user`;
// //const ACCESS_TOKEN = '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'

//const GitHubOAuth = () => {
//     const handleLogin = async (code) => {
//       try {
//         // Exchange the code for an access token
//         const data = await fetch('https://github.com/login/oauth/access_token', {
//           method: 'POST',
//           body: JSON.stringify({
//             client_id: GITHUB_CLIENT_ID,
//             client_secret: GITHUB_CLIENT_SECRET,
//             code,
//           }),
//           headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json' // Specify the Accept header for JSON response
//           }
//         }).then(response => response.json());
  
//         const accessToken = data.access_token;
  
//         // Fetch the user's GitHub profile
//         const userProfileResponse = await fetch('https://api.github.com/user', {
//           headers: {
//             'Authorization': `Bearer ${accessToken}`,
//             'User-Agent': 'Your-App-Name'
//           }
//         });
  
//         const userProfile = await userProfileResponse.json(); // Parse the response to JSON
  
//         // Handle the user profile data (e.g., store it in your database and log the user in)
//         console.log(`Welcome, ${userProfile.name}!`); // Access the name field from the profile
//       } catch (error) {
//         console.error(error);
//       }
//     };
  
//     const handleGitHubCallback = () => {
//       const queryString = window.location.search;
//       const urlParams = new URLSearchParams(queryString);
//       const code = urlParams.get('code');
      
//       if (code) {
//         handleLogin(code);
//       }
//     };
  
//     React.useEffect(() => {
//       handleGitHubCallback();
//     }, []);
  
//     return (
//       <div>
//         <a href={githubOAuthURL}>Sign in with GitHub</a>
//       </div>
//     );
//  };
  
//   export default GitHubOAuth;
