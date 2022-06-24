

export function getMergeSortAnimations(array){
    const animations = [];
    if(array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length-1,auxiliaryArray,animations);
    return animations;
}

function mergeSortHelper(
    mainArray, startIdx, endIdx, auxiliaryArray, animations,
)
{
    if(startIdx === endIdx) return;
    const middleIdx = Math.floor( (startIdx+endIdx) /2 );
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx,mainArray,animations);
    mergeSortHelper(auxiliaryArray, middleIdx+1, endIdx,mainArray,animations);
    domerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray,animations);
}

function domerge(
    mainArray, 
    startIdx,
    middleIdx,
    endIdx,
    auxiliaryArray,
    animations,
)
{
    let k = startIdx;
    let i= startIdx;
    let j = middleIdx+1;

    while(i <= middleIdx && j<=endIdx)
    {
        //these are the values that we are comparing we push them once
        // to change the color
        animations.push([i,j]);

        //these are the values that we are comparing we push them a second time
        // to change the color        
        animations.push([i,j]);
       
        if(auxiliaryArray[i] <= auxiliaryArray[j])
        {
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        }
        else 
        {
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];

        }
    }
     

    while( i <= middleIdx) 
    {
        //pushing comparing values once
        animations.push([i,i]);

        //pushing comapring values second time
        animations.push([i,i]);

        //we overwrite the value at index k in the original array with 
        // the value at index i in the auxiliary array.

        animations.push([k,auxiliaryArray[i]])

        mainArray[k++] = auxiliaryArray[i++];
    }

    
    while( j <= endIdx) 
    {
        //pushing comparing values once
        animations.push([j,j]);

        //pushing comapring values second time
        animations.push([j,j]);

        //we overwrite the value at index k in the original array with 
        // the value at index i in the auxiliary array.

        animations.push([k,auxiliaryArray[j]])

        mainArray[k++] = auxiliaryArray[j++];
    }

}