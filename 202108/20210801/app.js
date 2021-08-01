class Title extends React.Component {
  render() {
    return (
      <h1>Welcome!</h1>
    );
  }
}

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        text: 'Hello World!'
      } 
    }

    handleChange(e) {
      const title = e.target.value;
      this.props.changeTitle(title);
    }
    
    render() {
      return (
        <div>
          <p> { this.state.text } </p>
          <Title title={this.props.title} />
          <input value={this.props.title} onChange={this.handleChange.bind(this)} />
        </div>
      )
    }
  }
      
  ReactDOM.render(
    <App />,
    document.getElementById('app') //htmlの<div id="app"></div>をターゲットに設定している。
  );