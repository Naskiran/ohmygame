class GameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        game: '',
        price: null,
      };
    }
    mySubmitHandler = (event) => {
      event.preventDefault();
      let price = this.state.price;
      if (!Number(price)) {
        alert("Your price must be a number");
      }
    }
    myChangeHandler = (event) => {
      let nam = event.target.name;
      let val = event.target.value;
      this.setState({[nam]: val});
    }
    render() {
      return (
        <form onSubmit={this.mySubmitHandler}>
        <h1>Hello {this.state.game} {this.state.price}</h1>
        <p>Enter new game:</p>
        <input
          type='text'
          name='game'
          onChange={this.myChangeHandler}
        />
        <p>Enter your price:</p>
        <input
          type='text'
          name='price'
          onChange={this.myChangeHandler}
        />
        <br/>
        <br/>
        <input type='submit' />
        </form>
      );
    }
  }
  
  ReactDOM.render(<GameForm />, document.getElementById('root'));