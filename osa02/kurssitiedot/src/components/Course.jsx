const Header = ({course}) => {
    return <h1>{course.name}</h1>;
};

const Part = ({part}) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    );
};

const Content = ({course}) => {
    return (
        <>
            {course.parts.map((part) => (
                <Part key={part.id} part={part} />
            ))}
        </>
    );
};

const Total = ({course}) => {
    const sum = course.parts.reduce((prevValue, currentValue) => {
        return prevValue + currentValue.exercises;
    }, 0);

    return (
        <>
            <b>Number of exercises {sum}</b>
        </>
    );
};

const Course = ({course}) => {
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </div>
    );
};

export default Course;
