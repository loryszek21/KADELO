import Button from './components/Form/Button/Button';

function App(): JSX.Element {

    return (
        <div>
            Home page<br/>
            <Button appearance='primary'>primary</Button><br/>
            <Button appearance='ghost'>ghost</Button>
        </div>
    )
}

export default App;
