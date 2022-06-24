import React from 'react';
// import {getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import { getMergeSortAnimations} from '../sortingAlgorithms/sortingAlgorithms';
import './SortingVisualizer.css';

const ANIMATION_SPEED_MS = 3;
const NUMBER_OF_ARRAY_BARS = 310;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }


    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 600));
        }
        this.setState({ array });
    }

    mergeSort()
    {

    const animations = getMergeSortAnimations(this.state.array);

         for(let i=0; i<animations.length; i++){

             const arrayBars = document.getElementsByClassName('array-bar');
             
             const isColorChange = i % 3 !== 2;
             if(isColorChange)
             {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwostyle = arrayBars[barTwoIdx].style;
                 const color  = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR ;
             
                setTimeout( () => {
                    barOneStyle.backgroundColor = color;
                    barTwostyle.backgroundColor = color;
                }, i* ANIMATION_SPEED_MS);
            }
            else 
            {
                setTimeout( () => 
                {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    
                    barOneStyle.height = `${newHeight}px`;
                    
                }, i*ANIMATION_SPEED_MS);
            }
        }
    }

    heapSort()
    {

    }

    bubbleSort()
    {

    }
    
    quickSort()
    {

    }

    testSortingAlgorithms()
    {
        for(let i=0;i<100;i++){
            const array = [];
            const length1 = randomIntFromInterval(1,1000);
            for(let i=0; i< length1; i++)
            {
                array.push(randomIntFromInterval(-1000,1000));
            }

            const javaScriptSortedArray = array.slice().sort( (a,b) => a-b);
            const mergeSortedArray = getMergeSortAnimations(array.slice());
            
            console.log(arrayareequal(javaScriptSortedArray,mergeSortedArray));

        }
    }

    render() {
        const { array } = this.state;

        return (
            <div className="array-container">
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}
                        style={{  backgroundColor:PRIMARY_COLOR,
                                  height: `${value}px` }}>

                        {/* {value} */}
                    </div>
                ))}
                <button onClick={ () => this.resetArray()}>Generate new array</button>
                <button onClick={ () => this.mergeSort()}>Merge Sort</button>
                <button onClick={ () => this.quickSort()}>Quick Sort</button>
                <button onClick={ () => this.heapSort()}>Heap Sort</button>
                <button onClick={ () => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={ () => this.testSortingAlgorithms()}>test algo</button>
            </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function arrayareequal(arrayOne, arrayTwo) 
{
    if(arrayOne.length !== arrayTwo.length) return false;

    for(let i=0; i < arrayOne.length ; i++)
    {
        if(arrayOne[i] !== arrayTwo[i]) 
        {
            // console.log(arrayOne[i], arrayTwo[i]);
            return false;
        }
    }
    return true;
}



