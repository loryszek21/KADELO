import CodeArea from './codeArea/codeArea'
import ContestInfo from './contestInfo'
import styles from './page.module.scss'

export default function Contest({ params }: { params: { id: number } }): JSX.Element {
    
    // console.log(params.id)
    
    return (
        <div className={styles.main}>
           <ContestInfo id={params.id}/> 
           <CodeArea />
        </div>
    )
}
