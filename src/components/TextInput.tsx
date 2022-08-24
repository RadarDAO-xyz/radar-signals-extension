import React from 'react';
import '../pages/Submit.css';

export type TextInputProps = {
    id: string;
    title: string;
    placeholder: string;
}

class TextInput extends React.Component<TextInputProps> {
    public title: string;
    public placeholder: string;
    constructor(props: TextInputProps) {
        super(props);

        this.title = props.title;
        this.placeholder = props.placeholder;
    }
    render() {
        return (
            <div className="div-block-3">
                <label className="text-block">{this.title}</label>
                <input id={this.props.id} type="text" className="div-block-4" placeholder={this.placeholder}></input>
            </div>
        );
    }
}

export default TextInput;
