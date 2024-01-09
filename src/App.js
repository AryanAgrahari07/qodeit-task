import React, { useState } from 'react';
import './App.css';
import './css/home.css'

function App() {
    const [selectedFirst, setSelectedFirst] = useState('Academic writing');
    const [selectedSecond, setSelectedSecond] = useState('High school');
    const [selectedPaper, setSelectedPaper] = useState('Research paper');
    const [quantity, setQuantity] = useState(1);
    const [deadline, setDeadline] = useState(getTodayDate());
    const [totalCost, setTotalCost] = useState(12); 
    const [quantityType, setQuantityType] = useState('pages'); 
    const [originalPageQuantity, setOriginalPageQuantity] = useState(1);
    
    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      }
    
    const handleFirstChange = (value) => {
      setSelectedFirst(value);
      calculateTotalCost(value, selectedSecond);
    };
  
    const handleSecondChange = (value) => {
      setSelectedSecond(value);
      calculateTotalCost(selectedFirst, value);
    };
  
    const calculateTotalCost = (first, second) => {
        const baseCost = (
          (first === 'Academic writing' && second === 'High school') ? 12 :
          (first === 'Academic writing' && second === 'Undergraduate') ? 15 :
          (first === 'Academic writing' && second === 'Bachelor') ? 21 :
          (first === 'Academic writing' && second === 'Professional') ? 25 :
      
          (first === 'Editing and prooffreading' && second === 'High school') ? 3 :
          (first === 'Editing and prooffreading' && second === 'Undergraduate') ? 5 :
          (first === 'Editing and prooffreading' && second === 'Bachelor') ? 7 :
          (first === 'Editing and prooffreading' && second === 'Professional') ? 13 :
      
          (first === 'Calculations' && second === 'High school') ? 18 :
          (first === 'Calculations' && second === 'Undergraduate') ? 23 :
          (first === 'Calculations' && second === 'Bachelor') ? 32 :
          (first === 'Calculations' && second === 'Professional') ? 38 : 0
        );

        setTotalCost(quantity*baseCost);
        return baseCost;
      };
      
  
    const handlePaperChange = (value) => {
      setSelectedPaper(value);
    };
  
    const handleQuantityChange = (value) => {
        setQuantity(value);
        setOriginalPageQuantity(value);
        const basecost = calculateTotalCost(selectedFirst, selectedSecond);
        setTotalCost(value * basecost);
      };
      
  
    const handleDeadlineChange = (value) => {
      setDeadline(value);
    };

    const handleQuantityTypeChange = (value) => {
        setQuantityType(value);
    
        if (value === 'words') {
          const words = quantity * 275;
          setQuantity(words.toString());
        } else {
            setQuantity(originalPageQuantity.toString());
          }

      };

  return (
        <div className="App">
          <div class="main">
        <div class="first">
        <div className={`box-main ${selectedFirst === 'Academic writing' && 'selected'}`} onClick={() => handleFirstChange('Academic writing')}>Academic writing</div>
        <div className={`box-main ${selectedFirst === 'Editing and prooffreading' && 'selected'}`} onClick={() => handleFirstChange('Editing and prooffreading')}>Editing and prooffreading</div>
       <div className={`box-main ${selectedFirst === 'Calculations' && 'selected'}`} onClick={() => handleFirstChange('Calculations')}>Calculations</div>
        </div>
        <div className="second">
        <div className={`box-second ${selectedSecond === 'High school' && 'selected'}`} onClick={() => handleSecondChange('High school')}>High school</div>
        <div className={`box-second ${selectedSecond === 'Undergraduate' && 'selected'}`} onClick={() => handleSecondChange('Undergraduate')}>Undergraduate</div>
        <div className={`box-second ${selectedSecond === 'Bachelor' && 'selected'}`} onClick={() => handleSecondChange('Bachelor')}>Bachelor</div>
        <div className={`box-second ${selectedSecond === 'Professional' && 'selected'}`} onClick={() => handleSecondChange('Professional')}>Professional</div>
      </div>
        <div class="third">
            <div class="third-heading">Type of paper</div>

            <div class="third-select">
            <select class="third-select" name="paper" id="paper" value={selectedPaper} onChange={(e) => handlePaperChange(e.target.value)}>
                <option value="Research paper">Research paper</option>
                <option value="Research proposal">Research proposal</option>
                <option value="Speech">Speech</option>
                <option value="Thesis">Thesis</option>
                <option value="Thesis proposal">Thesis proposal</option>
                <option value="Thesis statement">Thesis statement</option>
              </select>

            </div>
        </div>

        <div class="fourth">
            <div class="quantity">
                <div class="quantity-heading">Quantity</div>
                <input class="quantity-input" type="number" value={quantity} onChange={(e) => handleQuantityChange(e.target.value)}   readOnly={quantityType === 'words'} />
                <div class="pages-words">
                    <div   className={`pages-box ${quantityType === 'pages' && 'selected'}`}
                     onClick={() => handleQuantityTypeChange('pages')}>Pages</div>
                   
                    <div  className={`pages-box ${quantityType === 'words' && 'selected'}`}
                    onClick={() => handleQuantityTypeChange('words')}>Words</div>
                </div>
            </div>
            <div class="deadline">
                <div class="deadline-heading">Deadline</div>
                <input class="deadline-input" type="date" value={deadline} onChange={(e) => handleDeadlineChange(e.target.value)} />
            </div>
        </div>
        <div class="five">
            <div class="price">
                <div className='price-heading'>Approx price</div>
                <div><strong>${totalCost}</strong></div>
            </div>
            <div class="btn">
                <button class="last" >PROCEED TO ORDER</button>
            </div>
        </div>
    </div>
         </div>
  );
}

export default App;
