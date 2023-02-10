import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import AgentForm from '../shared/AgentForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditAgentModal = (props) => {
    const { user, show, handleClose, updateAgent, msgAlert, triggerRefresh } = props
    
    const [agent, setAgent] = useState(props.agent)

    const onChange = (e) => {
        e.persist()

        setAgent(prevAgent => {
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

        updateAgent(user, agent)
            .then(() => handleClose())
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: messages.updateAgentSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => {
                msgAlert({
                    heading: 'Oh No!',
                    message: messages.updateAgentFailure,
                    variant: 'danger'
                })
            })
    }
 
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <AgentForm 
                    agent={agent}
                    handleChange={onChange}
                    handleSubmit={onSubmit}
                    heading="Update Agent"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditAgentModal