import React from 'react';
import '../styles/webflow.css';

export type DropInputProps = {
    title: string;
    placeholder: string;
    options: { id: string; name: string }[];
    onChange?: React.FormEventHandler<HTMLSelectElement>;
};

class DropInput extends React.Component<DropInputProps> {
    constructor(props: DropInputProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e: React.FormEvent<HTMLSelectElement>) {
        return this.props.onChange ? this.props.onChange(e) : undefined;
    }

    render() {
        return (
            <div className="div-block-3">
                <div className="text-block">{this.props.title}</div>
                <select onChange={this.handleChange} defaultValue="" className="div-block-4 center" style={{ width: '90%' }}>
                    <option value="" disabled>
                        {this.props.placeholder}
                    </option>
                    {this.props.options.map(x => (
                        <option value={x.id}>#{x.name}</option>
                    ))}
                </select>
            </div>
        );
    }
}

export default DropInput;
