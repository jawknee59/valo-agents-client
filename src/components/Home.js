import { Container } from "react-bootstrap"
import AgentsIndex from "./agents/AgentsIndex"

const Home = (props) => {
	// const { msgAlert, user } = props
	// console.log('props in home', props)

	return (
			<Container className="m-2" style={{textAlign: 'center'}}>
				<h2>All of the Agents</h2>
				<AgentsIndex msgAlert={ props.msgAlert }/>
			</Container>
	)
}

export default Home
