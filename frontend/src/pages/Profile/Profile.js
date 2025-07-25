import './Profile.css'
import { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
function Profile() {
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const date = new Date().toLocaleDateString('en-US', options); //only date, not time

    const [isSignedIn, setIsSignedIn] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [user, setUser] = useState();

    const verifylogin = async () => {
        try {
            const res = await fetch(`http://localhost:3000/api/users/verifyE?email=${email}&password=${password}`);
            const result = await res.json();

            if (res.status === 200) {
                setUser(result);
                setIsSignedIn(true);
                localStorage.setItem("user", JSON.stringify(result)); //browsers feature, key-value //object->string(stringify)
            } else {
                alert("Invalid credentials"); // Or handle error more nicely
            }
        } catch (err) {
            console.error(err);
            alert("Login error occurred");
        }
    }

    const logout = () => {
        setIsSignedIn(false);
        localStorage.removeItem("user");
        setUser(null);
    }

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser)); //string to object (parse)
            setIsSignedIn(true);
        }
    }, []);
    //It will run once only, right after the Profile component mounts — because of the empty dependency array [].
    //as when page refreshes components mounts again

    return (
        <>
            <Header />
            {isSignedIn ? (<div className='profile-container'>
                <div className='profile-panel-section'>
                    <div className='brandname'>brandname</div>
                    <div className='pp-line'></div>
                    <div className='pp-section' ><i class="fa-solid fa-house-user"></i><p>Dashboard</p></div>
                    <div className='pp-section' ><i class="fa-solid fa-bag-shopping"></i><p>My Orders</p></div>
                    <div className='pp-section' ><i class="fa-solid fa-message"></i><p>Reviews</p></div>
                    <div className='pp-section' ><i class="fa-solid fa-clipboard-question"></i><p>About</p></div>
                    <div className='pp-section' ><i class="fa-solid fa-address-book"></i><p>Contact</p></div>

                </div>
                <div className='profile-main-section'>
                    <div className='profile-search-bar'>
                        <div className='todays-date'>{date}</div>
                    </div>
                    <div className='myprofile-text'>
                        My Profile
                        <div className='line'></div>
                    </div>
                    <div className='profilepic-name'>
                        <img className='profile-pic' src={user.profilepic} alt="profile-pic"></img>
                        <div className='name-location'>
                            <div className='name-logout'>
                                <div className='name'>{user.Fname} {user.Lname}</div>
                                <i id="logout-icon" className="fa-solid fa-right-from-bracket" onClick={() => { logout() }}></i>
                            </div>
                            <div className='user-text'>User</div>
                            <div className='location'>{user.city}, Pakistan</div>
                        </div>
                    </div>
                    <div className='personal-info'>
                        <div className='pi-text'>Personal Information</div>
                        <div className='pi-line'></div>


                        <div className='name-dob'>
                            <div className='pi-fn'><h>First Name</h><p>{user.Fname}</p></div>
                            <div className='pi-fn'><h>Last Name</h><p>{user.Lname}</p></div>
                            <div className='pi-fn'><h>DOB</h><p>{new Date(user.DOB).toLocaleDateString()}</p></div>
                        </div>
                        <div className='email-phone'>
                            <div className='pi-email'><h>Email</h><p>{user.email}</p></div>
                            <div className='pi-fn'><h>Phone</h><p>{user.phone}</p></div>
                        </div>


                    </div>

                    <div className='address'>
                        <div className='add-text'>Address</div>
                        {/* <div className='add-line'></div> */}
                        <div className='add-info'>
                            <div className='pi-fn'><h>Country</h><p>Pakistan</p></div>
                            <div className='pi-fn'><h>City</h><p>{user.city}</p></div>
                        </div>
                    </div>
                </div>
            </div>
            ) : (
                <div className='pop-up-container'>
                    <div className='pop-up'>
                        <h>Login</h>
                        <p>Enter your details to login</p>

                        <input className='input-email' placeholder='Enter Email/Phone No'
                            onChange={(e) => { setEmail(e.target.value) }}></input>

                        <input className='input-password' placeholder='Password'
                            onChange={(e) => { setPassword(e.target.value) }}></input>

                        <button className='login-btn' onClick={() => { verifylogin() }}>Login</button>
                        <div>login with google etc</div>
                        <div className='signup-container'>
                            <p>Don't have an account?</p>
                            <p className='signup-text'>Sign Up</p>
                            {/* make signup page */}
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}

export default Profile;