// 参考：
// https://qiita.com/TsutomuNakamura/items/72d8cf9f07a5a30be048
// ↓CDNだとimportでエラーになる？
// import Layout from "https://raw.githubusercontent.com/k-tsuda400/JavaScriptTraining/master/202108/20210801/components/Layout.js";
// 仕方ないので、分離せず、1ファイルにクラスを書いていく

// ------------------------------------------------------
class Title extends React.Component {
  render() {
    return (
      <h1>Welcome!</h1>
    );
  }
}

// ------------------------------------------------------
class Header extends React.Component {
  render() {
    return (
      <header>header
        <input />
      </header>
    );
  }
}

// ------------------------------------------------------
class Footer extends React.Component {
  render() {
    return (
      <footer>footer</footer>
    );
  }
}

// ------------------------------------------------------
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Hello World!'
    } 
  }
  render() {
    //return (
    //  <h1>It's { this.state.text }!</h1>
    //);
    return (
      <header>
        <Title />
      </header>
    );
  }
}

ReactDOM.render(
  <Layout />,
  document.getElementById('app') //htmlの<div id="app"></div>をターゲットに設定している。
);