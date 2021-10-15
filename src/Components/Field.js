import { useState } from 'react';
import Square from './Square';
import Figure from './Figure';
import Score from './Score';

var wPress; var aPress; var sPress; var dPress; var speed = 0; var updateInterval

export default function Field() {
    const [squares] = useState(Array.from(Array(200).keys()))

    const [figures] = useState([
        new Figure('I', [3, 4, 5, 6], 'blue', 0),
        new Figure('J', [3, 13, 14, 15], 'blue', 0),
        new Figure('L', [13, 5, 14, 15], 'blue', 0),
        new Figure('O', [4, 5, 14, 15], 'blue', 0),
        new Figure('Z', [3, 4, 14, 15], 'blue', 0),
        new Figure('S', [13, 4, 14, 5], 'blue', 0),
        new Figure('T', [13, 4, 14, 15], 'blue', 0)
    ])
    const [figure, setFigure] = useState(figures[Math.floor(7 * Math.random())])
    const [usedPos, setUsedPos] = useState([])

    const [lines, setLines] = useState(0)
    const [points, setPoints] = useState(0)

    const rangeArray = (lowEnd, highEnd) => {
        let list = [];
        for (let i = lowEnd; i <= highEnd; i++) {
            list.push(i);
        }
        return list
    }

    const checker = (myArray, range) => {
        return range.every(value => (
            myArray.includes(value))
        )
    }

    const checkDelete = () => {
        let tempPos = usedPos
        let deletionIndex = [null, null]
        for (let i = 19; i > 0; i--) {
            if (checker(tempPos, rangeArray(i * 10, i * 10 + 9))) {
                tempPos = tempPos.sort()
                tempPos = tempPos.filter(v => v < i * 10 || v > i * 10 + 9)
                if (deletionIndex[0] === null) {
                    deletionIndex[0] = i
                }
                deletionIndex[1] = i
            }
        }
        if (deletionIndex[0] !== null) {
            switch (deletionIndex[0] - deletionIndex[1]) {
                case 0:
                    setPoints(points + 10)
                    break
                case 1:
                    setPoints(points + 30)
                    break
                case 2:
                    setPoints(points + 60)
                    break
                case 3:
                    setPoints(points + 120)
                    break
            }
            setLines(lines + deletionIndex[0] - deletionIndex[1] + 1)
            speed = Math.floor((lines + deletionIndex[0] - deletionIndex[1] + 1)/10)*30
            clearInterval(updateInterval)
            updateInterval = setInterval(() => sPress(), 500 - speed)
            tempPos = tempPos.map(v => v < deletionIndex[1] * 10 ? v + deletionIndex[0] * 10 - deletionIndex[1] * 10 + 10 : v)
        }

        return tempPos
    }

    wPress = () => {
        if (figure.name === 'I') {
            if (figure.state === 0) {
                setFigure({ ...figure, state: 1, position: [figure.position[0] - 8, figure.position[1] + 1, figure.position[2] + 10, figure.position[3] + 19] })
            } else if (figure.state === 1) {
                if (figure.position.filter(i => i.toString().charAt(i.toString().length - 1) === '0').length > 0) {
                    figure.position = figure.position.map(p => p + 2)
                } else if (figure.position.filter(i => i.toString().charAt(i.toString().length - 1) === '1').length > 0) {
                    figure.position = figure.position.map(p => p + 1)
                } else if (figure.position.filter(i => i.toString().charAt(i.toString().length - 1) === '9').length > 0) {
                    figure.position = figure.position.map(p => p - 1)
                }
                setFigure({ ...figure, state: 0, position: [figure.position[0] + 8, figure.position[1] - 1, figure.position[2] - 10, figure.position[3] - 19] })
            }
        } else if (figure.name === 'J') {
            if (figure.state === 0) {
                setFigure({ ...figure, state: 1, position: [figure.position[0] + 2, figure.position[1] - 9, figure.position[2], figure.position[3] + 9] })
            } else if (figure.state === 1) {
                if (figure.position.filter(i => i.toString().charAt(i.toString().length - 1) === '0').length > 0) {
                    figure.position = figure.position.map(p => p + 1)
                }
                setFigure({ ...figure, state: 2, position: [figure.position[0] + 20, figure.position[1] + 11, figure.position[2], figure.position[3] - 11] })
            } else if (figure.state === 2) {
                setFigure({ ...figure, state: 3, position: [figure.position[0] - 2, figure.position[1] + 9, figure.position[2], figure.position[3] - 9] })
            } else if (figure.state === 3) {
                if (figure.position.filter(i => i.toString().charAt(i.toString().length - 1) === '9').length > 0) {
                    figure.position = figure.position.map(p => p - 1)
                }
                setFigure({ ...figure, state: 0, position: [figure.position[0] - 20, figure.position[1] - 11, figure.position[2], figure.position[3] + 11] })
            }
        } else if (figure.name === 'L') {
            if (figure.state === 0) {
                setFigure({ ...figure, state: 1, position: [figure.position[0] - 9, figure.position[1] + 20, figure.position[2], figure.position[3] + 9] })
            } else if (figure.state === 1) {
                if (figure.position.filter(i => i.toString().charAt(i.toString().length - 1) === '0').length > 0) {
                    figure.position = figure.position.map(p => p + 1)
                }
                setFigure({ ...figure, state: 2, position: [figure.position[0] + 11, figure.position[1] - 2, figure.position[2], figure.position[3] - 11] })
            } else if (figure.state === 2) {
                setFigure({ ...figure, state: 3, position: [figure.position[0] + 9, figure.position[1] - 20, figure.position[2], figure.position[3] - 9] })
            } else if (figure.state === 3) {
                if (figure.position.filter(i => i.toString().charAt(i.toString().length - 1) === '9').length > 0) {
                    figure.position = figure.position.map(p => p - 1)
                }
                setFigure({ ...figure, state: 0, position: [figure.position[0] - 11, figure.position[1] + 2, figure.position[2], figure.position[3] + 11] })
            }
        } else if (figure.name === 'Z') {
            if (figure.state === 0) {
                setFigure({ ...figure, state: 1, position: [figure.position[0] + 2, figure.position[1] + 11, figure.position[2], figure.position[3] + 9] })
            } else if (figure.state === 1) {
                if (figure.position.filter(i => i.toString().charAt(i.toString().length - 1) === '0').length > 0) {
                    figure.position = figure.position.map(p => p + 1)
                }
                setFigure({ ...figure, state: 0, position: [figure.position[0] - 2, figure.position[1] - 11, figure.position[2], figure.position[3] - 9] })
            }
        } else if (figure.name === 'S') {
            if (figure.state === 0) {
                setFigure({ ...figure, state: 1, position: [figure.position[0] + 2, figure.position[1], figure.position[2] - 9, figure.position[3] - 11] })
            } else if (figure.state === 1) {
                if (figure.position.filter(i => i.toString().charAt(i.toString().length - 1) === '0').length > 0) {
                    figure.position = figure.position.map(p => p + 1)
                }
                setFigure({ ...figure, state: 0, position: [figure.position[0] - 2, figure.position[1], figure.position[2] + 9, figure.position[3] + 11] })
            }
        } else if (figure.name === 'T') {
            if (figure.state === 0) {
                setFigure({ ...figure, state: 1, position: [figure.position[0] - 9, figure.position[1] + 11, figure.position[2], figure.position[3] + 9] })
            } else if (figure.state === 1) {
                if (figure.position.filter(i => i.toString().charAt(i.toString().length - 1) === '0').length > 0) {
                    figure.position = figure.position.map(p => p + 1)
                }
                setFigure({ ...figure, state: 2, position: [figure.position[0] + 11, figure.position[1] + 9, figure.position[2], figure.position[3] - 11] })
            } else if (figure.state === 2) {
                setFigure({ ...figure, state: 3, position: [figure.position[0] + 9, figure.position[1] - 11, figure.position[2], figure.position[3] - 9] })
            } else if (figure.state === 3) {
                if (figure.position.filter(i => i.toString().charAt(i.toString().length - 1) === '9').length > 0) {
                    figure.position = figure.position.map(p => p - 1)
                }
                setFigure({ ...figure, state: 0, position: [figure.position[0] - 11, figure.position[1] - 9, figure.position[2], figure.position[3] + 11] })
            }
        }
    }

    aPress = () => {
        console.log()
        if (!figure.position.filter(i => i.toString().charAt(i.toString().length - 1) === '0').length > 0) {
            if (usedPos.filter(v => figure.position.includes(v + 1)).length === 0) {
                setFigure({ ...figure, position: figure.position.map(v => v - 1) })
            }
        }
    }

    sPress = () => {
        if (figure.position.filter(v => v <= 189).length === 4 && usedPos.filter(v => figure.position.includes(v - 10)).length === 0) {
            setFigure({ ...figure, position: figure.position.map(v => v + 10) })
        } else {
            usedPos.push(figure.position[0], figure.position[1], figure.position[2], figure.position[3])
            setUsedPos(checkDelete())
            setFigure(figures[Math.floor(7 * Math.random())])
            if (usedPos.length !== new Set(usedPos).size) {
                window.location.reload()
            }
        }

    }

    dPress = () => {
        if (!figure.position.filter(i => i.toString().charAt(i.toString().length - 1) === '9').length > 0) {
            if (usedPos.filter(v => figure.position.includes(v - 1)).length === 0) {
                setFigure({ ...figure, position: figure.position.map(v => v + 1) })
            }
        }
    }




    return (
        <>

            <div className="field">
                {
                    squares.map(id => <Square key={id} id={id} style={figure.position.includes(id) || usedPos.includes(id) ? figure.color : ''} />)
                }
            </div>
            <Score points={points} lines={lines} />
        </>
    )
}

window.addEventListener("keypress", (e) => {
    if (e.code === 'KeyD') {
        dPress()
    } else if (e.code === 'KeyA') {
        aPress()
    } else if (e.code === 'KeyS') {
        sPress()
    } else if (e.code === 'KeyW') {
        wPress()
    }
})

updateInterval = setInterval(() => sPress(), 500 - speed)

