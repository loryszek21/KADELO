
export interface ProgressRingTimerProps {
    start: string,
    end: string

}

export interface ProgressRingProps extends ProgressRingTimerProps {
    task: number
    completed: number
}