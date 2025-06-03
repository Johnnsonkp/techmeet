import { useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 1. Clear authentication token
    localStorage.removeItem('token');
    
    // 2. (Optional) Clear other user-related data
    localStorage.removeItem('userData');
    // googleLogout();
    // 3. Redirect to home page or login
    navigate('/'); // Or navigate('/login') for login page
    
    // 4. (Optional) Add server-side logout logic here
    
    

  //    // Clear all localStorage
  //   localStorage.clear();
  
  // // Clear sessionStorage
  //   sessionStorage.clear();
  
  // // Reset application state (if using state management)
  //   dispatch(resetAuthState());
  
  //   navigate('/');
  };

    const clickButton = () => {
      navigate('/');
    };

  return (
    // this link is obsolete !! not working as Google discontinue it 
    // <a href="https://appengine.google.com/_ah/logout?continue=http://localhost:5173">
   
    <a target='./' href="https://accounts.google.com/Logout?continue=https%3A%2F%2Faccounts.google.com%2FServiceLogin%3Fsacu%3D1&il=true&zx=icxpgruz0yao">
            <button>Logout</button>
          </a> 

    // {/* <button onClick={() => handleLogout()}>Logout</button> </a> */}
  );
}

export default LogoutButton;