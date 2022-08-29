import React from 'react';
import '../styles/webflow.css';

type TagInputProps = {
    title: string;
    placeholder: string;
    onChange?: (tags: string[]) => void;
};

type TagInputState = {
    tags: string[];
};

class TagInput extends React.Component<TagInputProps, TagInputState> {
    public title: string;
    public placeholder: string;
    public handleChange?: (tags: string[]) => void;
    constructor(props: TagInputProps) {
        super(props);

        this.title = props.title;
        this.placeholder = props.placeholder;
        this.state = {
            tags: []
        };

        this.handleChange = props.onChange;

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleTagClick = this.handleTagClick.bind(this);
    }

    handleKeyDown(k: React.KeyboardEvent) {
        console.log(this.state.tags);
        if (k.key === ' ' || k.key === ',' || k.key === 'Enter') {
            k.preventDefault();
            let target = k.target as HTMLInputElement;
            const value = target.value;
            this.setState({ tags: [value, ...this.state.tags] }, () =>
                this.handleChange?.(this.state.tags)
            );
            target.value = '';
        }
    }

    handleTagClick(k: React.MouseEvent) {
        const target = k.target as HTMLDivElement;
        const i = this.state.tags.indexOf(target.innerText.substring(1));
        this.state.tags.splice(i, 1);
        this.setState({});
        this.handleChange?.(this.state.tags);
    }

    handleWheel(e: React.WheelEvent<HTMLDivElement>) {
        if (e.deltaY > 0)
            (document.getElementById('tag-holder') as HTMLDivElement).scrollLeft += 10;
        else if (e.deltaY < 0)
            (document.getElementById('tag-holder') as HTMLDivElement).scrollLeft -= 10;
    }

    render() {
        return (
            <div className="div-block-3">
                <div className="text-block">What tags do you want to give it?</div>
                <div className="tags2">
                    <input
                        type="text"
                        className="div-block-4"
                        placeholder="#add your hashtags"
                        onKeyDown={this.handleKeyDown}
                    ></input>
                    <div id="tag-holder" className="tag-holder" onWheel={this.handleWheel}> {/* Make scrolling work without a scrollbar */}
                        {this.state.tags.map((x, i) => (
                            <div
                                onClick={this.handleTagClick}
                                onWheel={this.handleWheel}
                                className="tag"
                                key={i}
                            >{`#${x}`}</div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default TagInput;
