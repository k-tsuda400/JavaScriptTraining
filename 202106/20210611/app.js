class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        text: 'Hello World!'
      } 
    }
    
    render() {
      return (
        <div>
          <p> { this.state.text } </p>
        </div>
      )
    }
  }
      
  ReactDOM.render(
    <App />,
    document.getElementById('app') //htmlの<div id="app"></div>をターゲットに設定している。
  );