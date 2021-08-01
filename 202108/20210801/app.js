// importでエラーになる
// import Layout from "https://raw.githubusercontent.com/k-tsuda400/JavaScriptTraining/master/202108/20210801/components/Layout.js";

class Layout extends React.Component {
  constructor() {
    super();
    this.name = "Test";
  }
  render() {
    return (
      <h1>It's {this.name}!</h1>
    );
  }
}

const app = document.getElementById('app');
ReactDOM.render(<Layout/>, app);