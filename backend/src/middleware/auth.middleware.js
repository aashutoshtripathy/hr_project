// // auth.middleware.js

// const auth = async (req, res, next) => {
//     try {
//       // Replace this with your actual password verification logic
//       const isAuthenticated = await verifyPassword(req.body.usernameEmail, req.body.password);
      
//       if (!isAuthenticated) {
//          throw new Error('Unauthorized user: User is not authenticated');
//       }
//       next();
//     } catch (error) {
//      console.error('Error in authentication middleware:', error);
//      return res.status(401).json({ error: error.message });
//     }
//  };
 
//  export { auth };
 