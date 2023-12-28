import { useState } from 'react';
import './App.css';

interface Param {
  id: number;
  name: string;
}

interface ParamValue {
  paramId: number;
  value: string;
}

interface Model {
  paramValues: ParamValue[];
}



function App() {

  let myParamArr: Param[] = [
    {
      "id": 1,
      "name": "Назначение"
    },
    {
      "id": 2,
      "name": "Длина"
    },
    {
      "id": 3,
      "name": "Check"
    },
  ];

  let myModel: Model = {
    "paramValues": [
      {
        "paramId": 1,
        "value": "повседневное"
      },
      {
        "paramId": 2,
        "value": "check"
      },
      {
        "paramId": 3,
        "value": "проверка"
      },
    ]
  };


  let [modelState, setModelState] = useState(myModel.paramValues)


  function setModelStateCALLBACK(id: number | undefined, value: string) {
    if (typeof id !== undefined) {
      setModelState(prevState => prevState.map(item => {
        return item.paramId === id ? { ...item, value } : item
      }))
    }
  }


  function createInputsList(modelObj: ParamValue[], nameArr: Param[]) {
    let myModelValueArr: ParamValue[] = modelObj;

    return myModelValueArr.map((item: ParamValue) => {
      let paramObj = nameArr.find((temp) => temp.id == item.paramId)


      return (
        <MyInput paramObj={paramObj} initValue={item} callBack={setModelStateCALLBACK} />
      )
    })

  }

  return (
    <div className="App">
      <div className="mainContainer">
        {createInputsList(modelState, myParamArr)}
        <button onClick={() => console.log(modelState)}>Console log MODEL</button>
      </div>
    </div>
  );
}

export default App;





interface InputProps {
  paramObj?: Param,
  initValue: ParamValue,
  callBack: (id: number | undefined, value: string) => void
}

function MyInput({ paramObj, initValue, callBack }: InputProps) {


  return (
    <label className='inputContainer'>
      {paramObj?.name}
      <input type="text" value={initValue.value} onChange={(e) => callBack(paramObj?.id, e.target.value)} />
    </label>
  )
}
