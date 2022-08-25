import React from 'react';
import '../pages/Submit.css';

export type TextInputProps = {
    id: string;
    title: string;
    placeholder: string;
    value?: string;
    onChange?: React.FormEventHandler<HTMLInputElement>;
};

class TextInput extends React.Component<TextInputProps> {
    constructor(props: TextInputProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: React.FormEvent<HTMLInputElement>) {
        return this.props.onChange ? this.props.onChange(e) : undefined;
    }

    render() {
        return (
            <div className="div-block-3">
                <label className="text-block">{this.props.title}</label>
                <input
                    onChange={this.handleChange}
                    id={this.props.id}
                    type="text"
                    className="div-block-4"
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                ></input>
            </div>
        );
    }
}

export default TextInput;
