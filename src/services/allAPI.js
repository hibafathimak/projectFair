
import commonAPI from "./commonAPI"
import SERVER_URL from "./serverUrl"

//registerAPI called Auth 

export const registerAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,reqBody)
}

//registerAPI called Auth 

export const loginAPI=async(reqBody)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,reqBody)
}

// addProjectAPI called ADD component

export const addProjectAPI=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-project`,reqBody,reqHeader)
}

// getHomeProjectsAPI called home component

export const getHomeProjectsAPI=async()=>{
    return await commonAPI("GET",`${SERVER_URL}/home-project`,{})
}

// getAllProjectsAPI called Projects component

export const getAllProjectsAPI=async(searchKey,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/all-projects?search=${searchKey}`,{},reqHeader)
}



export const getUserProjectsAPI=async(reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/user-projects`,{},reqHeader)
}

export const updateProjectAPI =async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/projects/${id}/edit`,reqBody,reqHeader)
}

export const removeProjectAPI = async(id,reqHeader)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/projects/${id}/remove`,{},reqHeader)
}

export const updateUserAPI = async(reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/edit-user`,reqBody,reqHeader)
}
