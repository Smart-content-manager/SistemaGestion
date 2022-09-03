export interface Download {
    flag: 'PENDING' | 'DOWNLOAD' | 'UPLOAD'
    state: 'PENDING' | 'IN PROGRESS' | 'DONE'
    progress: number
}