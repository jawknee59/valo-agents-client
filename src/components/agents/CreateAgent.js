import { useState } from 'react'
import { createAgent } from '../../api/agents'
import messages from '../shared/AutoDismissAlert/messages'
import AgentForm from '../shared/AgentForm'

import { useNavigate } from 'react-router-dom'

const CreateAgent = (props) => {
    const { user, msgAlert } = props

    const navigate = useNavigate()
    console.log('this is navigate', navigate)
    
    const [agent, SetAgent] = useState({
        name: '',
        agentNumber: '',
        role: '',
        country: ''
    })

    const onChange = (e) => {
        e.persist()

        SetAgent(prevAgent => {
            console.log('this is e.target', e.target)
            const updatedName = e.target.name
            let updatedValue = e.target.value

            if (e.target.type === 'number') {
                updatedValue = parseInt(e.target.value)
            }

            const updatedAgent = {
                [updatedName] : updatedValue
            }

            console.log('the agent', updatedAgent)

            return {
                ...prevAgent, ...updatedAgent
            }
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        createAgent(user, agent)
            // first we'll nav to the show page
            .then(res => { navigate(`/agents/${res.data.agent.id}`)})
            // we'll also send a success message
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.createAgentSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.createAgentFailure,
                    variant: 'danger'
                })
            })

    }

    return (
        <AgentForm 
            agent={agent}
            handleChange={onChange}
            handleSubmit={onSubmit}
            heading="Create a new agent!"
        />
    )
}

export default CreateAgent