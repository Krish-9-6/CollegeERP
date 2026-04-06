import '../styles/dashCard.css';

interface propTypeDc {
    title: string;
    main: string;
    desc: string;
    attBar: boolean;
    quickActions: boolean;
}

export default function DashCard(props: propTypeDc) {
    return (
        <>
            {!props.quickActions &&
                <div className="card">
                    <h1>{props.title}</h1>
                    <p className='main'>{props.main}</p>
                    <p className='desc'>{props.desc}</p>
                    {props.attBar && <div className="att-bar">
                        <div className="att-bar-fill" style={{ width: `${props.main}` }}></div>
                    </div>}
                </div>
            }
            {props.quickActions &&
                <div className="qk-card">
                    <h1>{props.title}</h1>
                    <div className='qbtn'>
                        <button>View Timetable</button>
                        <button>View Attendance</button>
                        <button>View Grades</button>
                        <button>Kundu Daddy button</button>
                    </div>
                </div>
            }
        </>
    )
}