import React, { ChangeEvent } from 'react';

// class Form extends React.Component {
//     constructor(props: {}) {
//         super(props);
//         this.state = { value: '' };
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(event: ChangeEvent) {
//         this.setState({ value: event.target.value });
//     }

//     handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
//         alert('A form was submitted: ' + this.state.value);
//         event.preventDefault();
//     }

//     render() {
//         return (
//             <form onSubmit={this.handleSubmit}>
//                 {' '}
//                 <label>
//                     Name:
//                     <input type="text" value={this.state.value} onChange={this.handleChange} />{' '}
//                 </label>
//                 <input type="submit" value="Submit" />
//             </form>
//         );
//     }
// }

// export default Form;
