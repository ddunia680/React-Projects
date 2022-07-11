import './App.css';
import BuffetBuilder from './containers/BuffetBuilder/BuffetBuilder';
import Layout from './containers/hoc/Layout/Layout';

function App() {
  return (
    <div className="App">
      <Layout>
        <BuffetBuilder/>
      </Layout>
    </div>
  );
}

export default App;
