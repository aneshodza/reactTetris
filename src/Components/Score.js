export default function Score(props) {

    return (
        <div className="score">
            <h4>Points: {props.points}</h4>
            <h4>Lines: {props.lines}</h4>
        </div>
    )
}