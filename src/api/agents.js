// this is where our api calls for the agents resource will live
import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllAgents = () => {
    return axios(`${apiUrl}/agents`)
}

// READ -> Show
export const getOneAgent = (id) => {
    return axios(`${apiUrl}/agents/${id}`)
}

// Create (create a agent)
export const createAgent = (user, newAgent) => {
    // console.log('this is the user', user)
    // console.log('this is the newAgent', newAgent)
    return axios({
        url: `${apiUrl}/agents`,
        method: 'POST',
        headers: {
            Authorization: `Token token=${user.token}`
        },
        data: { agent: newAgent }
    })
}

// Update (update a agent)

// Delete (delete a agent)
export const deleteAgent = (user, agentId) => {

    return axios({
        url: `${apiUrl}/agents/${agentId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`
        }
    })
}

