export default function Score(props) {

    return (
        <div className="score">
            <h2>Points: {props.points}</h2>
            <h2>Lines: {props.lines}</h2>
        </div>
    )
}