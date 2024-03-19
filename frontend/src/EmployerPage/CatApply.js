import React, { Component } from 'react'
import './CatApply.css'
import 'bootstrap/dist/css/bootstrap.min.css';


class CatApply extends Component {
constructor(props) {
super(props);
this.state = {
categories: ["Graphics & design", "Digital Marketing", "Music & audio", "Video & animations", "Programming and tech", 
            "Business", "Writing and translation", "Lifestyle","others"],
selectedCategories: []
}
}

handleClick = (e) => {
    const { selectedCategories } = this.state;
    let index;

    if (selectedCategories.indexOf(e.target.value) === -1) {
        selectedCategories.push(e.target.value);
    } else {
        index = selectedCategories.indexOf(e.target.value);
        selectedCategories.splice(index, 1);
    }

    this.setState({ selectedCategories });
    this.props.update(selectedCategories);
}

render() {
    const { categories, selectedCategories } = this.state;
    return (
        <div>
        <div className='row'>
            <div className='row d-flex align-items-center justify-content-center'>
            {categories.map((category, index) => {
                return (
                    <div className="col-4 my-1">
                        <div key={index} style = {{fontSize:"55%"}} >
                            <button 
                                style={{width: '105%',
                                    margin: '2%',borderWidth:'0.1px',background:'none',color:'white',borderColor:'white '}}
                                className={selectedCategories.indexOf(category) !== -1 ? "postselected" : ""}
                                value={category} 
                                onClick={this.handleClick}>
                                {category}
                            </button>
                        </div>
                    </div>    
                )
            })}
            </div>
        </div>
        </div>
    )
}

}

export default CatApply
