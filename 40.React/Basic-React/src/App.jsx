
import './App.css';


function Title(){
  return <h1>This is title </h1>
}
function Mihir(){
  return <h1>Mihir Kate</h1>
}
function Desc(){
  return <h3>This is Description</h3>
}
function App() {
    return ( 
          <div>
            This is my app
            <Title/>
        <Desc>Mihir Mangesh Kate</Desc>
              <Mihir/>
            </div>
);

}

export default App;
