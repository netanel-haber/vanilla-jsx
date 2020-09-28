import styled from './dom/styled';

const App = ({ className, click }) => {
  return (
    <h3 className={className} click={click}>
      <Div >
        <img src="https://upload.wikimedia.org/wikipedia/en/8/83/Logo_of_JSX.svg" />
        <span>Hello Vanilla JSX!</span>
        <span>click to remove me</span>
      </Div>
    </h3>
  )
}


const Div = styled.div`
flex-direction: column;
display: flex;
justify-content: center;
align-items: center;
`

export default styled(App)`
cursor: pointer;
background-color: ${({ darkMode = false }) => darkMode ? `black` : `white`};
color: red;
`

