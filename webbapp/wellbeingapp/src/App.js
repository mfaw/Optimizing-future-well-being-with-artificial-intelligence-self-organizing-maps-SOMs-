
import './App.css';
import Question from './Components/Question'; 
import Result from './Components/Result'; 
import React  , {useState , useEffect} from 'react'
import {
  BrowserRouter as Router,
  Routes ,
  Route,
  useNavigate  ,
} from "react-router-dom";
import output from './output.png'; 
import axios from 'axios';




const columns = [
  {
    title: "Positive relations",
    field: "Positive_relations",
  },
  {
    title: "Self-acceptance",
    field: "Self_acceptance",
  },
  {
    title: "Autonomy",
    field: "autonomy",
  },
  {
    title: "Personal growth",
    field: "Personal_growth"
  },
  {
    title: "Environmental mastery",
    field: "Environmental_mastery",
  },
  {
    title: "Purpose in life",
    field: "Purpose_in_life",
  },
];



const data = [
  { 
    Positive_relations: 1, 
    Self_acceptance: "john@gmail.com",
    autonomy: 12, 
    Personal_growth: "Male",
    Environmental_mastery: 12, 
    Purpose_in_life: "Male" 
  },
];



function App() {
  let [questionAnswerd , setQuestionAnswered] = useState(false)
  let [answers, setAnswers] = useState({})
  let [info , setInfo] = useState({})
  const sendData = (quesitons_answers) =>{
    console.log(quesitons_answers)
      axios.post('/api/v0/SendData', {
        'Data': quesitons_answers,
      }).then(function (response){
        console.log(response.data)
        // setAnswers(quesitons_answers)
        setInfo({'wellbeing' : response.data.result , 'BMU' : response.data.BMU})
        setQuestionAnswered(true)
      })
   
  }

  useEffect(()=>{
    if(JSON.stringify(answers) !== '{}'){
      console.log(answers)
      
    }
  } , [answers])
  let questionBlock =   <div className='main-container' >
                          <Question sendData = {sendData}/>
                        </div>
  return (
    <>
    <Routes>
          {(!questionAnswerd) &&<Route exact path="/" element = {questionBlock}/>}
          {(!questionAnswerd) && <Route exact path="*" element = {questionBlock}/>}   

            {(questionAnswerd) &&<Route exact path="/" element = {
              <>
             
              <div className='result-container'>
              <h1 className='header'>Future well-being Ryff dimensions</h1>
                <table>
                  <tr>
                    <td>Positive relations</td>
                    <td>{info['wellbeing'][0]}</td>
                  </tr>
                  <tr>
                    <td>Self-acceptance </td>
                    <td>{info['wellbeing'][1]}</td>
                  </tr>
                  <tr>
                    <td>Autonomy</td>
                    <td>{info['wellbeing'][2]}</td>
                  </tr>
                  <tr>
                    <td>Personal growth </td>
                    <td>{info['wellbeing'][3]}</td>
                  </tr>
                  <tr>
                    <td>Environmental mastery</td>
                    <td>{info['wellbeing'][4]}</td>
                  </tr>
                  <tr>
                    <td>Purpose in life</td>
                    <td>{info['wellbeing'][5]}</td>
                  </tr>

                </table>
                 {/* <p>Positive relations : {}</p>
                 <p>Self-acceptance : {}</p>
                 <p>Autonomy : {}</p>
                 <p>Personal growth : {}</p>
                 <p>Environmental mastery : {}</p>
                 <p>Purpose in life : {}</p> */}

                <hr></hr>
                 <p className='text'>the Current depression level (row , column) -> {'('+ info['BMU'][0]+' , '+ info['BMU'][1]+ ')'}</p>
                 <img  className='som-image' src={output} alt="the output SOM" />
                <hr></hr>
              </div>
              </>
            }/>}       
    </Routes>
    </>
  );
}

export default App;
