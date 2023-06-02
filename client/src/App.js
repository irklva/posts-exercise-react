import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect} from 'react';
import './App.css';
import store from './system/store/configureStore';
import {Provider} from "react-redux";
import MainComponent from "./components/main_component/MainComponent";

function App() {

    useEffect(() => {
        fetch('http://localhost:8080/live').then(res => res.json()).then(res => {
            console.log('API CONNECTION IS OK');
        }).catch((e) => console.error('API CONNECTION FAILED, PLEASE CHECK SERVER APP AND TRY AGAIN'))
    }, []);

    return (
        <Provider store={store}>
            <div className="App">
                <MainComponent/>
            </div>
        </Provider>
    );
}

export default App;
