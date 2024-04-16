import Htag from '../../components/Htag/Htag'

type ContestInfoProps = {
    id: number
}

type ContestInfoData = {
    lesson_id: number
    course_id: number
    lessons_title: string
    lessons_order: number
    lessons_content: string
}


export default async function ContestInfo({id}: ContestInfoProps) {       
    
    const info = await fetch(`http://localhost:5000/lessons/${id}`)
    
    const data: ContestInfoData = (await info.json())[0]

    // console.log(data)

    return (
        <div>
            <Htag tag='h1'>{data.lessons_title}</Htag>
        </div>
    )
}