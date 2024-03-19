import React, {useState} from 'react'



export default function TextForm(props) {
    const handleUpclick  = ()=>{
        console.log("Upper case is cliccked" + text);
        let newtext = text.toUpperCase();
        setText(newtext);

    }

    const handleOnchange = (event)=>{
        console.log("On change");
        setText(event.target.value);

    }


    const [text, setText] = useState('Enter the Text Oshayer');
    
    return (
        <>
        <div className='container' style={{color: props.mood === '#0a335c'?'white':'black'}}>
            <form>
                <div className="form-group" style={{backgroundColor: props.mood === '#0a335c'?'white':'dark'}}  >
                    <label for="exampleFormControlInput1"><h2>{props.email}</h2></label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                </div>
                <div className="form-group">
                    <label for="exampleFormControlSelect1">Example select</label>
                    <select className="form-control" id="exampleFormControlSelect1">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <div className="form-group">
                    <label for="exampleFormControlSelect2">Example multiple select</label>
                    <select multiple className="form-control" id="exampleFormControlSelect2">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                </div>
                <div className="form-group">
                    <label for="exampleFormControlTextarea1">Enter DATA</label>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={text} onChange={handleOnchange}></textarea>
                </div>
            </form>
            <button className='btn btn-primary' onClick={handleUpclick}>Convert to UpperCase</button>

        </div>
        <div className="container my-3">
            <h3>Your text summary</h3>
            <p>{text.split(" ").length} words and {text.length} characters</p>

        </div>
        </>

        
    )
}
