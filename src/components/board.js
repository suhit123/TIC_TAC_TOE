import '../styles/board.css';
import {useEffect, useState} from 'react';
const Board=()=>{
    const[turn,setTurn]=useState(0);
    const[data,setData]=useState(['','','','','','','','','']);
    const[resultcheck,setResultcheck]=useState(false);
    const[disresult,setDisresult]=useState('');
    const draw=(event,d)=>{
        if(data[d]===''){
        data[d]=(turn===0)?'X':'O';
        setData((data)=>[...data]);
        setTurn((turn===0)?1:0);
        }
    };
    const[reset,setReset]=useState(false);
    useEffect(()=>{
        setData(['','','','','','','','','']);
        setTurn(0);
        setReset(false);
        setResultcheck(false);
    },[reset]);
    function row(){
        for(let i=0;i<9;i+=3){
            if(data[i]==='O' && data[i+1]==='O' && data[i+2]==='O'){
                setDisresult('Player-2 win!');
                return true;
            }
            else if(data[i]==='X' && data[i+1]==='X' && data[i+2]==='X'){
                setDisresult('Player-1 win!');
                return true;
            }
                
        }
        return false;
    }
    function column(){
        for(let i=0;i<3;i++){
            if(data[i]==='O' && data[i+3]==='O' && data[i+6]==='O'){
                setDisresult('Player-2 win!');
                return true;
            }
            else if(data[i]==='X' && data[i+3]==='X' && data[i+6]==='X'){
                setDisresult('Player-1 win!');
                return true;
            }
        }
        return false;
    }
    function diagonal(){
        if((data[0]==='O' && data[4]==='O' && data[8]==='O')||
        (data[2]==='O' && data[4]==='O' && data[6]==='O')){
            setDisresult('Player-2 win!');
                return true;
        }
        else if((data[0]==='X' && data[4]==='X' && data[8]==='X')||
                (data[2]==='X' && data[4]==='X' && data[6]==='X')
        ){
            setDisresult('Player-1 win!');
            return true;
        }
        else{
            return false;
        };
    }
    function tie(){
        let count=0;
        for(let i=0;i<9;i++){
            if(data[i]!==''){
                count++;
            }
        }
        if(count===9){
            return true;
        }
    };
    useEffect(()=>{
        if(row()===true||column()===true||diagonal()===true){
            setResultcheck(true);
        }
        else if(tie()===true){
            setDisresult('Tie play again!')
            setResultcheck(true);
        }
    },[data]);
    return(
        <>
        <div className="board-container">
            <div className="row">
                <div id="b1" onClick={(e)=>draw(e,0)}>{data[0]}</div>
                <div id="b2" onClick={(e)=>draw(e,1)}>{data[1]}</div>
                <div id="b3" onClick={(e)=>draw(e,2)}>{data[2]}</div>
            </div>
            <div className="row">
                <div id="b4" onClick={(e)=>draw(e,3)}>{data[3]}</div>
                <div id="b5" onClick={(e)=>draw(e,4)}>{data[4]}</div>
                <div id="b6" onClick={(e)=>draw(e,5)}>{data[5]}</div>
            </div>
            <div className="row">
                <div id="b7" onClick={(e)=>draw(e,6)}>{data[6]}</div>
                <div id="b8" onClick={(e)=>draw(e,7)}>{data[7]}</div>
                <div id="b9" onClick={(e)=>draw(e,8)}>{data[8]}</div>
            </div>
        </div>
        <div className='reset' onClick={()=>setReset(true)}>Reset</div>
        <div className={resultcheck?'trueresult':'falseresult'}>
            <h1 id='result'>Result</h1>
            <p id='presult'>{disresult}</p>
            <button className='play-again' onClick={()=>setReset(true)}>Play Again</button>
        </div>
        </>
    );
};
export default Board;