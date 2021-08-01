// importでエラーになる
// import Layout from "https://raw.githubusercontent.com/k-tsuda400/JavaScriptTraining/master/202108/20210801/components/Layout.js";

class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Hello World!'
    } 
  }
  render() {
    return (
      <h1>It's { this.state.text }!</h1>
    );
  }
}

ReactDOM.render(
  <Layout />,
  document.getElementById('app') //htmlの<div id="app"></div>をターゲットに設定している。
);