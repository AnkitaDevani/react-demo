import axios from 'axios';
import BaseUrl from "./url";
 const getFromStorage = key => {
    return localStorage.getItem(key);
};


const config = () => ({
    headers: {
         Authorization:`Bearer ${getFromStorage("token")}`,
         Accept: 'application/json',
         'Content-Type': 'application/json',
     }
});
const profile_config = () => ({
    headers: {
        Authorization:`Bearer ${getFromStorage("token")}`,
        Accept: 'application/json',
        "Content-Type": "multipart/form-data",
        "type": "formData"
    }
});

//subjectList
export const getSubjectList = async () => {
    try {
        const url = `${BaseUrl.base_url}subjectList`;
        const res = await axios.get(url);
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
};

export const getSelectedSub = async () => {
    try {
        const url = `${BaseUrl.base_url}userDetails`;
        const res = await axios.get(url);
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
};

export const addSubject = async (data) => {
    try {
        const url = `${BaseUrl.base_url}subject`;
        const res = await axios.post(url,data);
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
};

export const deleteSubject = async (ele) => {
    try {
        const url = `${BaseUrl.base_url}subdelete/${ele}`;
        const res = await axios.delete(url);
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
};

//loginUser details
export const addactiveUser = async (data,isSignIn) => {
    try {
        const url = `${BaseUrl.base_url}loginuser`;
        debugger
        const res = await axios.post(url,data,isSignIn);
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
};

//activeuser
export const loginUser = async () => {
    try {
        const url = `${BaseUrl.base_url}getLoggedInUser`;
        const res = await axios.get(url,config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
};

//logout
export const logoutUser = async () => {
    try {
        const url = `${BaseUrl.base_url}logout`;
        const res = await axios.delete(url,config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
};

//registration
export const userRegistration = async (data) => {
    try {
        const url = `${BaseUrl.base_url}submit`;
        debugger
        const res = await axios.post(url,data);
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
};

//all users details
export const allUsers = async () => {
    try {
        const url = `${BaseUrl.base_url}users`;
        const res = await axios.get(url);
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
};

//update User details
export const updatedUser = async (id,data) => {
    try {
        const url = `${BaseUrl.base_url}update/${id}`;
        const res = await axios.patch(url,data,config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
};

//delete user
export const deleteUser = async (id) => {
    try {
        const url = `${BaseUrl.base_url}delete/${id}`;
        debugger
        const res = await axios.delete(url,config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
};

//uploadProfile
export const uploadProfile = async (data) => {
    try {
        const url = `${BaseUrl.base_url}uploadProfilePic`;
        debugger
        const res = await axios.post(url,data,profile_config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
};

//change Password
export const changePass = async (data) => {
    try {
        const url = `${BaseUrl.base_url}changepassword`;
        const res = await axios.patch(url,data,config());
        return { success: true, data: res.data }
    } catch (e) {
        return { success: false, msg: "Something went wrong"};
    }
};

