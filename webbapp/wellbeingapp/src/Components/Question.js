
import React  , {useState , useEffect, Fragment  , useCallback} from 'react'
import axios from 'axios';
import './Question.css';
import {
    useParams ,
    useNavigate
  } from "react-router-dom";
import { Slider } from '@mui/material';
const Questions = [
    {
        'Question' : 'Satisfied with life at present',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1PD1'
    },
    {
        'Question' : 'Some wander aimlessly, but not me',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SF1C'
    },
    {
        'Question' : 'Demands of everyday life often get me down',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SF1D'
    },
    {
        'Question' : 'Maintaining close relationships difficult',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SF1F'
    },
    {
        'Question' : 'Good managing daily responsibilities',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SF1I'
    },
    {
        'Question' : 'Life process of learning/changing/growth on the track',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SF1K'
    },
    {
        'Question' : 'Experience challenge how think important',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SF1L'
    },
    {
        'Question' : 'Others describe me as giving/share time',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SF1M'
    },
    {
        'Question' : 'Do just about anything I set my mind to',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SF1U'
    },
    {
        'Question' : 'When really want something, find way',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SF1X'
    },
    {
        'Question' : 'Many things interfere with what I want do',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SF1Y'
    },
    {
        'Question' : 'Whether I get what want is in own hands',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SF1Z'
    },
    {
        'Question' : 'Do what can to change for better',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SF3B'
    },
    {
        'Question' : 'Know what I want out of life',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SF3P'
    },
    {
        'Question' : 'I live one day at a time',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SF3Q'
    },
    {
        'Question' : 'Helpful to set goals for near future',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SF3T'
    },
    {
        'Question' : 'No use in thinking about past because nothing can be done',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SF3W'
    },
    {
        'Question' : 'Outgoing describes you how well',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SF4A'
    },
    {
        'Question' : 'Organized describes you how well',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SF4D'
    },
    {
        'Question' : 'Broad minded describes you how well',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SF4Y'
    },
    {
        'Question' : 'Sympathetic describes you how well',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SF4Z'
    },
    {
        'Question' : 'Give spouse/partner emotional support (hours/month)',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SK10A'
    },
    {
        'Question' : 'World is too complex for me',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SK17A'
    },
    {
        'Question' : 'Feel close to others in community',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SK17F'
    },
    {
        'Question' : 'Daily activities not worthwhile for community',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SK17G'
    },
    {
        'Question' : 'People do not care about others problems',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SK17J'
    },
    {
        'Question' : ' Society not improving for people like me',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SK17M'
    },
    {
        'Question' : 'Believe people are kind',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SK17N'
    },
    {
        'Question' : 'Serve on a jury if called',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SK7I'
    },
    {
        'Question' : 'Volunteer for social causes',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SK7Q'
    },
    {
        'Question' : 'Rely on friends for help with problem',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SM13'
    },
    {
        'Question' : 'Open up to family about worries',
        'min' : 1,
        'max' : 8 , 
        'value' : 4,
        'id' : 'A1SM5'
    },

]
function Question(props) {
    let [formData , setFormData] = useState(Questions)
    const  handleChange = (e)=>{
        console.log(e)
        setFormData((oldvalue) =>{
            for(let i =0 ; i< oldvalue.length;i++ ){
                if(oldvalue[i].id == e.target.name){
                   oldvalue[i].value = e.target.value
                   break
                }
            }
            const newArray = [...oldvalue]
            return newArray
        })
    }
    const handleSubmitClick = ()=>{
        const answers = {}
        for(let i = 0; i <  formData.length; i++){
            answers[formData[i].id] = formData[i].value
        }
        props.sendData(answers)
    }
    return (
        <Fragment>
            <h1 className='header'>Questionnaire Questions</h1>
            <div className='Questions-container'>
            
                {formData.map((element, index) =>{
                    return(
                        <div key = {index} className='Question-wrapper'>
                            <p>Q-{index+1 + ' : ' + element.Question}</p>
                            <Slider
                                value={element.value}
                                min={element.min}
                                max={element.max}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                disableSwap
                                name = {element.id}
                            />
                        </div>
                    )
                  
                })}
                

            </div>
                <div className='Submit-btn-container'>

                
                <button className='Submit-btn' onClick={handleSubmitClick}>
                Submit
                </button>
            </div>

        </Fragment>
    )

}

export default Question;