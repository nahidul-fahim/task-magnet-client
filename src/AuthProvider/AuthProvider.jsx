import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../Firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic/useAxiosPublic";




// create auth export authcontext, and get google provider
const auth = getAuth(app);
export const AuthContext = createContext('');
const googleProvider = new GoogleAuthProvider();



const AuthProvider = ({ children }) => {

    // hooks
    const [currentUser, setCurrentUser] = useState('')
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();


    // register with email password
    const createNewUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };



    // update profile when registered with email-password
    const updateProfileInfo = (currentUsersInfo, username, photo) => {
        updateProfile(currentUsersInfo, {
            displayName: username, photoURL: photo
        })
            .then(() => {
                console.log("Profile info updated")
            })
            .catch(() => {
                console.log("Profile info update failed")
            })
    }


    // email-password log in function
    const login = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }


    //Google sign up function
    const logInByGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };


    //Sign out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }


    //keep trace on logged in user
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return () => {
            unSubscribe();
        }
    }, [axiosPublic])


    // send the info to conext
    const authInfo = { createNewUser, logInByGoogle, logOut, currentUser, login, updateProfileInfo, loading };


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;