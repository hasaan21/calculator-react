import React, {useState} from "react"

import {Container, Screen, Previous, Current, Button} from "./Styled"


export default function Calculator() {
    const [current, setCurrent] = useState('')
    const [previous, setPrevious] = useState('')
    const [operation, setOperation] = useState('')

    const appendValue = (elem) => {
        const val = elem.target.getAttribute('data')

        if(val === '.' && current.includes('.')) return
        setCurrent(current+val)
    }

    const handleDelete = () => {
        setCurrent(String(current.slice(0,-1)))
    }

    const handleClear = () => {
        setCurrent('')
        setPrevious('')
        setOperation('')
    }

    const chooseOperation = (elem) => {
        if(current === '') return
        if(previous !== '') {
            let value = compute();
            setPrevious(value)
        } else {
            setPrevious(current)
        }

        setCurrent('')
        setOperation(elem.target.getAttribute('data'))
    }

    const compute = () => {
        let result
        let previousNumber = parseFloat(previous)
        let currentNumber = parseFloat(current)

        if (isNaN(previousNumber) || isNaN(currentNumber)) return

        switch(operation) {
            case '+':
                result = previousNumber + currentNumber;
                break;
            case '-':
                result = previousNumber - currentNumber;
                break;
            case 'x':
                result = previousNumber * currentNumber;
                break;
            case '÷':
                result = previousNumber / currentNumber;
                break;
            default:
                return
        }

        return result;
    }

    const equals = () => {
        let value = compute();
        if (value === undefined || value === null)  return

        setCurrent(value)
        setPrevious('')
        setOperation('')
    }

    return (
        <Container>
            <Screen>
                <Previous>{previous} {operation}</Previous>
                <Current>{current}</Current>
            </Screen>
            <Button onClick={handleClear} gridSpan={2} control>AC</Button>
            <Button onClick={handleDelete} control>DEL</Button>
            <Button data={'÷'} onClick={chooseOperation} operation>÷</Button>
            <Button data={'1'} onClick={appendValue}>7</Button>
            <Button data={'2'} onClick={appendValue}>8</Button>
            <Button data={'3'} onClick={appendValue}>9</Button>
            <Button data={'x'} onClick={chooseOperation} operation>x</Button>
            <Button data={'4'} onClick={appendValue}>4</Button>
            <Button data={'5'} onClick={appendValue}>5</Button>
            <Button data={'6'} onClick={appendValue}>6</Button>
            <Button data={'+'} onClick={chooseOperation} operation>+</Button>
            <Button data={'1'} onClick={appendValue}>1</Button>
            <Button data={'2'} onClick={appendValue}>2</Button>
            <Button data={'3'} onClick={appendValue}>3</Button>
            <Button data={'-'} onClick={chooseOperation} operation>-</Button>
            <Button data={'.'} onClick={appendValue} period>.</Button>
            <Button data={'0'} onClick={appendValue}>0</Button>
            <Button gridSpan={2} onClick={equals} equals>=</Button>
        </Container>
    )
}